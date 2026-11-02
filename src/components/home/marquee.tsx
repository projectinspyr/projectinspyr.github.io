import { Spark } from "../ui/doodles";

export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 font-display text-2xl font-extrabold uppercase tracking-[-0.01em] sm:px-8 sm:text-3xl">{item}</span>
          <Spark className="size-5 text-signal-deep" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee relative z-10 -my-px bg-navy-800 py-6">
      <div className="-rotate-[1.6deg] overflow-hidden bg-spark py-3.5 text-navy-900 shadow-[0_18px_50px_-20px_rgb(0_0_0/0.6)]">
        <div className="marquee-track flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
