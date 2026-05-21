import "./globals.css";
import type { Metadata, Viewport } from "next";
import { slimNav, type SlimNavGroup } from "@/lib/content";
import { LANG_CODES, type Lang } from "@/lib/i18n";
import { Sidebar } from "@/components/Sidebar";
import { SearchBar } from "@/components/SearchBar";
import { MobileNavDrawer } from "@/components/MobileNavDrawer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ViewToggle } from "@/components/ViewToggle";
import { WhatsAppFeedback } from "@/components/WhatsAppFeedback";
import { Analytics } from "@/components/Analytics";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BrandLink } from "@/components/BrandLink";
import { HtmlLang } from "@/components/HtmlLang";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://help.playtronica.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Playtronica Help",
    template: "%s — Playtronica Help",
  },
  description:
    "Everything you need to make music from anything. Manuals, troubleshooting, and creative guides for TouchMe, Playtron, Biotron, Orbita, and Scales.",
  applicationName: "Playtronica Help Center",
  authors: [{ name: "Playtronica", url: "https://playtronica.com" }],
  generator: "Next.js",
  keywords: [
    "Playtronica",
    "MIDI",
    "TouchMe",
    "Playtron",
    "Biotron",
    "Orbita",
    "Scales",
    "music tech",
    "capacitive sensing",
    "plant music",
  ],
  openGraph: {
    title: "Playtronica Help",
    description:
      "Everything you need to make music from anything. Open-source documentation for Playtronica MIDI devices.",
    url: SITE_URL,
    siteName: "Playtronica Help Center",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Playtronica Help Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Playtronica Help",
    description: "Open-source documentation for Playtronica MIDI devices.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fdfcfa",
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "Playtronica Help Center",
      description: "Documentation, manuals, and troubleshooting for Playtronica MIDI devices.",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "Playtronica",
      url: "https://playtronica.com",
      logo: {
        "@type": "ImageObject",
        url: "https://playtronica.com/favicon.png",
      },
      sameAs: [
        "https://www.instagram.com/playtronica",
        "https://www.facebook.com/groups/playtronica",
        "https://www.youtube.com/@playtronica",
        "https://github.com/Playtronica",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Slim navigation for every language — only the fields the sidebar and
  // drawer render. slimNav strips each page's rendered HTML so the client nav
  // components do not serialise the whole site's content into every page.
  const navByLang = Object.fromEntries(
    LANG_CODES.map((code) => [code, slimNav(code)]),
  ) as Record<Lang, SlimNavGroup[]>;

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="min-h-screen pb-[72px] md:pb-0">
        <a href="#main" className="skip-link">Skip to content</a>
        <HtmlLang />

        {/* The .force-mobile-frame wrapper only changes anything when
            ViewToggle sets html[data-force-view="mobile"]. In normal viewing
            it is a pass-through div (no max-width, no positioning). In forced-
            mobile mode globals.css turns it into a centered 420px column and a
            containing block for position:fixed children, so the mobile drawer,
            bottom nav, view toggle, and feedback widget stay inside the phone
            frame instead of escaping to the full desktop viewport. */}
        <div className="force-mobile-frame">

        <header className="sticky top-0 z-20 border-b-[1.5px] border-rule bg-bg/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 md:py-3">
            <MobileNavDrawer navByLang={navByLang} />

            <BrandLink />

            <div className="ml-auto hidden flex-1 md:block md:max-w-[420px]">
              <SearchBar />
            </div>

            <div className="ml-auto md:ml-0">
              <LanguageSwitcher />
            </div>

            <a
              href="mailto:support@playtronica.com"
              className="hidden border-[1.5px] border-ink bg-ink px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.06em] text-bg transition hover:bg-accent hover:border-accent md:inline-block"
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
          <Sidebar navByLang={navByLang} />
          <main id="main" className="min-w-0 flex-1">
            {children}
          </main>
        </div>

        <footer className="hidden border-t-[1.5px] border-rule py-6 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft md:block">
          ∿ playtronica / help · made with care ·{" "}
          <a href="https://github.com/Playtronica/help" className="text-accent hover:underline">
            source on github
          </a>
        </footer>

        <MobileBottomNav />
        <WhatsAppFeedback />

        </div>{/* /.force-mobile-frame */}

        {/* ViewToggle and Analytics live OUTSIDE the frame so the toggle is
            always reachable (even in forced-mobile mode) and analytics is not
            visually affected by the frame outline. */}
        <ViewToggle />
        <Analytics />
      </body>
    </html>
  );
}
