"use client";
import { useEffect, useRef, useState } from "react";

type Hit = { url: string; meta: { title: string }; excerpt: string };

declare global { interface Window { pagefind: any } }

export function SearchBar() {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const [pagefindReady, setPagefindReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.pagefind) { setPagefindReady(true); return; }
    // Pagefind only exists after `next build`. In dev, /_pagefind/ is a 404
    // and we fall back to filtering the in-DOM sidebar links.
    fetch("/_pagefind/pagefind.js").then((r) => {
      if (!r.ok) return;
      // Use a dynamic import the bundler will not try to resolve.
      const url = "/_pagefind/pagefind.js";
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      import(/* webpackIgnore: true */ url).then(async (m: any) => {
        window.pagefind = m;
        if (m.options) await m.options({ ranking: { termFrequency: 0.4 } });
        setPagefindReady(true);
      }).catch(() => {});
    }).catch(() => {});
  }, []);

  async function onChange(v: string) {
    setQ(v);
    setOpen(true);
    if (!v || v.length < 2) { setHits([]); return; }
    if (window.pagefind) {
      try {
        const res = await window.pagefind.search(v);
        const top = (await Promise.all((res.results || []).slice(0, 8).map((r: any) => r.data()))) as Hit[];
        setHits(top);
        return;
      } catch { /* fall through to DOM fallback */ }
    }
    // Dev-mode fallback: match sidebar link texts.
    const q = v.toLowerCase();
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("aside a"));
    const matches = links
      .filter((a) => (a.textContent || "").toLowerCase().includes(q))
      .slice(0, 8)
      .map((a) => ({ url: a.getAttribute("href") || "#", meta: { title: a.textContent?.trim() || "" }, excerpt: "" }));
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
        placeholder="Try: tracking, ableton, no sound…"
        className="w-full border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] font-mono outline-none transition focus:shadow-block-sm focus:translate-x-[-1px] focus:translate-y-[-1px]"
        onFocus={() => q && setOpen(true)}
      />
      {open && hits.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-96 overflow-auto border-[1.5px] border-rule bg-white shadow-block-sm">
          {hits.map((h) => (
            <a key={h.url} href={h.url} className="block border-b border-rule-soft px-3 py-2 last:border-0 hover:bg-soft">
              <div className="text-[14px] font-semibold">{h.meta?.title || h.url}</div>
              <div className="text-[12px] text-ink-soft" dangerouslySetInnerHTML={{ __html: h.excerpt }} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
