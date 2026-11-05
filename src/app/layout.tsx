import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Permanent_Marker, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@content/site";
import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/providers";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { siteUrl } from "@/lib/site-url";
import { plain } from "@/lib/utils";
import "./globals.css";

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
  themeColor: "#1e2c4f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${body.variable} ${marker.variable}`}
      suppressHydrationWarning
    >
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
