# Article outcome log

Every article is a hypothesis: publishing a verified reusable answer should make the matching customer problem easier to resolve or prevent it entirely.

## Inventory

`content/_data/hypotheses.json` is the generated inventory of articles plus their outcome notes. Run this after adding or removing a page:

```bash
python3 scripts/rebuild-hypothesis-log.py
```

`./help check` blocks when the inventory and real Markdown files differ. Manual outcome fields are preserved by the rebuild script.

`deflection_target_per_month: 0` means the page has no valid support-volume target. Do not invent one. A nonzero target is useful only when its topic definition and baseline came from comparable primary ticket data.

## Review a published answer

Use the gap record, not the page slug, to define the topic. Compare equivalent periods and retain the exact query or evidence references.

```text
Article:
Gap ID:
Answer published (commit and date):
Primary evidence before:
Primary evidence after:
Was the article linked in replies?:
Repeat questions or follow-ups:
Contradictory evidence:
Verdict: success / partial / failed / obsolete / unknown
What we learned:
Next check:
```

Evidence can include matched Freshdesk tickets, resolution/follow-up outcomes, article feedback, and real site-wide search events. Page views alone do not show that an answer worked. A lower ticket count alone does not prove deflection.

## Exploratory counter

`scripts/check-deflection-vs-tickets.py` searches Freshdesk using words derived from a page slug. It is a rough discovery aid only. It can miss tickets, combine unrelated intents, and cannot establish that a help article caused a change. Never advance a gap to `observed` from this counter alone.

The authoritative lifecycle is documented in [HELP-LOOP.md](HELP-LOOP.md).
