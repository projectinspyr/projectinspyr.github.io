import { essay } from "@content/essay";
import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "The Project INSPYR essay competition.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: essay.meta.ogTitle, eyebrow: "Essay competition" });
}
