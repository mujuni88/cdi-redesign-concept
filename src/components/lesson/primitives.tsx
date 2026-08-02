"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Shared lesson furniture. These are the pieces a second lesson would reuse
 * unchanged — the lesson itself becomes content plus configuration.
 */

export function LessonSection({
  id,
  eyebrow,
  title,
  children,
  onEnter,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  onEnter?: () => void;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!onEnter || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onEnter();
      },
      { rootMargin: "-30% 0px -50% 0px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onEnter]);

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 border-t border-line py-14 first:border-t-0 lg:py-20"
    >
      <p className="rule-label mb-4 text-signal">{eyebrow}</p>
      <h2
        id={`${id}-title`}
        className="text-title max-w-[22ch] text-balance text-fg"
      >
        {title}
      </h2>
      <div className="mt-7 space-y-6">{children}</div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-[62ch] text-[1.0625rem] leading-[1.7] text-fg-muted">
      {children}
    </p>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-[58ch] text-[1.2rem] leading-[1.6] text-fg">{children}</p>
  );
}

/** A quote lifted verbatim from the source chapter, always attributed. */
export function SourceQuote({
  children,
  source,
}: {
  children: ReactNode;
  source: string;
}) {
  return (
    <figure className="max-w-[62ch] border-l-2 border-flag pl-5">
      <blockquote className="text-[1.05rem] leading-relaxed text-fg italic">
        {children}
      </blockquote>
      <figcaption className="mt-2.5 font-mono text-[0.75rem] text-fg-muted">
        {source}
      </figcaption>
    </figure>
  );
}

/** CDI's own callout component, given the prominence it never had. */
export function CdiInsight({ children }: { children: ReactNode }) {
  return (
    <aside className="max-w-[62ch] rounded-2xl border border-signal/25 bg-signal/6 p-6">
      <p className="rule-label mb-3 text-signal">CDI Insight</p>
      <div className="space-y-3 text-[1rem] leading-relaxed text-fg">
        {children}
      </div>
    </aside>
  );
}

export function CodeBlock({
  code,
  language = "python",
  caption,
}: {
  code: string;
  language?: string;
  caption?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="surface-sunken max-w-[70ch] overflow-hidden rounded-2xl border border-line/40">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="rule-label text-onsunken-muted">{language}</span>
        <button
          type="button"
          onClick={copy}
          className="rounded-md px-2.5 py-2 font-mono text-[0.75rem] text-onsunken-muted transition-colors hover:bg-white/10 hover:text-fg-onsunken"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[0.8rem] leading-relaxed text-fg-onsunken/90">
        <code>{code}</code>
      </pre>
      {caption && (
        <p className="border-t border-line/40 px-4 py-2.5 font-mono text-[0.75rem] text-onsunken-muted">
          {caption}
        </p>
      )}
    </div>
  );
}

/** The link back to the original Quarto chapter this section came from. */
export function DeeperReading({
  href,
  label,
  note,
}: {
  href: string;
  label: string;
  note?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex max-w-[62ch] items-start gap-3 rounded-xl border border-line px-5 py-4 transition-colors hover:border-signal"
    >
      <span aria-hidden className="mt-0.5 font-mono text-xs text-signal">
        ↗
      </span>
      <span>
        <span className="block font-mono text-[0.8rem] text-fg group-hover:text-signal">
          {label}
        </span>
        {note && (
          <span className="mt-1 block text-[0.85rem] text-fg-muted">{note}</span>
        )}
      </span>
    </a>
  );
}

/** Result readout styled as terminal output, because that is what it is. */
export function Readout({
  lines,
  tone = "neutral",
}: {
  lines: string[];
  tone?: "neutral" | "pass" | "flag";
}) {
  const border =
    tone === "pass"
      ? "border-pass/40"
      : tone === "flag"
        ? "border-flag/50"
        : "border-line";

  return (
    <div className={`max-w-[70ch] rounded-xl border ${border} surface-sunken px-4 py-3.5`}>
      <ol className="space-y-1 font-mono text-[0.75rem] leading-relaxed text-fg-onsunken/85">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ol>
    </div>
  );
}
