import type { ReactNode } from "react";

/**
 * Marks anything that is not real CDI content — generated media that does not
 * exist yet, prices not yet set, or claims that need TMB's confirmation before
 * publication. Deliberately visible rather than subtle: a prototype that hides
 * its placeholders is a prototype that ships an invented credential.
 */
export function Placeholder({
  kind = "asset",
  label,
  children,
  className = "",
}: {
  kind?: "asset" | "claim" | "price";
  label: string;
  children?: ReactNode;
  className?: string;
}) {
  const tone =
    kind === "claim"
      ? "border-change/45 text-change"
      : kind === "price"
        ? "border-flag/50 text-flag"
        : "border-inspect/45 text-inspect";

  return (
    <div
      className={`relative rounded-2xl border border-dashed ${tone} ${className}`}
      data-placeholder={kind}
    >
      <span className="rule-label absolute -top-2.5 left-4 bg-ink px-2">
        Placeholder · {label}
      </span>
      {children}
    </div>
  );
}

/** Inline variant for a single unverified number or claim inside running text. */
export function UnverifiedNote({ children }: { children: ReactNode }) {
  return (
    <span className="border-b border-dotted border-change/60 text-current">
      {children}
      <sup className="ml-0.5 font-mono text-[0.6rem] text-change">[verify]</sup>
    </span>
  );
}
