# Pending help-center work

This file is intentionally a pointer, not another manually maintained backlog.

## Customer-answer gaps

Run:

```bash
./help
./help gap list --status open
```

Canonical private state:

- `~/ProjectData/Playtronica/help-loop/gaps.json` — current lifecycle state;
- `~/ProjectData/Playtronica/help-loop/events.jsonl` — append-only history;
- `~/ProjectData/Playtronica/help-loop/BACKLOG.md` — generated human view.

The state is private because each item points back to primary customer evidence. Do not copy raw ticket or message text into this public repository.

## Code, infrastructure, and design work

Use GitHub issues in `github.com/Playtronica/help`. These are not customer-answer gaps and should not share the content lifecycle.

## Historical plans

The old `help-workshop`, dated reports, and previous versions of this file are research history, not active queues. They may inspire a check, but an item becomes current only when confirmed against present primary evidence or current repository state.
