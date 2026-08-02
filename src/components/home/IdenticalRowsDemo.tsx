"use client";

import Link from "next/link";
import { useState } from "react";
import { IDENTICAL_GROUPS } from "@/lib/iris";

/**
 * The single best idea in CDI's material, playable in fifteen seconds before a
 * visitor is asked for anything. Source: Data Science Foundations, ch.03 —
 * "Identical rows are a signal to investigate, not automatic permission to
 * delete observations."
 */

const group = IDENTICAL_GROUPS[0];

type Choice = "drop" | "retain" | null;

export function IdenticalRowsDemo() {
  const [choice, setChoice] = useState<Choice>(null);

  return (
    <section
      aria-labelledby="demo-heading"
      className="surface-paper border-b border-paper-line px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto grid max-w-350 gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        <div>
          <p className="rule-label mb-5 text-signal">15-second demo</p>
          <h2
            id="demo-heading"
            className="text-display max-w-[16ch] text-balance text-ink"
          >
            Your turn. Make the call.
          </h2>
          <p className="mt-6 max-w-[44ch] text-[1.0625rem] leading-relaxed text-paper-soft">
            These {group.length} rows appear in the Iris dataset — the most-used
            teaching dataset in data science. Every value matches. Most tutorials
            reach for{" "}
            <code className="rounded bg-signal/8 px-1.5 py-0.5 text-[0.9em] text-signal">
              drop_duplicates()
            </code>{" "}
            here.
          </p>
          <p className="mt-4 max-w-[44ch] text-[1.0625rem] leading-relaxed text-paper-soft">
            Make the call, then see what the reasoning actually requires.
          </p>
        </div>

        {/* min-w-0: grid items default to min-width:auto, which would let the
            table's minimum width push the page wider instead of scrolling
            inside its own container. */}
        <div className="min-w-0 rounded-3xl border border-paper-line bg-paper-raised p-6 shadow-[0_14px_34px_rgba(2,24,33,0.07)] sm:p-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-100 border-collapse font-mono text-sm">
              <caption className="sr-only">
                Three identical rows from the Iris dataset
              </caption>
              <thead>
                <tr className="text-paper-soft">
                  <th scope="col" className="pb-2 text-left font-normal">row</th>
                  <th scope="col" className="pb-2 text-left font-normal">sepal_l</th>
                  <th scope="col" className="pb-2 text-left font-normal">sepal_w</th>
                  <th scope="col" className="pb-2 text-left font-normal">petal_l</th>
                  <th scope="col" className="pb-2 text-left font-normal">petal_w</th>
                  <th scope="col" className="pb-2 text-left font-normal">species</th>
                </tr>
              </thead>
              <tbody>
                {group.map((row) => (
                  <tr key={row.index} className="border-t border-paper-line text-ink">
                    <td className="py-2.5 text-paper-soft">{row.index}</td>
                    <td className="py-2.5">{row.sepal_length.toFixed(1)}</td>
                    <td className="py-2.5">{row.sepal_width.toFixed(1)}</td>
                    <td className="py-2.5">{row.petal_length.toFixed(1)}</td>
                    <td className="py-2.5">{row.petal_width.toFixed(1)}</td>
                    <td className="py-2.5">{row.species}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <fieldset className="mt-7 border-0 p-0">
            <legend className="rule-label mb-3 text-paper-soft">
              What do you do?
            </legend>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() => setChoice("drop")}
                aria-pressed={choice === "drop"}
                className={`flex-1 rounded-xl border px-5 py-3.5 text-left font-mono text-sm transition-colors ${
                  choice === "drop"
                    ? "border-change bg-change/8 text-change"
                    : "border-paper-line text-ink hover:border-signal"
                }`}
              >
                Drop the extra rows
              </button>
              <button
                type="button"
                onClick={() => setChoice("retain")}
                aria-pressed={choice === "retain"}
                className={`flex-1 rounded-xl border px-5 py-3.5 text-left font-mono text-sm transition-colors ${
                  choice === "retain"
                    ? "border-pass bg-pass/10 text-signal"
                    : "border-paper-line text-ink hover:border-signal"
                }`}
              >
                Keep them, record why
              </button>
            </div>
          </fieldset>

          <div role="status" aria-live="polite" className="mt-6 min-h-24">
            {choice === "drop" && (
              <div className="rounded-xl border-l-2 border-change bg-change/6 p-5">
                <p className="mb-2 font-mono text-xs tracking-wide text-change">
                  You just deleted two real measurements.
                </p>
                <p className="text-[0.95rem] leading-relaxed text-paper-soft">
                  Two flowers can legitimately have the same four measurements and
                  the same species label. Without a unique identifier there is
                  nothing in this table that distinguishes a data-entry error from
                  a genuine coincidence — so the deletion is a guess presented as a
                  fact.
                </p>
              </div>
            )}
            {choice === "retain" && (
              <div className="rounded-xl border-l-2 border-pass bg-pass/8 p-5">
                <p className="mb-2 font-mono text-xs tracking-wide text-signal">
                  Right — and the record is what makes it defensible.
                </p>
                <p className="text-[0.95rem] leading-relaxed text-paper-soft">
                  To confirm a duplicate you need evidence the table does not
                  contain: a unique observation identifier, a repeated source row,
                  a collection timestamp, or knowledge of how the data was
                  produced. So you report the finding, retain the rows, and write
                  down why.
                </p>
                <Link
                  href="/lessons/data-cleaning"
                  className="mt-4 inline-block font-mono text-xs text-signal underline underline-offset-4 hover:text-ink"
                >
                  Do this properly in the full lesson →
                </Link>
              </div>
            )}
            {!choice && (
              <p className="pt-2 text-sm text-paper-soft/80">
                Pick one. Both answers get a real explanation.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
