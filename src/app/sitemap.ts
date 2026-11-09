import type { MetadataRoute } from "next";
import { essay } from "@content/essay";
import { absoluteUrl } from "@/lib/site-url";

const routes = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/partners", priority: 0.9 },
  { path: "/contact", priority: 0.7 },
  ...(essay.show ? [{ path: "/essay-competition", priority: 0.8 }] : []),
  { path: "/privacy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: absoluteUrl(r.path),
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
