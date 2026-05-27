import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a quote — Playtronica for Education",
  description:
    "Institutional quote form. POs accepted, formal VAT invoices issued, W-9 + COI + DPIA available on request. We reply within 1 business day.",
};

export default function QuotePage() {
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
          Institutional quote
        </h1>
        <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-ink-soft">
          For schools, districts, universities, museums, and after-school programs. We issue
          formal VAT invoices, accept POs, and set up as a vendor in most procurement systems
          within one business day.
        </p>
      </section>

      <section className="border-b-[1.5px] border-rule px-4 py-10 md:px-0">
        <h2 className="font-mono text-[14px] font-bold uppercase tracking-tight">
          What we can include in your quote
        </h2>
        <ul className="mt-4 space-y-1.5 text-[14px] leading-relaxed text-ink">
          <li>Devices (any combination — see the <Link href="/devices/compare/" className="text-accent hover:underline">comparison page</Link>)</li>
          <li>Accessories (cables, patches, alligator clips, storage cases)</li>
          <li>Certified Educator Workshop seats (€179 each)</li>
          <li>On-site or remote setup training</li>
          <li>Multi-year curriculum updates</li>
          <li>Replacement-parts replenishment plans</li>
          <li>Bulk discount tiers (5+ units, 25+ units, district-wide)</li>
        </ul>
      </section>

      <section className="px-4 py-12 md:px-0">
        <form
          method="POST"
          action="/api/edu-quote"
          className="max-w-3xl border-[1.5px] border-ink bg-white p-6"
        >
          <h2 className="font-mono text-[14px] font-bold uppercase tracking-tight">
            Request your quote
          </h2>
          <p className="mt-2 text-[13px] text-ink-soft">
            Andrey reads each request personally. Reply within 1 business day.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Your name *
              </span>
              <input
                type="text"
                name="name"
                required
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Email *
              </span>
              <input
                type="email"
                name="email"
                required
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Institution name *
              </span>
              <input
                type="text"
                name="institution"
                required
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Institution type
              </span>
              <select
                name="institution_type"
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              >
                <option value="">Pick one…</option>
                <option>K-12 public school</option>
                <option>K-12 private / independent</option>
                <option>K-12 district</option>
                <option>University / higher ed</option>
                <option>Conservatory / arts school</option>
                <option>Museum / cultural institution</option>
                <option>After-school program / community org</option>
                <option>Ministry / government</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Country *
              </span>
              <input
                type="text"
                name="country"
                required
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                VAT / Tax ID (optional)
              </span>
              <input
                type="text"
                name="vat_id"
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Budget range
              </span>
              <select
                name="budget"
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              >
                <option value="">Pick one…</option>
                <option>Up to €500</option>
                <option>€500 – €2,000</option>
                <option>€2,000 – €5,000</option>
                <option>€5,000 – €15,000</option>
                <option>€15,000+</option>
                <option>Not sure yet</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Timeline
              </span>
              <select
                name="timeline"
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              >
                <option value="">Pick one…</option>
                <option>This week / urgent</option>
                <option>This quarter</option>
                <option>Next fiscal year</option>
                <option>Exploring — no firm date</option>
              </select>
            </label>
          </div>

          <label className="mt-4 flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              Which tier / mix interests you?
            </span>
            <select
              name="tier"
              className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
            >
              <option value="">Pick one…</option>
              <option>Single Teacher Starter (€390)</option>
              <option>Class Pack 10 (€1,380)</option>
              <option>Class Pack 30 (€3,690)</option>
              <option>District / Lab (custom, from €15,000)</option>
              <option>I want to talk through it</option>
            </select>
          </label>

          <label className="mt-4 flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              What are you trying to do? *
            </span>
            <textarea
              name="goal"
              required
              rows={4}
              placeholder="What program, which students, what would success look like for you?"
              className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
            />
          </label>

          <label className="mt-4 flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              Documents you'll need (we'll include them in the quote response)
            </span>
            <div className="grid gap-2 md:grid-cols-2 text-[13px]">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="needs_w9" /> W-9 (US)
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="needs_coi" /> Certificate of Insurance
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="needs_dpa" /> DPA / AVV (EU privacy)
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="needs_warranty_terms" /> Extended warranty terms
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="needs_safety_certs" /> Safety certs (FCC, CE, UKCA)
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="needs_w8ben" /> W-8BEN (we're outside the US)
              </label>
            </div>
          </label>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="inline-flex min-h-[48px] items-center border-[1.5px] border-ink bg-ink px-6 py-3 font-mono text-[13px] uppercase tracking-[0.06em] text-bg no-underline transition hover:border-accent hover:bg-accent"
            >
              Request quote →
            </button>
            <span className="text-[12px] text-ink-soft">
              Reply within 1 business day with quote PDF + any docs you flagged.
            </span>
          </div>
        </form>
      </section>
    </article>
  );
}
