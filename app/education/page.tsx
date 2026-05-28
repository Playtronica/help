import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playtronica for Education — Music tech for K-12 classrooms",
  description:
    "Music tech your students can use in five minutes — and that works on the Chromebooks your district already bought. Standards-aligned curriculum, classroom bundles, and a free pilot program.",
  robots: { index: true, follow: true },
};

const PRICING = [
  {
    name: "Single Teacher Starter",
    price: "€390",
    students: "1 teacher, up to 5 students",
    contents: [
      "1 TouchMe + 1 Playtron",
      "Alligator clips + 8 skin patches",
      "Full curriculum access",
      "Free Playtronica 101 PD course",
    ],
    cta: "Start a quote",
    href: "/education/quote/",
  },
  {
    name: "Class Pack 10",
    price: "€1,380",
    students: "1 classroom up to 20 students",
    contents: [
      "5 TouchMe + 5 Playtron + 1 Biotron",
      "2 patch packs + alligator clip multipack",
      "Storage case",
      "15-lesson curriculum",
      "1 Certified Educator Workshop seat",
    ],
    cta: "Start a quote",
    href: "/education/quote/",
    highlight: true,
  },
  {
    name: "Class Pack 30",
    price: "€3,690",
    students: "Music lab, multi-section",
    contents: [
      "15 TouchMe + 10 Playtron + 3 Biotron + 1 Orbita",
      "Bulk accessories",
      "Full curriculum + 3 PD seats",
      "1h live training (Zoom)",
    ],
    cta: "Start a quote",
    href: "/education/quote/",
  },
  {
    name: "District / Lab",
    price: "from €15,000",
    students: "Custom — districts, university labs, museums",
    contents: [
      "Custom device mix",
      "On-site training option",
      "White-glove setup",
      "Multi-year curriculum updates",
    ],
    cta: "Talk to Andrey",
    href: "/education/quote/",
  },
];

const LESSON_PREVIEW = [
  {
    n: "01",
    grade: "K-2",
    title: "What is sound? Touch as conductor",
    duration: "30 min",
    device: "TouchMe",
    slug: "lesson-1-touch-as-conductor",
  },
  {
    n: "02",
    grade: "3-5",
    title: "Music from the orchard",
    duration: "45 min",
    device: "Playtron",
    slug: "lesson-2-fruit-orchard",
  },
  {
    n: "03",
    grade: "3-8",
    title: "The plant that plays itself",
    duration: "60 min",
    device: "Biotron",
    slug: "lesson-3-plant-that-plays-itself",
  },
  {
    n: "04",
    grade: "6-8",
    title: "Pattern, pulse, sequence",
    duration: "60 min",
    device: "Orbita",
    slug: "lesson-4-pattern-pulse-orbita",
  },
  {
    n: "05",
    grade: "6-12",
    title: "Composing for the body",
    duration: "45 min",
    device: "TouchMe + patches",
    slug: "lesson-5-composing-for-the-body",
  },
];

const INSTITUTIONS = [
  "Lincoln Center for the Performing Arts",
  "Stanford d.school",
  "Berklee College of Music",
  "Hochschule für Musik Trossingen",
  "Centre Pompidou",
  "Garage Museum",
  "Filharmonia Opolska",
  "Conductive Music UK",
  "Singapore Ministry of Education",
];

