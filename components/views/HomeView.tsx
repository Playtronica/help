import Link from "next/link";
import { groupedNav, SECTION_TITLES } from "@/lib/content";
import { localizedPath, type Lang } from "@/lib/i18n";

// Section order on the homepage. Section titles stay English here — they are
// design labels, localised in SECTION_TITLES lookups elsewhere.
const HOME_ORDER: { section: string; num: string; meta?: string }[] = [
  { section: "getting-started", num: "01", meta: "start here" },
  { section: "devices", num: "02", meta: "5 instruments" },
  { section: "orders", num: "03", meta: "most-asked" },
  { section: "software", num: "04", meta: "DAWs · synths · mobile" },
  { section: "troubleshooting", num: "05", meta: "interactive triage" },
  { section: "sound", num: "06", meta: "grounding · objects" },
  { section: "professionals", num: "07", meta: "B2B · education" },
];

const BENTO_SPANS = [
  "md:col-span-4 md:row-span-3",
  "md:col-span-4 md:row-span-3",
  "md:col-span-4 md:row-span-3",
  "md:col-span-6 md:row-span-2",
  "md:col-span-6 md:row-span-2",
];

const HOME_HIDE = new Set<string>(["orders/returns-refunds"]);

export function HomeView({ lang }: { lang: Lang }) {
  const nav = groupedNav(lang);
  const byKey = Object.fromEntries(
    nav.map((g) => [
      g.section,
      { ...g, pages: g.pages.filter((p) => !HOME_HIDE.has(`${p.section}/${p.slug}`)) },
    ]),
  );
  const lp = (path: string) => localizedPath(lang, path);

  return (
    <div className="-mx-4 -mt-6 md:-mx-0">
      <section className="border-b-[1.5px] border-rule bg-bg px-4 py-6 md:px-0 md:py-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
          ∿ Playtronica · help center
        </div>
        <h1 className="mt-3 font-mono text-[clamp(28px,5vw,46px)] font-bold leading-[1.05] tracking-tight">
          Make sound from{" "}
          <span className="inline-block border-[1.5px] border-rule bg-hl px-1.5 py-0.5">
            anything.
          </span>
        </h1>
        <p className="mt-4 max-w-[56ch] text-[16px] leading-relaxed text-ink-soft md:text-[17px]">
          Everything you need to make music from plants, water, fruit, your hands. Find what you need in two clicks — or zero, using the search above.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <QuickPill href={lp("/orders/track-your-order/")} label="📦 Track my order" />
          <QuickPill href={lp("/orders/invoice-vat/")} label="🧾 Invoice & VAT" />
          <QuickPill href={lp("/getting-started/got-it-as-a-gift/")} label="🎁 Got it as a gift?" />
          <QuickPill href={lp("/troubleshooting/hub/")} label="🔧 Not working?" />
        </div>
      </section>

      <div className="px-4 py-2 md:px-0 md:py-0">
        {HOME_ORDER.map((row) => {
          const group = byKey[row.section];
          if (!group || group.pages.length === 0) return null;
          const sec = SECTION_TITLES[row.section];
          return (
            <section key={row.section} className="border-b-[1.5px] border-rule pb-6 pt-7 md:py-8">
              <header className="mb-4 flex items-baseline gap-3 md:mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                  / {row.num}
                </span>
                <h2 className="text-lg font-bold leading-tight tracking-tight md:text-xl">
                  {sec?.emoji ? <span className="mr-1">{sec.emoji}</span> : null}
                  {sec?.title || row.section}
                </h2>
                {row.meta && (
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft md:text-[11px]">
                    {row.meta}
                  </span>
                )}
              </header>

              <ul className="grid grid-cols-1 gap-3 md:auto-rows-[150px] md:grid-cols-12 md:gap-4">
                {group.pages.slice(0, 5).map((p, i) => (
                  <li key={p.slug} className={BENTO_SPANS[i] || "md:col-span-4 md:row-span-2"}>
                    <Link
                      href={lp(`/${p.section}/${p.slug}/`)}
                      className="flex h-full flex-col gap-2 border-[1.5px] border-rule bg-white p-4 transition active:translate-y-0 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-block md:p-5"
                    >
                      <span className="text-2xl leading-none">{p.emoji || "•"}</span>
                      <div className="font-bold leading-tight">{p.title}</div>
                      {p.summary && (
                        <p className="text-[14px] leading-snug text-ink-soft">{p.summary}</p>
                      )}
                      <div className="mt-auto font-mono text-[11px] text-accent">Open →</div>
                    </Link>
                  </li>
                ))}
                {group.pages.length > 5 && (
                  <li className="md:col-span-12">
                    <Link
                      href={lp(`/${row.section}/`)}
                      className="block border-[1.5px] border-dashed border-rule px-4 py-3 text-center font-mono text-[13px] uppercase tracking-[0.06em] text-ink-soft transition hover:bg-soft hover:text-ink"
                    >
                      See all {group.pages.length} {sec?.title?.toLowerCase() || row.section} pages →
                    </Link>
                  </li>
                )}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function QuickPill({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[40px] items-center border-[1.5px] border-rule bg-white px-3 py-1.5 text-[14px] font-medium transition hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-block-sm"
    >
      {label}
    </Link>
  );
}
