import { privacyPage } from "@content/pages/privacy";
import { site } from "@content/site";
import { Rich } from "@/components/ui/rich";
import { Container, Eyebrow } from "@/components/ui/section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: privacyPage.meta.title,
  description: privacyPage.meta.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section aria-labelledby="page-title" className="relative bg-navy-800 pb-24 pt-32 sm:pb-28 sm:pt-40">
      <div aria-hidden className="halftone-light absolute inset-x-0 top-0 h-80" />
      <Container className="relative max-w-4xl">
        <Eyebrow>Privacy</Eyebrow>
        <h1 id="page-title" className="mt-5 text-[clamp(3.25rem,9vw,6rem)] leading-[0.95]">
          <Rich text={privacyPage.title} />
        </h1>
        <p className="mt-4 text-navy-100">{privacyPage.updated}</p>

        <div className="on-paper mt-10 border-4 border-ink bg-paper p-6 text-ink shadow-comic-red-lg sm:p-10">
          {privacyPage.sections.map((s) => (
            <section key={s.heading} className="border-b-[3px] border-ink/15 py-6 first:pt-0 last:border-0 last:pb-0">
              <h2 className="text-[2rem] leading-none">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-3 text-[1.03rem] leading-relaxed text-navy-500">
                  {p}
                </p>
              ))}
            </section>
          ))}
          <p className="mt-7 border-[3px] border-ink bg-spark px-4 py-3 font-semibold">
            Questions or requests:{" "}
            <a href={`mailto:${site.email}`} className="break-all underline underline-offset-4">
              {site.email}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