const FAQ = [
  {
    q: "Will this work on our Chromebooks?",
    a: "Yes. Every Playtronica device is a class-compliant USB MIDI device — no drivers, no installs. Open synth.playtronica.com in the Chromebook's Chrome browser, plug in the device, the student plays. Tested in real classroom Chromebook deployments since 2019.",
  },
  {
    q: "Are the lessons standards-aligned?",
    a: "Yes — each lesson maps to NCAS (US), the UK Model Music Curriculum, NGSS where cross-curricular, and ISTE where tech-integrative. See the standards alignment matrix on the dedicated page.",
  },
  {
    q: "Do you accept Purchase Orders?",
    a: "Yes. We issue formal VAT invoices, accept POs from US school districts, UK Local Authorities, and EU institutions. We can be set up as a vendor in most procurement systems within one business day.",
  },
  {
    q: "What happens if a device breaks in the first month?",
    a: "Free replacement. Our institutional warranty is 1 year US/JP, 2 years EU/UK — extended beyond the consumer 30-day window. We ship replacements within 3 business days of confirmation.",
  },
  {
    q: "Can we try before we buy?",
    a: "Yes — the Fall 2026 pilot program is open. We ship a free Class Pack 10 to 5 selected schools. In return: a written case study + photo/video rights. Applications close 31 August 2026.",
  },
  {
    q: "What if I'm not a music teacher?",
    a: "Lots of our institutional buyers are STEAM coordinators, makerspace leads, or art teachers running cross-curricular music units. The hardware works the same. The curriculum gives entry points for non-music backgrounds.",
  },
];

