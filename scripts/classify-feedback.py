#!/usr/bin/env python3
"""
classify-feedback.py — classify a feedback export into ranked missing topics.

Takes a WhatsApp chat export (text file) or an email digest and uses the
Anthropic API to classify each message into one of:

    broken-link, missing-topic, unclear-writing, wrong-device,
    bug-report, question-not-feedback, praise, off-topic

Output is a ranked priority list — the top 5 by frequency are the most
valuable signals for the content roadmap.

Usage:
    export ANTHROPIC_API_KEY=sk-...
    python3 scripts/classify-feedback.py whatsapp-export.txt

The output also writes a `_data/feedback-digest-YYYY-MM-DD.json` file so the
monthly Cowork audit can compare across months and see whether categories are
shrinking (we are addressing them) or growing (a recurring failure mode).

NOTE: This script does NOT auto-fix anything. It only ranks. Acting on the
ranked list is a human decision (Andrey + Sasha) — that's the antifragility
loop closure point.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DATA = REPO / "content" / "_data"

CATEGORIES = [
    "broken-link",
    "missing-topic",
    "unclear-writing",
    "wrong-device",
    "bug-report",
    "question-not-feedback",
    "praise",
    "off-topic",
]


def parse_whatsapp_export(path: Path) -> list[dict]:
    """Parse a standard WhatsApp text export. Returns one entry per message."""
    pattern = re.compile(
        r"^\[?(\d{1,2}[./]\d{1,2}[./]\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?)\]?\s*"
        r"[-:]?\s*([^:]+?):\s+(.+)$"
    )
    msgs = []
    current = None
    for line in path.read_text(encoding="utf-8", errors="ignore").splitlines():
        m = pattern.match(line)
        if m:
            if current:
                msgs.append(current)
            current = {
                "date": m.group(1),
                "time": m.group(2),
                "sender": m.group(3).strip(),
                "text": m.group(4).strip(),
            }
        elif current:
            current["text"] += "\n" + line
    if current:
        msgs.append(current)
    return msgs


def classify_via_claude(messages: list[dict], api_key: str) -> list[dict]:
    """Send each message to Claude, get back a category + a short summary."""
    try:
        import anthropic
    except ImportError:
        print(
            "ERROR: The anthropic package is not installed.\n"
            "    pip install anthropic",
            file=sys.stderr,
        )
        sys.exit(2)

    client = anthropic.Anthropic(api_key=api_key)

    classified = []
    for i, msg in enumerate(messages):
        body = msg["text"][:1000]
        prompt = (
            f"You are classifying a single feedback message about Playtronica's "
            f"help center. Pick ONE category from this list, then write a 5-10 "
            f"word summary.\n\n"
            f"Categories: {', '.join(CATEGORIES)}\n\n"
            f"Message:\n{body}\n\n"
            f"Respond as JSON only: "
            f'{{"category": "<one of the categories>", "summary": "<short summary>"}}'
        )
        try:
            resp = client.messages.create(
                model="claude-haiku-4-5-20251001",
                max_tokens=200,
                messages=[{"role": "user", "content": prompt}],
            )
            text = resp.content[0].text.strip()
            # Strip code-fence if present
            text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text, flags=re.MULTILINE)
            data = json.loads(text)
            classified.append({
                **msg,
                "category": data.get("category", "off-topic"),
                "summary": data.get("summary", ""),
            })
        except Exception as e:
            classified.append({
                **msg,
                "category": "off-topic",
                "summary": f"classification failed: {e}",
            })
        if i % 10 == 0 and i:
            print(f"  ... classified {i}/{len(messages)}", file=sys.stderr)
    return classified


def summarize(classified: list[dict]) -> dict:
    counts = {c: 0 for c in CATEGORIES}
    samples = {c: [] for c in CATEGORIES}
    for item in classified:
        c = item["category"]
        counts[c] = counts.get(c, 0) + 1
        if len(samples[c]) < 5:
            samples[c].append(item.get("summary", ""))
    ranked = sorted(counts.items(), key=lambda kv: -kv[1])
    return {
        "total_messages": len(classified),
        "counts": dict(ranked),
        "samples_by_category": samples,
        "top_5_actionable": [
            {"category": c, "count": n, "samples": samples[c]}
            for c, n in ranked
            if c in {"broken-link", "missing-topic", "unclear-writing", "wrong-device", "bug-report"}
            and n > 0
        ][:5],
    }


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("export", help="WhatsApp .txt export OR feedback digest .txt")
    p.add_argument("--dry-run", action="store_true", help="parse and print counts only, no API calls")
    args = p.parse_args()

    path = Path(args.export)
    if not path.exists():
        print(f"File not found: {path}", file=sys.stderr)
        sys.exit(1)

    messages = parse_whatsapp_export(path)
    print(f"Parsed {len(messages)} messages from {path}", file=sys.stderr)

    if args.dry_run or not messages:
        print(json.dumps({"messages_parsed": len(messages)}, indent=2))
        return

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("ERROR: set ANTHROPIC_API_KEY before running.", file=sys.stderr)
        sys.exit(2)

    classified = classify_via_claude(messages, api_key)

    today = datetime.utcnow().strftime("%Y-%m-%d")
    DATA.mkdir(parents=True, exist_ok=True)
    digest_path = DATA / f"feedback-digest-{today}.json"
    digest_path.write_text(
        json.dumps(
            {"date": today, "messages": classified, "summary": summarize(classified)},
            indent=2,
            ensure_ascii=False,
        )
    )
    print(f"\n✓ Wrote digest → {digest_path.relative_to(REPO)}", file=sys.stderr)

    summary = summarize(classified)
    print("\n=== Feedback digest ===")
    print(f"Total messages: {summary['total_messages']}\n")
    print("Counts by category:")
    for cat, n in summary["counts"].items():
        if n:
            print(f"  {n:>4}  {cat}")
    print("\nTop 5 actionable (the content roadmap):")
    for i, item in enumerate(summary["top_5_actionable"], 1):
        print(f"  {i}. {item['category']} ({item['count']})")
        for s in item["samples"][:3]:
            print(f"       — {s}")


if __name__ == "__main__":
    main()
