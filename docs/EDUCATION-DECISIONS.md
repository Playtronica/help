# Education platform — locked decisions

**Status:** all 20 questions resolved as of 2026-05-27. Items 1-8 confirmed by Andrey. Items 9-20 use research-backed defaults; flag any you want to override and I'll revise.

## Confirmed by Andrey (1-8)

| # | Decision | Choice |
|---|---|---|
| 1 | Subdomain build approach | Same help-center repo, hidden `/education/` slug. Cloudflare aliases `education.playtronica.com` to it later. |
| 2 | Hero tagline | *"Music tech your students can use in five minutes — and that works on the Chromebooks your district already bought."* |
| 3 | Pricing | €390 starter / €1,380 class10 / €3,690 class30 / €15K+ district |
| 4 | Sales human | Andrey (founder, on-page email + Calendly) |
| 5 | Lead capture | Free lesson PDF download (single mechanism) |
| 6 | Pilot model | Free Class Pack 10 + case-study + media-rights consent |
| 7 | Outreach geography | Re-engage the 80 existing institutional buyers first |
| 8 | Subscription / recurring | None at launch. Hardware-only. Revisit at Phase 3. |

## Locked defaults (9-20) — research-justified

### 9. Primary persona (headline subject)
**Choice:** Music teacher, middle school (6-8).
**Why:** Largest pain signal in r/musiceducators + Midnight Music + NAfME forums. Middle-school music teachers most often run integrated music+tech programs. Elementary teachers are addressed in lesson-plan grade band; high school is addressed in Class Pack 30 + university tier.

### 10. School type
**Choice:** No filter — accept all.
**Why:** Existing 80 institutional buyers are a 50/50 mix of public + private + conservatories + ministries. Filtering would discard real revenue.

### 11. Grade band on launch
**Choice:** K-12 cross-grade. Higher ed via custom quote.
**Why:** 5-lesson curriculum at launch already spans K-2, 3-5, 6-8, 9-12. Class Pack tiers serve K-12; District/Lab tier absorbs university procurement.

### 12. Page tone
**Choice:** Smart + ironic — same voice as help.playtronica.com.
**Why:** Maintains brand voice continuity. Brutalist-warm tone differentiates from MakeyMakey (playful-flat) and Ableton (corporate-cold). The "anything is an instrument" elevator pitch IS the voice.

### 13. Color palette
**Choice:** Same as help-center — brutalist orange + cream + ink.
**Why:** Speed of build (no new design system). Consistency with help.playtronica.com when readers cross domains. Premium feel without infantilising.

### 14. Hero visual
**Choice:** Custom illustration (matches help-center existing illustrations of TouchMe etc.).
**Why:** Photo of kids requires legal release + casting + photographer = 6-week delay. Illustration is on-brand and ships today.

### 15. Page length / density
**Choice:** Long-form narrative — Apple-product-page style with 5-6 deep sections.
**Why:** Procurement officers need information density. Teachers want to see lesson examples in detail. Short-and-punchy fails the procurement read.

### 16. Lesson plan format on page
**Choice:** Web + PDF download (both).
**Why:** Web for discovery + SEO. PDF for the printable artefact teachers actually carry into class. Cheap to generate both from same Markdown.

### 17. Standards alignment placement
**Choice:** All three — badge bar in hero + dedicated `/standards/` page + per-lesson footer codes.
**Why:** Procurement officers need the dedicated page. Teachers want per-lesson confidence. Badges add quick trust signal for casual visitors.

### 18. Languages at launch
**Choice:** EN only at Phase 0. DE + JP after translation Action runs.
**Why:** EN covers US + UK + Singapore MOE + Berklee + Stanford (largest existing institutional pool). DE matters because of Sonic Sales partnership and Digitalpakt 2.0. JP matters because of SO-21 (+91% organic). ES + FR are lower priority — can come from same Action run.

### 19. Lesson library structure
**Choice:** Hybrid filter — grade + device + topic.
**Why:** A teacher knows which device they have OR which grade they teach OR which topic they need. Single-axis sort fails 2/3 of searches. Filter UI is cheap.

### 20. Founder presence on the site
**Choice:** Small founder mention in footer + Andrey's name + photo on Contact section. No full bio.
**Why:** Educators trust schools and teachers, not founders. Sasha-as-theatre-producer story belongs on playtronica.com (brand), not on the procurement-friendly education site.

## Cross-cutting decisions (operational)

### Lesson plan template
**Hunter-NCAS-5E hybrid** with 14 standardised sections (Title / Grade / Duration / Device / Standards / Enduring Understanding / Essential Question / Objectives / Vocabulary / Materials / Procedure / Assessment / Differentiation / Extension / Teacher Notes). Target length 800-1,000 words per lesson. Research justification in `docs/LESSON-TEMPLATE-RATIONALE.md`.

### Quote SLA on page
"Within 1 business day" — matches help-center SLA across `/orders/*`. Verified consistent.

### Pilot timeline
**Fall 2026 cohort.** Applications open immediately, close 31 August 2026. Shipments 15 September 2026. Case-study delivery by 15 December 2026.

### PD course
**Phase 0:** Free "Playtronica 101" course (text + 5 short videos, self-paced, no certificate). Built into the curriculum pages.
**Phase 2 (Q4 2026):** Paid Certified Educator Workshop €179 (3-hour video + 1h live Q&A with Andrey + certificate).

### Calendly
**Post-quote only.** Quote form submission triggers calendar-booking email. No public-facing Calendly link — preserves Andrey's calendar from cold traffic.

### Case studies on Phase 0
Three written, drafted from existing-buyer data:
- **Lincoln Center for the Performing Arts** — public-facing brand, three orders, education program tie-in.
- **Stanford d.school** — university-meets-K-12-via-EPGY, design-thinking story.
- **Hochschule für Musik Trossingen** — European conservatory, multi-device, distributor (Sonic Sales) link.

Pompidou and Hermès stories already live on the help-center `/professionals/creative-installations/` page — link to them, don't duplicate.

### Bulk-tag existing institutional accounts in Shopify
Pre-launch task: tag the ~80 institutional accounts with `customer_tag = edu-institutional` in Shopify. Without this tag, Klaviyo flows fire to the wrong segment. ~30 min via Shopify admin or one bulk import.

### What gets pushed at Phase 0
- `app/education/` route tree (hidden from sidebar via `hide_from_nav: true`).
- 5 lesson plan markdown files.
- Pricing page.
- Pilot application form (POSTs to support@playtronica.com via Cloudflare Pages Function).
- Quote form (similar).
- Standards alignment page.
- Free lesson PDF generated at build time.
- Cloudflare subdomain config doc for Roman.

### What is NOT in Phase 0 (intentional)
- The other 10 lesson plans (Phase 1: write 1-2/week).
- Paid Certified Workshop (Phase 2).
- Subscription paywall (deferred).
- Multi-language launch (Phase 1 — depends on translation Action).
- Public press / launch announcement (Phase 4).
- Distributor pages for Eduporium / Amazon Business EDU / Douglas Stewart (Phase 3).
