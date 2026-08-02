"use client";

import Link from "next/link";
import { TrailProvider, useTrail } from "@/lib/trail";
import { LessonShell, LessonHeader, type SectionRef } from "@/components/lesson/LessonShell";
import { ArtifactReport } from "@/components/lesson/DecisionTrail";
import { KnowledgeCheck } from "@/components/lesson/KnowledgeCheck";
import { CycleDiagram } from "@/components/lesson/CycleDiagram";
import {
  LessonSection,
  Prose,
  Lead,
  SourceQuote,
  CdiInsight,
  CodeBlock,
  DeeperReading,
} from "@/components/lesson/primitives";
import {
  InspectionPanel,
  ColumnStandardizer,
  DuplicateFinder,
  CoercionSandbox,
  MissingValueRules,
  ValidationRun,
  DiffReveal,
} from "@/components/lesson/interactions";
import { Placeholder } from "@/components/site/Placeholder";
import { DATASET_FACTS, IDENTICAL_GROUPS } from "@/lib/iris";

/**
 * Data Cleaning and Preparation — the complete sample lesson.
 *
 * Adapted from the CDI Data Science Foundations System, chapter 03 (DS-L03),
 * at data-science.complexdatainsights.com/03-data-cleaning-and-preparation.html.
 * Prose, code, decisions and the exercise all come from that chapter; the Iris
 * data is the canonical UCI dataset and the identical rows are genuinely in it.
 */

const CHAPTER =
  "https://data-science.complexdatainsights.com/03-data-cleaning-and-preparation.html";

const SECTIONS: SectionRef[] = [
  { id: "problem", label: "The problem", requiresAction: false },
  { id: "loop", label: "The loop", requiresAction: false },
  { id: "inspect", label: "Inspect", requiresAction: true },
  { id: "standardize", label: "Standardize names", requiresAction: true },
  { id: "identical", label: "Identical rows", requiresAction: true },
  { id: "coerce", label: "Numeric conversion", requiresAction: true },
  { id: "missing", label: "Missing values", requiresAction: true },
  { id: "validate", label: "Validate", requiresAction: true },
  { id: "artifact", label: "The artifact", requiresAction: true },
];

export function LessonClient() {
  return (
    <TrailProvider>
      <LessonShell sections={SECTIONS}>
        <LessonBody />
      </LessonShell>
    </TrailProvider>
  );
}

