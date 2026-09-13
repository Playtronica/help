#!/usr/bin/env python3
"""One front door for Playtronica help work.

The public repository stores code and articles. Private evidence and the gap
workflow live under ~/ProjectData/Playtronica/help-loop by default. The tool is
deterministic and has no model or API dependency.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile
from collections import Counter
from datetime import date, datetime, timezone
from pathlib import Path
from urllib.parse import urlparse


REPO = Path(__file__).resolve().parent.parent
CONTENT = REPO / "content" / "en"
DEFAULT_STATE_DIR = Path(
    os.environ.get(
        "PLAYTRONICA_HELP_STATE_DIR",
        Path.home() / "ProjectData" / "Playtronica" / "help-loop",
    )
)
DEFAULT_DRAFTER_GAPS = Path(
    os.environ.get(
        "PLAYTRONICA_DRAFTER_GAPS",
        Path.home()
        / "ProjectData"
        / "Playtronica"
        / "support-drafts"
        / "help-gaps.jsonl",
    )
)
HELP_REMOTE = "github.com/playtronica/help"
VALID_STATES = ("open", "in_progress", "verified", "published", "observed", "rejected")
TRANSITIONS = {
    "open": {"in_progress", "rejected"},
    "in_progress": {"open", "verified", "rejected"},
    "verified": {"in_progress", "published", "rejected"},
    "published": {"verified", "observed"},
    "observed": {"open"},
    "rejected": {"open"},
}
RISK_TERMS = {
    "high": {
        "clinical", "medical", "pregnan", "pacemaker", "safety", "disinfect",
        "allerg", "tax", "vat", "invoice", "refund", "warranty", "legal",
        "adhesive", "chemical", "voltage", "power supply",
        "chorus pro", "mandat administratif", "public institution",
        "procurement", "purchase order", "privacy", "passport",
        "personal identifier", "identification number", "identity document",
        "national id", "visa identifier", "data retention",
    },
    "medium": {
        "shipping", "delivery", "country", "availability", "firmware",
        "compatib", "returns", "discount", "price", "payment",
    },
}


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def state_paths(state_dir: Path) -> tuple[Path, Path, Path]:
    return state_dir / "gaps.json", state_dir / "events.jsonl", state_dir / "BACKLOG.md"


def empty_state() -> dict:
    return {"schema_version": 1, "updated_at": utc_now(), "gaps": []}


def load_state(state_dir: Path) -> dict:
    snapshot, _, _ = state_paths(state_dir)
    if not snapshot.exists():
        return empty_state()
    data = json.loads(snapshot.read_text(encoding="utf-8"))
    if data.get("schema_version") != 1 or not isinstance(data.get("gaps"), list):
        raise SystemExit(f"Unsupported or invalid state file: {snapshot}")
    return data


def atomic_write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp_name = tempfile.mkstemp(prefix=f".{path.name}.", dir=path.parent)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as handle:
            handle.write(text)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(tmp_name, path)
    finally:
        if os.path.exists(tmp_name):
            os.unlink(tmp_name)


def append_event(state_dir: Path, event: dict) -> None:
    _, events, _ = state_paths(state_dir)
    events.parent.mkdir(parents=True, exist_ok=True)
    with events.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(event, ensure_ascii=False, sort_keys=True) + "\n")


def save_state(state_dir: Path, state: dict, event: dict | None = None) -> None:
    state["updated_at"] = utc_now()
    snapshot, _, backlog = state_paths(state_dir)
    atomic_write(snapshot, json.dumps(state, indent=2, ensure_ascii=False) + "\n")
    atomic_write(backlog, render_backlog(state))
    if event:
        append_event(state_dir, {"at": utc_now(), **event})


def normalize_text(value: str) -> str:
    return " ".join(value.strip().lower().split())


def gap_key(article_url: str, missing_answer: str) -> str:
    material = f"{normalize_article_url(article_url)}\n{normalize_text(missing_answer)}"
    return hashlib.sha256(material.encode()).hexdigest()[:12]


def matching_drafter_gap(state: dict, article_url: str, missing_answer: str,
                         ref: str) -> dict | None:
    """Resolve a superseding Drafter wording to the same ticket/article gap.

    Exact semantic keys remain canonical. If wording changed, reuse an existing
    gap only when the primary ticket reference and article identify one and only
    one candidate; ambiguity deliberately creates a separate record.
    """
    exact = gap_key(article_url, missing_answer)
    for item in state["gaps"]:
        if item["key"] == exact:
            return item
    normalized_article = normalize_article_url(article_url)
    candidates = [
        item for item in state["gaps"]
        if normalize_article_url(item.get("article_url") or "") == normalized_article
        and any(str(ev.get("ref") or "") == ref for ev in item.get("evidence") or [])
    ]
    return candidates[0] if len(candidates) == 1 else None


def gap_id(key: str) -> str:
    return f"HELP-{key[:8].upper()}"


def normalize_article_url(value: str) -> str:
    value = value.strip()
    if not value:
        return ""
    if value.startswith("content/en/"):
        parts = Path(value).parts
        return f"https://help.playtronica.com/{parts[2]}/{Path(parts[3]).stem}/"
    if value.startswith("/"):
        return "https://help.playtronica.com" + value.rstrip("/") + "/"
    parsed = urlparse(value)
    if parsed.netloc:
        return "https://help.playtronica.com" + parsed.path.rstrip("/") + "/"
    return value


def article_path(article_url: str) -> Path | None:
    parsed = urlparse(normalize_article_url(article_url))
    parts = [p for p in parsed.path.split("/") if p]
    if len(parts) != 2:
        return None
    path = CONTENT / parts[0] / f"{parts[1]}.md"
    return path if path.exists() else None


def risk_for(text: str) -> str:
    lowered = normalize_text(text)
    for level in ("high", "medium"):
        if any(term in lowered for term in RISK_TERMS[level]):
            return level
    return "normal"


def evidence(source: str, ref: str, seen_at: str | None = None) -> dict:
    return {
        "source": source.strip().lower(),
        "ref": ref.strip(),
        "seen_at": seen_at or date.today().isoformat(),
    }


def evidence_key(value: dict) -> tuple[str, str]:
    return str(value.get("source") or "").strip().lower(), str(value.get("ref") or "").strip()


def dedupe_state_evidence(state: dict) -> int:
    """Count one primary ticket/source once, while preserving the observation window."""
    removed = 0
    for item in state["gaps"]:
        before_count = len(item.get("evidence") or [])
        unique = {}
        seen_dates = []
        for ev in item.get("evidence") or []:
            key = evidence_key(ev)
            seen = str(ev.get("seen_at") or "")
            if seen:
                seen_dates.append(seen)
            if key not in unique or seen < str(unique[key].get("seen_at") or ""):
                unique[key] = ev
        removed += before_count - len(unique)
        item["evidence"] = list(unique.values())
        item["occurrences"] = len(item["evidence"])
        if seen_dates:
            item["first_seen"] = min(str(item.get("first_seen") or seen_dates[0]), min(seen_dates))
            item["last_seen"] = max(str(item.get("last_seen") or seen_dates[0]), max(seen_dates))
    return removed


def upsert_gap(
    state: dict,
    *,
    article_url: str,
    missing_answer: str,
    source: str,
    ref: str,
    seen_at: str | None = None,
    note: str = "",
) -> tuple[dict, bool]:
    article_url = normalize_article_url(article_url)
    key = gap_key(article_url, missing_answer)
    ev = evidence(source, ref, seen_at)
    for item in state["gaps"]:
        if item["key"] == key:
            evidence_added = evidence_key(ev) not in {evidence_key(old) for old in item["evidence"]}
            if evidence_added:
                item["evidence"].append(ev)
            item["last_seen"] = max(str(item.get("last_seen") or ""), ev["seen_at"])
            item["occurrences"] = len(item["evidence"])
            item["risk"] = risk_for(f"{article_url} {missing_answer}")
            item["updated_at"] = utc_now()
            if evidence_added and item["status"] in {"published", "observed", "rejected"}:
                item["status"] = "open"
                item["reopened_at"] = utc_now()
            return item, False
    item = {
        "id": gap_id(key),
        "key": key,
        "status": "open",
        "risk": risk_for(f"{article_url} {missing_answer}"),
        "article_url": article_url,
        "article_path": str(article_path(article_url).relative_to(REPO)) if article_path(article_url) else None,
        "missing_answer": missing_answer.strip(),
        "first_seen": ev["seen_at"],
        "last_seen": ev["seen_at"],
        "occurrences": 1,
        "evidence": [ev],
        "notes": [note.strip()] if note.strip() else [],
        "created_at": utc_now(),
        "updated_at": utc_now(),
    }
    state["gaps"].append(item)
    return item, True


def rebind_gap(state: dict, identifier: str, article: str) -> dict:
    """Move a gap to an existing canonical article without changing its stable ID."""
    item = get_gap(state, identifier)
    new_url = normalize_article_url(article)
    new_path = article_path(new_url)
    if not new_path:
        raise SystemExit("Cannot rebind: mapped article does not exist in this checkout.")
    new_key = gap_key(new_url, item["missing_answer"])
    duplicate = next(
        (gap for gap in state["gaps"] if gap is not item and gap.get("key") == new_key),
        None,
    )
    if duplicate:
        raise SystemExit(f"Cannot rebind: target would duplicate {duplicate['id']}.")
    item["key"] = new_key
    item["article_url"] = new_url
    item["article_path"] = str(new_path.relative_to(REPO))
    item["risk"] = risk_for(f"{new_url} {item['missing_answer']}")
    item["updated_at"] = utc_now()
    return item


def get_gap(state: dict, identifier: str) -> dict:
    wanted = identifier.upper()
    matches = [g for g in state["gaps"] if g["id"].upper() == wanted or g["key"].upper().startswith(wanted)]
    if len(matches) != 1:
        raise SystemExit(f"Gap not found or ambiguous: {identifier}")
    return matches[0]


def render_backlog(state: dict) -> str:
    counts = Counter(g["status"] for g in state["gaps"])
    lines = [
        "# Playtronica Help Gap Backlog",
        "",
        f"Generated: {state.get('updated_at', '')}",
        "",
        "Private working index. Raw customer text stays in its source system; this file keeps only references and the missing reusable answer.",
        "",
        "## Summary",
        "",
        " | ".join(f"{s}: {counts.get(s, 0)}" for s in VALID_STATES),
        "",
    ]
    order = {s: i for i, s in enumerate(VALID_STATES)}
    for gap in sorted(state["gaps"], key=lambda g: (order.get(g["status"], 99), -g["occurrences"], g["id"])):
        lines += [
            f"## {gap['id']} — {gap['status']} — {gap['risk']} risk",
            "",
            f"- Article: {gap['article_url']}",
            f"- Missing answer: {gap['missing_answer']}",
            f"- Evidence: {gap['occurrences']} ({', '.join(e['source'] + ':' + e['ref'] for e in gap['evidence'])})",
            f"- Seen: {gap['first_seen']} → {gap['last_seen']}",
        ]
        if gap.get("notes"):
            lines.append(f"- Latest note: {gap['notes'][-1]}")
        lines.append("")
    return "\n".join(lines) + "\n"


def parse_frontmatter(text: str) -> dict:
    if not text.startswith("---\n"):
        return {}
    end = text.find("\n---", 4)
    if end < 0:
        return {}
    result = {}
    for line in text[4:end].splitlines():
        match = re.match(r"^([a-z_][a-z0-9_]*):\s*(.*?)\s*$", line, re.I)
        if match:
            result[match.group(1)] = match.group(2).strip('"\'')
    return result


TOKEN_RE = re.compile(r"[a-z0-9][a-z0-9+.#'-]{1,}", re.I)
STOP = {"the", "and", "for", "with", "from", "that", "this", "your", "you", "how", "what", "can", "are", "is", "to", "of", "a", "in", "on", "my", "i"}


def tokens(text: str) -> list[str]:
    return [t.lower() for t in TOKEN_RE.findall(text) if t.lower() not in STOP]


def article_records() -> list[dict]:
    records = []
    for path in sorted(CONTENT.rglob("*.md")):
        text = path.read_text(encoding="utf-8")
        fm = parse_frontmatter(text)
        headings = " ".join(re.findall(r"^#{1,3}\s+(.+)$", text, re.M))
        section = path.parent.name
        slug = fm.get("slug", path.stem)
        records.append({
            "path": str(path.relative_to(REPO)),
            "url": f"https://help.playtronica.com/{section}/{slug}/",
            "title": fm.get("title", slug),
            "summary": fm.get("summary", ""),
            "search": f"{fm.get('title', '')} {fm.get('summary', '')} {headings} {text}",
        })
    return records


def rank_articles(query: str, limit: int = 5) -> list[dict]:
    query_tokens = tokens(query)
    phrase = normalize_text(query)
    scored = []
    for record in article_records():
        title = normalize_text(record["title"])
        summary = normalize_text(record["summary"])
        hay_tokens = Counter(tokens(record["search"]))
        score = 0
        for token in query_tokens:
            score += min(hay_tokens[token], 5)
            if token in title:
                score += 8
            elif token in summary:
                score += 4
        if phrase and phrase in normalize_text(record["search"]):
            score += 20
        if score:
            scored.append({**record, "score": score})
    return sorted(scored, key=lambda r: (-r["score"], r["url"]))[:limit]


def git(*args: str, cwd: Path = REPO) -> subprocess.CompletedProcess:
    return subprocess.run(["git", "-C", str(cwd), *args], text=True, capture_output=True)


def remote_identity(path: Path) -> str:
    result = git("remote", "get-url", "origin", cwd=path)
    return result.stdout.strip().lower().removesuffix(".git")


def find_help_checkouts() -> list[Path]:
    roots = [Path.home() / "Projects"]
    found = [REPO]
    ignored = {"node_modules", ".next", "out", "dist", "build", ".cache", "ProjectData"}
    for root in roots:
        if not root.exists():
            continue
        for current, dirs, files in os.walk(root):
            dirs[:] = [d for d in dirs if d not in ignored]
            cur = Path(current)
            if ".git" in dirs:
                dirs.remove(".git")
                if HELP_REMOTE in remote_identity(cur):
                    found.append(cur)
            elif ".git" in files and HELP_REMOTE in remote_identity(cur):
                found.append(cur)
    return sorted(set(found))


def find_legacy_help_skills() -> list[Path]:
    roots = [Path.home() / "Projects" / "Claude"]
    found = []
    ignored = {"node_modules", ".next", "out", "dist", "build", ".git"}
    for root in roots:
        if not root.exists():
            continue
        for current, dirs, files in os.walk(root):
            dirs[:] = [d for d in dirs if d not in ignored]
            path = Path(current)
            if path.name.startswith("help-center-") and path.parent.name == "skills" and "SKILL.md" in files:
                found.append(path / "SKILL.md")
    return sorted(found)


def cmd_status(args: argparse.Namespace) -> int:
    state = load_state(args.state_dir)
    counts = Counter(g["status"] for g in state["gaps"])
    branch = git("branch", "--show-current").stdout.strip()
    origin = git("rev-parse", "origin/main").stdout.strip()[:10]
    head = git("rev-parse", "HEAD").stdout.strip()[:10]
    dirty = bool(git("status", "--porcelain").stdout.strip())
    print(f"Help repo: {REPO}")
    print(f"Branch: {branch}  HEAD: {head}  cached origin/main: {origin}  dirty: {'yes' if dirty else 'no'}")
    print(f"Articles: {len(article_records())}")
    print("Gaps: " + "  ".join(f"{s}={counts.get(s, 0)}" for s in VALID_STATES))
    print(f"Private state: {args.state_dir}")
    checkouts = find_help_checkouts()
    print(f"Checkouts of Playtronica/help: {len(checkouts)}")
    for path in checkouts:
        branch_name = git("branch", "--show-current", cwd=path).stdout.strip() or "detached"
        porcelain = git("status", "--porcelain", cwd=path).stdout.strip()
        marker = "CURRENT" if path.resolve() == REPO.resolve() else "other"
        print(f"  [{marker}] {path} — {branch_name}, {'dirty' if porcelain else 'clean'}")
    if len(checkouts) > 1:
        print("WARNING: multiple checkouts exist. Work only in the CURRENT checkout; do not copy files between them.")
    legacy_skills = find_legacy_help_skills()
    if legacy_skills:
        print(
            f"Legacy help skill copies: {len(legacy_skills)} — historical schedulers with stale paths; "
            "do not use them as workflow authority."
        )
    if DEFAULT_DRAFTER_GAPS.exists():
        records = [json.loads(line) for line in DEFAULT_DRAFTER_GAPS.read_text(encoding="utf-8").splitlines() if line.strip()]
        pending = sum(
            1 for r in records
            if r.get("gap")
            and not matching_drafter_gap(
                state,
                r.get("article_url") or "",
                r.get("gap", ""),
                str(r.get("ticket_ref") or r.get("ticket") or ""),
            )
        )
        suffix = "synchronized" if pending == 0 else f"{pending} new — run './help gap import-drafter'"
        print(f"Drafter gap feed: {len(records)} records — {suffix}")
    return 0


def cmd_find(args: argparse.Namespace) -> int:
    results = rank_articles(" ".join(args.query), args.limit)
    if not results:
        print("No matching article. Record the missing reusable answer with './help gap add'.")
        return 1
    for i, item in enumerate(results, 1):
        print(f"{i}. {item['title']}  [score {item['score']}]")
        print(f"   {item['url']}")
        print(f"   {item['path']}")
    return 0


def cmd_gap_add(args: argparse.Namespace) -> int:
    state = load_state(args.state_dir)
    item, created = upsert_gap(
        state,
        article_url=args.article,
        missing_answer=args.missing,
        source=args.source,
        ref=args.ref,
        seen_at=args.seen_at,
        note=args.note,
    )
    save_state(args.state_dir, state, {"action": "gap_added" if created else "evidence_added", "gap_id": item["id"], "source": args.source, "ref": args.ref})
    print(f"{'Created' if created else 'Updated'} {item['id']}: {item['missing_answer']}")
    print(f"Status={item['status']} risk={item['risk']} evidence={item['occurrences']}")
    return 0


def cmd_gap_rebind(args: argparse.Namespace) -> int:
    state = load_state(args.state_dir)
    item = get_gap(state, args.id)
    old_url = item.get("article_url") or ""
    item = rebind_gap(state, args.id, args.article)
    save_state(
        args.state_dir,
        state,
        {
            "action": "article_rebound",
            "gap_id": item["id"],
            "from": old_url,
            "to": item["article_url"],
        },
    )
    print(f"{item['id']}: {old_url or '(unmapped)'} → {item['article_url']}")
    return 0


def cmd_gap_import(args: argparse.Namespace) -> int:
    source_path = args.path
    if not source_path.exists():
        raise SystemExit(f"Drafter gap feed not found: {source_path}")
    state = load_state(args.state_dir)
    repaired_evidence = dedupe_state_evidence(state)
    created = evidence_added = unchanged = skipped = 0
    imported_ids = []
    for line_no, line in enumerate(source_path.read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip():
            continue
        try:
            raw = json.loads(line)
            article = raw.get("article_url") or ""
            missing = raw.get("gap", "")
            ref = str(raw.get("ticket_ref") or raw.get("ticket") or f"line-{line_no}")
            if not missing:
                skipped += 1
                continue
            matched = matching_drafter_gap(state, article, missing, ref)
            canonical_missing = matched["missing_answer"] if matched else missing
            before = len(matched["evidence"]) if matched else 0
            item, was_created = upsert_gap(
                state,
                article_url=article,
                missing_answer=canonical_missing,
                source="freshdesk",
                ref=ref,
                seen_at=raw.get("seen_at"),
                note=f"Imported from {source_path.name}",
            )
            if matched and normalize_text(missing) != normalize_text(canonical_missing):
                alias = f"Superseding Drafter wording: {missing.strip()}"
                if alias not in item["notes"]:
                    item["notes"].append(alias)
            imported_ids.append(item["id"])
            created += int(was_created)
            if not was_created and len(item["evidence"]) > before:
                evidence_added += 1
            elif not was_created:
                unchanged += 1
        except (json.JSONDecodeError, TypeError, ValueError):
            skipped += 1
    save_state(args.state_dir, state, {"action": "drafter_import", "source_path": str(source_path), "created": created, "evidence_added": evidence_added, "unchanged": unchanged, "skipped": skipped, "repaired_evidence": repaired_evidence, "gap_ids": sorted(set(imported_ids))})
    print(f"Imported Drafter gaps: created={created} evidence_added={evidence_added} unchanged={unchanged} skipped={skipped} repaired_evidence={repaired_evidence}")
    return 0


def cmd_start(args: argparse.Namespace) -> int:
    """Start a help session: absorb new ticket gaps, show safety state and next work."""
    if args.drafter_path.exists():
        import_args = argparse.Namespace(state_dir=args.state_dir, path=args.drafter_path)
        cmd_gap_import(import_args)
    else:
        print(f"Drafter gap feed absent: {args.drafter_path}")
    print()
    cmd_status(args)
    print("\nHighest-priority unfinished gap:")
    return cmd_gap_next(args)


def cmd_gap_list(args: argparse.Namespace) -> int:
    state = load_state(args.state_dir)
    selected = [g for g in state["gaps"] if args.status == "all" or g["status"] == args.status]
    selected.sort(key=lambda g: (-g["occurrences"], g["risk"] != "high", g["id"]))
    if not selected:
        print("No matching gaps.")
        return 0
    for gap in selected:
        print(f"{gap['id']}  {gap['status']:<11} {gap['risk']:<6} evidence={gap['occurrences']}")
        print(f"  {gap['missing_answer']}")
        print(f"  {gap['article_url']}")
    return 0


def cmd_gap_next(args: argparse.Namespace) -> int:
    state = load_state(args.state_dir)
    candidates = [g for g in state["gaps"] if g["status"] in {"open", "in_progress"}]
    if not candidates:
        print("No open gaps.")
        return 0
    risk_order = {"high": 0, "medium": 1, "normal": 2}
    candidates.sort(key=lambda g: (g["status"] != "in_progress", -g["occurrences"], risk_order[g["risk"]], g["first_seen"]))
    gap = candidates[0]
    print(json.dumps(gap, indent=2, ensure_ascii=False))
    if gap.get("article_path"):
        print(f"\nEdit: {REPO / gap['article_path']}")
    return 0


def cmd_gap_move(args: argparse.Namespace) -> int:
    state = load_state(args.state_dir)
    gap = get_gap(state, args.id)
    old = gap["status"]
    if args.to not in TRANSITIONS.get(old, set()):
        allowed = ", ".join(sorted(TRANSITIONS.get(old, set()))) or "none"
        raise SystemExit(f"Invalid transition {old} → {args.to}. Allowed: {allowed}")
    if args.to in {"verified", "published", "observed"} and not args.note:
        raise SystemExit(f"Transition to {args.to} requires --note with the evidence or human decision.")
    if args.to == "verified":
        path = article_path(gap["article_url"])
        if not path:
            raise SystemExit("Cannot verify: mapped article does not exist in this checkout.")
    if args.to == "published":
        if not args.commit or not re.fullmatch(r"[0-9a-fA-F]{7,40}", args.commit):
            raise SystemExit("Publishing requires --commit with a 7–40 character git SHA.")
        gap["published_commit"] = args.commit
        gap["published_at"] = utc_now()
    if args.to == "observed":
        gap["observed_at"] = utc_now()
    gap["status"] = args.to
    gap["updated_at"] = utc_now()
    if args.note:
        gap.setdefault("notes", []).append(args.note.strip())
    save_state(args.state_dir, state, {"action": "status_changed", "gap_id": gap["id"], "from": old, "to": args.to, "note": args.note, "commit": args.commit})
    print(f"{gap['id']}: {old} → {args.to}")
    return 0


def run_check(command: list[str], label: str) -> bool:
    print(f"\n== {label} ==")
    result = subprocess.run(command, cwd=REPO)
    return result.returncode == 0


def check_loop_metadata(state_dir: Path) -> bool:
    """Fail when generated page inventory or private gap pointers have drifted."""
    print("\n== help loop metadata ==")
    ok = True
    hypothesis_path = REPO / "content" / "_data" / "hypotheses.json"
    if not hypothesis_path.exists():
        print("FAIL: content/_data/hypotheses.json is missing")
        ok = False
    else:
        hypotheses = json.loads(hypothesis_path.read_text(encoding="utf-8"))
        actual_urls = {urlparse(r["url"]).path for r in article_records()}
        logged_urls = {p.get("url") for p in hypotheses.get("pages", [])}
        missing = sorted(actual_urls - logged_urls)
        stale = sorted(logged_urls - actual_urls)
        if missing or stale:
            print(
                f"FAIL: hypothesis inventory drifted: {len(missing)} missing, "
                f"{len(stale)} stale. Run python3 scripts/rebuild-hypothesis-log.py"
            )
            for value in missing[:10]:
                print(f"  missing: {value}")
            for value in stale[:10]:
                print(f"  stale: {value}")
            ok = False
        else:
            print(f"PASS: {len(actual_urls)} articles match the hypothesis inventory")

    state = load_state(state_dir)
    invalid = []
    ids = Counter(g.get("id") for g in state["gaps"])
    keys = Counter(g.get("key") for g in state["gaps"])
    for identifier, count in ids.items():
        if identifier and count > 1:
            invalid.append(f"duplicate id {identifier} ({count} records)")
    for key, count in keys.items():
        if key and count > 1:
            invalid.append(f"duplicate gap key {key} ({count} records)")
    for gap in state["gaps"]:
        if gap.get("status") not in VALID_STATES:
            invalid.append(f"{gap.get('id')}: invalid status {gap.get('status')}")
        if gap.get("article_url") and not article_path(gap["article_url"]):
            invalid.append(f"{gap.get('id')}: article is absent in this checkout")
        if not gap.get("evidence"):
            invalid.append(f"{gap.get('id')}: no primary-source reference")
    if invalid:
        print(f"FAIL: {len(invalid)} private gap-state issue(s)")
        for issue in invalid:
            print(f"  {issue}")
        ok = False
    else:
        print(f"PASS: {len(state['gaps'])} gap records have valid state and evidence pointers")
    return ok


def cmd_check(args: argparse.Namespace) -> int:
    checks = [
        ([sys.executable, "-m", "unittest", "discover", "-s", "tests", "-p", "test_*.py"], "help-loop unit tests"),
        ([sys.executable, "scripts/audit-cross-references.py"], "cross references"),
        ([sys.executable, "scripts/check-internal-consistency.py"], "internal consistency"),
        ([sys.executable, "scripts/helpctl.py", "--state-dir", str(args.state_dir), "gap", "list", "--status", "open"], "open knowledge gaps"),
    ]
    if args.full:
        checks += [
            (["npm", "run", "lint"], "ESLint"),
            (["npm", "run", "build"], "production build"),
        ]
    ok = check_loop_metadata(args.state_dir)
    for command, label in checks:
        ok = run_check(command, label) and ok
    print("\nHELP CHECK: " + ("PASS" if ok else "FAIL"))
    return 0 if ok else 1


def parser() -> argparse.ArgumentParser:
    root = argparse.ArgumentParser(prog="help", description="Find, improve, verify, and measure Playtronica help from one command.")
    root.add_argument("--state-dir", type=Path, default=DEFAULT_STATE_DIR, help=argparse.SUPPRESS)
    sub = root.add_subparsers(dest="command", required=True)

    start = sub.add_parser("start", help="start a session: sync Drafter, show safety status and next gap")
    start.add_argument("--drafter-path", type=Path, default=DEFAULT_DRAFTER_GAPS)
    start.set_defaults(func=cmd_start)

    status = sub.add_parser("status", help="show the safe checkout and loop health")
    status.set_defaults(func=cmd_status)

    find = sub.add_parser("find", help="find the best existing article for a customer question")
    find.add_argument("query", nargs="+")
    find.add_argument("--limit", type=int, default=5)
    find.set_defaults(func=cmd_find)

    gap = sub.add_parser("gap", help="manage evidence-backed missing answers")
    gap_sub = gap.add_subparsers(dest="gap_command", required=True)

    add = gap_sub.add_parser("add", help="record one missing reusable answer from primary evidence")
    add.add_argument("--article", required=True, help="live URL, /section/slug/, or content/en path")
    add.add_argument("--missing", required=True, help="the reusable answer the article lacks; never paste PII")
    add.add_argument("--source", required=True, choices=("freshdesk", "telegram", "whatsapp", "email", "search", "shopify", "github", "other"))
    add.add_argument("--ref", required=True, help="ticket/message/query reference, not raw customer text")
    add.add_argument("--seen-at", help="YYYY-MM-DD; defaults to today")
    add.add_argument("--note", default="")
    add.set_defaults(func=cmd_gap_add)

    rebind = gap_sub.add_parser("rebind", help="move a gap to an existing canonical article")
    rebind.add_argument("id")
    rebind.add_argument("--article", required=True, help="live URL, /section/slug/, or content/en path")
    rebind.set_defaults(func=cmd_gap_rebind)

    imp = gap_sub.add_parser("import-drafter", help="import the Drafter ticket-derived gap feed")
    imp.add_argument("--path", type=Path, default=DEFAULT_DRAFTER_GAPS)
    imp.set_defaults(func=cmd_gap_import)

    listing = gap_sub.add_parser("list", help="list gaps")
    listing.add_argument("--status", choices=("all", *VALID_STATES), default="open")
    listing.set_defaults(func=cmd_gap_list)

    next_gap = gap_sub.add_parser("next", help="show the highest-priority unfinished gap")
    next_gap.set_defaults(func=cmd_gap_next)

    move = gap_sub.add_parser("move", help="advance or reopen a gap with an evidence note")
    move.add_argument("id")
    move.add_argument("--to", required=True, choices=VALID_STATES)
    move.add_argument("--note", default="")
    move.add_argument("--commit", default="")
    move.set_defaults(func=cmd_gap_move)

    check = sub.add_parser("check", help="run content gates; add --full before publishing")
    check.add_argument("--full", action="store_true")
    check.set_defaults(func=cmd_check)
    return root


def main(argv: list[str] | None = None) -> int:
    effective = list(sys.argv[1:] if argv is None else argv)
    if not effective:
        effective = ["start"]
    args = parser().parse_args(effective)
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
