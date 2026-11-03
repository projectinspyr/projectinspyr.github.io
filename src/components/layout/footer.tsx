import Link from "next/link";
import { site } from "@content/site";
import { socialLinks } from "@content/social";
import { BridgeDivider } from "../brand/bridge-divider";
import { Wordmark } from "../brand/wordmark";
import { Container } from "../ui/section";
import { InstagramGlyph, MailGlyph, YouTubeGlyph } from "../ui/doodles";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 pt-6 text-white">
      <BridgeDivider className="text-white/15" />
      <Container className="pt-14">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-8 inline-block">
              <Wordmark id="logo-footer" className="w-[170px]" />
              <span className="sr-only">Project INSPYR, led by students: home</span>
            </Link>
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

      {/* Decorative watermark, drawn as SVG so it reads as artwork rather than text. */}
      <div aria-hidden className="mt-16 select-none overflow-hidden">
        <svg viewBox="0 0 1000 190" className="mx-auto block h-auto w-full max-w-[1500px]">
          <text
            x="470"
            y="182"
            textAnchor="middle"
            fill="#0b1b36"
            fontFamily="var(--font-fredoka), sans-serif"
            fontWeight={700}
            fontSize="232"
            letterSpacing="-4"
          >
            INSPYR
          </text>
        </svg>
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
