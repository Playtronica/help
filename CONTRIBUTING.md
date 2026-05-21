    # Contributing to the Playtronica Help Center

Thanks for considering a contribution. This repository is the source code and the source of truth for [help.playtronica.com](https://help.playtronica.com). Every page on the live help center is one Markdown file in this repo.

The most useful contributions are usually small. A typo fix, a clearer sentence, a missing step, a link that points to the wrong page — these compound into a help center that actually helps. You do not need to be a developer.

---

## Three kinds of contribution

### 1. Typos and small fixes

The fastest path is the GitHub web editor. On any article page of the live site, click the **"Edit this page on GitHub →"** link in the page footer — it opens the exact Markdown file in GitHub's editor. Make your fix, write a one-line description, and submit as a pull request. Cloudflare Pages will build a preview link automatically.

No local setup, no `git clone`, no build step.

### 2. New pages or larger changes

If you are adding a new article, restructuring a section, or rewriting more than a paragraph, please clone the repo and run it locally so you can preview your work:

```bash
git clone https://github.com/Playtronica/help.git
cd help
npm install
npm run dev          # http://localhost:3001
```

Read [`docs/VOICE.md`](docs/VOICE.md) before you write. The voice we use is deliberately unusual — short declarative sentences, no idioms, no contractions in warnings, no marketing adjectives. The voice spec exists so this help center reads cleanly in twenty languages and is translation-ready out of the box.

Run the cross-reference audit before opening a PR:

```bash
npm run audit
```

It validates every internal link and anchor. The CI workflow runs it on every PR.

### 3. Issues, discussions, ideas

- **Found something wrong but not sure how to fix it?** Open an [issue](https://github.com/Playtronica/help/issues/new/choose).
- **Want to discuss an approach, ask a question, or propose a section?** Use [GitHub Discussions](https://github.com/Playtronica/help/discussions).
- **Spotted a security issue?** See [SECURITY.md](SECURITY.md). Do not open a public issue.

---

## Adding a new page

Every page is a single Markdown file with YAML frontmatter:

```markdown
---
title: "Title shown at the top of the page and in search results"
slug: kebab-case-slug-used-in-the-url
section: devices                 # one of the eight canonical sections
summary: "One sentence used for SEO meta, search snippets, and llms.txt."
order: 7                         # lower numbers sort first inside the section
status: edited-2026-05           # YYYY-MM month-stamp of the last meaningful edit
emoji: 🎛️                        # one emoji, used in the sidebar and breadcrumbs
---

Body content starts here. The first paragraph is the lede — it should
restate the page's promise without repeating the summary verbatim.
```

The eight canonical sections (defined in `lib/content.ts`):

| Section | What lives here |
|---|---|
| `getting-started` | Onboarding, gift-recipient flow, what is in the box, which device do I have. |
| `devices` | One canonical page per device (TouchMe, Playtron, Biotron, Orbita, Scales) plus advanced sub-pages. |
| `software` | Connecting to DAWs, web synths, mobile apps, hardware synths. |
| `sound` | Physics — grounding, conductive materials, why capacitive sensing works. |
| `troubleshooting` | Every error path, organised by symptom. |
| `orders` | Tracking, returns, discounts, gift orders. |
| `professionals` | B2B bulk, education licensing, creative installations, safety. |
| `site` | Meta — contact, community, about this help center. |

Save the file as `content/en/<section>/<slug>.md`. The sidebar and dynamic route pick it up on the next save during `npm run dev`.

---

## Voice and structure

Read the full spec at [`docs/VOICE.md`](docs/VOICE.md). The short version:

- **Sentence rhythm**: short declarative sentences. The longest sentence on a page should not exceed two clauses.
- **Active voice**. Imperative form for instructions ("Plug Biotron into your computer" — not "Biotron should be plugged in").
- **No idioms.** No metaphors that do not survive translation. No "out of the box," "ballpark," "low-hanging fruit."
- **No contractions in warnings**. "Do not touch" — not "don't touch." Warnings must read clearly when translated.
- **No marketing adjectives**. "Plays" beats "amazingly plays." "Music" beats "incredible music." Trust the reader.
- **No emoji in body prose.** Emoji belong in frontmatter (`emoji:`), in icon-only callouts (`> ⚠️`, `> ℹ️`, `> 🤝`), and nowhere else.
- **Cross-reference**: every page links to at least one related page. The "Related" section auto-populates from sibling articles in the same section.
- **Cite sources** when claims need them. Plant physiology, audio physics, MIDI spec — link the primary source.

When in doubt, run your page through `docs/REVIEW-PROMPT.md`. The prompt is what we use internally to score every device page on logic, translation-readiness, AI-search readability, and cross-references.

---

## Pull request checklist

Before opening a PR, please confirm:

- [ ] The page renders correctly in `npm run dev`.
- [ ] `npm run audit` passes (no dead links, no dead anchors).
- [ ] `npm run lint` passes (no ESLint errors).
- [ ] The frontmatter is complete: title, slug, section, summary, order, status, emoji.
- [ ] The page follows the voice spec (sentence length, active voice, no idioms).
- [ ] Internal links point to existing pages.
- [ ] Images, if any, have descriptive `alt` text.
- [ ] No real customer data, personal phone numbers, or PII appears in the page.

The CI workflow runs lint + audit + build on every PR. A failing check blocks merge.

---

## Tone with humans

This is a public help center. People reading it are often confused, frustrated, or new. Be patient in writing. Be patient in code review. Be patient in discussions. Assume the contributor is smart and acting in good faith, even if they make a beginner mistake. Help them ship.

By participating you agree to our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Becoming a maintainer

Active contributors with three or more merged pull requests are invited as collaborators on the repo. From there it is regular open-source maintenance: review PRs, triage issues, keep the audit green.

The current maintainer is Andrey Manirko ([@playtronica](https://github.com/playtronica)).

---

*Thank you. Every page that gets clearer is a person who does not have to email support.*
