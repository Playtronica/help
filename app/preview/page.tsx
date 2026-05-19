import Link from "next/link";

export const metadata = {
  title: "Design previews — Playtronica Help",
  description: "Compare modern visual directions for the help center.",
};

type Variant = {
  href: string;
  articleHref?: string;
  title: string;
  blurb: string;
  look: string;
  bg: string;
  fg: string;
  badge?: string;
  accent?: string;
};

const fFamily: Variant[] = [
  {
    href: "/preview/soft-brutal/",
    articleHref: "/preview/soft-brutal/article/",
    title: "F1 · Soft brutalism (base)",
    badge: "★ recommended",
    blurb:
      "The base. White cards, hard-rule borders, indigo accent, JetBrains Mono labels only — body in Inter 17 px for easy reading.",
    look: "Notebook DNA + current readability",
    bg: "#fdfcfa", fg: "#15161b", accent: "#4a5cd9",
  },
  {
    href: "/preview/f-serif/",
    articleHref: "/preview/f-serif/article/",
    title: "F2 · Serif display",
    blurb:
      "Same brutal-bento structure, but H1 + H2 in italic serif (Times / PP Editorial). Brings editorial warmth without sacrificing scannable body text. Pull-quotes look gorgeous.",
    look: "Stripe Press × Linear",
    bg: "#fdfcfa", fg: "#15161b", accent: "#4a5cd9",
  },
  {
    href: "/preview/f-warm/",
    articleHref: "/preview/f-warm/article/",
    title: "F3 · Warm gold",
    blurb:
      "Warmer cream palette (#f7f1e3), PCB-gold as primary accent (the gold from the actual board), indigo as secondary for links. Corner-marker on cards. Feels more 'physical workshop'.",
    look: "Playtronica PCB × softer tones",
    bg: "#f7f1e3", fg: "#1a1410", accent: "#b88a47",
  },
];

const otherReadable: Variant[] = [
  {
    href: "/preview/notion-clarity/",
    title: "D · Notion clarity",
    blurb:
      "Maximum readability. White, 18 px Inter, 1.7 line-height, soft rounded cards. Feels like a Notion page.",
    look: "Notion · Linear · GitHub Docs",
    bg: "#ffffff", fg: "#2f2e2e",
  },
  {
    href: "/preview/stripe-docs/",
    title: "E · Stripe-grade docs",
    blurb:
      "Right-rail sticky TOC, ⌘K hint, numbered section chips, feature rows. Polished docs site.",
    look: "Stripe · Vercel · Linear Docs",
    bg: "#ffffff", fg: "#1a1f36",
  },
];

const visualFirst: Variant[] = [
  {
    href: "/preview/notebook/",
    title: "A · Engineer's notebook",
    blurb: "Pure brutalist-monospace. JetBrains Mono everywhere, cream PCB with grid, inverted hover.",
    look: "Linear · OP-1 manual",
    bg: "#f3efe2", fg: "#111111",
  },
  {
    href: "/preview/studio/",
    title: "B · Studio dark",
    blurb: "Near-black + OKLCH indigo/gold glow. Glassy bento, music-at-midnight vibe.",
    look: "Cursor · Anthropic Console",
    bg: "#0a0a0f", fg: "#e8e6dc",
  },
  {
    href: "/preview/magazine/",
    title: "C · Wired-magazine",
    blurb: "Editorial — italic serif display, drop-cap intro, pull-quotes, asymmetric grid.",
    look: "Wired · Stripe Press",
    bg: "#fafaf6", fg: "#1a1a1a",
  },
];

