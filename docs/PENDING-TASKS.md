# Pending work — help center

**Living document.** This is the single source of truth for what is still open on the help center. Everything else is either committed to main, scheduled to run automatically, or explicitly closed.

Last audited: 2026-05-26.

The list is organised by **what is blocking the work**, not by topic, because the user's next action depends on who needs to do what.

---

## 1. Blocked on a secret or API key

These are 100% built and ready. They run as soon as the matching credential lands in the right place.

### 1.1 — Translation pipeline → DE / ES / FR / JA

- **Status:** infrastructure ready, never executed. Andrey said 2026-05-26 he would add the key now.
- **Where:** `.github/workflows/translate.yml`, `scripts/translate-pages.mjs`.
- **Blocker:** `ANTHROPIC_API_KEY` secret in `https://github.com/Playtronica/help/settings/secrets/actions`.
- **Unlock action — exact steps:**
  1. Get key at https://console.anthropic.com/settings/keys → "Create Key" → name `playtronica-help-translation`. Copy immediately (you won't see it again).
  2. Add at https://github.com/Playtronica/help/settings/secrets/actions → New secret → name `ANTHROPIC_API_KEY` → paste → Add secret.
  3. Trigger at https://github.com/Playtronica/help/actions/workflows/translate.yml → "Run workflow" on `main`.
- **Yield when unlocked:** 42 EN pages × 4 languages = **168 new translated pages** open a PR for review (~3-5 minutes runtime).
- **Impact:** SO-21 (Japan +91 % organic) is currently locked out. JA / DE / ES / FR SEO surface stays at 0 % until this runs.

### 1.2 — Feedback classifier → top-5 missing topics

- **Status:** script built, no data yet.
- **Where:** `scripts/classify-feedback.py`.
- **Blocker:** WhatsApp export file from the support inbox (any `.txt` export from WhatsApp itself works), **and** the same `ANTHROPIC_API_KEY` (from 1.1).
- **Unlock action:** Andrey, when 50+ feedback messages have piled up. Export the chat (WhatsApp → conversation → ⋮ → Export chat → without media), run `python3 scripts/classify-feedback.py whatsapp-export.txt`.
- **Yield when unlocked:** monthly ranked priority list — "the top 5 missing topics your readers are telling you about". Written by users, not by us.
- **Closes:** P5.1 Antifragility loop. Every angry user message starts making the system smarter.

### 1.3 — Outcomes tracking → does each page do its job?

- **Status:** script built, no Freshdesk credential yet. Andrey said 2026-05-26 he would add the key now.
- **Where:** `scripts/check-deflection-vs-tickets.py`, `content/_data/hypotheses.json`.
- **Blocker:** `FRESHDESK_DOMAIN` + `FRESHDESK_API_KEY` env vars.
- **Unlock action — exact steps:**
  1. In Freshdesk (top-right avatar → "Profile settings" → "Your API Key" → "View API Key"), copy the key.
  2. Add two secrets at https://github.com/Playtronica/help/settings/secrets/actions:
     - `FRESHDESK_DOMAIN` = `playtronica.freshdesk.com` (no protocol)
     - `FRESHDESK_API_KEY` = the key from step 1
- **Yield when unlocked:** every page with `deflection_target` in its frontmatter gets a monthly GREEN / YELLOW / RED label. Currently 5 / 43 pages have a target — the script also tells you which other pages need one.

### 1.4 — Live external-link sweep

- **Status:** cron set up, will fail until the next user-machine launch.
- **Where:** scheduled task `help-center-external-links` (Mondays at 10 AM local).
- **Blocker:** Cowork must be open Monday morning for it to fire.
- **Unlock action:** none — just leave Cowork running.
- **Yield when unlocked:** weekly diff with broken-link fixes ready to push.

---

## 2. Blocked on external data

These are partly built. Filling them in is a content decision, not a code decision.

### 2.1 — deflection_target on 38 of 43 pages

- **Status:** 5 pages have a target, 38 do not.
- **Where:** frontmatter of every page in `content/en/**/*.md` that does not yet carry `deflection_target:`.
- **Blocker:** monthly support-ticket volume by topic. Without baseline numbers, any target is guesswork.
- **Unlock action:** Andrey + Diana, ~1 hour. Pull a Freshdesk report grouped by tag (or by topic keyword), assign a 30-day baseline to each page, then a target that is 30 % below that baseline.
- **Yield when unlocked:** the outcomes-tracking script (1.3) goes from "5 pages tracked" to "every page tracked".

### 2.2 — Scales price (Shopify)

- **Status:** the `compare.md` and `accessories.md` pages show "TBA" for Scales.
- **Where:** content/en/devices/compare.md, content/en/getting-started/accessories.md (search for `TBA`).
- **Blocker:** Scales product 10509345030471 in Shopify still shows €0 placeholder.
- **Unlock action:** when Scales pricing lands in Shopify, swap the TBAs. Could be turned into a tiny scheduled task if it gets boring.
- **Yield when unlocked:** complete pricing table on compare.md.

### 2.3 — Submit JA + DE + ES + FR sitemaps to Google Search Console

