# Hypothesis Log

Every help-center page is a **hypothesis**, not just a file. Each page makes a claim: *"addressing this topic for this audience will reduce support tickets and let the reader self-serve."*

This log is how we track whether each page is doing its job.

## Where the data lives

`content/_data/hypotheses.json` — one entry per page. Each entry contains:

```json
{
  "url": "/devices/biotron/",
  "title": "Biotron — your plant as a MIDI instrument",
  "audience": ["music-producer", "creator"],
  "what_we_hope": "...",
  "deflection_target_per_month": 50,
  "first_published": "2026-05-26",
  "next_check_in": "2026-08-24",
  "outcome": null,
  "notes": ""
}
```

## How it works

### When a new page is added

1. Run `python3 scripts/rebuild-hypothesis-log.py` (regenerates the JSON from current frontmatter).
2. Manually fill in `deflection_target_per_month` and `what_we_hope` for the new entry — these are decisions, not derived.

### Every 90 days — review

The monthly Cowork audit task includes a step: "for any hypothesis whose `next_check_in` is in the past, gather evidence and mark `outcome`."

Evidence comes from three sources:

- **Page views** — GA4 / Cloudflare Analytics (the audit Cowork task pulls these where available)
- **Support ticket volume** for the page's topic — Freshdesk (see `scripts/check-deflection-vs-tickets.py`)
- **Feedback signals** — WhatsApp + email feedback classifier (see `scripts/classify-feedback.py`)

### Outcome states

- `"success"` — traffic > 100 / month AND support volume < deflection_target_per_month
- `"partial"` — page reaches readers but doesn't reduce tickets enough
- `"failed"` — low traffic OR support volume unchanged
- `"obsolete"` — topic no longer relevant (product change, feature deprecated)

A `"failed"` hypothesis is the most valuable signal — it tells us either the page is in the wrong place (IA problem), addresses the wrong audience (segment problem), or is written poorly (voice problem). Each failure makes the system smarter.

## Principles

This log is the help-center implementation of three of your PROMETHEUS principles:

- **P4.3 — "Real World Is What Is Reported"**: a page that doesn't have a hypothesis is invisible to the system.
- **P5.1 — Antifragility**: failed hypotheses produce more knowledge than successful ones.
- **P1.4 — Leverage Points**: focus on the 10% of pages that fail — they're the biggest constraint on overall help-center effectiveness.

## Manual review template

When `outcome` is empty and `next_check_in` has passed:

```
Page: /devices/biotron/
Audience: music-producer, creator
Hypothesis: "Address Biotron for music-producers + creators, reduce tickets and let them self-serve."

Last 30 days:
  Page views: <number>
  Support tickets containing 'biotron': <number>
  WhatsApp feedback mentioning biotron: <number>
  Top complaint pattern: <category>

Verdict: success / partial / failed / obsolete
Notes: <what we learned>

Next check-in: <today + 90 days>
```

## Why this matters

Without a hypothesis log, every page becomes a permanent fixture nobody questions. With one, each page has an expiry — by Q3 2026, every page either has evidence that it works or has been rewritten, archived, or replaced.
