#!/usr/bin/env bash
# Lost-tasks batch: L1, L2, L3, L4, L5, L8, L9, L11, L12, L14, L15, L16.
# Run from the project root:
#   bash scripts/push-l-batch-2026-05-26.sh

set -euo pipefail
cd "$(dirname "$0")/.."

echo "→ Files to be committed:"
git status --short

git add app/icon.ico app/icon.png app/apple-icon.png \
        app/layout.tsx \
        components/LanguageBanner.tsx \
        components/TroubleshootingWalker.tsx \
        content/en/devices/touchme.md \
        content/en/devices/playtron.md \
        content/en/devices/biotron.md \
        content/en/devices/orbita.md \
        content/en/devices/scales.md \
        content/en/devices/compare.md \
        lib/content.ts \
        scripts/check-internal-consistency.py \
        scripts/push-l-batch-2026-05-26.sh

git commit -m "Lost-tasks batch (L1-L16): favicon, JA infra, mobile, cross-links

L1 — Favicon: replaced the wave-mark with the actual shop favicon
  (orange Playtronica logo). app/icon.ico + app/icon.png (512×512) +
  app/apple-icon.png (180×180) all derived from the uploaded source.

L2 — LanguageBanner component: when navigator.languages includes a
  locale we support (de/es/fr/ja) that isn't the current URL's
  language, show a small non-intrusive banner at the top offering the
  switch. Choice stored in localStorage. Soft pattern per Google's
  i18n guidance — never auto-redirect, because Googlebot crawls from
  the US and would see a different page than human readers.

L3 — Dynamic <html lang>: inline script in <head> reads location.pathname
  and sets document.documentElement.lang before first paint. Belt-and-
  braces for screen readers and naive crawlers; hreflang remains the
  strongest SEO signal.

L4 — Per-page JSON-LD inLanguage: this was already correct at the
  Article level (ArticleView builds inLanguage: lang). Documented the
  layout-level siteJsonLd keeping inLanguage: 'en' as the WebSite's
  primary language — that is per schema.org spec.

L5 — Title/meta length validator: scripts/check-internal-consistency.py
  now flags titles >60 chars (en/de/es/fr) or >30 chars (ja), and
  summaries >155 chars (en/de/es/fr) or >75 chars (ja). CJK characters
  render about twice as wide in search snippets, so the budget is half.

L8 — Device pages → shop: every device page (touchme/playtron/biotron/
  orbita/scales) now has a '🛒 Don't have one yet?' callout right after
  the safety warning, linking to the matching Shopify product page.
  For Biotron and Scales, the callout also calls out 'ships without a
  cable' and links to the Accessories page.

L9 — Progressive disclosure: compare.md's full spec matrix and the
  software compatibility matrix are now wrapped in <details> elements
  so mobile readers get a compact summary by default. The biggest
  pages (compare.md, biotron.md, accessories.md) all >9 KB; this is
  the cheap mobile-readability win.

L11 — links_out frontmatter field: added to the Frontmatter type plus
  a last_edited field. Both now formal first-class fields, no longer
  ad-hoc additions.

L12 — Cron for external links: scheduled task 'help-center-external-
  links' runs every Monday at 10 AM local, runs
  scripts/check-external-links.py --live, categorizes broken links
  (dead-permanent / dead-transient / redirect-301 / certificate-or-tls),
  applies safe fixes, surfaces a diff for the user to push.

L14 — Mobile tap targets: TroubleshootingWalker's Back / Start-over
  buttons were 32 px tall (below the 44 px Apple HIG / WCAG threshold).
  Fixed to min-h-[44px].

L15 — A11y audit: confirmed every <img> has alt text (zero violations),
  every interactive button has visible text or an aria-label, and the
  semantic landmark structure (header / nav / main / aside / footer)
  is correctly applied throughout.

L16 — Live external link check: ran scripts/check-external-links.py
  --live; from the build sandbox every URL came back as a proxy
  403 (sandbox network limitation, not real). The recurring cron
  set up in L12 will run against the real network from the user's
  machine and surface any actual dead links each Monday."

echo "→ Committed. Pushing..."
git push origin main
echo "✓ Done."
