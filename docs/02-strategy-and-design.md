# Complex Data Insights — Strategy, Design & Architecture

Deliverables 7–16. Continues from `01-research-and-diagnosis.md`.

---

## 7. New product and brand direction

### The strategic problem in one sentence

CDI teaches a genuinely differentiated discipline — *how to make analytical decisions you can
defend* — through a medium (static text) that cannot demonstrate decisions being made.

### The positioning

> **CDI is where scientists learn to produce analysis that survives review.**

Not "learn data science." Not "master bioinformatics." The promise is about **the defensibility
of your output**, because that is the actual anxiety of the primary audience and it is already
CDI's own language.

Existing headline stays. It was always right:

> **Turn complex data into clear, defensible insight.**

### The product idea: the decision trail

CDI's own pedagogy names the unit of achievement, and it is not a badge:

> "That is why CDI systems keep all four: input table, cleaning script, cleaned output table,
> cleaning report."

So the redesigned platform's core mechanic is **the decision trail**: as a learner works
through a lesson, every choice they make writes a plain-language, timestamped line into a
visible log beside the content. At the end of a lesson, that log *is* a real artifact — a
`cleaning-report.txt` they can read and download, showing what was measured, what was decided,
what rule was applied, and what was validated.

This does four jobs at once:

1. **Progress** that is meaningful rather than decorative — the bar fills because you made
   decisions, not because you scrolled.
2. **Assessment** without exam theatre — the trail records *reasoning*, which is what CDI
   actually teaches.
3. **Portfolio evidence** — the thing CDI already sells career practicals to produce.
4. **A conversion surface** — the trail ends by naming the practical that turns this decision
   pattern into a full runnable workflow.

No competitor has this, and it falls directly out of CDI's existing philosophy rather than
being imported from Duolingo.

### Brand attributes

| Keep | Add | Drop |
|---|---|---|
| "Defensible" as the ownable word | A face and a first-person voice | Institutional third person ("CDI emphasizes…") |
| The three-beat rhythm ("Learn openly. Practise independently. Grow with guidance.") | Visible authority (citations, the iMAP pipeline) **[EXTERNAL — confirm first]** | Six equal doors with no recommendation |
| `#036281` petrol and `#f7c546` amber | Motion that explains | Emoji-as-icons on legacy pages |
| Refusal to over-claim | Time and difficulty labels everywhere | "Coming soon" on domains with nothing behind them |
| British "practise" as verb, "Practicals" as noun | Real figures, rendered | Walls of undifferentiated prose |

### Voice

Keep the short declarative rhythm the clinical guide already demonstrates — *"Time defines
exposure. Time defines baseline."* — and move from third-person institutional to a named
practitioner speaking plainly. "CDI emphasizes reproducibility" becomes "I keep the cleaning
report because six months later I will not remember why I dropped those rows."

---

## 8. Revised information architecture

### Principle

**One shell, one search, one identity.** The 14 Quarto books stop being separate websites and
become the long-form layer *inside* the platform. Nothing gets thrown away — the seam gets
closed.

### Navigation

```
Learn ▾            Practicals        Mentorship        About
├ Start here                         ├ How it works    ├ Teresia
├ Learning paths (6)                 ├ Focus areas     ├ Approach
├ All lessons                        └ Request         └ Collaborate
├ Reference library
└ Continue learning  ← appears once you have a trail
```

Four items instead of seven. **Domains and Resources merge** — the current split is invisible
to a visitor since both are six-way grids. "Domains" survives as a filter, not as a
destination.

### The three content types

| Type | What it is | Where it lives | Free? |
|---|---|---|---|
| **Lesson** | Interactive, 8–20 min, decision trail, knowledge checks | New platform | Free |
| **Reference chapter** | The existing Quarto material, in the platform shell | Migrated, then wrapped | Free |
| **Practical** | Runnable end-to-end workflow, real dataset, produces artifacts | Existing product, given a preview | Paid |

The relationship must be explicit and bidirectional — this is currently the biggest structural
failure. Every lesson ends by naming its practical. Every practical shows its free lesson.

### Route map

```
/                                   Homepage
/start                              Guided 4-question router → recommended path
/paths                              All learning paths
/paths/[slug]                       e.g. /paths/rna-seq-end-to-end
/lessons/[slug]                     Interactive lesson  ← prototype builds this
/library                            All reference chapters, unified search
/library/[book]/[chapter]           Migrated Quarto content in the CDI shell
/practicals                         Catalogue with real previews
/practicals/[slug]                  Product page + free sample + linked lesson
/mentorship                         Now with published tiers and a booking link
/about                              Teresia, first person, with a photo
/trail                              Your decision trails, artifacts, progress
```

