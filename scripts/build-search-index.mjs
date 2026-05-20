#!/usr/bin/env node
/**
 * Build a static search index at public/search-index.json.
 *
 * The SearchBar uses this as a fallback when Pagefind is not available — which
 * is always the case in `npm run dev` because Pagefind only runs at build
 * time. With this index, dev-mode search works on title + summary + body text,
 * not just titles. In production Pagefind is still preferred when present.
 *
 * Output shape:
 *   [{ url, title, summary, body, section, emoji }, ...]
 *
 * Runs on `predev` and `prebuild` via package.json scripts.
 */

import { readdirSync, readFileSync, writeFileSync, statSync, mkdirSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONTENT_DIR = join(ROOT, "content", "en");
const OUTPUT = join(ROOT, "public", "search-index.json");

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

function stripMarkdown(md) {
  return md
    // strip HTML blocks
    .replace(/<[^>]+>/g, " ")
    // strip code fences
    .replace(/```[\s\S]*?```/g, " ")
    // strip inline code
    .replace(/`[^`]+`/g, " ")
    // images
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    // links — keep the link text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // headings markers
    .replace(/^#{1,6}\s+/gm, "")
    // bold / italic markers
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")
    // blockquotes
    .replace(/^>\s+/gm, "")
    // list markers
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    // tables — drop pipe characters
    .replace(/\|/g, " ")
    // collapse whitespace
    .replace(/\s+/g, " ")
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

function build() {
  const files = walk(CONTENT_DIR).sort();
  const index = [];

  for (const file of files) {
    const raw = readFileSync(file, "utf8");
    const { data, content } = parseFrontmatter(raw);
    if (!data.slug || !data.section) continue;
    // Hide pages flagged hide_from_nav from search — they remain accessible
    // via deep link but should not surface in search results.
    if (data.hide_from_nav === "true") continue;

    const rel = relative(CONTENT_DIR, file);
    const url = `/${data.section}/${data.slug}/`;
    const body = stripMarkdown(content);

    index.push({
      url,
      title: data.title || data.slug,
      summary: data.summary || "",
      body: body.slice(0, 4000), // cap per-page body to keep the index lean
      section: data.section,
      emoji: data.emoji || "",
    });
  }

  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, JSON.stringify(index));

  const bytes = readFileSync(OUTPUT).length;
  console.log(`✓ search index: ${index.length} pages, ${(bytes / 1024).toFixed(1)} KB → ${relative(ROOT, OUTPUT)}`);
}

build();
