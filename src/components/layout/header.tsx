"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@content/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "../brand/wordmark";
import { ButtonLink } from "../ui/button";
import { InstagramGlyph, Spark } from "../ui/doodles";
import { scroller } from "../motion/smooth-scroll";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

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
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-white/10 bg-navy-900/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link href="/" className="relative z-10 text-[1.35rem] text-white" aria-label="Project INSPYR, home">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "group relative rounded-full px-4 py-2 text-[0.97rem] font-medium transition-colors",
                isActive(item.href) ? "text-white" : "text-navy-200 hover:text-white",
              )}
            >
              {item.label}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-4 bottom-1 h-[2px] origin-left rounded-full bg-spark transition-transform duration-300 ease-[var(--ease-spring)]",
                  isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </Link>
          ))}
          <span className="ml-4">
            <ButtonLink href="/partners" magnetic className="h-11 px-5">
              Partner with us
            </ButtonLink>
          </span>
        </nav>

        <button
          ref={toggleRef}
          id="menu-toggle"
          type="button"
          className="relative z-10 -mr-2 grid size-12 place-items-center rounded-full md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="relative block h-3.5 w-6">
            <span
              className={cn(
                "absolute left-0 top-0 h-[2px] w-6 rounded-full bg-white transition-transform duration-300",
                open && "translate-y-[6px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-[2px] rounded-full bg-white transition-[transform,width] duration-300",
                open ? "w-6 -translate-y-[6px] -rotate-45" : "w-4",
              )}
            />
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
            className="fixed inset-0 top-[72px] h-[calc(100dvh-72px)] overflow-y-auto bg-navy-900 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="flex min-h-full flex-col justify-between px-5 pb-10 pt-8">
              <ul className="space-y-1">
                {[{ label: "Home", href: "/" }, ...site.nav].map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="flex items-center justify-between border-b border-white/10 py-4 font-display text-[2.6rem] font-extrabold leading-none tracking-[-0.03em]"
                    >
                      {item.label}
                      {pathname === item.href && <Spark className="size-6 text-spark" />}
                    </Link>
                  </m.li>
                ))}
              </ul>
              <m.div
                className="mt-10 space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <ButtonLink href="/partners" className="w-full">
                  Partner with us
                </ButtonLink>
                <a
                  href={site.social.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-navy-200"
                >
                  <InstagramGlyph className="size-5" />
                  {site.social.instagram.handle}
                  <span className="sr-only"> on Instagram (opens in a new tab)</span>
                </a>
              </m.div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
