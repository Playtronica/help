"use client";
import { useEffect, useRef, useState } from "react";

type Hit = { url: string; meta: { title: string }; excerpt: string };

declare global {
  interface Window {
    pagefind: any;
  }
}

type JsonEntry = {
  url: string;
  title: string;
  summary: string;
  body: string;
  section: string;
  emoji: string;
};

/**
 * SearchBar — body-text search across the help center.
 *
 *  - In production, prefers Pagefind (built by `npm run build`). Pagefind
 *    indexes the rendered HTML body and produces a tiny, fast search index.
 *  - In dev OR if Pagefind is not available for any reason, falls back to a
 *    static `/search-index.json` built by `scripts/build-search-index.mjs`.
 *    The fallback covers title + summary + body text — so body-text search
 *    works in dev too.
 *
 * The fallback is fuzzy-ish: it splits the query into terms and ranks pages
 * by how many terms appear in title (3x weight), summary (2x), body (1x).
 * Returns up to 8 hits with a highlighted excerpt around the first match.
 */
export function SearchBar() {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const [pagefindReady, setPagefindReady] = useState(false);
  const [jsonIndex, setJsonIndex] = useState<JsonEntry[] | null>(null);

  // Lazy-load Pagefind on mount. If it fails (dev mode, before first build),
  // load the JSON fallback index in parallel.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.pagefind) {
      setPagefindReady(true);
      return;
    }
    fetch("/_pagefind/pagefind.js")
      .then((r) => {
        if (!r.ok) throw new Error("no pagefind");
        const url = "/_pagefind/pagefind.js";
        // @ts-ignore — pagefind.js is a static asset, not a typed module.
        return import(/* webpackIgnore: true */ url);
      })
      .then(async (m: any) => {
        window.pagefind = m;
        if (m.options) await m.options({ ranking: { termFrequency: 0.4 } });
        setPagefindReady(true);
      })
      .catch(() => {
        // Pagefind unavailable. Load the JSON fallback.
        fetch("/search-index.json")
          .then((r) => (r.ok ? r.json() : null))
          .then((data: JsonEntry[] | null) => setJsonIndex(data))
          .catch(() => {});
      });
  }, []);

  async function onChange(v: string) {
    setQ(v);
    setOpen(true);
    if (!v || v.length < 2) {
      setHits([]);
      return;
    }
    if (window.pagefind) {
      try {
        const res = await window.pagefind.search(v);
        const top = (await Promise.all(
          (res.results || []).slice(0, 8).map((r: any) => r.data()),
        )) as Hit[];
        setHits(top);
        logQuery(v, top.length);
        return;
      } catch {
        /* fall through to JSON / DOM fallback */
      }
    }
    if (jsonIndex) {
      const matches = searchJson(jsonIndex, v);
      setHits(matches);
      logQuery(v, matches.length);
      return;
    }
    // Final fallback — sidebar link text. Only fires if both Pagefind and the
    // JSON index failed to load.
    const ql = v.toLowerCase();
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("aside a"));
    const matches = links
      .filter((a) => (a.textContent || "").toLowerCase().includes(ql))
      .slice(0, 8)
      .map((a) => ({
        url: a.getAttribute("href") || "#",
        meta: { title: a.textContent?.trim() || "" },
        excerpt: "",
      }));
    setHits(matches);
    logQuery(v, matches.length);
  }

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={boxRef} className="relative">
      <input
        type="search"
        value={q}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Try: tracking, ableton, no sound, grounding…"
        className="w-full border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] font-mono outline-none transition focus:shadow-block-sm focus:translate-x-[-1px] focus:translate-y-[-1px]"
        onFocus={() => q && setOpen(true)}
      />
      {open && hits.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-96 overflow-auto border-[1.5px] border-rule bg-white shadow-block-sm">
          {hits.map((h) => (
            <a
              key={h.url}
              href={h.url}
              className="block border-b border-rule-soft px-3 py-2 last:border-0 hover:bg-soft"
            >
              <div className="text-[14px] font-semibold">{h.meta?.title || h.url}</div>
              <div
                className="text-[12px] text-ink-soft"
                dangerouslySetInnerHTML={{ __html: h.excerpt }}
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── JSON-index search (dev fallback) ─────────────────────────────────────
 *
 * Splits the query into terms ≥2 chars. For each indexed page, scores how
 * many terms appear in title (×3), summary (×2), body (×1). Returns top 8
 * by score. Excerpt is a ~140-char window around the first matched term,
 * with the term wrapped in <mark> for highlight.
 */
function searchJson(index: JsonEntry[], q: string): Hit[] {
  const terms = q
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length >= 2);
  if (terms.length === 0) return [];

  const scored: { entry: JsonEntry; score: number; firstMatch: number }[] = [];
  for (const entry of index) {
    const title = entry.title.toLowerCase();
    const summary = entry.summary.toLowerCase();
    const body = entry.body.toLowerCase();
    let score = 0;
    let firstMatch = -1;
    for (const t of terms) {
      if (title.includes(t)) score += 3;
      if (summary.includes(t)) score += 2;
      const bi = body.indexOf(t);
      if (bi !== -1) {
        score += 1;
        if (firstMatch === -1 || bi < firstMatch) firstMatch = bi;
      }
    }
    if (score > 0) scored.push({ entry, score, firstMatch });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 8).map(({ entry, firstMatch }) => ({
    url: entry.url,
    meta: { title: entry.title },
    excerpt: makeExcerpt(entry, terms, firstMatch),
  }));
}

function makeExcerpt(entry: JsonEntry, terms: string[], firstBodyMatch: number): string {
  // Prefer a body excerpt around the first body match; otherwise use summary.
  let src: string;
  let centre: number;
  if (firstBodyMatch !== -1) {
    src = entry.body;
    centre = firstBodyMatch;
  } else {
    src = entry.summary || entry.body;
    centre = 0;
  }
  const start = Math.max(0, centre - 60);
  const end = Math.min(src.length, centre + 100);
  let snippet = src.slice(start, end);
  if (start > 0) snippet = "…" + snippet;
  if (end < src.length) snippet = snippet + "…";
  // Highlight each matched term.
  for (const t of terms) {
    const re = new RegExp(`(${escapeRegExp(t)})`, "ig");
    snippet = snippet.replace(re, "<mark>$1</mark>");
  }
  return snippet;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ─── Search query analytics ───────────────────────────────────────────────
 *
 * Logs every search query the reader runs, debounced to avoid storing every
 * keystroke. No PII — just the query string, the hit count, and a timestamp.
 *
 * Stored client-side in localStorage under `playtronica.search.log` as an
 * array of {q, hits, ts}. Rolling window of 500 entries (older entries
 * dropped automatically), 90-day retention.
 *
 * The list is exposed at `window.__playtronicaSearchLog` for the monthly
 * export — see `scripts/extract-search-log.mjs` (run from the user's browser
 * once a month, or call the export function via DevTools / a bookmarklet).
 *
 * Use it to answer the question: which searches DON'T find anything? Those
 * are missing-topic signals — the content roadmap, written by readers.
 */
const LOG_KEY = "playtronica.search.log";
const LOG_MAX = 500;
const LOG_TTL_MS = 90 * 24 * 60 * 60 * 1000;

type LogEntry = { q: string; hits: number; ts: number };

let debounceTimer: ReturnType<typeof setTimeout> | undefined;
let lastLoggedQuery: string | undefined;

function logQuery(q: string, hits: number) {
  if (typeof window === "undefined") return;
  // Debounce — store the final query after 800ms of no-typing, not every keystroke.
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const trimmed = q.trim();
    if (!trimmed || trimmed.length < 2) return;
    if (lastLoggedQuery === trimmed) return; // avoid logging the same query twice in a row
    lastLoggedQuery = trimmed;
    try {
      const raw = localStorage.getItem(LOG_KEY);
      let entries: LogEntry[] = raw ? JSON.parse(raw) : [];
      const cutoff = Date.now() - LOG_TTL_MS;
      entries = entries.filter((e) => e.ts > cutoff);
      entries.push({ q: trimmed, hits, ts: Date.now() });
      if (entries.length > LOG_MAX) entries = entries.slice(-LOG_MAX);
      localStorage.setItem(LOG_KEY, JSON.stringify(entries));
      // Expose for export
      (window as any).__playtronicaSearchLog = entries;
    } catch {
      /* localStorage blocked — best-effort logging only */
    }
  }, 800);
}

// Bookmarklet-friendly export function. From the browser console:
//     copy(JSON.stringify(window.__playtronicaSearchExport()))
// or call from a scheduled task that opens the help center in Chrome.
if (typeof window !== "undefined") {
  (window as any).__playtronicaSearchExport = function () {
    try {
      const raw = localStorage.getItem(LOG_KEY);
      const entries: LogEntry[] = raw ? JSON.parse(raw) : [];
      const byQuery: Record<string, { count: number; zeroHits: number; lastTs: number }> = {};
      for (const e of entries) {
        const key = e.q.toLowerCase();
        if (!byQuery[key]) byQuery[key] = { count: 0, zeroHits: 0, lastTs: 0 };
        byQuery[key].count += 1;
        if (e.hits === 0) byQuery[key].zeroHits += 1;
        byQuery[key].lastTs = Math.max(byQuery[key].lastTs, e.ts);
      }
      const ranked = Object.entries(byQuery)
        .map(([q, v]) => ({ q, ...v }))
        .sort((a, b) => b.count - a.count);
      return {
        total: entries.length,
        unique: ranked.length,
        zeroHitQueries: ranked.filter((r) => r.zeroHits === r.count),
        topQueries: ranked.slice(0, 20),
      };
    } catch {
      return null;
    }
  };
}
