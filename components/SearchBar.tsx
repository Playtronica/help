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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
        return;
      } catch {
        /* fall through to JSON / DOM fallback */
      }
    }
    if (jsonIndex) {
      setHits(searchJson(jsonIndex, v));
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