function LessonBody() {
  const { completed } = useTrail();
  // Count only real sections: `assertion` is a knowledge-check id, not a
  // section, so the raw length unlocked the artifact one step early.
  const readyForArtifact =
    SECTIONS.filter((s) => s.requiresAction && completed.includes(s.id)).length >= 4;

  return (
    <main id="main">
      <LessonHeader />

      {/* Cinematic opener — see docs §11 (V3). */}
      <Placeholder
        kind="asset"
        label="8s chapter opener (V3)"
        className="mt-12 bg-bg-alt"
      >
        <div className="flex flex-col gap-1.5 px-6 py-7">
          <p className="font-mono text-[0.78rem] text-inspect">
            Misaligned monospace rows settle into a precise grid, one at a time.
          </p>
          <p className="font-mono text-[0.78rem] text-flag">
            Three rows stay highlighted in amber and never resolve.
          </p>
        </div>
      </Placeholder>

      {/* ── 1 · The real-world problem ─────────────────────────────────── */}
      <LessonSection
        id="problem"
        eyebrow="Why this matters"
        title="The decision nobody wrote down"
      >
        <Lead>
          A result gets published. Two years later someone tries to reproduce it
          and gets a different number. The analysis code is fine. The statistics
          are fine. The difference is upstream: somebody dropped rows, and no
          record survives of which rows, or why.
        </Lead>
        <Prose>
          This is not a rare failure. It is the ordinary consequence of treating
          cleaning as tidying-up — a chore you do before the real work rather
          than a sequence of judgments the real work depends on. Every deletion,
          every fill, every type conversion is a claim about what the data means.
          Claims need reasons.
        </Prose>
        <SourceQuote source="Data Science Foundations System, ch. 03">
          Cleaning should not hide uncertainty. It should make data-preparation
          decisions visible and reproducible.
        </SourceQuote>
        <Prose>
          For the next fifteen minutes you will work on {DATASET_FACTS.rows} rows
          of the Iris dataset — small enough to see all of, real enough to
          surprise you. Everything you decide gets written into a report you can
          read at the end.
        </Prose>
      </LessonSection>

      {/* ── 2 · The loop ───────────────────────────────────────────────── */}
      <LessonSection
        id="loop"
        eyebrow="The method"
        title="Inspect first, decide second, clean third, validate fourth, save last"
      >
        <Prose>
          There is one loop, and it runs once per issue you find. It is short
          enough to memorise and strict enough to be worth memorising.
        </Prose>
        <CycleDiagram />
        <SourceQuote source="Data Science Foundations System, ch. 03">
          Never modify data without first understanding what is being changed.
        </SourceQuote>
      </LessonSection>

      {/* ── 3 · Inspect ────────────────────────────────────────────────── */}
      <LessonSection
        id="inspect"
        eyebrow="Step 01 · measure"
        title="Establish a baseline before you touch anything"
      >
        <Prose>
          You cannot describe what changed unless you know what you started with.
          Run all three inspections. Each one writes a measurement into your
          trail.
        </Prose>
        <InspectionPanel />
        <Prose>
          Nothing here is a judgment yet. These are the numbers you will compare
          against at the end — the reason you will be able to say &ldquo;150 rows
          in, 150 rows out&rdquo; instead of &ldquo;I think it was fine.&rdquo;
        </Prose>
        <DeeperReading
          href={`${CHAPTER}#initial-inspection`}
          label="Full chapter · Initial inspection"
          note="The complete inspection script, and what to do with its output."
        />
      </LessonSection>

      {/* ── 4 · Standardize ────────────────────────────────────────────── */}
      <LessonSection
        id="standardize"
        eyebrow="Step 02 · a rule you can state"
        title="Column names are code, not labels"
      >
        <Prose>
          Trim the whitespace, lowercase everything, replace spaces with
          underscores, drop the parentheses. It is a small rule and it is worth
          writing down, because the next person to read your script needs to know
          it was applied deliberately.
        </Prose>
        <CodeBlock
          code={`df.columns = [
    str(c)
    .strip()
    .lower()
    .replace(" ", "_")
    .replace("(", "")
    .replace(")", "")
    for c in df.columns
]`}
          caption="Adapted from DS-L03 · Standardize Column Names"
        />
        <ColumnStandardizer />
        <Prose>
          This rule is adequate for the known Iris columns and is not a complete
          solution. Real datasets contain punctuation, repeated underscores,
          non-English characters, and names that collide once standardized. A
          production workflow checks for those cases explicitly.
        </Prose>
      </LessonSection>

      {/* ── 5 · Identical rows — the centrepiece ───────────────────────── */}
      <LessonSection
        id="identical"
        eyebrow="Step 03 · the decision"
        title="Identical is not the same as duplicated"
      >
        <Prose>
          Now the part that separates a workflow from a habit. Scan the whole
          table for rows whose every value matches another row.
        </Prose>
        <DuplicateFinder />
        <Prose>
          {DATASET_FACTS.identicalRowCount} rows, in{" "}
          {DATASET_FACTS.identicalGroupCount} groups. The reflex is{" "}
          <code className="rounded bg-signal/8 px-1.5 py-0.5 text-[0.9em] text-signal">
            df.drop_duplicates()
          </code>
          . Before you reach for it, answer this.
        </Prose>

        <KnowledgeCheck
          id="identical"
          question="What do you do with them?"
          hint="Rows 10, 35 and 38 record the same four measurements on the same species. There is no identifier column in this table."
          options={[
            {
              id: "drop",
              label: "Drop the repeats — duplicated data biases the analysis",
              feedback:
                "Two flowers can legitimately have the same four measurements and the same species label. Iris measures to one decimal place across 150 specimens; exact matches are expected, not anomalous. Dropping them removes real observations on the strength of an assumption.",
            },
            {
              id: "retain",
              label: "Report them, retain them, and record why",
              correct: true,
              feedback:
                "Confirming a duplicate record needs evidence this table does not contain: a unique observation identifier, a repeated source row from a merge, a collection timestamp, or knowledge of how the data was produced. Absent that, the honest action is to report the finding, keep the rows, and write down the reasoning.",
            },
            {
              id: "flag",
              label: "Add a flag column and decide later",
              feedback:
                "Closer — deferring is better than deleting. But 'later' rarely arrives, and an unexplained flag column is its own reproducibility problem. Make the decision now and record the evidence you would need to revisit it.",
            },
          ]}
          trail={{
            kind: "decision",
            text: `Retained ${DATASET_FACTS.identicalRowCount} identical rows — no unique identifier available to confirm duplication`,
            value: `confirmed_duplicates_removed = ${DATASET_FACTS.confirmedDuplicatesRemoved}`,
          }}
        />

        <SourceQuote source="Data Science Foundations System, ch. 03">
          Identical rows are a signal to investigate—not automatic permission to
          delete observations.
        </SourceQuote>
        <DeeperReading
          href={`${CHAPTER}#inspect-identical-rows`}
          label="Full chapter · Inspect identical rows"
          note={`The evidence that would confirm a duplicate, and the code that reports rows ${IDENTICAL_GROUPS[0].map((r) => r.index).join(", ")}.`}
        />
      </LessonSection>

      {/* ── 6 · Coercion ───────────────────────────────────────────────── */}
      <LessonSection
        id="coerce"
        eyebrow="Step 04 · order matters"
        title="Convert types before you handle missing values"
      >
        <Prose>
          A numeric column can arrive as text because one cell says
          &ldquo;unknown&rdquo;.{" "}
          <code className="rounded bg-signal/8 px-1.5 py-0.5 text-[0.9em] text-signal">
            errors=&quot;coerce&quot;
          </code>{" "}
          turns anything unparseable into <code>NaN</code> — which makes the
          invalid value visible, and creates missing data that was not there
          before.
        </Prose>
        <CodeBlock
          code={`for c in expected_numeric_cols:
    before_missing = int(df[c].isna().sum())
    converted = pd.to_numeric(df[c], errors="coerce")
    after_missing = int(converted.isna().sum())

    if after_missing > before_missing:
        print(f"{c}: conversion created "
              f"{after_missing - before_missing} missing value(s)")

    df[c] = converted`}
          caption="Adapted from DS-L03 · Detect and Convert Numeric-Like Columns"
        />
        <CoercionSandbox />
        <Prose>
          That reported count is the whole point. Conversion runs first so that
          any missingness it creates is visible to the step that handles
          missingness — and is attributable to the conversion rather than to the
          source data.
        </Prose>
      </LessonSection>

      {/* ── 7 · Missing values ─────────────────────────────────────────── */}
      <LessonSection
        id="missing"
        eyebrow="Step 05 · choose deliberately"
        title="A rule you would defend on data that actually has gaps"
      >
        <Prose>
          Iris has {DATASET_FACTS.missingValues} missing values, so every option
          below produces an identical result. Choose as though it did not.
        </Prose>
        <MissingValueRules />
        <SourceQuote source="Data Science Foundations System, ch. 03">
          Median and mode imputation are useful for teaching, but they are not
          universal rules. In real projects, missing-value handling should
          reflect the data source, study design, reason for missingness, and
          analysis goal.
        </SourceQuote>
      </LessonSection>

      {/* ── 8 · Validate ───────────────────────────────────────────────── */}
      <LessonSection
        id="validate"
        eyebrow="Step 06 · confirm"
        title="Assert the conditions you said the output must meet"
      >
        <Prose>
          Assertions stop a workflow when a required condition fails. The skill
          is choosing conditions justified by this dataset and this downstream
          purpose — not conditions you assume every dataset satisfies.
        </Prose>
        <ValidationRun />
        <KnowledgeCheck
          id="assertion"
          question="Which assertion would be wrong to add here?"
          options={[
            {
              id: "no-identical",
              label: "assert df.duplicated().sum() == 0",
              correct: true,
              feedback:
                "Right. You just decided to retain the identical rows, on the grounds that nothing proves they are duplicates. Asserting they are absent would contradict your own documented decision and fail the workflow on correct data.",
            },
            {
              id: "shape",
              label: "assert df.shape[1] == 5",
              feedback:
                "This one is reasonable. The output schema is something you decided on and can check — five columns is a condition this workflow genuinely requires.",
            },
            {
              id: "range",
              label: "assert df['sepal_length'].between(0, 20).all()",
              feedback:
                "Also reasonable. A domain-plausibility check on a measurement column is defensible, as long as the range comes from the domain rather than from the data you happen to have.",
            },
          ]}
          trail={{
            kind: "validate",
            text: "Confirmed that assertions must not contradict recorded decisions",
          }}
        />
      </LessonSection>

      {/* ── 9 · The artifact + the twist ───────────────────────────────── */}
      <LessonSection
        id="artifact"
        eyebrow="The result"
        title="Now compare the file you started with to the file you produced"
      >
        <Prose>
          You inspected, standardized, investigated, converted, chose a rule, and
          validated. Here is what changed in the data.
        </Prose>
        <DiffReveal />

        <KnowledgeCheck
          id="artifact"
          question="The output values are identical to the input. Was the workflow a waste of time?"
          options={[
            {
              id: "yes",
              label: "Yes — nothing changed, so nothing was needed",
              feedback:
                "This is the intuition the lesson exists to correct. You could not have known the data was clean until you checked; 'it looked fine' is not a finding. And a workflow that only runs when it finds problems cannot tell you when there are none.",
            },
            {
              id: "no",
              label: "No — the workflow produced evidence, and evidence is the output",
              correct: true,
              feedback:
                "The run established a quality baseline, confirmed the schema and types, measured missingness, investigated identical rows, applied explicit rules, validated the result, and recorded all of it. An unchanged table plus that record is a far stronger position than an unchanged table alone.",
            },
          ]}
          trail={{
            kind: "validate",
            text: "Output table verified identical to input — workflow documented rather than modified",
            value: "values changed: 0",
          }}
        />

        <CdiInsight>
          <p>
            Cleaning is about making preparation decisions explicit,
            reproducible, and testable — not just making data appear perfect.
          </p>
          <p>
            That is why CDI systems keep all four: input table, cleaning script,
            cleaned output table, cleaning report.
          </p>
        </CdiInsight>

        <Prose>
          Three of those four are files you would have produced anyway. Here is
          the fourth — written by the decisions you made, not generated for you.
        </Prose>

        {readyForArtifact ? (
          <ArtifactReport />
        ) : (
          <p className="max-w-[62ch] rounded-xl border border-dashed border-line px-5 py-4 font-mono text-[0.78rem] text-fg-muted">
            Work through the sections above and your report will assemble here.
          </p>
        )}
      </LessonSection>

      {/* ── Summary and next step ──────────────────────────────────────── */}
      <section
        aria-labelledby="summary-title"
        className="scroll-mt-24 border-t border-line py-14 lg:py-20"
      >
        <p className="rule-label mb-4 text-signal">Summary</p>
        <h2 id="summary-title" className="text-title max-w-[22ch] text-balance text-fg">
          What you did
        </h2>

        <ul className="mt-7 max-w-[62ch] space-y-2.5">
          {[
            "Inspected shape, types and missingness before changing anything",
            "Standardized column names with a rule you can state",
            `Investigated ${DATASET_FACTS.identicalRowCount} identical rows and decided to retain them`,
            "Converted types before handling missing values, and reported the cost",
            "Chose a missing-value rule deliberately",
            "Validated against conditions justified by this dataset",
            "Produced a cleaning report that explains all of it",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-[0.98rem] text-fg-muted">
              <span aria-hidden className="mt-0.5 shrink-0 font-mono text-xs text-pass">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-line bg-bg-raised p-7">
            <p className="rule-label mb-4 text-signal">Next, free</p>
            <h3 className="text-[1.2rem] font-semibold text-fg">
              Data Wrangling Basics
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">
              The table you just prepared becomes the input for chapter 04, where
              it gets transformed and organized for analysis.
            </p>
            <a
              href="https://data-science.complexdatainsights.com/04-data-wrangling-basics.html"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block font-mono text-[0.78rem] text-signal underline underline-offset-4"
            >
              Read chapter 04 →
            </a>
          </div>

          {/* The free→paid handoff that does not exist on the live site. */}
          <div className="rounded-3xl border-2 border-signal bg-bg-raised p-7">
            <p className="rule-label mb-4 text-signal">Next, $14.99</p>
            <h3 className="text-[1.2rem] font-semibold text-fg">
              Data Cleaning and Validation Practical
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">
              You made these decisions on 150 tidy rows with the rules chosen for
              you. The practical gives you the reusable script, a messy
              real-world dataset, and the report generator — so you can run this
              against your own data.
            </p>
            <a
              href="https://complexdatainsights.com/product/data-cleaning-and-validation-practical/"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded-full bg-btn px-5 py-2.5 font-mono text-[0.78rem] text-on-btn transition-transform hover:scale-[1.03]"
            >
              See the practical
            </a>
          </div>
        </div>

        <div className="mt-10 space-y-3">
          <p className="rule-label text-fg-muted">Optional deeper reading</p>
          <DeeperReading
            href={CHAPTER}
            label="The original chapter · DS-L03"
            note="Every section of this lesson is adapted from it, including the reusable cleaning script and the seven-step exercise."
          />
          <DeeperReading
            href="https://data-science.complexdatainsights.com/00-preface.html"
            label="Data Science Foundations · Preface"
            note="How the open guides, practicals and mentorship fit together."
          />
        </div>

        <p className="mt-14 max-w-[62ch] border-t border-line pt-6 text-[0.85rem] leading-relaxed text-fg-muted">
          Adapted from the Complex Data Insights Data Science Foundations System,
          chapter 03, by Teresia Mrema Buza — published under CC BY 4.0. Data is
          the canonical UCI Iris dataset.
        </p>

        <Link
          href="/"
          className="mt-10 inline-block font-mono text-[0.78rem] text-signal underline underline-offset-4"
        >
          ← Back to Complex Data Insights
        </Link>
      </section>
    </main>
  );
}
