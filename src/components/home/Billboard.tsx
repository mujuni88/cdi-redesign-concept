"use client";

import Link from "next/link";
import { CourseArt } from "@/lib/art";
import { GUIDES } from "@/lib/catalog";
import { useGsap } from "@/lib/useGsap";

/** A scrolling strip of what the platform actually covers. Ambient, not a CTA. */
export function Marquee() {
  const items = [
    "differential expression",
    "alpha & beta diversity",
    "genotype QC",
    "cohort definition",
    "reproducible reporting",
    "missingness",
    "threshold selection",
    "batch effects",
    "multiple testing",
    "portfolio evidence",
    "functional enrichment",
    "data cleaning",
  ];
  return (
    <div className="overflow-hidden border-b border-line py-5">
      <div className="flex w-max motion-safe:animate-[slide_46s_linear_infinite]">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-8 px-8 font-mono text-[0.75rem] tracking-wider text-fg-muted whitespace-nowrap uppercase"
              >
                {item}
                <span className="h-1 w-1 rounded-full bg-valid/60" />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <style>{`@keyframes slide { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

/** Netflix billboard: full-bleed art, gradient scrim, copy over the top. */
export function Billboard() {
  const scope = useGsap(({ gsap, scope }) => {
    gsap.from("[data-bill]", {
      scrollTrigger: { trigger: scope, start: "top 72%" },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.09,
      ease: "power3.out",
    });
  });

  return (
    <section
      ref={scope as React.RefObject<HTMLElement>}
      id="featured"
      data-billboard
      aria-labelledby="billboard-heading"
      className="relative overflow-hidden border-b border-line"
    >
      <div aria-hidden className="absolute inset-0">
        <CourseArt variant="cleaning" seed={9} className="h-full w-full" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-bg via-bg/92 to-bg/40"
      />

      <div className="relative mx-auto max-w-350 px-5 py-24 sm:px-8 lg:py-32">
        <div className="max-w-[46rem]">
          <p data-bill className="rule-label mb-6 flex items-center gap-3 text-flag">
            <span className="rounded-sm bg-accent px-2 py-1 text-on-accent">Featured</span>
            Interactive lesson · DS-L03
          </p>

          <h2
            id="billboard-heading"
            data-bill
            className="text-display max-w-[14ch] text-balance"
          >
            Same numbers. Same species. Delete one?
          </h2>

          <p
            data-bill
            className="mt-7 max-w-[50ch] text-lg leading-relaxed text-fg/70"
          >
            Three rows of the Iris dataset match on every value. Most tutorials
            reach for <code className="text-flag">drop_duplicates()</code>. In
            eighteen minutes you&rsquo;ll learn why that&rsquo;s a guess — and
            leave with a report that documents what you decided instead.
          </p>

          <div data-bill className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/lessons/data-cleaning"
              className="rounded-full bg-bg-alt px-8 py-4 font-mono text-sm font-medium text-fg transition-transform hover:scale-[1.04]"
            >
              ▶ Play lesson
            </Link>
            <span className="rounded-full border border-fg/20 px-6 py-4 font-mono text-xs text-fg/70">
              18 min · 9 sections · free
            </span>
          </div>

          <ul data-bill className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {[
              "Inspect before you change",
              "Decide, then record",
              "Validate what you claimed",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2.5 font-mono text-[0.75rem] text-fg-muted">
                <span className="text-pass">✓</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** The six domains, each fronted by its own generated chart. */
export function DomainGrid() {
  const featured = [
    { slug: "rnaseq", tag: "Transcriptomics" },
    { slug: "microbiome", tag: "Microbiome" },
    { slug: "singlecell", tag: "Single-cell" },
    { slug: "gwas", tag: "Genomics" },
    { slug: "clinical", tag: "Health records" },
    { slug: "machine-learning", tag: "Machine learning" },
  ];

  const scope = useGsap(({ gsap, scope }) => {
    gsap.from("[data-domain]", {
      scrollTrigger: { trigger: scope, start: "top 80%" },
      y: 26,
      opacity: 0,
      duration: 0.6,
      stagger: 0.07,
      ease: "power2.out",
    });
  });

  return (
    <section
      ref={scope as React.RefObject<HTMLElement>}
      id="domains"
      data-domains
      aria-labelledby="domains-heading"
      className="border-b border-line px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-350">
        <p className="rule-label mb-5 text-valid">Where this goes</p>
        <h2 id="domains-heading" className="text-display max-w-[20ch] text-balance">
          The same discipline, applied to harder data.
        </h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(({ slug, tag }, i) => {
            const g = GUIDES.find((x) => x.slug === slug)!;
            return (
              <a
                key={slug}
                href={g.href}
                target="_blank"
                rel="noreferrer"
                data-domain
                className="group relative min-w-0 overflow-hidden rounded-2xl border border-line transition-colors hover:border-valid/70"
              >
                <div className="aspect-3/2 overflow-hidden">
                  <CourseArt
                    variant={g.art}
                    seed={i * 23 + 11}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-108"
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-bg from-10% via-bg/65 via-34% to-transparent to-68%"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="rule-label mb-2 text-valid">{tag}</p>
                  <h3 className="text-[1.15rem] leading-tight font-semibold text-fg">
                    {g.title}
                  </h3>
                  <p className="mt-2 font-mono text-[0.75rem] text-fg-muted">
                    {g.chapters} chapters · {g.language}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
