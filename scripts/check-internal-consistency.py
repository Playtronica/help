#!/usr/bin/env python3
"""
check-internal-consistency.py — CI gate for help-center content drift.

Catches the kinds of low-level inconsistencies the 5-method audit identifies
as recurring failure modes (S1-S5 in the methodology):

  - Multiple canonical URLs for the same service (settings, synth, etc.)
  - SLA-phrase variance in "Still stuck" footers across pages
  - Hard-coded calendar dates that go stale every year
  - Broken internal links (slug mentioned but no .md exists)
  - Stale `status: edited-YYYY-MM` markers (any older than 12 months)

Exit codes:
  0 — clean
  1 — issues found (CI should fail)

Usage:
  python3 scripts/check-internal-consistency.py            # full check
  python3 scripts/check-internal-consistency.py --warn-only  # never fail
"""

from __future__ import annotations

import argparse
import re
import sys
from datetime import datetime
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
CONTENT = REPO_ROOT / "content"
EN = CONTENT / "en"

CANONICAL_SETTINGS = "settings.playtronica.com"
LEGACY_SETTINGS_OK = {"playtronica.github.io/WebMidiOrbita"}

CANONICAL_SLA = "We aim for 24 hours, but a reply may take up to 3 business days."

# Title/meta length budgets — Latin scripts measure in characters; CJK scripts
# render about twice as wide per glyph in search snippets, so we use half the
# character budget. These are recommendations, not hard limits — the check
# emits S6 warnings at 120%, not errors.
TITLE_LIMITS = {  # max characters in <title> / frontmatter.title
    "en": 60, "de": 60, "es": 60, "fr": 60, "ja": 30,
}
SUMMARY_LIMITS = {  # max characters in frontmatter.summary (used for meta description)
    "en": 155, "de": 155, "es": 155, "fr": 155, "ja": 75,
}

# These specific shorter-window SLAs are intentional for categories that promise
# faster turnaround (returns address, invoices, "which device am I holding").
ALLOWED_SHORT_SLA = (
    "We reply within 1 business day",
    "We reply within 2 business days",
)

HARDCODED_DATE_PATTERNS = [
    # Avoid "January", "December" without context — but allow product names and emoji prefixes
    (
        r"\bDecember \d{1,2}\b|\bJanuary \d{1,2}\b",
        "hard-coded month + day — review yearly",
    ),
]


FM_TITLE_RE = re.compile(r'^title:\s*"?([^"\n]+?)"?\s*$', re.MULTILINE)
FM_SUMMARY_RE = re.compile(r'^summary:\s*"?([^"\n]+?)"?\s*$', re.MULTILINE)


def check_length_budget(text: str, lang: str, file_rel: str):
    """Yield S6 issues for title/summary exceeding the per-language budget."""
    title_limit = TITLE_LIMITS.get(lang, 60)
    summary_limit = SUMMARY_LIMITS.get(lang, 155)
    m = FM_TITLE_RE.search(text)
    if m:
        title = m.group(1).strip()
        if len(title) > int(title_limit * 1.2):
            yield (
                file_rel,
                "S6",
                f"title is {len(title)} chars ({lang} budget {title_limit}) — Google snippets truncate at ~{title_limit}",
            )
    m = FM_SUMMARY_RE.search(text)
    if m:
        summary = m.group(1).strip()
        if len(summary) > int(summary_limit * 1.2):
            yield (
                file_rel,
                "S6",
                f"summary is {len(summary)} chars ({lang} budget {summary_limit}) — meta description truncated at ~{summary_limit}",
            )


