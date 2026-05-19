/**
 * Analytics — single mount-point for all tracking. Reads tracker IDs from
 * environment variables at build time. If an ID is absent, that tracker is
 * a no-op — no extra network requests, no console noise.
 *
 * Env vars (set in Cloudflare Pages dashboard or `.env.local` for dev):
 *   NEXT_PUBLIC_GA4_ID                   — e.g. "G-XXXXXXXXXX"      (Google Analytics 4)
 *   NEXT_PUBLIC_CLARITY_ID               — e.g. "abcd1234"          (Microsoft Clarity)
 *   NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN   — long base64-ish token    (Cloudflare Web Analytics)
 *
 * Scripts are loaded with strategy="afterInteractive" so they never block
 * paint or input. Combined script weight is under 5 KB transferred.
 */

import Script from "next/script";

export function Analytics() {
  const ga4 = process.env.NEXT_PUBLIC_GA4_ID;
  const clarity = process.env.NEXT_PUBLIC_CLARITY_ID;
  const cfToken = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;

  return (
    <>
      {/* Google Analytics 4 — funnel, source/medium, Shopify cross-domain */}
      {ga4 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4}', { anonymize_ip: true, send_page_view: true });`}
          </Script>
        </>
      )}

      {/* Microsoft Clarity — heatmaps + session recordings */}
      {clarity && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarity}");`}
        </Script>
      )}

      {/* Cloudflare Web Analytics — RUM, no cookies, complements GA4 */}
      {cfToken && (
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${cfToken}"}`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
