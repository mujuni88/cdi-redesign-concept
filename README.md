# Complex Data Insights — redesign concept

A research-backed redesign of [complexdatainsights.com](https://complexdatainsights.com):
strategy documents plus a working high-fidelity prototype of the homepage and one complete
interactive lesson.

```bash
npm install
npm run dev     # http://localhost:3000
```

- `/` — redesigned homepage
- `/lessons/data-cleaning` — the complete sample lesson

## The deliverables

| Document | Covers |
|---|---|
| [`docs/01-research-and-diagnosis.md`](docs/01-research-and-diagnosis.md) | Existing site summary · content and asset inventory · strongest reusable materials · UX critique · audience analysis · recommended primary audience |
| [`docs/02-strategy-and-design.md`](docs/02-strategy-and-design.md) | Product and brand direction · information architecture · homepage concept · sample lesson spec · video and generated-media plan · GSAP plan · design system · component architecture · mobile strategy · accessibility and performance |
| [`docs/03-conversion-and-roadmap.md`](docs/03-conversion-and-roadmap.md) | Free-to-paid conversion strategy · five-phase implementation plan |

## What the prototype demonstrates

**The signature idea is the decision trail.** CDI's own teaching says a workflow should keep
four artifacts — input table, script, cleaned output, and *report* — and that the report is what
makes the other three trustworthy. So the lesson is built around producing one: every choice the
learner makes writes a plain-language line into a visible log, and that log becomes a real
downloadable `cleaning-report.txt`. Progress means "you decided seven things", not "you scrolled
seven screens."

**The content is real.** The lesson adapts *Data Cleaning and Preparation* (`DS-L03`) from the
live Data Science Foundations System, quoting it verbatim where it quotes. The data is the
canonical UCI Iris dataset, and the identical rows the lesson finds — rows 10/35/38 and 102/143
— are genuinely in that file, not fabricated for the exercise. Every guide, chapter count, price
and URL in `src/lib/catalog.ts` was transcribed from the live site.

**Placeholders are visible, not hidden.** Anything that is not real CDI content is wrapped in a
dashed border: unbuilt media assets, unset prices, and — most importantly — the founder's
publication record, which is externally verifiable but appears nowhere on the live site and is
marked `[verify]` pending her confirmation. No credentials, testimonials, statistics or course
results were invented.

## Structure

```
src/
├ app/
│  ├ page.tsx                     homepage composition
│  └ lessons/data-cleaning/       lesson page + client composition
├ components/
│  ├ site/                        header, placeholder markers
│  ├ home/                        hero, outcomes, demo, discovery rows, story
│  └ lesson/                      shell, decision trail, knowledge checks,
│                                 interactions, cycle diagram, primitives
└ lib/
   ├ iris.ts                      canonical dataset + derived analysis
   ├ catalog.ts                   real CDI guides, chapters, products
   ├ trail.tsx                    decision-trail state + report generator
   └ useGsap.ts                   reduced-motion-gated GSAP context
```

The lesson components are the reusable system: a second lesson is a section list plus a
composition, not bespoke React.

## Design notes

- **Dark surfaces are where you browse; light surfaces are where you work.** The catalogue keeps
  its cinematic quality, long-form reading gets a high-legibility ground.
- **Colour carries meaning.** The accent ramp is viridis — the colour-vision-safe scale
  matplotlib and seaborn use by default, and that CDI's own `cdi_viz` theme already teaches —
  with each stop bound to a data state. `#036281` and `#f7c546` are CDI's existing brand tokens.
- **Mono is reserved for values that came from the data or the machine**: file paths, column
  names, counts, code, trail entries. Never for atmosphere.
- **Motion explains or it is cut.** GSAP timelines run through one hook that no-ops under
  `prefers-reduced-motion`, and every animated element's default state is its final state, so
  nothing is only reachable through animation. The pinned cycle diagram degrades to a numbered
  list.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · GSAP 3 (ScrollTrigger).
Both routes prerender as static content.

## Attribution

Content adapted from complexdatainsights.com by Teresia Mrema Buza. CDI publishes its guide text
under CC BY 4.0 and its code under MIT.
