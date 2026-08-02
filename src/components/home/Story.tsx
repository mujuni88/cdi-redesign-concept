"use client";

import Link from "next/link";
import { CDI } from "@/lib/catalog";
import { useGsap } from "@/lib/useGsap";
import { Placeholder, UnverifiedNote } from "@/components/site/Placeholder";

const STEPS = [
  {
    title: "Decide, don't just read",
    body: "Every section asks you to make a call before it tells you the answer. Reading about a decision is not the same as making one.",
  },
  {
    title: "Every decision is logged",
    body: "As you work, a plain-language record builds beside the lesson: what you measured, what rule you applied, and why.",
  },
  {
    title: "You leave with an artifact",
    body: "The record becomes a cleaning report — the same file the reusable script produces. It is evidence, not a completion badge.",
  },
  {
    title: "Go deeper when you want to",
    body: "Each section links to the full chapter it came from. The lesson is a front door to 132 chapters, not a replacement for them.",
  },
];

export function HowItWorks() {
  const scope = useGsap(({ gsap }) => {
    gsap.from("[data-step]", {
      scrollTrigger: { trigger: "[data-step]", start: "top 85%" },
      x: -16,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  });

  return (
    <section
      ref={scope as React.RefObject<HTMLElement>}
      aria-labelledby="how-heading"
      className="surface-paper border-b border-paper-line px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto grid max-w-350 gap-14 lg:grid-cols-[0.9fr_1fr] lg:gap-20">
        <div>
          <p className="rule-label mb-5 text-signal">How it works</p>
          <h2 id="how-heading" className="text-display max-w-[16ch] text-balance text-ink">
            A lesson you do, not a page you finish.
          </h2>
          <p className="mt-6 max-w-[44ch] text-[1.0625rem] leading-relaxed text-paper-soft">
            CDI&rsquo;s own workflow keeps four things: the input table, the
            script, the cleaned output, and the report. The report is the part
            that makes the other three trustworthy — so the lessons are built
            around producing one.
          </p>

          {/* The signature component, shown here as illustration. */}
          <div className="mt-10 rounded-2xl border border-paper-line bg-ink p-5">
            <p className="rule-label mb-4 text-ink-soft">
              cleaning-report.txt · excerpt
            </p>
            <ol className="space-y-2.5 font-mono text-[0.7rem] leading-relaxed">
              {[
                ["MEASURED", "text-inspect", "150 rows, 5 columns, 0 missing values"],
                ["RULE APPLIED", "text-valid", "Column names standardized to snake_case"],
                ["DECISION", "text-flag", "5 identical rows retained — no unique identifier"],
                ["VALIDATED", "text-pass", "Schema, dtypes and completeness all passed"],
              ].map(([label, tone, text]) => (
                <li key={text} className="flex gap-3">
                  <span className={`w-24 shrink-0 ${tone}`}>{label}</span>
                  <span className="text-paper/70">{text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-3xl border border-paper-line bg-paper-line">
          {STEPS.map((step, i) => (
            <li key={step.title} data-step className="bg-paper-raised p-7 lg:p-9">
              <div className="flex gap-5">
                <span
                  aria-hidden
                  className="mt-1 font-mono text-sm text-signal/50"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1.15rem] font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-paper-soft">
                    {step.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Instructor() {
  return (
    <section
      id="about"
      aria-labelledby="instructor-heading"
      className="border-b border-ink-line px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto grid max-w-350 gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
        <div>
          {/* Highest-priority media asset in the plan — see docs §11 (V2). */}
          <Placeholder
            kind="asset"
            label="Instructor photo + 70s intro (V2)"
            className="aspect-4/5 bg-ink-raised"
          >
            <div className="flex h-full flex-col justify-end p-7">
              <p className="text-[0.85rem] leading-relaxed text-ink-soft">
                Should be filmed, not generated. A synthetic avatar of a real
                named scientist would undermine the exact credibility it exists
                to build.
              </p>
            </div>
          </Placeholder>
        </div>

        <div>
          <p className="rule-label mb-5 text-valid">Who is teaching</p>
          <h2
            id="instructor-heading"
            className="text-display max-w-[16ch] text-balance"
          >
            Teresia Mrema Buza
          </h2>

          <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-paper/85">
            A computational biologist and data scientist, and an independent
            researcher since 2019. Her work spans computational biology,
            multi-omics interpretation, statistical analysis, and reproducible
            data workflows.
          </p>

          <blockquote className="mt-8 max-w-[48ch] border-l-2 border-flag pl-5 text-[1.05rem] leading-relaxed text-paper italic">
            &ldquo;Many people can access tools and tutorials but receive less
            support in connecting those tools into coherent workflows,
            interpreting results, documenting decisions, and turning completed
            work into real capability.&rdquo;
            <footer className="mt-3 font-mono text-xs text-ink-soft not-italic">
              — the founding observation, from complexdatainsights.com/about
            </footer>
          </blockquote>

          <div className="mt-10 rounded-2xl border border-dashed border-change/45 p-6">
            <p className="rule-label mb-4 text-change">
              Placeholder · claims requiring confirmation
            </p>
            <p className="mb-4 text-[0.9rem] leading-relaxed text-ink-soft">
              These are externally verifiable and currently appear nowhere on the
              live site. They are the strongest credibility signals CDI has, and
              they should be published — after TMB confirms them.
            </p>
            <ul className="space-y-2.5 text-[0.92rem] text-paper/80">
              <li>
                <UnverifiedNote>978 citations, h-index 10</UnverifiedNote> on
                Google Scholar
              </li>
              <li>
                First author,{" "}
                <UnverifiedNote>
                  iMAP: an integrated bioinformatics and visualization pipeline
                  for microbiome data analysis
                </UnverifiedNote>{" "}
                (BMC Bioinformatics, 2019)
              </li>
              <li>
                <UnverifiedNote>
                  Co-author on the Gene Ontology Consortium&rsquo;s 2012 Nucleic
                  Acids Research paper
                </UnverifiedNote>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StartFree() {
  return (
    <section
      id="practicals"
      aria-labelledby="start-heading"
      className="surface-paper px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-350">
        <p className="rule-label mb-5 text-signal">{CDI.tagline}</p>
        <h2 id="start-heading" className="text-display max-w-[18ch] text-balance text-ink">
          What&rsquo;s free, and what isn&rsquo;t.
        </h2>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl border-2 border-signal bg-paper-raised p-8 lg:p-10">
            <p className="rule-label mb-6 text-signal">Learn openly · free</p>
            <p className="font-display text-4xl font-semibold text-ink">
              {CDI.chapterCount}
            </p>
            <p className="mt-2 text-[0.95rem] text-paper-soft">
              chapters across {CDI.guideCount} open guides
            </p>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-paper-soft">
              No account, no paywall, no subscription. Published under CC BY 4.0
              for the writing and MIT for the code — you can reuse it with
              attribution.
            </p>
            <Link
              href="/lessons/data-cleaning"
              className="mt-8 inline-block rounded-full bg-signal px-6 py-3.5 font-mono text-sm text-paper transition-transform hover:scale-[1.03]"
            >
              Start the free lesson
            </Link>
          </div>

          <div className="rounded-3xl border border-paper-line bg-paper-raised p-8 lg:p-10">
            <p className="rule-label mb-6 text-paper-soft">
              Practise independently · paid
            </p>
            <p className="font-display text-4xl font-semibold text-ink">
              ${CDI.priceLow}–${CDI.priceHigh}
            </p>
            <p className="mt-2 text-[0.95rem] text-paper-soft">
              one-time, per practical. {CDI.practicalCount} available.
            </p>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-paper-soft">
              A practical gives you the runnable end-to-end script, a real
              dataset, and the outputs — so you can run the workflow against your
              own data rather than reading about it.
            </p>
            <a
              href={`${CDI.site}/practicals/`}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-full border border-paper-line px-6 py-3.5 font-mono text-sm text-ink transition-colors hover:border-signal hover:text-signal"
            >
              Browse practicals
            </a>
          </div>

          <div
            id="mentorship"
            className="rounded-3xl border border-dashed border-flag/60 bg-paper-raised p-8 lg:p-10"
          >
            <p className="rule-label mb-6 text-signal">
              Grow with guidance · paid
            </p>
            <p className="font-display text-4xl font-semibold text-paper-soft/50">
              [price TBD]
            </p>
            <p className="mt-2 text-[0.95rem] text-paper-soft">
              Placeholder — mentorship is currently unpriced.
            </p>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-paper-soft">
              Review of your own analysis, workflow, or report. Publishing three
              tiers with real prices and a booking link is the single largest
              commercial gap on the live site.
            </p>
            <a
              href={`${CDI.site}/mentorship/`}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-full border border-paper-line px-6 py-3.5 font-mono text-sm text-ink transition-colors hover:border-signal hover:text-signal"
            >
              How mentorship works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-line px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-350 flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">
            Complex Data Insights
          </p>
          <p className="mt-2 max-w-[40ch] text-[0.9rem] text-ink-soft">
            {CDI.tagline}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-ink-soft">
          <a href={CDI.site} target="_blank" rel="noreferrer" className="hover:text-flag">
            Live site
          </a>
          <a
            href="https://github.com/tmbuza"
            target="_blank"
            rel="noreferrer"
            className="hover:text-flag"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/tmb-cdi/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-flag"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-350 font-mono text-[0.68rem] leading-relaxed text-ink-soft/70">
        Redesign concept. Content adapted from complexdatainsights.com with
        attribution; guide text is published there under CC BY 4.0 and code under
        MIT. Dashed borders mark placeholders and unverified claims.
      </p>
    </footer>
  );
}
