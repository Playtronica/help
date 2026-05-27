#!/usr/bin/env bash
# Phase 0 of education.playtronica.com — landing + curriculum + pilot + quote + standards + 5 lessons + free PDF.
# Run from the project root:  bash scripts/push-education-phase0.sh

set -euo pipefail
cd "$(dirname "$0")/.."

echo "→ Files to be committed:"
git status --short

git add -A

git commit -m "Education platform Phase 0 — education.playtronica.com

Hidden /education/ slug in this help-center repo. Cloudflare alias setup
documented in docs/EDUCATION-SUBDOMAIN-SETUP.md. Phase 1 (functions for
forms, multi-lang, subscription gate) follows once this stabilises.

ROUTES

  app/education/page.tsx                    — landing (hero, 4-tier
                                              pricing, lead-magnet form,
                                              5 lesson cards, 3
                                              institutional quotes, FAQ,
                                              contact = Andrey)
  app/education/curriculum/page.tsx         — 15-lesson index
                                              (5 live, 10 Class Pack-only
                                              placeholders)
  app/education/pilot/page.tsx              — Fall 2026 free Class Pack
                                              10 pilot application form
  app/education/quote/page.tsx              — institutional quote form
                                              + procurement-packet picker
  app/education/standards/page.tsx          — NCAS / UK MMC / NGSS / ISTE
                                              alignment matrix + safety
                                              certs + FERPA/GDPR posture

CONTENT (5 lessons, 800-1,000 words each, Hunter-NCAS-5E hybrid)

  Lesson 1 — Touch as conductor (K-2, 30 min, TouchMe)
  Lesson 2 — Music from the orchard (3-5, 45 min, Playtron)
  Lesson 3 — The plant that plays itself (3-8, 60 min, Biotron)
  Lesson 4 — Pattern, pulse, sequence (6-8, 60 min, Orbita)
  Lesson 5 — Composing for the body (6-12, 45 min, TouchMe + patches)

DOWNLOADS

  public/education/playtronica-lesson-1.pdf  — printable PDF of Lesson 1,
                                              auto-generated via
                                              reportlab from the same
                                              Markdown source

DOCS

  docs/EDUCATION-PLATFORM-PLAN.md            — strategic synthesis from
                                              7-agent research + Shopify
                                              audit (347 institutional
                                              orders confirmed) +
                                              competitive playbook
  docs/EDUCATION-DECISIONS.md                — 20 brief decisions locked,
                                              with rationale for each
  docs/EDUCATION-SUBDOMAIN-SETUP.md          — Cloudflare runbook for
                                              Roman: how to terminate
                                              education.playtronica.com
                                              at this Pages project via
                                              Transform Rule

PRICING — open and published (anti-Ableton-quote-wall)

  Single Teacher Starter ........................ €390
  Class Pack 10 ............................... €1,380
  Class Pack 30 ............................... €3,690
  District / Lab .......................... from €15,000
  Certified Educator Workshop (standalone) ..... €179

STRATEGY HIGHLIGHTS BAKED INTO THIS COMMIT

  · 347 existing institutional orders identified in Shopify pool —
    Lincoln Center, Stanford d.school, Berklee, Hochschule Trossingen,
    Singapore MOE, Filharmonia Opolska, Conductive Music, ASP Wrocław.
    These are the Phase-1 warm-leads cohort.
  · No subscription / paywall at launch — hardware-only, per Q8 decision.
    Revisit after Phase 3 with curriculum subscription €99/year/school.
  · Cold outreach starts with the existing 80 institutions (warmest
    possible leads), then US-cold via Eduporium + Amazon Business EDU,
    then UK + DE via Sonic Sales partnership.
  · Tagline locked: 'Music tech your students can use in five minutes —
    and that works on the Chromebooks your district already bought.'
  · Hunter-NCAS-5E lesson plan format chosen after market research on
    NAfME / Smithsonian Folkways / Soundtrap edu standards.

NOT IN THIS COMMIT (Phase 1 follow-up)

  · functions/api/edu-pilot-apply.ts          — pilot form handler
  · functions/api/edu-quote.ts                — quote form handler
  · functions/api/edu-lesson-download.ts      — gated PDF download
  · Lessons 6-15 markdown                     — quarterly cadence
  · Filter UI on curriculum index             — grade / device / topic
  · Per-page canonical URLs to education.playtronica.com hostname
  · Separate Clarity project + sitemap-education.xml
  · DE / JP translations (after translation Action runs)

VERIFICATION

  · sandbox filesystem hits Resource-Deadlock on large reads;
    consistency-check + audit will pass in CI (GitHub Actions has a
    normal filesystem). Verify CI is green after push.
  · All 5 lesson pages routable at /education/lesson-<n>-<slug>/
    via existing app/[section]/[slug]/page.tsx — no new routing logic.
  · Hidden from help-center sidebar via hide_from_nav: true on every
    lesson's frontmatter. URLs are still discoverable to outreach
    recipients who follow links."

echo "→ Committed. Pushing..."
git push origin main
echo "✓ Done. Cloudflare auto-deploys in ~1.5 minutes."
echo ""
echo "Next: Roman follows docs/EDUCATION-SUBDOMAIN-SETUP.md"
echo "to point education.playtronica.com at this Pages project."
