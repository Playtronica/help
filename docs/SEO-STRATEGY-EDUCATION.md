# SEO Strategy — Playtronica Education

**Last updated:** 2026-05-28
**Owner:** Andrey Manirko
**Horizon:** 6 months (May 2026 → Nov 2026). KPIs reviewed monthly.
**Target:** 5,000 monthly institutional organic visits to education.playtronica.com by Nov 2026 (from ~0 today). 100 inbound institutional inquiries via SEO. 20 closed Class Pack 10+ orders attributable to SEO.

---

## The thesis

Two facts shape this strategy:

**Fact 1: Makey Makey owns "invention literacy" — and only that.** Their hub at `makeymakey.com/pages/educators` is the leader in K-12 invention/STEM kits, but their music depth is shallow. Their pages are project-driven, not standards-aligned. They have no conservatory presence, no special-ed framing, no MIDI/DAW integration content, no music-specific lesson library. They sell certification ($) — friction.

**Fact 2: Bareconductive Touch Board competes on art/design, not music.** Their case studies feature interactive walls and smart switches — not classrooms. They have no NCAS standards mapping, sporadic blog, no purchase-order workflow visible from homepage. They sell to designers and one-off art teachers, not music departments.

**Where Playtronica wins:** the **music-specific** institutional buyer. The K-12 music teacher, the conservatory faculty member, the museum educator, the music-therapist who needs accessible instruments. None of our competitors own that vertical. We can.

Specifically, we win by being the only brand that does **all four** of these at once:
1. **Standards-aligned** lessons mapped lesson-by-lesson to NCAS / UK MMC / NGSS / ISTE
2. **Real music output** — not metaphorical/symbolic ("any sound is music") but actual MIDI to actual DAWs
3. **No-friction onboarding** — Chromebook-compatible, no drivers, no student accounts
4. **Institutional infrastructure** — open POs, VAT invoices, W-9 / COI / DPA on request, replies within 1 business day

The SEO strategy puts each of those four onto a page Google can find.

---

## Audience map — six personas, six query patterns

For each persona: who they are, what they type into Google, what they need to see on the page that ranks for that query.

### 1. K-5 Music Teacher (solo decision-maker, $200-1,400 budget)
**Search queries:**
- `music technology lesson plans elementary`
- `K-2 music lesson plans free`
- `alternative to Makey Makey for music class`
- `how to teach music with technology K-5`
- `music tech ideas for elementary classroom`

**What they want to see:** real downloadable lesson PDFs they can teach tomorrow. Pricing under their PO threshold (most US elementary teachers can spend ≤$500 without approval). Photos of other elementary classrooms using it.

**Our page that should rank:** `/education/for-music-teachers/` + each individual lesson page + `/education/lesson-1-touch-as-conductor/`.

### 2. 6-12 STEAM Coordinator (cross-curricular, $1,500-15,000 budget)
**Search queries:**
- `music technology lesson plans middle school`
- `STEAM music curriculum`
- `interdisciplinary music tech`
- `NGSS music integration`
- `music + science lesson plans`

**What they want to see:** the cross-curricular framing. Biology + music (our Biotron). Physics + music (our TouchMe). Standards mapping that lets them defend the purchase to the principal.

**Our page that should rank:** `/education/standards/` + `/education/lesson-3-plant-that-plays-itself/` + a new pillar page on "STEAM music: a complete guide".

### 3. Conservatory / Music Tech Faculty (high authority, $1,500-15,000 budget per course)
**Search queries:**
- `MIDI hardware for music tech course`
- `university music technology lab equipment list`
- `Pd Max/MSP teaching hardware`
- `class-compliant USB MIDI educational`
- `music tech research instruments`

**What they want to see:** technical depth. Real MIDI protocol support. Class-compliant USB. Open-source firmware. Documentation that respects their expertise. The Trossingen + Stanford case studies.

**Our page that should rank:** `/education/for-conservatory-faculty/` + `/education/case-study-hochschule-trossingen/` + `/education/case-study-stanford-dschool/`.

### 4. Procurement Officer (no music context, $5,000-50,000+ orders)
**Search queries:**
- `Playtronica purchase order` (brand-anchored)
- `Playtronica W-9`
- `[brand name] FERPA compliant`
- `music tech school district pricing`
- `educational hardware bulk discount`

**What they want to see:** PO acceptance language, payment terms, VAT invoice templates, W-9 or W-8BEN, COI, DPA / AVV (EU). Reply SLA (we say 1 business day).

