import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

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
};

export type Page = Frontmatter & {
  filePath: string;
  html: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content", "en");

function readMarkdownFile(filePath: string): Page {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const rawHtml = remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .processSync(content)
    .toString();
  const html = postProcessHtml(rawHtml);
  const fm = data as Frontmatter;
  return { ...fm, filePath, html };
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

export function getAllPages(): Page[] {
  const out: Page[] = [];
  function walk(dir: string) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".md") && !entry.name.startsWith("_")) {
        try { out.push(readMarkdownFile(full)); }
        catch (e) { console.warn("skip", full, e); }
      }
    }
  }
  walk(CONTENT_ROOT);
  return out.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getPage(section: string, slug: string): Page | null {
  const file = path.join(CONTENT_ROOT, section, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return readMarkdownFile(file);
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

export function groupedNav(): SectionGroup[] {
  const pages = getAllPages();
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
export function getChildren(parentSlug: string): Page[] {
  return getAllPages().filter((p) => p.parent === parentSlug);
}
