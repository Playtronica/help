import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lesson 1 PDF — Playtronica for Education",
  description: "Thank you. Your free lesson PDF is ready to download.",
  robots: { index: false, follow: false },
};

export default function ThanksDownload() {
  return (
    <article className="mx-auto -mt-6 max-w-[60ch]">
      <section className="border-[1.5px] border-ink bg-white p-8 md:p-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          ∿ Playtronica for Education · thank you
        </div>
        <h1 className="mt-3 font-mono text-[clamp(24px,4vw,36px)] font-bold leading-tight">
          Your free Lesson 1 PDF is ready.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          Standards-aligned, classroom-tested, K-2, 30 minutes. Print it, teach it, see if your
          students light up.
        </p>

        <a
          href="/education/playtronica-lesson-1.pdf"
          download
          className="mt-6 inline-flex min-h-[48px] items-center border-[1.5px] border-ink bg-ink px-6 py-3 font-mono text-[14px] uppercase tracking-[0.06em] text-bg no-underline transition hover:border-accent hover:bg-accent"
        >
          📄 Download the PDF →
        </a>

        <h2 className="mt-10 font-mono text-[14px] font-bold uppercase tracking-tight">
          What happens next
        </h2>
        <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-ink">
          <li>No marketing emails. We don't have a list.</li>
          <li>
            If you teach this lesson and it works, drop us a note —{" "}
            <a
              href="mailto:manirko@playtronica.com?subject=I%20taught%20Lesson%201"
              className="text-accent hover:underline"
            >
              manirko@playtronica.com
            </a>
            . We collect classroom stories to help other teachers.
          </li>
          <li>
            Curious about the rest of the curriculum? Lessons 6-15 ship free with any{" "}
            <Link href="/education/" className="text-accent hover:underline">
              Class Pack 10
            </Link>{" "}
            and above.
          </li>
          <li>
            Interested in a free Class Pack 10?{" "}
            <Link href="/education/pilot/" className="text-accent hover:underline">
              Apply for the Fall 2026 pilot
            </Link>{" "}
            — 5 schools selected, applications close 31 August.
          </li>
        </ul>

        <p className="mt-10 text-[12px] text-ink-soft">
          Trouble with the download? Email us — we'll send it directly.
        </p>
      </section>
    </article>
  );
}
