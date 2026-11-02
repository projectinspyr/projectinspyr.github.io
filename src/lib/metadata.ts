import type { Metadata } from "next";
import { plain } from "./utils";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of the "· Project INSPYR" template. */
  absoluteTitle?: boolean;
};

export function pageMetadata({ title, description, path, absoluteTitle }: PageMeta): Metadata {
  const clean = plain(title);
  return {
    title: absoluteTitle ? { absolute: clean } : clean,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: clean,
      description,
      url: path,
      type: "website",
      siteName: "Project INSPYR",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: clean,
      description,
    },
  };
}
