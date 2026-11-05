import type { CSSProperties } from "react";
import type { Faq } from "@content/faqs";

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <details
          key={item.question}
          data-reveal
          style={{ "--reveal-delay": `${i * 50}ms` } as CSSProperties}
          className="on-paper group border-[3px] border-ink bg-white text-ink shadow-comic"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-5 px-5 py-4 text-left font-display text-[1.45rem] leading-tight tracking-[0.03em] transition-colors hover:bg-spark sm:px-6">
            <span>{item.question}</span>
            <span
              aria-hidden
              className="grid size-8 shrink-0 place-items-center border-[3px] border-ink bg-spark transition-transform duration-200 group-open:rotate-45 group-open:bg-signal group-open:text-ink"
            >
              <svg viewBox="0 0 12 12" className="size-3">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2.4" />
              </svg>
            </span>
          </summary>
          <p className="border-t-[3px] border-ink px-5 py-4 text-base leading-relaxed sm:px-6">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
