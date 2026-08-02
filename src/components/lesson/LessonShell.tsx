"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { useTrail } from "@/lib/trail";
import {
  DecisionTrailRail,
  DecisionTrailSheet,
} from "./DecisionTrail";

export type SectionRef = { id: string; label: string; requiresAction: boolean };

/**
 * Lesson chrome: progress that means something, the decision trail, and a
 * contents rail. Generic — a second lesson supplies a different section list
 * and different children.
 */
export function LessonShell({
  sections,
  children,
}: {
  sections: SectionRef[];
  children: ReactNode;
}) {
  const { completed, entries, resumed, reset } = useTrail();
  const actionable = sections.filter((s) => s.requiresAction);
  const done = actionable.filter((s) => completed.includes(s.id)).length;
  const percent = Math.round((done / actionable.length) * 100);

  return (
    <div className="surface-alt min-h-screen">
      {/* Progress: a hairline on mobile, a rail item on desktop. */}
      <div
        className="sticky top-0 z-30 h-0.5 w-full bg-line"
        role="progressbar"
        aria-label="Lesson progress"
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={actionable.length}
        aria-valuetext={`${done} of ${actionable.length} decisions made`}
      >
        <div
          className="h-full bg-signal transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mx-auto max-w-350 gap-12 px-5 pb-32 sm:px-8 lg:grid lg:grid-cols-[minmax(0,72ch)_20rem] lg:justify-center lg:pb-20">
        <div className="min-w-0">
          {resumed && entries.length > 0 && (
            <div
              role="status"
              className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-line bg-bg-alt px-5 py-3.5"
            >
              <p className="font-mono text-[0.78rem] text-fg">
                Resuming — {entries.length} decision
                {entries.length === 1 ? "" : "s"} recorded
              </p>
              <button
                type="button"
                onClick={reset}
                className="font-mono text-[0.75rem] text-signal underline underline-offset-4 hover:text-fg"
              >
                Start over
              </button>
            </div>
          )}
          {children}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-12 space-y-5 py-14">
            <div className="rounded-2xl border border-line bg-bg-raised p-5">
              <div className="mb-4 flex items-baseline justify-between">
                <p className="rule-label text-fg-muted">Progress</p>
                <span className="font-mono text-[0.75rem] text-signal">
                  {done}/{actionable.length}
                </span>
              </div>
              <ol className="space-y-2">
                {sections.map((section) => {
                  const isDone = completed.includes(section.id);
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="group flex items-center gap-2.5 py-0.5 font-mono text-[0.75rem] text-fg-muted transition-colors hover:text-signal"
                      >
                        <span
                          aria-hidden
                          className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border text-[0.55rem] ${
                            isDone
                              ? "border-marker-pass bg-marker-pass text-on-accent"
                              : section.requiresAction
                                ? "border-line"
                                : "border-transparent bg-line"
                          }`}
                        >
                          {isDone ? "✓" : ""}
                        </span>
                        <span className="truncate">{section.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>

            <DecisionTrailRail />
          </div>
        </aside>
      </div>

      <DecisionTrailSheet />
    </div>
  );
}

export function LessonHeader() {
  return (
    <header className="pt-14 lg:pt-20">
      <Link
        href="/"
        className="mb-10 inline-block font-mono text-[0.75rem] text-fg-muted transition-colors hover:text-signal"
      >
        ← Complex Data Insights
      </Link>

      {/* CDI's own chapter metadata block, kept because it is genuinely useful
          and already systematic across the whole back catalogue. */}
      <dl className="mb-9 flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-4">
        {[
          ["ID", "DS-L03"],
          ["Type", "Interactive lesson"],
          ["Audience", "Beginner / Intermediate"],
          ["Time", "~18 min"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-baseline gap-2.5">
            <dt className="rule-label text-fg-muted">{label}</dt>
            <dd className="font-mono text-[0.78rem] text-fg">{value}</dd>
          </div>
        ))}
      </dl>

      <h1 className="text-display max-w-[16ch] text-balance text-fg">
        Data Cleaning and Preparation
      </h1>
      <p className="mt-6 max-w-[52ch] text-[1.2rem] leading-[1.55] text-fg-muted">
        Every dataset arrives with a history you did not witness. This lesson is
        about deciding what to change — and being able to say why, six months
        later, to someone who was not there.
      </p>
    </header>
  );
}
