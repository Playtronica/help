#!/usr/bin/env python3
"""Pass 4 — Ecommerce trust-signal audit.

Reads every public page and scores it against signals a first-time buyer
needs to feel safe spending money. Specifically:

  TS1 Refund / returns clarity
      Is the return window stated as a number of days? Is the refund route
      described, or is it vague?

  TS2 Shipping clarity
      For pages that mention purchase or order, is the shipping timeline
      mentioned at all?

  TS3 Authority / evidence
      Claims about plant physiology, audio physics, or device behaviour are
      flagged if they have no link, no citation, no video, no photo.

  TS4 Real names + faces
      "Contact us" / "About" pages should name a real person (we name
      Andrey on the contact page).

  TS5 Social proof
      Does the page reference real users (community member counts, named
      installations, named partner companies)?

  TS6 Warnings visible
      Hardware pages must show the "Handle only the parts shown in this
      guide" warning before the quick-start, not after.

  TS7 Live link health
      Every external link must respond 200 within 5 seconds (skipped here
      to keep this script offline; live check belongs in the monthly
      refresh).

Output: per-page trust score (0-10), aggregate by section, and the
specific signals that are missing.

Run with: npm run review:trust
"""

from __future__ import annotations

import re
import sys
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).resolve().parent.parent.parent
CONTENT = ROOT / "content" / "en"

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n(.*)$", re.DOTALL)


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


# ─── Trust-signal checks ───────────────────────────────────────────────────


def ts_refund(rel: str, body: str):
    if "refund" not in rel and "return" not in rel:
        return None
    has_window = bool(re.search(r"\b\d+\s*(?:business\s+)?(?:day|week)s?\b", body, re.I))
    has_email = "support@playtronica.com" in body
    if has_window and has_email:
        return 2, "refund window stated + support email present"
    if has_window or has_email:
        return 1, "partial — only one of (window, email) present"
    return 0, "no refund window, no contact path"


def ts_shipping(rel: str, body: str):
    if not any(k in rel for k in ("track", "order", "gift")):
        return None
    has_timeline = bool(re.search(r"\b\d+\s*(?:to\s*\d+\s*)?(?:business\s+)?(?:day|week)s?\b", body, re.I))
    has_carrier = any(
        c in body.lower()
        for c in (
            "ups", "dhl", "fedex", "shipbob", "floship",
            "postnl", "post nl", "postal", "carrier",
            "tracking link", "warehouse",
        )
    )
    if has_timeline and has_carrier:
        return 2, "shipping timeline + carrier mentioned"
    if has_timeline or has_carrier:
        return 1, "partial — only one of (timeline, carrier) present"
    return 0, "no shipping timeline, no carrier name"


def ts_authority(rel: str, body: str):
    # Pages that make scientific or technical claims should cite sources.
    is_claim_heavy = any(
        k in rel for k in ("biotron", "grounding", "objects", "scales", "playtron", "touchme")
    )
    if not is_claim_heavy:
        return None
    has_external_link = bool(re.search(r"\]\(https://(?!playtronica|help\.playtronica)", body))
    has_video = "youtube" in body.lower() or "vimeo" in body.lower()
    has_photo = bool(re.search(r"<img|!\[", body))
    score = 0
    notes = []
    if has_external_link:
        score += 1
        notes.append("ext link")
    if has_video:
        score += 1
        notes.append("video")
    if has_photo:
        score += 1
        notes.append("photo")
    label = "/".join(notes) if notes else "no external evidence"
    return min(score, 2), label


def ts_named_person(rel: str, body: str):
    if "contact" not in rel and "about" not in rel and "community" not in rel:
        return None
    has_name = bool(re.search(r"\b(?:Andrey|Manirko)\b", body))
    return (2, "real person named") if has_name else (0, "no real person named")


def ts_social_proof(rel: str, body: str):
    # Only the homepage hero, community, and pro pages need social proof.
    if not any(k in rel for k in ("community", "professionals", "b2b", "installations", "education")):
        return None
    counts = bool(re.search(r"\b\d{2,}\s*(members|users|workshops|schools)", body, re.I))
    named = bool(re.search(r"\b(?:Berghain|Tate|MoMA|Sonar|Coachella)\b", body))
    if counts or named:
        return 2, "social proof present"
    return 0, "no member counts, no named partners"


def ts_warning_position(rel: str, body: str):
    # Every device page must have a warning BEFORE the quick-start.
    if "devices/" not in rel or "advanced" in rel or "tuning" in rel:
        return None
    warn_pos = body.lower().find("handle only")
    qs_pos = body.lower().find("quick start")
    if warn_pos == -1 and qs_pos == -1:
        return 1, "no warning callout (advanced page perhaps)"
    if warn_pos == -1:
        return 0, "no 'handle only' warning callout"
    if qs_pos == -1:
        return 2, "warning present"
    return (2, "warning before quick-start") if warn_pos < qs_pos else (0, "warning AFTER quick-start — buyer may have already mishandled the device")


CHECKS = [
    ("TS1 refund", ts_refund),
    ("TS2 shipping", ts_shipping),
    ("TS3 authority", ts_authority),
    ("TS4 named person", ts_named_person),
    ("TS5 social proof", ts_social_proof),
    ("TS6 warning position", ts_warning_position),
]


def main():
    results = []
    section_scores: dict[str, list[float]] = defaultdict(list)
    for path in sorted(CONTENT.rglob("*.md")):
        rel = path.relative_to(CONTENT).as_posix()
        fm, body = parse(path)
        if not fm or fm.get("hide_from_nav") == "true":
            continue
        applicable = []
        for label, check in CHECKS:
            r = check(rel, body)
            if r is None:
                continue
            score, note = r
            applicable.append((label, score, note))
        if not applicable:
            continue
        max_score = 2 * len(applicable)
        got = sum(s for _, s, _ in applicable)
        pct = (got / max_score) * 100 if max_score else 0
        score_10 = round(pct / 10, 1)
        results.append((rel, score_10, applicable))
        section_scores[fm.get("section", "?")].append(score_10)

    print(f"\nPass 4 — Ecommerce trust-signal audit\n{'='*40}\n")
    print(f"Pages with applicable signals: {len(results)}\n")

    print("Aggregate by section:")
    for section in sorted(section_scores):
        scores = section_scores[section]
        avg = sum(scores) / len(scores)
        bar = "█" * int(avg) + "░" * (10 - int(avg))
        print(f"  {section.ljust(18)} {avg:4.1f}/10  {bar}  ({len(scores)} pages)")

    low_pages = sorted(
        (r for r in results if r[1] < 7),
        key=lambda x: x[1],
    )
    if low_pages:
        print(f"\nPages scoring below 7/10 ({len(low_pages)} of {len(results)}):\n")
        for rel, score, items in low_pages:
            print(f"  {rel}  ·  {score}/10")
            for label, s, note in items:
                marker = "✓" if s == 2 else ("·" if s == 1 else "✗")
                print(f"    {marker} {label}: {note}")

    print()
    if low_pages:
        print("⚠ Trust-signal gaps above are advisory — they do not block CI.")
    # Advisory trust-signal audit: prints findings but never fails the build.
    return 0


if __name__ == "__main__":
    sys.exit(main())
