"use client";

import { useRef, useState } from "react";
import { useGsap, usePrefersReducedMotion } from "@/lib/useGsap";

/**
 * The five-step cleaning loop from DS-L03, scroll-driven.
 *
 * This is the one place a pinned section earns itself: the loop has an order,
 * and the order is the content. Under reduced motion it degrades to a plain
 * numbered list — no information lives only in the animation.
 */

const STEPS = [
  {
    verb: "Measure",
    body: "Count the issue before you have an opinion about it. How many rows, how many missing, how many identical.",
    colour: "var(--color-inspect)",
  },
  {
    verb: "Inspect",
    body: "Look at the affected observations themselves. A number tells you something is there; only the rows tell you what it is.",
    colour: "var(--color-inspect)",
  },
  {
    verb: "Decide",
    body: "Choose a rule and write it down in words. If you cannot state the rule, you do not have one — you have a habit.",
    colour: "var(--color-flag)",
  },
  {
    verb: "Apply",
    body: "Change the data only where the rule justifies it. Everything else stays exactly as it arrived.",
    colour: "var(--color-valid)",
  },
  {
    verb: "Validate",
    body: "Confirm the output meets the conditions you said it must meet. Then record what you found and what you did.",
    colour: "var(--color-pass)",
  },
];

export function CycleDiagram() {
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const scope = useGsap(({ gsap, scope }) => {
    const panel = scope.querySelector("[data-cycle-panel]");
    if (!panel) return;

    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: `+=${STEPS.length * 320}`,
          pin: panel,
          scrub: 0.4,
          onUpdate: (self) => {
            const index = Math.min(
              STEPS.length - 1,
              Math.floor(self.progress * STEPS.length),
            );
            setActive(index);
          },
        },
      },
    );
  });

  // Reduced motion: the same content, as a list, with nothing pinned.
  if (reduced) {
    return (
      <ol className="max-w-[62ch] space-y-5">
        {STEPS.map((step, i) => (
          <li key={step.verb} className="flex gap-4">
            <span className="mt-1 font-mono text-sm" style={{ color: step.colour }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-[1.05rem] font-semibold text-ink">{step.verb}</p>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-paper-soft">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div ref={scope as React.RefObject<HTMLDivElement>} className="relative">
      <div
        data-cycle-panel
        className="flex min-h-[70vh] items-center rounded-3xl border border-paper-line bg-paper-raised p-7 sm:p-10"
      >
        <div className="w-full">
          {/* The ring: five arcs, the active one lit. */}
          <div ref={trackRef} className="mb-9 flex items-center gap-1.5">
            {STEPS.map((step, i) => (
              <div key={step.verb} className="flex-1">
                <div
                  className="h-1 rounded-full transition-colors duration-500"
                  style={{
                    background:
                      i <= active ? step.colour : "var(--color-paper-line)",
                  }}
                />
                <p
                  className={`rule-label mt-3 transition-colors duration-500 ${
                    i === active ? "text-ink" : "text-paper-soft/50"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
            ))}
          </div>

          <p
            className="font-display text-5xl font-semibold transition-colors duration-500 sm:text-6xl"
            style={{ color: STEPS[active].colour }}
          >
            {STEPS[active].verb}
          </p>
          <p className="mt-5 max-w-[46ch] text-[1.1rem] leading-relaxed text-paper-soft">
            {STEPS[active].body}
          </p>

          <p className="mt-9 font-mono text-[0.72rem] text-paper-soft/60">
            {active === STEPS.length - 1
              ? "…and the loop starts again on the next issue."
              : "keep scrolling"}
          </p>
        </div>
      </div>
      {/* Scroll runway for the pin. */}
      <div style={{ height: `${STEPS.length * 320}px` }} aria-hidden />
    </div>
  );
}
