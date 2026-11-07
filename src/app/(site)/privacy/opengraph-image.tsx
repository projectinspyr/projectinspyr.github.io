import { privacyPage } from "@content/pages/privacy";
import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Project INSPYR privacy notice.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: privacyPage.meta.ogTitle, eyebrow: "Privacy" });
}
