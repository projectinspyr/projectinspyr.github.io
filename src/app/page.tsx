import { impact } from "@content/impact";
import { home } from "@content/pages/home";
import { CtaBand } from "@/components/cta-band";
import { Audiences } from "@/components/home/audiences";
import { BridgePanel } from "@/components/home/bridge-panel";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { ImpactStrip } from "@/components/home/impact";
import { Intro } from "@/components/home/intro";
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
      <BridgePanel />
      <Intro />
      <Marquee items={home.marquee} />
      <WhatWeDo />
      <HowItWorks />
      <ImpactStrip eyebrow={home.impact.eyebrow} title={home.impact.title} intro={home.impact.intro} stats={impact} />
      <Manifesto />
      <Reels />
      <PartnerStrip />
      <Audiences />
      <Marquee items={home.marqueeAction} tone="red" />
      <CtaBand />
    </>
  );
}
