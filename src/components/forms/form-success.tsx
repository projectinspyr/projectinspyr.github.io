"use client";

import { useEffect, useRef } from "react";
import { Check } from "../ui/doodles";

export function FormSuccess({ title, body, again, onAgain }: { title: string; body?: string; again: string; onAgain: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);

  return (
    <div ref={ref} tabIndex={-1} role="status" className="py-6 text-center outline-none sm:py-10">
      <span className="mx-auto grid size-20 place-items-center rounded-full bg-navy-800 text-spark">
        <Check className="size-10" />
      </span>
      <h3 className="mt-6 text-3xl font-extrabold tracking-[-0.025em] text-navy-900 sm:text-4xl">{title}</h3>
      {body && <p className="mx-auto mt-3 max-w-sm text-lg text-navy-800">{body}</p>}
      <button
        type="button"
        onClick={onAgain}
        className="mt-8 rounded-full border-2 border-navy-800/20 px-6 py-3 font-semibold text-navy-900 transition-colors hover:border-navy-800"
      >
        {again}
      </button>
    </div>
  );
}
