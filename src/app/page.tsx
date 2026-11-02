import { impact } from "@content/impact";
import { home } from "@content/pages/home";
import { BridgeDivider } from "@/components/brand/bridge-divider";
import { CtaBand } from "@/components/cta-band";
import { Audiences } from "@/components/home/audiences";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { ImpactStrip } from "@/components/home/impact";
import { Manifesto } from "@/components/home/manifesto";
import { Marquee } from "@/components/home/marquee";
import { PartnerStrip } from "@/components/home/partner-strip";
import { Reels } from "@/components/home/reels";
import { WhatWeDo } from "@/components/home/what-we-do";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: home.meta.title,
  description: home.meta.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={home.marquee} />
      <WhatWeDo />
      <ImpactStrip title={home.impact.title} eyebrow={home.impact.eyebrow} stats={impact} />
      <HowItWorks />
      <Manifesto />
      <Reels />
      <PartnerStrip />
      <Audiences />
      <div className="bg-navy-800 pt-10 text-white/15">
        <BridgeDivider />
      </div>
      <CtaBand />
    </>
  );
}
