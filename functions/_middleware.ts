/**
 * education.playtronica.com → /education/* routing.
 *
 * When a request comes in on the education subdomain, this middleware
 * internally rewrites the path so that `education.playtronica.com/foo/`
 * serves the same content as `help.playtronica.com/education/foo/`.
 *
 * Static assets emitted by the Next.js build at the project root (_next/,
 * fonts, icons, sitemap, robots, llms.txt, pagefind index, illustrations/)
 * pass through unchanged — the browser must be able to fetch them from the
 * same root paths the HTML references. This is the bug the previous
 * Cloudflare Transform Rule had: it rewrote everything, including
 * /_next/static/chunks/*.js, which 404'd because they don't exist under
 * /education/_next/.
 *
 * This middleware replaces the Cloudflare Transform Rule. Delete that rule
 * in the Cloudflare dashboard after this lands — running both at once is
 * redundant and harder to debug.
 *
 * The browser URL bar stays unchanged — this is an internal rewrite via
 * env.ASSETS.fetch(), not an HTTP redirect.
 */

const EDU_HOSTNAME = "education.playtronica.com";

/**
 * Path prefixes that must NOT be rewritten. These are root-level paths the
 * Next.js export expects to serve from "/".
 */
const PASS_THROUGH_PREFIXES = [
  "/_next/", // Next.js chunks, CSS, JS, fonts, media
  "/api/", // Pages Functions endpoints (edu-form, edu-quote, etc.)
  "/_pagefind/", // pagefind search index
  "/illustrations/", // shared illustration assets used across the help center
  "/education/", // already prefixed — don't double-prepend
];

/**
 * Exact-match paths that must NOT be rewritten. These are root-level
 * single-file artefacts the export emits at "/".
 */
const PASS_THROUGH_PATHS = new Set([
  "/sitemap.xml",
  "/sitemap-education.xml",
  "/robots.txt",
  "/llms.txt",
  "/llms-full.txt",
  "/search-index.json",
  "/icon.ico",
  "/apple-icon.png",
  "/og-default.png",
  "/favicon.ico",
  "/favicon.png",
  "/_headers",
  "/_redirects",
]);

function shouldPassThrough(pathname: string): boolean {
  if (PASS_THROUGH_PREFIXES.some((p) => pathname.startsWith(p))) return true;
  if (PASS_THROUGH_PATHS.has(pathname)) return true;
  return false;
}

// Using `any` for the context type to avoid pulling in @cloudflare/workers-types.
// The functions/ folder is already excluded from the main tsconfig typecheck.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onRequest = async (context: any) => {
  const url = new URL(context.request.url);

  // Only rewrite for the education subdomain. Everything else (help.playtronica.com,
  // *.pages.dev preview deploys) is unaffected.
  if (url.hostname !== EDU_HOSTNAME) {
    return context.next();
  }

  // Static asset, API call, or already-prefixed path — pass through unchanged.
  if (shouldPassThrough(url.pathname)) {
    return context.next();
  }

  // Rewrite "/" → "/education/", "/foo/" → "/education/foo/", etc.
  // This includes user-facing content like /playtronica-lesson-1.pdf on the
  // subdomain — which resolves to /education/playtronica-lesson-1.pdf where the
  // file actually lives.
  const targetPath =
    url.pathname === "/" ? "/education/" : `/education${url.pathname}`;
  const rewrittenUrl = new URL(targetPath + url.search, url.origin);

  // Internal fetch — URL bar stays unchanged, content comes from /education/*.
  return context.env.ASSETS.fetch(
    new Request(rewrittenUrl.toString(), context.request),
  );
};