function FamilyCard({ v }: { v: Variant }) {
  return (
    <li className="relative">
      <div
        className="relative block rounded-xl border-2 border-ink shadow-sm transition"
        style={{ background: v.bg, color: v.fg }}
      >
        {v.badge && (
          <span className="absolute -top-3 right-3 z-10 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
            {v.badge}
          </span>
        )}
        <Link
          href={v.href}
          className="block p-4 md:p-5"
          style={{ color: v.fg }}
        >
          <div className="font-mono text-[10px] uppercase tracking-widest opacity-70 md:text-[11px]">Variant</div>
          <div className="mt-1 text-lg font-extrabold md:text-xl">{v.title}</div>
          <p className="mt-2.5 text-[14px] leading-snug" style={{ opacity: 0.85 }}>{v.blurb}</p>
          <div className="mt-3 font-mono text-[10px] opacity-70 md:text-[11px]">
            Reference ↓<br />
            {v.look}
          </div>
        </Link>
        <div className="border-t-2 px-4 py-2 md:px-5" style={{ borderColor: v.fg, opacity: 0.95 }}>
          <div className="flex flex-wrap gap-3 text-xs font-semibold">
            <Link href={v.href} className="inline-flex min-h-[36px] items-center" style={{ color: v.fg }}>
              Home →
            </Link>
            {v.articleHref && (
              <Link
                href={v.articleHref}
                className="inline-flex min-h-[36px] items-center"
                style={{ color: v.accent || v.fg }}
              >
                Article example →
              </Link>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

function SmallCard({ v }: { v: Variant }) {
  return (
    <li>
      <Link
        href={v.href}
        className="block rounded-xl border-2 border-ink p-4 shadow-sm transition active:translate-y-0 hover:-translate-y-1 hover:shadow-lg md:p-5"
        style={{ background: v.bg, color: v.fg }}
      >
        <div className="font-mono text-[10px] uppercase tracking-widest opacity-70 md:text-[11px]">Variant</div>
        <div className="mt-1 text-lg font-extrabold md:text-xl">{v.title}</div>
        <p className="mt-2.5 text-[14px] leading-snug" style={{ opacity: 0.85 }}>{v.blurb}</p>
        <div className="mt-3 font-mono text-[10px] opacity-70 md:text-[11px]">Reference ↓<br />{v.look}</div>
        <div className="mt-4 inline-flex min-h-[36px] items-center gap-1 text-sm font-semibold">
          Open preview →
        </div>
      </Link>
    </li>
  );
}

export default function PreviewIndex() {
  return (
    <div className="space-y-8 md:space-y-10">
      <header>
        <h1 className="text-2xl font-extrabold leading-tight md:text-3xl">Design previews</h1>
        <p className="mt-2 max-w-reading text-[15px] text-gray-700 md:text-base">
          The F family is the readability-first track based on the soft-brutalism direction you liked. Each F variant comes with both a homepage and an article example. The other variants are kept for comparison.
        </p>
        <p className="mt-2 text-xs text-gray-500 md:text-sm">
          Production routes untouched — <code className="rounded bg-soft px-1.5 py-0.5 text-[11px]">/</code> stays as it is until you pick.
        </p>
      </header>

      <nav aria-label="Variant groups" className="-mx-1 flex flex-wrap gap-2 md:hidden">
        <a href="#f-family" className="rounded-full border border-rule bg-white px-3 py-1.5 text-xs font-medium text-ink">
          ★ F family (3)
        </a>
        <a href="#other-readable" className="rounded-full border border-rule bg-white px-3 py-1.5 text-xs font-medium text-gray-700">
          Other readable (2)
        </a>
        <a href="#visual-first" className="rounded-full border border-rule bg-white px-3 py-1.5 text-xs font-medium text-gray-700">
          Visual-first (3)
        </a>
      </nav>

      <section id="f-family" className="scroll-mt-24">
        <div className="mb-3 md:mb-4 md:flex md:items-baseline md:justify-between">
          <h2 className="text-base font-bold md:text-lg">★ F family — soft brutalism (with articles)</h2>
          <p className="mt-0.5 text-xs text-gray-500 md:mt-0 md:text-sm">
            Notebook structure + readable body. Each variant has Home and Article views.
          </p>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {fFamily.map((v) => (
            <FamilyCard key={v.href} v={v} />
          ))}
        </ul>
      </section>

      <section id="other-readable" className="scroll-mt-24">
        <div className="mb-3 md:mb-4 md:flex md:items-baseline md:justify-between">
          <h2 className="text-base font-bold md:text-lg">Other readability-first directions</h2>
          <p className="mt-0.5 text-xs text-gray-500 md:mt-0 md:text-sm">For broader comparison.</p>
        </div>
        <ul className="grid gap-3 md:grid-cols-2 md:gap-4">
          {otherReadable.map((v) => (
            <SmallCard key={v.href} v={v} />
          ))}
        </ul>
      </section>

      <section id="visual-first" className="scroll-mt-24">
        <div className="mb-3 md:mb-4 md:flex md:items-baseline md:justify-between">
          <h2 className="text-base font-bold md:text-lg">Visual-first</h2>
          <p className="mt-0.5 text-xs text-gray-500 md:mt-0 md:text-sm">Distinctive looks. Trade some immediate readability for character.</p>
        </div>
        <ul className="grid gap-3 md:grid-cols-3 md:gap-4">
          {visualFirst.map((v) => (
            <SmallCard key={v.href} v={v} />
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-rule bg-white p-4 md:p-5">
        <h2 className="text-base font-bold md:text-lg">How to evaluate the F family</h2>
        <ol className="ml-4 mt-3 list-decimal space-y-1.5 text-[14px] text-gray-700 md:text-sm">
          <li>For each F variant: open Home, scan the bento, then click Article example.</li>
          <li>On the article: read the first 200 words at a comfortable pace. Did it feel as easy as the current site?</li>
          <li>Check on mobile (⌘+⌥+I → ⌘+⇧+M, or just open <code className="rounded bg-soft px-1.5 py-0.5 text-[11px]">localhost:3001</code> from your phone in the same Wi-Fi).</li>
          <li>Pick one F variant — or tell me to mix ("F1 base + F3 gold accent on CTAs only").</li>
        </ol>
      </section>
    </div>
  );
}
