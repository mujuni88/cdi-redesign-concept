"use client";

import { useRef, useState } from "react";
import { useTrail, type TrailKind } from "@/lib/trail";
import { usePrefersReducedMotion, gsap } from "@/lib/useGsap";

export type Option = {
  id: string;
  label: string;
  correct?: boolean;
  /** Shown whichever way they answer — a wrong answer deserves a real reason. */
  feedback: string;
};

/**
 * A decision the learner has to make before the lesson tells them the answer.
 * Feedback is immediate and never punitive: an incorrect choice gets one small
 * shake and a full explanation, not a red X.
 */
export function KnowledgeCheck({
  id,
  question,
  hint,
  options,
  trail,
}: {
  id: string;
  question: string;
  hint?: string;
  options: Option[];
  /** Written to the decision trail once they answer correctly. */
  trail: { kind: TrailKind; text: string; value?: string };
}) {
  const [chosen, setChosen] = useState<string | null>(null);
  const { record, complete } = useTrail();
  const reduced = usePrefersReducedMotion();
  const groupRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.id === chosen);
  const answered = Boolean(selected);
  const isCorrect = Boolean(selected?.correct);

  const choose = (option: Option) => {
    if (answered && isCorrect) return;
    setChosen(option.id);

    if (option.correct) {
      record({ id, kind: trail.kind, text: trail.text, value: trail.value });
      complete(id);
      if (!reduced && groupRef.current) {
        gsap.fromTo(
          groupRef.current,
          { boxShadow: "0 0 0 0 rgba(53,183,121,0.5)" },
          { boxShadow: "0 0 0 6px rgba(53,183,121,0)", duration: 0.8 },
        );
      }
    } else if (!reduced && groupRef.current) {
      gsap.fromTo(
        groupRef.current,
        { x: -6 },
        { x: 0, duration: 0.45, ease: "elastic.out(1, 0.4)" },
      );
    }
  };

  return (
    <div
      ref={groupRef}
      className="max-w-[62ch] rounded-2xl border border-paper-line bg-paper-raised p-6 sm:p-7"
    >
      <fieldset className="border-0 p-0">
        <legend className="rule-label mb-3 text-signal">Knowledge check</legend>
        <p className="mb-2 text-[1.05rem] leading-snug font-semibold text-ink">
          {question}
        </p>
        {hint && (
          <p className="mb-5 text-[0.9rem] leading-relaxed text-paper-soft">
            {hint}
          </p>
        )}

        <div className="mt-5 space-y-2.5">
          {options.map((option) => {
            const active = chosen === option.id;
            const state = active
              ? option.correct
                ? "border-pass bg-pass/10"
                : "border-change bg-change/6"
              : "border-paper-line hover:border-signal";
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => choose(option)}
                aria-pressed={active}
                className={`flex w-full items-start gap-3 rounded-xl border px-5 py-3.5 text-left text-[0.95rem] transition-colors ${state} ${
                  active ? "text-ink" : "text-ink"
                }`}
              >
                {/* Shape as well as colour, so the state does not depend on hue. */}
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border font-mono text-[0.6rem] ${
                    active
                      ? option.correct
                        ? "border-pass bg-pass text-ink"
                        : "border-change bg-change text-paper"
                      : "border-paper-line"
                  }`}
                >
                  {active ? (option.correct ? "✓" : "✕") : ""}
                </span>
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div role="status" aria-live="polite" className="mt-5">
        {selected && (
          <div
            className={`rounded-xl border-l-2 p-5 ${
              selected.correct
                ? "border-pass bg-pass/8"
                : "border-change bg-change/6"
            }`}
          >
            <p
              className={`mb-2 font-mono text-[0.7rem] tracking-wide ${
                selected.correct ? "text-signal" : "text-change"
              }`}
            >
              {selected.correct ? "Correct — recorded in your trail" : "Not quite"}
            </p>
            <p className="text-[0.95rem] leading-relaxed text-paper-soft">
              {selected.feedback}
            </p>
            {!selected.correct && (
              <p className="mt-3 font-mono text-[0.72rem] text-paper-soft/80">
                Try again — nothing is scored.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