- **Status:** sitemap.xml already includes every locale via hreflang alternates.
- **Where:** the existing sitemap covers everything; submission is a one-time GSC action.
- **Blocker:** task 1.1 must run first (so the JA / DE / ES / FR pages physically exist).
- **Unlock action:** Andrey, 15 minutes per locale. `search.google.com/search-console` → add property → submit sitemap.
- **Yield when unlocked:** Googlebot starts crawling translated pages on day one.

### 2.4 — Yahoo Japan webmaster submission

- **Status:** not started.
- **Where:** external (https://search.yahoo.co.jp/announce/).
- **Blocker:** task 1.1 must run first.
- **Unlock action:** Andrey, 20 minutes.
- **Yield when unlocked:** the other ~25 % of Japanese search traffic indexes the JA help center.

---

## 3. Blocked on user feedback or design call

### 3.1 — C2 — Invoice / VAT page full rework

- **Status:** **on hold — waiting for a real customer complaint.** (Asked 2026-05-26: Andrey did not have a specific complaint in mind. Right call — rewrite when we have a real example, not on theory.)
- **Where:** `content/en/orders/invoice-vat.md`.
- **Unlock trigger:** Andrey forwards the next support ticket about an invoice / VAT issue, or notices a recurring complaint in the feedback classifier (1.2) output.
- **Yield when unlocked:** rewritten page in 30 minutes, plus matching frontmatter (probably `segment: ["b2b", "international"]`, deflection_target derived from real ticket volume).

### 3.2 — CI #8 failure investigation

- **Status:** **skipped per user 2026-05-26** — pushes are landing fine, Cloudflare deploys are succeeding, the failed run is not blocking the actual site. Will re-investigate only if a future push fails to deploy.
- **Where:** `https://github.com/Playtronica/help/actions` → run #8 (and #9 if it fails too).
- **Re-open trigger:** Cloudflare deploy stops working, OR a push that should succeed gets blocked by CI.

---

## 4. Structurally deferred (3+ months out)

These are valuable but not the next move.

### 4.1 — P4.1 — Help → product feedback loop

Each user complaint about a missing topic on the help center could open a GitHub issue automatically, with the device + segment tags. Help center becomes part of product analytics. Big lift; do after layers 1-3 of the self-improving system have months of data.

### 4.2 — P4.2 — Help center as reference architecture for other surfaces

Once the self-improving system has run for 6 months and the loops have proven themselves, document them as a template that can be applied to `shop.playtronica.com/help`, the FAQ in the Shopify theme, the education portal, etc. See `docs/SELF-IMPROVING-SYSTEM.md`.

### 4.3 — Live a11y audit on deployed pages

Static a11y is clean (zero alt-text violations, semantic landmarks correct, tap targets fixed in L14). A live audit with axe-core or Lighthouse on the deployed site would catch CSS-specific issues (contrast, focus rings) that a static check cannot. Worth doing once the site has been live at `help.playtronica.com` for a week.

### 4.4 — Live mobile layout sweep

Static sweep (L14) caught the 32-px tap targets in TroubleshootingWalker. A real mobile pass — open every section on an actual iPhone, scroll every long table, try the language banner from a JA-set browser — needs Andrey or a designer for ~45 minutes. Do this after the JA translation lands (so JA pages are in the test set).

---

## 5. Closed in the last week

These are now done. Linked so you can scan back if you forget what landed.

### Mobile-WhatsApp + content round + URL preservation (commit `30219a6`)

42 files: selection-aware WhatsApp button, Orbita content edits, track-your-order email normalisation, returns Estonia note, B2B tone rewrite, pricing-and-discounts price-match removed, _redirects extended to 70+ rules. See `CHANGELOG.md` → Unreleased.

### 5-method system audit pass (commit immediately after)

44 files: `scripts/audit-help-system.py`, `scripts/check-internal-consistency.py`, `scripts/rebuild-hypothesis-log.py`, `scripts/classify-feedback.py`, `scripts/check-deflection-vs-tickets.py`, `content/_data/hypotheses.json`, `docs/SELF-IMPROVING-SYSTEM.md`, `docs/HYPOTHESIS-LOG.md`, CI gates, monthly scheduled task. Frontmatter sweep (segment on 38 pages), canonical settings URL, cross-link sweep, SLA normalisation, hard-coded-date fix.

### Lost-tasks batch — L1-L16 (this commit)

15 files: real shop favicon, LanguageBanner component, dynamic `<html lang>`, title/meta length validator, device-pages-to-shop callouts, progressive disclosure on compare.md, `links_out` + `last_edited` formal frontmatter fields, weekly external-links cron, mobile tap-target fix, full a11y audit confirmation, live external-link script run.

---

## How to use this document

- **Once a week,** read the top of the doc.
- **When a blocker clears** (a key gets added, a screenshot lands, a complaint comes in), move that item up to "Closed in the last week" with a one-line note about what changed, then delete the entry from its old section.
- **When a new pending item appears** (in chat, in a scheduled-task notification, in CI), add it to whichever section matches the blocker, with the same shape as the entries above.

The monthly Cowork audit task at `help-center-system-audit` reads this document. If you let an item rot here for more than 60 days it will show up in the next monthly report with a "stale" tag.
