# Playtronica Help Center — Voice Specification

> **Source:** `playtronica-research/01-brand/brand-master.md` § Brand Voice & Personality, § Emotional Core.
>
> **How to use:** every draft is scored against the checklist below. 1 point per item satisfied. Target ≥9/10 before a P0/P1 page ships. Reviewer can score in under 60 seconds per page.
>
> **Updated 2026-05-13:** added translation-readiness section (§ at the bottom). Every page is written so it can be translated to German, Russian, French, Spanish — and read clearly by a non-native English speaker who is buying a circuit board because someone said it can make a banana sing.

---

## Translation-readiness rules

The help center will be translated. Every English sentence we write becomes the source for German / Russian / French / Spanish later. Sentences that depend on cultural references, idioms, or wordplay break in translation. These rules make every page survive Crowdin.

**Sentence shape**
- One idea per sentence. Maximum 20 words preferred.
- Active voice. "Click the button" — not "the button should be clicked".
- Present tense and imperative mood for instructions. "Plug in the device. Open the browser."
- Avoid double negatives. "Remember to ground yourself" beats "don't forget to not ungrounded yourself".

**Words and phrases to avoid**
- **Idioms and wordplay:** "no drama", "the magic moment", "you have to try this", "drop a line", "piece of cake", "the dance moves", "the secret sauce", "killer feature". These do not translate.
- **Anti-vocabulary (existing rule):** professional, simply, advanced, beginner, leverage, utilize, technical specs, difficulty, seamless, intuitive, easy.
- **Phrasal verbs** when one word does the job. "Start" beats "fire up". "Cancel" beats "back out". "Connect" beats "hook up".
- **Filler words:** "just", "really", "very", "quite". Strip on edit pass.
- **Contractions** in critical safety instructions. Use "do not" in a warning, "don't" elsewhere is fine.
- **Culturally specific references:** Black Friday is okay (global commerce term). "Hail Mary", "Monday-morning quarterback" — out.

**Terminology — pick once, use forever**
- The product is a **device**, not an instrument, gadget, board, toy, or PCB-in-context. (PCB is okay when literally talking about the circuit board.)
- The browser is **Brave or Chrome** (in that order). Never "Chromium-based". Never "modern browsers".
- **USB-C connector**, not "USB-C port" or "Type-C".
- **MIDI** is uppercase, no hyphen.
- **Plug the device in** is the canonical phrase. Not "connect", "hook up", or "attach".
- **Email us** is the canonical phrase for support. Not "drop a line", "reach out", "shoot us a note", or "ping".
- **Order number** — not "order ID", "order #", or "your number".
- **Customer**, never "user". Never "buyer". (Exception: "the buyer" inside legalese on the warranty page.)
- **30 days**, not "a month", "four weeks", or "thirty days".

**Formatting that helps translators**
- **Bold** for UI labels exactly as they appear on screen. Bold survives translation; italics often don't.
- `Inline code` for exact strings the user must type or see (URLs, file names, commands, button labels).
- Numbered lists for steps. Letters (a, b, c) make translation harder.
- Tables for parallel data only — never for layout.
- One link per sentence. Multiple links in one sentence are hard to translate without sentence restructuring.

**Brand voice retained — translation-safe versions**

| Don't write | Write |
|---|---|
| "the wow moment" | "the first time you hear a note" |
| "no drama either way" | "no problem either way" |
| "the magic" | "the moment the plant plays itself" |
| "you have to try this" | "we recommend trying this" |
| "drop us a line" | "email us" |
| "feels like magic" | "feels surprising" / "feels new" |
| "we got you" | "we will help" |
| "killer feature" | "key feature" |
| "fire up the synth" | "start the synth" / "open the synth" |
| "super easy" | (just remove "super easy"; if true the reader will see it) |
| "in no time" | "within a few minutes" |
| "Got a sec?" | "Do you have a moment?" |

**Concrete imagery > abstract metaphor**

The brand arc (Surprise → Delight → Curiosity → Share) survives translation when carried by concrete imagery rather than abstract claims:

- ❌ "It will blow your mind."
- ✅ "Touch a houseplant. Hear a note."

- ❌ "An instrument like nothing else."
- ✅ "Sixteen alligator clips. Sixteen objects. Sixteen notes."

- ❌ "Magic happens when two people touch the device."
- ✅ "When two people each hold one pad and touch each other, the circuit completes through both bodies."

**The translation test**

A finished page is translation-ready when:
1. A native German / Russian / French / Spanish speaker reading the English source can paraphrase every sentence back in one try.
2. Sentences average under 20 words.
3. There are zero idioms. (Use the table above as the find-and-replace pass.)
4. Every UI label is **bold** and matches the actual on-screen text.
5. Every exact string (URLs, commands, file names) is in `code`.
6. The Crowdin segmentation preview shows no segment longer than two sentences.

---

## The "Ask the community" deflection block — single source of truth

Every public page (except `site/community.md` and `site/contact.md`) carries an "Ask the community" block above the "Still stuck" email footer. The block has two variants. The exact wording is below — change it here and re-run `scripts/add-community-block.py` to roll changes out.

**Variant 1 — technical pages** (devices, software, sound, troubleshooting, getting-started, professionals):

```
## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron grounding`, `biotron calibration`, `touchme no sound`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there, what to email instead, and where to find the WhatsApp regional groups.
```

**Variant 2 — order pages** (orders/*):

```
## Ask the community

