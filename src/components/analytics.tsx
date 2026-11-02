import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import Script from "next/script";

/**
 * Privacy-friendly analytics, off unless switched on:
 *   NEXT_PUBLIC_ANALYTICS=vercel      Vercel Web Analytics (enable it in the Vercel dashboard too)
 *   NEXT_PUBLIC_ANALYTICS=plausible   Plausible, with NEXT_PUBLIC_PLAUSIBLE_DOMAIN set
 */
export function Analytics() {
  const provider = process.env.NEXT_PUBLIC_ANALYTICS;

  if (provider === "vercel") return <VercelAnalytics />;

  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (provider === "plausible" && domain) {
    return <Script defer data-domain={domain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />;
  }

  return null;
}
