# Post-push checklist

Things to do in the browser AFTER the first `git push` lands. None of these require code. Allow about 20 minutes total.

---

## 1. Repo metadata (5 min)

Open https://github.com/Playtronica/help.

Click the gear ⚙ next to "About" on the right-hand side of the repo home page. Set:

- **Description**: `Open-source documentation, manuals, and troubleshooting for Playtronica MIDI devices. CC-BY-4.0 content, MIT code.`
- **Website**: `https://help.playtronica.com`
- **Topics** (one at a time, hit Enter after each):
  - `help-center`
  - `documentation`
  - `midi`
  - `music-tech`
  - `nextjs`
  - `tailwindcss`
  - `pagefind`
  - `cloudflare-pages`
  - `llms-txt`
  - `ai-search`
  - `markdown`
- Check "Releases" and "Packages" if you want them visible. Uncheck what you don't want.
- Save.

---

## 2. Enable Discussions (2 min)

Settings → General → scroll to "Features" → tick **Discussions** → Set up Discussions.

Pick categories:

- 🗣 **General** — anything that does not fit elsewhere.
- 💡 **Ideas** — feature requests and new-page proposals.
- 🐛 **Bugs** — site or product bugs (also OK as Issues).
- 🤝 **Show and tell** — what you made with Playtronica.
- ❓ **Q&A** — questions with marked-best answers.

This is the long-term home we mentioned on `site/community.md`.

---

## 3. Branch protection on `main` (3 min)

Settings → Branches → Add branch protection rule.

Branch name pattern: `main`. Then tick:

- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging
  - Search for `preflight` (the CI workflow's job name) and add it as required.
- ✅ Require conversation resolution before merging
- ✅ Restrict who can push to matching branches → add yourself

Leave "Require linear history" and "Require deployments to succeed" off for now.

---

## 4. Repo housekeeping (2 min)

Settings → General → scroll down:

- Default branch: `main` (confirm)
- ✅ Automatically delete head branches (cleans up after each merged PR)
- Pull requests: enable squash merging only (turn off merge commits and rebase)

---

## 5. Cloudflare Pages env vars (5 min)

Cloudflare dashboard → Workers and Pages → your `help-center` project → Settings → Environment Variables → Production.

Add:

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_GA4_ID` | `G-XXXXXXXXXX` | From Google Analytics admin. |
| `NEXT_PUBLIC_CLARITY_ID` | `xxxxxxxxxx` | From Microsoft Clarity dashboard. |
| `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` | `xxxxxxxx` | From Cloudflare Web Analytics. |
| `NEXT_PUBLIC_WHATSAPP_FEEDBACK_NUMBER` | `351937910673` | Andrey's WhatsApp, no `+` no spaces. |
| `NEXT_PUBLIC_SITE_URL` | `https://help.playtronica.com` | Used by sitemap, canonical URLs, JSON-LD. |

Save. Trigger a redeploy to pick the variables up.

---

## 5b. Translations — set the API key and run the first batch

The site is multilingual already (routing, switcher, hreflang all live). Until a
page is translated it shows English. To populate the translations:

1. **Add the API secret.** GitHub → Settings → Secrets and variables → Actions →
   New repository secret. Name: `ANTHROPIC_API_KEY`. Value: an Anthropic API key
   from https://console.anthropic.com.
2. **Run the first batch.** Actions tab → **Translate** → Run workflow → leave the
   language field blank (all four) → Run. It translates every untranslated page
   and opens a pull request titled "Translations — sync with English".
3. **Review and merge** that pull request. Cloudflare rebuilds; the translated
   pages go live.
4. From then on the Action runs automatically whenever English content changes —
   it re-translates only what changed and opens a small PR each time.

Check progress any time with `npm run i18n:status`. Full rationale: `docs/I18N.md`.

The first full run translates ~167 pages and costs a few dollars of API usage.

---

## 6. Domain cut-over (the last step before launch)

Cloudflare dashboard → Workers and Pages → Custom domains → Add custom domain → `help.playtronica.com`.

Cloudflare will detect the DNS record (since the domain is on Cloudflare already) and just flip it. SSL takes 1–2 minutes to provision.

Test:

- https://help.playtronica.com → loads.
- https://help.playtronica.com/devices/biotron/ → loads with the new page.
- https://help.playtronica.com/llms.txt → returns the AI-search index file.
- https://help.playtronica.com/sitemap.xml → returns the sitemap.

Then submit the sitemap to:

- Google Search Console → Sitemaps → `https://help.playtronica.com/sitemap.xml`
- Bing Webmaster Tools → Sitemaps → same URL.

---

## 7. Old URL redirects (verify)

`public/_redirects` already has the 301s from the old super.so URLs (e.g. `/biotron` → `/devices/biotron/`). After cut-over, hit each old URL once and confirm it 301s to the new path.

A one-liner to test on macOS:

```bash
for path in /orbita /plant-sound /biotron-advanced /scales /first-steps /tuning \
            /clips /grounding /physics /objects /connecting /ableton /daws \
            /mobile /hardware /online /synths /purchase /playtron /touchme \
            /safety /different-devices /accessories; do
  echo "$path -> $(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' https://help.playtronica.com$path)"
done
```

All should print `301 https://help.playtronica.com/<new-path>/`.

---

## 8. Announce (when ready)

Post in:

- 🐘 Mastodon — link to https://help.playtronica.com with one-sentence intro.
- 📘 Facebook group — pin the post we drafted in `_meta/fb-group-pinned-post.md`.
- 🐙 GitHub — create a `v1.0.0` release tag with the CHANGELOG entry copied in.
- 📨 Customer newsletter — short paragraph plus three "if you ever wondered…" links.
- 🧠 Hacker News — Show HN post when you feel like it.

Do not announce until items 1–7 are done. The first impression a public audience gets is the impression.

---

## 9. First-week monitoring

For the first 7 days after cut-over, check daily:

- Cloudflare Pages → Analytics → Requests, errors, bandwidth.
- Cloudflare Web Analytics → top pages, top countries.
- GA4 → Realtime + Acquisition → confirm tracking works.
- Microsoft Clarity → first session recordings — watch 5 of them.
- GitHub Issues + Discussions → triage anything that came in.

Then settle into the monthly cadence described in `docs/MONTHLY-REFRESH.md`.

---

*Last reviewed: 2026-05-20.*
