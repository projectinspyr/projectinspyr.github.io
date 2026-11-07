import { contactPage } from "@content/pages/contact";
import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Contact Project INSPYR.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: contactPage.meta.ogTitle, eyebrow: "Contact" });
}
