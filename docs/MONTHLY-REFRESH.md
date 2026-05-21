# Monthly help-center refresh process

> **This is the maintainer's runbook.** It is published for transparency — anyone forking this help center can see how it is kept alive. Paths like `_meta/`, `02-corpus/`, and `START-HERE.html` refer to a private working folder on the maintainer's machine, not to this repository. Only the maintainer runs this loop; contributors do not need it.

The help center decays unless new customer signal is folded back in. This doc is the runbook. Run it on the first business day of every month. Total wall time: ~2 hours of Claude work + ~1 hour of Andrey review.

The goal is not to rewrite the whole help center every month. The goal is to:

1. **Pull fresh signal** from every data source we have access to.
2. **Identify the top 5–10 content gaps** the signal exposes.
3. **Refresh exactly those pages** (or add new ones if the gap is structural).
4. **Commit + deploy** in the same session so the help center keeps tracking reality.

---

## Sources — what we have access to

Living inventory. Update this table when a new source comes online (e.g. a Discord we did not have last month).

| Source | Path / connector | Refresh cadence | Notes |
|---|---|---|---|
| **Freshdesk** | `~/Documents/Claude/Playtronica Claude/freshdesk-export/` | Daily auto-sync (cron) | 5,000+ tickets, 4 years of history. Highest-volume source. |
| **WhatsApp** | `whatsapp-mcp` bridge (local, paired) | On demand | High-trust, personal support. The signal-per-message is high; volume is low. |
| **Telegram** | `~/Documents/Claude/Playtronica Claude/telegram-export/` | Manual export | Team conversations + B2B support. Filter by topic. |
| **Facebook group** | facebook.com/groups/playtronica via Brave + Cowork MCP | Manual, monthly | Public help posts + unanswered questions. See `_meta/fb-group-audit.md`. |
| **Reddit** | WebSearch | On demand | Low volume; bursts when a video goes viral. |
| **YouTube comments** | Manual via Brave | On demand | Lots of "where do I buy" + "does it work with X" questions. |
| **Cloudflare Web Analytics** | dash.cloudflare.com → Analytics & Logs → Web Analytics | Real-time | Real-user metrics, cookie-less. |
| **Google Analytics 4** | analytics.google.com | Real-time | Funnel + cross-domain to Shopify. |
| **Microsoft Clarity** | clarity.microsoft.com | Real-time | Heatmaps + session recordings — the only source that shows where people get stuck visually. |
| **Pagefind search log** | (not yet wired — task) | Real-time once wired | What users search for + what returns zero results. The single highest-signal content-gap source. |
| **Klaviyo** | klaviyo.com via Brave | On demand | Email replies to product emails. Often technical questions. |
| **Shopify** | shopify MCP, when connected | On demand | Order notes (rare), product reviews (rare). |
| **Zoho mail** | `~/Documents/Claude/Playtronica Claude/zoho-mail-export/` | Manual | B2B + partnership inbox. |
| **WhatsApp feedback widget** | Andrey's WhatsApp | Real-time | Direct user reports from inside the help center. The fastest source after a deploy. |

If a new source appears — for example, an Instagram broadcast chat — add a row.

---

## The monthly loop — step-by-step

### Step 1 — Pull fresh signal (60 min)

Run the existing extraction scripts:

```bash
cd ~/Documents/Claude/Projects/AM\ PLTRNC/help-center

# Freshdesk — refresh from the latest export
python3 scripts/clean-freshdesk.py

# WhatsApp — pull via MCP into local jsonl
python3 scripts/clean-whatsapp.py

# Telegram — refresh from latest export
python3 scripts/clean-telegram.py

# Unify into one corpus
python3 scripts/unify-corpus.py
```

Output: refreshed `02-corpus/clean/*.jsonl` + `02-corpus/corpus.jsonl`.

For the sources without scripts (FB group, Klaviyo, GA4, Clarity, Pagefind log, WhatsApp feedback widget), spend ~30 minutes pulling signal manually in Brave and noting top patterns in `_meta/refresh-log-YYYY-MM.md`.

### Step 2 — Cluster + identify gaps (30 min)

```bash
python3 scripts/cluster-corpus.py
```

Output: `_meta/best-quotes/<seed>.jsonl` — top 15 quotes per topic cluster.

For each cluster, look at the questions you'd expect the help center to answer. If the help center has no page that resolves them, that is a content gap.

Open `_meta/refresh-log-YYYY-MM.md` and write:

