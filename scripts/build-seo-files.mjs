#!/usr/bin/env node
/**
 * Generate AI-search and SEO surface files at build time.
 *
 *   public/llms.txt        — proposed standard from llmstxt.org. Markdown index
 *                            of the site for LLM crawlers. Title + summary of
 *                            every page, grouped by section, with absolute URLs.
 *
 *   public/llms-full.txt   — every page's full body concatenated. One HTTP
 *                            request returns the entire knowledge base, so an
 *                            LLM tool that wants to ground a Playtronica
 *                            answer can fetch this once instead of crawling.
 *
 *   public/sitemap.xml     — standard XML sitemap for traditional crawlers
 *                            (Google, Bing). Every public page with lastmod.
 *
 * robots.txt is a hand-maintained static file in public/. It does NOT need
 * regeneration.
 *
 * Output is regenerated on every predev / prebuild via package.json scripts,
 * mirroring scripts/build-search-index.mjs.
 */

import {
  readdirSync,
  readFileSync,
  writeFileSync,
  statSync,
  mkdirSync,
} from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONTENT_DIR = join(ROOT, "content", "en");
const PUBLIC_DIR = join(ROOT, "public");
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://help.playtronica.com";

// Languages the site renders. English at root, the rest under a prefix.
// Keep in sync with lib/i18n.ts.
const LANG_CODES = ["en", "de", "es", "fr", "ja"];
const localizedPath = (lang, path) =>
  lang === "en" ? path : path === "/" ? `/${lang}/` : `/${lang}${path}`;

const SECTION_TITLES = {
  "getting-started": "Getting started",
  devices: "Devices",
  software: "Software",
  sound: "Sound & physics",
  troubleshooting: "Troubleshooting",
  orders: "Orders & support",
  professionals: "For professionals",
  site: "About this site",
};

function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) return { data: {}, content: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, content: raw };
  const fm = raw.slice(3, end).trim();
  const content = raw.slice(end + 4).trim();
  const data = {};
  for (const line of fm.split("\n")) {
    const m = line.match(/^([\w-]+):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    data[m[1]] = value;
  }
  return { data, content };
}

function stripMarkdownLight(md) {
  // Lighter strip than the search index: keeps headings + structure so the
  // body still reads naturally as plain text for LLM consumption.
  return md
    .replace(/<details>[\s\S]*?<summary>([\s\S]*?)<\/summary>/g, "\n\n### $1")
    .replace(/<\/details>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/^---[\s\S]*?^---/m, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      out.push(...walk(p));
    } else if (name.endsWith(".md")) {
      out.push(p);
    }
  }
  return out;
}

function isoDate(file) {
  return new Date(statSync(file).mtime).toISOString().split("T")[0];
}

