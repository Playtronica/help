#!/usr/bin/env python3
"""
rebuild-hypothesis-log.py — regenerate content/_data/hypotheses.json from
current page frontmatter. Preserves any existing manual fields (outcome,
notes, what_we_hope) per-page if they already exist.

Run after adding a new page or after a major content edit.
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timedelta
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
EN = REPO / "content" / "en"
OUT = REPO / "content" / "_data" / "hypotheses.json"


def parse_frontmatter(text: str) -> dict:
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 4)
    if end == -1:
        return {}
    fm = {}
    for line in text[4:end].splitlines():
        m = re.match(r"^([a-z_]+):\s*(.+?)$", line, re.IGNORECASE)
        if not m:
            continue
        k, v = m.group(1), m.group(2).strip().strip('"').strip("'")
        if v.startswith("[") and v.endswith("]"):
            v = [x.strip().strip('"').strip("'") for x in v[1:-1].split(",")]
        fm[k] = v
    return fm


def main():
    existing = {}
    if OUT.exists():
        for p in json.loads(OUT.read_text()).get("pages", []):
            existing[p["url"]] = p

    hypotheses = []
    for p in sorted(EN.rglob("*.md")):
        fm = parse_frontmatter(p.read_text(encoding="utf-8"))
        slug = fm.get("slug")
        section = fm.get("section", p.parent.name)
        url = f"/{section}/{slug}/"

        last_edited = fm.get("last_edited") or "2026-05-26"
        segment = fm.get("segment", [])
        if isinstance(segment, str):
            segment = [segment]

        # Preserve manual fields if entry already exists
        prev = existing.get(url, {})
        try:
            base = datetime.strptime(last_edited, "%Y-%m-%d")
        except ValueError:
            base = datetime(2026, 5, 26)
        next_check_in = (base + timedelta(days=90)).strftime("%Y-%m-%d")

        deflection_target = fm.get("deflection_target")
        try:
            deflection_target = int(deflection_target) if deflection_target else prev.get("deflection_target_per_month")
        except (TypeError, ValueError):
            deflection_target = None

        hypotheses.append({
            "url": url,
            "title": fm.get("title", slug),
            "audience": segment,
            "what_we_hope": prev.get(
                "what_we_hope",
                f"Address topic '{slug}' for {', '.join(segment) if segment else 'general'} readers, reduce support tickets, let them self-serve.",
            ),
            "deflection_target_per_month": deflection_target,
            "first_published": prev.get("first_published", last_edited),
            "next_check_in": prev.get("next_check_in", next_check_in),
            "outcome": prev.get("outcome"),
            "notes": prev.get("notes", ""),
        })

    out = {
        "schema_version": 1,
        "description": (
            "Hypothesis log — each help-center page is a hypothesis that "
            "addressing this topic for this audience reduces support tickets. "
            "Every 90 days we review whether the page is doing its job. "
            "See docs/HYPOTHESIS-LOG.md."
        ),
        "generated_at": datetime.utcnow().strftime("%Y-%m-%d"),
        "pages": hypotheses,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False))
    print(f"✓ Wrote {len(hypotheses)} hypotheses to {OUT.relative_to(REPO)}")


if __name__ == "__main__":
    main()