### Migration and cleanup (non-negotiable, and cheap)

- 301 the ~24 orphaned legacy pages, or delete them
- Delete `/premium/`, `/donate/`, `/team/`, `/elementor-28544/`, `/giithub-skills/`,
  `/terms.html`, `/privacy.html`
- Retire `/faq/` — it claims "no paywalls, subscriptions, or account requirements" while a
  22-product store is live
- Fix `/about/` → `/collaboration/` (404) and the footer `/licensing/` redirect
- Restore or remove `model-deployment.` (dead TLS, still linked as a live guide)
- Remove the exposed admin email from `wp-json/wp/v2/users`

---

## 9. Homepage concept

Ten sections telling one story: *you have data, here is what defensible looks like, here is the
person who will teach you, start free.*

### 1 — Hook: the hero is a live demonstration, not a headline over a gradient

Split composition. Left: the headline. Right: **a real table of Iris data with a real problem
in it**, and a decision trail writing itself beside the table as three inspections run
automatically on load — a 6-second, self-playing miniature of the entire product.

The headline is CDI's own line. The sub-line names the audience:

> **Turn complex data into clear, defensible insight.**
> For scientists with real data and a reviewer waiting.

CTAs: **Start the free lesson** (primary) · **Browse the library** (secondary).

*Why this and not a stat block:* the product's whole argument is that visible reasoning beats
confident output. The hero should perform that argument, not assert it.

### 2 — Outcome: what you will be able to do

Three statements in the learner's voice, not curriculum bullets: *"I can explain every
transformation between raw and analysis-ready." / "I can tell a real duplicate from a
coincidence." / "I can hand my analysis to a reviewer with the decisions attached."*

### 3 — Interactive demonstration: the identical-rows decision

The single best idea in CDI's material, playable in fifteen seconds on the homepage. Two
identical rows from Iris. One question: *drop them or keep them?* Both answers get a real
response; the correct one gets the reasoning. A visitor learns something true before being
asked for anything.

### 4 — Learning paths (Netflix-style rows — see §"Discovery" below)

### 5 — Real-world applications

Three cards drawn from actual CDI material: a microbiome diversity study using real SRA
accessions, an RNA-Seq differential expression workflow, a clinical data-quality readiness
report. Each links to the real chapter.

### 6 — Featured lesson

Full-bleed card for the flagship lesson with duration, level, what you produce, and the
decision-trail preview.

### 7 — How the learning experience works

Four beats: **Decide, don't just read** → **Every decision is logged** → **Leave with an
artifact** → **Go deeper when you want to.** Illustrated with the trail component itself.

### 8 — Instructor story

Photo **[PLACEHOLDER — generate or supply]**, first person, and the credibility that already
exists but is invisible. Every number here is marked in the prototype as requiring
confirmation before publication.

### 9 — Free starting point

The whole free tier stated plainly: 14 guides, 135+ chapters, no account required. One CTA.

### 10 — What costs money, said honestly

Practicals $9.99–$39.99 one-time, no subscription. Mentorship with a published starting price
**[PLACEHOLDER]**. Framed as CDI's own funnel: *learn openly, practise independently, grow with
guidance.*

### Progressive disclosure throughout

Every section leads with one sentence and hides the depth behind a "Read the full chapter"
affordance pointing at the original material. No wall of text on the homepage; no dumbing down
either.

---

## 10. Complete sample lesson

**Chosen topic: Data Cleaning and Preparation (`DS-L03`)**, from
`data-science.complexdatainsights.com/03-data-cleaning-and-preparation.html`.

### Why this lesson

- **No domain gatekeeping.** Every audience segment must clean data first. RNA-Seq requires you
  to already care about genes; this requires nothing.
- **It carries the brand thesis better than any other page.** The five-step loop and *"Cleaning
  is not about making data look perfect"* are CDI's argument, not just a task.
- **It already contains the best exercise on the site** — a seven-step comparison against a
  generated report, which converts almost mechanically into interactive UI.
- **The twist is genuinely great.** The dataset is already clean, so a correct run changes
  nothing. As a paragraph it is forgettable; as an interactive beat — run it, watch the diff
  come back empty, then explain why that is success — it is the thing people remember.
