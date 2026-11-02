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
    <section aria-labelledby="page-title" className="bg-navy-800 pb-24 pt-32 sm:pb-32 sm:pt-40">
      <Container className="max-w-4xl">
        <Eyebrow>Privacy</Eyebrow>
        <h1 id="page-title" className="mt-6 text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
          <Rich text={privacyPage.title} />
        </h1>
        <p className="mt-6 text-navy-300">{privacyPage.updated}</p>

        <div className="on-paper mt-12 rounded-[20px] bg-paper p-7 text-navy-900 sm:p-12">
          {privacyPage.sections.map((s) => (
            <section key={s.heading} className="border-b border-navy-800/10 py-7 first:pt-0 last:border-0 last:pb-0">
              <h2 className="text-2xl font-extrabold tracking-[-0.02em]">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-3 text-[1.05rem] leading-relaxed text-navy-800">
                  {p}
                </p>
              ))}
            </section>
          ))}
          <p className="mt-8 rounded-xl bg-navy-800 px-5 py-4 text-white">
            Questions or requests:{" "}
            <a href={`mailto:${site.email}`} className="break-all font-semibold text-spark underline underline-offset-4">
              {site.email}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
