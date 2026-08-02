"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

/**
 * The decision trail.
 *
 * CDI's own teaching names the unit of achievement, and it is not a badge:
 * "That is why CDI systems keep all four: input table, cleaning script, cleaned
 * output table, cleaning report." This is the cleaning report — written by the
 * learner's own decisions as they make them.
 */

export type TrailKind = "measure" | "rule" | "decision" | "validate";

export type TrailEntry = {
  id: string;
  kind: TrailKind;
  /** Short machine-style label, e.g. MEASURED / RULE APPLIED. */
  label: string;
  /** One plain sentence a human can read six months later. */
  text: string;
  /** Optional exact value, always rendered in mono. */
  value?: string;
};

export const KIND_LABEL: Record<TrailKind, string> = {
  measure: "MEASURED",
  rule: "RULE APPLIED",
  decision: "DECISION",
  validate: "VALIDATED",
};

export const KIND_COLOR: Record<TrailKind, string> = {
  measure: "text-inspect",
  rule: "text-valid",
  decision: "text-flag",
  validate: "text-pass",
};

type State = {
  entries: TrailEntry[];
  /** Section ids the learner has completed, in order of completion. */
  completed: string[];
};

type Action =
  | { type: "append"; entry: TrailEntry }
  | { type: "complete"; section: string }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "append":
      // Appending is idempotent by id so a learner can re-run a step without
      // duplicating the record of it.
      if (state.entries.some((e) => e.id === action.entry.id)) return state;
      return { ...state, entries: [...state.entries, action.entry] };
    case "complete":
      if (state.completed.includes(action.section)) return state;
      return { ...state, completed: [...state.completed, action.section] };
    case "reset":
      return { entries: [], completed: [] };
  }
}

type TrailContext = {
  entries: TrailEntry[];
  completed: string[];
  record: (entry: Omit<TrailEntry, "label"> & { label?: string }) => void;
  complete: (section: string) => void;
  reset: () => void;
  isComplete: (section: string) => boolean;
};

const Ctx = createContext<TrailContext | null>(null);

export function TrailProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { entries: [], completed: [] });

  const record = useCallback<TrailContext["record"]>((entry) => {
    dispatch({
      type: "append",
      entry: { ...entry, label: entry.label ?? KIND_LABEL[entry.kind] },
    });
  }, []);

  const complete = useCallback((section: string) => {
    dispatch({ type: "complete", section });
  }, []);

  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  const value = useMemo<TrailContext>(
    () => ({
      entries: state.entries,
      completed: state.completed,
      record,
      complete,
      reset,
      isComplete: (section: string) => state.completed.includes(section),
    }),
    [state.entries, state.completed, record, complete, reset],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTrail(): TrailContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTrail must be used inside a TrailProvider");
  return ctx;
}

/** Renders the trail as the plain-text artifact CDI's workflow actually produces. */
export function trailToReport(entries: TrailEntry[]): string {
  const lines = [
    "cleaning-report.txt",
    "Complex Data Insights — Data Science Foundations System",
    "Lesson DS-L03 · Data Cleaning and Preparation",
    "",
    "INPUT   data/iris.csv",
    "OUTPUT  data/iris_clean.csv",
    "",
    "DECISION RECORD",
    "---------------",
  ];
  entries.forEach((entry, i) => {
    lines.push(
      `${String(i + 1).padStart(2, "0")}  ${entry.label.padEnd(12)} ${entry.text}`,
    );
    if (entry.value) lines.push(`                 ${entry.value}`);
  });
  return lines.join("\n");
}