```markdown
# May 2026 refresh log

## New signal
- Top emergent cluster: "Biotron iPad setup" (12 new tickets) — no page covers this.
- Steady cluster: "Playtron not working on mobile" (8 new tickets) — current page is incomplete.
- ...

## Action items for this refresh
1. New page: getting-started/biotron-ipad.md
2. Expand: devices/playtron.md — Android + iOS sections
3. ...
```

### Step 3 — Refresh exactly those pages (45 min)

For each action item, do the edit in `content/en/<section>/<slug>.md`. Run the help-review prompt (`docs/REVIEW-PROMPT.md`) against each edited page.

Do **not** edit pages that have no fresh signal. Resist the urge to "polish" — that is what the quarterly review is for.

### Step 4 — Commit + deploy (5 min)

```bash
cd ~/Documents/Claude/Projects/AM\ PLTRNC/help-center/06-build
git add -A
git commit -m "Monthly refresh — YYYY-MM"
git push
```

Cloudflare Pages auto-deploys. Verify the changes are live by visiting `help.playtronica.com`.

### Step 5 — Update the dashboard (5 min)

In `~/Documents/Claude/Playtronica Claude/START-HERE.html`, log:

- **Pages updated this month:** N
- **New pages added:** N
- **Content gaps closed:** N
- **Top emergent topic next month:** (the unresolved cluster)

These four numbers go into the help-center KPI block (see `_meta/help-kpis.md`).

### Step 6 — Health checks (15 min)

Run the four review passes and the live link check from the repo root (`06-build/`):

```bash
npm run review:all          # mechanical, user journeys, friction, trust
npm run links:check:live    # HEAD-checks every external URL — needs network
```

Fix anything the reviews flag as HIGH. Note MED/LOW items in the refresh log.

`links:check:live` is the one check that cannot run in CI (it needs open network egress and is mildly flaky), so it lives here in the monthly loop. A dead "buy adapter" or "download firmware" link is an ecommerce trust killer — do not skip this.

**Known migration item:** four Orbita images are still served from `images.spr.so` (the old super.so portal CDN). Until they are re-hosted under `public/illustrations/`, they are a single point of failure. Re-host them during any month with spare time — the link checker prints a reminder each run.

Two questions for the end of the session:

1. **Did any source surprise us this month?** (A new topic, a sudden volume spike.) If yes, flag it in `_meta/decisions.md` for discussion.
2. **Did any source go silent?** (Freshdesk usually has 200+ tickets/month; if it drops to 50, something is wrong with the support tooling.) If yes, flag it for Andrey.

Total session time: ~2 hours + ~1 hour Andrey review of the proposed changes.

---

## Annual cadence — the bigger pass

Once a year, run the **full** help-review prompt against every page. This is the quality bar reset. Expect to find 3–5 pages that have drifted from `docs/VOICE.md` because conventions have evolved.

Annual pass items:
- Re-cluster the entire corpus from scratch.
- Re-validate the segment definitions (`_meta/taxonomy.md`).
- Audit every internal link.
- Bump dependency versions in `package.json` (and run `npm run links:check:live`).
- Re-run the FB group audit (`_meta/fb-group-audit.md`).
- Re-validate KPI definitions in `START-HERE.html`.

Schedule: same week as Black Friday prep, before the December rush.

---

## What "done" looks like for a monthly refresh

A successful refresh produces three artefacts:

1. **A commit** on `main` in `github.com/Playtronica/help-center`, tagged `refresh-YYYY-MM` in the message.
2. **`_meta/refresh-log-YYYY-MM.md`** documenting what changed and why.
3. **Dashboard update** in `START-HERE.html` with the four monthly numbers.

If a refresh ships without all three, the loop is broken — fix it next time.

---

## Why monthly is the right cadence

- **Weekly** is too noisy. Single tickets get over-interpreted.
- **Quarterly** is too slow. Three months of customer pain compounds into NPS damage.
- **Monthly** matches Andrey's existing weekly-metrics report cadence and his marketing cycle.

---

## Failure modes to watch

- **The refresh-log starts saying "no changes needed" for two months in a row.** Either the help center is perfect (unlikely) or the signal pull is stale. Audit Step 1.
- **The Pagefind zero-results log fills with the same query.** People want a page that does not exist. Write it.
- **WhatsApp feedback widget volume drops.** Either the help is perfect (rare) or the widget broke. Smoke-test it.
- **A specific source goes silent.** See Step 6.

---

*Last revised: 2026-05-19.*
