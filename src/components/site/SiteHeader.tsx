"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Learn", href: "/#paths" },
  { label: "Practicals", href: "/#practicals" },
  { label: "Mentorship", href: "/#mentorship" },
  { label: "About", href: "/#about" },
];

export function SiteHeader({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = variant === "light";

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? light
            ? "border-b border-paper-line bg-paper/90 backdrop-blur-md"
            : "border-b border-ink-line bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-350 items-center gap-6 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className={`flex items-baseline gap-2.5 ${light ? "text-ink" : "text-paper"}`}
        >
          <span
            aria-hidden
            className="rule-label rounded-sm bg-signal px-1.5 py-1 text-paper"
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
              className={`rounded-full px-3.5 py-2 font-mono text-[0.78rem] tracking-wide transition-colors ${
                light
                  ? "text-paper-soft hover:bg-signal/8 hover:text-signal"
                  : "text-ink-soft hover:bg-paper/8 hover:text-paper"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/lessons/data-cleaning"
            className="ml-2 rounded-full bg-flag px-4 py-2 font-mono text-[0.78rem] font-medium text-ink transition-transform hover:scale-[1.03]"
          >
            Start free lesson
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className={`ml-auto rounded-full border px-3.5 py-2 font-mono text-[0.78rem] md:hidden ${
            light ? "border-paper-line text-ink" : "border-ink-line text-paper"
          }`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className={`md:hidden ${light ? "border-t border-paper-line bg-paper" : "border-t border-ink-line bg-ink"}`}
        >
          <ul className="px-5 py-3">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block border-b py-3.5 font-mono text-sm ${
                    light ? "border-paper-line/60 text-ink" : "border-ink-line/60 text-paper"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <Link
                href="/lessons/data-cleaning"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-flag px-4 py-3 text-center font-mono text-sm text-ink"
              >
                Start free lesson
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
