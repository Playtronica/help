import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Standards alignment — Playtronica for Education",
  description:
    "NCAS, UK Model Music Curriculum, NGSS, and ISTE alignment for every Playtronica lesson. A lesson-by-lesson map for procurement teams and music department chairs.",
};

const STANDARDS_TABLE = [
  {
    lesson: "Lesson 1 — Touch as conductor",
    ncas: "MU:Cn10.1.Ka",
    ukmmc: "KS1 Listen + Experiment",
    ngss: "K-PS2",
    iste: "1.4 (emerging)",
  },
  {
    lesson: "Lesson 2 — Music from the orchard",
    ncas: "MU:Cr2.1.4a",
    ukmmc: "KS2 Compose",
    ngss: "4-PS3-2",
    iste: "1.4",
  },
  {
    lesson: "Lesson 3 — The plant that plays itself",
    ncas: "MU:Re7.1.5a",
    ukmmc: "KS2-3 Listen + Respond",
    ngss: "4-LS1-1, MS-LS1-3",
    iste: "1.5",
  },
  {
    lesson: "Lesson 4 — Pattern, pulse, sequence",
    ncas: "MU:Cr1.1.7a + MU:Cr2.1.7b",
    ukmmc: "KS3 Compose",
    ngss: "—",
    iste: "1.4",
  },
  {
    lesson: "Lesson 5 — Composing for the body",
    ncas: "MU:Cn11.1.8a",
    ukmmc: "KS3-4 Connect",
    ngss: "—",
    iste: "1.5",
  },
];

export default function StandardsPage() {
  return (
    <article className="-mx-4 -mt-6 md:-mx-0">
      <section className="border-b-[1.5px] border-rule bg-bg px-4 py-10 md:px-0 md:py-14">
        <Link
          href="/education/"
          className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft hover:text-accent"
        >
          ← Playtronica for Education
        </Link>
        <h1 className="mt-4 font-mono text-[clamp(28px,5vw,46px)] font-bold leading-tight">
          Standards alignment
        </h1>
        <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-ink-soft">
          Every Playtronica lesson maps to recognised music + STEAM standards. This page is here so
          your music department chair, your procurement officer, or your curriculum coordinator
          doesn&apos;t have to hunt for the mapping.
        </p>
      </section>

      <section className="border-b-[1.5px] border-rule px-4 py-10 md:px-0">
        <h2 className="font-mono text-[18px] font-bold uppercase tracking-tight">
          Lesson-by-lesson alignment
        </h2>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full border-[1.5px] border-rule text-[13px]">
            <thead className="bg-soft">
              <tr>
                <th className="border-b-[1.5px] border-rule p-3 text-left font-mono text-[11px] uppercase tracking-[0.06em]">
                  Lesson
                </th>
                <th className="border-b-[1.5px] border-rule p-3 text-left font-mono text-[11px] uppercase tracking-[0.06em]">
                  NCAS (US)
                </th>
                <th className="border-b-[1.5px] border-rule p-3 text-left font-mono text-[11px] uppercase tracking-[0.06em]">
                  UK MMC
                </th>
                <th className="border-b-[1.5px] border-rule p-3 text-left font-mono text-[11px] uppercase tracking-[0.06em]">
                  NGSS
                </th>
                <th className="border-b-[1.5px] border-rule p-3 text-left font-mono text-[11px] uppercase tracking-[0.06em]">
                  ISTE
                </th>
              </tr>
            </thead>
            <tbody>
              {STANDARDS_TABLE.map((r) => (
                <tr key={r.lesson}>
                  <td className="border-b border-rule p-3 align-top">{r.lesson}</td>
                  <td className="border-b border-rule p-3 align-top font-mono">{r.ncas}</td>
                  <td className="border-b border-rule p-3 align-top">{r.ukmmc}</td>
                  <td className="border-b border-rule p-3 align-top font-mono">{r.ngss}</td>
                  <td className="border-b border-rule p-3 align-top font-mono">{r.iste}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[12px] text-ink-soft">
          Lessons 6-15 (Class Pack only) extend coverage to NCAS Perform + Respond strands, MMC
          KS4, and full ISTE 1.4 / 1.5 / 1.6.
        </p>
      </section>

      <section className="border-b-[1.5px] border-rule px-4 py-10 md:px-0">
        <h2 className="font-mono text-[18px] font-bold uppercase tracking-tight">
          Privacy + data
        </h2>
        <ul className="mt-4 max-w-[70ch] space-y-2.5 text-[14px] leading-relaxed text-ink">
          <li>
            <strong>No student accounts required.</strong> Every device runs without sign-up.
            synth.playtronica.com is anonymous in-browser; no cookies set without consent.
          </li>
          <li>
            <strong>No student PII collected by Playtronica.</strong> Compliance burden on the
            school is effectively zero.
          </li>
          <li>
            <strong>Open-source.</strong> Help-center repo is MIT (code) + CC-BY-4.0 (content) at{" "}
            <a
              href="https://github.com/Playtronica/help"
              className="text-accent hover:underline"
              rel="noopener"
            >
              github.com/Playtronica/help
            </a>
            . Schools can audit what we ship.
          </li>
        </ul>
      </section>

      <section className="px-4 py-12 md:px-0">
        <h2 className="font-mono text-[18px] font-bold uppercase tracking-tight">
          Procurement documents — available on request
        </h2>
        <p className="mt-3 max-w-[60ch] text-[14px] leading-relaxed text-ink-soft">
          For purchase orders, your finance office may need supporting documentation. Tick the
          relevant box on the quote form and we bundle the right packet for your jurisdiction —
          usually returned within 1 business day.
        </p>
        <Link
          href="/education/quote/"
          className="mt-6 inline-flex min-h-[44px] items-center border-[1.5px] border-ink bg-ink px-5 py-2 font-mono text-[13px] uppercase tracking-[0.06em] text-bg no-underline transition hover:border-accent hover:bg-accent"
        >
          Open the quote form →
        </Link>
      </section>
    </article>
  );
}
