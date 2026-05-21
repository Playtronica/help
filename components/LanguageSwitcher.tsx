"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  LANG_CODES,
  LANGUAGES,
  canonicalPath,
  langFromPath,
  localizedPath,
} from "@/lib/i18n";

/**
 * Language switcher. Reads the current path, strips the language prefix to get
 * the canonical page, and offers the same page in every language.
 */
export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const current = langFromPath(pathname);
  const canonical = canonicalPath(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Change language"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center gap-1 border-[1.5px] border-rule bg-white px-2 font-mono text-[12px] uppercase tracking-[0.06em] text-ink transition hover:bg-soft"
      >
        <span aria-hidden="true">🌐</span>
        <span>{current}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul className="absolute right-0 z-50 mt-1 w-40 border-[1.5px] border-ink bg-white shadow-block-sm">
          {LANG_CODES.map((code) => (
            <li key={code}>
              <a
                href={localizedPath(code, canonical)}
                lang={LANGUAGES[code].htmlLang}
                className={`flex items-center justify-between px-3 py-2 text-[14px] transition hover:bg-soft ${
                  code === current ? "font-bold text-ink" : "text-ink-soft"
                }`}
              >
                <span>{LANGUAGES[code].native}</span>
                <span className="font-mono text-[11px] uppercase text-ink-soft">{code}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