- **Cheapest to make interactive.** 150 rows of Iris, no R runtime, no Bioconductor, no PHI.
- **Both funnel tiers already exist** (free chapter + $14.99 Data Cleaning and Validation
  Practical), so it can demonstrate the free→paid handoff that is currently missing site-wide.

### Structure — 9 sections, an action every 1–2 sections

| # | Section | Learner action | Trail entry |
|---|---|---|---|
| 0 | **Cinematic open** — "Every dataset arrives with a history you didn't witness" | Begin | — |
| 1 | **The real problem** — a published claim, and the unrecorded cleaning decision underneath it | Read (30s) | — |
| 2 | **The loop** — animated 5-step cycle, revealed by scroll | Read | — |
| 3 | **Inspect** — run three inspections on the real table | Click each inspection | 3 entries |
| 4 | **Standardize names** — live transformer, `sepal length (cm)` → `sepal_length` | Apply the rule | 1 entry |
| 5 | **Identical rows** ★ — find them, then decide | **Knowledge check: drop or retain?** | 1 entry |
| 6 | **Numeric coercion** — sandbox showing `errors="coerce"` creating missingness | Toggle a hypothetical bad value | 1 entry |
| 7 | **Missing values** — choose a rule and see its effect | **Knowledge check: which rule?** | 1 entry |
| 8 | **Validate** — assertions run live, pass/fail | Run validation | 1 entry |
| 9 | **The artifact** ★ — the report you just wrote, and the twist | **Knowledge check: why did nothing change?** | — |
| — | Summary · next step · deeper reading · the practical | — | — |

### Fidelity to the source

All prose, code, decisions, and the exercise are adapted from the real chapter. The Iris data is
the canonical UCI dataset. The identical rows the lesson finds are **real duplicate rows in that
dataset**, not fabricated. Where the lesson needs a value that does not exist in Iris (to
demonstrate `errors="coerce"`), it is presented as an explicitly-labelled hypothetical and the
UI says so.

### Deeper reading

Each section links to the corresponding heading in the original Quarto chapter. The lesson is a
front door to the reference material, not a replacement for it.

---

## 11. Video and generated-media plan

Six pieces. All short. None is a lecture.

### V1 — Homepage trailer

- **Purpose**: answer "what is this and is it for me" in one loop, without sound.
- **Length**: 18–22s, silent, autoplay, loop, muted, `poster` fallback.
- **Placement**: hero background on `/`, behind the live table at low opacity — or as an
  optional "Watch the 20-second tour" panel. Must never block content.
- **Storyboard**: (1) A dense sequencing count matrix scrolls past, unreadable. (2) A single
  column isolates and lifts out. (3) A decision line types itself: `RULE APPLIED — retained 3
  identical rows; no unique identifier available`. (4) The matrix resolves into a clean PCoA
  ordination. (5) Title: *Turn complex data into clear, defensible insight.*
- **Visual direction**: petrol-black field, viridis-ramp data marks, no stock footage, no
  people, no swooping 3D. It should look like something a scientist made, not like a SaaS ad.
- **On-screen copy**: only the four words of the trail entry and the final line.
- **Generation prompt** (Veo / Hyper Frames): *"Macro abstract data visualization on a deep
  petrol-black field. A dense grid of small numeric cells scrolls upward, out of focus. One
  column sharpens and lifts. Thin teal and green marks in a viridis palette resolve from noise
  into an ordered two-dimensional scatter. Slow, precise, scientific. No text, no people, no
  lens flare. Shallow depth of field, subtle film grain, 22 seconds, seamless loop."*

### V2 — Instructor introduction ★ highest priority

- **Purpose**: put a face on the platform. This is the single highest-leverage asset given that
  credibility, not design, is the conversion bottleneck.
- **Length**: 60–75s.
- **Placement**: `/about/` top, and section 8 of the homepage.
- **Storyboard**: talking head, then B-roll of a terminal running a real pipeline, then back.
- **Voiceover** (her own words, first person — draft for her to approve, **[PLACEHOLDER]**):
  *"Most people can find a tutorial. What they can't find is help connecting the steps —
  deciding what to do when the data doesn't match the tutorial, and explaining why afterwards.
  That gap is why I built this."* (adapted from the real `/about/` copy)
- **Note**: this should be **filmed, not generated.** A synthetic avatar of a real named
  scientist would undermine the exact credibility it is meant to build. If filming is
  impossible, use a still photograph and audio.

### V3 — Lesson chapter openers (one per lesson, ~8s)

