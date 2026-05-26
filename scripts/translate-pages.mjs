#!/usr/bin/env node
/**
 * Translate help-center pages with the Claude API.
 *
 * English (content/en/) is the source of truth. This script finds every page
 * whose translation is missing or stale (the English source changed since the
 * translation was made) and translates it into each target language.
 *
 * Staleness is tracked by `source_sha` in the translated file's frontmatter —
 * see docs/I18N.md and scripts/check-translation-freshness.py.
 *
 * Requires the ANTHROPIC_API_KEY environment variable.
 *
 * Usage:
 *   node scripts/translate-pages.mjs                 # all missing + stale, all langs
 *   node scripts/translate-pages.mjs --lang de       # one language
 *   node scripts/translate-pages.mjs --limit 5       # cap the number of pages
 *   node scripts/translate-pages.mjs --all           # retranslate everything
 *
 * Environment:
 *   ANTHROPIC_API_KEY   required
 *   TRANSLATE_MODEL     optional, default "claude-sonnet-4-6"
 */

import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONTENT = join(ROOT, "content");
const EN = join(CONTENT, "en");

const TARGET_LANGS = ["de", "es", "fr", "ja"];
const LANG_NAMES = {
  de: "German",
  es: "Spanish",
  fr: "French",
  ja: "Japanese",
};

const MODEL = process.env.TRANSLATE_MODEL || "claude-sonnet-4-6";
const API_KEY = process.env.ANTHROPIC_API_KEY;

// ─── CLI args ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const onlyLang = args.includes("--lang") ? args[args.indexOf("--lang") + 1] : null;
const retranslateAll = args.includes("--all");
const limit = args.includes("--limit")
  ? parseInt(args[args.indexOf("--limit") + 1], 10)
  : Infinity;
const langs = onlyLang ? [onlyLang] : TARGET_LANGS;

// ─── Frontmatter helpers ─────────────────────────────────────────────────────
function splitFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { fm: {}, fmRaw: "", body: text };
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (kv) {
      let v = kv[2].trim();
      if (v.length >= 2 && v[0] === v[v.length - 1] && (v[0] === '"' || v[0] === "'")) {
        v = v.slice(1, -1);
      }
      fm[kv[1]] = v;
    }
  }
  return { fm, fmRaw: m[1], body: m[2] };
}

function bodySha(text) {
  const { body } = splitFrontmatter(text);
  return createHash("sha256").update(body.trim()).digest("hex").slice(0, 8);
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".md") && !name.startsWith("_")) out.push(p);
  }
  return out;
}

// ─── Translation prompt ──────────────────────────────────────────────────────
function buildPrompt(lang, fm, body) {
  const langName = LANG_NAMES[lang];
  return `You are translating one page of the Playtronica help center from English into ${langName}.

Playtronica makes MIDI devices (TouchMe, Playtron, Biotron, Orbita, Scales) that turn objects into music.

RULES — follow every one:
- Translate naturally into ${langName} as a native technical writer would. Do not translate word-for-word.
- Keep the voice: short declarative sentences, active voice, imperative mood for instructions, no idioms, no contractions in warnings, no marketing adjectives.
- NEVER translate: product names (TouchMe, Playtron, Biotron, Orbita, Scales, Playtronica), MIDI, USB-C, DAW, Brave, Chrome, Ableton, Logic, GarageBand, FL Studio, Koala.
- NEVER change: Markdown structure (headings, lists, tables, blockquotes, the leading emoji of callouts like > WARNING), link URLs, code blocks, inline code, file paths, and {{ youtube: ... }} shortcodes.
- Keep internal links exactly as written (for example /devices/biotron/) — do not add a language prefix.
- Translate link TEXT but never link TARGETS.

Return EXACTLY this structure and nothing else:

TITLE: <the translated page title>
SUMMARY: <the translated one-line summary>
---BODY---
<the full translated Markdown body>

English title: ${fm.title || ""}
English summary: ${fm.summary || ""}

English body:
${body}`;
}

// ─── Claude API ──────────────────────────────────────────────────────────────
async function callClaude(prompt, attempt = 1) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      // 16k tokens — covers any page in the help center even when the target
      // language expands (German, Japanese full-width). 8k was tight on big
      // pages like biotron.md.
      max_tokens: 16384,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    // Retry once on 429 (rate limit) or 5xx with a short backoff. Sequential
    // calls of 168 pages × 4 langs occasionally trip the limiter even with
    // good keys.
    if ((res.status === 429 || res.status >= 500) && attempt < 3) {
      const waitMs = 2000 * attempt;
      console.log(`    retry after ${waitMs}ms (status ${res.status})`);
      await new Promise((r) => setTimeout(r, waitMs));
      return callClaude(prompt, attempt + 1);
    }
    throw new Error(`API ${res.status}: ${text.slice(0, 300)}`);
  }
  const data = await res.json();
  return data.content.map((b) => b.text || "").join("");
}

