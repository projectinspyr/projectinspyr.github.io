import { home } from "@content/pages/home";
import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Project INSPYR: We show up. Then we tell the story. A student-led team from Pune.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: home.meta.ogTitle, eyebrow: "Student-led · Pune" });
}
