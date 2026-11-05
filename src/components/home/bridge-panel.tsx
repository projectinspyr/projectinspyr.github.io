import { home } from "@content/pages/home";
import { BRIDGE, bankShare } from "../brand/bridge-geometry";
import { BridgeHero } from "../brand/bridge-hero";
import { cn } from "@/lib/utils";
import { Container } from "../ui/section";

const labelTop = `${((BRIDGE.deckY + 22) / BRIDGE.height) * 100}%`;
const labelWidth = `${(bankShare - 0.04) * 100}%`;

function Caption({ text, side, inline }: { text: string; side: "left" | "right"; inline?: boolean }) {
  return (
    <span
      className={cn(
        "border-[3px] border-ink bg-spark px-2 py-1 font-display text-[1rem] leading-[1.05] tracking-[0.04em] text-ink sm:text-[clamp(0.85rem,1.5vw,1.3rem)]",
        inline ? "inline-block max-w-[46%]" : "absolute hidden sm:block",
        side === "right" && "text-right",
      )}
      style={inline ? undefined : { top: labelTop, maxWidth: labelWidth, [side]: "1.5%" }}
    >
      {text}
    </span>
  );
}

/** The bridge as a poster: the signature picture of what INSPYR does. */
export function BridgePanel() {
  const { bridge } = home;

  return (
    <section aria-labelledby="bridge-title" className="bg-navy-800 pb-16 pt-14">
      <Container>
        <div data-reveal className="on-paper relative mx-auto max-w-5xl border-4 border-ink bg-white text-ink shadow-comic-red-lg">
          <div className="flex flex-col gap-2 px-5 pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:px-8 sm:pt-8">
            <h2 id="bridge-title" className="shrink-0 text-[clamp(2.5rem,6vw,3.75rem)] leading-none">
              {bridge.title}
            </h2>
            <p className="max-w-md text-base leading-snug text-navy-500 sm:text-right">{bridge.body}</p>
          </div>
          <div className="relative mt-3">
            <BridgeHero className="block h-auto w-full" />
            <Caption text={bridge.left} side="left" />
            <Caption text={bridge.right} side="right" />
          </div>
          <div className="flex justify-between gap-3 border-t-4 border-ink bg-navy-800 p-3 sm:hidden">
            <Caption text={bridge.left} side="left" inline />
            <Caption text={bridge.right} side="right" inline />
          </div>
        </div>
      </Container>
    </section>
  );
}