- **Purpose**: give each lesson a visual identity and a moment of focus before work begins.
- **Length**: 6–9s, silent, plays once on lesson open, skippable.
- **Storyboard for the cleaning lesson**: a messy table of glyphs settles, row by row, into
  alignment; two rows remain highlighted in amber and do *not* resolve; title card.
- **Generation prompt**: *"Abstract typographic data table on cool near-white paper. Misaligned
  rows of small monospace glyphs settle into a precise grid, one row at a time. Two rows stay
  highlighted in warm amber and remain unresolved. Minimal, editorial, scientific. 8 seconds."*

### V4 — Practical preview clips (one per paid product, 10–15s)

- **Purpose**: fix the highest-friction moment on the site. Product pages currently show a price
  and a paragraph. **A 12-second screen recording of the workflow producing its volcano plot
  would do more for conversion than any copy rewrite.**
- **Placement**: product page hero, and on hover in the catalogue.
- **Direction**: real screen capture, not generated. Show the actual outputs the product names.

### V5 — Concept animations embedded in lessons (15–30s each)

Three to start, all of which currently exist only as prose:
1. **Multiple testing** — 20,000 genes tested, 5% false positives appearing from nothing (RNA-Seq ch.9)
2. **Alpha vs beta diversity** — within-sample vs between-sample, animated (Microbiome ch.8)
3. **Threshold movement** — the confusion matrix reorganising as the threshold slides (ML ch.6)

These should be **code-generated, not AI-generated** — matplotlib/D3 renders using CDI's own
`cdi_viz.theme`, so they are reproducible and correct. An AI video model cannot be trusted to
render a statistically accurate volcano plot.

### V6 — Catalogue hover previews (3–5s, muted, silent)

Netflix-style. Only where a real visual exists to show. Never a generated abstraction standing
in for a lesson that has no figures — that would promise content that isn't there.

### What NOT to generate

No fake students, no fake testimonial video, no synthetic instructor for a real named person,
and no generated "scientific" imagery that implies specific results. The brand is built on not
over-claiming; the media plan has to hold the same line.

---

## 12. GSAP animation plan

**Rule applied throughout: every animation either explains something, directs attention, or
confirms an action. Anything that only decorates is cut.** All timelines are registered through
one `useGsap` hook that no-ops under `prefers-reduced-motion`, and every animated element is
authored so its *final* state is its default state — content is never hidden behind a
transition that might not run.

| # | Where | Technique | What it explains |
|---|---|---|---|
| 1 | Hero table | Staggered row fade + auto-running inspection sequence | That inspection is a sequence of measurements, not one glance |
| 2 | Hero trail | Type-on line entries with a live counter | That decisions accumulate into a record |
| 3 | The five-step loop | `ScrollTrigger` pinned section, one step advancing per scroll segment | The loop is a cycle with an order — this *is* the content |
| 4 | Discovery rows | Card scale + shadow lift on hover; horizontal scroll snap | Affordance and depth |
| 5 | Lesson progress | Width tween on the rail, driven by section completion | Position in a bounded task |
| 6 | Trail entry append | New line slides in from the rail with a 400ms amber flash | Confirms *your action caused this* — the core feedback loop |
| 7 | Knowledge check feedback | Correct: green sweep. Incorrect: single 6px horizontal shake, no red flash | Immediate, non-punitive |
| 8 | Column-name transformer | `FLIP`-style position tween between old and new header | Makes the transformation legible as a *change*, not a swap |
| 9 | Identical-rows reveal | The 150-row table scrolls and locks onto the matching rows, which pulse amber | Directs attention to evidence rather than telling |
| 10 | Coercion sandbox | Value morphs to `NaN`, missing-value counter increments in sync | Causality — this action produced that consequence |
| 11 | Validation assertions | Sequential check-off, 180ms apart, with a final pass state | Assertions run in order and all must hold |
| 12 | The artifact reveal | Report lines write out, then the diff panel resolves to "0 values changed" | The twist — the payoff beat of the lesson |
| 13 | Section transitions | Short opacity/`y` reveal on enter, 24px travel maximum | Rhythm without distraction |

**Explicitly rejected**: parallax hero backgrounds, counter-up statistics, letter-by-letter
headline scrambles, magnetic cursors, page-load curtain wipes, scroll-jacked full-page snapping.
All of these would cost comprehension and battery to buy nothing.

---

## 13. Design system

### Colour — the palette is information

