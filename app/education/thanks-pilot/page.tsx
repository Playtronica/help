import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Application received — Playtronica Pilot 2026",
  description: "Thanks for applying to the Playtronica Fall 2026 pilot program.",
  robots: { index: false, follow: false },
};

export default function ThanksPilot() {
  return (
    <article className="mx-auto -mt-6 max-w-[60ch]">
      <section className="border-[1.5px] border-ink bg-white p-8 md:p-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          ∿ Playtronica for Education · pilot application received
        </div>
        <h1 className="mt-3 font-mono text-[clamp(24px,4vw,36px)] font-bold leading-tight">
          Got it. Andrey will read this within one business day.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          We review every application personally. If your school is shortlisted, expect a 30-minute
          call to talk about logistics, your students, and what success looks like for you by
          December.
        </p>

        <h2 className="mt-10 font-mono text-[14px] font-bold uppercase tracking-tight">
          What happens next
        </h2>
        <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-ink">
          <li>
            <strong>Within 1 business day:</strong> reply from Andrey with either a clarifying
            question or a calendar invite.
          </li>
          <li>
            <strong>By 31 August 2026:</strong> applications close. We notify all applicants on
            5 September.
          </li>
          <li>
            <strong>15 September 2026:</strong> Class Pack 10 ships to selected schools.
          </li>
          <li>
            <strong>15 December 2026:</strong> case study publishes.
          </li>
        </ul>

        <h2 className="mt-10 font-mono text-[14px] font-bold uppercase tracking-tight">
          While you wait
        </h2>
        <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-ink">
          <li>
            <Link href="/education/playtronica-lesson-1.pdf" className="text-accent hover:underline">
              Download the free Lesson 1 PDF
            </Link>{" "}
            — print it, try it. Lets you see what the curriculum feels like.
          </li>
          <li>
            <Link href="/education/standards/" className="text-accent hover:underline">
              Read the standards alignment
            </Link>{" "}
            — useful if your administrator asks for it.
          </li>
          <li>
            <Link href="/devices/compare/" className="text-accent hover:underline">
              See how the devices compare
            </Link>{" "}
            — the Class Pack 10 bundle is built around TouchMe + Playtron + Biotron.
          </li>
        </ul>
      </section>
    </article>
  );
}