def issues_iter():
    en_pages = sorted(EN.rglob("*.md"))
    # Also check translated pages' lengths
    other_lang_pages = []
    for lang in ("de", "es", "fr", "ja"):
        d = CONTENT / lang
        if d.exists():
            other_lang_pages.extend((p, lang) for p in sorted(d.rglob("*.md")))
    # Collect all valid slugs for internal-link resolution
    slugs = set()
    for p in en_pages:
        rel = p.relative_to(EN)
        slugs.add(f"/{rel.parent.name}/{p.stem}/")
        slugs.add(f"/{rel.parent.name}/{p.stem}")

    # Next.js app routes (app/**/page.tsx) and public/ files are valid link
    # targets too (e.g. /education/quote/, /education/playtronica-lesson-1.pdf).
    app_dir = REPO_ROOT / "app"
    if app_dir.exists():
        for tsx in app_dir.rglob("page.tsx"):
            parts = list(tsx.relative_to(app_dir).parts[:-1])  # drop page.tsx
            if any(seg.startswith("[") or seg in {"de", "es", "fr", "ja"} for seg in parts):
                continue
            route = "/" + "/".join(parts) + "/" if parts else "/"
            slugs.add(route)
            slugs.add(route.rstrip("/") or "/")
    public_dir = REPO_ROOT / "public"
    if public_dir.exists():
        for pub in public_dir.rglob("*"):
            if pub.is_file() and not pub.name.startswith("."):
                slugs.add("/" + str(pub.relative_to(public_dir)))

    for p in en_pages:
        rel = str(p.relative_to(REPO_ROOT))
        text = p.read_text(encoding="utf-8")

        # 6. Length budget (EN)
        yield from check_length_budget(text, "en", rel)

        # 1. Settings URL — flag anything that isn't canonical (or whitelisted legacy)
        for m in re.finditer(r"https?://([a-z0-9.-]+\.playtronica\.com[^\s)]*)", text):
            host_path = m.group(1)
            if host_path.startswith("settings.playtronica.com"):
                continue
            if host_path.startswith("synth.playtronica.com"):
                continue
            if host_path.startswith("shop.playtronica.com"):
                continue
            if host_path.startswith("playtronica.com"):
                continue
            if host_path.startswith("education.playtronica.com"):
                continue
            if host_path.startswith("help.playtronica.com"):
                continue
            yield (
                rel,
                "S1",
                f"Non-canonical Playtronica URL: {host_path} — use {CANONICAL_SETTINGS}/#/<device>",
            )
        for legacy_pattern in [
            r"playtronica\.github\.io/WebMidiOrbita",
        ]:
            for m in re.finditer(legacy_pattern, text):
                # Allowed only in orbita-advanced.md as historical reference
                if "orbita-advanced" not in rel and "orbita.md" not in rel:
                    yield (
                        rel,
                        "S1",
                        f"Legacy URL {m.group(0)} outside Orbita pages — move to canonical {CANONICAL_SETTINGS}",
                    )

        # 2. SLA phrase consistency in "Still stuck" sections
        if "## Still stuck" in text:
            still_stuck_block = text.split("## Still stuck", 1)[1].split("##", 1)[0]
            if (
                CANONICAL_SLA not in still_stuck_block
                and not any(s in still_stuck_block for s in ALLOWED_SHORT_SLA)
            ):
                yield (
                    rel,
                    "S2",
                    f"'Still stuck' section does not use canonical SLA — should contain: '{CANONICAL_SLA}'",
                )

        # 3. Hard-coded dates
        for pattern, why in HARDCODED_DATE_PATTERNS:
            for m in re.finditer(pattern, text):
                yield (rel, "S3", f"{why}: '{m.group(0)}'")

        # 4. Broken internal links
        for link in re.findall(r"\]\((/[a-z][^)]*)\)", text):
            base = link.rstrip("/").split("#")[0]
            if not base:
                continue
            if base + "/" in slugs or base in slugs:
                continue
            # Allow root-level paths (/, /404, etc.)
            if base in {"/404", "/"}:
                continue
            yield (rel, "S4", f"Broken internal link: {link}")

        # 5. Stale status markers
        for m in re.finditer(r"^status: edited-(\d{4})-(\d{1,2})$", text, re.MULTILINE):
            year, month = int(m.group(1)), int(m.group(2))
            edited = datetime(year, month, 1)
            age_days = (datetime.utcnow() - edited).days
            if age_days > 365:
                yield (
                    rel,
                    "S5",
                    f"Stale status: edited-{year}-{month:02d} ({age_days} days ago) — review or update",
                )

    # 6 (translated pages) — length budget for non-EN pages
    for p, lang in other_lang_pages:
        rel = str(p.relative_to(REPO_ROOT))
        text = p.read_text(encoding="utf-8")
        yield from check_length_budget(text, lang, rel)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--warn-only",
        action="store_true",
        help="exit 0 even when issues are found (for non-blocking CI)",
    )
    args = parser.parse_args()

    issues = list(issues_iter())
    # S6 (title/summary length) is a recommendation, not a hard limit — it
    # prints as a warning but never fails CI. Everything else is blocking.
    blocking = [i for i in issues if i[1] != "S6"]
    if not issues:
        print("✓ check-internal-consistency: 0 issues")
        return 0

    by_code = {}
    for rel, code, msg in issues:
        by_code.setdefault(code, []).append((rel, msg))

    status = "✗" if blocking else "⚠"
    print(f"{status} check-internal-consistency: {len(blocking)} blocking + {len(issues) - len(blocking)} warning(s) across {len(by_code)} categories\n")
    code_names = {
        "S1": "Non-canonical service URL",
        "S2": "SLA phrase drift in 'Still stuck'",
        "S3": "Hard-coded calendar date",
        "S4": "Broken internal link",
        "S5": "Stale status: edited-YYYY-MM marker",
        "S6": "title/summary length exceeds locale budget",
    }
    for code in sorted(by_code):
        print(f"--- {code} — {code_names.get(code, code)} ({len(by_code[code])}) ---")
        for rel, msg in by_code[code]:
            print(f"  {rel}")
            print(f"    {msg}")
        print()

    return 0 if (args.warn_only or not blocking) else 1


if __name__ == "__main__":
    sys.exit(main())
