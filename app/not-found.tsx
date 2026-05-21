import Link from "next/link";

export const metadata = {
  title: "Page not found",
  description: "That page does not exist. Find what you need from here.",
  robots: { index: false, follow: true },
};

// Custom 404. A lost reader on an ecommerce help center must never dead-end —
// every path here leads somewhere useful: the most-asked pages, search, or
// the contact route.
const RESCUE_LINKS: { href: string; emoji: string; label: string; meta: string }[] = [
  { href: "/getting-started/your-first-5-minutes/", emoji: "🚀", label: "Your first 5 minutes", meta: "from box to first sound" },
  { href: "/troubleshooting/hub/", emoji: "🔧", label: "Troubleshooting hub", meta: "something is not working" },
  { href: "/orders/track-your-order/", emoji: "🔍", label: "Track your order", meta: "where is my package" },
  { href: "/getting-started/which-device/", emoji: "🎛️", label: "Which device do I have?", meta: "tell them apart" },
];

export default function NotFound() {
  return (
    <article className="mx-auto max-w-[60ch]">
      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
        Error 404
      </div>

      <h1 className="mt-3 font-mono text-[clamp(28px,5vw,44px)] font-bold leading-[1.05] tracking-tight">
        This page does not exist
      </h1>

      <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
        The link may be old, or the page may have moved when the help center was
        rebuilt. Nothing is lost — pick a starting point below, or use the search
        box at the top of the page.
      </p>

      <hr className="my-7 border-0 border-t-[1.5px] border-rule" />

      <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
        Most-asked pages
      </div>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {RESCUE_LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="flex items-center gap-3 border-[1.5px] border-rule bg-white px-3 py-2.5 text-[15px] transition hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-block-sm"
            >
              <span className="text-xl">{l.emoji}</span>
              <span className="min-w-0">
                <span className="block font-medium">{l.label}</span>
                <span className="block font-mono text-[11px] text-ink-soft">{l.meta}</span>
              </span>
              <span className="ml-auto font-mono text-[11px] text-accent">→</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-7 border-[1.5px] border-rule bg-soft px-4 py-3 text-[14px] text-ink">
        Still cannot find it? <Link href="/" className="text-accent hover:underline">Go to the homepage</Link>{" "}
        or <a href="mailto:support@playtronica.com" className="text-accent hover:underline">email support@playtronica.com</a>.
      </div>
    </article>
  );
}