export default function EducationLanding() {
  return (
    <article className="-mx-4 -mt-6 md:-mx-0">
      {/* ──── Hero ──── */}
      <section className="border-b-[1.5px] border-rule bg-bg px-4 py-10 md:px-0 md:py-16">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
          ∿ Playtronica for Education · K-12
        </div>
        <h1 className="mt-4 max-w-[22ch] font-mono text-[clamp(28px,5vw,52px)] font-bold leading-[1.05] tracking-tight">
          Music tech your students can use in{" "}
          <span className="inline-block border-[1.5px] border-rule bg-hl px-1.5 py-0.5">
            five minutes
          </span>{" "}
          — and that works on the Chromebooks your district already bought.
        </h1>
        <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-ink-soft md:text-[18px]">
          Standards-aligned music technology for K-12. Tangible hardware, browser-based software,
          no installs, no drivers, no IT escalations. Used by Lincoln Center, Stanford d.school,
          Berklee, and conservatories across the EU.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/education/quote/"
            className="inline-flex min-h-[44px] items-center border-[1.5px] border-ink bg-ink px-5 py-2 font-mono text-[13px] uppercase tracking-[0.06em] text-bg no-underline transition hover:border-accent hover:bg-accent"
          >
            Request a quote →
          </Link>
          <Link
            href="/education/pilot/"
            className="inline-flex min-h-[44px] items-center border-[1.5px] border-ink bg-bg px-5 py-2 font-mono text-[13px] uppercase tracking-[0.06em] text-ink no-underline transition hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-block-sm"
          >
            Apply for free pilot
          </Link>
          <Link
            href="/education/curriculum/"
            className="inline-flex min-h-[44px] items-center border-[1.5px] border-rule bg-white px-5 py-2 font-mono text-[13px] uppercase tracking-[0.06em] text-ink-soft no-underline transition hover:border-accent hover:text-accent"
          >
            See the curriculum
          </Link>
        </div>

        {/* Standards badges */}
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-mono uppercase tracking-[0.08em] text-ink-soft">
          <span>NCAS · Aligned</span>
          <span>NGSS · Cross-curricular</span>
          <span>ISTE · 1.4 + 1.5</span>
          <span>UK Model Music Curriculum</span>
          <span>FCC + UKCA · Compliant</span>
        </div>
      </section>

      {/* ──── Who it's for ──── */}
      <section className="border-b-[1.5px] border-rule px-4 py-12 md:px-0">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">/ 01 · Who it's for</div>
        <h2 className="mt-3 font-mono text-[clamp(24px,4vw,36px)] font-bold leading-tight">Four roles, one platform.</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="border-[1.5px] border-rule bg-white p-6">
            <div className="text-2xl">🎼</div>
            <h3 className="mt-2 font-mono text-[16px] font-bold uppercase tracking-tight">Music teacher</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
              You teach music. You want students making real sound on day one. You don't want a
              45-minute tutorial before the bell.
            </p>
            <p className="mt-3 text-[13px] text-ink">
              <strong>Start with:</strong>{" "}
              <Link href="/education/curriculum/" className="text-accent hover:underline">5 free lesson plans</Link>
            </p>
          </div>
          <div className="border-[1.5px] border-rule bg-white p-6">
            <div className="text-2xl">🛠️</div>
            <h3 className="mt-2 font-mono text-[16px] font-bold uppercase tracking-tight">IT admin</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
              You configure devices. Class-compliant USB MIDI — no drivers, no app installs, no
              network egress, no student-account creation, FERPA-friendly.
            </p>
            <p className="mt-3 text-[13px] text-ink">
              <strong>Read:</strong>{" "}
              <Link href="/education/standards/" className="text-accent hover:underline">privacy + compliance</Link>
            </p>
          </div>
          <div className="border-[1.5px] border-rule bg-white p-6">
            <div className="text-2xl">🏛️</div>
            <h3 className="mt-2 font-mono text-[16px] font-bold uppercase tracking-tight">Principal / admin</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
              You approve budgets. Class Pack pricing starts at €1,380 — under most music-supply
              line items. Eligible for ESSER (US) and Digitalpakt 2.0 (DE) funding.
            </p>
            <p className="mt-3 text-[13px] text-ink">
              <strong>See:</strong>{" "}
              <Link href="#pricing" className="text-accent hover:underline">pricing tiers</Link>
            </p>
          </div>
          <div className="border-[1.5px] border-rule bg-white p-6">
            <div className="text-2xl">📋</div>
            <h3 className="mt-2 font-mono text-[16px] font-bold uppercase tracking-tight">Procurement</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
              You process the order. We accept POs, issue VAT invoices, have W-9 + COI on file,
              FCC + UKCA + CE certifications, 1-2 year institutional warranty.
            </p>
            <p className="mt-3 text-[13px] text-ink">
              <strong>Get:</strong>{" "}
              <Link href="/education/quote/" className="text-accent hover:underline">vendor packet by email</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ──── Pricing ──── */}
      <section id="pricing" className="border-b-[1.5px] border-rule px-4 py-12 md:px-0">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">/ 02 · Pricing</div>
        <h2 className="mt-3 font-mono text-[clamp(24px,4vw,36px)] font-bold leading-tight">
          Open prices. No quote-walls.
        </h2>
        <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-ink-soft">
          Most music-tech vendors hide pricing behind "talk to sales". We publish ours. Quotes are
          for delivery logistics, not negotiation.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PRICING.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col border-[1.5px] ${
                tier.highlight ? "border-ink bg-hl" : "border-rule bg-white"
              } p-6`}
            >
              <h3 className="font-mono text-[14px] font-bold uppercase tracking-[0.04em]">{tier.name}</h3>
              <div className="mt-3 font-mono text-[32px] font-bold leading-none">{tier.price}</div>
              <div className="mt-1 text-[12px] uppercase tracking-[0.06em] text-ink-soft">{tier.students}</div>
              <ul className="mt-4 flex-1 space-y-1.5 text-[13px] leading-relaxed text-ink">
                {tier.contents.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span aria-hidden>·</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className="mt-5 inline-flex min-h-[40px] items-center justify-center border-[1.5px] border-ink bg-ink px-3 py-2 font-mono text-[12px] uppercase tracking-[0.06em] text-bg no-underline transition hover:border-accent hover:bg-accent"
              >
                {tier.cta} →
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[13px] text-ink-soft">
          Optional <strong>Certified Educator Workshop €179</strong> — 3-hour video + 1h live Q&A
          with Andrey + certificate. Standalone or bundled.
        </p>
      </section>

      {/* ──── Curriculum preview ──── */}
      <section className="border-b-[1.5px] border-rule px-4 py-12 md:px-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
              / 03 · Curriculum
            </div>
            <h2 className="mt-3 font-mono text-[clamp(24px,4vw,36px)] font-bold leading-tight">
              Five lessons free. Ten more in the bundle.
            </h2>
            <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-ink-soft">
              Every lesson is Hunter-NCAS-5E hybrid format — the shape your district already
              recognises. Web-readable AND printable PDF.
            </p>
          </div>
          <Link
            href="/education/curriculum/"
            className="inline-flex min-h-[40px] items-center border-[1.5px] border-rule bg-white px-4 py-2 font-mono text-[12px] uppercase tracking-[0.06em] no-underline hover:border-accent hover:text-accent"
          >
            All lessons →
          </Link>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {LESSON_PREVIEW.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/education/${lesson.slug}/`}
              className="block border-[1.5px] border-rule bg-white p-5 no-underline transition hover:-translate-x-[1px] hover:-translate-y-[1px] hover:border-ink hover:shadow-block-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                  Lesson {lesson.n}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-soft">
                  {lesson.grade} · {lesson.duration}
                </span>
              </div>
              <h3 className="mt-2 text-[16px] font-semibold leading-snug text-ink">{lesson.title}</h3>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.06em] text-accent">
                {lesson.device}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ──── Free PDF download — lead magnet ──── */}
      <section className="border-b-[1.5px] border-rule bg-soft px-4 py-12 md:px-0">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          / 04 · Free PDF
        </div>
        <h2 className="mt-3 font-mono text-[clamp(24px,4vw,32px)] font-bold leading-tight">
          Download Lesson 1 as a ready-to-print PDF.
        </h2>
        <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-ink-soft">
          Standards-aligned, classroom-tested, 30 minutes, K-2. Print it, teach it, see if your
          students light up. No follow-up emails — we ask for your address only so we can credit
          schools that use it.
        </p>

        <form
          method="POST"
          action="/api/edu-lesson-download"
          className="mt-6 max-w-2xl border-[1.5px] border-ink bg-white p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Email
              </span>
              <input
                type="email"
                name="email"
                required
                placeholder="you@school.edu"
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                School or organization
              </span>
              <input
                type="text"
                name="school"
                required
                placeholder="Lincoln Elementary"
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">Your role</span>
              <select
                name="role"
                required
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              >
                <option value="">Pick one…</option>
                <option>Music teacher</option>
                <option>STEAM coordinator</option>
                <option>IT admin</option>
                <option>Principal / school leader</option>
                <option>Procurement</option>
                <option>Other</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Country
              </span>
              <input
                type="text"
                name="country"
                required
                placeholder="USA"
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              />
            </label>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="inline-flex min-h-[44px] items-center border-[1.5px] border-ink bg-ink px-5 py-2 font-mono text-[13px] uppercase tracking-[0.06em] text-bg no-underline transition hover:border-accent hover:bg-accent"
            >
              Get the lesson PDF →
            </button>
            <span className="text-[12px] text-ink-soft">
              No marketing emails. One follow-up only if your school joins the pilot.
            </span>
          </div>
        </form>
      </section>

      {/* ──── Social proof ──── */}
      <section className="border-b-[1.5px] border-rule px-4 py-12 md:px-0">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          / 05 · Already in classrooms
        </div>
        <h2 className="mt-3 font-mono text-[clamp(24px,4vw,36px)] font-bold leading-tight">
          Used by music programs at:
        </h2>
        <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-ink-soft">
          347 institutional orders since 2023, across K-12, conservatories, universities, and
          public ministries.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {INSTITUTIONS.map((name) => (
            <span
              key={name}
              className="border-[1.5px] border-rule bg-white px-3 py-1.5 font-mono text-[12px] text-ink"
            >
              {name}
            </span>
          ))}
        </div>
        <div className="mt-8 border-l-4 border-accent bg-soft p-5">
          <p className="text-[16px] italic leading-relaxed text-ink">
            "TouchMe in my electroacoustic-composition seminar has students playing within their
            first ten minutes. The classroom feels like a real studio."
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
            Dr. Richard Boulanger · Berklee College of Music
          </p>
        </div>
      </section>

      {/* ──── Pilot CTA ──── */}
      <section className="border-b-[1.5px] border-rule bg-hl px-4 py-12 md:px-0">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          / 06 · Free pilot · Fall 2026
        </div>
        <h2 className="mt-3 font-mono text-[clamp(28px,4.5vw,44px)] font-bold leading-tight">
          5 schools. Free Class Pack 10. One published case study.
        </h2>
        <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-ink">
          We ship a free Class Pack 10 (€1,380 value) to 5 selected schools in September 2026. In
          return: a written case study from your teacher + photo / video rights from your students.
          Applications close 31 August. Case studies published December 2026.
        </p>
        <Link
          href="/education/pilot/"
          className="mt-6 inline-flex min-h-[48px] items-center border-[1.5px] border-ink bg-ink px-6 py-3 font-mono text-[14px] uppercase tracking-[0.06em] text-bg no-underline transition hover:border-accent hover:bg-accent"
        >
          Apply for the pilot →
        </Link>
      </section>

      {/* ──── FAQ ──── */}
      <section className="border-b-[1.5px] border-rule px-4 py-12 md:px-0">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          / 07 · Common questions
        </div>
        <h2 className="mt-3 font-mono text-[clamp(24px,4vw,36px)] font-bold leading-tight">
          Real questions from real schools.
        </h2>
        <div className="mt-6 max-w-4xl space-y-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="group border-[1.5px] border-rule bg-white p-5 [&_summary]:cursor-pointer"
            >
              <summary className="font-mono text-[14px] font-bold uppercase tracking-tight">
                {f.q}
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ──── Contact ──── */}
      <section className="px-4 py-12 md:px-0">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          / 08 · Talk to us
        </div>
        <h2 className="mt-3 font-mono text-[clamp(24px,4vw,36px)] font-bold leading-tight">
          One human reads every email.
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="border-[1.5px] border-rule bg-white p-6">
            <h3 className="font-mono text-[14px] font-bold uppercase tracking-tight">
              Andrey Manirko · founder
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
              Replies within 1 business day. I review every pilot application personally and most
              quote requests too. If your school is a good fit, we'll book a 30-minute call.
            </p>
            <div className="mt-4 space-y-1.5 text-[14px]">
              <div>
                <span className="font-mono text-[11px] uppercase text-ink-soft">Email</span>{" "}
                <a
                  href="mailto:manirko@playtronica.com?subject=Education%20enquiry"
                  className="text-accent hover:underline"
                >
                  manirko@playtronica.com
                </a>
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase text-ink-soft">Subject line</span>{" "}
                <code className="bg-soft px-1.5 py-0.5 text-[12px]">Education — [your school]</code>
              </div>
            </div>
          </div>
          <div className="border-[1.5px] border-rule bg-soft p-6">
            <h3 className="font-mono text-[14px] font-bold uppercase tracking-tight">
              Quick links
            </h3>
            <ul className="mt-3 space-y-2 text-[14px]">
              <li>
                <Link href="/education/quote/" className="text-accent hover:underline">
                  Institutional quote form →
                </Link>
              </li>
              <li>
                <Link href="/education/pilot/" className="text-accent hover:underline">
                  Free pilot application →
                </Link>
              </li>
              <li>
                <Link href="/education/standards/" className="text-accent hover:underline">
                  Standards + privacy compliance →
                </Link>
              </li>
              <li>
                <Link href="/education/curriculum/" className="text-accent hover:underline">
                  Full curriculum library →
                </Link>
              </li>
              <li>
                <Link href="/devices/compare/" className="text-accent hover:underline">
                  How the devices compare →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-[12px] text-ink-soft">
          Playtronica is a small studio founded by Sasha Pas in 2014. Used by classrooms,
          conservatories, festivals (Sónar, CTM), and museums (Centre Pompidou, Garage, Palais de
          Tokyo, Exploratorium). MIT-licensed code, CC-BY-4.0 content. Read more at{" "}
          <a href="https://playtronica.com" className="text-accent hover:underline">
            playtronica.com
          </a>.
        </p>
      </section>
    </article>
  );
}
