import Link from "next/link";
import type { SectionGroup } from "@/lib/content";

export function Sidebar({ nav }: { nav: SectionGroup[] }) {
  return (
    <aside className="hidden w-56 shrink-0 md:block">
      {/* sticky + max-height + overflow makes the nav a column that scrolls
          independently of the article — long device lists no longer hang
          below the fold. The pr-1 reserves space for the scrollbar so links
          do not jiggle when it appears. */}
      <nav className="sticky top-[72px] max-h-[calc(100vh-88px)] space-y-5 overflow-y-auto pr-1">
        {nav.map((g, i) => (
          <div key={g.section}>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
                / {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-ink">
                {g.section_title}
              </span>
            </div>
            <ul className="space-y-0">
              {g.pages.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${p.section}/${p.slug}/`}
                    className="block border-l-2 border-transparent px-2 py-1.5 text-[13px] text-ink-soft transition hover:border-l-ink hover:bg-soft hover:text-ink"
                  >
                    {p.emoji ? <span className="mr-1">{p.emoji}</span> : null}
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
