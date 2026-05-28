# Setting up `education.playtronica.com`

**Audience:** Roman (DNS + Cloudflare) — and anyone who picks this up later.
**Estimated time:** 15 minutes once DNS access is in hand.

This document is the runbook for routing `education.playtronica.com` to the existing help-center Cloudflare Pages project, serving the pages built under `/education/*` in this repo. No second deploy. No separate codebase. One Next.js export, two hostnames.

## Why this approach

`app/education/` is already built inside `help-center/06-build`. The Next.js static export produces an `out/education/index.html`, plus children. We just need the new hostname to terminate at the same Pages project and serve `/education/*` as the site root.

Two reasons:

1. **Phase 0 ships in days.** No second Pages project, no second CI workflow, no parallel content pipeline. Everything reuses the existing build, the existing component library, and the existing analytics.
2. **Migrate later if it earns it.** Once `education.playtronica.com` proves traction (own metrics, own pace of change, own funding gate), we can split it out — `app/education/` lifts cleanly into its own repo. This is the same trade help-center will eventually make for synth / shop / settings.

## Step 1 — Cloudflare Pages custom domain

In the Cloudflare dashboard:

1. Workers & Pages → **the help-center Pages project** → Custom domains.
2. **Set up a custom domain** → `education.playtronica.com`.
3. Cloudflare creates the CNAME record automatically (since `playtronica.com` is on Cloudflare DNS).
4. SSL certificate provisions in ~60 seconds. Confirm `https://education.playtronica.com/` returns a 200 (will show the help-center home until the redirect/rewrite rule in Step 2 lands).

## Step 2 — Path rewriting (the critical step)

By default `education.playtronica.com/` will hit `https://help.playtronica.com/` (which is the project root — the help-center home). We want the `/education/` subtree to *be* the site root for the new hostname.

Use **Cloudflare Pages Functions** with a single `[host].ts` middleware, or — simpler — use **Cloudflare Bulk Redirects + URL Rewrites**:

### Option A: Cloudflare Transform Rule (recommended)

This rewrites the path silently on each request, so the user's URL bar stays clean (`education.playtronica.com/pilot/` not `education.playtronica.com/education/pilot/`).

1. Cloudflare dashboard → `playtronica.com` zone → Rules → **Transform Rules** → URL Rewrite → Create rule.
2. **Rule name:** `education.playtronica.com — prepend /education path`
3. **When incoming requests match:**
   - Field: `Hostname`
   - Operator: `equals`
   - Value: `education.playtronica.com`
4. **Then rewrite URL → Path → Dynamic:**
   - `concat("/education", http.request.uri.path)`

   *(If `http.request.uri.path` is already `/education/something/`, we don't double-prepend — guard with an `if`: `if (starts_with(http.request.uri.path, "/education") then http.request.uri.path else concat("/education", http.request.uri.path))`. Cloudflare's expression editor will accept that one-liner.)*

5. Save and deploy. Test:
   - `https://education.playtronica.com/` → renders `app/education/page.tsx`.
   - `https://education.playtronica.com/pilot/` → renders `app/education/pilot/page.tsx`.
   - `https://education.playtronica.com/lesson-1-touch-as-conductor/` → renders the markdown lesson.

### Option B: a tiny Pages Function

If Transform Rules are unavailable on your plan, drop this at `functions/_middleware.ts` (note: this is a file in the help-center repo, not in `app/`):

```ts
// functions/_middleware.ts
export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  if (url.hostname === "education.playtronica.com" && !url.pathname.startsWith("/education")) {
    url.pathname = "/education" + (url.pathname === "/" ? "" : url.pathname);
    return context.env.ASSETS.fetch(new Request(url, context.request));
  }
  return context.next();
};
```

This achieves the same effect. Slightly more flexible (you can hide `/education/` from canonical link tags in HTML if needed later). Slightly slower (an extra function invocation per request).

**Choose Transform Rule first.** It's free, ops-light, and zero-latency. Drop the Pages Function only if you find a case Transform Rule can't handle.

## Step 3 — Canonical URLs in the HTML

The pages under `app/education/` were built with `/education/...` paths in mind. After Step 2, the URL bar says `education.playtronica.com/pilot/` but the rendered HTML still contains hrefs like `/education/pilot/`. Browsers resolve relatively so links work — but for SEO cleanliness, we should:

1. **Update `metadataBase`** in `app/layout.tsx` to support both hostnames. Already set to `https://help.playtronica.com`; leave that. Next.js will emit absolute canonical URLs based on that.
2. **Per-page canonical tag**: at `app/education/page.tsx` and children, set `metadata.alternates.canonical` to `https://education.playtronica.com/<path>/` so Google indexes the new hostname, not the `help.playtronica.com/education/...` mirror.

