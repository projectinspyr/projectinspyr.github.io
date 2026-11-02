import { partnersPage } from "@content/pages/partners";
import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Become a partner of Project INSPYR, a student-led team from Pune.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: partnersPage.meta.ogTitle, eyebrow: "Partners" });
}