function parseResponse(out) {
  const titleM = out.match(/^TITLE:\s*(.+)$/m);
  const summaryM = out.match(/^SUMMARY:\s*(.+)$/m);
  const bodyM = out.match(/---BODY---\n([\s\S]*)$/);
  if (!bodyM) throw new Error("response missing ---BODY--- marker");
  return {
    title: titleM ? titleM[1].trim() : "",
    summary: summaryM ? summaryM[1].trim() : "",
    body: bodyM[1].trim(),
  };
}

// ─── Build the translated file ───────────────────────────────────────────────
function buildTranslatedFile(enFm, translated, sourceSha, lang) {
  // Copy structural fields verbatim; use translated title/summary; add i18n meta.
  const today = new Date().toISOString().split("T")[0];
  const esc = (s) => `"${String(s).replace(/"/g, '\\"')}"`;
  const lines = ["---"];
  lines.push(`title: ${esc(translated.title || enFm.title || "")}`);
  if (enFm.slug) lines.push(`slug: ${enFm.slug}`);
  if (enFm.section) lines.push(`section: ${enFm.section}`);
  if (enFm.section_title) lines.push(`section_title: ${enFm.section_title}`);
  lines.push(`summary: ${esc(translated.summary || enFm.summary || "")}`);
  if (enFm.order !== undefined) lines.push(`order: ${enFm.order}`);
  if (enFm.status) lines.push(`status: ${enFm.status}`);
  if (enFm.emoji) lines.push(`emoji: ${enFm.emoji}`);
  if (enFm.hide_from_nav) lines.push(`hide_from_nav: ${enFm.hide_from_nav}`);
  if (enFm.parent) lines.push(`parent: ${enFm.parent}`);
  lines.push(`translated_from: en`);
  lines.push(`source_sha: ${sourceSha}`);
  lines.push(`translated_at: ${today}`);
  lines.push(`mt: true`);
  lines.push("---", "");
  return lines.join("\n") + translated.body + "\n";
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  if (!API_KEY) {
    console.error("ERROR: ANTHROPIC_API_KEY is not set.");
    process.exit(1);
  }

  const enFiles = walk(EN).sort();
  const jobs = [];

  for (const enPath of enFiles) {
    const rel = relative(EN, enPath);
    const enText = readFileSync(enPath, "utf8");
    const sha = bodySha(enText);
    for (const lang of langs) {
      const target = join(CONTENT, lang, rel);
      let needs = retranslateAll || !existsSync(target);
      if (!needs && existsSync(target)) {
        const { fm } = splitFrontmatter(readFileSync(target, "utf8"));
        needs = fm.source_sha !== sha;
      }
      if (needs) jobs.push({ enPath, target, rel, lang, enText, sha });
    }
  }

  const todo = jobs.slice(0, limit);
  console.log(
    `Translating ${todo.length} page(s) with ${MODEL}` +
      (todo.length < jobs.length ? ` (of ${jobs.length} pending; --limit applied)` : ""),
  );

  let done = 0;
  let failed = 0;
  for (const job of todo) {
    const { fm, body } = splitFrontmatter(job.enText);
    process.stdout.write(`  ${job.lang}/${job.rel} ... `);
    try {
      const raw = await callClaude(buildPrompt(job.lang, fm, body));
      const translated = parseResponse(raw);
      mkdirSync(dirname(job.target), { recursive: true });
      writeFileSync(job.target, buildTranslatedFile(fm, translated, job.sha, job.lang));
      console.log("ok");
      done++;
    } catch (e) {
      console.log(`FAILED — ${e.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${done} translated, ${failed} failed, ${jobs.length - todo.length} skipped.`);
  // Exit 1 only when EVERY job failed. If even one succeeded we want the
  // workflow to continue and open a PR — partial translations are useful and
  // can be filled in on the next run when the staleness check picks up the
  // still-missing files.
  if (done === 0 && failed > 0) {
    console.error("No translations succeeded — failing the run.");
    process.exit(1);
  }
  process.exit(0);
}

main();
