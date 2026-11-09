import { notFound } from "next/navigation";
import { essay } from "@content/essay";
import { CtaBand } from "@/components/cta-band";
import { EssayDetails } from "@/components/essay-details";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: essay.meta.title,
  description: essay.meta.description,
  path: "/essay-competition",
});

export default function EssayCompetitionPage() {
  if (!essay.show) notFound();

  return (
    <>
      <PageHero eyebrow={essay.eyebrow} title={essay.title} intro={essay.intro} />
      <EssayDetails />
      <CtaBand />
    </>
  );
}
