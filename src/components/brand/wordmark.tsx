import { site } from "@content/site";
import { cn } from "@/lib/utils";

/**
 * The PROJECT INSPYR lockup, recreated in SVG from the brand artwork:
 * "PROJECT" in yellow and "INSPYR" in red, both gently arched, over
 * "led by students" in white. To use an exported logo file instead, swap the
 * <svg> for <Image src="/brand/logo.svg" … /> and keep the same props.
 *
 * `id` must be unique on the page (it names the arcs the text sits on).
 * The drawing is hidden from assistive tech; give the surrounding link or
 * heading its own text.
 */
export function Wordmark({
  id,
  className,
  showLine = true,
}: {
  id: string;
  className?: string;
  showLine?: boolean;
}) {
  const height = showLine ? 150 : 118;
  return (
    <svg
      viewBox={`0 0 300 ${height}`}
      className={cn("h-auto overflow-visible", className)}
      aria-hidden
    >
      <defs>
        <path id={`${id}-top`} d="M60 50 Q150 22 240 50" />
        <path id={`${id}-main`} d="M6 116 Q150 70 294 116" />
      </defs>
      <text
        fill="#f5c518"
        fontFamily="var(--font-bricolage), sans-serif"
        fontWeight={800}
        fontSize="31"
        letterSpacing="1.5"
      >
        <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
          PROJECT
        </textPath>
      </text>
      <text fill="#f23a3a" fontFamily="var(--font-fredoka), sans-serif" fontWeight={700} fontSize="74" letterSpacing="-1">
        <textPath href={`#${id}-main`} startOffset="50%" textAnchor="middle">
          INSPYR
        </textPath>
      </text>
      {showLine && (
        <text
          x="150"
          y="144"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="var(--font-instrument), sans-serif"
          fontWeight={500}
          fontSize="19"
          letterSpacing="0.4"
        >
          {site.lockupLine}
        </text>
      )}
    </svg>
  );
}
