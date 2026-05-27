import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Standards alignment + compliance — Playtronica for Education",
  description:
    "NCAS, UK Model Music Curriculum, NGSS, ISTE alignment for every lesson. Plus FCC, UKCA, CE certifications, FERPA-friendly architecture, GDPR/DSGVO compliance.",
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
          Standards + compliance
        </h1>
        <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-ink-soft">
          Every lesson maps to recognised music + STEAM standards. Every device meets safety +
          certification requirements in the markets we ship to. The page is here so your
          procurement officer doesn't have to hunt.
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
          Safety + product certifications
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="border-[1.5px] border-rule bg-white p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              US
            </div>
            <ul className="mt-2 space-y-1 text-[14px] text-ink">
              <li>FCC Part 15 — Class B</li>
              <li>RoHS</li>
              <li>1-year institutional warranty</li>
            </ul>
          </div>
          <div className="border-[1.5px] border-rule bg-white p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              EU
            </div>
            <ul className="mt-2 space-y-1 text-[14px] text-ink">
              <li>CE / RED EN 300 328</li>
              <li>WEEE</li>
              <li>2-year institutional warranty (Verbraucherschutz-konform)</li>
            </ul>
          </div>
          <div className="border-[1.5px] border-rule bg-white p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              UK
            </div>
            <ul className="mt-2 space-y-1 text-[14px] text-ink">
              <li>UKCA (from 2025 onwards)</li>
              <li>2-year institutional warranty</li>
            </ul>
          </div>
          <div className="border-[1.5px] border-rule bg-white p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              JP
            </div>
            <ul className="mt-2 space-y-1 text-[14px] text-ink">
              <li>PSE certification — Q3 2026 (in progress)</li>
              <li>1-year warranty + local distributor support</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b-[1.5px] border-rule px-4 py-10 md:px-0">
        <h2 className="font-mono text-[18px] font-bold uppercase tracking-tight">
          Privacy + data architecture
        </h2>
        <ul className="mt-4 max-w-[70ch] space-y-2.5 text-[14px] leading-relaxed text-ink">
          <li>
            <strong>No student accounts required.</strong> Every device runs without sign-up.
            synth.playtronica.com is anonymous in-browser; no cookies set without consent.
          </li>
          <li>
            <strong>FERPA-friendly architecture.</strong> Because no student PII is collected,
            FERPA's directory-information rules don't apply. Compliance burden on the school is
            effectively zero.
          </li>
          <li>
            <strong>GDPR / DSGVO.</strong> Quote + pilot forms collect contact data only.
            Processing basis: explicit consent + legitimate interest (B2B). DPA / AVV available
            on request, signed within 1 business day.
          </li>
          <li>
            <strong>No data leaves the EU</strong> for forms submitted from EU schools. Cloudflare
            edge with EU residency, no third-party trackers in the production data flow.
          </li>
          <li>
            <strong>Open-source code.</strong> Help-center repo is MIT (code) + CC-BY-4.0 (content)
            at{" "}
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
          Procurement documents — request packet
        </h2>
        <p className="mt-3 max-w-[60ch] text-[14px] leading-relaxed text-ink-soft">
          We can attach the following to any quote response within 1 business day. No need to chase
          a separate compliance team — request them on the quote form and we bundle them.
        </p>
        <ul className="mt-4 grid max-w-[70ch] gap-2 text-[14px] text-ink md:grid-cols-2">
          <li>· W-9 (US)</li>
          <li>· W-8BEN (we're outside US)</li>
          <li>· Certificate of Insurance</li>
          <li>· VAT invoice template</li>
          <li>· DPA / AVV (EU)</li>
          <li>· DPIA template (EU schools)</li>
          <li>· Safety certifications (FCC, CE, UKCA)</li>
          <li>· Extended warranty terms</li>
          <li>· Privacy policy + data-flow diagram</li>
          <li>· Standards mapping per lesson</li>
        </ul>
        <Link
          href="/education/quote/"
          className="mt-6 inline-flex min-h-[44px] items-center border-[1.5px] border-ink bg-ink px-5 py-2 font-mono text-[13px] uppercase tracking-[0.06em] text-bg no-underline transition hover:border-accent hover:bg-accent"
        >
          Request the packet on the quote form →
        </Link>
      </section>
    </article>
  );
}
