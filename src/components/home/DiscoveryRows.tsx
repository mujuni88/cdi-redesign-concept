"use client";

import Link from "next/link";
import { useRef } from "react";
import { ROWS, type CardItem } from "@/lib/catalog";
import { useGsap } from "@/lib/useGsap";

/**
 * Netflix-style rows, used only where a visitor genuinely faces "which of
 * many?". Rows are named for the learner's situation ("You have sequencing
 * data") rather than for CDI's internal taxonomy, because nobody wakes up
 * wanting "Omics & Bioinformatics" — they wake up with a count matrix.
 */

function Card({ item }: { item: CardItem }) {
  const external = item.href.startsWith("http");
  const Wrapper = external ? "a" : Link;

  return (
    <li className="w-70 shrink-0 snap-start sm:w-80">
      <Wrapper
        href={item.href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        data-card
        className="group flex h-full flex-col rounded-2xl border border-ink-line bg-ink-raised p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-valid hover:shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
      >
        <div className="mb-4 flex items-center gap-2">
          {item.interactive ? (
            <span className="rule-label rounded-sm bg-flag px-1.5 py-1 text-ink">
              Interactive
            </span>
          ) : (
            <span className="rule-label rounded-sm border border-ink-line px-1.5 py-1 text-ink-soft">
              Open guide
            </span>
          )}
          <span className="rule-label text-ink-soft">{item.level}</span>
        </div>

        <h3 className="text-[1.15rem] leading-tight font-semibold text-paper group-hover:text-valid">
          {item.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-[0.9rem] leading-relaxed text-ink-soft">
          {item.subtitle}
        </p>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between font-mono text-[0.7rem] text-ink-soft">
            <span>{item.meta}</span>
            <span>
              {item.minutes < 60
                ? `${item.minutes} min`
                : `~${Math.round(item.minutes / 60)} h`}
            </span>
          </div>
          {typeof item.progress === "number" && (
            <div className="mt-3 h-0.5 w-full bg-ink-line">
              <div
                className="h-full bg-valid"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          )}
        </div>
      </Wrapper>
    </li>
  );
}

function CardRow({ row }: { row: (typeof ROWS)[number] }) {
  const listRef = useRef<HTMLUListElement>(null);

  const nudge = (direction: 1 | -1) => {
    listRef.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  };

  return (
    <div className="mb-14 last:mb-0">
      <div className="mb-1 flex items-end justify-between gap-4 px-5 sm:px-8">
        <div>
          <h3 className="font-display text-title text-paper">{row.title}</h3>
          <p className="mt-1.5 max-w-[52ch] text-[0.92rem] text-ink-soft">
            {row.reason}
          </p>
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label={`Scroll ${row.title} left`}
            className="h-9 w-9 rounded-full border border-ink-line text-paper transition-colors hover:border-valid hover:text-valid"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label={`Scroll ${row.title} right`}
            className="h-9 w-9 rounded-full border border-ink-line text-paper transition-colors hover:border-valid hover:text-valid"
          >
            →
          </button>
        </div>
      </div>

      <ul
        ref={listRef}
        className="scroll-row flex gap-4 overflow-x-auto px-5 pt-5 pb-2 sm:px-8"
      >
        {row.items.map((item) => (
          <Card key={`${row.title}-${item.title}`} item={item} />
        ))}
      </ul>
    </div>
  );
}

export function DiscoveryRows() {
  const scope = useGsap(({ gsap }) => {
    gsap.from("[data-card]", {
      scrollTrigger: { trigger: "[data-discovery]", start: "top 80%" },
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: "power2.out",
    });
  });

  return (
    <section
      id="paths"
      ref={scope as React.RefObject<HTMLElement>}
      aria-labelledby="paths-heading"
      data-discovery
      className="border-b border-ink-line py-20 lg:py-28"
    >
      <div className="mx-auto max-w-350">
        <div className="mb-14 px-5 sm:px-8">
          <p className="rule-label mb-5 text-valid">The library</p>
          <h2
            id="paths-heading"
            className="text-display max-w-[20ch] text-balance"
          >
            Start from where you actually are.
          </h2>
          <p className="mt-6 max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-soft">
            Every guide here is open and free to read in full. The rows are named
            for the situation you are in, not for the subject index.
          </p>
        </div>

        {ROWS.map((row) => (
          <CardRow key={row.title} row={row} />
        ))}
      </div>
    </section>
  );
}
