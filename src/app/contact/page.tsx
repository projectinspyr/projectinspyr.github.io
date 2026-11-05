import Link from "next/link";
import type { CSSProperties } from "react";
import { contactPage } from "@content/pages/contact";
import { site } from "@content/site";
import { socialLinks } from "@content/social";
import { CopyEmail } from "@/components/copy-email";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/page-hero";
import { Arrow, ArrowUpRight, InstagramGlyph, YouTubeGlyph } from "@/components/ui/doodles";
import { Container } from "@/components/ui/section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: contactPage.meta.title,
  description: contactPage.meta.description,
  path: "/contact",
});

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export default function ContactPage() {
  const { hero, routes, direct, form } = contactPage;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro} sticker="POW!" />

      <section aria-label="Contact options" className="bg-navy-800 py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="space-y-12">
            {/* Who to contact for what */}
            <div>
              <h2 className="text-[2.75rem] leading-none" data-reveal>
                {routes.title}
              </h2>
              <ul className="mt-6 space-y-4">
                {routes.items.map((r, i) => (
                  <li key={r.who} data-reveal style={delay(i * 60)} className="on-paper border-[3px] border-ink bg-white p-4 text-ink shadow-comic sm:p-5">
                    <p className="font-display text-[1.45rem] leading-tight tracking-[0.03em]">{r.who}</p>
                    <p className="mt-1 text-navy-500">{r.how}</p>
                    {r.link && (
                      <Link href={r.link.href} className="group mt-2 inline-flex items-center gap-1.5 font-semibold text-signal-ink underline decoration-2 underline-offset-4">
                        {r.link.label}
                        <Arrow className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct lines */}
            <div data-reveal>
              <h2 className="text-[2.75rem] leading-none">{direct.title}</h2>
              <div className="on-yellow mt-6 border-4 border-ink bg-spark p-5 text-ink shadow-comic-md sm:p-6">
                <p className="font-marker text-sm">{direct.emailLabel}</p>
                <a href={`mailto:${site.email}`} className="mt-1 block font-display text-[clamp(1.15rem,5.3vw,1.9rem)] leading-tight tracking-[0.02em] underline decoration-2 underline-offset-4">
                  {site.email}
                </a>
                <div className="mt-4">
                  <CopyEmail email={site.email} label={direct.copyLabel} copiedLabel={direct.copiedLabel} />
                </div>
                <ul className="mt-5 space-y-3 border-t-[3px] border-ink pt-5">
                  {socialLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 font-semibold">
                        <span className="flex items-center gap-3">
                          {link.label === "YouTube" ? <YouTubeGlyph className="size-6" /> : <InstagramGlyph className="size-6" />}
                          {link.label} <span className="font-medium">{link.handle}</span>
                        </span>
                        <ArrowUpRight className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-[3px] border-ink bg-white px-3 py-2 text-sm font-semibold">{site.responseTime}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="on-paper border-4 border-ink bg-white p-5 text-ink shadow-comic-red-lg sm:p-9 lg:sticky lg:top-28">
              <h2 className="mb-6 text-[2.75rem] leading-none">{form.title}</h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
