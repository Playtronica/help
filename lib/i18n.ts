/**
 * Language registry for the multilingual help center.
 *
 * English is the source of truth and is served at the root (`/devices/...`).
 * Every other language is served under a prefix (`/de/devices/...`).
 *
 * See docs/I18N.md for the full architecture.
 */

export const DEFAULT_LANG = "en" as const;

/** Every language code the site can render, English first. */
export const LANG_CODES = ["en", "de", "es", "fr", "ja"] as const;

export type Lang = (typeof LANG_CODES)[number];

/** Language codes other than English — the ones served under a URL prefix. */
export const TARGET_LANGS: Lang[] = ["de", "es", "fr", "ja"];

/** Display metadata for each language. `native` is what the switcher shows. */
export const LANGUAGES: Record<Lang, { native: string; english: string; htmlLang: string }> = {
  en: { native: "English", english: "English", htmlLang: "en" },
  de: { native: "Deutsch", english: "German", htmlLang: "de" },
  es: { native: "Español", english: "Spanish", htmlLang: "es" },
  fr: { native: "Français", english: "French", htmlLang: "fr" },
  ja: { native: "日本語", english: "Japanese", htmlLang: "ja" },
};

export function isLang(value: string): value is Lang {
  return (LANG_CODES as readonly string[]).includes(value);
}

/**
 * Build an in-site path for a given language.
 *   localizedPath("en", "/devices/biotron/")  → "/devices/biotron/"
 *   localizedPath("de", "/devices/biotron/")  → "/de/devices/biotron/"
 *   localizedPath("de", "/")                  → "/de/"
 *
 * The input path is always the canonical English path (no language prefix).
 */
export function localizedPath(lang: Lang, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANG) return clean;
  if (clean === "/") return `/${lang}/`;
  return `/${lang}${clean}`;
}

/**
 * Strip a language prefix off a path, returning the canonical English path.
 *   canonicalPath("/de/devices/biotron/")  → "/devices/biotron/"
 *   canonicalPath("/devices/biotron/")     → "/devices/biotron/"
 */
export function canonicalPath(path: string): string {
  const m = path.match(/^\/([a-z]{2})(\/.*)?$/);
  if (m && isLang(m[1]) && m[1] !== DEFAULT_LANG) {
    return m[2] || "/";
  }
  return path;
}

/**
 * Detect the current language from a pathname.
 *   langFromPath("/de/devices/biotron/")  → "de"
 *   langFromPath("/devices/biotron/")     → "en"
 */
export function langFromPath(path: string): Lang {
  const m = path.match(/^\/([a-z]{2})(\/|$)/);
  if (m && isLang(m[1]) && m[1] !== DEFAULT_LANG) return m[1];
  return DEFAULT_LANG;
}
