#!/usr/bin/env node
/**
 * test-anthropic-key.mjs — quick sanity check before running the full
 * translation workflow. Prints the exact status code and first 300 chars
 * of any error response, so we can diagnose why a CI translate run failed.
 *
 * Usage:
 *   export ANTHROPIC_API_KEY=sk-ant-api03-...
 *   node scripts/test-anthropic-key.mjs
 *
 * What it does:
 *   1. Validates the key format (looks like an Anthropic key, not a placeholder).
 *   2. Sends a 1-token "hi" request to confirm the key is live.
 *   3. Translates one short paragraph to JA to confirm the prompt + max_tokens
 *      pipeline works end-to-end.
 */

const KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.TRANSLATE_MODEL || "claude-sonnet-4-6";

if (!KEY) {
  console.error("✗ ANTHROPIC_API_KEY is not set in the environment.");
  process.exit(2);
}

console.log(`Key prefix: ${KEY.slice(0, 12)}…${KEY.slice(-4)}`);
console.log(`Model:      ${MODEL}`);
console.log("");

if (!KEY.startsWith("sk-ant-")) {
  console.error("⚠  Key does not start with 'sk-ant-' — Anthropic keys begin with that prefix.");
  console.error("   If this is correct anyway, the API call below will still hit the wire.");
}

async function call(label, body) {
  process.stdout.write(`${label}: `);
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    console.log(`✗ ${res.status}`);
    console.log(`   ${text.slice(0, 400)}`);
    return { ok: false, status: res.status, body: text };
  }
  console.log("✓");
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = null;
  }
  return { ok: true, status: 200, parsed };
}

const ping = await call("Ping (1 token)", {
  model: MODEL,
  max_tokens: 1,
  messages: [{ role: "user", content: "hi" }],
});
if (!ping.ok) {
  console.error("\nPing failed. Common causes:");
  console.error("  401  invalid key, copy/paste error, key revoked");
  console.error("  403  key lacks billing or workspace access");
  console.error("  404  model name wrong (got: " + MODEL + ")");
  console.error("  429  rate limited — wait and retry");
  process.exit(1);
}

const translate = await call("Translate sample to JA", {
  model: MODEL,
  max_tokens: 200,
  messages: [
    {
      role: "user",
      content:
        "Translate ONLY the next line into Japanese. Output ONLY the translation, nothing else.\n\nPlaytronica makes MIDI devices.",
    },
  ],
});
if (!translate.ok) {
  console.error("\nTranslate call failed (different error from ping — investigate).");
  process.exit(1);
}

const sample = translate.parsed?.content?.[0]?.text?.trim() || "(no text returned)";
console.log("");
console.log("Sample translation output:");
console.log("  " + sample);
console.log("");
console.log("✓ ANTHROPIC_API_KEY is healthy. The full translation workflow should now work.");