There's a small helper I can add — `lib/page-meta.ts` exports an `educationMetadata()` factory that builds canonical URLs against `education.playtronica.com`. Phase 1 task — flagged in `docs/PENDING-TASKS.md`.

For now Step 1 + Step 2 are enough for everything except Google indexing. Google won't index the new URLs until the canonical tag lands, which is fine — we don't want indexing until the page is content-final anyway.

## Step 4 — Analytics segmentation

After the subdomain is live, we want to see education traffic separately from help-center traffic.

- **Cloudflare Web Analytics:** Add `education.playtronica.com` to the existing site definition. Auto-segmented in the dashboard.
- **Microsoft Clarity:** If the env var `NEXT_PUBLIC_CLARITY_ID` is the same project, all sessions land together. To split: create a second Clarity project, build with a different env var per deploy. Phase 1 task.
- **Google Analytics 4** (if enabled): GA4 segments by hostname automatically. No code change.

## Step 5 — Sitemap + robots

`public/sitemap.xml` is generated from `content/en/*.md` by `scripts/build-seo-files.mjs`. The education pages with `hide_from_nav: true` will currently NOT appear in the sitemap. We want them in the education-domain sitemap, not in the help-center sitemap.

Options:

1. **Simplest:** add the `app/education/page.tsx`, `pricing`, `pilot`, `quote`, `standards` URLs to a separate `public/education/sitemap.xml`, generated by a small script. Done as a Phase 1 task.
2. **Best:** modify `scripts/build-seo-files.mjs` to emit two sitemaps — `sitemap.xml` (help-center pages only) and `sitemap-education.xml` (education pages only). robots.txt declares both. Each hostname's robots resolves to its own sitemap line.

robots.txt change:

```
Sitemap: https://help.playtronica.com/sitemap.xml
Sitemap: https://education.playtronica.com/sitemap-education.xml
```

## Step 6 — Test checklist before announcing

Once everything is up, verify all of these from an incognito browser. If any fail — stop and fix before announcing to anyone.

- [ ] `https://education.playtronica.com/` renders the education landing
- [ ] `https://education.playtronica.com/pilot/` renders the pilot form
- [ ] `https://education.playtronica.com/quote/` renders the quote form
- [ ] `https://education.playtronica.com/curriculum/` renders the curriculum index
- [ ] `https://education.playtronica.com/lesson-1-touch-as-conductor/` renders Lesson 1
- [ ] `https://education.playtronica.com/standards/` renders the standards page
- [ ] Free PDF download link works: `https://education.playtronica.com/education/playtronica-lesson-1.pdf` (note: the actual path depends on Step 2 rewriting — verify)
- [ ] All internal hrefs work (no `/education/education/` double-prefix bugs)
- [ ] SSL cert is valid (Cloudflare green padlock)
- [ ] Page loads under 1 second from US + EU + JP
- [ ] Help-center is unaffected — `https://help.playtronica.com/devices/biotron/` still works

## Step 7 — Form endpoints (Phase 1)

The forms on `/pilot/`, `/quote/`, and the `/` lead-magnet POST to:

- `/api/edu-pilot-apply`
- `/api/edu-quote`
- `/api/edu-lesson-download`

None of these endpoints exist yet. They'll be Cloudflare Pages Functions at:

- `functions/api/edu-pilot-apply.ts`
- `functions/api/edu-quote.ts`
- `functions/api/edu-lesson-download.ts`

Each accepts POST, writes a Klaviyo profile (with `edu-segment` tag), notifies `manirko@playtronica.com`, and (for the lesson download) returns a signed URL to the PDF.

Phase 1 task — for now the forms will submit and 404. The visible form is the value; the wiring is the Phase 1 follow-up. We can also use a stop-gap: Formspree / Tally as a free intermediary for the first 100 submissions.

## What's outside this doc

- Domain DNS purchase / transfer — already handled, education.playtronica.com is part of the existing zone.
- Email forwarding (manirko@playtronica.com) — already routes correctly.
- Translation (DE / JP) — Phase 2, triggered after the translation pipeline runs cleanly.
- Subscription / paywall — none at launch. Future C5-style if we add a curriculum subscription.

## What to tell Andrey when this is live

> "education.playtronica.com is live. The first 5 free lessons render. The pilot form, quote form, and free PDF download all work. Forms route to your inbox via Formspree until we wire Cloudflare Functions next week. You can share the URL today."
