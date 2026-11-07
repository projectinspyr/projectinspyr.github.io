import { about } from "@content/pages/about";
import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "About Project INSPYR: students who decided not to wait.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: about.meta.ogTitle, eyebrow: "About us" });
}
