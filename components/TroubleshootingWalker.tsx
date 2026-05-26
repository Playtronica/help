"use client";
import { useState } from "react";
import Link from "next/link";

type Link = { label: string; href: string };
type Leaf = { id: string; title: string; subtitle?: string; fix?: string[]; links?: Link[]; stuck?: string };
type Question = {
  id: string;
  title: string;
  subtitle?: string;
  yes?: Question | Leaf;
  no?: Question | Leaf;
  branches?: Branch[];
};
type Branch = { id: string; label: string; emoji?: string; node: Question | Leaf };
type Root = { id: string; title: string; subtitle?: string; branches: Branch[] };

function isLeaf(n: any): n is Leaf {
  return n && (n.fix || (!n.yes && !n.no && !n.branches));
}

type Crumb = { label: string; emoji?: string };

export function TroubleshootingWalker({ tree }: { tree: Root }) {
  const [path, setPath] = useState<(Question | Leaf | Root)[]>([tree]);
  const [crumbs, setCrumbs] = useState<Crumb[]>([]);
  const current = path[path.length - 1];

  function go(next: Question | Leaf, crumb: Crumb) {
    setPath([...path, next]);
    setCrumbs([...crumbs, crumb]);
    queueMicrotask(() => {
      if (typeof window !== "undefined") window.scrollTo({ top: window.scrollY - 40, behavior: "smooth" });
    });
  }

  function back() {
    if (path.length <= 1) return;
    setPath(path.slice(0, -1));
    setCrumbs(crumbs.slice(0, -1));
  }

  function reset() {
    setPath([tree]);
    setCrumbs([]);
  }

  return (
    <div className="my-6 border-[1.5px] border-rule bg-white p-5">
      <header className="mb-3 flex items-center justify-between gap-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          / interactive troubleshooting
        </div>
        <div className="flex gap-2">
          {path.length > 1 && (
            <button onClick={back} className="min-h-[44px] border-[1.5px] border-rule px-2 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-soft transition hover:bg-soft hover:text-ink">
              ← Back
            </button>
          )}
          {path.length > 1 && (
            <button onClick={reset} className="min-h-[44px] border-[1.5px] border-rule px-2 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-soft transition hover:bg-soft hover:text-ink">
              Start over
            </button>
          )}
        </div>
      </header>

      {crumbs.length > 0 && (
        <ol className="mb-3 flex flex-wrap gap-1 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-soft">
          {crumbs.map((c, i) => (
            <li key={i} className="border border-rule-soft bg-soft px-2 py-0.5">
              {c.emoji && <span className="mr-1">{c.emoji}</span>}
              {c.label}
            </li>
          ))}
        </ol>
      )}

      <h3 className="mb-1 text-lg font-bold">{(current as any).title}</h3>
      {(current as any).subtitle && (
        <p className="mb-3 text-[14px] text-ink-soft">{(current as any).subtitle}</p>
      )}

      {/* Branch picker */}
      {("branches" in current && (current as any).branches) && (
        <div className="grid gap-2 md:grid-cols-2">
          {((current as any).branches as Branch[]).map((b) => (
            <button
              key={b.id}
              onClick={() => go(b.node, { label: b.label, emoji: b.emoji })}
              className="min-h-[48px] border-[1.5px] border-rule bg-white px-3 py-3 text-left text-[14px] transition hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-block-sm"
            >
              <span className="mr-2 text-base">{b.emoji}</span>
              <span className="font-medium">{b.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Yes/No question */}
      {("yes" in current && (current as any).yes) && (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => go((current as any).yes, { label: `${(current as any).title} → Yes` })}
            className="min-h-[44px] border-[1.5px] border-ink bg-ink px-5 py-2 text-[14px] font-semibold text-bg transition hover:bg-accent hover:border-accent"
          >
            Yes
          </button>
          <button
            onClick={() => go((current as any).no, { label: `${(current as any).title} → No` })}
            className="min-h-[44px] border-[1.5px] border-rule bg-white px-5 py-2 text-[14px] font-semibold transition hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-block-sm"
          >
            No
          </button>
        </div>
      )}

      {/* Leaf — fix */}
      {isLeaf(current) && (current as Leaf).fix && (
        <div>
          <ul className="ml-4 list-disc space-y-1.5 text-sm">
            {(current as Leaf).fix!.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>

          {(current as Leaf).links && (current as Leaf).links!.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {(current as Leaf).links!.map((l, i) => (
                <Link key={i} href={l.href} className="border-[1.5px] border-rule bg-white px-3 py-1 text-accent transition hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-block-sm">
                  {l.label} →
                </Link>
              ))}
            </div>
          )}

          {(current as Leaf).stuck && (
            <div className="mt-5 rounded-lg bg-soft p-3 text-sm">
              <strong className="font-semibold">Still stuck?</strong>{" "}
              {(current as Leaf).stuck}{" "}
              <a
                href="mailto:support@playtronica.com?subject=Troubleshooting%20—%20still%20stuck"
                className="underline"
              >
                Email support@playtronica.com
              </a>
              .
            </div>
          )}

          {!((current as Leaf).stuck) && (
            <div className="mt-5 rounded-lg bg-soft p-3 text-sm">
              <strong className="font-semibold">Still stuck?</strong>{" "}
              <a
                href="mailto:support@playtronica.com?subject=Troubleshooting%20—%20still%20stuck"
                className="underline"
              >
                Email support@playtronica.com
              </a>{" "}
              with a 30-second video of your setup.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
