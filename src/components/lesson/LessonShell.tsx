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
  const { completed } = useTrail();
  const actionable = sections.filter((s) => s.requiresAction);
  const done = actionable.filter((s) => completed.includes(s.id)).length;
  const percent = Math.round((done / actionable.length) * 100);

  return (
    <div className="surface-paper min-h-screen">
      {/* Progress: a hairline on mobile, a rail item on desktop. */}
      <div
        className="sticky top-0 z-30 h-0.5 w-full bg-paper-line"
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

      <div className="mx-auto max-w-350 gap-12 px-5 pb-32 sm:px-8 lg:grid lg:grid-cols-[1fr_20rem] lg:pb-20">
        <div className="min-w-0">{children}</div>

        <aside className="hidden lg:block">
          <div className="sticky top-12 space-y-5 py-14">
            <div className="rounded-2xl border border-paper-line bg-paper-raised p-5">
              <div className="mb-4 flex items-baseline justify-between">
                <p className="rule-label text-paper-soft">Progress</p>
                <span className="font-mono text-[0.7rem] text-signal">
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
                        className="group flex items-center gap-2.5 py-0.5 font-mono text-[0.72rem] text-paper-soft transition-colors hover:text-signal"
                      >
                        <span
                          aria-hidden
                          className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border text-[0.55rem] ${
                            isDone
                              ? "border-pass bg-pass text-ink"
                              : section.requiresAction
                                ? "border-paper-line"
                                : "border-transparent bg-paper-line"
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
        className="mb-10 inline-block font-mono text-[0.75rem] text-paper-soft transition-colors hover:text-signal"
      >
        ← Complex Data Insights
      </Link>

      {/* CDI's own chapter metadata block, kept because it is genuinely useful
          and already systematic across the whole back catalogue. */}
      <dl className="mb-9 flex flex-wrap gap-x-8 gap-y-3 border-y border-paper-line py-4">
        {[
          ["ID", "DS-L03"],
          ["Type", "Interactive lesson"],
          ["Audience", "Beginner / Intermediate"],
          ["Time", "~18 min"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-baseline gap-2.5">
            <dt className="rule-label text-paper-soft">{label}</dt>
            <dd className="font-mono text-[0.78rem] text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <h1 className="text-display max-w-[16ch] text-balance text-ink">
        Data Cleaning and Preparation
      </h1>
      <p className="mt-6 max-w-[52ch] text-[1.2rem] leading-[1.55] text-paper-soft">
        Every dataset arrives with a history you did not witness. This lesson is
        about deciding what to change — and being able to say why, six months
        later, to someone who was not there.
      </p>
    </header>
  );
}
