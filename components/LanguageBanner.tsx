"use client";

/**
 * LanguageBanner — soft, non-intrusive offer to switch languages when the
 * reader's browser language doesn't match the current URL.
 *
 * Why a banner and not auto-redirect:
 *   Google explicitly warns that geo-IP or Accept-Language auto-redirects
 *   confuse the crawler — Googlebot crawls from the US, so a JA reader and
 *   Googlebot can both be on /devices/biotron and we cannot show one a
 *   different page than the other. A banner is the recommended pattern
 *   (https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).
 *
 * Behaviour:
 *   - Read navigator.languages on mount.
 *   - If any preferred language is one of our LOCALES and is NOT the current
 *     URL's language, show a small banner offering the switch.
 *   - "Switch" navigates to the language-prefixed equivalent of the current
 *     URL and stores the preference in localStorage so we don't ask again.
 *   - "Stay" also stores the preference and dismisses the banner forever.
 *
 * The banner is rendered server-side as null and hydrated to its real state on
 * the client, so SSR/SSG output is identical for every reader — no FOUC.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LANG_CODES, LANGUAGES, langFromPath, localizedPath, type Lang } from "@/lib/i18n";

const STORAGE_KEY = "playtronica.lang.preference";

// Human-readable invitation per language. Kept short — the banner is a nudge,
// not an interruption.
const INVITES: Record<Lang, string> = {
  en: "Read this page in English",
  de: "Diese Seite auf Deutsch lesen",
  es: "Leer esta página en español",
  fr: "Lire cette page en français",
  ja: "このページを日本語で読む",
};

const STAY: Record<Lang, string> = {
  en: "No thanks",
  de: "Nein danke",
  es: "No, gracias",
  fr: "Non merci",
  ja: "そのまま",
};

function detectPreferredOtherLang(currentLang: Lang): Lang | null {
  if (typeof navigator === "undefined") return null;
  const langs = (navigator.languages && navigator.languages.length > 0)
    ? Array.from(navigator.languages)
    : navigator.language
    ? [navigator.language]
    : [];

  for (const raw of langs) {
    const code = raw.toLowerCase().split("-")[0];
    if ((LANG_CODES as readonly string[]).includes(code) && code !== currentLang) {
      return code as Lang;
    }
  }
  return null;
}

export function LanguageBanner() {
  const pathname = usePathname() || "/";
  const currentLang = langFromPath(pathname);
  const [offerLang, setOfferLang] = useState<Lang | null>(null);

  useEffect(() => {
    // Respect a prior choice — once the reader has answered for this session,
    // never ask again across this device.
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return;
    } catch {
      /* localStorage blocked — fall through and offer once */
    }
    const candidate = detectPreferredOtherLang(currentLang);
    if (candidate) setOfferLang(candidate);
  }, [currentLang]);

  if (!offerLang) return null;

  const targetPath = localizedPath(offerLang, pathname.replace(/^\/(de|es|fr|ja)/, "") || "/");

  function remember(choice: "switch" | "stay") {
    try {
      localStorage.setItem(STORAGE_KEY, choice === "switch" ? offerLang! : currentLang);
    } catch {
      /* localStorage blocked — best-effort dismiss */
    }
    setOfferLang(null);
  }

  return (
    <div
      role="region"
      aria-label="Language suggestion"
      className="fixed inset-x-0 top-[60px] z-30 flex justify-center px-3 md:top-[64px]"
    >
      <div className="flex max-w-2xl items-center gap-3 border-[1.5px] border-ink bg-white px-4 py-2 shadow-block-sm">
        <span aria-hidden="true" className="text-lg">🌐</span>
        <p className="flex-1 text-[13px] leading-snug text-ink">
          <strong className="font-semibold">{INVITES[offerLang]}</strong>
          <span className="ml-1 text-ink-soft">— {LANGUAGES[offerLang].native}</span>
        </p>
        <a
          href={targetPath}
          onClick={() => remember("switch")}
          className="inline-flex min-h-[34px] items-center border-[1.5px] border-ink bg-ink px-3 py-1 text-[12px] font-semibold text-bg no-underline transition hover:border-accent hover:bg-accent"
        >
          {LANGUAGES[offerLang].native}
        </a>
        <button
          type="button"
          onClick={() => remember("stay")}
          aria-label={STAY[offerLang]}
          className="min-h-[34px] border-[1.5px] border-rule bg-white px-3 py-1 text-[12px] text-ink-soft hover:text-ink"
        >
          {STAY[currentLang]}
        </button>
      </div>
    </div>
  );
}
