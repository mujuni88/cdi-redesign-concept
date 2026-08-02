"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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

/** The trail always renders on a sunken (dark) panel, in both themes. */
export const KIND_COLOR: Record<TrailKind, string> = {
  measure: "text-onsunken-inspect",
  rule: "text-onsunken-valid",
  decision: "text-onsunken-flag",
  validate: "text-onsunken-pass",
};

type State = {
  entries: TrailEntry[];
  /** Section ids the learner has completed, in order of completion. */
  completed: string[];
  /** True once a previous session's trail has been restored from storage. */
  resumed: boolean;
};

const EMPTY: State = { entries: [], completed: [], resumed: false };

type Action =
  | { type: "append"; entry: TrailEntry }
  | { type: "complete"; section: string }
  | { type: "restore"; entries: TrailEntry[]; completed: string[] }
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
    case "restore":
      return { entries: action.entries, completed: action.completed, resumed: true };
    case "reset":
      return EMPTY;
  }
}

type TrailContext = {
  entries: TrailEntry[];
  completed: string[];
  record: (entry: Omit<TrailEntry, "label"> & { label?: string }) => void;
  complete: (section: string) => void;
  reset: () => void;
  isComplete: (section: string) => boolean;
  /** True once a previous session's trail has been restored from storage. */
  resumed: boolean;
};

const Ctx = createContext<TrailContext | null>(null);

const STORAGE_KEY = "cdi-trail-ds-l03";

function load(): Pick<State, "entries" | "completed"> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<State>;
    if (!Array.isArray(parsed.entries) || !Array.isArray(parsed.completed))
      return null;
    return { entries: parsed.entries, completed: parsed.completed };
  } catch {
    return null;
  }
}

export function TrailProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, EMPTY);

  // The product's promise is "you leave with an artifact". Holding an
  // 18-minute trail only in memory meant a reload, a back-button or a mobile
  // tab eviction silently destroyed it. Restore after mount so the server and
  // client render the same empty state.
  useEffect(() => {
    const saved = load();
    if (saved && (saved.entries.length || saved.completed.length)) {
      dispatch({ type: "restore", entries: saved.entries, completed: saved.completed });
    }
  }, []);

  useEffect(() => {
    if (!state.entries.length && !state.completed.length) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Storage unavailable — the trail still works for this page view.
      }
      return;
    }
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ entries: state.entries, completed: state.completed }),
      );
    } catch {
      // Quota or private mode; not worth interrupting the lesson over.
    }
  }, [state]);

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
      resumed: state.resumed,
      isComplete: (section: string) => state.completed.includes(section),
    }),
    [state.entries, state.completed, state.resumed, record, complete, reset],
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
