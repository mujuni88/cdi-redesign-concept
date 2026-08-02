"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ROWS, type CardItem } from "@/lib/catalog";
import { CourseArt, ART_CAPTION } from "@/lib/art";
import { useGsap } from "@/lib/useGsap";

/**
 * Netflix-style discovery, with one important difference: the poster on each
 * card is the real chart that course teaches you to produce. Hovering lifts the
 * card and reveals the detail strip, the way a Netflix tile expands into its
 * preview — but the "still" is a volcano plot, not a stock photo.
 */

function Card({ item, index }: { item: CardItem; index: number }) {
  const [open, setOpen] = useState(false);
  const external = item.href.startsWith("http");
  const Wrapper = external ? "a" : Link;

  return (
    <li className="w-72 shrink-0 snap-start sm:w-84">
      <Wrapper
        href={item.href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        data-card
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-line bg-ink-raised transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-valid/70 hover:shadow-[0_22px_50px_-12px_rgba(33,145,140,0.4)]"
      >
        <div className="relative aspect-16/10 overflow-hidden">
          <CourseArt
            variant={item.art}
            seed={index * 17 + 3}
            className="h-full w-full transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink-raised via-transparent to-transparent"
          />

          <div className="absolute top-3 left-3 flex gap-1.5">
            {item.interactive && (
              <span className="rule-label rounded-sm bg-flag px-2 py-1 text-ink">
                Interactive
              </span>
            )}
            <span className="rule-label rounded-sm bg-ink/75 px-2 py-1 text-paper/80 backdrop-blur-sm">
              {item.level}
            </span>
          </div>

          <p className="absolute right-3 bottom-2.5 font-mono text-[0.6rem] text-paper/45">
            {ART_CAPTION[item.art]}
          </p>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-[1.1rem] leading-tight font-semibold text-paper group-hover:text-valid">
            {item.title}
          </h3>

          {/* The preview strip: collapsed height animates open on hover/focus. */}
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-300 ${
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="pt-2.5 pb-4 text-[0.88rem] leading-relaxed text-ink-soft">
                {item.subtitle}
              </p>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-ink-line pt-3 font-mono text-[0.68rem] text-ink-soft">
            <span className="truncate">{item.meta}</span>
            <span className="shrink-0 text-valid">
              {item.minutes < 60
                ? `${item.minutes} min`
                : `~${Math.round(item.minutes / 60)} h`}
            </span>
          </div>
        </div>
      </Wrapper>
    </li>
  );
}

function Row({ row, rowIndex }: { row: (typeof ROWS)[number]; rowIndex: number }) {
  const listRef = useRef<HTMLUListElement>(null);
  const nudge = (dir: 1 | -1) =>
    listRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  return (
    <div className="mb-16 last:mb-0">
      <div className="mb-2 flex items-end justify-between gap-4 px-5 sm:px-8">
        <div>
          <h3 className="font-display text-title text-paper">{row.title}</h3>
          <p className="mt-1.5 max-w-[54ch] text-[0.92rem] text-ink-soft">{row.reason}</p>
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => nudge(d)}
              aria-label={`Scroll ${row.title} ${d === -1 ? "left" : "right"}`}
              className="h-9 w-9 rounded-full border border-ink-line text-paper transition-colors hover:border-valid hover:bg-valid/10 hover:text-valid"
            >
              {d === -1 ? "←" : "→"}
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={listRef}
        className="scroll-row flex gap-4 overflow-x-auto px-5 pt-5 pb-3 sm:px-8"
      >
        {row.items.map((item, i) => (
          <Card key={`${row.title}-${item.title}`} item={item} index={rowIndex * 7 + i} />
        ))}
      </ul>
    </div>
  );
}

export function ArtRows() {
  const scope = useGsap(({ gsap, scope }) => {
    gsap.from("[data-card]", {
      scrollTrigger: { trigger: scope, start: "top 78%" },
      y: 28,
      opacity: 0,
      duration: 0.65,
      stagger: 0.035,
      ease: "power2.out",
    });
  });

  return (
    <section
      id="rows"
      ref={scope as React.RefObject<HTMLElement>}
      aria-labelledby="rows-heading"
      data-rows
      className="border-b border-ink-line py-20 lg:py-28"
    >
      <div className="mx-auto max-w-350">
        <div className="mb-16 px-5 sm:px-8">
          <p className="rule-label mb-5 text-valid">The library</p>
          <h2 id="rows-heading" className="text-display max-w-[20ch] text-balance">
            Start from where you actually are.
          </h2>
          <p className="mt-6 max-w-[56ch] text-[1.0625rem] leading-relaxed text-ink-soft">
            Every guide is free to read in full. Each cover is the chart that
            guide teaches you to make — generated, not illustrated.
          </p>
        </div>

        {ROWS.map((row, i) => (
          <Row key={row.title} row={row} rowIndex={i} />
        ))}
      </div>
    </section>
  );
}