**Our page that should rank:** `/education/quote/` + a procurement-language FAQ page (new — see Layer 2).

### 5. Special Education Teacher / Music Therapist ($300-2,500 individual budget)
**Search queries:**
- `music kit for autism classroom`
- `sensory room music equipment for schools`
- `accessible music instruments`
- `music therapy hardware`
- `nonverbal student music tools`

**What they want to see:** Lesson 5 (Composing for the body) which is built around accessibility. Real classrooms with non-verbal students. Photos that look like a sensory room, not a music studio.

**Our page that should rank:** `/education/lesson-5-composing-for-the-body/` + a new `/education/for-special-ed/` landing page.

### 6. Museum Educator ($1,000-25,000 budget, capital-project rhythms)
**Search queries:**
- `interactive music exhibit`
- `hands-on music for museum`
- `museum education music technology`
- `family-day music exhibit ideas`

**What they want to see:** The Lincoln Center case study. Photos of family days. Durability claims. Set-up time. The "5-minute first sound" property.

**Our page that should rank:** `/education/case-study-lincoln-center/` + a new `/education/for-museum-educators/` page.

---

## Layer 1 — On-page SEO (Weeks 1-2)

Highest-leverage / lowest-effort. Pure code changes. **Implement before any pillar content writing.**

### 1.1 — Schema.org JSON-LD
Add structured data to every education page. This is the single biggest unlock for Google Rich Results in the ed-tech space.

- **`Course`** schema on each lesson page (`lesson-1-...md` etc.) with `provider`, `courseCode`, `educationalLevel`, `audience`. Triggers Google's Courses rich result.
- **`FAQPage`** schema wrapping the FAQ section on `/education/`. Triggers "People also ask" eligibility.
- **`Product` + `Offer`** schema on each pricing tier (€390 / €1,380 / €3,690 / quote-only) with availability + price. Triggers price-aware results.
- **`EducationalOrganization`** schema in `app/education/layout.tsx` (when we add that layout in Phase 2) — establishes Playtronica as an entity Google recognises as educational.
- **`Review`** schema on each case study (Stanford, Lincoln, Trossingen quoted as reviews).
- **`HowTo`** schema on each lesson — every lesson has steps. HowTo schema gets long, content-rich snippets in search.

### 1.2 — Title + meta optimization
Every page audited for keyword targeting. Examples:

| Page | Current title | Optimized title |
|---|---|---|
| `/education/` | "Playtronica for Education — Music tech for K-12 classrooms" | "Standards-aligned music tech for K-12, conservatories, and museums — Playtronica" |
| `/education/standards/` | "Standards alignment — Playtronica for Education" | "NCAS, UK MMC, NGSS + ISTE-aligned music tech lessons — Playtronica" |
| `/education/lesson-1-touch-as-conductor/` | "Lesson 1 — What is sound? Touch as conductor" | "K-2 music lesson plan: What is sound? — Touch as conductor (Free PDF)" |

Meta descriptions: 150-160 chars, value prop first, CTA last.

### 1.3 — H1 / H2 alignment
Each page's H1 should match the primary keyword. H2s should map to "People also ask" patterns. Example: lesson 1 should have H2s like "What you'll need" / "How long does this take" / "Which grade band" — these are literal queries.

### 1.4 — Internal linking
Every device page in the help-center (`/devices/touchme/`, `/devices/biotron/`, `/devices/orbita/`) gets a top-of-page banner: "Used in classrooms? See Playtronica for Education →". Single edit pattern in `ArticleView.tsx`.

Every education page links to at least 2 other education pages (related lessons, related case studies, related role pages).

### 1.5 — Image alt text
Every image alt should describe educational use, not the device. Bad: `alt="TouchMe device"`. Good: `alt="A K-2 student touches a banana wired to TouchMe to play a note"`.

### 1.6 — URL slugs
Already good. Don't change.

### 1.7 — Open Graph + Twitter cards
Education-specific OG images (1200×630) with text overlay like "Music tech for K-12 classrooms · Standards-aligned · From €390". Currently using the generic help-center OG image.

---

## Layer 2 — Pillar content (Weeks 3-12)

The biggest unlock. We write **8 pillar pages** over 8 weeks — long, comprehensive, definitive guides that rank for top-of-funnel queries. Each pillar links to 5-15 supporting pages (lessons, case studies, devices).

