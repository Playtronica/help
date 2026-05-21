#!/usr/bin/env python3
"""Translation freshness check.

English (content/en/) is the single source of truth. Every other language
under content/<lang>/ is a generated mirror. Each translated file records, in
its frontmatter, the sha of the English source it was translated from:

    source_sha: 3f9a1c7e

This script compares that recorded sha against the CURRENT sha of the English
source. Three states per page, per language:

    MISSING  — the English page has no translation in this language yet.
    STALE    — a translation exists, but English changed since (sha mismatch).
    FRESH    — translation is up to date.

It is the tool that drives the manual translation workflow: run it, and it
tells Claude exactly which pages to (re)translate. See docs/I18N.md.

Usage:
    npm run i18n:status
    python3 scripts/check-translation-freshness.py
    python3 scripts/check-translation-freshness.py --lang de   # one language
    python3 scripts/check-translation-freshness.py --list      # plain file list

Exit code: 0 if every in-scope language is fully fresh, 1 otherwise.
"""

from __future__ import annotations

import hashlib
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"
EN = CONTENT / "en"

# Target languages — keep in sync with docs/I18N.md.
TARGET_LANGS = ["de", "es", "fr", "ja"]

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n(.*)$", re.DOTALL)


def split_frontmatter(text: str) -> tuple[dict, str]:
    m = FRONTMATTER_RE.match(text)
    if not m:
        return {}, text
    fm = {}
    for line in m.group(1).split("\n"):
        kv = re.match(r"^([\w-]+):\s*(.*)$", line.strip())
        if kv:
            v = kv.group(2).strip()
            if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
                v = v[1:-1]
            fm[kv.group(1)] = v
    return fm, m.group(2)


def body_sha(text: str) -> str:
    """sha256 (first 8 hex chars) of the file body, frontmatter excluded."""
    _, body = split_frontmatter(text)
    normalised = body.strip().encode("utf-8")
    return hashlib.sha256(normalised).hexdigest()[:8]


def en_pages() -> dict[str, str]:
    """Return {relative_path: current_body_sha} for every English page."""
    out = {}
    for path in sorted(EN.rglob("*.md")):
        rel = path.relative_to(EN).as_posix()
        out[rel] = body_sha(path.read_text(encoding="utf-8"))
    return out


def check_language(lang: str, en: dict[str, str]) -> dict[str, list[str]]:
    """Return {'missing': [...], 'stale': [...], 'fresh': [...], 'orphan': [...]}."""
    lang_dir = CONTENT / lang
    result = {"missing": [], "stale": [], "fresh": [], "orphan": []}

    for rel, en_sha in en.items():
        tpath = lang_dir / rel
        if not tpath.exists():
            result["missing"].append(rel)
            continue
        fm, _ = split_frontmatter(tpath.read_text(encoding="utf-8"))
        recorded = fm.get("source_sha", "")
        if recorded == en_sha:
            result["fresh"].append(rel)
        else:
            result["stale"].append(rel)

    # Orphans — a translated file with no English counterpart (English page
    # was renamed or deleted). Those translations should be removed.
    if lang_dir.exists():
        for path in sorted(lang_dir.rglob("*.md")):
            rel = path.relative_to(lang_dir).as_posix()
            if rel not in en:
                result["orphan"].append(rel)

    return result


def main() -> int:
    args = sys.argv[1:]
    plain_list = "--list" in args
    langs = list(TARGET_LANGS)
    if "--lang" in args:
        i = args.index("--lang")
        if i + 1 < len(args):
            langs = [args[i + 1]]

    en = en_pages()
    total_en = len(en)

    if plain_list:
        # Machine-readable: one "lang\trel\tstate" line per page needing work.
        for lang in langs:
            r = check_language(lang, en)
            for rel in r["missing"]:
                print(f"{lang}\t{rel}\tMISSING")
            for rel in r["stale"]:
                print(f"{lang}\t{rel}\tSTALE")
        return 0

    print(f"\nTranslation freshness — {total_en} English source pages")
    print("=" * 52)

    all_clean = True
    fully_done = True
    for lang in langs:
        r = check_language(lang, en)
        done = len(r["fresh"])
        miss = len(r["missing"])
        stale = len(r["stale"])
        orphan = len(r["orphan"])
        pct = (done / total_en * 100) if total_en else 0
        bar = "█" * int(pct / 10) + "░" * (10 - int(pct / 10))
        print(f"\n  {lang.upper()}  {bar}  {done}/{total_en} fresh ({pct:.0f}%)")
        if miss:
            print(f"       missing: {miss}")
        if stale:
            print(f"       stale:   {stale}")
        if orphan:
            print(f"       orphan:  {orphan}  (translated file, no English source)")
        if miss or stale or orphan:
            all_clean = False
            # Only enumerate when the gap is small enough to be actionable —
            # a brand-new language with everything missing does not need 42
            # bullet points.
            if miss + stale + orphan <= 15:
                for rel in r["missing"]:
                    print(f"         + {rel}  (never translated)")
                for rel in r["stale"]:
                    print(f"         ~ {rel}  (English changed since translation)")
                for rel in r["orphan"]:
                    print(f"         - {rel}  (delete — no English source)")
        if miss or stale:
            fully_done = False

    print()
    if total_en and fully_done:
        print("All in-scope languages are fully translated and fresh.\n")
        return 0

    print("Run the translation workflow in docs/I18N.md to close the gaps.\n")
    return 0 if all_clean else 1


if __name__ == "__main__":
    sys.exit(main())
