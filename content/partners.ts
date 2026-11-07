/**
 * Organizations Project INSPYR has worked with. Edited in /keystatic
 * (Lists → Partner organizations); stored in data/partners.json. The logo
 * strip on the home page only appears once there is at least one entry.
 */
import data from "./data/partners.json";

export type Partner = {
  name: string;
  type: "service" | "sponsor" | "school";
  url?: string;
  logo?: string;
};

export const partners: Partner[] = (
  data.partners as Array<{ name: string; type: Partner["type"]; url: string; logo: string | null }>
).map((p) => ({ name: p.name, type: p.type, url: p.url || undefined, logo: p.logo || undefined }));
