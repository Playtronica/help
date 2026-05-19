# Playtronica Help Center

The new `help.playtronica.com`. Next.js (App Router, static export) + Tailwind + Markdown content + Pagefind static search + Cloudflare Pages hosting.

**Live URL:** https://help.playtronica.com (once DNS is cut over)
**Repo:** https://github.com/Playtronica/help-center
**Build + deploy:** Cloudflare Pages, auto-deploys on every push to `main`.

---

## Edit the help center

The simplest pattern: ask Claude to make the change. Claude edits the Markdown files, commits, and pushes. Cloudflare Pages picks up the push and rebuilds in ~60 seconds.

Manual edit:

```bash
cd help-center/06-build
git pull
# edit content/en/<section>/<slug>.md
npm run dev          # http://localhost:3001
git add -A && git commit -m "Update biotron firmware steps"
git push
```

## Run locally

```bash
cd help-center/06-build
npm install
npm run dev          # http://localhost:3001
```

## Build a production preview (with search index)

```bash
npm run build:export    # static export to out/ + Pagefind index
npx serve out
```

Cloudflare Pages runs this same command on every push.

## Tracking

Every tracker is optional. Set the env var → it activates. Unset → no-op.

| Tracker | Env var | What for |
|---|---|---|
| Google Analytics 4 | `NEXT_PUBLIC_GA4_ID` | Funnel, source/medium, Shopify cross-domain |
| Microsoft Clarity | `NEXT_PUBLIC_CLARITY_ID` | Heatmaps + session recordings |
| Cloudflare Web Analytics | `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` | Real-user performance metrics, cookieless |

For local development copy `.env.example` to `.env.local` and fill in. For production set them in **Cloudflare Pages → Settings → Environment Variables**.

See `../_meta/deploy.md` for the full launch checklist.

## How content works

Pages live as plain Markdown in `content/en/<section>/<slug>.md`. Each page has frontmatter:

```yaml
---
title: Track your order
slug: track-your-order
section: orders
section_title: Orders & Support
summary: One-line description for the page and search snippet.
order: 1
status: edited-2026-05
emoji: 🔍
---
```

Sections recognised by `lib/content.ts`:

- `getting-started`
- `devices`
- `software`
- `troubleshooting`
- `orders`
- `professionals`
- `sound`
- `site`

Add a new page = add a new Markdown file in the right folder. The sidebar and dynamic route pick it up at build time.

## Search

Pagefind indexes the built HTML. `data-pagefind-body` wraps the content; `data-pagefind-meta="title"` marks the title. The `SearchBar` component fetches `/_pagefind/pagefind.js` lazily on first input.

## Widgets

- **WhatsAppFeedback** (`components/WhatsAppFeedback.tsx`) — temporary direct-to-WhatsApp feedback channel. Disable later by removing the import and render from `app/layout.tsx`. Docs: `../_meta/whatsapp-feedback-widget.md`.
- **Analytics** (`components/Analytics.tsx`) — GA4 + Clarity + Cloudflare Web Analytics, all opt-in via env vars.
- **FeedbackWidget** (`components/FeedbackWidget.tsx`) — in-article Yes/No question, posts to `/api/feedback`.
- **ViewToggle** (`components/ViewToggle.tsx`) — Mobile / Desktop / Auto view-mode switcher.

## Folder map

```
06-build/
├── app/                       Next.js App Router
│   ├── layout.tsx             Header + sidebar shell
│   ├── page.tsx               Homepage
│   └── [section]/[slug]/      Dynamic article route
├── components/                Sidebar, SearchBar, Analytics, WhatsAppFeedback…
├── lib/content.ts             Markdown loader + section grouping
├── content/en/                Source of truth — all pages
├── public/                    Static assets, _headers, _redirects, _pagefind/
├── .env.example               Tracker env vars (copy to .env.local for dev)
└── package.json
```

## Authoring rules

See `../_meta/voice-spec.md` for the full voice + translation-readiness rules. Briefs for each page live in `../03-briefs/`. Decisions are at `../_meta/decisions.md`.

## Status

- **v0.9 (2026-05-19)** — 40 public pages live, F1 brutalist design, mobile-first, community-first deflection block, WhatsApp feedback widget shipped. Ready for Cloudflare Pages cutover.
