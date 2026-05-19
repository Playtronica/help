import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPages, SECTION_TITLES } from "@/lib/content";

export async function generateStaticParams() {
  return Object.keys(SECTION_TITLES).map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: { section: string } }) {
  const sec = SECTION_TITLES[params.section];
  if (!sec) return {};
  return {
    title: `${sec.title} — Playtronica Help`,
    description: `Browse all ${sec.title.toLowerCase()} articles.`,
  };
}

export default function SectionIndex({ params }: { params: { section: string } }) {
  const sec = SECTION_TITLES[params.section];
  if (!sec) return notFound();
  const pages = getAllPages().filter(
    (p) => p.section === params.section && !p.hide_from_nav,
  );

  const order = Object.keys(SECTION_TITLES).indexOf(params.section) + 1;
  const num = String(order).padStart(2, "0");

  return (
    <article>
      <nav className="mb-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-soft">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span className="mx-1.5 text-rule-soft">/</span>
        <span className="text-ink">{sec.title}</span>
      </nav>

      <header className="mb-6 flex items-baseline gap-3 border-b-[1.5px] border-rule pb-4">
        <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft">/ {num}</span>
        <h1 className="font-mono text-[clamp(24px,4vw,32px)] font-bold leading-tight tracking-tight">
          {sec.emoji ? <span className="mr-2">{sec.emoji}</span> : null}
          {sec.title}
        </h1>
        <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          {pages.length} pages
        </span>
      </header>

      {pages.length === 0 ? (
        <p className="text-ink-soft">No articles yet in this section.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {pages.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${p.section}/${p.slug}/`}
                className="flex h-full min-h-[110px] flex-col gap-2 border-[1.5px] border-rule bg-white p-4 transition hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-block-sm"
              >
                <div className="font-bold leading-tight">
                  {p.emoji ? <span className="mr-1">{p.emoji}</span> : null}
                  {p.title}
                </div>
                {p.summary && <p className="text-[14px] leading-snug text-ink-soft">{p.summary}</p>}
                <div className="mt-auto font-mono text-[11px] text-accent">Open →</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
