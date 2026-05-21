# Help-review prompt — reusable verification system

How to ask Claude (or any LLM) to audit a Playtronica help-center page against our quality bar. Paste the prompt below into a fresh Claude session, attach the page file, get a per-section score plus a punch list.

Run this prompt:
- On every new page before it ships.
- On every existing page once a quarter.
- After any major terminology change in `docs/VOICE.md`.

The prompt is designed to take ~30 seconds of Claude's time per page and produce one deliverable: a markdown report ready to paste back into the page as comments or a refactor list.

---

## The prompt (copy from the next code block)

```
You are a senior technical-help editor reviewing one page of the Playtronica
help center. The Playtronica help center is the source of truth for five small
MIDI devices — TouchMe, Playtron, Biotron, Orbita, Scales.

The page is below the divider. Apply the four checks in order and return a
single markdown report with this structure:

  ## Score (out of 10)
  - Logical structure: X/10
  - Translation-readiness: X/10
  - Cross-references: X/10
  - SEO / AI-search posture: X/10
  - **Overall: X/10**

  ## What is wrong (bullet list, most-important first)
  - <one specific issue per bullet; quote the exact text>

  ## What to add (bullet list)
  - <missing content with rationale>

  ## What to delete (bullet list)
  - <content that adds noise>

  ## Rewritten lines (only the ones that need changing)
  ### Original
  > <copy the original line>
  ### Fixed
  > <your rewrite>

The four checks:

1. LOGICAL STRUCTURE
   - Does the page lead with what the reader most wants to know in the first
     three lines?
   - Are H2 / H3 headings in the order a stuck reader would scan?
   - Are warnings (⚠️) placed BEFORE the action they protect, not after?
   - Are "Quick start" or numbered steps complete from plug-in to first sound?
   - Is "Still stuck" the final section?
   - Is the "Ask the community" block placed above "Still stuck"?

2. TRANSLATION-READINESS (anchor file: docs/VOICE.md)
   - Zero idioms. Zero phrasal verbs where a single word does the job.
   - Zero contractions in warnings.
   - Sentences average under 20 words. Imperative, present tense, active voice.
   - Canonical terms used: device (not instrument), Brave or Chrome (not modern
     browsers), USB-C connector, MIDI uppercase, plug the device in, email us,
     order number, customer, 30 days.
   - Cable wording: TouchMe, Playtron, Orbita ship with a USB cable; Biotron
     and Scales do not. Never specify the cable type (no "USB-C cable").
   - Numbered lists for steps. Tables for parallel data only.

3. CROSS-REFERENCES
   - Every internal link (/devices/..., /sound/..., /orders/...) points to a
     page that exists in content/en/.
   - Devices are described consistently with /getting-started/which-device.md.
   - "Ask the community" block on every public page (except site/community.md
     and site/contact.md) matches the canonical wording in docs/VOICE.md.
   - Email subjects use the project's order-number-tagged convention:
     "<topic> #[your order number]".

4. SEO + AI-SEARCH POSTURE
   - The first paragraph answers the page's title as a question.
   - H2 headings are descriptive enough that an LLM scraping the markdown
     could synthesise the page from headings alone.
   - The page does not duplicate content from another page; cross-links
     instead.
   - At least one canonical Playtronica term appears in the first 50 words
     (TouchMe, Playtron, Biotron, Orbita, Scales, MIDI).
   - The page is self-contained (no critical info ONLY available via an
     outbound link).

Anchor file (refer to it, don't include it in your output):
- docs/VOICE.md — full translation rules + the "Ask the community"
  block canonical wording.

If the page is essentially good, the report can be very short. Do not invent
problems to fill space. Honest "Overall: 9/10, ship it" reports are valuable.

---

PAGE STARTS BELOW:

<paste the .md file contents here, frontmatter included>
```

---

## How to run it efficiently

- **Per-page mode (manual).** Paste the prompt + one page. Useful when triaging.
- **Batch mode (semi-auto).** Loop over the `content/en/**/*.md` files; for each, spawn a Claude conversation, paste prompt + page, and save the response. A 10-minute job for the whole help center.

The automated equivalent already lives in `scripts/reviews/` — four review passes runnable with `npm run review:all`. This prompt is the human-judgement layer on top: use it when a page needs a close qualitative read that the scripts cannot give.

## Why this exists

The help center is now 41 public pages. Manual eye-balling is fragile. This prompt makes the review process:

- **Reproducible.** Same prompt → same checks → same verdict structure.
- **Self-improving.** When `docs/VOICE.md` changes, the prompt's translation-readiness check picks up the new rules.
- **Actionable.** Output is a punch-list with rewritten lines, not abstract feedback.
- **Cheap.** ~30 seconds of LLM time per page.

The prompt explicitly tells the reviewer to keep reports short when the page is good. We do not want false-positive critique inflation.

## When the prompt itself needs updating

Edit this file when:
- A new canonical term lands in `docs/VOICE.md`.
- A new section type (e.g. "Pre-purchase questions") becomes standard.
- A new doc lands in `docs/` that reviewers should reference.

Bump the date in the top line so reviewers know they have the latest prompt.

*Last revised: 2026-05-19.*
