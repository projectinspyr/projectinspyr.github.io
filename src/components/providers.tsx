"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { Cursor } from "./motion/cursor";
import { RevealObserver } from "./motion/reveal-observer";
import { RouteProgress } from "./motion/route-progress";
import { SmoothScroll } from "./motion/smooth-scroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
        <SmoothScroll />
        <RevealObserver />
        <RouteProgress />
        <Cursor />
      </MotionConfig>
    </LazyMotion>
  );
}
