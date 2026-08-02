---
target: the site (homepage + lesson)
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 4
timestamp: 2026-08-02T07-11-15Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser evidence) + a third isolated agent for the technical audit. Not degraded.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Trail and per-step "✓ measured" are excellent; rail reads "7/7" beside a nine-item list, and nothing marks completion |
| 2 | Match System / Real World | 3 | Fluent for a bench scientist; a career-switcher meets FDR, Benjamini-Hochberg and "alpha & beta diversity" with no gloss, plus five undifferentiated content nouns |
| 3 | User Control and Freedom | 2 | Zero persistence — a refresh destroys 18 minutes of trail; correct answers lock permanently; the reducer's `reset` action has no UI |
| 4 | Consistency and Standards | 2 | "Learn" nav points at `#paths`, which does not exist on the rendered page; two different UI patterns for the same choose-one job; header vanishes on the lesson |
| 5 | Error Prevention | 3 | Nothing destructive and the sandbox is reversible; but no warning that leaving discards the trail, and a non-recommended rule silently fails to advance |
| 6 | Recognition Rather Than Recall | 3 | Progress rail names every section; but card subtitles are hover-only, three buttons are labelled only "Run", and the duplicate finder forces you to memorise four decimals |
| 7 | Flexibility and Efficiency | 2 | Rail anchors are the entire accelerator set — no resume, no skip-to-artifact, no early download |
| 8 | Aesthetic and Minimalist Design | 3 | Genuinely disciplined restraint, spoiled by a ~370px dead channel in the lesson grid and two full-height placeholder voids |
| 9 | Error Recovery | 3 | Wrong-answer feedback is best-in-class; the silently-stalled missing-value rule is an error with no message |
| 10 | Help and Documentation | 3 | Deeper-reading links on nearly every section; every one leaves the site with no return path, and there is no glossary |
| **Total** | | **27/40** | **Acceptable** (top of band) |

Technical audit: **14/20** — Accessibility 2/4, Performance 3/4, Responsive 3/4, Theming 3/4, Implementation Integrity 3/4.

## Design Specificity Verdict

**Authored for this product — but the authorship lives in the payload, not the composition.**

The specificity is real and hard to fake: `df.duplicated(keep=False)` above actual Iris rows at their actual indices; a hero trail reading "Benjamini-Hochberg, FDR 0.05"; wrong-answer feedback arguing from the data's own resolution. Twelve of thirteen posters are seeded SVG of the real chart type. The monospace contract holds under audit — not one decorative mono string.

But strip the SVG and the copy and the skeleton is a 2024 dark-SaaS template: sticky header with amber pill CTA, full-bleed hero with a two-line highlighted headline, jargon marquee, hover-lift carousels, billboard, 3-up grid, numbered how-it-works, instructor block, 3-up pricing. The composition is inherited; the content is authored. The one structurally original surface is the lesson.

