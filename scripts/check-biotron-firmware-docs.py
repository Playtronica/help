#!/usr/bin/env python3
"""Fail when the documented Biotron incoming-CC contract drifts from source."""

from pathlib import Path
import argparse
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
DOC = ROOT / "content/en/software/biotron-midi-cc.md"
EXPECTED_SCOPE = {
    3: "Global", 9: "Channel-specific", 14: "Channel-specific",
    15: "Global", 20: "Channel-specific", 21: "Global", 22: "Global",
    23: "Global", 24: "Global", 25: "Channel-specific",
    26: "Channel-specific", 27: "Global", 28: "Global", 30: "Global",
    31: "Channel-specific", 85: "Global", 86: "Global", 87: "Global",
}


def documented_contract(text: str) -> dict[int, str]:
    rows = re.findall(r"^\|\s*(\d+)\s*\|[^\n|]+\|\s*(Global|Channel-specific)\s*\|$", text, re.M)
    return {int(cc): scope for cc, scope in rows}


def firmware_ccs(params_c: Path) -> set[int]:
    text = params_c.read_text()
    return {int(cc) for cc in re.findall(r"add_CC\([^,]+,\s*(\d+)\s*\);", text)}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--firmware-root", type=Path,
                        help="Optional biotron-firmware checkout for source comparison")
    args = parser.parse_args()

    actual = documented_contract(DOC.read_text())
    if actual != EXPECTED_SCOPE:
        print(f"Biotron CC table mismatch\nexpected={EXPECTED_SCOPE}\nactual={actual}", file=sys.stderr)
        return 1

    if args.firmware_root:
        params_c = args.firmware_root / "src/params.c"
        source_ccs = firmware_ccs(params_c)
        if source_ccs != set(EXPECTED_SCOPE):
            print(f"Firmware CC registration drift\ndocs={set(EXPECTED_SCOPE)}\nsource={source_ccs}", file=sys.stderr)
            return 1

    print(f"Biotron firmware/docs contract OK: {len(actual)} incoming CC commands")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
