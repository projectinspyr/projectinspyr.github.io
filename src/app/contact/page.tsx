import { contactPage } from "@content/pages/contact";
import { site } from "@content/site";
import { socialLinks } from "@content/social";
import { ReachOutForm } from "@/components/forms/reach-out-form";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: contactPage.meta.title,
  description: contactPage.meta.description,
  path: "/contact",
});

export default function ContactPage() {
  const { hero, direct } = contactPage;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro} sticker="POW!" />

      <section aria-label="Reach out form" className="bg-navy-800 py-14 sm:py-20">
        <Container className="max-w-4xl">
          <div className="on-paper border-4 border-ink bg-white p-5 text-ink shadow-comic-red-lg sm:p-9">
            <ReachOutForm />
          </div>
          <p className="mt-9 text-center leading-relaxed text-navy-100">
            {direct.prefix}{" "}
            <a href={`mailto:${site.email}`} className="break-words font-semibold text-spark underline underline-offset-4">
              {site.email}
            </a>
            {socialLinks.map((link) => (
              <span key={link.href}>
                {" · "}
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-spark underline underline-offset-4">
                  {link.handle}
                  <span className="sr-only"> on {link.label} (opens in a new tab)</span>
                </a>
              </span>
            ))}
            <span className="mt-1 block">{site.responseTime}</span>
          </p>
        </Container>
      </section>
    </>
  );
}
