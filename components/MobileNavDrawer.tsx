"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { SectionGroup } from "@/lib/content";

export function MobileNavDrawer({ nav }: { nav: SectionGroup[] }) {
  const [open, setOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center border-[1.5px] border-rule bg-white text-ink active:bg-soft md:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>

      <div
        className={`fixed inset-0 z-40 bg-ink/30 transition-opacity duration-150 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Help center navigation"
        className={`fixed inset-y-0 left-0 z-50 w-[86%] max-w-sm overflow-y-auto border-r-[1.5px] border-rule bg-bg transition-transform duration-150 ease-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b-[1.5px] border-rule px-4 py-3">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-mono text-[15px] font-bold tracking-tight text-ink"
          >
            ∿ playtronica<span className="text-ink-soft"> / help</span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center border-[1.5px] border-rule text-ink-soft hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <nav className="space-y-5 px-4 py-5">
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
                      onClick={() => setOpen(false)}
                      className="block min-h-[44px] border-l-2 border-transparent px-2 py-2 text-[15px] text-ink active:bg-soft hover:border-l-ink hover:bg-soft"
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

        <div className="border-t-[1.5px] border-rule px-4 py-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
          ∿ playtronica · made with care ·{" "}
          <a href="mailto:support@playtronica.com" className="text-accent normal-case">contact</a>
        </div>
      </aside>
    </>
  );
}
