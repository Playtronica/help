#!/usr/bin/env python3
"""
check-deflection-vs-tickets.py — compare per-page deflection_target with the
real Freshdesk ticket volume over a date range.

For each page that declares `deflection_target_per_month` in its hypothesis log,
we count tickets in Freshdesk whose subject or body contains the page slug or
device name, and report:

    page_url   declared_target   actual_tickets   status

Status is one of:
    GREEN    actual <= 60% of target      page is doing its job
    YELLOW   60% < actual <= 100%         page is keeping pace
    RED      actual > target              page is failing to deflect
    UNKNOWN  no target declared / no data the system cannot answer yet

Usage:
    export FRESHDESK_DOMAIN=playtronica.freshdesk.com
    export FRESHDESK_API_KEY=...
    python3 scripts/check-deflection-vs-tickets.py --window-days 30

This script does not modify pages. Its job is to surface the signal so a human
can decide whether to rewrite, reframe, or archive each underperforming page.
The monthly Cowork audit task feeds this report into the hypothesis-log review.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
from datetime import datetime, timedelta
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

REPO = Path(__file__).resolve().parent.parent
DATA = REPO / "content" / "_data"


def freshdesk_count(domain: str, api_key: str, query: str, since: datetime) -> int:
    """Hit Freshdesk's search/tickets endpoint and count matching tickets."""
    since_iso = since.strftime("%Y-%m-%dT00:00:00Z")
    q = f'"{query}" AND created_at:>"{since_iso}"'
    url = f"https://{domain}/api/v2/search/tickets?query={urlencode({'': q})[1:]}"
    req = Request(url)
    # Basic auth: api_key as username, X as password
    import base64
    token = base64.b64encode(f"{api_key}:X".encode()).decode()
    req.add_header("Authorization", f"Basic {token}")
    try:
        with urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read())
            return data.get("total", 0)
    except Exception as e:
        print(f"  WARN: Freshdesk query failed for '{query}': {e}", file=sys.stderr)
        return -1


def status_for(actual: int, target: int) -> str:
    if target is None or actual < 0:
        return "UNKNOWN"
    if actual <= int(target * 0.6):
        return "GREEN"
    if actual <= target:
        return "YELLOW"
    return "RED"


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--window-days", type=int, default=30)
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="show pages with deflection_target but skip Freshdesk calls",
    )
    args = p.parse_args()

    hyp_path = DATA / "hypotheses.json"
    if not hyp_path.exists():
        print(
            "hypotheses.json not found — run scripts/rebuild-hypothesis-log.py first.",
            file=sys.stderr,
        )
        sys.exit(1)
    hyp = json.loads(hyp_path.read_text())
    pages = [h for h in hyp.get("pages", []) if h.get("deflection_target_per_month")]
    if not pages:
        print(
            "No pages declare deflection_target_per_month yet.\n"
            "Add it to frontmatter on the pages whose success you want to measure.",
            file=sys.stderr,
        )
        sys.exit(0)

    if args.dry_run:
        print(f"Would check {len(pages)} pages against Freshdesk:")
        for p in pages:
            print(f"  {p['url']:48s}  target={p['deflection_target_per_month']}")
        return

    domain = os.environ.get("FRESHDESK_DOMAIN")
    api_key = os.environ.get("FRESHDESK_API_KEY")
    if not domain or not api_key:
        print(
            "ERROR: set FRESHDESK_DOMAIN and FRESHDESK_API_KEY before running.\n"
            "    Get a key at: <freshdesk-domain>/a/admin/api_keys",
            file=sys.stderr,
        )
        sys.exit(2)

    since = datetime.utcnow() - timedelta(days=args.window_days)

    print(f"=== Deflection vs Freshdesk tickets (last {args.window_days} days) ===\n")
    results = []
    for page in pages:
        # Derive a search query from the slug — the slug is usually the most
        # specific identifier (e.g. "playtron-faq", "returns-refunds")
        slug = page["url"].strip("/").split("/")[-1]
        # Replace dashes with spaces for better Freshdesk search hits
        query = slug.replace("-", " ")
        target = page["deflection_target_per_month"]
        actual = freshdesk_count(domain, api_key, query, since)
        st = status_for(actual, target)
        results.append({**page, "actual_tickets": actual, "status": st})
        marker = {"GREEN": "✓", "YELLOW": "·", "RED": "✗", "UNKNOWN": "?"}[st]
        print(
            f"{marker} {page['url']:48s}  target={target:>4}  actual={actual:>4}  {st}"
        )
        time.sleep(0.3)

    today = datetime.utcnow().strftime("%Y-%m-%d")
    out = DATA / f"deflection-report-{today}.json"
    out.write_text(json.dumps({"date": today, "results": results}, indent=2))
    print(f"\n✓ Wrote {out.relative_to(REPO)}")
    red = [r for r in results if r["status"] == "RED"]
    if red:
        print(f"\n⚠  {len(red)} pages are in RED (actual > target). These need rewriting or reframing:")
        for r in red:
            print(f"   {r['url']}")


if __name__ == "__main__":
    main()
