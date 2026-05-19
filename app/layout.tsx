import "./globals.css";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { groupedNav } from "@/lib/content";
import { Sidebar } from "@/components/Sidebar";
import { SearchBar } from "@/components/SearchBar";
import { MobileNavDrawer } from "@/components/MobileNavDrawer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ViewToggle } from "@/components/ViewToggle";
import { WhatsAppFeedback } from "@/components/WhatsAppFeedback";
import { Analytics } from "@/components/Analytics";

export const metadata: Metadata = {
  title: "Playtronica Help",
  description: "Everything you need to make music from anything.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fdfcfa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = groupedNav();
  return (
    <html lang="en">
      <body className="min-h-screen pb-[72px] md:pb-0">
        <a href="#main" className="skip-link">Skip to content</a>

        <header className="sticky top-0 z-20 border-b-[1.5px] border-rule bg-bg/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 md:py-3">
            <MobileNavDrawer nav={nav} />

            <Link href="/" className="font-mono text-[15px] font-bold tracking-tight text-ink hover:text-accent md:text-[16px]">
              ∿ playtronica<span className="text-ink-soft"> / help</span>
            </Link>

            <div className="ml-auto hidden flex-1 md:block md:max-w-[460px]">
              <SearchBar />
            </div>

            <a
              href="mailto:support@playtronica.com"
              className="ml-auto hidden border-[1.5px] border-ink bg-ink px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.06em] text-bg transition hover:bg-accent hover:border-accent md:inline-block"
            >
              Contact
            </a>
          </div>

          {/* Mobile-only sticky search row */}
          <div className="border-t-[1.5px] border-rule px-4 py-2 md:hidden">
            <SearchBar />
          </div>
        </header>

        <div className="mx-auto flex max-w-6xl gap-8 px-4 py-6 md:py-8">
          <Sidebar nav={nav} />
          <main id="main" className="min-w-0 flex-1">
            {children}
          </main>
        </div>

        <footer className="hidden border-t-[1.5px] border-rule py-6 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft md:block">
          ∿ playtronica / help · made with care ·{" "}
          <a href="https://github.com/Playtronica/help-center" className="text-accent hover:underline">
            source on github
          </a>
        </footer>

        <MobileBottomNav />
        <ViewToggle />
        <WhatsAppFeedback />
        <Analytics />
      </body>
    </html>
  );
}
