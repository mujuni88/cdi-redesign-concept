"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IRIS, IDENTICAL_ROW_INDICES, DATASET_FACTS } from "@/lib/iris";
import { CDI } from "@/lib/catalog";
import { useGsap, usePrefersReducedMotion } from "@/lib/useGsap";

/**
 * The hero is the product's argument, performed rather than asserted: a real
 * table with a real problem in it, and a decision trail writing itself as three
 * inspections run. It shows what "defensible" means in about six seconds.
 */

const PREVIEW_ROWS = [8, 9, 10, 11, 34, 35, 36, 37];

const SEQUENCE = [
  {
    label: "MEASURED",
    text: "150 rows, 5 columns read from data/iris.csv",
    tone: "text-inspect",
  },
  {
    label: "MEASURED",
    text: `${DATASET_FACTS.missingValues} missing values across all columns`,
    tone: "text-inspect",
  },
  {
    label: "FLAGGED",
    text: `${DATASET_FACTS.identicalRowCount} rows are identical to another row`,
    tone: "text-flag",
  },
  {
    label: "DECISION",
    text: "Retained — no unique identifier proves they are duplicates",
    tone: "text-pass",
  },
];

export function Hero() {
  const [step, setStep] = useState(0);
  const reduced = usePrefersReducedMotion();
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const timers = SEQUENCE.map((_, i) =>
      window.setTimeout(() => setStep(i + 1), 900 + i * 1150),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [reduced]);

  // The trail is the point of the hero, so reduced-motion visitors get the
  // finished record immediately rather than an empty panel.
  const shownStep = reduced ? SEQUENCE.length : step;

  const scope = useGsap(({ gsap }) => {
    gsap.from("[data-hero-line]", {
      y: 22,
      opacity: 0,
      duration: 0.9,
      stagger: 0.075,
      ease: "power3.out",
    });
    gsap.from("[data-hero-panel]", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.25,
      ease: "power3.out",
    });
    gsap.from("[data-hero-row]", {
      opacity: 0,
      x: -8,
      duration: 0.45,
      stagger: 0.045,
      delay: 0.5,
      ease: "power2.out",
    });
  });

  const flagged = shownStep >= 3;

  return (
    <section
      ref={scope as React.RefObject<HTMLElement>}
      className="grain relative overflow-hidden border-b border-ink-line"
    >
      {/* A single soft petrol wash rather than a gradient hero — depth without
          announcing itself. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-60 h-160 w-160 rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #036281, transparent 70%)" }}
      />

      <div className="mx-auto grid max-w-350 gap-14 px-5 pt-16 pb-20 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:pt-24 lg:pb-28">
        <div>
          <p data-hero-line className="rule-label mb-6 text-valid">
            For scientists with data in hand
          </p>

          <h1
            data-hero-line
            className="text-hero max-w-[13ch] text-balance text-paper"
          >
            Turn complex data into clear,{" "}
            <span className="relative inline-block">
              <span className="relative z-10">defensible</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-[0.12em] z-0 h-[0.18em] bg-flag/70"
              />
            </span>{" "}
            insight.
          </h1>

          <p
            data-hero-line
            className="mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg"
          >
            Most tutorials show you which function to call. They stop before the
            part that decides whether your analysis survives review: what you
            changed, why you changed it, and how you would explain it six months
            from now.
          </p>

          <div data-hero-line className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/lessons/data-cleaning"
              className="rounded-full bg-flag px-6 py-3.5 font-mono text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
            >
              Start the free lesson
            </Link>
            <Link
              href="#paths"
              className="rounded-full border border-ink-line px-6 py-3.5 font-mono text-sm text-paper transition-colors hover:border-valid hover:text-valid"
            >
              Browse {CDI.guideCount} open guides
            </Link>
          </div>

          <p data-hero-line className="mt-6 font-mono text-xs text-ink-soft">
            No account. No paywall. {CDI.chapterCount} chapters, free to read.
          </p>
        </div>

        {/* The live demonstration */}
        <div
          data-hero-panel
          className="min-w-0 overflow-hidden rounded-3xl border border-ink-line bg-ink-raised shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center justify-between border-b border-ink-line px-5 py-3">
            <code className="text-xs text-ink-soft">data/iris.csv</code>
            <span className="rule-label text-ink-soft">rows 8–37 of 150</span>
          </div>

          <div ref={tableRef} className="overflow-x-auto">
            <table className="w-full min-w-125 border-collapse font-mono text-xs">
              <caption className="sr-only">
                Preview of the Iris dataset showing three identical rows
              </caption>
              <thead>
                <tr className="text-ink-soft">
                  <th scope="col" className="px-3 py-2 text-left font-normal">
                    #
                  </th>
                  {["sepal_length", "sepal_width", "petal_length", "petal_width", "species"].map(
                    (c) => (
                      <th key={c} scope="col" className="px-3 py-2 text-left font-normal">
                        {c}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {PREVIEW_ROWS.map((i) => {
                  const row = IRIS[i];
                  const isFlagged = IDENTICAL_ROW_INDICES.has(row.index);
                  return (
                    <tr
                      key={row.index}
                      data-hero-row
                      className={`border-t border-ink-line/60 transition-colors duration-700 ${
                        flagged && isFlagged ? "bg-flag/12 text-flag" : "text-paper/85"
                      }`}
                    >
                      <td className="px-3 py-2 text-ink-soft">{row.index}</td>
                      <td className="px-3 py-2">{row.sepal_length.toFixed(1)}</td>
                      <td className="px-3 py-2">{row.sepal_width.toFixed(1)}</td>
                      <td className="px-3 py-2">{row.petal_length.toFixed(1)}</td>
                      <td className="px-3 py-2">{row.petal_width.toFixed(1)}</td>
                      <td className="px-3 py-2">{row.species}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="border-t border-ink-line bg-ink/60 px-5 py-4">
            <p className="rule-label mb-3 text-ink-soft">Decision trail</p>
            <ol className="space-y-2" aria-live="polite">
              {SEQUENCE.slice(0, shownStep).map((entry) => (
                <li
                  key={entry.text}
                  className="flex gap-3 font-mono text-[0.7rem] leading-relaxed motion-safe:animate-[fadeUp_0.5s_ease-out]"
                >
                  <span className={`shrink-0 ${entry.tone}`}>{entry.label}</span>
                  <span className="text-paper/70">{entry.text}</span>
                </li>
              ))}
              {shownStep < SEQUENCE.length && (
                <li className="font-mono text-[0.7rem] text-ink-soft">
                  <span className="motion-safe:animate-pulse">inspecting…</span>
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
