#!/usr/bin/env bash
# Batch push for 2026-05-26: WhatsApp mobile fix + content feedback round.
# Run from the project root:  bash scripts/push-batch-2026-05-26.sh

set -euo pipefail

cd "$(dirname "$0")/.."

echo "→ Files to be committed:"
git status --short

git add CHANGELOG.md \
        components/WhatsAppFeedback.tsx \
        content/en/devices/compare.md \
        content/en/devices/orbita.md \
        content/en/getting-started/accessories.md \
        content/en/getting-started/which-device.md \
        content/en/orders/pricing-and-discounts.md \
        content/en/orders/returns-refunds.md \
        content/en/orders/track-your-order.md \
        content/en/professionals/b2b-bulk.md \
        docs/POST-PUSH.md \
        public/_redirects \
        scripts/push-batch-2026-05-26.sh

git commit -m "Mobile WhatsApp fix + content round + compare page + URL preservation

NEW

- /devices/compare/ — full side-by-side comparison page. Spec matrix
  for all five devices (sensor, polyphony, output, grounding, dimensions,
  software, price). 'In the box' table that calls out Biotron and Scales
  shipping without a cable. Software-compatibility matrix. Decision tree
  ('I want to play with my hands' / 'I want music that plays itself' /
  etc.). Bundle reference table. Built from live Shopify catalog data.

- /getting-started/accessories/ rewritten as the full catalog: every
  cable variant (3 USB-C SKUs), both adapters, both conductive tapes,
  both patch packs, alligator-clip pack, Playtron case, Playtron necklace,
  scarf, all 8 bundles, the e-gift card, and the third-party IO-Lights.
  Each item is described by purpose and pairing.

FIXED

- WhatsApp: when text is selected, the floating 'What's missing?'
  button becomes a direct <a href> 'Send selection' link. iOS Safari
  ate the tap on the tooltip-over-selection; this gives mobile a
  reliable far-from-selection target.

CHANGED

- Orbita: move 'Handle only the parts' safety block to bottom of
  the page; add 'touch the turntable' to quick-start step 3;
  replace YouTube video with SC3FL1LeRVM; add synth.playtronica.com/settings
  as the primary settings link; fix firmware step numbering
  (was 1-5 then restarted 1-2, now continuous 1-7).

- Track-your-order: normalize email format throughout — write the
  address bare ('write to support@playtronica.com') instead of inline
  link patterns that visually merged with surrounding text.

- Returns-refunds: add an Estonia warning — do not ship returns
  before receiving the confirmed return address.

- B2B page: rewrite formal/cold tone to warm and human while
  keeping the same offer (bulk pricing, VAT invoice, setup advice).

- Pricing-and-discounts: remove the 7-day price-match clause
  entirely (per latest call). Keep the missed-code path, but
  make it case-by-case instead of a hard 7-day rule. Soften
  the B2B paragraph to match the new tone.

- public/_redirects: extend the legacy-URL preservation list from
  23 to ~70 rules so all old super.so help center paths 301 to
  their new sectioned URLs. Protects SEO and any external links
  out in the wild.

- CHANGELOG.md: Unreleased section updated with all of the above."

echo "→ Committed. Pushing..."
git push origin main

echo "✓ Done."