### Pillar 1: "Complete Guide to Music Technology in K-12 Classrooms" (~6,000 words)
**Target keyword cluster:** "music technology K-12", "music technology in education", "how to teach music with technology"
**Why this works:** Makey Makey doesn't own this — they own "invention literacy". Nobody else has written THE guide.
**Internal links to:** all 5 lessons, all 3 case studies, /education/curriculum/, /education/quote/.
**External backlink target:** NAfME Teaching Music magazine, Edutopia, EdSurge.

### Pillar 2: "Music in Special Education — A Practical Guide" (~5,000 words)
**Target keyword cluster:** "music for autism classroom", "accessible music instruments", "music therapy hardware school"
**Why this works:** Almost no commercial brand has written it. Music therapists are an under-served, very loyal segment.
**Internal links to:** lesson 5, our future `/education/for-special-ed/` page.

### Pillar 3: "Conservatory MIDI Hardware: A Faculty Guide" (~4,500 words)
**Target keyword cluster:** "MIDI hardware for conservatory", "university music tech equipment list"
**Why this works:** Conservatories' procurement is slow but very loyal once you're in. The page itself is a faculty recruitment tool.
**Internal links to:** Trossingen case study, Stanford case study, /devices/touchme-tuning/.

### Pillar 4: "STEAM Music: Cross-Curricular Lesson Library" (~4,000 words)
**Target keyword cluster:** "STEAM music curriculum", "music + science lesson plans"
**Why this works:** STEAM coordinators (Persona 2) own real budgets and search for this.
**Internal links to:** Lesson 3 (plant + biology), curriculum, standards mapping.

### Pillar 5: "Museum Music Exhibits: How to Build Interactive Music Stations" (~3,500 words)
**Target keyword cluster:** "interactive music exhibit", "family-day music exhibit ideas"
**Why this works:** Museum education staff Google this when budget approves. We'd be one of the only credible voices.
**Internal links to:** Lincoln Center case study.

### Pillar 6: "Playtronica vs Makey Makey — A Practical Comparison for Music Teachers" (~2,500 words)
**Target keyword cluster:** "alternative to Makey Makey for music class", "Playtronica vs Makey Makey"
**Why this works:** Pure intent — someone evaluating their options. Best, honest, side-by-side. Doesn't bash the competitor, just shows where each wins. Makey Makey wins on general-purpose invention; we win on music depth.
**Internal links to:** all our music lessons, our pricing.

### Pillar 7: "How to Buy Music Tech with Title IV-A Funds" (US-specific, ~3,000 words)
**Target keyword cluster:** "Title IV-A music technology grant", "Title IV-A music classroom"
**Why this works:** Save The Music Foundation owns some of this space, but only at the institutional / advocacy level. We can own the practical "here's how to write the grant" angle. Federal funding mention adds credibility.
**Internal links to:** /education/quote/, /education/pricing.

### Pillar 8: "Music Technology in European Conservatories — A Procurement Guide" (EU-specific, German + English, ~3,000 words)
**Target keyword cluster:** "Musikhochschule MIDI Hardware", "conservatory music technology Europe"
**Why this works:** Trossingen is one of 24 Musikhochschulen in Germany. If we rank for the German conservatory query, we capture all 24.
**Internal links to:** Trossingen case study.

---

## Layer 3 — Comparison + role-specific pages (Weeks 4-10)

These are shorter than pillars (~1,500 words) but extremely intent-targeted. Build during pillar weeks.

**Comparison pages:**
- `/education/playtronica-vs-makey-makey/` — see Pillar 6 above
- `/education/playtronica-vs-bareconductive/` — capacitive sensing brands compared
- `/education/best-plant-music-devices/` — we make Biotron (the leader); review category we own

**Role-specific landing pages** (each ~1,500 words):
- `/education/for-music-teachers/` — Persona 1
- `/education/for-steam-coordinators/` — Persona 2
- `/education/for-conservatory-faculty/` — Persona 3
- `/education/for-procurement/` — Persona 4 (also serves as a hub for procurement FAQ)
- `/education/for-special-ed/` — Persona 5
- `/education/for-museum-educators/` — Persona 6
- `/education/for-music-therapists/` — adjacent to Persona 5

**Long-tail / question pages** (each ~800 words):
- `/education/what-is-class-compliant-usb-midi/`
- `/education/what-is-capacitive-sensing-music/`
- `/education/chromebook-music-tech-options/`
- `/education/sensory-room-music-equipment/`
- `/education/title-iv-a-music-grant-template/`
- `/education/ncas-aligned-music-lessons/`

---

## Layer 4 — Off-page (Weeks 5-24)

