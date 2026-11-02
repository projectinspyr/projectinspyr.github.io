import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, Instrument_Sans } from "next/font/google";
import { site } from "@content/site";
import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/providers";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { siteUrl } from "@/lib/site-url";
import { plain } from "@/lib/utils";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const body = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const hand = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name}: ${plain(site.tagline)}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: ["Project INSPYR", "student-led", "youth-led", "Pune", "NGO", "volunteering", "reels", "India"],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#14305a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${body.variable} ${hand.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks JS as available before first paint, so scroll reveals never hide content without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[110] -translate-y-24 rounded-full bg-spark px-5 py-3 font-semibold text-navy-900 transition-transform focus:translate-y-0"
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
        <div aria-hidden className="grain" />
        <OrganizationJsonLd />
        <Analytics />
      </body>
    </html>
  );
}
