import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quote request received — Playtronica for Education",
  description: "Thanks for the quote request. Reply within 1 business day.",
  robots: { index: false, follow: false },
};

export default function ThanksQuote() {
  return (
    <article className="mx-auto -mt-6 max-w-[60ch]">
      <section className="border-[1.5px] border-ink bg-white p-8 md:p-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          ∿ Playtronica for Education · quote received
        </div>
        <h1 className="mt-3 font-mono text-[clamp(24px,4vw,36px)] font-bold leading-tight">
          Got it. We'll send your quote within one business day.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          Andrey reads each quote request personally. The reply will include a quote PDF and any
          procurement documents you flagged.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          If your timeline is urgent, reply to the email when it arrives and we'll prioritise.
        </p>

        <h2 className="mt-10 font-mono text-[14px] font-bold uppercase tracking-tight">
          What you can do now
        </h2>
        <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-ink">
          <li>
            <Link href="/education/standards/" className="text-accent hover:underline">
              Review standards alignment
            </Link>{" "}
            — useful to share with your music department or curriculum lead.
          </li>
          <li>
            <Link href="/education/playtronica-lesson-1.pdf" className="text-accent hover:underline">
              Download Lesson 1 PDF
            </Link>{" "}
            — share with the music teacher who'll actually run the program.
          </li>
          <li>
            <Link href="/education/pilot/" className="text-accent hover:underline">
              Read the free pilot program details
            </Link>{" "}
            — applicable if your budget is constrained this year.
          </li>
        </ul>

        <p className="mt-10 text-[12px] text-ink-soft">
          For anything urgent, write directly to{" "}
          <a
            href="mailto:manirko@playtronica.com"
            className="text-accent hover:underline"
          >
            manirko@playtronica.com
          </a>
          .
        </p>
      </section>
    </article>
  );
}
