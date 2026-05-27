import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free pilot program — Playtronica for Education",
  description:
    "5 schools, free Class Pack 10 (€1,380 value), Fall 2026. In return: written case study + photo/video rights from students. Applications close 31 August 2026.",
};

export default function PilotApplication() {
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
          Fall 2026 pilot program
        </h1>
        <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-ink-soft">
          We ship a free Class Pack 10 (€1,380 value) to 5 selected schools in September 2026. In
          return: a written case study from your teacher and photo / video rights from your
          students. That's the whole deal.
        </p>
      </section>

      <section className="border-b-[1.5px] border-rule px-4 py-10 md:px-0">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-mono text-[18px] font-bold uppercase tracking-tight">
              What you get
            </h2>
            <ul className="mt-4 space-y-2.5 text-[14px] leading-relaxed text-ink">
              <li>5 TouchMe + 5 Playtron + 1 Biotron</li>
              <li>2 packs of skin-and-plant patches + alligator clip multipack</li>
              <li>Storage case</li>
              <li>Full 15-lesson curriculum access</li>
              <li>1 seat in the Certified Educator Workshop</li>
              <li>1 hour of direct Zoom support from Andrey during setup week</li>
              <li>1-year institutional warranty</li>
              <li>Total value: €1,380. You pay €0.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[18px] font-bold uppercase tracking-tight">
              What we ask
            </h2>
            <ul className="mt-4 space-y-2.5 text-[14px] leading-relaxed text-ink">
              <li>
                A written case study by the teacher (we provide a template — about 600 words).
              </li>
              <li>Photo and video rights from students (we provide a release form for parents).</li>
              <li>
                One 30-minute end-of-pilot interview with Andrey, recorded for the case study.
              </li>
              <li>
                Permission to name your school publicly. If you can't be named, we won't reject
                you — but we prefer named pilots.
              </li>
              <li>One social media post tagging us when something goes well.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b-[1.5px] border-rule px-4 py-10 md:px-0">
        <h2 className="font-mono text-[18px] font-bold uppercase tracking-tight">Timeline</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="border-l-4 border-accent bg-white p-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              Applications open
            </div>
            <div className="mt-1 font-mono text-[14px] font-semibold">May 27 → Aug 31, 2026</div>
          </div>
          <div className="border-l-4 border-accent bg-white p-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              5 schools selected
            </div>
            <div className="mt-1 font-mono text-[14px] font-semibold">Sep 5, 2026</div>
          </div>
          <div className="border-l-4 border-accent bg-white p-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              Devices ship
            </div>
            <div className="mt-1 font-mono text-[14px] font-semibold">Sep 15, 2026</div>
          </div>
          <div className="border-l-4 border-accent bg-white p-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              Case study published
            </div>
            <div className="mt-1 font-mono text-[14px] font-semibold">Dec 15, 2026</div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-0">
        <h2 className="font-mono text-[18px] font-bold uppercase tracking-tight">Apply</h2>
        <p className="mt-3 max-w-[60ch] text-[14px] text-ink-soft">
          Andrey reads every application personally. We respond within 1 business day with a
          short follow-up — usually one or two clarifying questions. Be concrete.
        </p>

        <form
          method="POST"
          action="/api/edu-pilot-apply"
          className="mt-6 max-w-3xl border-[1.5px] border-ink bg-white p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
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
                School / institution *
              </span>
              <input
                type="text"
                name="school"
                required
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              />
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
                Your role *
              </span>
              <select
                name="role"
                required
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              >
                <option value="">Pick one…</option>
                <option>Music teacher</option>
                <option>STEAM coordinator / makerspace lead</option>
                <option>Department head</option>
                <option>Principal / administrator</option>
                <option>Other</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Grades you teach *
              </span>
              <select
                name="grades"
                required
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              >
                <option value="">Pick one…</option>
                <option>K-2</option>
                <option>3-5</option>
                <option>6-8</option>
                <option>9-12</option>
                <option>Mixed K-8</option>
                <option>Mixed 6-12</option>
                <option>Higher ed</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Students you'd use this with
              </span>
              <input
                type="number"
                name="student_count"
                placeholder="e.g. 60"
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Computer environment
              </span>
              <select
                name="environment"
                className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
              >
                <option value="">Pick one…</option>
                <option>Chromebooks (district 1:1)</option>
                <option>iPads (district 1:1)</option>
                <option>Mac lab</option>
                <option>Windows lab</option>
                <option>Mixed / BYOD</option>
              </select>
            </label>
          </div>

          <label className="mt-4 flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              In 2 paragraphs: what would you do with Playtronica? *
            </span>
            <textarea
              name="vision"
              required
              rows={5}
              placeholder="What program, which students, what would success look like for you by December?"
              className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
            />
          </label>

          <label className="mt-4 flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              Why your school in particular?
            </span>
            <textarea
              name="why_school"
              rows={3}
              placeholder="Anything we should know — special programs, history of music tech, community context, etc."
              className="border-[1.5px] border-rule bg-white px-3 py-2 text-[14px] outline-none focus:border-accent"
            />
          </label>

          <label className="mt-4 flex items-start gap-2 text-[13px]">
            <input
              type="checkbox"
              name="consent_case_study"
              required
              className="mt-1"
            />
            <span>
              I understand the pilot includes a written case study + photo / video rights, and I'm
              authorised to commit my school to these.
            </span>
          </label>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="inline-flex min-h-[48px] items-center border-[1.5px] border-ink bg-ink px-6 py-3 font-mono text-[13px] uppercase tracking-[0.06em] text-bg no-underline transition hover:border-accent hover:bg-accent"
            >
              Submit application →
            </button>
            <span className="text-[12px] text-ink-soft">
              We reply within 1 business day. Applications close 31 August 2026.
            </span>
          </div>
        </form>
      </section>
    </article>
  );
}
