"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Pulls its child gently toward a mouse pointer. Touch and pen are ignored. */
export function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <m.span
      ref={ref}
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const box = ref.current.getBoundingClientRect();
        x.set((e.clientX - (box.left + box.width / 2)) * strength);
        y.set((e.clientY - (box.top + box.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.span>
  );
}
