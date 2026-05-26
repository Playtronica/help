#!/usr/bin/env bash
# Everything accumulated on 2026-05-26: L-batch + 5-method audit infrastructure +
# self-improving system + orphan sweep + deflection targets + shop cross-promo
# doc + press page + institutional partners + search analytics + translate fix.
#
# Run from the project root:
#   bash scripts/push-everything-2026-05-26.sh

set -euo pipefail
cd "$(dirname "$0")/.."

echo "→ Files to be committed:"
git status --short

git add -A

git commit -m "Big day on 2026-05-26 — audit, self-improving system, content round

A single commit gathering everything from today's three working sessions.

╭─ FOUNDATIONAL —————————————————————————————————————————────────────╮
│ 5-method system audit framework                                    │
│   scripts/audit-help-system.py — JSON + human output, in CI        │
│   scripts/check-internal-consistency.py — blocking CI gate         │
│   scripts/rebuild-hypothesis-log.py — derive hypothesis log        │
│   scripts/classify-feedback.py — WhatsApp → priority list          │
│   scripts/check-deflection-vs-tickets.py — Freshdesk comparison    │
│   scripts/test-anthropic-key.mjs — diagnose translate failures     │
│   docs/SELF-IMPROVING-SYSTEM.md — architecture of the 4 loops      │
│   docs/HYPOTHESIS-LOG.md — every page is a 90-day hypothesis       │
│   docs/PENDING-TASKS.md — canonical open-work map                  │
│   docs/SHOPIFY-INTEGRATION.md — cross-promo doc for Roman          │
│   content/_data/hypotheses.json — 43 hypotheses with check-ins     │
│   Cowork scheduled tasks:                                          │
│     help-center-system-audit (monthly)                             │
│     help-center-ci-health (weekly)                                 │
│     help-center-external-links (weekly)                            │
│     help-center-search-log (monthly)                               │
╰────────────────────────────────────────────────────────────────────╯

╭─ CONTENT ROUND ————————————————————————————————————————————────────╮
│ NEW PAGES                                                          │
│   /devices/compare/ — side-by-side spec matrix + decision tree     │
│   /site/press/ — real publications, institutions, brand collabs    │
│   /getting-started/accessories/ — full catalogue rewrite           │
│                                                                    │
│ ORPHAN SWEEP — 12 → 0                                              │
│   Every page now carries a 'Related pages' callout with 3          │
│   curated next-step links. Compare and accessories went from 0     │
│   incoming to 9–10 incoming each.                                  │
│                                                                    │
│ DEVICE PAGES                                                       │
│   All five device pages got 'Don't have one yet?' shop callouts.   │
│   Orbita content edits B1–B5 (safety to bottom, touch turntable,   │
│   new video SC3FL1LeRVM, settings URL canonical, firmware step     │
│   numbering continuous).                                           │
│                                                                    │
│ ORDERS                                                             │
│   track-your-order — SLA + 'support@' format normalised            │
│   returns-refunds — Estonia warning added                          │
│   pricing-and-discounts — price-match clause removed entirely      │
│   shipping-delivery — Black Friday date hard-coding removed        │
│                                                                    │
│ B2B                                                                │
│   professionals/b2b-bulk — warm tone rewrite                       │
│   professionals/creative-installations — Centre Pompidou,          │
│     Palais de Tokyo, Garage Moscow, Tretyakov, Exploratorium,      │
│     Sónar; Hermès / Issey Miyake / IKEA / Nike brand collabs.      │
│                                                                    │
│ FRONTMATTER                                                        │
│   38 pages got 'segment:' (was 5/43)                               │
│   38 pages got 'deflection_target:' (was 5/43)                     │
│   All 43 pages have 'last_edited: 2026-05-26'                      │
│   New formal fields in Frontmatter type: links_out, last_edited    │
╰────────────────────────────────────────────────────────────────────╯

╭─ MOBILE + UX —————————————————————————————————————————────────────╮
│ Selection-aware WhatsApp button — when reader highlights text,    │
│   the floating button becomes a direct <a href> 'Send selection'  │
│   link. iOS Safari ate the tap on tooltip-over-selection.         │
│ Favicon — real shop favicon as app/icon.ico + .png + apple-icon.  │
│ Language banner — when navigator.language matches a locale we     │
│   support but URL isn't there, suggest a switch (localStorage).   │
│ Dynamic <html lang> — inline script before first paint, plus the  │
│   existing HtmlLang component for post-hydration.                 │
│ Progressive disclosure on compare.md — full spec matrix + the     │
│   software-compatibility matrix wrapped in <details> for mobile.  │
│ TroubleshootingWalker — Back/Start-over buttons 32px → 44px.       │
╰────────────────────────────────────────────────────────────────────╯

╭─ CI + AUTOMATION —————————————————————————————————————————────────╮
│ .github/workflows/ci.yml — audit + consistency check both wired   │
│   in. Consistency is blocking; audit is informational.            │
│ public/_redirects — 23 → 70 legacy URL rules.                     │
│ docs/POST-PUSH.md — verification one-liner extended.              │
│ scripts/check-internal-consistency.py — catches S1 (canonical     │
│   service URLs), S2 (SLA-phrase drift), S3 (hard-coded dates),    │
│   S4 (broken internal links), S5 (stale status markers),          │
│   S6 (title/summary length budget).                               │
╰────────────────────────────────────────────────────────────────────╯

╭─ SEARCH ANALYTICS ————————————————————————————————————————────────╮
│ components/SearchBar.tsx — debounced query logger in localStorage │
│   (90-day rolling window, 500-entry cap, no PII). Exposes         │
│   window.__playtronicaSearchExport() for the monthly extraction.  │
│ Cowork task 'help-center-search-log' (1st of each month)          │
│   pulls the log, surfaces zero-hit queries as missing-topic       │
│   signals — the content roadmap written by readers.               │
╰────────────────────────────────────────────────────────────────────╯

╭─ TRANSLATE WORKFLOW FIX —————————————————————————————————————────╮
│ scripts/translate-pages.mjs                                       │
│   max_tokens 8192 → 16384 (JA expands, biotron.md is 12 KB)       │
│   Added retry-with-backoff on 429 / 5xx                           │
│   Exit 1 only when EVERY job failed — partial success now opens   │
│   a PR with the translations that did work.                       │
│ scripts/test-anthropic-key.mjs (new) — diagnostic for ANTHROPIC_  │
│   API_KEY before triggering the full workflow.                    │
╰────────────────────────────────────────────────────────────────────╯

Open items captured in docs/PENDING-TASKS.md:
  1.1 trigger translation Action once ANTHROPIC_API_KEY is verified
  1.3 outcomes-tracking activates when FRESHDESK_API_KEY lands
  2.2 Scales price (waiting on Shopify update)
  B1 super.so image migration (waiting on file attachments)"

echo "→ Committed. Pushing..."
git push origin main
echo "✓ Done. Cloudflare deploys in ~1.5 minutes."
