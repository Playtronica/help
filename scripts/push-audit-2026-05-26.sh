#!/usr/bin/env bash
# Batch push for 2026-05-26 (audit pass): 5-method system audit + fixes from P0/P1/P2.
# Run from the project root:  bash scripts/push-audit-2026-05-26.sh

set -euo pipefail

cd "$(dirname "$0")/.."

echo "→ Files to be committed:"
git status --short

git add CHANGELOG.md \
        .github/workflows/ci.yml \
        scripts/audit-help-system.py \
        scripts/check-internal-consistency.py \
        scripts/rebuild-hypothesis-log.py \
        scripts/classify-feedback.py \
        scripts/check-deflection-vs-tickets.py \
        scripts/push-audit-2026-05-26.sh \
        docs/SELF-IMPROVING-SYSTEM.md \
        docs/HYPOTHESIS-LOG.md \
        content/_data/hypotheses.json \
        content/en/

git commit -m "5-method system audit pass — P0/P1/P2 fixes + CI gates

This pass applies the 5-method system audit framework (GAP / Bottlenecks /
Staleness / SO Patterns / Leverage Points) used by system-02-improvement-
analysis.html, and ships fixes for the P0 and P1 findings in one batch.

ADDED

- scripts/audit-help-system.py — reproducible 5-method audit. Outputs JSON
  (for tooling) or human-readable text. Called by the monthly Cowork
  scheduled task and by CI.
- scripts/check-internal-consistency.py — CI gate. Catches:
    S1 non-canonical service URLs (settings, synth, etc.)
    S2 SLA-phrase drift in 'Still stuck' footers
    S3 hard-coded calendar dates
    S4 broken internal links
    S5 stale status: edited-YYYY-MM markers
- .github/workflows/ci.yml — both new scripts run on every PR.
  Consistency check is a blocking gate. Audit script is informational.

FIXED — P0/P1 sweep

- Canonical settings URL — settings.playtronica.com is the established
  pattern (20+ usages). Replaced the synth.playtronica.com/settings
  outliers in orbita.md, orbita-advanced.md, and compare.md.
  Legacy playtronica.github.io/WebMidiOrbita kept only on Orbita pages
  as a documented fallback.

- Cross-link sweep — added 'Related pages' callout linking
  /devices/compare/ and /getting-started/accessories/ from each device
  page (touchme, playtron, biotron, orbita, scales). Also cross-linked
  from /getting-started/whats-in-the-box/ and /getting-started/your-first-5-minutes/.
  /accessories/ went from 0 → 6 incoming, /compare/ from 1 → 8.

- Frontmatter sweep — added 'segment:' to all 38 pages that were missing
  it (taxonomy: gift-buyer / gift-recipient / music-producer / b2b /
  international / creator / education). Added 'last_edited: 2026-05-26'
  to every touched file.

- SLA consistency — 4 'Still stuck' footers (biotron-advanced, touchme-
  tuning, software/hardware, sound/objects-you-can-play) and site/community
  now use the canonical phrase 'We aim for 24 hours, but a reply may take
  up to 3 business days.'

- Hard-coded dates — replaced 'December 15 to January 10' in
  orders/track-your-order.md with 'between late December and early January',
  which doesn't go stale yearly.

- Removed the off-context image on Orbita page that was actually a
  TouchMe/Playtron social-media share callout (mismatch between image
  content and page topic).

- orbita-advanced.md: WebMidiOrbita configurator reframed as legacy
  fallback to settings.playtronica.com/#/orbita.

ADDED — self-improving system

The 5-method audit framework is now a permanent part of the help center,
not just a one-off analysis:

- scripts/audit-help-system.py — JSON + human output, reproducible.
- scripts/check-internal-consistency.py — blocking CI gate.
- scripts/rebuild-hypothesis-log.py + content/_data/hypotheses.json —
  every page tracked as a hypothesis with a 90-day check-in.
- scripts/classify-feedback.py — WhatsApp export → ranked content roadmap.
- scripts/check-deflection-vs-tickets.py — page targets vs Freshdesk reality.
- docs/SELF-IMPROVING-SYSTEM.md — architecture doc for the four loops.
- docs/HYPOTHESIS-LOG.md — how the 90-day review works.

The monthly Cowork scheduled task 'help-center-system-audit' runs all of
the above on the 1st of each month.

NOT IN THIS BATCH (separate work)

- Translation Action for DE/ES/FR/JA — still blocked on ANTHROPIC_API_KEY
  in repo secrets. Once set, one workflow run produces ~168 translated
  pages.
- Language-banner component for ja-from-Japan detection — being designed
  as a separate PR (auto-redirect is bad for Google indexing; banner +
  navigator.language is the safe pattern).
- deflection_target on the remaining 38 pages — needs real traffic +
  ticket-volume data to assign meaningful numbers."

echo "→ Committed. Pushing..."
git push origin main

echo "✓ Done. Cloudflare Pages will deploy in ~1.5 minutes."