CDI's existing brand tokens are kept (`#036281` petrol, `#f7c546` amber, `#f6fbfd` light
ground) because they are the one coherent thing across both current systems. The accents extend
them with **viridis** — the perceptually-uniform, colour-vision-safe scale that matplotlib and
seaborn use by default, and that CDI's own `cdi_viz.theme` already teaches.

That choice is not decorative. It means **the palette embodies the pedagogy**: a colour system
chosen for accessibility and perceptual honesty, on a platform that teaches accessibility and
perceptual honesty. And each stop is bound to a data state, so colour carries meaning:

| Token | Hex | Meaning |
|---|---|---|
| `--color-ink` | `#06131a` | Browse surfaces — deep petrol black |
| `--color-paper` | `#f1f4f5` | Work surfaces — cool vellum (from CDI's `#f6fbfd`) |
| `--color-signal` | `#036281` | **CDI brand petrol** — primary actions |
| `--color-raw` | `#440154` | viridis 0.0 — untouched, unexamined |
| `--color-inspect` | `#31688e` | viridis 0.3 — measured, not yet decided |
| `--color-valid` | `#21918c` | viridis 0.5 — checked and passing |
| `--color-pass` | `#35b779` | viridis 0.7 — confirmed by a chosen rule |
| `--color-flag` | `#f7c546` | **CDI brand amber** — needs human interpretation |
| `--color-change` | `#d64550` | A value actually changed |

**Dark surfaces are where you browse. Light surfaces are where you work.** That duality is
honest to the subject — the terminal is dark, the notebook is light — and it keeps long-form
reading on a high-legibility ground while the catalogue keeps its cinematic quality.

### Typography — three faces, three jobs, one rule

| Role | Face | Why |
|---|---|---|
| Display | **Bricolage Grotesque** | Variable width and optical size; technical without being cold; not the Inter/Geist default the current site uses |
| Body | **Literata** | A genuine long-form reading face. Lessons are 2,000+ words; a serif on the light work surface earns its keep |
| Data | **IBM Plex Mono** | Scientific-technical provenance, `zero` feature enabled |

**The rule that makes it a system:** *mono is reserved for values that came from the data or the
machine* — file paths, column names, IDs, counts, code, metrics, trail timestamps. Never for
atmosphere, never for a label that is just a word. This encodes CDI's provenance ethic in the
typography itself: if it's set in mono, it came from somewhere real.

Scale: `--text-hero` `clamp(2.6rem, 7vw, 5.75rem)` at `0.94` line-height and `-0.035em`
tracking; `--text-display`; `--text-title`. Body 17–18px at `1.65` on light surfaces.

### Signature element

**The decision trail.** A monospace log that grows as you work, in the lesson's left rail, in
the hero as a self-playing demo, and on the "how it works" section as illustration. It is the
one bold thing; everything around it is quiet and disciplined.

### Other primitives

- Radius `18px` / `24px` (carried from CDI's existing tokens)
- Borders: hairline, `--color-paper-line` / `--color-ink-line`
- Elevation: soft blue-grey shadows, `0 14px 34px rgba(2,24,33,0.08)`
- Grain overlay on dark surfaces — one inline SVG, no image request — so the dark ground reads
  as a material rather than flat black
- Focus ring: 2px amber, 3px offset, always visible

---

## 14. Component architecture

```
src/
├ app/
│  ├ layout.tsx                  fonts, metadata, skip link
│  ├ page.tsx                    homepage composition
│  └ lessons/data-cleaning/page.tsx
├ components/
│  ├ site/                       SiteHeader · SiteFooter · Placeholder
│  ├ home/                       Hero · OutcomePromise · IdenticalRowsDemo ·
│  │                             DiscoveryRows · Applications · FeaturedLesson ·
│  │                             HowItWorks · Instructor · FreeTier · PaidTier
│  └ lesson/
│     ├ LessonShell.tsx          progress rail + trail + section registry
│     ├ LessonSection.tsx        scroll-observed section wrapper
│     ├ DecisionTrail.tsx        ★ signature component
│     ├ KnowledgeCheck.tsx       options, feedback, trail write
│     ├ DataTable.tsx            virtualised-ish table with row highlighting
│     ├ InspectionPanel.tsx      §3
│     ├ ColumnStandardizer.tsx   §4
│     ├ DuplicateFinder.tsx      §5
│     ├ CoercionSandbox.tsx      §6
│     ├ MissingValueRules.tsx    §7
│     ├ ValidationRun.tsx        §8
│     ├ ArtifactReveal.tsx       §9
│     ├ CodeBlock.tsx            copy-to-clipboard, matching the Quarto affordance
│     └ CycleDiagram.tsx         pinned 5-step loop
├ lib/
│  ├ iris.ts                     canonical dataset + derived analysis
│  ├ catalog.ts                  real CDI books, chapters, products
│  ├ trail.tsx                   trail state (context + reducer)
│  └ useGsap.ts                  reduced-motion-gated GSAP context
```

**State**: the decision trail is a reducer in React context, scoped to the lesson. No global
store; no server state in the prototype. In production it would persist to an account and back
the `/trail` route.

**Reuse claim**: the lesson components are the platform. A second lesson is a data file plus a
composition — the shell, trail, checks, table, code block, and progress rail are all generic.

---

## 15. Mobile strategy

Mobile is not a shrunken desktop here; the lesson genuinely needs a different shape.

- **Trail rail → bottom sheet.** On desktop the trail is a persistent left rail. On mobile it
  collapses to a fixed bottom bar showing the latest entry and a count; tapping expands the
  full log. The learner never loses the sense that decisions are accumulating, but it never
  eats reading width.
- **Progress becomes a top hairline** rather than a sidebar element.
- **Tables scroll horizontally in a bounded container** with a sticky first column and an edge
  fade indicating more content — never a page-level horizontal scroll. (The current Quarto
  guides fail exactly here.)
- **Discovery rows keep horizontal scroll** with CSS scroll-snap and momentum. This is the one
  place the Netflix pattern is *better* on mobile than on desktop.
- **Knowledge-check options become full-width stacked targets**, minimum 48px.
- **Code blocks** get `overflow-x: auto` in their own container, retaining the copy button.
- **Hero** stacks: headline, then the live table, then CTAs. The table stays — it is the
  argument.
- Type scales via `clamp()`, so there is no separate mobile scale to maintain.

---

## 16. Accessibility and performance strategy

### Accessibility

- **Reduced motion is a first-class path, not a suppression.** `useGsap` no-ops entirely; every
  animated element's default CSS state is its final state; the pinned cycle diagram becomes a
  static numbered list. Nothing is only learnable through motion.
- **Colour is never the only channel.** Every state in the viridis system carries a text label
  and an icon or shape as well. This matters doubly on a platform teaching colour-safe
  visualization.
- Semantic landmarks; one `h1` per page; `section` + `aria-labelledby` throughout.
- Knowledge checks are real `<fieldset>`/`<button>` groups; feedback is announced via
  `role="status"` `aria-live="polite"`.
- The trail is an ordered list in an `aria-live="polite"` region so appended entries are spoken.
- Progress uses `role="progressbar"` with `aria-valuenow`/`valuemin`/`valuemax`.
- Focus is visible everywhere (2px amber, 3px offset) and never removed.
- Skip-to-content link as the first focusable element.
- Contrast: body text on `--color-paper` and on `--color-ink` both clear AA at their sizes;
  amber is used for large text and non-text indicators only, never for small body copy on light.
- Video: all decorative video is `muted`, `playsInline`, `loop`, with `poster` fallbacks and a
  reduced-motion opt-out. Instructional video would ship with captions and a transcript.

### Performance

- **Server components by default**; only interactive lesson pieces are `"use client"`.
- GSAP loads only on routes that use it; the core is ~25KB gzipped and no plugins beyond
  ScrollTrigger are needed.
- `next/font` with `display: swap` for all three faces, subset to `latin`.
- The dataset ships as a static TS module (~6KB) — no fetch, no loading state.
- No image requests for texture: the grain is an inline SVG data URI.
- Table rendering is capped to a visible window with an explicit "show all" control rather than
  rendering 150 rows into the DOM on every state change.
- Target: LCP under 2.0s on 4G, CLS under 0.05 (all media has explicit dimensions), no layout
  shift from font swap (metric-adjusted fallbacks via `next/font`).
- **Context**: the current site is on budget shared hosting serving a 397KB Elementor CSS
  bundle. Moving to a static/edge-rendered Next.js build is itself a large performance win
  before any optimisation.

### SEO

- Every lesson and reference chapter is server-rendered with real content in the HTML.
- `Course` and `LearningResource` structured data on lessons; `Person` on the about page;
  `Product` on practicals.
- Canonical URLs consolidating the 14 subdomains into one origin — currently CDI's link equity
  is split across 15 hostnames with zero external backlinks to any of them.
- Real meta descriptions on inner pages (currently only the homepage has one).

---

*Continued in `03-conversion-and-roadmap.md`.*
