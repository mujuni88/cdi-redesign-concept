"use client";

import { useGsap } from "@/lib/useGsap";

/**
 * Outcomes in the learner's voice rather than curriculum bullets. Each one is
 * a sentence they should be able to say about themselves afterwards.
 */
const OUTCOMES = [
  {
    claim: "I can explain every change between the raw file and the analysis-ready table.",
    detail:
      "Not because I remember it, but because the workflow wrote it down as I worked.",
  },
  {
    claim: "I can tell a real duplicate from a coincidence.",
    detail:
      "And I know which evidence I would need before deleting an observation.",
  },
  {
    claim: "I can hand my analysis to a reviewer with the decisions attached.",
    detail: "Input table, script, output table, report. All four, every time.",
  },
];

export function Outcomes() {
  const scope = useGsap(({ gsap }) => {
    gsap.from("[data-outcome]", {
      scrollTrigger: { trigger: "[data-outcome]", start: "top 85%" },
      y: 24,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
    });
  });

  return (
    <section
      ref={scope as React.RefObject<HTMLElement>}
      aria-labelledby="outcomes-heading"
      className="border-b border-ink-line px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-350">
        <p className="rule-label mb-5 text-valid">What changes</p>
        <h2 id="outcomes-heading" className="text-display max-w-[18ch] text-balance">
          Three sentences you should be able to say when you finish.
        </h2>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-ink-line bg-ink-line md:grid-cols-3">
          {OUTCOMES.map((item) => (
            <li key={item.claim} data-outcome className="bg-ink p-7 lg:p-9">
              <p className="text-[1.15rem] leading-snug text-paper">
                &ldquo;{item.claim}&rdquo;
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
