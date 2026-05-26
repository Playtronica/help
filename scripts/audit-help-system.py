#!/usr/bin/env python3
"""
audit-help-system.py — Reproducible 5-method system audit of the help center.

Runs the same analysis the monthly Cowork scheduled task uses: GAP / Bottlenecks
/ Staleness / SO Patterns / Leverage Points. Outputs JSON to stdout so the HTML
report can be generated downstream (manually or by the scheduled task).

Usage:
    python3 scripts/audit-help-system.py                 # JSON to stdout
    python3 scripts/audit-help-system.py --pretty        # pretty-printed
    python3 scripts/audit-help-system.py --human         # human-readable text

The exit code is always 0 — this is a measurement tool, not a CI gate.
For CI-blocking checks see scripts/check-internal-consistency.py.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
CONTENT = REPO_ROOT / "content"
EN = CONTENT / "en"


def read_text(p: Path) -> str:
    try:
        return p.read_text(encoding="utf-8")
    except Exception:
        return ""


def parse_frontmatter(text: str) -> dict:
    """Tiny YAML frontmatter parser — handles flat key: value and key: [list]."""
    fm = {}
    if not text.startswith("---"):
        return fm
    end = text.find("\n---", 4)
    if end == -1:
        return fm
    block = text[4:end]
    for line in block.splitlines():
        m = re.match(r"^([a-z_][a-z0-9_]*):\s*(.+?)\s*$", line, re.IGNORECASE)
        if not m:
            continue
        key, value = m.group(1), m.group(2)
        if value.startswith("[") and value.endswith("]"):
            inner = value[1:-1]
            fm[key] = [
                v.strip().strip('"').strip("'")
                for v in inner.split(",")
                if v.strip()
            ]
        else:
            fm[key] = value.strip().strip('"').strip("'")
    return fm


def iter_pages(lang: str):
    base = CONTENT / lang
    if not base.exists():
        return
    for p in sorted(base.rglob("*.md")):
        yield p


def method1_gap() -> dict:
    """GAP — documented but not deployed."""
    en_pages = list(iter_pages("en"))
    langs = ["de", "es", "fr", "ja"]
    translations = {l: len(list(iter_pages(l))) for l in langs}

    placeholders = []
    for p in en_pages:
        text = read_text(p)
        for marker in ("TODO", "FIXME", "XXX", "TBA", "coming soon", "placeholder"):
            if marker.lower() in text.lower():
                placeholders.append({"file": str(p.relative_to(REPO_ROOT)), "marker": marker})
                break

    missing_summary = []
    missing_segment = []
    missing_target = []
    for p in en_pages:
        fm = parse_frontmatter(read_text(p))
        if not fm.get("summary"):
            missing_summary.append(str(p.relative_to(REPO_ROOT)))
        if not fm.get("segment"):
            missing_segment.append(str(p.relative_to(REPO_ROOT)))
        if not fm.get("deflection_target"):
            missing_target.append(str(p.relative_to(REPO_ROOT)))

    return {
        "en_total": len(en_pages),
        "translations": translations,
        "translation_coverage_pct": {
            l: round(100 * v / len(en_pages), 1) for l, v in translations.items()
        },
        "placeholders": placeholders,
        "missing_summary": missing_summary,
        "missing_segment_count": len(missing_segment),
        "missing_segment_sample": missing_segment[:5],
        "missing_deflection_target_count": len(missing_target),
    }


def method2_bottlenecks() -> dict:
    """Bottleneck — physical blockers in reader/contributor flow."""
    en_pages = list(iter_pages("en"))
    sizes = [(p, p.stat().st_size) for p in en_pages]
    sizes.sort(key=lambda t: -t[1])
    largest = [{"file": str(p.relative_to(REPO_ROOT)), "bytes": s} for p, s in sizes[:5]]

    orphans = []
    for p in en_pages:
        text = read_text(p)
        # internal links — [text](/path/...) excluding /devices/X (shop is shop.playtronica.com)
        links = re.findall(r"\]\((/[^)\s]+)\)", text)
        internal = [l for l in links if not l.startswith("/_")]
        if len(internal) <= 1:
            orphans.append({"file": str(p.relative_to(REPO_ROOT)), "links_out": len(internal)})

    external_urls = set()
    for p in en_pages:
        text = read_text(p)
        for m in re.finditer(r"https?://[^\s)]+", text):
            external_urls.add(m.group(0).rstrip(".,)"))

    return {
        "largest_pages": largest,
        "orphan_pages_count": len(orphans),
        "orphan_pages": orphans,
        "unique_external_urls": len(external_urls),
    }


def method3_staleness() -> dict:
    """Staleness — contradictions, hard-coded dates, drift."""
    en_pages = list(iter_pages("en"))

    sla_phrases = Counter()
    bfcm_hardcodes = []
    settings_urls = Counter()

    for p in en_pages:
        text = read_text(p)
        for m in re.finditer(
            r"(\d+\s+(?:business\s+)?days?|24\s+hours|next\s+business\s+day)",
            text,
            re.IGNORECASE,
        ):
            sla_phrases[m.group(0).lower()] += 1
        if re.search(r"december\s+\d+|january\s+\d+|black\s+friday|BFCM", text, re.IGNORECASE):
            bfcm_hardcodes.append(str(p.relative_to(REPO_ROOT)))
        for m in re.finditer(
            r"(synth\.playtronica\.com/settings|settings\.playtronica\.com|playtronica\.github\.io/WebMidiOrbita)",
            text,
        ):
            settings_urls[m.group(1)] += 1

    emails = Counter()
    for p in en_pages:
        for m in re.finditer(r"([a-z]+)@playtronica\.com", read_text(p)):
            emails[m.group(1)] += 1

    return {
        "sla_phrase_variants": dict(sla_phrases.most_common(10)),
        "bfcm_hardcoded_files": bfcm_hardcodes,
        "settings_urls": dict(settings_urls),
        "settings_canonical_violation": len(settings_urls) > 1,
        "email_distribution": dict(emails),
    }


def method4_so_patterns() -> dict:
    """SO patterns — what self-organizes."""
    en_pages = list(iter_pages("en"))
    incoming = Counter()
    for p in en_pages:
        text = read_text(p)
        for link in re.findall(r"\]\((/[a-z][^)]*)\)", text):
            # Normalize to slug
            slug = link.strip("/").split("/")[-1] or link.strip("/")
            incoming[slug] += 1

    top_hubs = [{"slug": s, "incoming": c} for s, c in incoming.most_common(10)]

    section_counts = Counter()
    for p in en_pages:
        section_counts[p.parent.name] += 1

    return {
        "top_incoming_hubs": top_hubs,
        "section_density": dict(section_counts.most_common()),
    }


def method5_leverage() -> dict:
    """Leverage points — high impact / low effort."""
    en_pages = list(iter_pages("en"))
    total = len(en_pages)
    coverage = {
        "summary": 0,
        "segment": 0,
        "deflection_target": 0,
        "emoji": 0,
        "last_edited": 0,
    }
    for p in en_pages:
        fm = parse_frontmatter(read_text(p))
        for field in coverage:
            if fm.get(field):
                coverage[field] += 1

    coverage_pct = {k: round(100 * v / total, 1) for k, v in coverage.items()}

    return {
        "total_en_pages": total,
        "frontmatter_coverage": coverage,
        "frontmatter_coverage_pct": coverage_pct,
        "biggest_gaps": [
            field
            for field, pct in sorted(coverage_pct.items(), key=lambda kv: kv[1])
            if pct < 50
        ],
    }


def run_audit() -> dict:
    return {
        "method_1_gap": method1_gap(),
        "method_2_bottlenecks": method2_bottlenecks(),
        "method_3_staleness": method3_staleness(),
        "method_4_so_patterns": method4_so_patterns(),
        "method_5_leverage": method5_leverage(),
    }


def to_human(report: dict) -> str:
    lines = []
    g = report["method_1_gap"]
    lines.append("== METHOD 1 — GAP ==")
    lines.append(
        f"EN pages: {g['en_total']}  |  Translation coverage: "
        + ", ".join(f"{l}: {v}%" for l, v in g["translation_coverage_pct"].items())
    )
    lines.append(
        f"Missing segment: {g['missing_segment_count']} / {g['en_total']} pages"
    )
    lines.append(
        f"Missing deflection_target: {g['missing_deflection_target_count']} / {g['en_total']}"
    )
    if g["placeholders"]:
        lines.append(f"Placeholders: {len(g['placeholders'])} files")

    b = report["method_2_bottlenecks"]
    lines.append("\n== METHOD 2 — BOTTLENECKS ==")
    lines.append(f"Orphan pages (≤1 internal link): {b['orphan_pages_count']}")
    lines.append(f"Unique external URLs: {b['unique_external_urls']}")
    lines.append("Largest pages:")
    for p in b["largest_pages"][:3]:
        lines.append(f"  {p['bytes']:>6} bytes  {p['file']}")

    s = report["method_3_staleness"]
    lines.append("\n== METHOD 3 — STALENESS ==")
    if s["settings_canonical_violation"]:
        lines.append(
            "Settings URL not canonical — variants: "
            + ", ".join(s["settings_urls"].keys())
        )
    lines.append(
        "Email distribution: " + ", ".join(f"{k}@: {v}" for k, v in s["email_distribution"].items())
    )
    lines.append(f"BFCM hardcoded in {len(s['bfcm_hardcoded_files'])} files")

    so = report["method_4_so_patterns"]
    lines.append("\n== METHOD 4 — SO PATTERNS ==")
    lines.append("Top incoming hubs:")
    for h in so["top_incoming_hubs"][:5]:
        lines.append(f"  {h['incoming']:>3}  /{h['slug']}/")
    lines.append("Section density: " + ", ".join(f"{k}={v}" for k, v in so["section_density"].items()))

    lv = report["method_5_leverage"]
    lines.append("\n== METHOD 5 — LEVERAGE ==")
    lines.append(
        "Frontmatter coverage: "
        + ", ".join(f"{k} {v}%" for k, v in lv["frontmatter_coverage_pct"].items())
    )
    if lv["biggest_gaps"]:
        lines.append("Biggest gaps (<50%): " + ", ".join(lv["biggest_gaps"]))
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pretty", action="store_true", help="pretty-print JSON")
    parser.add_argument("--human", action="store_true", help="human-readable text output")
    args = parser.parse_args()

    report = run_audit()
    if args.human:
        print(to_human(report))
    elif args.pretty:
        print(json.dumps(report, indent=2, ensure_ascii=False))
    else:
        print(json.dumps(report, ensure_ascii=False))


if __name__ == "__main__":
    main()