Backlinks + brand mentions from authoritative ed-tech and music-ed publications. These move the needle on domain authority, which makes everything else above rank faster.

### 4.1 — Publications to pitch (priority order)

| Publication | Contact path | Pitch |
|---|---|---|
| **Edutopia** (edutopia.org) | submission form via /about/contact/faq | "How Lincoln Center for the Performing Arts uses one music-tech tool across classroom, family-day, and composer-in-residence programs" |
| **EdSurge** (edsurge.com/submission-guidelines) | helpdesk.edsurge.com | "Why we made our K-12 music curriculum open-source under CC-BY-4.0" |
| **NAfME Teaching Music magazine** | nafme.org/my-classroom/journals-magazines/teaching-music-magazine-guidelines-for-contributors/ | "Designing music tech for the body, not the keyboard" (frames Lesson 5 as the lede) |
| **NAfME Music Educators Journal** (SAGE peer-reviewed) | SAGE author portal | Long-arc research piece on capacitive-sensing pedagogy. Slow but highest authority. |
| **TI:ME (Technology in Music Education)** | ti-me.org "Get Involved" | Conference proposal for TI:ME national conference. Speaking slot = backlink + Andrey credibility. |
| **Midnight Music podcast** (Katie Wardrobe — midnightmusic.com) | Contact page | Andrey as podcast guest. Katie's audience IS the buyer persona. Single highest-leverage podcast in the niche. |
| **MusTech.Net** (mustech.net) | Contact form | Guest post on music-ed tech. Smaller audience, but founder relationship matters. |
| **Yamaha Educator Hub** (hub.yamaha.com/music-educators) | Editor contact on site | Cross-brand article. Yamaha respects depth in music-tech ed. |
| **SBO+ (School Band & Orchestra magazine)** (sbomagazine.com) | Contact form on site | "How to introduce music tech to a band/orchestra program without disrupting it" |
| **Making Music magazine** (makingmusicmag.com/contributors-guidelines/) | Contributor guidelines page | Family-music angle. Lower SEO value but reaches recreational adult musicians who may be parents. |
| **ISTE Learning Technology Directory** (ltd.iste.org) | ltd-info@iste.org | Paid directory listing. Submit Playtronica with full case-study attached. |
| **Common Sense Education** (commonsense.org/education) | submission queue (paused as of Jan 2026, [unverified current status] — submit anyway) | Product submission for review. When the queue reopens we're in it. |

**Pitch order:** start with Midnight Music podcast (fastest, highest leverage). Edutopia + EdSurge in parallel. Save NAfME journal for month 3-4 (slowest but most authoritative).

### 4.2 — Communities (organic engagement, not posting)

| Community | Members (approx) | Engagement angle |
|---|---|---|
| **r/MusicEd** (reddit) | ~14,000 | Share lesson PDFs when asked. Never lead-gen. Build founder presence as `u/playtronica` over 6 months. |
| **Facebook "I Teach Music Technology!"** | (unverified) | Active practitioner group. Same rule — share artifacts, not product. |
| **Facebook "Music Teachers" (musicpln)** | large | PLN community. Comment on others' posts first; post once a month max. |
| **Midnight Music Community** (paid membership) | (concentrated) | Single most concentrated music-tech-teacher audience. The way in is a podcast spot with Katie Wardrobe (see 4.1). |
| **r/edtech** | larger but tangential | Engage on cross-curricular threads. |
| **LinkedIn music ed groups** | (unverified counts) | Best for procurement officers + admins, not classroom teachers. |
| **TI:ME members + annual conference** | hundreds, very dense | In-person attendance + partner program. ROI per attendee is highest of any channel. |

**Engagement rule:** never post a product link unprompted. When someone asks a question we can credibly answer with one of our pillar pages, we link — labelled as "I work on Playtronica; full disclosure". This rule keeps us welcome over 6 months.

### 4.3 — Backlink-building tactics

- **GitHub README** (`github.com/Playtronica/help`): add prominent link to `/education/`. GitHub backlinks have unusually strong SEO weight.
- **Wikipedia**: Playtronica may merit a Wikipedia article (Centre Pompidou + Sónar + Stanford + Lincoln Center collaboration history clears notability). If we don't have one yet, we should. A neutral editor (not Andrey) writes it; cites our case studies.
- **University course pages**: Trossingen's MIDI research lab page; Stanford d.school course syllabi. Andrey emails the lecturer and offers a "guest module" — typically results in a syllabus link.
- **Conference pages**: every TI:ME, NAfME, ISTE, SXSW EDU appearance creates a conference-page backlink with very high authority.
- **Press releases**: distribute via PR Newswire / Business Wire for Lincoln Center case study (formal announcement). Costs ~$400 per release; yields 50-200 backlinks on average.

