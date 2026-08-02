"use client";

import { useRef, useState } from "react";
import {
  IRIS,
  RAW_COLUMNS,
  CLEAN_COLUMNS,
  IDENTICAL_GROUPS,
  IDENTICAL_ROW_INDICES,
  DATASET_FACTS,
  NUMERIC_SUMMARY,
  standardizeColumnName,
} from "@/lib/iris";
import { useTrail } from "@/lib/trail";
import { usePrefersReducedMotion, gsap } from "@/lib/useGsap";
import { Readout } from "./primitives";

/* ── Section 3 · Inspect ─────────────────────────────────────────────────── */

const INSPECTIONS = [
  {
    id: "shape",
    label: "Check the shape",
    code: "print('Shape:', df.shape)",
    lines: [
      `Shape: (${DATASET_FACTS.rows}, ${DATASET_FACTS.columns})`,
      `Columns: ${CLEAN_COLUMNS.join(", ")}`,
    ],
    trail: {
      text: `Read ${DATASET_FACTS.rows} rows and ${DATASET_FACTS.columns} columns from data/iris.csv`,
    },
  },
  {
    id: "dtypes",
    label: "Check the column types",
    code: "print(df.dtypes)",
    lines: [
      ...NUMERIC_SUMMARY.map((c) => `${c.column.padEnd(15)} ${c.dtype}`),
      "species         object",
    ],
    trail: {
      text: "Four measurement columns read as float64; species read as object",
    },
  },
  {
    id: "missing",
    label: "Count missing values",
    code: "print(df.isna().sum())",
    lines: [
      ...CLEAN_COLUMNS.map((c) => `${c.padEnd(15)} 0`),
      `dtype: int64  —  total ${DATASET_FACTS.missingValues}`,
    ],
    trail: {
      text: `Measured ${DATASET_FACTS.missingValues} missing values across all columns`,
    },
  },
];

export function InspectionPanel() {
  const [done, setDone] = useState<string[]>([]);
  const { record, complete } = useTrail();

  const run = (inspection: (typeof INSPECTIONS)[number]) => {
    if (done.includes(inspection.id)) return;
    const next = [...done, inspection.id];
    setDone(next);
    record({
      id: `inspect-${inspection.id}`,
      kind: "measure",
      text: inspection.trail.text,
    });
    if (next.length === INSPECTIONS.length) complete("inspect");
  };

  return (
    <div className="max-w-[70ch] space-y-3">
      {INSPECTIONS.map((inspection) => {
        const hasRun = done.includes(inspection.id);
        return (
          <div
            key={inspection.id}
            className="overflow-hidden rounded-2xl border border-line bg-bg-raised"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div>
                <p className="text-[0.98rem] font-semibold text-fg">
                  {inspection.label}
                </p>
                <code className="mt-1 block text-[0.75rem] text-fg-muted">
                  {inspection.code}
                </code>
              </div>
              <button
                type="button"
                onClick={() => run(inspection)}
                aria-disabled={hasRun}
                className={`shrink-0 rounded-full px-4 py-2 font-mono text-[0.75rem] transition-colors ${
                  hasRun
                    ? "border border-pass/50 text-pass"
                    : "bg-btn text-on-btn hover:bg-btn-hover"
                }`}
              >
                {hasRun ? "✓ measured" : "Run"}
              </button>
            </div>
            {hasRun && (
              <div className="border-t border-line p-4">
                <Readout lines={inspection.lines} />
              </div>
            )}
          </div>
        );
      })}

      <p className="pt-2 font-mono text-[0.75rem] text-fg-muted">
        {done.length} of {INSPECTIONS.length} inspections run
      </p>
    </div>
  );
}

/* ── Section 4 · Standardize column names ────────────────────────────────── */

