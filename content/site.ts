/**
 * Site settings. The editable parts live in data/site.json and are changed
 * in the editor at /keystatic (Settings → Site settings).
 *
 * Text markers used across /content:
 *   [[words]]  highlight in red (only in big headlines)
 *   {{words}}  highlight in yellow
 */
import data from "./data/site.json";

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
};

export const site = {
  name: "Project INSPYR",
  shortName: "INSPYR",
  lockupLine: "led by students",
  tagline: data.tagline,
  description: data.description,
  instagramBio: data.instagramBio,
  location: { city: data.city, country: data.country, countryCode: "IN" },
  email: data.email,
  responseTime: data.responseTime,
  /** Production URL. Empty until there is a domain: NEXT_PUBLIC_SITE_URL or the Vercel URL is used. */
  url: data.url,

  social: {
    instagram: { label: "Instagram", handle: data.instagramHandle, href: data.instagramUrl } as SocialLink,
    youtube: (data.youtubeUrl
      ? { label: "YouTube", handle: data.youtubeHandle || "YouTube", href: data.youtubeUrl }
      : null) as SocialLink | null,
  },

  nav: [
    { label: "About", href: "/about" },
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "/contact" },
  ],
};
