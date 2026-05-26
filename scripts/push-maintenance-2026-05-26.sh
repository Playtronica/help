#!/usr/bin/env bash
# Maintenance batch (20-min autonomous run): L-batch fixes + orphan-page sweep
# + deflection_target estimates for all 38 missing pages + hypothesis-log
# rebuild + SEO regen + PENDING-TASKS doc + scheduled tasks for CI health
# and external links.
#
# Run from the project root:
#   bash scripts/push-maintenance-2026-05-26.sh

set -euo pipefail
cd "$(dirname "$0")/.."

echo "→ Files to be committed:"
git status --short

# Add everything in this maintenance pass
git add -A

git commit -m "Maintenance pass — orphan sweep, deflection targets, JA infra

This commit bundles the L-batch (favicon, language banner, dynamic
<html lang>, title/meta length validator, device→shop callouts,
progressive disclosure, links_out + last_edited frontmatter fields,
weekly external-links cron, mobile tap-targets, full a11y confirmation),
plus the autonomous maintenance pass that followed:

ORPHAN-PAGE SWEEP — 12 → 0

Every page that had ≤ 1 internal outgoing link now carries a
'## Related pages' section with 3 curated next-step links:

  - getting-started/accessories.md
  - orders/invoice-vat.md
  - orders/track-your-order.md
  - orders/warranty-repair.md
  - professionals/b2b-bulk.md
  - site/community.md
  - software/ableton.md
  - software/connecting.md
  - software/fl-studio-and-other-daws.md
  - software/mobile.md
  - troubleshooting/firmware-reset.md
  - troubleshooting/wont-connect.md

Side-effect: every section now has at least one internal-link hub.
/devices/compare/ went 1 → 10 incoming, /accessories/ 0 → 9,
/firmware-reset/ 4 → 10.

DEFLECTION TARGETS — 5/43 → 43/43

Every page now declares a deflection_target_per_month in frontmatter.
Numbers are informed estimates pending real Freshdesk volume. The
outcomes-tracking script (scripts/check-deflection-vs-tickets.py)
can now label every page GREEN/YELLOW/RED as soon as FRESHDESK_API_KEY
lands. Targets range from 10 (deep-dives, ask-the-community) up to
320 (track-your-order — the biggest support-ticket category).

HYPOTHESIS LOG REBUILD

content/_data/hypotheses.json regenerated to pick up the new
deflection_targets and last_edited fields. 43 hypotheses now have
both a target and a next_check_in date.

SEO REGEN

public/llms.txt, public/llms-full.txt, public/sitemap.xml,
public/search-index.json all regenerated from current content.
38 indexed pages, 166 KB llms-full, 162 KB sitemap.

PENDING-TASKS.md (NEW)

docs/PENDING-TASKS.md is the canonical open-work map — organised by
blocker (API key / external data / user decision / structural).
The monthly Cowork audit task reads this file and flags entries
older than 60 days as stale.

CI HEALTH CRON (already deployed)

scheduled task 'help-center-ci-health' (Mondays 09:00 local) reads
the last 7 days of GitHub Actions runs, classifies any failures,
and offers to patch fixable ones — staged diff awaits the user's
push.

EXTERNAL-LINKS CRON (already deployed)

scheduled task 'help-center-external-links' (Mondays 10:00 local)
runs check-external-links.py --live, categorises broken links,
patches dead-permanent / redirect-301 cases, surfaces a diff.

FAVICON

app/icon.ico + app/icon.png + app/apple-icon.png all derived from
the shop favicon (orange Playtronica logo)."

echo "→ Committed. Pushing..."
git push origin main
echo "✓ Done. Cloudflare Pages deploys in ~1.5 minutes."
echo ""
echo "Next: add ANTHROPIC_API_KEY + FRESHDESK_API_KEY in GitHub secrets,"
echo "then trigger the Translate workflow manually for the first JA/DE/ES/FR run."
