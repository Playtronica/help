# Security Policy

## Reporting a vulnerability

If you find a security issue in this repository, please do NOT open a public GitHub issue.

Instead, email **andrey@playtronica.com** with the subject line `Security — [short description]`.

What to include:

- A short description of the issue.
- Steps to reproduce.
- Affected files or URLs.
- Your suggested fix, if you have one.

You will get a reply within 3 business days. Most issues are resolved within two weeks.

## Scope

This repository is a static documentation site. The only meaningful surfaces:

- The Next.js build output (HTML, CSS, JS) served from Cloudflare Pages.
- The `_redirects` file (controls URL rewrites).
- The `_headers` file (controls HTTP response headers).
- Environment variables consumed at build time (all `NEXT_PUBLIC_*`).
- The optional WhatsApp feedback widget (env-var-gated).

What is in scope:

- XSS through Markdown-to-HTML rendering.
- Open redirects through `_redirects`.
- Sensitive header misconfiguration.
- Build-time secret leakage.

What is NOT in scope:

- Issues in third-party services we link to (YouTube, GitHub, Facebook, etc.).
- Issues in the live `playtronica.com` storefront — that is a separate codebase and a separate report channel.
- Theoretical issues that require an attacker with physical access to a contributor's machine.

## Dependency security posture

This site is built with `output: export` — it is a **fully static site**. There is no Node.js server, no serverless functions, no runtime API routes, no middleware in production. Cloudflare Pages serves pre-rendered HTML, CSS, JS, and static assets.

This matters when reading `npm audit` output. Most Next.js advisories target server-side code paths — the Image Optimization API, Server Actions, middleware, the dev server, React Server Component response handling. **None of those code paths exist in a static export at runtime**, so those advisories are not exploitable for this deployment, even when `npm audit` lists them.

Our policy:

- **Patch and minor updates** within the current major version are applied promptly. Next.js is kept current within the `14.2.x` line.
- **Major version upgrades** (for example Next.js 14 → 16) are evaluated during the annual dependency pass described in `docs/MONTHLY-REFRESH.md`, not rushed, because they carry real breaking-change risk.
- A `npm audit` finding that only affects server-side code paths is documented here rather than forced, since forcing it would mean a breaking major upgrade for a non-exploitable issue.

If you find an advisory that **does** apply to static-export output (build-time code execution, a poisoned dependency, an XSS reachable in the shipped HTML/CSS/JS), treat it as in-scope and report it through the channel above.

## Disclosure

After a fix ships, the vulnerability is described in `CHANGELOG.md` under the version it was fixed in. Credit is given to the reporter unless they ask for anonymity.

Thank you for helping keep the help center safe to read.
