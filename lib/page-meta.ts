import type { Metadata } from "next";
import { getPage, SECTION_TITLES } from "./content";
import { LANG_CODES, DEFAULT_LANG, localizedPath, type Lang } from "./i18n";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://help.playtronica.com";

/**
 * hreflang alternates for one canonical path. Tells search engines that the
 * five language URLs are translations of each other, not duplicate content.
 */
function languageAlternates(canonical: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const code of LANG_CODES) {
    langs[code] = `${SITE_URL}${localizedPath(code, canonical)}`;
  }
  langs["x-default"] = `${SITE_URL}${localizedPath(DEFAULT_LANG, canonical)}`;
  return langs;
}

function ogTwitter(title: string, description: string, url: string, lang: Lang) {
  return {
    openGraph: {
      title,
      description,
      url,
      siteName: "Playtronica Help Center",
      type: "article" as const,
      locale: lang,
      images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [`${SITE_URL}/og-default.png`],
    },
  };
}

// The root layout sets a title template "%s — Playtronica Help". So the page
// `title` field must be the BARE page name — the template adds the suffix.
// OpenGraph/Twitter titles are NOT templated, so they carry the full form.
const SUFFIX = "Playtronica Help";

/** Metadata for an article page. */
export function articleMetadata(lang: Lang, section: string, slug: string): Metadata {
  const p = getPage(section, slug, lang);
  if (!p) return {};
  const canonical = `/${section}/${slug}/`;
  const url = `${SITE_URL}${localizedPath(lang, canonical)}`;
  const description = p.summary || "";
  return {
    title: p.title,
    description,
    alternates: { canonical: url, languages: languageAlternates(canonical) },
    ...ogTwitter(`${p.title} — ${SUFFIX}`, description, url, lang),
  };
}

/** Metadata for a section index page. */
export function sectionMetadata(lang: Lang, section: string): Metadata {
  const sec = SECTION_TITLES[section];
  if (!sec) return {};
  const canonical = `/${section}/`;
  const url = `${SITE_URL}${localizedPath(lang, canonical)}`;
  const description = `Browse all ${sec.title.toLowerCase()} articles.`;
  return {
    title: sec.title,
    description,
    alternates: { canonical: url, languages: languageAlternates(canonical) },
    ...ogTwitter(`${sec.title} — ${SUFFIX}`, description, url, lang),
  };
}

/** Metadata for the troubleshooting hub. */
export function hubMetadata(lang: Lang): Metadata {
  const canonical = "/troubleshooting/hub/";
  const url = `${SITE_URL}${localizedPath(lang, canonical)}`;
  const description = "Interactive checklist that walks you through fixing your Playtronica device.";
  return {
    title: "Troubleshooting hub",
    description,
    alternates: { canonical: url, languages: languageAlternates(canonical) },
    ...ogTwitter(`Troubleshooting hub — ${SUFFIX}`, description, url, lang),
  };
}

/** Metadata for a language homepage. */
export function homeMetadata(lang: Lang): Metadata {
  const canonical = "/";
  const url = `${SITE_URL}${localizedPath(lang, canonical)}`;
  return {
    alternates: { canonical: url, languages: languageAlternates(canonical) },
  };
}
