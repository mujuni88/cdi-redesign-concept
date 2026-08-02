"use client";

import { useEffect, useRef, useState } from "react";
import { useTrail, trailToReport, KIND_COLOR } from "@/lib/trail";
import { usePrefersReducedMotion, gsap } from "@/lib/useGsap";

/**
 * The signature component.
 *
 * CDI teaches that a workflow should keep four artifacts, and that the report
 * is the one that makes the other three trustworthy. This is that report,
 * written by the learner's own decisions as they make them — so progress here
 * means "you decided five things", not "you scrolled five screens".
 */

function TrailEntries({ dense = false }: { dense?: boolean }) {
  const { entries } = useTrail();
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = usePrefersReducedMotion();
  const seen = useRef(0);

  // A short amber flash on the newest line: the only job of this animation is
  // to confirm "your action caused this", which is the core feedback loop.
  useEffect(() => {
    if (reduced || entries.length <= seen.current) {
      seen.current = entries.length;
      return;
    }
    seen.current = entries.length;
    const latest = listRef.current?.lastElementChild;
    if (!latest) return;
    gsap.fromTo(
      latest,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" },
    );
    gsap.fromTo(
      latest,
      { backgroundColor: "rgba(247,197,70,0.16)" },
      { backgroundColor: "rgba(247,197,70,0)", duration: 1.1, delay: 0.2 },
    );
  }, [entries.length, reduced]);

  if (entries.length === 0) {
    return (
      <p className="px-1 py-3 font-mono text-[0.75rem] leading-relaxed text-onsunken-muted">
        Empty. Every decision you make will be written here.
      </p>
    );
  }

  return (
    <ol ref={listRef} className="space-y-2">
      {entries.map((entry, i) => (
        <li key={entry.id} className="rounded px-1 py-1">
          <div className="flex gap-2.5 font-mono text-[0.75rem] leading-relaxed">
            <span className="shrink-0 text-onsunken-muted/70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <span className={`${KIND_COLOR[entry.kind]} block`}>
                {entry.label}
              </span>
              <span className="mt-0.5 block text-fg-onsunken/80">{entry.text}</span>
              {entry.value && !dense && (
                <span className="mt-1 block text-onsunken-muted">{entry.value}</span>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Desktop: a persistent rail beside the lesson. */
export function DecisionTrailRail() {
  const { entries } = useTrail();

  return (
    <div className="surface-sunken rounded-2xl border border-line/40 p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <p className="rule-label text-fg-onsunken">Decision trail</p>
        <span className="font-mono text-[0.75rem] text-onsunken-muted">
          {entries.length}
        </span>
      </div>
      <div
        aria-live="polite"
        aria-label="Decision trail"
        className="max-h-[52vh] overflow-y-auto pr-1"
      >
        <TrailEntries />
      </div>
      <p className="mt-4 border-t border-line/40 pt-3 font-mono text-[0.75rem] leading-relaxed text-fg-onsunken/70">
        Becomes cleaning-report.txt when you finish.
      </p>
    </div>
  );
}

/** Mobile: a bottom sheet, so the trail never eats reading width. */
export function DecisionTrailSheet() {
  const { entries } = useTrail();
  const [open, setOpen] = useState(false);
  const latest = entries[entries.length - 1];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      {open && (
        <div className="surface-sunken max-h-[55vh] overflow-y-auto border-t border-line/40 px-5 py-4">
          <TrailEntries dense />
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="surface-sunken flex w-full items-center gap-3 border-t border-line/40 px-5 py-3 text-left"
      >
        <span className="rule-label shrink-0 rounded-sm bg-accent px-1.5 py-1 text-on-accent">
          {entries.length}
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-[0.75rem] text-fg-onsunken/75">
          {latest ? latest.text : "Decision trail — empty"}
        </span>
        <span aria-hidden className="shrink-0 font-mono text-xs text-onsunken-muted">
          {open ? "▾" : "▴"}
        </span>
      </button>
    </div>
  );
}

/** The payoff: the trail, rendered as the plain-text file it represents. */
export function ArtifactReport() {
  const { entries } = useTrail();
  const [downloaded, setDownloaded] = useState(false);
  const report = trailToReport(entries);

  const download = () => {
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cleaning-report.txt";
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  return (
    <div className="surface-sunken max-w-[70ch] overflow-hidden rounded-2xl border border-line/40">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <code className="text-[0.75rem] text-onsunken-muted">
          results/cleaning/cleaning-report.txt
        </code>
        <button
          type="button"
          onClick={download}
          className="rounded-md bg-accent px-3 py-2 font-mono text-[0.75rem] font-medium text-on-accent"
        >
          {downloaded ? "Downloaded" : "Download"}
        </button>
      </div>
      <pre className="max-h-120 overflow-auto px-4 py-4 text-[0.75rem] leading-relaxed break-words whitespace-pre-wrap text-fg-onsunken/90">
        <code>{report}</code>
      </pre>
    </div>
  );
}
