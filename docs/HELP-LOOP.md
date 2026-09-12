# The closed help loop

The help center is complete only when every **reusable, customer-safe answer that appears in primary customer evidence** is either in an article or tracked as an explicit gap. Personal order status, private customer data, and answers that are true only for one case do not belong in public help.

`./help` is the one front door. It is deterministic, uses no model, and keeps private evidence outside this public repository.

## Start here

```bash
./help                  # sync new Drafter gaps, show checkout safety and next gap
./help status
./help find "customer's question in plain words"
```

If an article answers the reusable part, link it in the customer reply. If it does not, record the smallest missing answer:

```bash
./help gap add \
  --article /orders/invoice-vat/ \
  --missing "how to correct billing details on an already issued invoice" \
  --source freshdesk \
  --ref 7917
```

Never paste a customer's name, email, address, ticket body, or other PII into `--missing` or `--note`. `--ref` is the pointer back to the primary evidence.

## The lifecycle

```text
customer question
      │
      ▼
find closest article ── fully covered ──► send article and resolve ticket
      │
      └── missing reusable answer
                 │
                 ▼
       open → in_progress → verified → published → observed
                 ▲             │                         │
                 └─────────────┴── new contradictory evidence ──┘
```

- `open`: the gap is backed by a primary-source reference.
- `in_progress`: someone is changing the mapped article or creating the missing one.
- `verified`: a human checked the answer against the authoritative operational, product, legal, or safety source. High-risk facts must never be verified from an LLM or an old internal summary.
- `published`: the verified change passed the full checks, was committed, deployed, and has a live URL.
- `observed`: later tickets/search feedback show whether the answer works. New contradicting evidence reopens it.
- `rejected`: the item is case-specific, unsafe to publish, unsupported, or not actually a content gap. Record why.

Valid transitions are enforced by the tool. Verification, publication, and observation require an evidence note; publication additionally requires a commit SHA.

```bash
./help gap next
./help gap move HELP-… --to in_progress
./help gap move HELP-… --to verified --note "Confirmed by … on YYYY-MM-DD"
./help check --full
./help gap move HELP-… --to published --commit abc1234 --note "Live URL checked"
./help gap move HELP-… --to observed --note "No repeat in 30 days / ticket refs …"
```

## Drafter integration

Drafter writes ticket-derived gap events to:

`~/ProjectData/Playtronica/support-drafts/help-gaps.jsonl`

Import them without copying raw ticket text:

```bash
./help gap import-drafter
./help gap list --status open
```

Repeated evidence is merged into one gap and increases its occurrence count. The private canonical workflow state is:

When a superseding Drafter note rephrases the same missing answer, the importer
reuses the existing gap only if the article and Freshdesk reference identify one
unambiguous record. Ambiguous cases remain separate rather than being guessed together.

```text
~/ProjectData/Playtronica/help-loop/gaps.json
~/ProjectData/Playtronica/help-loop/events.jsonl
~/ProjectData/Playtronica/help-loop/BACKLOG.md
```

`gaps.json` is the current state. `events.jsonl` is append-only history. `BACKLOG.md` is a generated human view. Raw exports remain in their source folders and are not committed.

## What remains human

Human review is not generic proofreading. It is used only where judgment has leverage:

1. Separate a reusable answer from case-specific order handling.
2. Confirm claims against primary sources, especially money, VAT, safety, medical use, compatibility, availability, and delivery promises.
3. Test the instructions as a customer would.
4. Decide whether the article makes the next ticket genuinely easier to resolve.

Models may help cluster or draft low-risk text, but they are never the authority for facts and never advance a gap through `verified`.

## Before publishing

`./help check` runs the quick content gates. `./help check --full` also runs lint and the production build. A gap must not move to `published` until the full check passes and the live URL is verified.

The older monthly audits remain useful as broad health checks. They are not the backlog and no longer define the workflow. The event-driven gap state above is the source of truth for unanswered customer knowledge.