export function ColumnStandardizer() {
  const [applied, setApplied] = useState(false);
  const { record, complete } = useTrail();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const apply = () => {
    if (applied) return;
    setApplied(true);
    record({
      id: "standardize",
      kind: "rule",
      text: "Column names standardized: trimmed, lowercased, spaces to underscores",
      value: RAW_COLUMNS.map((c) => standardizeColumnName(c)).join(", "),
    });
    complete("standardize");
    if (!reduced && ref.current) {
      gsap.fromTo(
        ref.current.querySelectorAll("[data-new-name]"),
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: "power2.out" },
      );
    }
  };

  return (
    <div ref={ref} className="max-w-[70ch]">
      <div className="rounded-2xl border border-line bg-bg-raised p-6">
        <ul className="space-y-3">
          {RAW_COLUMNS.map((raw) => {
            const clean = standardizeColumnName(raw);
            const hasWhitespace = raw !== raw.trim();
            return (
              <li
                key={raw}
                className="grid grid-cols-[1fr_auto_1fr] items-center gap-3"
              >
                <code
                  className={`truncate text-[0.85rem] ${
                    applied ? "text-fg-muted/60 line-through" : "text-fg"
                  }`}
                >
                  {/* Show the whitespace that a spreadsheet hides. */}
                  {hasWhitespace ? (
                    <>
                      <span className="rounded-sm bg-flag/40">
                        {raw.replace(/ /g, "·")}
                      </span>
                    </>
                  ) : (
                    raw
                  )}
                </code>
                <span aria-hidden className="font-mono text-xs text-fg-muted">
                  →
                </span>
                {applied ? (
                  <code data-new-name className="text-[0.85rem] text-signal">
                    {clean}
                  </code>
                ) : (
                  <code className="text-[0.85rem] text-fg-muted/40">
                    &mdash;
                  </code>
                )}
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={apply}
          aria-disabled={applied}
          className={`mt-6 rounded-full px-5 py-2.5 font-mono text-[0.78rem] transition-colors ${
            applied
              ? "border border-pass/50 text-pass"
              : "bg-btn text-on-btn hover:bg-btn-hover"
          }`}
        >
          {applied ? "✓ rule applied" : "Apply the rule"}
        </button>

        {applied && (
          <p className="mt-5 border-t border-line pt-4 text-[0.9rem] leading-relaxed text-fg-muted">
            Two of these five had invisible whitespace. That is a column you can
            see in a spreadsheet and cannot index by name in code.
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Section 5 · Identical rows ──────────────────────────────────────────── */

const WINDOW_SIZE = 12;

export function DuplicateFinder() {
  const [found, setFound] = useState(false);
  const { record } = useTrail();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Before scanning, an ordinary contiguous window — this is what the file
  // looks like. After scanning, the matched rows are brought together: the
  // groups are rows 10/35/38 and 102/143, so a contiguous window can only ever
  // show one of them, and the learner would have to take the finding on faith.
  const start = Math.max(0, IDENTICAL_GROUPS[0][0].index - 3);
  const contiguous = IRIS.slice(start, start + WINDOW_SIZE);
  const matched = IDENTICAL_GROUPS.flat();
  const rows = found ? matched : contiguous;

  const scan = () => {
    if (found) return;
    setFound(true);
    record({
      id: "identical-found",
      kind: "measure",
      text: `Found ${DATASET_FACTS.identicalRowCount} rows in ${DATASET_FACTS.identicalGroupCount} identical-row groups`,
      value: IDENTICAL_GROUPS.map(
        (g) => `rows ${g.map((r) => r.index).join(", ")}`,
      ).join("; "),
    });
    if (!reduced && ref.current) {
      gsap.fromTo(
        ref.current.querySelectorAll("[data-dup='true']"),
        { backgroundColor: "rgba(247,197,70,0)" },
        {
          backgroundColor: "rgba(247,197,70,0.22)",
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        },
      );
    }
  };

  return (
    <div ref={ref} className="max-w-[70ch]">
      <div className="overflow-hidden rounded-2xl border border-line bg-bg-raised">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          <code className="text-[0.75rem] text-fg-muted">
            df.duplicated(keep=False)
          </code>
          <button
            type="button"
            onClick={scan}
            aria-disabled={found}
            className={`rounded-full px-4 py-2 font-mono text-[0.75rem] transition-colors ${
              found
                ? "border border-pass/50 text-pass"
                : "bg-btn text-on-btn hover:bg-btn-hover"
            }`}
          >
            {found ? "✓ scanned" : "Scan all 150 rows"}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-112 border-collapse font-mono text-[0.78rem]">
            <caption className="sr-only">
              {found
                ? `The ${matched.length} rows involved in identical-row groups, brought together`
                : `Rows ${start + 1} to ${start + WINDOW_SIZE} of the Iris dataset`}
            </caption>
            <thead>
              <tr className="text-fg-muted">
                <th scope="col" className="px-4 py-2 text-left font-normal">#</th>
                {CLEAN_COLUMNS.map((c) => (
                  <th key={c} scope="col" className="px-3 py-2 text-left font-normal">
                    {c.replace("_", " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const isDup = IDENTICAL_ROW_INDICES.has(row.index);
                // A hairline between groups, so three identical rows read as
                // one group rather than as a run of six.
                const newGroup =
                  found && i > 0 && row.species !== rows[i - 1].species;
                return (
                  <tr
                    key={row.index}
                    data-dup={isDup}
                    className={`border-t ${
                      newGroup ? "border-line" : "border-line/50"
                    } ${found && isDup ? "text-fg" : "text-fg-muted"}`}
                  >
                    <td className="px-4 py-2">
                      {row.index}
                      {found && isDup && (
                        <span className="ml-2 text-flag" aria-label="identical row">
                          ▲
                        </span>
                      )}
                    </td>
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

        {found && (
          <div className="border-t border-line p-4">
            <Readout
              tone="flag"
              lines={[
                `Rows involved in identical-row groups: ${DATASET_FACTS.identicalRowCount}`,
                ...IDENTICAL_GROUPS.map(
                  (g, i) =>
                    `  group ${i + 1}: rows ${g.map((r) => r.index).join(", ")} (${g[0].species})`,
                ),
                "",
                "This is a finding, not yet a decision.",
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Section 6 · Numeric coercion sandbox ────────────────────────────────── */

export function CoercionSandbox() {
  const [broken, setBroken] = useState(false);
  const [coerced, setCoerced] = useState(false);
  const { record, complete } = useTrail();

  const reset = () => {
    setBroken(false);
    setCoerced(false);
  };

  const runCoercion = () => {
    setCoerced(true);
    record({
      id: "coerce",
      kind: "rule",
      text: broken
        ? "Numeric conversion applied — 1 unparseable value became missing"
        : "Numeric conversion applied — no new missing values created",
      value: 'pd.to_numeric(df[c], errors="coerce")',
    });
    complete("coerce");
  };

  const value = broken ? '"not recorded"' : "5.1";
  const after = broken ? "NaN" : "5.1";

  return (
    <div className="max-w-[70ch] rounded-2xl border border-line bg-bg-raised p-6">
      <p className="rule-label mb-4 text-fg-muted">
        Sandbox · hypothetical value
      </p>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="rounded-xl border border-line p-4">
          <p className="rule-label mb-2 text-fg-muted">Before</p>
          <code className="text-[0.9rem] text-fg">
            sepal_length[0] = {value}
          </code>
          <p className="mt-2 font-mono text-[0.75rem] text-fg-muted">
            dtype: {broken ? "object" : "float64"}
          </p>
        </div>
        <span aria-hidden className="hidden text-center font-mono text-fg-muted sm:block">
          →
        </span>
        <div
          className={`rounded-xl border p-4 ${
            coerced && broken ? "border-change/50 bg-change/5" : "border-line"
          }`}
        >
          <p className="rule-label mb-2 text-fg-muted">After coercion</p>
          <code
            className={`text-[0.9rem] ${
              coerced && broken ? "text-change" : "text-fg"
            }`}
          >
            sepal_length[0] = {coerced ? after : "—"}
          </code>
          <p className="mt-2 font-mono text-[0.75rem] text-fg-muted">
            missing created: {coerced ? (broken ? "1" : "0") : "—"}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => {
            setBroken((v) => !v);
            setCoerced(false);
          }}
          className="rounded-full border border-line px-4 py-2 font-mono text-[0.75rem] text-fg transition-colors hover:border-flag"
        >
          {broken ? "Restore the real value" : 'Replace with "not recorded"'}
        </button>
        <button
          type="button"
          onClick={runCoercion}
          aria-disabled={coerced}
          className={`rounded-full px-4 py-2 font-mono text-[0.75rem] transition-colors ${
            coerced
              ? "border border-pass/50 text-pass"
              : "bg-btn text-on-btn hover:bg-btn-hover"
          }`}
        >
          {coerced ? "✓ converted" : 'Run errors="coerce"'}
        </button>
        {coerced && (
          <button
            type="button"
            onClick={reset}
            className="rounded-full px-4 py-2 font-mono text-[0.75rem] text-fg-muted underline underline-offset-4"
          >
            Try the other way
          </button>
        )}
      </div>

      <p className="mt-6 border-t border-line pt-4 text-[0.9rem] leading-relaxed text-fg-muted">
        {coerced && broken
          ? "Coercion made the invalid value visible as missing data — and created a missing value that was not there before. That is why the count is reported, and why conversion happens before missing-value handling."
          : coerced
            ? "Nothing changed, because nothing was wrong. The workflow still checked, and still recorded that it checked."
            : "Iris has no unparseable values. Break one deliberately to see what coercion does — then put it back."}
      </p>
    </div>
  );
}

/* ── Section 7 · Missing-value rules ─────────────────────────────────────── */

const RULES = [
  {
    id: "median",
    label: "Median for numeric, mode for categorical",
    effect: "0 values imputed — no column contained a missing value.",
    recommended: true,
  },
  {
    id: "drop",
    label: "Drop every row with any missing value",
    effect: "0 rows dropped — but on a different dataset this discards evidence.",
    recommended: false,
  },
  {
    id: "zero",
    label: "Fill everything with 0",
    effect:
      "0 values filled here — and on real data a sepal of length 0 cm is a measurement you invented.",
    recommended: false,
  },
];

export function MissingValueRules() {
  const [picked, setPicked] = useState<string | null>(null);
  const { record, complete } = useTrail();

  const choose = (rule: (typeof RULES)[number]) => {
    setPicked(rule.id);
    if (rule.recommended) {
      record({
        id: "missing-rule",
        kind: "rule",
        text: "Missing-value rule set: median for numeric, mode for categorical",
        value: "0 values imputed — no column required it",
      });
      complete("missing");
    }
  };

  const chosen = RULES.find((r) => r.id === picked);

  return (
    <div className="max-w-[70ch] rounded-2xl border border-line bg-bg-raised p-6">
      <fieldset className="border-0 p-0">
        <legend className="rule-label mb-4 text-fg-muted">
          Choose a rule, then apply it
        </legend>
        <div role="radiogroup" className="space-y-2.5">
          {RULES.map((rule) => (
            <button
              key={rule.id}
              type="button"
              role="radio"
              aria-checked={picked === rule.id}
              onClick={() => choose(rule)}
              className={`block w-full rounded-xl border px-5 py-3.5 text-left text-[0.95rem] transition-colors ${
                picked === rule.id
                  ? rule.recommended
                    ? "border-pass bg-pass/10 text-fg"
                    : "border-flag bg-flag/10 text-fg"
                  : "border-line text-fg hover:border-signal"
              }`}
            >
              {rule.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div role="status" aria-live="polite" className="mt-5 min-h-16">
        {chosen && (
          <div className="rounded-xl border-l-2 border-signal bg-signal/5 p-5">
            <p className="font-mono text-[0.75rem] text-signal">
              {chosen.effect}
            </p>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-fg-muted">
              {chosen.recommended
                ? "Every rule produces the same result on this dataset, because there is nothing to impute. The difference between them only appears on data that needs them — which is why you choose the rule deliberately now, not later under pressure."
                : "On Iris this is harmless. Pick the rule you would defend on a dataset that actually has gaps."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Section 8 · Validation ──────────────────────────────────────────────── */

const ASSERTIONS = [
  {
    id: "missing",
    code: "assert final_missing == 0",
    label: "No missing values remain",
    result: "0 missing",
  },
  {
    id: "schema",
    code: "assert set(expected_numeric_cols).issubset(df.columns)",
    label: "All four measurement columns present",
    result: "4 of 4 found",
  },
  {
    id: "dtype",
    code: "assert all(is_numeric_dtype(df[c]) for c in expected_numeric_cols)",
    label: "All measurement columns are numeric",
    result: "4 float64",
  },
];

export function ValidationRun() {
  const [passed, setPassed] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const { record, complete } = useTrail();
  const reduced = usePrefersReducedMotion();

  const run = () => {
    if (running || passed.length === ASSERTIONS.length) return;
    setRunning(true);
    const step = reduced ? 0 : 420;

    ASSERTIONS.forEach((assertion, i) => {
      window.setTimeout(
        () => {
          setPassed((prev) => [...prev, assertion.id]);
          if (i === ASSERTIONS.length - 1) {
            setRunning(false);
            record({
              id: "validate",
              kind: "validate",
              text: "All three validation assertions passed",
              value: "schema ok · dtypes ok · 0 missing",
            });
            complete("validate");
          }
        },
        step * (i + 1),
      );
    });
  };

  const allPassed = passed.length === ASSERTIONS.length;

  return (
    <div className="max-w-[70ch] rounded-2xl border border-line bg-bg-raised p-6">
      <ol className="space-y-3">
        {ASSERTIONS.map((assertion) => {
          const ok = passed.includes(assertion.id);
          return (
            <li key={assertion.id} className="flex items-start gap-3.5">
              <span
                aria-hidden
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[0.75rem] transition-colors ${
                  ok
                    ? "border-marker-pass bg-marker-pass text-on-accent"
                    : "border-line text-fg-muted"
                }`}
              >
                {ok ? "✓" : "·"}
              </span>
              <div className="min-w-0">
                <p
                  className={`text-[0.95rem] ${ok ? "text-fg" : "text-fg-muted"}`}
                >
                  {assertion.label}
                </p>
                <code className="mt-1 block truncate text-[0.75rem] text-fg-muted/70">
                  {assertion.code}
                </code>
                {ok && (
                  <p className="mt-1 font-mono text-[0.75rem] text-pass">
                    {assertion.result}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        onClick={run}
        aria-disabled={running || allPassed}
        className={`mt-6 rounded-full px-5 py-2.5 font-mono text-[0.78rem] transition-colors ${
          allPassed
            ? "border border-pass/50 text-pass"
            : "bg-btn text-on-btn hover:bg-btn-hover"
        }`}
      >
        {allPassed ? "✓ validated" : running ? "running…" : "Run validation"}
      </button>

      <p aria-live="polite" className="mt-5 text-[0.9rem] leading-relaxed text-fg-muted">
        {allPassed
          ? "Notice what is not asserted: that identical rows must be absent. Assertions should express conditions justified by this dataset and this downstream purpose — not assumptions every dataset must satisfy."
          : "Three assertions, each one a condition you decided the output table must meet."}
      </p>
    </div>
  );
}

/* ── Section 9 · The diff ────────────────────────────────────────────────── */

export function DiffReveal() {
  const [shown, setShown] = useState(false);
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const reveal = () => {
    setShown(true);
    if (!reduced && ref.current) {
      gsap.fromTo(
        ref.current.querySelectorAll("[data-diff-line]"),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.12, ease: "power2.out" },
      );
    }
  };

  return (
    <div ref={ref} className="max-w-[70ch]">
      {!shown ? (
        <button
          type="button"
          onClick={reveal}
          className="rounded-full bg-btn px-5 py-2.5 font-mono text-[0.78rem] text-on-btn transition-colors hover:bg-btn-hover"
        >
          Compare input and output
        </button>
      ) : (
        <div className="surface-sunken overflow-hidden rounded-2xl border border-line/40">
          <div className="border-b border-line px-4 py-2.5">
            <code className="text-[0.75rem] text-onsunken-muted">
              diff data/iris.csv data/iris_clean.csv
            </code>
          </div>
          <div className="space-y-1.5 px-4 py-4 font-mono text-[0.75rem]">
            <p data-diff-line className="text-fg-onsunken/80">
              rows in: {DATASET_FACTS.rows} &nbsp;→&nbsp; rows out:{" "}
              {DATASET_FACTS.rows}
            </p>
            <p data-diff-line className="text-fg-onsunken/80">
              missing in: {DATASET_FACTS.missingValues} &nbsp;→&nbsp; missing
              out: {DATASET_FACTS.missingValues}
            </p>
            <p data-diff-line className="text-fg-onsunken/80">
              identical rows: {DATASET_FACTS.identicalRowCount} retained,{" "}
              {DATASET_FACTS.confirmedDuplicatesRemoved} removed
            </p>
            <p data-diff-line className="pt-2 text-flag">
              values changed: 0
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
