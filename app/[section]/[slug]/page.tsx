import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPages, getPage, SECTION_TITLES } from "@/lib/content";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { ArticleBody } from "@/components/ArticleBody";

export async function generateStaticParams() {
  return getAllPages().map((p) => ({ section: p.section, slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { section: string; slug: string } }) {
  const p = getPage(params.section, params.slug);
  if (!p) return {};
  return { title: `${p.title} — Playtronica Help`, description: p.summary || "" };
}

export default function ArticlePage({ params }: { params: { section: string; slug: string } }) {
  const p = getPage(params.section, params.slug);
  if (!p) return notFound();
  const sec = SECTION_TITLES[p.section];
  return (
    <article data-pagefind-body>
      {/* Breadcrumb */}
      <nav className="mb-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-soft">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span className="mx-1.5 text-rule-soft">/</span>
        <Link href={`/${p.section}/`} className="hover:text-accent">{sec?.title || p.section}</Link>
        <span className="mx-1.5 text-rule-soft">/</span>
        <span className="text-ink">{p.title}</span>
      </nav>

      {/* Title */}
      <h1
        className="font-mono text-[clamp(24px,4vw,36px)] font-bold leading-[1.1] tracking-tight"
        data-pagefind-meta="title"
      >
        {p.emoji ? <span className="mr-2">{p.emoji}</span> : null}
        {p.title}
      </h1>

      {/* Summary lede */}
      {p.summary && (
        <p className="mt-3 max-w-[60ch] text-[17px] leading-relaxed text-ink-soft">{p.summary}</p>
      )}

      {/* Hairline rule */}
      <hr className="my-6 border-0 border-t-[1.5px] border-rule" />

      {/* Body */}
      <ArticleBody html={p.html} />

      {/* Related / next steps */}
      <RelatedSection section={p.section} currentSlug={p.slug} />

      {/* Feedback */}
      <FeedbackWidget slug={`${p.section}/${p.slug}`} />

      {/* Article meta footer */}
      <div className="mt-8 flex flex-wrap justify-between gap-2 border-t-[1.5px] border-rule pt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
        <span>∿ {sec?.title} / {p.title}</span>
        <span>updated 2026-05</span>
      </div>
    </article>
  );
}

function RelatedSection({ section, currentSlug }: { section: string; currentSlug: string }) {
  const all = getAllPages().filter(
    (p) => p.section === section && p.slug !== currentSlug && !p.hide_from_nav,
  );
  if (all.length === 0) return null;
  return (
    <section className="mt-10 border-t-[1.5px] border-rule pt-6">
      <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
        Related
      </div>
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {all.slice(0, 4).map((r) => (
          <li key={r.slug}>
            <Link
              href={`/${r.section}/${r.slug}/`}
              className="flex items-center gap-3 border-[1.5px] border-rule bg-white px-3 py-2.5 text-[15px] transition hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-block-sm"
            >
              <span className="text-xl">{r.emoji || "•"}</span>
              <span className="font-medium">{r.title}</span>
              <span className="ml-auto font-mono text-[11px] text-accent">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
