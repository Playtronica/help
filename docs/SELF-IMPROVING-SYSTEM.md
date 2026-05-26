# How the help center improves itself

The help center is built as a self-improving system. It applies the same 5-method framework (GAP / Bottlenecks / Staleness / SO Patterns / Leverage Points) and the same PROMETHEUS principles ("Real World Is What Is Reported", Antifragility, Leverage Points) that the rest of Playtronica's strategy work uses — but it does this *for itself*, on a recurring schedule, without anyone remembering to start it.

This document is the map of how it works.

## The four layers

```
                         ┌───────────────────────────────────┐
                         │  Layer 4 — Monthly Audit          │
                         │  Cowork scheduled-task            │
                         │  Generates HTML report monthly    │
                         └────────────────┬──────────────────┘
                                          │
        ┌─────────────────────────────────┼─────────────────────────────────┐
        │                                 │                                 │
┌───────▼────────┐              ┌─────────▼─────────┐             ┌─────────▼──────────┐
│ Layer 3 —      │              │ Layer 2 —         │             │ Layer 1 —          │
│ Hypothesis log │              │ Feedback loop     │             │ Outcomes tracking  │
│ each page is   │              │ classify external │             │ deflection_target  │
│ a hypothesis   │              │ feedback into     │             │ vs Freshdesk       │
│ checked Q90d   │              │ priority list     │             │ ticket volume      │
└────────────────┘              └───────────────────┘             └────────────────────┘
                                          │
                         ┌────────────────▼──────────────────┐
                         │  Layer 0 — CI Gates               │
                         │  audit-help-system.py             │
                         │  check-internal-consistency.py    │
                         │  block bad PRs from merging       │
                         └───────────────────────────────────┘
```

## Layer 0 — CI Gates (catch drift on every PR)

**Where:** `.github/workflows/ci.yml`

Two scripts run on every pull request:

- `scripts/check-internal-consistency.py` — **blocking gate**. Fails the PR if it finds non-canonical service URLs, SLA-phrase drift in "Still stuck" footers, hard-coded calendar dates, broken internal links, or stale `status: edited-YYYY-MM` markers.
- `scripts/audit-help-system.py` — **informational only**. Prints the 5-method snapshot so the PR author sees what the audit currently looks like.

These two are the antidote to staleness. They never make decisions; they refuse to ignore drift.

## Layer 1 — Outcomes Tracking (does the page do its job?)

**Where:** `content/_data/hypotheses.json`, `scripts/check-deflection-vs-tickets.py`, `docs/HYPOTHESIS-LOG.md`

Every page declares a hypothesis in frontmatter:

```yaml
segment: ["music-producer", "creator"]
deflection_target: 50    # tickets per month this page should prevent
```

`rebuild-hypothesis-log.py` derives `_data/hypotheses.json` from these. The monthly task then runs:

```
FRESHDESK_DOMAIN=... FRESHDESK_API_KEY=... python3 scripts/check-deflection-vs-tickets.py
```

For each page with a target, it counts actual Freshdesk tickets containing that slug and labels the page **GREEN / YELLOW / RED / UNKNOWN**. RED pages get flagged for review.

This is how a page that doesn't work gets caught — not by accident, but by a measurement that runs every month.

**Required for full operation:** Freshdesk API key in `FRESHDESK_API_KEY`. Without it, the script prints a list of pages with targets and stops — useful for "which pages are even being measured?".

## Layer 2 — Feedback Loop (close the antifragility loop)

**Where:** `scripts/classify-feedback.py`

Every WhatsApp feedback message and email reply is data. The classifier:

1. Parses a WhatsApp text export (or any line-per-message text file).
2. Sends each message to Claude Haiku with a strict classification prompt.
3. Buckets results into: `broken-link`, `missing-topic`, `unclear-writing`, `wrong-device`, `bug-report`, `question-not-feedback`, `praise`, `off-topic`.
4. Outputs the top 5 actionable categories with sample messages — this is the content roadmap, written by users.

Run monthly with the latest export. Each run writes `_data/feedback-digest-YYYY-MM-DD.json` so you can see whether categories shrink (good — we addressed them) or grow (a recurring failure mode that needs a structural fix).

This is **P5.1 Antifragility** for the help center: every angry user message makes the system smarter.

**Required for full operation:** `ANTHROPIC_API_KEY` in environment. Same key as the translation pipeline.

## Layer 3 — Hypothesis Log (90-day review of every page)

**Where:** `docs/HYPOTHESIS-LOG.md`, `content/_data/hypotheses.json`

Every page has a `next_check_in` date — by default 90 days after `last_edited`. The monthly Cowork audit task is responsible for reviewing pages whose check-in date has passed: gather evidence (page views + tickets + feedback), mark the outcome as `success / partial / failed / obsolete`, and either reset the date (keep) or open a content task (rewrite).

Failed hypotheses are the most valuable outputs. They tell us either the IA is wrong, the segment is wrong, or the voice is wrong — and each failure narrows the search space for what to fix next.

## Layer 4 — Monthly Audit (the orchestrator)

**Where:** Cowork scheduled-task `help-center-system-audit` (runs `0 9 1 * *`)

Every 1st of the month at 9 AM local time, the task:

1. Runs `audit-help-system.py` for the 5-method snapshot.
2. Compares against last month's report (if exists) — identifies what improved, what regressed, what's new.
3. Generates a fresh HTML report at `~/Documents/Claude/Playtronica Claude/docs/audit-help-system-YYYY-MM-DD.html`.
4. Surfaces P0 items in chat as "you can fix these quickly".
5. Triggers the hypothesis-log review for pages whose `next_check_in` has passed.

The task is fully self-contained (the prompt has all the context). It runs while Cowork is open; if Cowork is closed on the 1st, it runs on next launch.

## What is the system NOT

- It does not auto-edit pages.
- It does not auto-merge PRs.
- It does not auto-trigger the translation pipeline.
- It does not send messages to anyone but you.

Every action that changes the actual content is a human decision. The system's job is to make sure that decision is well-informed, that drift is caught early, and that nothing important gets forgotten.

## How to extend this

If you find yourself remembering "I should check X every month", that's a sign X belongs in this system. The pattern is always:

1. A script that measures X reproducibly (`scripts/<verb>-<noun>.py`).
2. Either a CI gate (if X must never get worse) or a monthly task entry (if X needs a human eye).
3. A markdown doc in `docs/` describing what the measurement means and what to do when it crosses a threshold.

The system grows by adding more loops, each one closing a different feedback gap. The 5-method audit is the meta-loop that catches gaps in the gaps.
