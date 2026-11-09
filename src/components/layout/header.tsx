"use client";

import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@content/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "../brand/wordmark";
import { ButtonLink } from "../ui/button";
import { InstagramGlyph } from "../ui/doodles";
import { scroller } from "../motion/smooth-scroll";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    scroller.lenis?.stop();
    document.body.style.overflow = "hidden";
    headerRef.current?.querySelector<HTMLElement>("#mobile-menu a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !headerRef.current) return;
      const focusables = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>("#menu-toggle, #mobile-menu a"),
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      scroller.lenis?.start();
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 border-b-4 border-ink bg-navy-800/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="relative z-10 block">
          <Wordmark />
          <span className="sr-only"> home</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "px-3.5 py-2 font-display text-[1.3rem] leading-none tracking-[0.05em] transition-colors hover:text-spark",
                isActive(item.href) ? "text-spark" : "text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
          <span className="ml-3">
            <ButtonLink href="/partners" magnetic icon="none" className="h-11 px-5 text-[1.2rem]">
              Partner with us
            </ButtonLink>
          </span>
        </nav>

        <button
          ref={toggleRef}
          id="menu-toggle"
          type="button"
          className="relative z-10 grid size-11 place-items-center border-[3px] border-ink bg-signal-deep shadow-comic-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="relative block h-3.5 w-5">
            <span className={cn("absolute left-0 top-0 h-[3px] w-5 bg-white transition-transform duration-200", open && "translate-y-[5.5px] rotate-45")} />
            <span className={cn("absolute bottom-0 left-0 h-[3px] w-5 bg-white transition-transform duration-200", open && "-translate-y-[5.5px] -rotate-45")} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 top-[76px] h-[calc(100dvh-76px)] overflow-y-auto bg-spark text-ink lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="on-yellow halftone-blue flex min-h-full flex-col justify-between px-5 pb-10 pt-8">
              <ul className="space-y-3">
                {[{ label: "Home", href: "/" }, ...site.nav].map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={cn(
                        "block border-4 border-ink px-5 py-3 font-display text-[2.6rem] leading-none tracking-[0.03em] shadow-comic",
                        pathname === item.href ? "bg-navy-800 text-white" : "bg-white text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </m.li>
                ))}
              </ul>
              <div className="mt-10 space-y-4">
                <ButtonLink href="/partners" className="w-full">
                  Partner with us
                </ButtonLink>
                <a
                  href={site.social.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 font-semibold text-ink"
                >
                  <InstagramGlyph className="size-5" />
                  {site.social.instagram.handle}
                  <span className="sr-only"> on Instagram (opens in a new tab)</span>
                </a>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
