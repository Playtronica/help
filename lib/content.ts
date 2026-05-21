import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { DEFAULT_LANG, type Lang } from "./i18n";

export type Frontmatter = {
  title: string;
  slug: string;
  section: string;
  section_title?: string;
  summary?: string;
  segment?: string | string[];
  deflection_target?: number;
  order?: number;
  status?: "draft" | "ready-for-build" | "live";
  emoji?: string;
  /** Hide from main sidebar. Page is still routable + searchable + linkable. */
  hide_from_nav?: boolean;
  /** Optional parent page slug — used to nest "advanced" or deep-dive pages under a parent device page. */
  parent?: string;
  /** i18n metadata — present only on translated (non-English) files. See docs/I18N.md. */
  translated_from?: string;
  source_sha?: string;
  translated_at?: string;
  mt?: boolean;
};

export type Page = Frontmatter & {
  filePath: string;
  html: string;
  /** The language this page was rendered in. */
  lang: Lang;
  /** True when this language had no translation and English was served instead. */
  isFallback: boolean;
};

/** Absolute path to the content root for a language. */
function contentRoot(lang: Lang): string {
  return path.join(process.cwd(), "content", lang);
}

function readMarkdownFile(filePath: string, lang: Lang, isFallback: boolean): Page {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const rawHtml = remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .processSync(content)
    .toString();
  let html = postProcessHtml(rawHtml);
  if (lang !== DEFAULT_LANG) html = localizeInternalLinks(html, lang);
  const fm = data as Frontmatter;
  return { ...fm, filePath, html, lang, isFallback };
}

/**
 * Rewrite internal links inside rendered article HTML so they keep the reader
 * in their language. `href="/devices/biotron/"` becomes `href="/de/devices/..."`.
 * External links (https:, mailto:), in-page anchors (#...), and links that
 * already carry a language prefix are left alone.
 */
function localizeInternalLinks(html: string, lang: Lang): string {
  return html.replace(/href="(\/[^"]*)"/g, (match, href: string) => {
    if (href.startsWith("//")) return match; // protocol-relative — external
    if (/^\/(de|es|fr|ja)(\/|$)/.test(href)) return match; // already prefixed
    return `href="/${lang}${href}"`;
  });
}

// Lightweight HTML post-processor:
//  1) Wrap every <table> in <div class="table-wrap"> so horizontal scroll lives
//     inside the table only, not the whole page.
//  2) Tag <blockquote> with a callout class based on the first emoji.
function postProcessHtml(html: string): string {
  // 1) Table wrap
  html = html.replace(
    /<table\b([\s\S]*?)<\/table>/g,
    (match) => `<div class="table-wrap">${match}</div>`,
  );

  // 2) Blockquote callout class from leading emoji
  html = html.replace(
    /<blockquote>([\s\S]*?)<\/blockquote>/g,
    (match, inner: string) => {
      const trimmed = inner.replace(/^[\s\n]*<p>/, "");
      const firstChar = (trimmed.match(/^([^\s<]+)/) || [, ""])[1];
      let cls = "";
      if (/[⚠️🛑🔴❌]/.test(firstChar)) cls = "callout-warn";
      else if (/[💡ℹ️📘🌀]/.test(firstChar)) cls = "callout-info";
      else if (/[🛠️🧬⭐✨🎁🎵🤝]/.test(firstChar)) cls = "callout-tip";
      else if (/[✅🟢]/.test(firstChar)) cls = "callout-success";
      return cls ? `<blockquote class="${cls}">${inner}</blockquote>` : match;
    },
  );

  // 3) YouTube shortcode: {{ youtube: VIDEOID title="optional" }}
  //    becomes a marker the article page replaces with the <LiteYoutube /> component.
  html = html.replace(
    /\{\{\s*youtube:\s*([\w\-]+)(?:\s+title="([^"]+)")?\s*\}\}/g,
    (_m, id: string, title?: string) =>
      `<div data-lite-youtube="${id}" data-lite-youtube-title="${(title || "").replace(/"/g, "&quot;")}"></div>`,
  );

  return html;
}

/**
 * Load every page in a language. The canonical page list always comes from the
 * English tree — so a half-translated language still exposes every page, with
 * untranslated ones falling back to English. This guarantees the site never
 * 404s on a missing translation.
 */
export function getAllPages(lang: Lang = DEFAULT_LANG): Page[] {
  const out: Page[] = [];
  const enRoot = contentRoot(DEFAULT_LANG);

  function walk(dir: string) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith(".md") && !entry.name.startsWith("_")) {
        const rel = path.relative(enRoot, full);
        try {
          out.push(loadByRelPath(rel, lang));
        } catch (e) {
          console.warn("skip", full, e);
        }
      }
    }
  }
  walk(enRoot);
  return out.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