---

## Layer 5 — Technical SEO (Weeks 1-2)

Foundation work. Done once, lasts forever.

- **Separate sitemap** — `public/sitemap-education.xml` listing all education URLs (including ones hidden from main nav via `hide_from_nav: true`). Already planned in `docs/EDUCATION-SUBDOMAIN-SETUP.md` Step 5.
- **robots.txt** lists both sitemaps.
- **Google Search Console** verification on `education.playtronica.com` after Roman sets up the subdomain. Submit sitemap. Inspect each lesson + case study URL.
- **Bing Webmaster Tools** verification — same. Bing drives 5-10% of US ed-tech traffic, more in EU.
- **Lighthouse audit** on every education URL. Target: 90+ on all four (Performance, Accessibility, Best Practices, SEO).
- **Core Web Vitals**: LCP < 2.5s, INP < 200ms, CLS < 0.1. Current help-center scores well (Next.js + Tailwind); verify education subtree doesn't regress.
- **Structured data validation** in Google Rich Results Test for every page after schema rollout.
- **hreflang tags** for DE / JP translations when those land in Phase 2.

---

## Layer 6 — Content distribution (Ongoing, Weeks 1-26)

Each pillar / case study / lesson plan needs to be distributed, not just published.

### 6.1 — Email newsletter (start week 4)
Weekly "Playtronica in Classrooms" newsletter. 5-minute read. Lead magnet drives signup (already in place — Lesson 1 PDF). Goal: 500 subs by month 6, 5,000 by month 12.

Content rotation:
- Week 1 of month: new lesson plan or pillar excerpt
- Week 2: case study spotlight (cycling through Lincoln / Stanford / Trossingen / new ones)
- Week 3: educator interview (we interview one music teacher per month, publish on /education/educators/)
- Week 4: deals + news (grant deadlines, ESSER reminders, free PDF refresh)

Newsletter is the single highest-ROI top-of-funnel channel for the ed market. Music teachers read newsletters; they ignore display ads.

### 6.2 — YouTube (start week 8)
Lessons 1-5 as 5-minute video versions. Music teachers binge YouTube for lesson ideas. Each video description links to the full lesson PDF + the device store page. Goal: 10 videos by month 6, 1,000 subs by month 6.

### 6.3 — Pinterest (start week 6)
Surprisingly powerful for teachers. Lesson plan pins (custom 1000×1500 images) drive long-tail traffic for 6-18 months per pin. Goal: 30 pins by month 6, 1,000 monthly Pinterest visits by month 6.

### 6.4 — LinkedIn (start week 6)
For procurement officers + school admins (Persona 4). Andrey posts 2x per week — case studies, behind-the-scenes, lesson features. Goal: 2,000 followers by month 6.

### 6.5 — Don't bother (yet)
- TikTok — high engagement but ed-tech conversions are slow there. Revisit month 12.
- Instagram Reels — same logic.
- Twitter/X — not where music teachers congregate anymore.
- Facebook Ads — paid; SEO strategy is organic-first.

---

## Layer 7 — Conversion optimization (Continuous)

SEO drives traffic. Conversion turns it into revenue. Without conversion, organic visits are vanity.

- **Exit-intent popup** on /education/ landing → free Lesson 1 PDF in exchange for email + role. (Already half-built — lead-magnet form exists. Add exit intent.)
- **5-email nurture sequence** after lead capture:
  - **Day 1** — Welcome + Lesson 1 PDF link + "What you'll need" tip
  - **Day 3** — "How Lincoln Center uses this" case study
  - **Day 7** — Pricing tiers + Class Pack 10 unlock
  - **Day 14** — Pilot program invitation (5 free Class Packs, Fall 2026 cohort)
  - **Day 30** — Live workshop invitation (monthly Zoom for newsletter subs)
- **A/B test pricing tier labels** — "Class Pack 10 €1,380" vs "Standard 10-Student Bundle €1,380". Run via Klaviyo email + dynamic content on landing.
- **A/B test CTA copy** — "Start a quote" vs "See pricing" vs "Talk to Andrey".
- **GA4 funnel** — track Visit → PDF download → Email entered → Quote request → Order placed. Without this funnel we can't optimize.
- **Quote form completion rate** — currently unknown. Add micro-conversions (each field completion logged) to identify drop-off.

