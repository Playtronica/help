#!/usr/bin/env python3
"""Build a readable, non-procedural Biotron BOOT-area review crop."""

from __future__ import annotations

import base64
import hashlib
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/illustrations/biotron/biotron-top.svg"
OUTPUT = ROOT / "public/illustrations/biotron/biotron-boot-area.svg"
EXPECTED_SOURCE_SHA256 = "63835aa39f633f33e2a78e012631668b8decbc6e5bc346e53b2226719bc58bf0"


def main() -> None:
    source = SOURCE.read_text(encoding="utf-8")
    match = re.search(r'<image[^>]+(?:xlink:href|href)="(data:image/png;base64,([^"]+))"', source)
    if not match:
        raise SystemExit("embedded Biotron board render not found")
    data_uri, encoded = match.groups()
    digest = hashlib.sha256(base64.b64decode(encoded)).hexdigest()
    if digest != EXPECTED_SOURCE_SHA256:
        raise SystemExit(
            f"Biotron render changed ({digest}); re-verify the crop before rebuilding"
        )

    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 560" role="img" aria-labelledby="title desc" data-source-sha256="{digest}">
  <title id="title">Biotron BOOT area — revision review close-up</title>
  <desc id="desc">Large close-up of the candidate BOOT area on the pictured USB-C Biotron board. Two diagonal copper pads are separately outlined for hardware-revision review. This image is not approval to bridge contacts.</desc>
  <defs>
    <clipPath id="crop"><rect x="0" y="0" width="600" height="360" rx="18"/></clipPath>
    <style>
      .title {{ font: 700 42px/1.1 Arial, Helvetica, sans-serif; fill: #1a1a2e; }}
      .copy {{ font: 700 30px/1.2 Arial, Helvetica, sans-serif; fill: #1a1a2e; }}
      .stop {{ font: 700 28px/1.2 Arial, Helvetica, sans-serif; fill: #5b2434; }}
      .badge {{ font: 700 30px/1 Arial, Helvetica, sans-serif; fill: #ffffff; }}
      .ring {{ fill: none; stroke: #5c6bc0; stroke-width: 7; }}
      .leader {{ fill: none; stroke: #1a1a2e; stroke-width: 4; stroke-linecap: round; }}
    </style>
  </defs>
  <rect width="600" height="560" rx="18" fill="#ffffff"/>
  <g clip-path="url(#crop)">
    <image x="-1488" y="-96" width="2308.8" height="1161.6" href="{data_uri}"/>
    <rect x="14" y="14" width="360" height="42" rx="21" fill="#ffffff" fill-opacity="0.94"/>
    <text x="30" y="43" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#1a1a2e">PICTURED USB-C BOARD ONLY</text>
  </g>
  <circle data-role="candidate-pad-a" class="ring" cx="197" cy="192" r="28"/>
  <circle data-role="candidate-pad-b" class="ring" cx="240" cy="238" r="28"/>
  <path class="leader" d="M176 171 L132 126"/>
  <path class="leader" d="M261 259 L305 304"/>
  <circle cx="115" cy="109" r="28" fill="#5c6bc0"/>
  <text class="badge" x="115" y="119" text-anchor="middle">1</text>
  <circle cx="322" cy="321" r="28" fill="#5c6bc0"/>
  <text class="badge" x="322" y="331" text-anchor="middle">2</text>
  <text class="title" x="30" y="420">BOOT AREA TO VERIFY</text>
  <text class="copy" x="30" y="468">TWO DIAGONAL COPPER PADS</text>
  <text class="stop" x="30" y="510">DO NOT BRIDGE UNTIL</text>
  <text class="stop" x="30" y="546">REVISION IS CONFIRMED</text>
</svg>
'''
    OUTPUT.write_text(svg, encoding="utf-8")
    print(f"wrote {OUTPUT.relative_to(ROOT)} from review render {digest[:12]}")


if __name__ == "__main__":
    main()
