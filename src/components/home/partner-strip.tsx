import Image from "next/image";
import { home } from "@content/pages/home";
import { partners } from "@content/partners";
import { Container, Eyebrow } from "../ui/section";

/** Renders only once real partners are listed in content/partners.ts. */
export function PartnerStrip() {
  if (partners.length === 0) return null;

  return (
    <section aria-label={home.partnersStrip.eyebrow} className="bg-navy-800 py-14">
      <Container>
        <Eyebrow className="mb-8 justify-center">{home.partnersStrip.eyebrow}</Eyebrow>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {partners.map((p) => {
            const mark = p.logo ? (
              <Image src={p.logo} alt={p.name} width={160} height={56} className="h-10 w-auto object-contain opacity-80 brightness-0 invert transition-opacity hover:opacity-100 sm:h-12" />
            ) : (
              <span className="font-display text-xl font-bold text-navy-100">{p.name}</span>
            );
            return (
              <li key={p.name}>
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