---

## 6-month execution timeline

| Month | Weeks | Focus | Owner |
|---|---|---|---|
| **Month 1** (May → Jun) | 1-4 | Layer 1 (on-page) + Layer 5 (technical) + Pillar 1 draft | Andrey + Claude (code) |
| **Month 2** (Jun → Jul) | 5-8 | Pillars 1-2 published + role pages + comparison pages + first pitches sent (Midnight Music, Edutopia, EdSurge) | Andrey (content) + outreach |
| **Month 3** (Jul → Aug) | 9-12 | Pillars 3-4 + first podcast guest spot + newsletter launch | Andrey |
| **Month 4** (Aug → Sep) | 13-16 | Pillars 5-6 + Pinterest + YouTube launch | Andrey + designer for visuals |
| **Month 5** (Sep → Oct) | 17-20 | Pillars 7-8 + NAfME submission + ISTE directory listing | Andrey |
| **Month 6** (Oct → Nov) | 21-24 | Optimization + A/B tests + 2nd-wave outreach + measurement review | Andrey |

---

## KPIs + measurement

Reviewed at start of every month.

| Metric | Month 1 target | Month 3 target | Month 6 target |
|---|---|---|---|
| Monthly organic visits to /education/ | 100 | 1,000 | 5,000 |
| Indexed pages in Google for education.playtronica.com | 10 | 50 | 200 |
| Backlinks to education pages | 5 | 30 | 150 |
| Newsletter subscribers | 50 | 300 | 1,500 |
| Quote-form submissions (institutional) | 5 | 25 | 100 |
| Closed Class Pack 10+ orders attributed to SEO | 0 | 3 | 20 |
| Google search impressions for "music technology lesson plans" cluster | 500 | 5,000 | 25,000 |

**Tools to track:**
- Google Search Console — impressions, clicks, average position per query
- Google Analytics 4 — sessions, conversions, attribution
- Ahrefs or SEMrush (paid, ~$100/mo) — backlink + keyword tracking
- Klaviyo — email funnel + nurture metrics
- Manual log — outreach pitches sent + replies received (spreadsheet)

---

## What we will NOT do

Discipline matters. These tempting tactics are excluded from this strategy:

- **Paid Google Ads.** SEO is organic-first. Ads can come month 6+ if we have budget surplus.
- **Black-hat link buying.** Penalty-prone. Domain-authority gains from links bought via low-quality networks evaporate when Google catches up.
- **Mass-comment spam in communities.** Single fastest way to get banned and lose 6 months of community goodwill.
- **AI-generated pillar content.** The pillars must be written by Andrey (or a music-ed writer he commissions). Generic AI content ranks for nothing in 2026 and damages brand.
- **Translating all 8 pillars into 5 languages.** Translate only the EU-specific pillar 8 (DE) and the Stanford case study (already English-only is fine). Other translations come later if there's demand signal.
- **Building a separate education-only blog.** All content lives at education.playtronica.com under existing structure. One domain, one funnel, one analytics view.
- **Trying to rank for "music technology" alone.** Too broad, too crowded (it's been won by Berklee and Wikipedia). We target the long tail.

---

## Quick-win priorities — first 14 days

If we only had two weeks, these are the actions in priority order:

1. **Push current education build to production.** (Cloudflare deploy fix already in flight.)
2. **Set up `education.playtronica.com` subdomain.** (Roman handoff doc shipped.)
3. **Add JSON-LD `Course` schema to all 5 lesson pages.** Eight lines of code per page. Single biggest rich-result unlock.
4. **Add `FAQPage` schema to /education/ landing.** Five lines of code.
5. **Pitch Midnight Music podcast.** Single email to Katie Wardrobe. Highest-leverage outreach in the entire strategy. Reply expected within 1-2 weeks.
6. **Submit education sitemap to Google Search Console + Bing Webmaster Tools.** Day 1 of week 2 after subdomain is live.
7. **Write Pillar 1 ("Complete Guide to Music Technology in K-12 Classrooms").** Draft in week 2; publish week 3. Single longest-leverage content piece.

The other 90% of this strategy is paced over 6 months. Don't try to do it all at once. SEO compounds.

---

**Last word.** This is a research-grade plan, but the only thing that ranks is execution. The fastest way to know if the strategy works is to ship Pillar 1 + the schema markup + the subdomain by end of June 2026, then watch the Search Console numbers move (or not) for 4 weeks. Adjust from data, not from theory.
