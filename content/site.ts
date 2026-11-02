/**
 * Site settings. Everything the whole site shares lives here.
 *
 * Text markers used across /content:
 *   [[words]]  highlight in yellow (the spark)
 *   {{words}}  highlight in red (only in big headlines)
 */

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
};

/**
 * Tagline options. The logo line "led by students" is fixed; this is the
 * headline promise. To switch, change the index on `tagline` below.
 *   0. We show up. Then we tell the story.   (current stand-in)
 *   1. Where good work gets seen.
 *   2. Young hands. Loud stories.
 */
export const taglines = [
  "We show up. Then we tell the [[story]].",
  "Where good work gets [[seen]].",
  "Young hands. [[Loud]] stories.",
] as const;

export const site = {
  name: "Project INSPYR",
  shortName: "INSPYR",
  lockupLine: "led by students",
  tagline: taglines[0] as string,
  description:
    "Project INSPYR is a student-led team from Pune that volunteers with NGOs and service organizations, then turns their work into short films people actually watch.",
  instagramBio: "Amplifying stories, awareness & recognition across Pune and India.",
  location: { city: "Pune", country: "India", countryCode: "IN" },
  email: "contactinspyrproject@gmail.com",
  responseTime: "We reply within 3 working days.",

  /**
   * Production URL, e.g. "https://projectinspyr.org". Leave empty until a
   * domain exists: NEXT_PUBLIC_SITE_URL or the Vercel production URL is used.
   */
  url: "",

  social: {
    instagram: {
      label: "Instagram",
      handle: "@projectinspyr",
      href: "https://instagram.com/projectinspyr",
    } as SocialLink,
    // Add the channel when it exists, e.g.
    // { label: "YouTube", handle: "@projectinspyr", href: "https://youtube.com/@projectinspyr" }
    youtube: null as SocialLink | null,
  },

  nav: [
    { label: "About", href: "/about" },
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "/contact" },
  ],
};
