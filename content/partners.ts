/**
 * Organizations Project INSPYR has worked with. The logo strip on the home
 * page only appears once this list has at least one entry.
 *
 * Logos go in /public/partners, e.g. logo: "/partners/example.svg".
 * Without a logo, the name is shown in type instead.
 *
 * Example:
 * { name: "Organization name", type: "service", url: "https://example.org", logo: "/partners/example.svg" },
 */
export type Partner = {
  name: string;
  type: "service" | "sponsor" | "school";
  url?: string;
  logo?: string;
};

export const partners: Partner[] = [];
