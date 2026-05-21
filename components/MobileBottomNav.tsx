"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { canonicalPath, langFromPath, localizedPath } from "@/lib/i18n";

const tabs = [
  { href: "/",                       label: "Home",     icon: HomeIcon },
  { href: "/getting-started/",       label: "Start",    icon: StartIcon },
  { href: "/devices/",               label: "Devices",  icon: DevicesIcon },
  { href: "/troubleshooting/hub/",   label: "Fix it",   icon: WrenchIcon },
];

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 11l9-8 9 8v10a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2V11z" stroke="currentColor" strokeWidth={active ? "2.2" : "1.6"} strokeLinejoin="round"/>
    </svg>
  );
}
function StartIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v18M6 7l6-4 6 4M5 12h14" stroke="currentColor" strokeWidth={active ? "2.2" : "1.6"} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function DevicesIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="9" width="18" height="6" rx="3" stroke="currentColor" strokeWidth={active ? "2.2" : "1.6"}/>
      <circle cx="7" cy="12" r="1.4" fill="currentColor"/>
      <circle cx="17" cy="12" r="1.4" fill="currentColor"/>
    </svg>
  );
}
function WrenchIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 1 5 5l-3 .5-.5 3a4 4 0 0 1-5-5l3-.5.5-3zM12 12L3 21" stroke="currentColor" strokeWidth={active ? "2.2" : "1.6"} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname() || "/";
  const lang = langFromPath(pathname);
  const canonical = canonicalPath(pathname);
  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t-[1.5px] border-rule bg-bg/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 6px)" }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between">
        {tabs.map((t) => {
          const active =
            t.href === "/"
              ? canonical === "/"
              : canonical.startsWith(t.href.replace(/\/$/, ""));
          const Icon = t.icon;
          return (
            <li key={t.href} className="flex-1">
              <Link
                href={localizedPath(lang, t.href)}
                className={`flex min-h-[52px] flex-col items-center gap-0.5 px-2 py-2 font-mono text-[10px] uppercase tracking-[0.06em] transition-colors ${
                  active ? "font-bold text-ink" : "text-ink-soft"
                }`}
              >
                <Icon active={active} />
                <span>{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
