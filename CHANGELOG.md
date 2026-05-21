# Changelog

All notable changes to the Playtronica Help Center.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Dates are ISO-8601.

## [Unreleased]

## [1.0.0] — 2026-05-20

First public open-source release. Cloudflare Pages cutover at `help.playtronica.com`.

### Added
- Full content set of 42 articles across 8 sections (devices, software, troubleshooting, getting-started, sound, orders, professionals, site).
- Brutalist mobile-first design (F1 token system) — `docs/DESIGN-TOKENS.md`.
- Pagefind static search at production; JSON-index fallback for dev mode.
- WhatsApp feedback channel (env-var-gated, opt-in for forks).
- Returns-and-refunds policy page and pre-purchase contact category.
- Contributor-facing documentation in `docs/`: voice spec, review prompt, design tokens, AI-SEO posture, monthly-refresh runbook, post-push checklist.
- Cross-reference audit script (`scripts/audit-cross-references.py`).
- External link health checker (`scripts/check-external-links.py`).
- llms.txt, llms-full.txt, robots.txt, sitemap.xml, JSON-LD structured data on every page.
- OpenGraph + Twitter card metadata, with a generated `og-default.png` social image.
- Favicon and Apple touch icon (`app/icon.png`, `app/apple-icon.png`).
- Custom 404 page (`app/not-found.tsx`) that routes lost readers to the most-asked pages.
- "Edit this page on GitHub" link in every article footer; `content/README.md` editor guide.
- Issue templates, pull request template, CI workflow, `package-lock.json` for reproducible installs.
- Four-pass review system (mechanical, user journeys, ecommerce friction, trust signals).
- Multilingual support — German, Spanish, French, Japanese. Language-prefixed routes, language switcher, hreflang alternates, multilingual sitemap, English fallback for untranslated pages. `source_sha` staleness tracking (`npm run i18n:status`). Claude-API translation pipeline — `scripts/translate-pages.mjs` + a GitHub Action that opens a translation PR. Architecture in `docs/I18N.md`.
- `security.txt` (RFC 9116) at `/.well-known/security.txt`.
- Dual license: MIT (code) + CC-BY-4.0 (content).

### Changed
- Migrated from the old single-page `help.playtronica.com` (Super.so) to a Next.js + Markdown architecture hosted on Cloudflare Pages.
- Every device page rewritten around its real-life use case (TouchMe — two-people demo; Biotron — plants as instruments; Playtron — grounding-first; Orbita — magnetic-tracks; Scales — weight-to-pitch).
- Troubleshooting hub rebuilt from clustered support-corpus topics.
- Community page reframed: "looking for a new home" — pointing toward this repository's GitHub Discussions and the existing Facebook group.

### Security
- Personal WhatsApp number moved out of source into `NEXT_PUBLIC_WHATSAPP_FEEDBACK_NUMBER` env var; removed the last hardcoded copy from `content/site/contact.md`.
- Next.js `14.2.5 → 14.2.35` and postcss `8.4.41 → 8.5.10` — `npm audit` critical advisory plus two highs resolved. Remaining advisories affect server-side code paths a static export does not expose; documented in `SECURITY.md`.
- `.env*` files in `.gitignore` (except `.env.example`).
- Generated artefacts (`out/`, `.next/`, `public/_pagefind/`, `public/search-index.json`, `public/llms*.txt`, `public/sitemap.xml`) gitignored.

[Unreleased]: https://github.com/Playtronica/help/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Playtronica/help/releases/tag/v1.0.0
