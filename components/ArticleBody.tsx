"use client";
import { useMemo } from "react";
import { LiteYoutube } from "./LiteYoutube";

/**
 * Renders the postprocessed article HTML, then swaps any
 * <div data-lite-youtube="ID" data-lite-youtube-title="..."> placeholders
 * with the real LiteYoutube React component.
 *
 * Splits HTML on YouTube placeholders so the rest stays as inert HTML —
 * no client-side reflow cost beyond the simple split + render.
 */
export function ArticleBody({ html }: { html: string }) {
  const parts = useMemo(() => splitOnYoutube(html), [html]);
  return (
    <>
      {parts.map((p, i) =>
        p.type === "html" ? (
          <div key={i} className="prose-pl max-w-reading" dangerouslySetInnerHTML={{ __html: p.value }} />
        ) : (
          <LiteYoutube key={i} id={p.id} title={p.title} />
        ),
      )}
    </>
  );
}

type Part = { type: "html"; value: string } | { type: "yt"; id: string; title: string };

function splitOnYoutube(html: string): Part[] {
  const re = /<div data-lite-youtube="([\w\-]+)"(?: data-lite-youtube-title="([^"]*)")?[^>]*><\/div>/g;
  const out: Part[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    if (m.index > last) out.push({ type: "html", value: html.slice(last, m.index) });
    out.push({ type: "yt", id: m[1], title: m[2] || "Watch on YouTube" });
    last = m.index + m[0].length;
  }
  if (last < html.length) out.push({ type: "html", value: html.slice(last) });
  return out.length ? out : [{ type: "html", value: html }];
}
