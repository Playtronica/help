#!/usr/bin/env python3
"""Fail a static Help build when customer-critical assets are missing."""

from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out"


def require(path: Path, errors: list[str]) -> str:
    if not path.is_file():
        errors.append(f"missing build artifact: {path.relative_to(ROOT)}")
        return ""
    return path.read_text(encoding="utf-8", errors="replace")


def article(html: str, label: str, errors: list[str]) -> str:
    match = re.search(r"<article[^>]*data-pagefind-body[^>]*>(.*?)</article>", html, re.DOTALL)
    if not match:
        errors.append(f"missing article body in {label}")
        return html
    return match.group(1)


def main() -> int:
    errors: list[str] = []
    require(OUT / "_pagefind/pagefind.js", errors)
    biotron = article(require(OUT / "devices/biotron/index.html", errors), "Biotron", errors)
    offline = article(require(OUT / "software/biotron-offline-settings/index.html", errors), "offline Settings", errors)
    midi = article(require(OUT / "software/biotron-midi-cc/index.html", errors), "Biotron MIDI", errors)
    reset = article(require(OUT / "troubleshooting/firmware-reset/index.html", errors), "firmware reset", errors)

    for label, body in {
        "Biotron": biotron,
        "offline Settings": offline,
        "Biotron MIDI": midi,
        "firmware reset": reset,
    }.items():
        if len(re.findall(r"<h1\b", body)) != 1:
            errors.append(f"{label} must render exactly one H1")
        if len(re.findall(r'class="task-card"', body)) != 4:
            errors.append(f"{label} must start with four task-first navigation cards")
        ids = set(re.findall(r'\bid="([^"]+)"', body))
        for anchor in re.findall(r'<a[^>]+href="#([^"]+)"', body):
            if anchor not in ids:
                errors.append(f"{label} task link #{anchor} has no built heading target")

    required_biotron = [
        "task-grid",
        "not permission to bridge contacts",
        "/software/biotron-offline-settings/",
    ]
    for marker in required_biotron:
        if marker not in biotron:
            errors.append(f"Biotron build is missing safety marker: {marker}")

    if "MIDI Clock is not required for CC" not in offline:
        errors.append("offline/DAW build is missing the MIDI Clock/CC boundary")
    if "Wait for revision confirmation" not in reset or "biotron-boot-area.svg" not in reset:
        errors.append("firmware reset build is missing the Biotron revision gate")
    if "facebook.com/groups/playtronica" in biotron or "facebook.com/groups/playtronica" in reset:
        errors.append("Biotron recovery still routes support through Facebook")

    css = "\n".join(
        path.read_text(encoding="utf-8", errors="replace")
        for path in (OUT / "_next/static/css").glob("*.css")
    )
    for font_url in re.findall(r'url\(["\']?(/fonts/[^)"\']+)', css):
        if not (OUT / font_url.lstrip("/")).is_file():
            errors.append(f"built CSS requests missing font: {font_url}")

    if errors:
        print("Built Help checks failed:\n- " + "\n- ".join(errors))
        return 1
    print("Built Help checks OK: Pagefind, Biotron recovery, DAW clock and local font assets")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
