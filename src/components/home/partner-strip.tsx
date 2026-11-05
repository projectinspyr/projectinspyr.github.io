import Image from "next/image";
import { home } from "@content/pages/home";
import { partners } from "@content/partners";
import { Container, Eyebrow } from "../ui/section";

/** Renders only once real partners are listed in content/partners.ts. */
export function PartnerStrip() {
  if (partners.length === 0) return null;

  return (
    <section aria-label={home.partnersStrip.eyebrow} className="border-b-4 border-ink bg-navy-800 py-14">
      <Container>
        <div className="mb-8 text-center">
          <Eyebrow>{home.partnersStrip.eyebrow}</Eyebrow>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-5">
          {partners.map((p) => {
            const mark = p.logo ? (
              <Image src={p.logo} alt={p.name} width={160} height={56} className="h-10 w-auto object-contain sm:h-12" />
            ) : (
              <span className="font-display text-[1.5rem] leading-none tracking-[0.04em] text-ink">{p.name}</span>
            );
            return (
              <li key={p.name} className="border-[3px] border-ink bg-white px-4 py-3 shadow-comic">
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="block">
                    {mark}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  mark
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
