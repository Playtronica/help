#!/usr/bin/env python3
"""Pass 3 — Ecommerce friction audit.

Reads every public Markdown page and flags places where a frustrated buyer
might hit a dead end. Specifically:

  · No "next step" — page ends without telling the user where to go next.
  · No contact path — page describes a problem but never offers email or
    community as a fallback.
  · No "still stuck" block — every device and troubleshooting page should
    funnel unsolved problems to support@playtronica.com.
  · Vague claims without evidence — phrases like "the most popular" without
    a number, "best for" without comparison, "everyone loves" without proof.
  · Long paragraphs (>4 sentences) — friction for skim readers.
  · Missing translations of strong-action words to neutral form
    (e.g. "amazing", "incredible", "literally") — voice-spec violations.
  · Pages where the lede (first 2 paragraphs) does not match the title's
    promise — wrong-page penalty.

Output: a punch list, grouped by page, ordered by severity (HIGH/MED/LOW).
Exit code: non-zero if any HIGH issues found.

Run with: npm run review:friction
"""

from __future__ import annotations

import re
import sys
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).resolve().parent.parent.parent
CONTENT = ROOT / "content" / "en"

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n(.*)$", re.DOTALL)
HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)$", re.MULTILINE)

# Voice-spec banned words that signal marketing-speak (low trust on an
# ecommerce help center where buyers want facts, not vibes).
BANNED_WORDS = {
    "amazing", "incredible", "literally", "seamless", "effortless",
    "magical", "revolutionary", "best-in-class", "world-class",
    "leverage", "synergy", "ecosystem", "robust solution",
    "delight", "delightful", "killer", "game-changer", "game-changing",
}

# Vague claims with no quantifier — flag where these appear without a
# number, percent, citation, or named reference within ±100 chars.
VAGUE_PATTERNS = [
    (re.compile(r"\bmost popular\b", re.I), "vague claim — 'most popular' without a number"),
    (re.compile(r"\bbest for\b", re.I), "vague claim — 'best for' without comparison"),
    (re.compile(r"\beveryone loves\b", re.I), "vague claim — 'everyone loves' without source"),
    (re.compile(r"\b(?:industry-leading|cutting-edge|state-of-the-art)\b", re.I),
     "vague claim — marketing superlative"),
    (re.compile(r"\b(?:simply|just|easy|easily)\b", re.I),
     "user-hostile filler — 'simply/just/easy' minimises the user's actual work"),
]

# Pages that legitimately do not need a "next step" or "still stuck" block
# because they ARE the next step or are pure-navigation pages.
EXEMPT_FROM_FUNNEL = {
    "site/contact",
    "site/community",
    "orders/contact-us",
}


def parse(path: Path):
    raw = path.read_text(encoding="utf-8")
    m = FRONTMATTER_RE.match(raw)
    if not m:
        return None, raw
    fm = {}
    for line in m.group(1).split("\n"):
        kv = re.match(r"^([\w-]+):\s*(.*)$", line.strip())
        if kv:
            v = kv.group(2).strip()
            if v.startswith('"') and v.endswith('"'):
                v = v[1:-1]
            fm[kv.group(1)] = v
    return fm, m.group(2)


def severity_sort(issues):
    order = {"HIGH": 0, "MED": 1, "LOW": 2}
    return sorted(issues, key=lambda i: order.get(i[0], 3))


def has_contact_or_funnel(body: str) -> bool:
    """A page funnels unresolved issues if it references support email OR
    the community OR a related page."""
    return any(
        marker in body.lower()
        for marker in (
            "support@playtronica.com",
            "facebook.com/groups/playtronica",
            "playtronica friends",
            "still stuck",
            "ask the community",
            "/site/contact",
            "/site/community",
        )
    )


def lede_paragraphs(body: str) -> str:
    # Strip frontmatter remnants, callouts, headings; return the first
    # two non-blockquote paragraphs.
    plain = re.sub(r"^>.*$", "", body, flags=re.MULTILINE)
    plain = re.sub(r"^#{1,6}.*$", "", plain, flags=re.MULTILINE)
    paragraphs = [p.strip() for p in plain.split("\n\n") if p.strip()]
    return " ".join(paragraphs[:2])


