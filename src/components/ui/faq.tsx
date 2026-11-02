import type { Faq } from "@content/faqs";

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item, i) => (
        <details key={item.question} className="group" data-reveal style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-left text-lg font-semibold leading-snug transition-colors hover:text-spark sm:text-xl">
            <span>{item.question}</span>
            <span
              aria-hidden
              className="relative mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-white/20 transition-[transform,border-color,background-color] duration-300 group-open:rotate-45 group-open:border-spark group-open:bg-spark group-open:text-navy-900"
            >
              <svg viewBox="0 0 12 12" className="size-3">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="max-w-3xl pb-7 pr-12 text-base leading-relaxed text-navy-200 sm:text-lg">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
