#!/usr/bin/env node
/**
 * Pass 2 — Ecommerce user-journey simulator.
 *
 * Asks the same question a real buyer would ask, runs it through the search
 * index, and checks whether the top-3 results contain a page that plausibly
 * answers it.
 *
 * Why this matters for an ecommerce help center:
 *   A buyer who searches "biotron no sound" and does NOT find the right page
 *   within 30 seconds will email support — or worse, file a return. The
 *   conversion cost of bad search is measured in returns, not pageviews.
 *
 * Method:
 *   - Load the JSON search index from public/search-index.json.
 *   - Score every query against every page using the same algorithm as
 *     components/SearchBar.tsx (title×3, summary×2, body×1).
 *   - Mark each query "answered" if the top-3 contains the expected page or
 *     a page whose slug includes one of the expected keywords.
 *   - Report pass-rate and the queries that FAILED to find a good answer.
 *
 * Run with: npm run review:journeys
 */

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INDEX_PATH = join(__dirname, "..", "..", "public", "search-index.json");

const index = JSON.parse(readFileSync(INDEX_PATH, "utf8"));

/**
 * Real-world ecommerce queries derived from the support corpus.
 * `expectSlug` — slug fragment we expect to win the search.
 * `category` — for the summary table.
 */
const QUERIES = [
  // ─── Problem-resolution (highest stakes for an ecommerce help center) ───
  { q: "biotron no sound", expectSlug: "biotron", category: "troubleshoot" },
  { q: "touchme not making sound", expectSlug: "no-sound", category: "troubleshoot" },
  { q: "playtron mobile no sound", expectSlug: "playtron", category: "troubleshoot" },
  { q: "all leds lit nothing happens", expectSlug: "troubleshoot", category: "troubleshoot" },
  { q: "biotron firmware update steps", expectSlug: "biotron", category: "setup" },
  { q: "orbita firmware update", expectSlug: "orbita", category: "setup" },
  { q: "device not detected by computer", expectSlug: "wont-connect", category: "troubleshoot" },
  { q: "denied access to midi browser", expectSlug: "wont-connect", category: "troubleshoot" },
  { q: "biotron random notes light sensor", expectSlug: "biotron", category: "troubleshoot" },
  { q: "factory reset firmware nuke", expectSlug: "firmware-reset", category: "troubleshoot" },
  { q: "how to ground myself playtron", expectSlug: "grounding", category: "physics" },
  { q: "how to select usb midi keyboard not bluetooth", expectSlug: "connect", category: "setup" },

  // ─── Setup / first-use (gift recipients, brand-new owners) ───
  { q: "got it as a gift", expectSlug: "gift", category: "onboarding" },
  { q: "first time setup", expectSlug: "first-5-minutes", category: "onboarding" },
  { q: "which playtronica do i have", expectSlug: "which-device", category: "onboarding" },
  { q: "what is in the box", expectSlug: "whats-in-the-box", category: "onboarding" },
  { q: "do i need a cable", expectSlug: "whats-in-the-box", category: "onboarding" },

  // ─── Software / connecting ───
  { q: "ableton midi setup", expectSlug: "ableton", category: "software" },
  { q: "logic garageband", expectSlug: "logic", category: "software" },
  { q: "ios ipad app", expectSlug: "mobile", category: "software" },
  { q: "fl studio daw", expectSlug: "fl-studio", category: "software" },
  { q: "koala sampler", expectSlug: "mobile", category: "software" },
  { q: "web synth no sound chrome", expectSlug: "online-synths", category: "software" },

  // ─── Creative — objects, instruments ───
  { q: "what can i play with touchme", expectSlug: "objects", category: "creative" },
  { q: "conductive materials", expectSlug: "objects", category: "creative" },
  { q: "fruit as instrument", expectSlug: "objects", category: "creative" },
  { q: "plant species best for biotron", expectSlug: "biotron", category: "creative" },

  // ─── Orders / commerce ───
  { q: "track my order", expectSlug: "track", category: "orders" },
  { q: "return refund", expectSlug: "return", category: "orders" },
  { q: "discount student", expectSlug: "pricing", category: "orders" },
  { q: "bulk order workshop", expectSlug: "b2b", category: "orders" },
  { q: "education licensing classroom", expectSlug: "education", category: "orders" },

  // ─── Professional / installation ───
  { q: "creative installation gallery", expectSlug: "installations", category: "pro" },
  { q: "safety children supervision", expectSlug: "safety", category: "pro" },

  // ─── Contact / community ───
  { q: "contact support email", expectSlug: "contact", category: "support" },
  { q: "facebook community group", expectSlug: "community", category: "support" },
];

function tokenise(s) {
  return s
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1);
}

function score(query, doc) {
  const qTokens = tokenise(query);
  if (!qTokens.length) return 0;
  const title = (doc.title || "").toLowerCase();
  const summary = (doc.summary || "").toLowerCase();
  const body = (doc.body || "").toLowerCase();
  let s = 0;
  for (const t of qTokens) {
    if (title.includes(t)) s += 3;
    if (summary.includes(t)) s += 2;
    if (body.includes(t)) s += 1;
  }
  return s;
}

function topN(query, n = 3) {
  return index
    .map((doc) => ({ doc, s: score(query, doc) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map((r) => r.doc);
}

const results = [];
for (const q of QUERIES) {
  const top = topN(q.q, 3);
  const hitIn = top.findIndex(
    (d) => d.url.includes(q.expectSlug) || d.body.toLowerCase().includes(q.expectSlug),
  );
  results.push({
    q: q.q,
    category: q.category,
    expected: q.expectSlug,
    rank: hitIn === -1 ? null : hitIn + 1,
    top: top.map((d) => d.url),
  });
}

const passed = results.filter((r) => r.rank !== null && r.rank <= 3).length;
const total = results.length;
const passRate = ((passed / total) * 100).toFixed(1);

console.log("\nPass 2 — Ecommerce user-journey simulator");
console.log("==========================================\n");
console.log(`Queries: ${total}`);
console.log(`Resolved in top-3: ${passed} (${passRate}%)`);
console.log(`Not resolved: ${total - passed}\n`);

const byCategory = new Map();
for (const r of results) {
  const ok = r.rank !== null && r.rank <= 3;
  if (!byCategory.has(r.category)) byCategory.set(r.category, { ok: 0, total: 0 });
  const stats = byCategory.get(r.category);
  stats.total++;
  if (ok) stats.ok++;
}
console.log("By category:");
for (const [cat, s] of byCategory) {
  const pct = ((s.ok / s.total) * 100).toFixed(0);
  console.log(`  ${cat.padEnd(14)} ${s.ok}/${s.total} (${pct}%)`);
}

const fails = results.filter((r) => r.rank === null || r.rank > 3);
if (fails.length) {
  console.log("\n──────────── QUERIES NOT RESOLVED IN TOP-3 ────────────");
  for (const f of fails) {
    console.log(`\n  "${f.q}"`);
    console.log(`    expected slug fragment: "${f.expected}"`);
    if (f.top.length) {
      console.log(`    top results returned:`);
      for (const url of f.top) console.log(`      · ${url}`);
    } else {
      console.log(`    top results returned: NONE`);
    }
  }
}

console.log("\n");
process.exit(fails.length > 5 ? 1 : 0);
