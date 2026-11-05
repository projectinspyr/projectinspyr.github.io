"use client";

import { useEffect, useRef } from "react";
import { Check } from "../ui/doodles";

export function FormSuccess({ title, body, again, onAgain }: { title: string; body?: string; again: string; onAgain: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);

  return (
    <div ref={ref} tabIndex={-1} role="status" className="py-6 text-center outline-none sm:py-10">
      <span className="mx-auto grid size-20 place-items-center rounded-full border-4 border-ink bg-spark text-ink shadow-comic-md">
        <Check className="size-10" />
      </span>
      <h3 className="mt-6 text-[3rem] leading-none text-ink">{title}</h3>
      {body && <p className="mx-auto mt-3 max-w-sm text-lg text-navy-500">{body}</p>}
      <button
        type="button"
        onClick={onAgain}
        className="mt-8 border-[3px] border-ink bg-tape px-6 py-3 font-display text-[1.3rem] leading-none tracking-[0.05em] text-ink shadow-comic transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-comic-md"
      >
        {again}
      </button>
    </div>
  );
}
