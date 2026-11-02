import Link from "next/link";
import type { CSSProperties } from "react";
import { contactPage } from "@content/pages/contact";
import { site } from "@content/site";
import { socialLinks } from "@content/social";
import { CopyEmail } from "@/components/copy-email";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/page-hero";
import { Arrow, ArrowUpRight, InstagramGlyph, MailGlyph, YouTubeGlyph } from "@/components/ui/doodles";
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
      <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro} />

      <section aria-label="Contact options" className="bg-navy-800 pb-24 pt-10 sm:pb-32 sm:pt-12">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="space-y-12">
            {/* Who to contact for what */}
            <div>
              <h2 className="text-3xl font-extrabold tracking-[-0.025em]" data-reveal>
                {routes.title}
              </h2>
              <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {routes.items.map((r, i) => (
                  <li key={r.who} data-reveal style={delay(i * 70)} className="py-5">
                    <p className="font-display text-lg font-bold leading-snug">{r.who}</p>
                    <p className="mt-1 text-navy-200">{r.how}</p>
                    {r.link && (
                      <Link href={r.link.href} className="group mt-3 inline-flex items-center gap-1.5 font-semibold text-spark">
                        {r.link.label}
                        <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct lines */}
            <div data-reveal>
              <h2 className="text-3xl font-extrabold tracking-[-0.025em]">{direct.title}</h2>
              <div className="mt-6 rounded-[24px] border border-white/10 bg-navy-850 p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-300">{direct.emailLabel}</p>
                <a href={`mailto:${site.email}`} className="mt-2 flex items-center gap-3 break-all font-display text-lg font-bold transition-colors hover:text-spark sm:text-xl">
                  <MailGlyph className="size-6 shrink-0 text-spark" />
                  {site.email}
                </a>
                <div className="mt-4">
                  <CopyEmail email={site.email} label={direct.copyLabel} copiedLabel={direct.copiedLabel} />
                </div>
                <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  {socialLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 font-semibold transition-colors hover:text-spark">
                        <span className="flex items-center gap-3">
                          {link.label === "YouTube" ? <YouTubeGlyph className="size-6 text-spark" /> : <InstagramGlyph className="size-6 text-spark" />}
                          {link.label} <span className="font-normal text-navy-200">{link.handle}</span>
                        </span>
                        <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 flex items-center gap-2.5 rounded-xl bg-white/[0.05] px-4 py-3 text-sm text-navy-100">
                  <span aria-hidden className="size-2 shrink-0 rounded-full bg-spark" />
                  {site.responseTime}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="on-paper relative rounded-[20px] bg-paper p-6 text-navy-900 shadow-[0_40px_90px_-40px_rgb(0_0_0/0.8)] sm:p-10 lg:sticky lg:top-28">
              <span className="tape -top-3 right-10 rotate-3" />
              <h2 className="mb-8 text-3xl font-extrabold tracking-[-0.025em]">{form.title}</h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
