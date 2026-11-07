import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { NotFoundView } from "@/components/not-found-view";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

// The site and the content editor have separate root layouts, so unmatched
// URLs are handled here, with the full site frame around the 404 page.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Page not found · Project INSPYR",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <SiteShell>
      <NotFoundView />
    </SiteShell>
  );
}