> 🤝 **For creative, MIDI, and performance questions** — ask the [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica). 4,400 members, peer support. See [the community page](/site/community/) for what to ask there.
>
> **This page is for order issues** — tracking, returns, refunds, invoices, warranty. The community cannot help with those. Use the email below.
```

**Rules for the wording (so future edits stay consistent):**

- The 🤝 emoji is the only callout marker — `content.ts` maps it to `callout-tip` styling.
- Always link to `facebook.com/groups/playtronica` and to `/site/community/` internally. Never include a WhatsApp invite link — those rotate; the [community page](/site/community/) is the canonical aggregator.
- Always cite **4,400 members** until we have a newer audit. Update both the voice-spec and the community page in the same pass.
- The example search terms (`playtron grounding`, `biotron calibration`, `touchme no sound`) align with help-center page titles so the SEO loop closes.
- Order-variant explicitly names what the community cannot help with — tracking, returns, refunds, invoices, warranty. Keep that list synchronised with the order-page topics.
- Block sits ABOVE the "## Still stuck" heading. Below "## Still stuck" stays a one-line email-us paragraph.

## Brand voice in one sentence

Curious, warm, slightly playful — never condescending. The reader is treated as a smart, curious adult who happens to have a question, not as a beginner who needs to be taught.

## Vocabulary

- **Use:** play, explore, touch, discover, try, listen, surprise, magic, anything, everything
- **Don't use:** professional, serious, technical specs, difficulty, advanced users, beginners, our solution, leverage, utilize, simply
- **Tense:** present + second person ("you touch a plant and it plays a note") — never third person, never passive
- **Length:** short sentences for instructions; longer, warmer sentences for explainers. Mix.

## Emotional arc to evoke

Wherever possible, the page should produce the four-beat brand arc:

1. Surprise — "Wait, what?"
2. Delight — "Oh — it's working."
3. Curiosity — "What happens if I…"
4. Desire to share — "You have to try this."

A page that hits even one of these beats is on-brand. A page that hits none is dry and needs warming up.

## Anti-patterns (auto-fail items)

- Telling the reader the topic is "easy" or "simple". Either it is — and they'll feel it — or it isn't, and the word is condescending.
- Apologizing for the product ("we know this can be tricky…").
- Tech-jargon-first explanations ("MIDI is a protocol for…"). Always lead with what the user wants, then the term.
- "Please" + imperative on every step. Use "please" sparingly; instructions don't need to grovel.
- Marketing copy bleed-through ("Playtronica devices let you experience the magic of…"). The help center is not a brochure.
- Long preambles before the answer. The first 100 words must answer the question.

---

## The 10-point voice checklist

Score 1 point each. Pass = ≥9.

1. **Answers in the first 100 words.** The page's primary question is addressed before any preamble or context.
2. **Second person throughout.** No drift into "the user", "customers", "one", or passive voice.
3. **No anti-vocabulary.** None of: professional, simply, advanced, beginner, leverage, utilize, technical specs, difficulty.
4. **Each H2 echoes a real user phrase.** Pull from the brief's verbatim quotes. ("Where is my order?" not "Order status information").
5. **No condescension.** No "easy", no "don't worry", no apology for the product.
6. **Warmth signal.** At least one moment in the page that feels human — an aside, a small joke, a "by the way", an acknowledgment that something is genuinely surprising.
7. **Concrete over abstract.** Examples and named scenarios over generic descriptions ("plug TouchMe into Ableton" not "connect the device to your DAW").
8. **Plain language for tech terms.** If a term must appear, it's introduced with what the user gets first: "Web MIDI — the browser feature that lets a webpage talk to a USB instrument" not "Web MIDI is an API…".
9. **Mobile reading rhythm.** No paragraph >5 sentences. No sentence >30 words in dense how-to sections. Subheads or bolds every ~150 words.
10. **Closing nudge.** Each page ends with the next sensible step — a link to a related page, a "still stuck → WhatsApp Andrey", or a "try this next" pointer. Never just trails off.

---

## Voice-check examples

### Pass — page opener for "Got it as a gift?"

> Someone gave you a Playtronica. Welcome — you're about to make music from a banana, a houseplant, or a friend's hand. Here's how to get sound out of it in the next 5 minutes.

This passes 1 (answers in first sentence), 2 (you), 5 (no condescension), 6 (warmth — "welcome"), 7 (concrete: banana, houseplant, friend's hand), 10 (sets up next step).

### Fail — same topic, dry version

> This document provides setup instructions for new Playtronica users. The TouchMe device is a MIDI controller with capacitive sensing technology that allows users to generate audio output through conductive objects.

Fails 1 (no answer, only setup), 2 (third person "users"), 3 (anti-vocab: "technology", borderline-professional), 6 (zero warmth), 7 (abstract).

### Pass — instruction step

> Plug TouchMe into your laptop. Open Brave or Chrome and visit synth.playtronica.com. Touch the pad — you should hear a note. If you don't, scroll down to "no sound" and we'll fix it.

Passes most checks; specifically wins on 2, 5, 7, 10.

---

## When voice rules conflict with safety/accuracy

Accuracy wins. A page about returns is allowed to be drier than a page about touching plants. Voice is the target; accuracy is the constraint. Score honestly: a refund timeline page that hits 7/10 on voice but is 100% accurate beats a poetic one that misleads.

---

*Last updated: 2026-05-11. Reviewer: pending Andrey sign-off.*
