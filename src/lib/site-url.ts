import { site } from "@content/site";

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "";

/** Absolute origin used for canonical URLs, the sitemap and share images. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || site.url || vercelUrl || "http://localhost:3000"
).replace(/\/+$/, "");

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