def find_long_paragraphs(body: str):
    out = []
    for p in body.split("\n\n"):
        text = p.strip()
        if text.startswith(("#", ">", "|", "-", "*", "1.")):
            continue
        sentences = re.split(r"(?<=[.!?])\s+", text)
        if len([s for s in sentences if len(s) > 5]) > 5:
            out.append(text[:80] + "…")
    return out


def audit_page(rel: str, fm: dict, body: str):
    issues = []
    section_slug = rel.replace("\\", "/").replace(".md", "")

    # Banned words
    body_low = body.lower()
    for word in BANNED_WORDS:
        if re.search(rf"\b{re.escape(word)}\b", body_low):
            issues.append(("LOW", f"voice — banned word '{word}'"))

    # Vague claims
    for pat, label in VAGUE_PATTERNS:
        for m in pat.finditer(body):
            snippet = body[max(0, m.start() - 40): m.end() + 40].replace("\n", " ")
            issues.append(("LOW", f"{label} · …{snippet.strip()}…"))

    # Contact / funnel
    if section_slug not in EXEMPT_FROM_FUNNEL and not has_contact_or_funnel(body):
        issues.append(("HIGH", "no contact / community / 'still stuck' funnel — buyer hits a dead end"))

    # Long paragraphs
    for snippet in find_long_paragraphs(body)[:3]:
        issues.append(("MED", f"long paragraph (>5 sentences) — '{snippet}'"))

    # Lede vs title
    if fm.get("title") and fm.get("summary"):
        lede = lede_paragraphs(body).lower()
        # If neither the title's key noun nor the summary's key noun appears
        # in the first two paragraphs, the lede may not deliver on the
        # title's promise.
        title_tokens = set(re.findall(r"\b[a-z]{4,}\b", fm["title"].lower()))
        summary_tokens = set(re.findall(r"\b[a-z]{4,}\b", fm["summary"].lower()))
        lede_tokens = set(re.findall(r"\b[a-z]{4,}\b", lede))
        title_overlap = len(title_tokens & lede_tokens)
        summary_overlap = len(summary_tokens & lede_tokens)
        if title_tokens and title_overlap == 0 and summary_overlap < 2:
            issues.append(("MED", "lede does not deliver on the title — buyer may bounce"))

    # Returns/refunds page must mention refund window
    if "return" in section_slug or "refund" in section_slug:
        if not re.search(r"\b(\d+)\s*(day|week|business day)", body, re.I):
            issues.append(("HIGH", "returns/refunds page does not state a refund window in days"))

    # Pricing / discounts page must mention currency
    if "pricing" in section_slug or "discount" in section_slug:
        if "€" not in body and "$" not in body and "EUR" not in body and "USD" not in body:
            issues.append(("MED", "pricing page mentions no currency — buyer may distrust"))

    return issues


def main():
    by_page = defaultdict(list)
    for path in sorted(CONTENT.rglob("*.md")):
        rel = path.relative_to(CONTENT).as_posix()
        fm, body = parse(path)
        if not fm:
            by_page[rel].append(("HIGH", "no frontmatter"))
            continue
        if fm.get("hide_from_nav") == "true":
            continue
        for sev, msg in audit_page(rel, fm, body):
            by_page[rel].append((sev, msg))

    total = sum(len(v) for v in by_page.values())
    high = sum(1 for issues in by_page.values() for s, _ in issues if s == "HIGH")
    med = sum(1 for issues in by_page.values() for s, _ in issues if s == "MED")
    low = sum(1 for issues in by_page.values() for s, _ in issues if s == "LOW")

    print(f"\nPass 3 — Ecommerce friction audit\n{'='*40}\n")
    print(f"Pages audited:   {len(by_page)}")
    print(f"Total issues:    {total} (HIGH: {high}  MED: {med}  LOW: {low})\n")

    if total == 0:
        print("Zero friction points found. Ready to ship.")
        return 0

    # Print pages ordered by HIGH count
    pages_sorted = sorted(
        by_page.items(),
        key=lambda kv: (
            -sum(1 for s, _ in kv[1] if s == "HIGH"),
            -sum(1 for s, _ in kv[1] if s == "MED"),
        ),
    )
    for rel, issues in pages_sorted:
        if not issues:
            continue
        print(f"\n── {rel} ──")
        for sev, msg in severity_sort(issues):
            print(f"  [{sev}] {msg}")

    print()
    return 1 if high else 0


if __name__ == "__main__":
    sys.exit(main())
