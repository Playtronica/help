# AI-search and SEO posture

We treat AI search — ChatGPT, Claude, Perplexity, You.com, Brave Leo, Arc Max, DuckAssist, Bing Copilot — as a **first-class traffic source equal to Google**. Half the questions a Playtronica owner will ask in the next five years will be answered by an LLM that synthesises across many sources. We want this help center to be a high-trust source those models prefer to cite.

This document explains every surface we ship for AI and human search, and the rationale behind each.

---

## 1. Per-page metadata

Every Markdown page in `content/en/` has frontmatter that drives meta tags:

```yaml
---
title: "Biotron — your plant as a MIDI instrument"
slug: biotron
section: devices
summary: "Clip the leaf-pads to a houseplant and let it play itself."
order: 3
emoji: 🌿
---
```

The `summary` becomes `<meta name="description">`, the OpenGraph description, and the Twitter card description in one step. Authors only have to write one summary sentence per page.

## 2. Structured data (JSON-LD)

`app/layout.tsx` injects a `WebSite` + `Organization` graph site-wide.

`app/[section]/[slug]/page.tsx` injects, for each article:

- A `TechArticle` schema with headline, description, URL, section, publisher, and license.
- A `FAQPage` schema synthesised from the page's `<details><summary>` blocks — so pages like Biotron and the troubleshooting hub appear in Google's FAQ rich-result format and feed Q&A pairs directly to LLM crawlers.

Validate with [Google's Rich Results Test](https://search.google.com/test/rich-results) after every meaningful release.

## 3. `llms.txt` and `llms-full.txt`

Following the [llmstxt.org](https://llmstxt.org/) emerging standard:

- `public/llms.txt` — a Markdown table of contents linking to every page, grouped by section, with one-line summaries. Designed for an LLM that wants a quick index before deciding which pages to fetch.
- `public/llms-full.txt` — the full body of every page, concatenated. One HTTP request returns the entire knowledge base. Designed for a tool that wants to ground a single answer in our content without crawling.

Both files are regenerated on every `npm run dev` and `npm run build` by `scripts/build-seo-files.mjs`. No manual maintenance required.

## 4. `robots.txt`

`public/robots.txt` explicitly allows every major AI/LLM crawler we know of, individually, by name. This way, any future blanket-deny rule (during a content audit, for example) does not accidentally block them.

Currently allowed: GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Bingbot, Bytespider, Applebot, Applebot-Extended, cohere-ai, Diffbot, FacebookBot, meta-externalagent, YouBot, Amazonbot, ImagesiftBot, DuckAssistBot.

When a new crawler shows up in CF logs, add it to the list. See `docs/MONTHLY-REFRESH.md` for the review cadence.

## 5. `sitemap.xml`

Standard XML sitemap regenerated on every build. Every public page with `lastmod` derived from the file's modified time. Homepage gets priority 1.0; every article gets 0.8. Cloudflare Pages serves the sitemap at `/sitemap.xml`.

Submit once to:

- Google Search Console
- Bing Webmaster Tools
- Cloudflare Pages → Custom Headers tab (already in `_headers`)

## 6. OpenGraph + Twitter cards

Defaults are set in `app/layout.tsx`. Per-article overrides in `app/[section]/[slug]/page.tsx`. A single `og-default.png` (1200×630) lives in `public/og-default.png` and is used as the social image until per-device hero images are commissioned.

Validate with:

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [OpenGraph.xyz](https://www.opengraph.xyz/)

## 7. Canonical URLs

Every page sets `<link rel="canonical">` via Next.js metadata. The article route uses `${SITE_URL}/${section}/${slug}/`. The homepage uses `${SITE_URL}`.

Set `NEXT_PUBLIC_SITE_URL` in Cloudflare Pages env vars to override the default `https://help.playtronica.com`.

## 8. Speed and Core Web Vitals

- Static export — no server runtime, no cold starts, no API roundtrips.
- Cloudflare Pages CDN — global edge cache, sub-50 ms TTFB to most of the world.
- Pagefind static search — JavaScript loaded lazily on first input.
- No tracking scripts in the critical path. GA4 + Clarity + CF Web Analytics are deferred and gated by env vars.
- Fingerprinted assets cached forever; HTML cached at zero seconds with `must-revalidate` (`public/_headers`).

Run [PageSpeed Insights](https://pagespeed.web.dev/) on the live URL every month.

## 9. Internal linking density

The "Related" section on every article auto-links to up to four sibling pages in the same section. The "Ask the community" deflection block on every page links to the Facebook group. The sidebar exposes the full taxonomy on every page. The troubleshooting hub clusters every error path into a single discovery surface.

The cross-reference audit at `scripts/audit-cross-references.py` validates every internal link before a release. Run it on every PR via CI.

## 10. The monthly refresh

Once a month, follow `docs/MONTHLY-REFRESH.md` to:

1. Re-run the cross-reference audit.
2. Re-score every device page with `docs/REVIEW-PROMPT.md`.
3. Check CF logs for new AI crawlers — add to `robots.txt` if any.
4. Submit fresh sitemaps to Google + Bing.
5. Validate three random pages with Rich Results Test, OpenGraph debugger, llms.txt checker.

This is the loop that keeps AI-search performance high. Skipping it for six months will not break the site, but the AI-search citation rate will drift down.

---

## What we do NOT do

- We do not write SEO filler. Every paragraph answers a real question we have seen in support.
- We do not stuff keywords. Voice spec (`docs/VOICE.md`) forbids it.
- We do not use displacive listicles ("Top 10 reasons…") that game LLM training. We optimise for being useful, not for being scraped.
- We do not block AI crawlers. We want our content cited, with attribution, by every LLM that can read it. Hence CC-BY-4.0.

---

*Last reviewed: 2026-05-20.*
