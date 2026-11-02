import Link from "next/link";
import { site } from "@content/site";
import { socialLinks } from "@content/social";
import { BridgeDivider } from "../brand/bridge-divider";
import { Container } from "../ui/section";
import { InstagramGlyph, MailGlyph, Spark, YouTubeGlyph } from "../ui/doodles";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 pt-6 text-white">
      <BridgeDivider className="text-white/15" />
      <Container className="pt-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="max-w-sm font-display text-3xl font-bold leading-tight tracking-[-0.02em]">
              Bridging the people doing good work and the people who should{" "}
              <span className="text-spark">see it</span>.
            </p>
            <p className="mt-5 max-w-sm text-navy-200">{site.instagramBio}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-navy-300">Explore</h2>
            <ul className="space-y-3">
              {[{ label: "Home", href: "/" }, ...site.nav, { label: "Privacy", href: "/privacy" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-navy-100 transition-colors hover:text-spark">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-navy-300">Connect</h2>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-navy-100 transition-colors hover:text-spark"
                  >
                    {link.label === "YouTube" ? <YouTubeGlyph className="size-5" /> : <InstagramGlyph className="size-5" />}
                    {link.handle}
                    <span className="sr-only"> on {link.label} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 break-all text-navy-100 transition-colors hover:text-spark"
                >
                  <MailGlyph className="size-5 shrink-0" />
                  {site.email}
                </a>
              </li>
              <li className="pt-2 text-navy-300">
                Based in {site.location.city}, {site.location.country}
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div aria-hidden className="mt-16 select-none overflow-hidden">
        <p className="flex items-center justify-center gap-[0.12em] whitespace-nowrap font-display text-[19vw] font-extrabold leading-[0.78] tracking-[-0.05em] text-navy-850">
          INSPYR
          <Spark className="size-[0.32em] text-spark/80" />
        </p>
      </div>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© Project INSPYR. Led by students, made in Pune.</p>
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy
          </Link>
        </Container>
      </div>
    </footer>
  );
}
