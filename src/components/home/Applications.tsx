"use client";

import Link from "next/link";
import { useGsap } from "@/lib/useGsap";
import { Placeholder } from "@/components/site/Placeholder";

/**
 * Real analyses from real CDI chapters. Every claim here is traceable to a
 * page on the live site — no invented case studies, no invented results.
 */
const APPLICATIONS = [
  {
    field: "Microbiome",
    title: "Three stool samples, and an honest limit",
    body:
      "The diversity chapter computes Shannon and Bray-Curtis by hand rather than calling a library, on real SRA accessions — then states plainly that three samples cannot support statistical interpretation.",
    quote:
      "This is enough to test workflow structure, but it is not enough for real statistical interpretation.",
    href: "https://microbiome.complexdatainsights.com/08-diversity-analysis.html",
    source: "Microbiome Analysis System, ch. 08",
    accent: "text-valid",
  },
  {
    field: "Transcriptomics",
    title: "20,000 genes, and the 5% that lie",
    body:
      "Differential expression is taught as a statistical argument, not a button. Design formulas, shrinkage estimation, multiple testing — and the repeated insistence that significance is not importance.",
    quote:
      "A statistically significant result is not automatically biologically important.",
    href: "https://rnaseq.complexdatainsights.com/09-differential-expression-analysis.html",
    source: "RNA-Seq System, ch. 09",
    accent: "text-inspect",
  },
  {
    field: "Clinical data",
    title: "The dataset that looks complete and is not",
    body:
      "Eight quality dimensions applied to EHR-derived tables, ending not in a pass/fail flag but in a readiness report a human has to read and judge.",
    quote:
      "A quality flag does not automatically mean a record is wrong. It means the record needs interpretation.",
    href: "https://clinical.complexdatainsights.com/09-clinical-data-quality-checks.html",
    source: "Clinical & Medical Data Systems, ch. 09",
    accent: "text-flag",
  },
];

export function Applications() {
  const scope = useGsap(({ gsap }) => {
    gsap.from("[data-application]", {
      scrollTrigger: { trigger: "[data-application]", start: "top 85%" },
      y: 28,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
    });
  });

  return (
    <section
      ref={scope as React.RefObject<HTMLElement>}
      aria-labelledby="applications-heading"
      className="border-b border-ink-line px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-350">
        <p className="rule-label mb-5 text-valid">Where this goes</p>
        <h2
          id="applications-heading"
          className="text-display max-w-[20ch] text-balance"
        >
          The same discipline, applied to harder data.
        </h2>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {APPLICATIONS.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              data-application
              className="group flex flex-col rounded-3xl border border-ink-line bg-ink-raised p-7 transition-colors hover:border-valid lg:p-9"
            >
              <p className={`rule-label mb-6 ${item.accent}`}>{item.field}</p>
              <h3 className="text-[1.3rem] leading-tight font-semibold text-paper">
                {item.title}
              </h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
                {item.body}
              </p>
              <blockquote className="mt-6 border-l-2 border-ink-line pl-4 text-[0.95rem] leading-relaxed text-paper/80 italic">
                {item.quote}
              </blockquote>
              <p className="mt-auto pt-6 font-mono text-[0.7rem] text-ink-soft group-hover:text-valid">
                {item.source} →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedLesson() {
  return (
    <section
      aria-labelledby="featured-heading"
      className="border-b border-ink-line px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-350">
        <div className="grid gap-10 rounded-4xl border border-ink-line bg-gradient-to-br from-ink-raised to-ink p-7 sm:p-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:p-16">
          <div>
            <p className="rule-label mb-6 text-flag">Featured lesson · DS-L03</p>
            <h2
              id="featured-heading"
              className="text-display max-w-[15ch] text-balance"
            >
              Data Cleaning and Preparation
            </h2>
            <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-soft">
              Nine short sections. You inspect a real dataset, standardize its
              columns, investigate its identical rows, choose a missing-value
              rule, and run the validation. Every decision you make is written
              into a report you can read at the end.
            </p>

            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {[
                ["Time", "~18 min"],
                ["Level", "Foundational"],
                ["Language", "Python"],
                ["You produce", "cleaning-report.txt"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="rule-label mb-1.5 text-ink-soft">{label}</dt>
                  <dd className="font-mono text-sm text-paper">{value}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/lessons/data-cleaning"
              className="mt-10 inline-block rounded-full bg-flag px-6 py-3.5 font-mono text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
            >
              Start the lesson
            </Link>
          </div>

          {/* Where the chapter-opener clip would sit. See docs §11 (V3). */}
          <Placeholder
            kind="asset"
            label="8s chapter-opener clip (V3)"
            className="aspect-4/3 bg-ink/40"
          >
            <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
              <p className="font-mono text-xs text-inspect">
                Misaligned rows settle into a grid.
              </p>
              <p className="font-mono text-xs text-inspect">
                Two rows stay amber and unresolved.
              </p>
              <p className="mt-3 max-w-[32ch] text-[0.8rem] leading-relaxed text-ink-soft">
                Storyboard, generation prompt, and placement are specified in the
                media plan.
              </p>
            </div>
          </Placeholder>
        </div>
      </div>
    </section>
  );
}
