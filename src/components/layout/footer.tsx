import Link from "next/link";
import { site } from "@content/site";
import { socialLinks } from "@content/social";
import { LogoCard } from "../brand/wordmark";
import { Container } from "../ui/section";
import { InstagramGlyph, YouTubeGlyph } from "../ui/doodles";

export function Footer() {
  return (
    <footer className="relative border-t-4 border-ink bg-navy-800 pb-8 pt-16 text-white">
      <div aria-hidden className="halftone-light pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1.3fr] lg:grid-cols-[1fr_1.1fr_0.7fr_auto]">
          <div>
            <Link href="/" className="inline-block w-[210px] -rotate-2 transition-transform duration-200 hover:rotate-0">
              <LogoCard />
              <span className="sr-only">Project INSPYR home</span>
            </Link>
            <p className="mt-7 max-w-xs leading-relaxed text-navy-100">{site.instagramBio}</p>
          </div>

          <div>
            <h2 className="mb-4 text-[1.7rem] leading-none text-spark">Talk to us</h2>
            <a
              href={`mailto:${site.email}`}
              className="inline-block max-w-full break-all border-[3px] border-ink bg-spark px-4 py-2.5 font-display text-[1.35rem] leading-tight tracking-[0.04em] text-ink shadow-comic transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-comic-md"
            >
              {site.email}
            </a>
            <ul className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-[3px] border-ink bg-signal-deep px-3.5 py-2 font-display text-[1.15rem] leading-none tracking-[0.05em] text-white shadow-comic-sm transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-comic"
                  >
                    {link.label === "YouTube" ? <YouTubeGlyph className="size-5" /> : <InstagramGlyph className="size-5" />}
                    {link.label}
                    <span className="sr-only"> {link.handle} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-navy-100">
              Based in {site.location.city}, {site.location.country}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-4 text-[1.7rem] leading-none text-spark">Explore</h2>
            <ul className="space-y-2">
              {[{ label: "Home", href: "/" }, ...site.nav, { label: "Privacy", href: "/privacy" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-display text-[1.3rem] leading-none tracking-[0.05em] transition-colors hover:text-spark">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <a
              href="#main"
              className="inline-flex items-center gap-2 border-[3px] border-ink bg-tape px-4 py-2.5 font-display text-[1.25rem] leading-none tracking-[0.05em] text-ink shadow-comic transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-comic-md"
            >
              <svg viewBox="0 0 24 24" aria-hidden className="size-5">
                <path d="M12 20V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.4" />
              </svg>
              Back to top
            </a>
          </div>
        </div>

        <div className="mt-12 border-t-[3px] border-white/20 pt-6">
          <p className="font-display text-[1.1rem] tracking-[0.05em] text-navy-100">© Project INSPYR. Led by students, made in Pune.</p>
        </div>
      </Container>
    </footer>
  );
}
