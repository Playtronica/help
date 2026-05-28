import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPages, getPage, SECTION_TITLES, type Page } from "@/lib/content";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { ArticleBody } from "@/components/ArticleBody";
import { localizedPath, type Lang } from "@/lib/i18n";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://help.playtronica.com";

function buildArticleJsonLd(p: Page, lang: Lang) {
  const sec = SECTION_TITLES[p.section];
  const url = `${SITE_URL}${localizedPath(lang, `/${p.section}/${p.slug}/`)}`;
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: p.title,
    description: p.summary || "",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: lang,
    isPartOf: { "@type": "WebSite", name: "Playtronica Help Center", url: SITE_URL },
    articleSection: sec?.title || p.section,
    publisher: {
      "@type": "Organization",
      name: "Playtronica",
      url: "https://playtronica.com",
      logo: { "@type": "ImageObject", url: "https://playtronica.com/favicon.png" },
    },
    license: "https://creativecommons.org/licenses/by/4.0/",
  };
}

function buildFaqJsonLd(html: string, pageUrl: string) {
  const re = /<details>\s*<summary>(?:<strong>)?([^<]+)(?:<\/strong>)?<\/summary>([\s\S]*?)<\/details>/g;
  const items: Array<{ q: string; a: string }> = [];
  for (const m of html.matchAll(re)) {
    const q = m[1].trim();
    const a = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (q && a) items.push({ q, a });
  }
  if (items.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** Course schema for education lesson pages. Triggers Google Courses rich results. */
function buildCourseJsonLd(p: Page, pageUrl: string) {
  if (!p.grade_band || !p.duration_min || !p.device) return null;
  const isoDuration = `PT${p.duration_min}M`;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${pageUrl}#course`,
    name: p.title,
    description: p.summary || "",
    url: pageUrl,
    inLanguage: "en",
    provider: {
      "@type": "Organization",
      name: "Playtronica",
      sameAs: "https://playtronica.com",
    },
    educationalLevel: p.grade_band,
    teaches: p.standards || [],
    timeRequired: isoDuration,
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "teacher",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      courseWorkload: isoDuration,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: pageUrl,
      category: "Free lesson plan",
    },
    license: "https://creativecommons.org/licenses/by/4.0/",
  };
}

/** HowTo schema for education lesson pages — Google sometimes surfaces step-rich results. */
function buildHowToJsonLd(p: Page, pageUrl: string) {
  if (!p.grade_band || !p.duration_min) return null;
  // Extract H2/H3 step-like headings from rendered HTML.
  const headingRe = /<(h2|h3)[^>]*>([\s\S]*?)<\/(h2|h3)>/g;
  const steps: string[] = [];
  for (const m of p.html.matchAll(headingRe)) {
    const text = m[2].replace(/<[^>]+>/g, "").trim();
    // Skip non-step headings.
    if (/^(related|footnotes|sources|further reading|standards)$/i.test(text)) continue;
    steps.push(text);
  }
  if (steps.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${pageUrl}#howto`,
    name: p.title,
    description: p.summary || "",
    totalTime: `PT${p.duration_min}M`,
    tool: p.device ? [{ "@type": "HowToTool", name: p.device }] : undefined,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s,
    })),
  };
}

/** Review schema for case-study pages. */
function buildReviewJsonLd(p: Page, pageUrl: string) {
  if (!p.case_study_subject) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${pageUrl}#review`,
    itemReviewed: {
      "@type": "Product",
      name: "Playtronica for Education",
      brand: { "@type": "Brand", name: "Playtronica" },
      url: `${SITE_URL}/education/`,
    },
    author: {
      "@type": "Organization",
      name: p.case_study_subject,
      ...(p.case_study_location && {
        location: { "@type": "Place", name: p.case_study_location },
      }),
    },
    reviewBody: p.summary || "",
    url: pageUrl,
  };
}

export function ArticleView({
  lang,
  section,
  slug,
}: {
  lang: Lang;
  section: string;
  slug: string;
}) {
  const p = getPage(section, slug, lang);
  if (!p) return notFound();
  const sec = SECTION_TITLES[p.section];
  const lp = (path: string) => localizedPath(lang, path);
  const pageUrl = `${SITE_URL}${lp(`/${p.section}/${p.slug}/`)}`;
  const articleLd = buildArticleJsonLd(p, lang);
  const faqLd = buildFaqJsonLd(p.html, pageUrl);
  const courseLd = buildCourseJsonLd(p, pageUrl);
  const howToLd = buildHowToJsonLd(p, pageUrl);
  const reviewLd = buildReviewJsonLd(p, pageUrl);

  return (
    <article data-pagefind-body>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      {courseLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }}
        />
      )}
      {howToLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
        />
      )}
      {reviewLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }}
        />
      )}

      <nav className="mb-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-soft">
        <Link href={lp("/")} className="hover:text-accent">Home</Link>
        <span className="mx-1.5 text-rule-soft">/</span>
        <Link href={lp(`/${p.section}/`)} className="hover:text-accent">{sec?.title || p.section}</Link>
        <span className="mx-1.5 text-rule-soft">/</span>
        <span className="text-ink">{p.title}</span>
      </nav>

      <h1
        className="font-mono text-[clamp(24px,4vw,36px)] font-bold leading-[1.1] tracking-tight"
        data-pagefind-meta="title"
      >
        {p.emoji ? <span className="mr-2">{p.emoji}</span> : null}
        {p.title}
      </h1>

      {p.summary && (
        <p className="mt-3 max-w-[60ch] text-[17px] leading-relaxed text-ink-soft">{p.summary}</p>
      )}

      <hr className="my-6 border-0 border-t-[1.5px] border-rule" />

      <ArticleBody html={p.html} />

      <RelatedSection lang={lang} section={p.section} currentSlug={p.slug} />

      <FeedbackWidget slug={`${p.section}/${p.slug}`} />

      <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t-[1.5px] border-rule pt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
        <span>∿ {sec?.title} / {p.title}</span>
        <a
          href={`https://github.com/Playtronica/help/edit/main/content/en/${p.section}/${p.slug}.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent"
        >
          Edit this page on GitHub →
        </a>
      </div>
    </article>
  );
}

function RelatedSection({
  lang,
  section,
  currentSlug,
}: {
  lang: Lang;
  section: string;
  currentSlug: string;
}) {
  const all = getAllPages(lang).filter(
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
              href={localizedPath(lang, `/${r.section}/${r.slug}/`)}
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
