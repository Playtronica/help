#!/usr/bin/env python3
"""Structural accessibility and portability checks for local device SVGs."""

from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public/illustrations"
CONTENT = ROOT / "content/en/devices"


def fail(message: str, errors: list[str]) -> None:
    errors.append(message)


def main() -> int:
    errors: list[str] = []
    svgs = sorted(ASSETS.glob("*/*.svg"))
    referenced = set()
    for page in CONTENT.glob("*.md"):
        text = page.read_text()
        for src, alt in re.findall(r'<img\s+[^>]*src="([^"]+\.svg)(?:\?[^"]*)?"[^>]*alt="([^"]*)"', text):
            referenced.add(src.lstrip("/"))
            if len(alt.strip()) < 20:
                fail(f"{page}: local device illustration needs descriptive alt text", errors)

    for svg in svgs:
        rel = svg.relative_to(ROOT).as_posix()
        try:
            tree = ET.parse(svg)
        except ET.ParseError as exc:
            fail(f"{rel}: invalid XML: {exc}", errors)
            continue
        root = tree.getroot()
        ns = {"s": "http://www.w3.org/2000/svg"}
        title = root.find("s:title", ns)
        desc = root.find("s:desc", ns)
        labelled = root.attrib.get("aria-labelledby", "").split()
        if root.attrib.get("role") != "img":
            fail(f"{rel}: root must have role=img", errors)
        if title is None or not (title.text or "").strip() or not title.attrib.get("id"):
            fail(f"{rel}: missing non-empty titled element", errors)
        if desc is None or len((desc.text or "").strip()) < 20 or not desc.attrib.get("id"):
            fail(f"{rel}: missing descriptive desc element", errors)
        expected = [node.attrib.get("id") for node in (title, desc) if node is not None]
        if labelled != expected:
            fail(f"{rel}: aria-labelledby must reference title then desc", errors)
        viewbox = root.attrib.get("viewBox", "").split()
        if len(viewbox) != 4 or any(float(value) <= 0 for value in viewbox[2:]):
            fail(f"{rel}: missing/invalid positive viewBox", errors)
        if svg.stat().st_size > 1_500_000:
            fail(f"{rel}: self-contained asset exceeds 1.5 MB", errors)
        for image in root.findall(".//s:image", ns):
            href = image.attrib.get("{http://www.w3.org/1999/xlink}href", image.attrib.get("href", ""))
            if not href.startswith("data:image/"):
                fail(f"{rel}: embedded board render must be self-contained", errors)

    missing = [ref for ref in sorted(referenced) if not (ROOT / "public" / ref).exists()]
    for ref in missing:
        fail(f"content references missing asset: {ref}", errors)

    biotron = (CONTENT / "biotron.md").read_text()
    reset = (ROOT / "content/en/troubleshooting/firmware-reset.md").read_text()
    biotron_top = ASSETS / "biotron/biotron-top.svg"
    biotron_top_text = biotron_top.read_text()
    if 'data-role="boot-contact-bracket"' not in biotron_top_text:
        fail("Biotron overview must point to BOOT contacts without covering them", errors)
    if 'class="marker-text"' in biotron_top_text:
        fail("Biotron BOOT callout must not place a numbered marker over the contacts", errors)
    biotron_safety_markers = [
        "not permission to bridge contacts",
        "/troubleshooting/firmware-reset/",
        "do not probe contacts",
    ]
    if any(marker not in biotron for marker in biotron_safety_markers):
        fail("Biotron BOOT copy must require support-confirmed hardware revision", errors)
    if "The board must match the picture" not in reset or "instead of probing pads" not in reset:
        fail("Firmware reset copy must contain the revision mismatch stop condition", errors)

    boot_asset = ASSETS / "biotron/biotron-boot-area.svg"
    if not boot_asset.exists():
        fail("Biotron needs a dedicated readable BOOT-area review crop", errors)
    else:
        boot_text = boot_asset.read_text()
        required = [
            'data-role="candidate-pad-a"', 'data-role="candidate-pad-b"',
            "BOOT AREA TO VERIFY", "TWO DIAGONAL", "DO NOT BRIDGE",
            'font: 700 42px', 'font: 700 30px',
        ]
        for marker in required:
            if marker not in boot_text:
                fail(f"Biotron BOOT crop is missing readability/safety marker: {marker}", errors)
        if "biotron-boot-area.svg" not in reset:
            fail("Firmware-reset copy must route to the readable Biotron BOOT review crop", errors)

    if errors:
        print("Device illustration checks failed:\n- " + "\n- ".join(errors), file=sys.stderr)
        return 1
    print(f"Device illustration checks OK: {len(svgs)} SVGs, {len(referenced)} content references")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
