import { Bebas_Neue, Permanent_Marker, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "../analytics";
import { Providers } from "../providers";
import { OrganizationJsonLd } from "../seo/json-ld";
import { Footer } from "./footer";
import { Header } from "./header";

const display = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Hand-lettered tags and speech bubbles.
const marker = Permanent_Marker({
  variable: "--font-permanent-marker",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

/** The page frame every public page shares: fonts, header, footer and motion. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} ${marker.variable}`} suppressHydrationWarning>
      {/* This is the root layout's <head>, which the App Router supports; the rule targets the old pages/ router. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* Marks JS as available before first paint, so scroll reveals never hide content without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[110] -translate-y-24 border-[3px] border-ink bg-spark px-5 py-3 font-display text-xl tracking-wider text-ink shadow-comic transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </Providers>
        <OrganizationJsonLd />
        <Analytics />
      </body>
    </html>
  );
}
