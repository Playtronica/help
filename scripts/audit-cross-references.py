#!/usr/bin/env python3
"""Cross-reference audit for the help center.

Checks every markdown file under content/en/ for:
  - Internal links to /section/slug/ paths — does the target page exist?
  - mailto: subject lines — do they follow the canonical `Topic #[your order number]` pattern?
  - Anchor links (#fragment) — does the target heading exist on the target page?
  - Duplicate slugs / sections.

Output: a markdown punch list to stdout.
Exit code: 0 if zero issues, 1 if issues found.

Run from the repository root (06-build/):
    python3 scripts/audit-cross-references.py
    npm run audit
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from collections import defaultdict
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content" / "en"

# Match Markdown links: [text](url) — captures (text, url)
LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)\s]+)\)")
# Match heading lines (## or ###)
HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$", re.MULTILINE)
# Match mailto links with optional ?subject=
MAILTO_RE = re.compile(r"mailto:([^?)\s]+)(?:\?subject=([^)\s]+))?")
# Canonical email-subject shapes — we accept three patterns:
#   1. "<Topic> #[your order number]"   — order-related
#   2. "<Topic> — [your organization]"  — B2B / press
#   3. "<Topic> question" or "<Topic> issue" or just "<Topic>"  — pre-purchase / generic
SUBJECT_OK_RE = re.compile(
    r"""^(
        [A-Z][\w-]+(?:\s+[\w-]+)*\s+\#\[(?:your\s+)?[\w\s-]+\]   # Topic #[your X]
        |
        [A-Z][\w-]+(?:\s+[\w-]+)*\s+—\s+\[(?:your\s+)?[\w\s-]+\] # Topic — [your X]
        |
        [A-Z][\w-]+(?:\s+[\w-]+)*                                # plain Topic (1-4 words)
    )$""",
    re.VERBOSE,
)


def slugify_heading(text: str) -> str:
    """GitHub-style anchor slug — lowercase, non-alnum → -."""
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s-]+", "-", text)
    return text.strip("-")


def parse_frontmatter(raw: str) -> tuple[dict, str]:
    if not raw.startswith("---"):
        return {}, raw
    end = raw.find("\n---", 3)
    if end == -1:
        return {}, raw
    fm_text = raw[3:end].strip()
    data: dict = {}
    for line in fm_text.split("\n"):
        m = re.match(r"^([\w-]+):\s*(.*)$", line)
        if not m:
            continue
        value = m.group(2).strip()
        if value.startswith('"') and value.endswith('"'):
            value = value[1:-1]
        data[m.group(1)] = value
    return data, raw[end + 4 :].lstrip()


def main() -> int:
    pages: dict[str, dict] = {}  # url path → {file, headings, frontmatter}
    files = sorted(CONTENT.rglob("*.md"))

    # First pass — build the page index.
    for f in files:
        raw = f.read_text(encoding="utf-8")
        fm, content = parse_frontmatter(raw)
        section = fm.get("section")
        slug = fm.get("slug")
        if not section or not slug:
            continue
        url = f"/{section}/{slug}/"
        headings = [slugify_heading(m.group(2)) for m in HEADING_RE.finditer(content)]
        pages[url] = {
            "file": f.relative_to(ROOT),
            "fm": fm,
            "headings": set(headings),
            "content": content,
        }

    # Also register Next.js app routes as valid URL targets.
    # headings=None means "app route — skip anchor verification" (can't parse TSX headings).
    APP = ROOT / "app"
    LOCALE_PREFIXES = {"de", "es", "fr", "ja"}
    for tsx in sorted(APP.rglob("page.tsx")):
        parts = list(tsx.relative_to(APP).parts[:-1])  # drop "page.tsx"
        # Skip dynamic routes ([section], [slug]) and locale routes
        if any(p.startswith("[") or p in LOCALE_PREFIXES for p in parts):
            continue
        route = "/" + "/".join(parts) + "/" if parts else "/"
        if route not in pages:
            pages[route] = {"file": tsx.relative_to(ROOT), "fm": {}, "headings": None, "content": ""}

    # Also register public/ files as valid link targets (e.g. PDFs).
    PUBLIC = ROOT / "public"
    for pub_file in sorted(PUBLIC.rglob("*")):
        if pub_file.is_file() and not pub_file.name.startswith("."):
            route = "/" + str(pub_file.relative_to(PUBLIC)) + "/"
            if route not in pages:
                pages[route] = {"file": pub_file.relative_to(ROOT), "fm": {}, "headings": None, "content": ""}

    # Second pass — verify every link.
    dead_links: list[str] = []
    bad_subjects: list[str] = []
    dead_anchors: list[str] = []
    duplicate_slugs: list[str] = []

    slug_owners: dict[tuple, list[Path]] = defaultdict(list)
    for url, p in pages.items():
        key = (p["fm"].get("section"), p["fm"].get("slug"))
        if key[0] and key[1]:  # only index markdown pages with proper frontmatter
            slug_owners[key].append(p["file"])

    for key, owners in slug_owners.items():
        if len(owners) > 1:
            duplicate_slugs.append(
                f"- `{key[0]}/{key[1]}` is defined in {len(owners)} files: {', '.join(str(o) for o in owners)}"
            )

    for url, p in pages.items():
        rel = p["file"]
        for m in LINK_RE.finditer(p["content"]):
            target = m.group(2)
            # Skip non-internal links
            if target.startswith(("http://", "https://", "mailto:", "tel:", "#", "/_pagefind/")):
                continue
            # Strip query and fragment before path lookup. Versioned local
            # assets (for example image.svg?v=hash) still point to the same
            # public file and must remain auditable.
            parsed_target = urlsplit(target)
            path_part = parsed_target.path
            anchor: str | None = parsed_target.fragment or None
            # Normalize trailing slash
            if not path_part.endswith("/"):
                path_part = path_part + "/"
            if path_part not in pages:
                dead_links.append(
                    f"- `{rel}` → `{target}` — target page does not exist"
                )
                continue
            # Anchor check (skip for app routes / public files where headings=None)
            if anchor and pages[path_part]["headings"] is not None and anchor not in pages[path_part]["headings"]:
                dead_anchors.append(
                    f"- `{rel}` → `{target}` — heading `#{anchor}` not found on target page"
                )

        # Mailto subject audit
        for m in MAILTO_RE.finditer(p["content"]):
            subject = m.group(2)
            if subject is None:
                continue  # plain mailto without subject — that's fine
            # URL-decode common percent-encodings
            decoded = (
                subject.replace("%20", " ")
                .replace("%23", "#")
                .replace("%5B", "[")
                .replace("%5D", "]")
                .replace("%E2%80%94", "—")
            )
            if not SUBJECT_OK_RE.match(decoded.strip()):
                bad_subjects.append(f"- `{rel}` → subject `{decoded}` — non-canonical")

    # Output report.
    total_pages = len(pages)
    issues = len(dead_links) + len(bad_subjects) + len(dead_anchors) + len(duplicate_slugs)

    print("# Cross-reference audit\n")
    print(f"Checked **{total_pages} pages**. Found **{issues} issues**.\n")

    print("## Dead internal links")
    print(f"{len(dead_links)} found.\n")
    print("\n".join(dead_links) if dead_links else "_None._")
    print()

    print("## Dead anchor links")
    print(f"{len(dead_anchors)} found.\n")
    print("\n".join(dead_anchors) if dead_anchors else "_None._")
    print()

    print("## Non-canonical email subjects")
    print(f"{len(bad_subjects)} found. Canonical pattern: `Topic #[your order number]`.\n")
    print("\n".join(bad_subjects) if bad_subjects else "_None._")
    print()

    print("## Duplicate slugs")
    print(f"{len(duplicate_slugs)} found.\n")
    print("\n".join(duplicate_slugs) if duplicate_slugs else "_None._")
    print()

    return 0 if issues == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
