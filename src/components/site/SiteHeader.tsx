"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

// "Learn" previously pointed at #paths, an anchor that lived only in a
// component the page stopped rendering — so the first nav item silently did
// nothing. It now targets the section that actually exists.
const NAV = [
  { label: "Learn", href: "/#rows" },
  { label: "Practicals", href: "/#practicals" },
  { label: "Mentorship", href: "/#mentorship" },
  { label: "About", href: "/#about" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/90 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-350 items-center gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-baseline gap-2.5 text-fg">
          <span
            aria-hidden
            className="rule-label rounded-sm bg-btn px-1.5 py-1 text-on-btn"
          >
            CDI
          </span>
          <span className="hidden font-display text-[0.95rem] font-semibold tracking-tight sm:inline">
            Complex Data Insights
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-3.5 py-2 font-mono text-[0.78rem] tracking-wide text-fg-muted transition-colors hover:bg-signal/10 hover:text-signal"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle className="ml-2" />
          <Link
            href="/lessons/data-cleaning"
            className="ml-1 rounded-full bg-accent px-4 py-2 font-mono text-[0.78rem] font-medium text-on-accent transition-transform hover:scale-[1.03]"
          >
            Start free lesson
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            // Points at a panel that is always in the DOM, so the relationship
            // resolves whether or not the menu is currently open.
            aria-controls="mobile-nav"
            className="rounded-full border border-line px-3.5 py-2 font-mono text-[0.78rem] text-fg"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="md:hidden">
        <nav aria-label="Main" className="border-t border-line bg-bg">
          <ul className="px-5 py-3">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line/60 py-3.5 font-mono text-sm text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <Link
                href="/lessons/data-cleaning"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-accent px-4 py-3 text-center font-mono text-sm text-on-accent"
              >
                Start free lesson
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