/** Load one page by its path relative to the content root, with English fallback. */
function loadByRelPath(rel: string, lang: Lang): Page {
  if (lang !== DEFAULT_LANG) {
    const translated = path.join(contentRoot(lang), rel);
    if (fs.existsSync(translated)) {
      return readMarkdownFile(translated, lang, false);
    }
  }
  // English, or fallback for an untranslated page.
  const en = path.join(contentRoot(DEFAULT_LANG), rel);
  return readMarkdownFile(en, lang, lang !== DEFAULT_LANG);
}

/** Load a single page by section + slug, in the requested language (English fallback). */
export function getPage(
  section: string,
  slug: string,
  lang: Lang = DEFAULT_LANG,
): Page | null {
  const rel = path.join(section, `${slug}.md`);
  const enFile = path.join(contentRoot(DEFAULT_LANG), rel);
  if (!fs.existsSync(enFile)) return null;
  return loadByRelPath(rel, lang);
}

export type SectionGroup = {
  section: string;
  section_title: string;
  emoji?: string;
  pages: Page[];
};

export const SECTION_TITLES: Record<string, { title: string; emoji?: string; order: number }> = {
  "getting-started": { title: "Getting Started", emoji: "🚀", order: 1 },
  devices: { title: "Your Device", emoji: "🎛️", order: 2 },
  software: { title: "Sound & Software", emoji: "🎵", order: 3 },
  troubleshooting: { title: "Not Working?", emoji: "🔧", order: 4 },
  orders: { title: "Orders & Support", emoji: "📦", order: 5 },
  professionals: { title: "For Professionals", emoji: "🎨", order: 6 },
  sound: { title: "Sound & Materials", emoji: "🌿", order: 7 },
  site: { title: "Contact & Info", emoji: "💬", order: 8 },
};

export function groupedNav(lang: Lang = DEFAULT_LANG): SectionGroup[] {
  const pages = getAllPages(lang);
  const groups: Record<string, SectionGroup> = {};
  for (const p of pages) {
    if (p.hide_from_nav) continue;
    const sec = SECTION_TITLES[p.section] || { title: p.section, order: 99 };
    if (!groups[p.section]) {
      groups[p.section] = {
        section: p.section,
        section_title: sec.title,
        emoji: sec.emoji,
        pages: [],
      };
    }
    groups[p.section].pages.push(p);
  }
  return Object.values(groups).sort(
    (a, b) => (SECTION_TITLES[a.section]?.order ?? 99) - (SECTION_TITLES[b.section]?.order ?? 99),
  );
}

/** Pages that belong to a given parent slug (e.g. all "advanced" pages of /devices/biotron). */
export function getChildren(parentSlug: string, lang: Lang = DEFAULT_LANG): Page[] {
  return getAllPages(lang).filter((p) => p.parent === parentSlug);
}

// ─── Slim navigation ─────────────────────────────────────────────────────────
// The sidebar and mobile drawer are client components. They must NOT receive
// the full Page objects — those carry each page's entire rendered `html`, which
// would serialise the whole site's content into every page's payload, five
// times over (once per language). SlimNav carries only what the nav renders.

export type SlimNavItem = {
  section: string;
  slug: string;
  title: string;
  emoji?: string;
};

export type SlimNavGroup = {
  section: string;
  section_title: string;
  emoji?: string;
  pages: SlimNavItem[];
};

/** Navigation stripped to the fields the sidebar/drawer actually render. */
export function slimNav(lang: Lang = DEFAULT_LANG): SlimNavGroup[] {
  return groupedNav(lang).map((g) => ({
    section: g.section,
    section_title: g.section_title,
    emoji: g.emoji,
    pages: g.pages.map((p) => ({
      section: p.section,
      slug: p.slug,
      title: p.title,
      emoji: p.emoji,
    })),
  }));
}