**Deterministic scan.** CLI detector: exit 2, 4 findings, all one rule (`side-tab`, `border-l-2`) — all four are false positives (semantic state markers on `role="status"` panels). Browser detector: 92 anti-patterns on home, 11 on the lesson. After discounting false positives (`ai-color-palette` ×28 = the documented viridis ramp; `shape-assembled-illustration` ×19 = real data plots; `all-caps-body` ×6 = the `rule-label` utility; `text-occlusion` ×5 = the detector's own overlay), the surviving real findings are **59 undersized UI text runs (9.6–10.88px)**, **5 low-contrast**, a 253-character footer line, and tight leading on `rule-label`.

**Visual overlays: none available.** Injection succeeded only inside a headless process that is now closed. No user-visible overlay exists in any browser tab.

## Overall Impression

The ideas are better than the execution. The decision trail, the generated chart posters, and the "identical is not duplicated" argument are genuinely original and could not be lifted onto another product. But the page buries its own best moment five sections down, the lesson's central claim is undermined by a display bug, and the accessibility floor has real holes — the focus ring is invisible on the entire lesson page.

The single biggest opportunity: **the 15-second demo is the most persuasive thing here and it is the fifth thing a visitor meets.**

## What's Working

**1. The decision trail is a progress mechanic that produces an artifact.** It replaces "you scrolled nine sections" with "you decided eleven things" and terminates in a downloadable file containing the user's own reasoning. It is derived from the client's own pedagogy, so mechanic and curriculum are the same idea.

**2. The typographic contract is enforced, not merely declared.** Mono appears on `df.duplicated(keep=False)`, `sepal_length`, row indices, file paths, counts — and nothing atmospheric. After two screens you can predict what a mono string means before reading it.

**3. Wrong answers teach instead of scoring.** Every distractor gets a paragraph respecting why someone would choose it. Single elastic shake, never a bare red X, always shape *and* colour on the state marker.

Plus, from measurement: flawless heading structure (one h1, zero skipped levels across 38 headings), reduced motion properly engineered rather than bolted on, CLS ≈ 0.0008, and a fully server-rendered no-JS baseline.

## Priority Issues

### [P1] The focus ring is invisible on the entire lesson page
Amber `#f7c546` measures **1.47:1 on `#f1f5f6`** and 1.61:1 on white. On the lesson — entirely light surface — **42 of 47 focus stops fail** WCAG 1.4.11.
**Why:** keyboard and low-vision users lose their place in an 18-minute task.
**Fix:** make the ring surface-aware — `--color-signal` is 7.03:1 on white, `--color-ink` 19.48:1. Or a two-tone ring that survives both grounds.
**Command:** `/impeccable harden`

### [P1] The centrepiece decision shows one of the three identical rows
`DuplicateFinder` slices a contiguous 12-row window (rows 8–19), but group one is rows **10, 35 and 38**. After "Scan all 150 rows" a single amber row appears while the readout asserts "5 rows in 2 groups." Independently verified.
**Why:** this is the argument the entire product rests on, and it is the one place the concept asks a learner to take a claim on faith. The homepage demo, which puts the rows adjacent, is more convincing than the lesson it advertises.
**Fix:** on scan, collapse the table to the matched groups with identical rows stacked adjacent.
**Command:** `/impeccable clarify`

### [P1] A refresh destroys the artifact the product promises
`TrailProvider` is a plain `useReducer`; there is no `localStorage`/`sessionStorage` anywhere in `src/` (verified). No resume, no restart control, no exit warning. The reducer has a `reset` action no UI exposes.
**Why:** the pitch is "you leave with an artifact." Any interruption silently deletes it.
**Fix:** persist `{entries, completed}` under a lesson-scoped key; show "Resuming — 6 decisions recorded" with a Start-over control; enable Download from the first entry.
**Command:** `/impeccable harden`

### [P1] The first nav item goes nowhere
`SiteHeader` links "Learn" → `/#paths`. `id="paths"` lives only in `DiscoveryRows.tsx`, which `page.tsx` no longer renders. Verified: clicking Learn moves scrollY to 68 while the other three go to 6916–8068.
**Why:** on a Persuade surface, the nav item labelled with the visitor's actual intent silently does nothing.
**Fix:** repoint to `#rows`; delete the 629 lines of dead components so the next dead anchor can't happen.
**Command:** `/impeccable polish`

### [P2] The flagship poster is the one that isn't a chart, and it reads as a loading skeleton
`Cleaning` draws eight rounded bars of five rounded pills — canonical skeleton-loader vocabulary — used full-bleed behind the Billboard, one section after copy claiming "Each cover is the chart that guide teaches you to make." Every row's pills are identical widths, so only hue marks the flagged rows.
**Fix:** redraw as an actual chart from the chapter (missingness matrix or per-column completeness bar); give flagged rows genuinely identical cell values; switch the billboard scrim to vertical so narrow viewports never put copy on artwork.
**Command:** `/impeccable bolder`

## Persona Red Flags

**Dr. Neema — bench scientist with her own RNA-seq counts.** Scans for identical rows and gets one highlighted row against a claim of five — she has spent her career being told to check the data. The hero volcano plot is `preserveAspectRatio="slice"` behind a left-to-right scrim, so she sees one lopsided lobe of what should be a butterfly. Everything runs on 150 tidy rows with zero missing values; the only route to her own data is a $14.99 card at the bottom.

**Marcus — career-switcher, six months into Python.** The hero throws "Benjamini-Hochberg, FDR 0.05" at him before he has read the subhead; the marquee follows with genotype QC and batch effects, none defined. He clicks "Learn" — nothing happens. Five nouns for content with no stated relationship. Three buttons labelled only "Run". He picks "Drop every row with any missing value", gets an explanation but no trail entry and no progress, stuck at 6/7 with no message.

**Casey — distracted mobile user.** Gets a text at section 5, returns to an evicted tab, loses all eleven entries with no warning. The hero's volcano plot is invisible at 390px. Card explanations are behind `onMouseEnter`, which his device does not have. Measured lesson controls: Run 54×34, Copy 43×25, Scan 154×34 — all under 44pt.

## Minor Observations

- Progress rail shows 7/7 beside a nine-item list where two items keep grey dots forever.
- `readyForArtifact = completed.length >= 4` counts `id="assertion"`, which is not a section id — the artifact can unlock a step early (verified).
- Focus is destroyed when an action button disables itself: after Enter on "Run", `document.activeElement === document.body` on a 15,340px page.
- Hero trail fires 4 unsolicited `aria-live` announcements at 1.6/2.7/3.8/4.9s.
- `aria-pressed` used for one-of-N quiz answers across 13 buttons — a screen reader says "toggle button, not pressed."
- Card link accessible names concatenate chip + caption + chart `<text>`: "Foundationalfitted linear modelData Science FoundationsA Reu…" across 16 cards.
- `aria-controls="mobile-nav"` resolves to nothing when the menu is closed.
- 31 external links open new tabs with no warning.
- Lesson overflows 5px at 320px — `assert df['sepal_length'].between(0, 20).all()` is an unbreakable token.
- Footer links are 16px tall; `ArtifactReport`'s `<pre>` clips mid-word at the payoff moment.
- 105 sub-12px text runs on home driven by `rule-label` at 11px.
- 2,084 inline `<circle>` and 3,424 DOM nodes on the homepage; 249KB gzip First Load JS for a two-page static site, 48KB of it GSAP.
- `--color-inspect` #31688e is 3.25:1 as on-dark text — it fails on every `MEASURED` row of the signature component.

## Questions to Consider

1. The 15-second demo is the most persuasive thing here and it is the fifth thing a visitor meets. What if it *is* the hero — three identical rows, two buttons, "Make the call"?
2. The hero animates a volcano plot for a lesson about a table. Why demonstrate a chart type the free lesson never teaches?
3. If the decision trail is the product, why does it exist only inside one lesson?
4. Every deeper-reading link sends the visitor to the site this concept is meant to replace, with no return path. Is the lesson a front door or a departure lounge?
5. Three dashed placeholders land on the founder's face, her citation count, and the mentorship price — the three things a paying customer most needs to see. Is visible-placeholder the right treatment *there*?
6. The lesson runs on 150 perfect rows and says so repeatedly. What is the smallest change that would let a bench scientist paste in five rows of her own data — and would that do more for conversion than the entire homepage?
