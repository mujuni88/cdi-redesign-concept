"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DATASET_FACTS } from "@/lib/iris";
import { CDI } from "@/lib/catalog";
import { useGsap, usePrefersReducedMotion } from "@/lib/useGsap";

/**
 * The hero is a volcano plot assembling itself.
 *
 * Non-significant genes settle first as grey noise, then the significant ones
 * ignite. It is the single most recognisable image in the field CDI teaches,
 * and it performs the brand argument — most of the data is noise, and the job
 * is deciding which points you are willing to defend.
 */

const POINTS = (() => {
  // Deterministic: server and client must agree.
  let a = 0x9e3779b9;
  const rand = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  // Quantized: Math.log/cos differ in the last bit between Node and the
  // browser, which shows up as a hydration mismatch on the SVG coordinates.
  const q = (n: number) => Math.round(n * 1e4) / 1e4;
  const normal = () => {
    const u = Math.max(rand(), 1e-9);
    return q(Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand()));
  };
  return Array.from({ length: 220 }, () => {
    const fc = normal() * 1.9;
    const p = Math.abs(normal()) * 1.7 + Math.abs(fc) * 1.6;
    const sig = p > 4 && Math.abs(fc) > 1.2;
    return { fc, p, sig, up: fc > 0, r: q(0.6 + rand() * 0.9) };
  });
})();

const TRAIL = [
  { label: "MEASURED", text: "20,412 genes tested", tone: "text-inspect" },
  { label: "ADJUSTED", text: "Benjamini-Hochberg, FDR 0.05", tone: "text-inspect" },
  { label: "FLAGGED", text: "318 significant · 5% expected false", tone: "text-flag" },
  { label: "DECISION", text: "Effect size checked before claiming", tone: "text-pass" },
];

export function CinematicHero() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timers = TRAIL.map((_, i) =>
      window.setTimeout(() => setStep(i + 1), 1600 + i * 1100),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [reduced]);

  const shown = reduced ? TRAIL.length : step;

  // Two group tweens rather than 420 element tweens: cheaper to run, and it
  // keeps GSAP off the SVG nodes React is hydrating.
  const scope = useGsap(({ gsap }) => {
    const tl = gsap.timeline();
    tl.from("[data-noise]", { opacity: 0, duration: 1.4, ease: "power2.out" })
      .from("[data-signal]", { opacity: 0, duration: 1, ease: "power2.out" }, 0.7)
      .from(
        "[data-rise]",
        { y: 34, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.09 },
        0.15,
      )
      .from("[data-cut]", { scaleX: 0, duration: 0.7, ease: "power3.inOut" }, 0.5);
  });

  return (
    <section
      ref={scope as React.RefObject<HTMLElement>}
      className="relative flex min-h-[92svh] items-center overflow-hidden border-b border-line"
    >
      {/* The plot itself, full-bleed behind the type. */}
      <div aria-hidden className="absolute inset-0">
        <svg
          viewBox="0 0 400 260"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          <defs>
            <radialGradient id="heroGlow" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="var(--color-plot-glow)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="400" height="260" fill="url(#heroGlow)" />
          {/* The noise: most of any experiment. */}
          <g data-noise>
            {POINTS.filter((p) => !p.sig).map((p, i) => (
              <circle
                key={i}
                cx={200 + p.fc * 26}
                cy={246 - p.p * 17}
                r={p.r + 0.25}
                fill="var(--color-plot-noise)"
                opacity={0.65}
              />
            ))}
          </g>
          {/* The signal: the handful you would actually defend. */}
          <g data-signal>
            {POINTS.filter((p) => p.sig).map((p, i) => (
              <circle
                key={i}
                cx={200 + p.fc * 26}
                cy={246 - p.p * 17}
                r={p.r + 1.6}
                fill={p.up ? "var(--color-plot-up)" : "var(--color-plot-down)"}
                opacity={1}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Legibility scrim — the type has to win over the plot. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-bg from-22% via-bg/80 via-52% to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent"
      />

      <div className="relative mx-auto w-full max-w-350 px-5 py-24 sm:px-8">
        <div className="max-w-[62rem]">
          <p data-rise className="rule-label mb-7 flex items-center gap-3 text-valid">
            <span className="inline-block h-px w-10 bg-valid" />
            For scientists with data in hand
          </p>

          <h1 className="text-hero text-balance text-fg">
            <span data-rise className="block">
              Turn complex data
            </span>
            <span data-rise className="block">
              into clear,
            </span>
            <span data-rise className="relative block w-fit">
              <span className="relative z-10 text-flag">defensible</span>
              <span
                data-cut
                aria-hidden
                className="absolute inset-x-0 bottom-[0.055em] z-0 h-[0.055em] origin-left bg-accent"
              />
            </span>
            <span data-rise className="block">
              insight.
            </span>
          </h1>

          <p
            data-rise
            className="mt-9 max-w-[52ch] text-lg leading-relaxed text-fg/70 sm:text-xl"
          >
            Most tutorials show you which function to call. They stop before the
            part that decides whether your work survives review.
          </p>

          <div data-rise className="mt-11 flex flex-wrap items-center gap-3">
            <Link
              href="/lessons/data-cleaning"
              className="group relative overflow-hidden rounded-full bg-accent px-8 py-4 font-mono text-sm font-medium text-on-accent transition-transform hover:scale-[1.04]"
            >
              <span className="relative z-10">▶ Start the free lesson</span>
            </Link>
            <Link
              href="#rows"
              className="rounded-full border border-fg/25 bg-bg/40 px-8 py-4 font-mono text-sm text-fg backdrop-blur-sm transition-colors hover:border-valid hover:text-valid"
            >
              Browse the library
            </Link>
          </div>

          <dl data-rise className="mt-14 flex flex-wrap gap-x-10 gap-y-5">
            {[
              [CDI.chapterCount, "free chapters"],
              [CDI.guideCount, "open guides"],
              [DATASET_FACTS.rows, "rows you'll clean"],
              ["$0", "to start"],
            ].map(([value, label]) => (
              <div key={String(label)}>
                <dt className="font-display text-3xl font-semibold text-fg sm:text-4xl">
                  {value}
                </dt>
                <dd className="rule-label mt-1 text-fg-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The decision trail, floating over the plot. */}
        <div
          data-rise
          className="mt-16 w-fit rounded-2xl border border-fg/12 bg-bg/70 px-5 py-4 backdrop-blur-md lg:absolute lg:right-8 lg:bottom-24 lg:mt-0 lg:max-w-95"
        >
          <p className="rule-label mb-3 text-fg-muted">Decision trail · live</p>
          {/* No aria-live: nothing the visitor did causes these, and the
              full list is present in the DOM for assistive tech regardless. */}
          <ol className="space-y-2">
            {TRAIL.map((t, i) => (
              <li
                key={t.text}
                aria-hidden={i >= shown}
                className={`flex gap-3 font-mono text-[0.75rem] leading-relaxed transition-opacity duration-500 ${
                  i < shown ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className={`w-16 shrink-0 ${t.tone}`}>{t.label}</span>
                <span className="text-fg/65">{t.text}</span>
              </li>
            ))}

          </ol>
        </div>
      </div>
    </section>
  );
}
