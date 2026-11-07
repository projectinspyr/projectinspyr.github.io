import type { Metadata, Viewport } from "next";
import { site } from "@content/site";
import { SiteShell } from "@/components/layout/site-shell";
import { siteUrl } from "@/lib/site-url";
import { plain } from "@/lib/utils";
import "../globals.css";

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

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <SiteShell>{children}</SiteShell>;
}
