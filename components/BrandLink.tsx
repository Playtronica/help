"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { langFromPath, localizedPath } from "@/lib/i18n";

/** The "∿ playtronica / help" wordmark — links to the homepage in the current language. */
export function BrandLink() {
  const lang = langFromPath(usePathname() || "/");
  return (
    <Link
      href={localizedPath(lang, "/")}
      className="font-mono text-[15px] font-bold tracking-tight text-ink hover:text-accent md:text-[16px]"
    >
      ∿ playtronica<span className="text-ink-soft"> / help</span>
    </Link>
  );
}
