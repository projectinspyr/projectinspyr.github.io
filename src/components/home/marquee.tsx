import { cn } from "@/lib/utils";

const tones = {
  yellow: "bg-spark text-ink",
  red: "bg-signal-deep text-white",
} as const;

export function Marquee({ items, tone = "yellow" }: { items: string[]; tone?: keyof typeof tones }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-5 font-display text-[1.9rem] leading-none tracking-[0.06em] sm:text-[2.1rem]">{item}</span>
          <span aria-hidden className="text-3xl leading-none">•</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("marquee relative z-10 overflow-hidden border-y-4 border-ink py-3.5", tones[tone])}>
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}
