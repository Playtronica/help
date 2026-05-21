#!/usr/bin/env python3
"""External link health check.

Walks every Markdown file under content/en/, extracts every external URL,
and checks each one responds. A dead external link on an ecommerce help
center is a trust killer — a buyer who clicks a broken "download firmware"
or "buy adapter" link assumes the whole company is broken.

Two modes:

  --structural   (default)  Offline. Validates URL shape only: scheme is
                            https, host is well-formed, no obvious typo,
                            no stray whitespace. Safe to run anywhere,
                            including CI without network egress.

  --live                    Sends a HEAD (falling back to GET) to every
                            URL and reports the status code. Requires
                            network access. Used in the monthly refresh.

Exit code: non-zero if any link is dead (live mode) or malformed
(structural mode).

Run:
  python3 scripts/check-external-links.py            # structural
  python3 scripts/check-external-links.py --live     # live (monthly)
"""

from __future__ import annotations

import re
import sys
import time
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content" / "en"

URL_RE = re.compile(r'https?://[^\s)\]"\'<>]+')

# Hosts that legitimately reject HEAD or rate-limit bots. In live mode we
# treat a connection success as a pass and do not fail the run on a 403/405
# from these — they are known-good destinations.
TOLERANT_HOSTS = {
    "apps.apple.com",
    "www.facebook.com",
    "drive.google.com",
    "github.com",
    "www.adafruit.com",
}

# Image CDN from the previous (super.so) help portal. Flagged as a
# migration risk — see notes printed at the end.
LEGACY_IMAGE_HOST = "images.spr.so"


def collect_urls() -> dict[str, list[str]]:
    """Return {url: [pages it appears on]}."""
    found: dict[str, list[str]] = {}
    for path in sorted(CONTENT.rglob("*.md")):
        rel = path.relative_to(CONTENT).as_posix()
        for m in URL_RE.finditer(path.read_text(encoding="utf-8")):
            url = m.group(0).rstrip(".,;:")
            found.setdefault(url, [])
            if rel not in found[url]:
                found[url].append(rel)
    return found


def structural_check(url: str) -> str | None:
    """Return an error string if the URL is malformed, else None."""
    if " " in url or "\t" in url:
        return "contains whitespace"
    parsed = urlparse(url)
    if parsed.scheme != "https":
        return f"not https (scheme: {parsed.scheme or 'none'})"
    if not parsed.netloc:
        return "no host"
    if ".." in parsed.netloc:
        return "double dot in host"
    if parsed.netloc.startswith(".") or parsed.netloc.endswith("."):
        return "host starts or ends with a dot"
    if "." not in parsed.netloc:
        return "host has no TLD"
    return None


def live_check(url: str) -> tuple[int, str]:
    """HEAD then GET. Return (status_code, note). 0 = connection failed."""
    import urllib.request
    import urllib.error

    host = urlparse(url).netloc
    req_headers = {"User-Agent": "Mozilla/5.0 (PlaytronicaLinkCheck/1.0)"}

    for method in ("HEAD", "GET"):
        try:
            req = urllib.request.Request(url, method=method, headers=req_headers)
            with urllib.request.urlopen(req, timeout=12) as resp:
                return resp.status, method
        except urllib.error.HTTPError as e:
            if method == "GET":
                return e.code, "GET"
            # try GET next
            continue
        except Exception as e:  # noqa: BLE001
            if method == "GET":
                return 0, str(e)[:60]
            continue
    return 0, "unreachable"


def main() -> int:
    live = "--live" in sys.argv
    urls = collect_urls()

    print(f"\nExternal link check — {'LIVE' if live else 'STRUCTURAL'}")
    print("=" * 44)
    print(f"Unique external URLs: {len(urls)}\n")

    problems: list[str] = []
    legacy_images = 0

    for url in sorted(urls):
        host = urlparse(url).netloc
        if host == LEGACY_IMAGE_HOST:
            legacy_images += 1

        struct = structural_check(url)
        if struct:
            problems.append(f"  MALFORMED  {url}\n             {struct}\n             on: {', '.join(urls[url])}")
            continue

        if live:
            code, note = live_check(url)
            tolerant = host in TOLERANT_HOSTS
            ok = (200 <= code < 400) or (tolerant and code in (403, 405, 429))
            status = "ok" if ok else "DEAD"
            print(f"  [{code or '---'}] {status:4} {url}")
            if not ok:
                problems.append(
                    f"  DEAD  [{code}] {url}\n        {note}\n        on: {', '.join(urls[url])}"
                )
            time.sleep(0.25)  # be polite

    print()
    if legacy_images:
        print(
            f"NOTE: {legacy_images} image(s) are still served from {LEGACY_IMAGE_HOST}\n"
            f"      (the old super.so portal CDN). If that account lapses, those\n"
            f"      images break. Migration target: re-host under public/illustrations/.\n"
        )

    if problems:
        print(f"{len(problems)} issue(s) found:\n")
        print("\n\n".join(problems))
        print()
        return 1

    print("All external links pass.\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
