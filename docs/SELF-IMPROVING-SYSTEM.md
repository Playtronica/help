# How the help center improves from real customer work

The operating system is event-driven: every customer question must end with either a relevant help link or a referenced knowledge gap. See [HELP-LOOP.md](HELP-LOOP.md) for the exact commands and state machine.

## One source of content, one source of private workflow state

- Public articles and checks: this `Playtronica/help` repository.
- Primary customer evidence: Freshdesk, Telegram, WhatsApp, email, Shopify, search logs, or another named source.
- Private gap state and history: `~/ProjectData/Playtronica/help-loop/`.
- Raw exports and PII: private source folders under `~/ProjectData`; never this public repository.

Other clones, workshop notes, reports, model summaries, and old corpora are useful history. They are not sources of truth. `./help status` reveals duplicate checkouts so edits do not silently split.

## The loop

1. **Resolve.** Run `./help find "question"`. Use the closest relevant article in every support answer.
2. **Capture.** If the article lacks a reusable answer, add a gap with an exact primary-source reference. Drafter records these automatically in its gap feed; `./help` imports them idempotently.
3. **Prioritise.** Repeated evidence merges into the same gap. Frequency matters, but high-risk safety, money, and policy claims are routed to stronger human verification.
4. **Improve.** Edit the mapped article, not a parallel FAQ or private answer library.
5. **Verify.** A human confirms facts against an authoritative product, operational, legal, financial, or safety source. An LLM or old internal note is never the authority.
6. **Gate.** Run `./help check --full`. Broken links, inconsistent claims, stale page inventory, lint, or build failures block publication.
7. **Publish.** Push a reviewed commit and verify the live URL. Record the commit in the gap state.
8. **Observe.** Later ticket evidence and searches show whether the answer prevents confusion. Contradictory evidence reopens the gap.

This is a closed loop because every branch has a terminal record: covered by a live article, open with evidence, rejected with a reason, or published and awaiting observation.

## What “complete help” means

It does not mean guessing every question anyone might ask. It means:

- every recurring, reusable, customer-safe answer seen in primary evidence is covered or explicitly open;
- every claim can be traced to current authority;
- case-specific information stays in the support reply, not the public article;
- absence of evidence is never converted into a confident public claim.

## Layers around the event loop

The older broad audits remain useful, but they are secondary:

- CI catches mechanical regression on every pull request.
- Weekly live-link and deployment checks catch broken delivery.
- Monthly review looks for silent sources, stale open gaps, and recurring themes the event stream may miss.
- Quarterly outcome review asks whether published answers changed ticket outcomes.

None of these replaces the per-ticket loop. A monthly report is not a backlog, and a page-view count is not proof of deflection.

## Measurement

For each published gap, measure a comparable before/after window using the same topic definition:

- repeated tickets or follow-ups about the missing answer;
- support resolution outcome and whether the article was actually used;
- article feedback and zero-result searches;
- new contradictory primary evidence.

The old slug-keyword counter (`check-deflection-vs-tickets.py`) is exploratory only. It cannot prove causality: ticket text rarely contains a page slug, topics overlap, and fewer tickets may have causes unrelated to the article.
