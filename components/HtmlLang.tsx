"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { langFromPath, LANGUAGES } from "@/lib/i18n";

/**
 * Keeps <html lang="..."> in sync with the current language. The root layout
 * renders <html lang="en"> for the initial paint; on a translated route this
 * corrects it after hydration. hreflang tags carry the stronger SEO signal.
 */
export function HtmlLang() {
  const pathname = usePathname() || "/";
  useEffect(() => {
    document.documentElement.lang = LANGUAGES[langFromPath(pathname)].htmlLang;
  }, [pathname]);
  return null;
}
