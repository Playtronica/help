# Editing the help center content

Every page on [help.playtronica.com](https://help.playtronica.com) is one Markdown file in this folder. You do not need to be a developer to edit one.

## The fastest way to fix a page

1. Open the page on the live site.
2. Scroll to the footer and click **"Edit this page on GitHub →"**. It opens the exact file in GitHub's editor.
3. Make your change.
4. Scroll down, write a one-line description, and click **"Propose changes"**. That opens a pull request.
5. A maintainer reviews and merges. The site rebuilds automatically in about a minute.

That is the whole process — no install, no terminal.

## Folder structure

```
content/
└── en/                      English — the source of truth
    ├── getting-started/      Onboarding, gifts, what is in the box
    ├── devices/              One page per device + advanced sub-pages
    ├── software/             DAWs, web synths, mobile apps, hardware
    ├── sound/                Physics — grounding, conductive materials
    ├── troubleshooting/      Every error path, by symptom
    ├── orders/               Tracking, returns, shipping, warranty, VAT
    ├── professionals/        B2B, education, installations, safety
    └── site/                 Contact, community
```

Other languages (`de/`, `es/`, `fr/`, `ja/`) are **generated** mirrors of `en/`. Never edit them by hand — see `docs/I18N.md`. Edit English; the translations are regenerated from it.

## Anatomy of a page

Every file starts with a small block of settings called frontmatter, between two `---` lines:

```markdown
---
title: "Track your order"
slug: track-your-order
section: orders
summary: "Where your package is, when it arrives, what to do if tracking is quiet."
order: 1
status: edited-2026-05
emoji: 🔍
---

The real content starts here.
```

| Field | What it does | Safe to edit? |
|---|---|---|
| `title` | Shown at the top of the page and in search results | Yes |
| `slug` | The URL — `track-your-order` → `/orders/track-your-order/` | Avoid — changing it breaks links |
| `section` | Which folder/section the page belongs to | No |
| `summary` | One sentence — used for the page description, search snippets, and SEO | Yes |
| `order` | Sort position in the sidebar (lower = higher up) | Yes |
| `status` | Month-stamp of the last meaningful edit, e.g. `edited-2026-05` | Update when you make a real change |
| `emoji` | The icon next to the page in the sidebar | Yes — one emoji |

## Writing rules

Read [`docs/VOICE.md`](../docs/VOICE.md) before writing more than a sentence. The short version: short declarative sentences, active voice, no idioms, no marketing adjectives, no contractions in warnings. The help center is written this way on purpose so it reads cleanly in every language.

## Before you submit

- The page reads correctly — headings in order, links point somewhere real.
- The frontmatter still has all seven fields.
- You bumped `status` to the current month if the change was meaningful.

Larger changes — new pages, restructured sections — are covered in [`../CONTRIBUTING.md`](../CONTRIBUTING.md).