function build() {
  const files = walk(CONTENT_DIR).sort();
  const pages = [];

  for (const file of files) {
    const raw = readFileSync(file, "utf8");
    const { data, content } = parseFrontmatter(raw);
    if (!data.slug || !data.section) continue;
    if (data.hide_from_nav === "true") continue;
    pages.push({
      file,
      title: data.title || data.slug,
      slug: data.slug,
      section: data.section,
      summary: data.summary || "",
      body: stripMarkdownLight(content),
      url: `${SITE_URL}/${data.section}/${data.slug}/`,
      lastmod: isoDate(file),
      orderNum: parseInt(data.order ?? "999", 10),
    });
  }

  pages.sort((a, b) => {
    if (a.section !== b.section) return a.section.localeCompare(b.section);
    return a.orderNum - b.orderNum;
  });

  mkdirSync(PUBLIC_DIR, { recursive: true });

  // ─── llms.txt ──────────────────────────────────────────────────────────────
  const llmsLines = [
    "# Playtronica Help Center",
    "",
    "> Official documentation for Playtronica MIDI devices — TouchMe, Playtron, Biotron, Orbita, Scales — and everything around them: connecting to DAWs, online synths, mobile apps, the grounding physics that makes capacitive sensing work.",
    "",
    "This file follows the llms.txt convention proposed at https://llmstxt.org/. The companion file llms-full.txt contains the full text of every page.",
    "",
    `Site: ${SITE_URL}`,
    `Repository: https://github.com/Playtronica/help`,
    "License: content under CC-BY-4.0, code under MIT.",
    "",
  ];

  const grouped = new Map();
  for (const p of pages) {
    if (!grouped.has(p.section)) grouped.set(p.section, []);
    grouped.get(p.section).push(p);
  }
  const sectionOrder = [
    "getting-started",
    "devices",
    "software",
    "sound",
    "troubleshooting",
    "orders",
    "professionals",
    "site",
  ];
  for (const section of sectionOrder) {
    const inSection = grouped.get(section);
    if (!inSection?.length) continue;
    llmsLines.push(`## ${SECTION_TITLES[section] || section}`, "");
    for (const p of inSection) {
      const summary = p.summary ? `: ${p.summary}` : "";
      llmsLines.push(`- [${p.title}](${p.url})${summary}`);
    }
    llmsLines.push("");
  }
  writeFileSync(join(PUBLIC_DIR, "llms.txt"), llmsLines.join("\n"));

  // ─── llms-full.txt ─────────────────────────────────────────────────────────
  const fullLines = [
    "# Playtronica Help Center — Full Content",
    "",
    `Site: ${SITE_URL}`,
    `Generated: ${new Date().toISOString()}`,
    "License: CC-BY-4.0 (content), MIT (code). Attribution: 'Playtronica Help Center'.",
    "",
    "Every public page in this help center is included below. Pages are grouped by section and ordered as they appear in the sidebar. Each page starts with a level-2 heading containing its title and absolute URL.",
    "",
    "================================================================================",
    "",
  ];
  for (const section of sectionOrder) {
    const inSection = grouped.get(section);
    if (!inSection?.length) continue;
    fullLines.push(`# ${SECTION_TITLES[section] || section}`, "");
    for (const p of inSection) {
      fullLines.push(`## ${p.title}`);
      fullLines.push(`URL: ${p.url}`);
      if (p.summary) fullLines.push(`Summary: ${p.summary}`);
      fullLines.push("");
      fullLines.push(p.body);
      fullLines.push(
        "",
        "--------------------------------------------------------------------------------",
        "",
      );
    }
  }
  writeFileSync(join(PUBLIC_DIR, "llms-full.txt"), fullLines.join("\n"));

  // ─── sitemap.xml ───────────────────────────────────────────────────────────
  // Multilingual sitemap: one <url> per language per page, each carrying the
  // full set of hreflang alternates so search engines treat the language
  // versions as translations of each other, not duplicate content.
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];

  function altLinks(canonical) {
    const links = LANG_CODES.map(
      (l) =>
        `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${localizedPath(l, canonical)}"/>`,
    );
    links.push(
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${canonical}"/>`,
    );
    return links.join("\n");
  }

  function urlBlock(canonical, lastmod, priority, changefreq) {
    const out = [];
    for (const l of LANG_CODES) {
      out.push(
        "  <url>",
        `    <loc>${SITE_URL}${localizedPath(l, canonical)}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : "",
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        altLinks(canonical),
        "  </url>",
      );
    }
    return out.filter(Boolean);
  }

  sitemap.push(...urlBlock("/", null, "1.0", "weekly"));
  for (const p of pages) {
    sitemap.push(...urlBlock(`/${p.section}/${p.slug}/`, p.lastmod, "0.8", "monthly"));
  }
  sitemap.push("</urlset>");
  writeFileSync(join(PUBLIC_DIR, "sitemap.xml"), sitemap.join("\n"));

  // ─── Report ────────────────────────────────────────────────────────────────
  const llmsKB = (readFileSync(join(PUBLIC_DIR, "llms.txt")).length / 1024).toFixed(1);
  const fullKB = (readFileSync(join(PUBLIC_DIR, "llms-full.txt")).length / 1024).toFixed(1);
  const mapKB = (readFileSync(join(PUBLIC_DIR, "sitemap.xml")).length / 1024).toFixed(1);
  console.log(
    `✓ AI-SEO files: ${pages.length} pages → llms.txt (${llmsKB} KB), llms-full.txt (${fullKB} KB), sitemap.xml (${mapKB} KB)`,
  );
}

build();
