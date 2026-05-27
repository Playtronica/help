import Link from "next/link";
import type { Metadata } from "next";
import { getAllPages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Curriculum — Playtronica for Education",
  description:
    "15 standards-aligned lessons for K-12 music + STEAM. 5 free, 10 more in the Class Pack bundles. NCAS, UK Model Music Curriculum, NGSS, ISTE alignment.",
};

export default function CurriculumIndex() {
  const lessons = getAllPages("en")
    .filter((p) => p.section === "education")
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  // Until all 15 lessons are written, show placeholders for 6-15.
  const placeholders = Array.from({ length: 15 - lessons.length }).map((_, i) => ({
    n: lessons.length + i + 1,
    title: "Coming with Class Pack",
  }));

  return (
    <article className="-mx-4 -mt-6 md:-mx-0">
      {/* Header */}
      <section className="border-b-[1.5px] border-rule bg-bg px-4 py-10 md:px-0 md:py-14">
        <Link
          href="/education/"
          className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft hover:text-accent"
        >
          ← Playtronica for Education
        </Link>
        <h1 className="mt-4 font-mono text-[clamp(28px,5vw,46px)] font-bold leading-tight">
          15-lesson curriculum
        </h1>
        <p className="mt-3 max-w-[60ch] text-[16px] leading-relaxed text-ink-soft">
          Hunter-NCAS-5E hybrid format — the lesson plan shape your district already recognises.
          Each lesson is 30-60 minutes, classroom-tested, web-readable, and downloadable as a
          ready-to-print PDF. The first 5 are free.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-mono uppercase tracking-[0.08em] text-ink-soft">
          <span>5 lessons live</span>
          <span>10 lessons in bundle</span>
          <span>K-2 · 3-5 · 6-8 · 9-12</span>
        </div>
      </section>

      {/* Filter rows */}
      <section className="border-b-[1.5px] border-rule bg-soft px-4 py-6 md:px-0">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px]">
          <span className="font-mono uppercase tracking-[0.08em] text-ink-soft">Filter:</span>
          <span className="font-mono uppercase tracking-[0.06em] text-ink-soft">
            By grade · By device · By topic
          </span>
          <span className="text-ink-soft">
            (filtering wires up in Phase 1 — for now the list is hand-curated by order)
          </span>
        </div>
      </section>

      {/* Lesson list */}
      <section className="px-4 py-10 md:px-0">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {lessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/education/${lesson.slug}/`}
              className="block border-[1.5px] border-rule bg-white p-5 no-underline transition hover:-translate-x-[1px] hover:-translate-y-[1px] hover:border-ink hover:shadow-block-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                  Lesson {String(lesson.order ?? 0).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-accent">
                  Live · Free
                </span>
              </div>
              <h3 className="mt-2 text-[16px] font-semibold leading-snug text-ink">
                {lesson.title}
              </h3>
              <p className="mt-2 text-[13px] leading-snug text-ink-soft">{lesson.summary}</p>
            </Link>
          ))}

          {placeholders.map((p) => (
            <div
              key={p.n}
              className="border-[1.5px] border-dashed border-rule bg-bg p-5 opacity-60"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                  Lesson {String(p.n).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-soft">
                  Class Pack only
                </span>
              </div>
              <h3 className="mt-2 text-[16px] font-semibold leading-snug text-ink">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-snug text-ink-soft">
                Available with the Class Pack 10 bundle and above.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 border-[1.5px] border-ink bg-white p-6">
          <h3 className="font-mono text-[14px] font-bold uppercase tracking-tight">
            Want the other 10 lessons?
          </h3>
          <p className="mt-2 max-w-[60ch] text-[14px] leading-relaxed text-ink-soft">
            Lessons 6-15 ship with the Class Pack 10 bundle (€1,380) and up. They cover
            generative composition, multi-device ensembles, project-based assessment, and
            cross-curricular maker units.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/education/quote/"
              className="inline-flex min-h-[40px] items-center border-[1.5px] border-ink bg-ink px-4 py-2 font-mono text-[12px] uppercase tracking-[0.06em] text-bg no-underline hover:border-accent hover:bg-accent"
            >
              Request a quote →
            </Link>
            <Link
              href="/education/pilot/"
              className="inline-flex min-h-[40px] items-center border-[1.5px] border-rule bg-white px-4 py-2 font-mono text-[12px] uppercase tracking-[0.06em] no-underline hover:border-accent hover:text-accent"
            >
              Apply for free pilot
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
