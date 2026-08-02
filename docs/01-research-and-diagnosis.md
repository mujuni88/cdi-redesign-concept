# Complex Data Insights — Research & Diagnosis

Deliverables 1–6. Everything here was gathered from the live site on 1 August 2026 unless
marked otherwise. Quotes are verbatim. Anything not verifiable on the site is labelled
**[EXTERNAL]** or **[PLACEHOLDER]**.

---

## 1. Existing website summary

### What CDI is

Complex Data Insights is a one-person independent learning platform built around a single
promise, stated on the homepage:

> "Turn complex data into clear, defensible insight."

with the operating model stated as a three-beat line that recurs across the site:

> "Learn openly. Practise independently. Grow with guidance."

That maps to a real three-stage funnel: **free open guides → paid practicals → paid mentorship.**

### The critical architectural fact

CDI is not one website. It is **two disconnected systems wearing one brand**:

| | Marketing + commerce shell | The actual teaching material |
|---|---|---|
| Where | `complexdatainsights.com` | 14 separate `*.complexdatainsights.com` subdomains |
| Built with | WordPress 7.0.2 + Elementor 4.2.1 + WooCommerce 10.9.4, `hello-elementor` theme | Quarto books (1.7.32 / 1.9.38) on GitHub Pages, all CNAME'd to `tmbuza.github.io` |
| Contains | 49 pages, 22 products, 0 blog posts | ~135+ chapter pages of real lessons |
| Navigation | 7-item nav | Each book has its own sidebar; none link back |

A visitor who clicks "Explore Data Science" leaves the brand entirely — different navigation,
different typography, different footer, no shared search, no way back. **This seam is the
single biggest UX problem on the site, and it sits directly on the path from interest to
learning.**

### Mission

From `/about/`, verbatim:

> "CDI is a learning and applied-practice ecosystem that helps people understand complex data,
> build practical capability, and produce work they can explain, defend, and reuse."

And the founding observation, which is the most useful sentence on the entire site:

> "CDI grew from a recurring challenge: many people can access tools and tutorials but receive
> less support in connecting those tools into coherent workflows, interpreting results,
> documenting decisions, and turning completed work into real capability."

### The person behind it

**Teresia Mrema Buza (TMB)** is the only person named anywhere on the site. Her entire on-site
bio is four sentences, in third person:

> "CDI was founded by Teresia Mrema Buza (TMB), a Computational Biologist and Data Scientist
> with an academic research background and experience in complex data analysis, applied
> bioinformatics, and reproducible analytical systems. An independent researcher since 2019,
> her work spans computational biology, multi-omics interpretation, statistical analysis,
> reproducible data workflows, research communication, and systems thinking."

There is **no photo, no degree, no institution, no first-person voice, and no publication list
anywhere on the site.** The `/team/` page renders a "Meet Our People" heading with no people.

**[EXTERNAL — verifiable, but absent from the site and requiring her confirmation before
publication]** Google Scholar (`user=kICqtD4AAAAJ`, affiliation "Complex Data Insights",
verified `@complexdatainsights.com` email) lists **978 citations and an h-index of 10**.
First-author work includes *"iMAP: an integrated bioinformatics and visualization pipeline for
microbiome data analysis"* (**BMC Bioinformatics**, 2019) and *"Gene Ontology annotation quality
analysis in model eukaryotes"* (**Nucleic Acids Research**, 2008). She is a co-author on the
Gene Ontology Consortium's 2012 *NAR* paper (627 citations). ORCID `0000-0001-9514-176X`.
Historical affiliations surfacing in search include Mississippi State University (AgBase) and
Penn State — these come from third-party pages, not primary sources, and should be verified
directly with her.

**This is the largest single missed opportunity on the site.** A working computational
biologist with a decade of citations and a published, still-maintained bioinformatics pipeline
is selling $9.99 practicals from behind a faceless third-person institutional voice.

### Subjects taught — six domains, very unevenly filled

| # | Domain | Free guides | Paid practicals |
|---|---|---|---|
| 01 | Data Science | 5 books (1 broken) | 6 products |
| 02 | Artificial Intelligence | **0 — "Coming soon"** | **0 — "Coming soon"** |
| 03 | Omics & Bioinformatics | 6 books (~75 chapters) | 11 products |
| 04 | Clinical & Medical Data | 1 book, **21 chapters — the largest on the site** | **0 — "Coming soon"** |
| 05 | Career Development | **0 — no free guide exists** | 5 products |
| 06 | Research & Innovation | 1 book (10 chapters) | **0 — "Planned"** |

Only Data Science, ML and Bioinformatics have both halves of the funnel. AI is advertised as a
domain and is entirely empty. Career Development is paid-only with no free entry point.
Clinical has 21 free chapters and nothing to buy.

### Target audience (as the site itself states it)

`/about/` lists six audiences: students and career switchers; researchers and analysts;
educators and mentors; professionals and teams; independent practitioners and founders;
organizations and collaborators. That is six audiences for one undifferentiated experience.

### Free offerings

13–14 open Quarto guides, ~135+ chapters, completely ungated: no paywall, no account, no email
capture. Each has full-text search, sidebar TOC, breadcrumbs, prev/next, and copy-to-clipboard
on every code block. **No PDF, no EPUB, no downloads, no video, no accounts, no progress.**

### Paid offerings

**22 WooCommerce products, $9.99–$39.99**, one-time purchase, delivered as browser-first HTML
files via download link — *"a browser-first CDI Practical that you can follow at your own pace"*
with the suggestion that you can *"print to PDF using browser's Print function."* Concentrated
in bioinformatics (11) and career (5). Bundle discounts are explicit ("$39.99 vs $55.96 if
purchased separately").

**Mentorship**: no published price, no tiers, no booking. The CTA deep-links to a generic
contact form with a `?focus=` parameter. Fees are "clarified during consultation."
**Collaboration/consulting**: no money language at all.

### Expected learner journey (as designed)

`Free guide → paid practical → mentorship.` The Data Science preface states it cleanly:

> "This open guide teaches concepts, reasoning, and reusable workflow patterns. CDI Practicals
> provide bounded exercises in which you apply those skills to a defined task and produce
> evidence of what you can do. […] The guide helps you understand the workflow; a Practical
> asks you to carry it out and produce a concrete result."

**In practice this journey is broken in both directions.** No free chapter links to its paid
practical. No product page links to its free chapter, offers a preview, a sample, a table of
contents, or a screenshot. The buyer sees a single "Description" tab and a price.

---

## 2. Content and asset inventory

### Free guides (14 subdomains)

| Subdomain | Title | Chapters | State |
|---|---|---|---|
| `data-science.` | Data Science Foundations System — *"A Reusable Python Workflow for Tidy Data Analysis and Interpretation"* | 8 | Healthy |
| `python-viz.` | Data Visualization with Python | 12 | Healthy — **only guide with consistent figures** |
| `databases-sql.` | Databases & SQL — *"Building the Data Backbone for Analytical Workflows"* | 7 | Healthy |
| `machine-learning.` | Machine Learning with Python — *"A Structured Workflow for Predictive Modeling"* | 9 | **sklearn HTML repr pollution** |
| `model-deployment.` | Model Deployment | ? | **DEAD — TLS cert never provisioned; still linked from `/resources/`** |
| `ngsdata.` | Data Acquisition System | 10 | Healthy |
| `rnaseq.` | RNA-Seq System — *"From Raw Reads to Defensible Biological Claims"* | 15 | Thin free chapters |
| `gwas.` | GWAS Analysis | 6 | Healthy |
| `singlecell.` | Single-Cell Analysis | 6 | Healthy — good figures |
| `microbiome.` | Microbiome Analysis System — *"From Microbial Communities to Defensible Biological Insights"* | 14 | **Strongest pipeline content** |
| `proteomics.` | Proteomics Analysis (Results-First Edition) | 14 | Healthy |
| `clinical.` | Clinical & Medical Data Systems — *"From Healthcare Records to Reliable Clinical Insights"* | 21 | **Best prose; Markdown leaking into render on ch.14** |
| `datasetdiscovery.` | CDI Systematic Dataset Discovery | 10 | Healthy |
| `ai.` | (exists, unlinked) | ? | Not advertised |

### Chapter anatomy — highly consistent, and useful

Every chapter follows the same skeleton, which is a gift for a redesign because it means a
single component set can absorb the entire back catalogue:

```
metadata header (ID / Type / Audience / Theme)
  → Lesson overview  ("By the end of this lesson, you will be able to…")
  → Mermaid diagram showing position in the pipeline
  → conceptual explanation
  → code + executed output
  → interpretation tables
  → Common Mistakes / Interpretation Cautions
  → "CDI Insight" / "CDI Principle" callout
  → Key Takeaways / Summary
  → Looking Ahead / What Comes Next
```

The IDs are already systematic and stable — `DS-L03`, `RNASEQ-009`, `CMDS-09`, `MLPY-F-L06`.
**These are ready-made content identifiers for a redesigned platform.** No migration taxonomy
needs to be invented.

### Existing visual and brand assets

- **Logo**: `/wp-content/uploads/2023/02/logo2026-blue-black.png` — blue + black wordmark
- **Hero diagram**: `cdi-six-domain-hub.png` — hub-and-spoke of the six domains
- **Favicon**: `cdi_icon.png`
- **Colour tokens** (the one genuinely coherent thing across both systems):
  `#036281` teal-blue primary · `#024d66` dark · `#0f172a` / `#16313a` ink ·
  `#f6fbfd` / `#eef6fa` light backgrounds · **`#f7c546` amber highlight** · `#475569` muted
- **In-house Python theme package** `cdi_viz.theme` with `cdi_notebook_init(chapter="10")` and
  auto-numbered figure export (`figures/10_001.png`), signal `#036281` / muted `#9CA3AF`
- **R plot theme** `scripts/R/cdi-plot-theme.R` providing `cdi_theme()`
- **`.cdi-message` CSS callout class** — a real brand component, used exactly once per page

Total imagery on the homepage: **two images.** No photography, no headshot, no illustration
set, no video, no icons that aren't unicode glyphs (✉ ◎ ◷ ✓ →).

### Formats currently in use

Long-form HTML chapters · executed Python (pandas, matplotlib, seaborn, plotnine, plotly,
scikit-learn) and R (DESeq2, ggplot2, clusterProfiler, tidyverse) · Mermaid pipeline diagrams
(the primary visual device, 4–8 per chapter) · rendered PNG figures (viz and single-cell only)
· interpretation tables · inline scripts shown as text but **never offered as downloads** ·
prose exercises with solutions (inconsistent — present in data-science and python-viz, absent
in RNA-Seq, microbiome, clinical).

**Absent entirely: video, audio, PDF/EPUB, notebooks, Binder/Colab, quizzes, certificates,
progress, accounts, social proof.**

---

## 3. Strongest reusable materials

Ten items worth carrying into a redesign, with a recommended target format for each.

### 3.1 The cleaning philosophy — `data-science/03`, DS-L03 ★ flagship

> "For each potential issue: 1) measure the issue 2) inspect the affected observations
> 3) choose and document a rule 4) apply the rule only when justified 5) validate the result.
> Never modify data without first understanding what is being changed."

**Why it's useful**: this is CDI's entire thesis compressed into five verbs. It is method, not
trivia, and it transfers to every other domain on the site.
**Better as**: an **animated five-step loop** that the learner walks through by doing, with each
step writing a line into a visible decision log. This is the spine of the sample lesson built
in this prototype.

### 3.2 The identical-rows argument — `data-science/03`

> "Identical values do not automatically prove that records are accidental duplicates. Two
> flowers can legitimately have the same four measurements and species label. […] Identical
> rows are a signal to investigate—not automatic permission to delete observations."

**Why it's useful**: it is counterintuitive, it is correct, and it is the exact opposite of what
every "10 pandas tricks" tutorial teaches (`drop_duplicates()` and move on). It is a genuine
competitive differentiator.
**Better as**: an **interactive decision point with immediate feedback** — surface the actual
identical rows in Iris, then force a binary choice (drop / retain) and explain the reasoning
either way. Built as knowledge check #2 in the prototype.

### 3.3 The "nothing changed, and that's the point" twist — `data-science/03`

> "If the input was already clean, the input and output values may be identical. That does not
> mean the workflow was unnecessary. The workflow still: established a quality baseline,
> checked the expected schema and data types, measured missingness, investigated identical
> rows, applied explicit decision rules, validated the downstream output, recorded the result."

**Why it's useful**: currently a paragraph. It is the most memorable idea in the lesson and it
is invisible.
**Better as**: **the emotional payoff of an interactive sequence** — run the pipeline, watch the
diff come back empty, then be asked to explain why that counts as success. Static HTML cannot
do this; an interactive lesson can. This is the climax of the prototype lesson.

### 3.4 The four artifacts — `data-science/03` "CDI Insight"

> "That is why CDI systems keep all four: input table, cleaning script, cleaned output table,
> cleaning report. Together, these artifacts make the workflow easier to understand, reproduce,
> and trust."

**Why it's useful**: this is the unit of achievement CDI already believes in — a file on disk,
not a badge. It is a far better completion model than a progress bar.
**Better as**: **the signature UI component of the whole platform** — a persistent, growing
"decision trail" that becomes a downloadable `cleaning-report.txt` at the end of the lesson.
Implemented as `DecisionTrail` in the prototype.

### 3.5 Clinical data quality — `clinical/09`, CMDS-09

> "A clinical dataset may look complete because it contains many rows. That does not mean it is
> ready. Rows can be duplicated. Dates can be impossible. Patients can appear in outcome files
> without encounters. […] Laboratory values can use mixed units."

> "Clinical analysis depends heavily on time. Time defines exposure. Time defines baseline.
> Time defines follow-up. Time defines whether an outcome happened before or after an index
> event."

> "A quality flag does not automatically mean a record is wrong. It means the record needs
> interpretation."

**Why it's useful**: the best writing on the site, by a distance. Short declarative sentences
with real rhythm. Also carries an 8-row Core Quality Dimensions matrix (Structure, Identity,
Completeness, Uniqueness, Temporal logic, Domain validity, Cross-domain consistency, Analysis
readiness) that is genuinely reusable teaching apparatus.
**Better as**: **scroll-driven visual storytelling** for the prose (each "Time defines…" clause
landing on a timeline as it is spoken), and an **interactive matrix** for the dimensions table
— pick a dimension, see the check run against a sample record. Also the best source of
pull-quotes for marketing.

### 3.6 The dimensionality-reduction line — `singlecell/04`

> "Dimensionality reduction does not create biology. It compresses variance into interpretable
> axes."

**Why it's useful**: the single most quotable sentence on the site.
**Better as**: a **homepage pull-quote** and the opening card of an AI/ML learning path.

### 3.7 The QC-before-clusters teaching sequence — `singlecell/04`

The chapter deliberately colours a PCA by `percent_mt` and by `batch` *before* clustering, then
re-checks mitochondrial percentage per cluster — each with its own "Interpretation" subsection.

**Why it's useful**: this is expert-level pedagogy. It teaches suspicion of your own results.
**Better as**: an **interactive scatter with a colour-by toggle** — the learner flips
`colour by: cluster / percent_mt / batch` and watches an apparently clean cluster resolve into
a batch artefact. Three lines of interaction replace a page of explanation.

### 3.8 The diversity pipeline — `microbiome/08`

Two complete, header-commented, runnable R scripts with `stop()` guards that name which earlier
chapter to run first, hand-rolled Shannon and Bray-Curtis functions rather than library calls,
`cmdscale` PCoA, and literal expected TSV output. Plus this honesty:

> "The toy example contains only three samples and five features. This is enough to test
> workflow structure, but it is not enough for real statistical interpretation."

**Why it's useful**: the closest thing on the site to a real reproducible pipeline chapter, and
the hand-rolled functions are a deliberate, defensible teaching choice.
**Better as**: keep as text — this one is *correct* as long-form. Add a **runnable sandbox** and
a **downloadable script bundle**, and embed the figures the code produces (currently described
but never shown).

### 3.9 Model evaluation — `machine-learning/06`

> "A model is not useful because it produces predictions. It is useful if: it generalizes to
> new data / its errors are acceptable in context / the evaluation matches the real decision
> goal."

Sections include "Evaluation Is Not a Decoration", "Accuracy Can Be Misleading", "Thresholds
Change Behavior", ROC vs precision–recall, cross-validation. Uses a real sklearn
`Pipeline` + `ColumnTransformer` on a CDI-branded synthetic churn dataset.

**Why it's useful**: the most technically substantial chapter on the site, and the only one
using a business-context dataset.
**Better as**: **an interactive threshold slider** — drag the decision threshold and watch the
confusion matrix, precision, and recall move together. This single interaction teaches more
than the 6,714 words currently on the page. Also: **delete the ~3,000 words of sklearn HTML
`repr` boilerplate** currently dumped into the page. That is a content bug, and fixing it is a
one-line change to the notebook render options.

### 3.10 The guide→practical explanation — `data-science/00-preface`

> "The aim is not simply to learn individual Python commands. It is to develop a repeatable way
> of approaching data: understand the question, examine the evidence, make documented
> analytical choices, and communicate conclusions without overstating what the data can
> support."

**Why it's useful**: the clearest articulation of the business model anywhere on the site — and
it is buried in chapter zero of one book.
**Better as**: **homepage copy.** It belongs on the front door, not in a preface.

### Content that should be simplified

- `machine-learning/06` — strip the sklearn `repr` dump (≈3,000 words of API boilerplate)
- `clinical/14` — fix the leaking Markdown fences (` ```text id="risk-group-logic" ` and `---`
  rendering as body text) in the site's largest guide
- `rnaseq/09` — at 807 words with two one-liners of code, the free chapter is a stub that
  advertises the gap it is trying to sell across; either deepen it or reframe it honestly
- Chapter length varies from 533 to 4,582 words with **no signalling**. A learner cannot tell a
  3-minute skim from a 40-minute build. Every chapter needs a time and difficulty estimate.

### Content that should be reorganized

- Six domains is the right *content* taxonomy and the wrong *learner* taxonomy. Nobody wakes up
  wanting "Omics & Bioinformatics"; they want "I have an RNA-Seq count matrix and a deadline."
- 14 disconnected books should become one browsable catalogue with a shared shell.
- ~24 orphaned legacy pages are still live and indexed, including `/giithub-skills/` (typo
  slug), `/elementor-28544/` (a scratch page), blank `/premium/` and `/donate/` pages, and a
  `/faq/` that still claims *"All of our core guides are 100% free to access. There are no
  paywalls, subscriptions, or account requirements"* — **directly contradicting the 22-product
  store.** Both are live right now.

### Content that should become video, animation, or interaction

| Source | Becomes |
|---|---|
| The five-step cleaning loop (DS-L03) | Animated scroll-driven diagram + interactive walkthrough |
| Identical rows (DS-L03) | Decision point with immediate feedback |
| "Time defines exposure…" (CMDS-09) | Pinned scroll storytelling over a patient timeline |
| Threshold behaviour (MLPY-06) | Live slider bound to a confusion matrix |
| QC-before-clusters (SC-04) | Colour-by toggle on a live scatter |
| Every Mermaid pipeline diagram | Animated "you are here" progress diagram, shared component |
| Volcano / MA / PCA plots described in RNA-Seq prose | Actually render them — learners currently read *about* a volcano plot they never see |
| TMB's founding story | 60–90s instructor introduction video |

---

## 4. Current UX critique

Written as a first-time visitor, referring to real pages.

### First five seconds

The homepage headline — *"Turn complex data into clear, defensible insight"* — is genuinely
good. It is specific, it uses "defensible" (an unusual and ownable word), and it promises a
result rather than a curriculum.

Everything after it dilutes that. The sub-deck reads:

> "CDI brings together open learning resources, structured practicals, mentorship, and
> collaborative support across data science, artificial intelligence, omics, clinical data,
> career development, and research."

That is four offering types and six subject areas in one sentence — **ten nouns before the
visitor knows whether the site is for them.** Then six numbered domain cards, each with an
"Explore" link. The visitor's first decision is a six-way fork with no recommendation, no
"start here," and no indication of what is behind any door.

**What a visitor understands in five seconds**: something about data, taught by an
organization, across a lot of subjects. **What they do not understand**: who it's for, what
they'd walk away able to do, whether it's free, or who is teaching.

### Credibility

This is the most serious problem, and it is not a visual one.

- No photo, no first-person voice, no named instructor above the fold
- No testimonials, no reviews, no student counts, no completion numbers
- No institution logos, no press, no "as featured in"
- 0 stars and 0 forks across all 9 repos in the `datainsights` GitHub org; 7 followers on the
  personal account
- **Zero third-party citations of `complexdatainsights.com` found anywhere on the open web**
- Product pages have a Reviews tab that is empty

Meanwhile the founder has 978 citations, an h-index of 10, and a first-author *BMC
Bioinformatics* paper **[EXTERNAL]** — none of which appears on the site. A visitor being asked
for $19.99, or to enquire about unpriced mentorship, has nothing to go on but tone.

### Navigation and information architecture

Seven top-level items (Domains, Resources, Practicals, Mentorship, Collaborate, About, Contact)
with an unclear distinction between **Domains** and **Resources** — both are six-way domain
grids. "Practicals" is a shop; nothing labels it as such until prices appear.

Then the seam: clicking into any guide leaves the site. Different design, different nav, no
breadcrumb home. A learner four chapters into the microbiome book has no visible relationship
to CDI at all.

Live breakages found:
- `/about/` links to `/collaboration/` → **404** (the real page is `/collaborate/`)
- `/resources/` links to `model-deployment.` → **dead**, TLS cert never provisioned
- Footer links to `/licensing/` → 301 to `/licensing-attribution/`
- `/guides/` is in the sitemap → **404**
- `/stay-updated/` renders the literal string `[mailpoet_form id="2"]` — **the only newsletter
  signup on the site is visibly broken**
- `wp-json/wp/v2/users` exposes the admin's personal Gmail as a public author slug

### Cognitive load and readability

The guides are, in isolation, well-written and well-structured. The problem is uniformity of
texture: a chapter is a wall of prose, a code block, a wall of prose, a code block. Five of six
chapters sampled had **zero images**. A learner reading "you will produce a volcano plot" never
sees a volcano plot. There is no visual rest, no change of pace, and no signal about what
matters most.

### Engagement, motivation, and progress

- **No quizzes** anywhere. Every exercise is a prose instruction with no way to check yourself.
- **No progress tracking, no completion state, no accounts** on the guide side.
- **No runnable code.** No REPL, no notebook, no Colab link. Copy → paste → hope your local
  environment matches. For a beginner, environment setup is where most attempts die.
- **No downloads on the free side.** Scripts and datasets are referenced by path (`scripts/R/08a-…R`)
  but never offered as files.
- **No estimated time or difficulty** on any chapter.

A learner has no way to feel they are getting somewhere, and no evidence that they learned
anything. The site's own philosophy — that the point is producing defensible artifacts — is
never operationalised in the interface.

### Course discovery, search, filtering

There is no catalogue. There are six domain pages listing books by name, and each book has its
own internal search. There is no cross-book search, no filter by level or duration or language
(some books are Python, some R, with no labelling on the domain pages), no "start here," no
sequencing, and no recommendations.

### Conversion into a free learner

The site does this **worst of all**, which is odd given the free content is its greatest asset.
There is no email capture that works, no account, no "save your progress," no reason for a
visitor to leave a trace. 135 chapters of genuinely good material generate zero relationship.

### Conversion into a paying customer

Structurally blocked:
- **No free chapter links to its paid practical.** No product links back to its free chapter.
- Product pages have **one tab**: Description. No sample, no preview, no table of contents, no
  screenshot of an output, no reviews.
- The single highest-intent moment on the site — finishing a free chapter — ends with "Looking
  Ahead" and a link to the next free chapter. Nothing is offered.
- Mentorship, likely the highest-margin line, has **no price, no tier, no package, no booking
  link** — just a contact form. Every enquiry requires manual scoping before revenue.

### Mobile

The WordPress shell is a responsive Elementor build and holds up structurally, but ships a
**397 KB Elementor CSS bundle** containing ~25 unused colour tokens from an imported template
kit that was never cleaned up, on **budget shared hosting** (JustHost/Newfold). The Quarto
guides collapse their sidebar into a hamburger and are readable, but code blocks with long
lines require horizontal scrolling, and the on-page TOC disappears — so a learner on a phone
loses their position entirely in a 4,500-word chapter.

### Comparison with modern educational platforms

| Dimension | Brilliant / Duolingo | Modern doc sites (Stripe, Linear) | CDI today |
|---|---|---|---|
| Do something in first 30s | Yes | N/A | No |
| Feedback on an attempt | Immediate | N/A | None |
| Progress visible | Persistent | N/A | None |
| Runnable code | Yes | Yes (live examples) | No |
| Time/difficulty labelled | Yes | Yes | No |
| Instructor visible | Yes | N/A | No |
| Content quality | Good | Excellent | **Good — genuinely competitive** |

**The separation the brief asked for holds: the educational material is good and the
presentation is where the value is being lost.** CDI's pedagogy — insist on documenting
decisions, separate statistical significance from importance, refuse to automate judgment — is
better than most paid courses. Almost nobody will ever find that out.

### Why visitors leave

1. Five seconds in, they cannot tell if it is for them.
2. Six equal doors, no recommendation.
3. Clicking a door leaves the website.
4. No reason to believe the teacher (no face, no name above the fold, no proof).
5. Nothing to do — only text to read.
6. No way to save anything, so returning has no advantage.
7. If they consider buying, nothing shows them what they'd get.

---

## 5. Audience analysis

Five segments, derived from the material's actual difficulty and the site's own stated audiences.

### A. The bench-to-bioinformatics researcher

Postdoc, PhD student, or lab scientist with sequencing data and no formal computational
training.

- **Wants**: to analyse their own RNA-Seq / microbiome / proteomics data without waiting on a
  core facility, and to defend the analysis to a reviewer.
- **Problem**: they have a count matrix and a deadline. Generic data-science courses start with
  churn prediction; bioinformatics courses assume a Linux background they don't have.
- **Level**: strong domain expertise, weak-to-moderate coding. Reads R more comfortably than
  Python.
- **Intimidated by**: the command line, conda environments, being told to "just use Nextflow,"
  and the assumption that they already know what a count matrix is.
- **Attracted by**: subject-native examples (real SRA accessions, real DESeq2), and — crucially
  — **defensibility**. "Will this survive review?" is their actual question.
- **Format**: text and code they can copy into their own project, plus short video for concepts.
  They will not sit through a 40-minute lecture.
- **Returns for**: the next step in a pipeline they are actively running.
- **Pays for**: a complete, runnable, reproducible workflow that saves them a week — and for
  someone to review their analysis before submission. **Both already exist at CDI.**

### B. The career switcher into data

Coming from biology, nursing, teaching, or an unrelated field. Often self-taught, often
overwhelmed.

- **Wants**: a job, and evidence they can show an employer.
- **Problem**: tutorial hell. They have finished six courses and have nothing to show.
- **Level**: beginner. Fragile confidence.
- **Intimidated by**: statistics notation, the word "reproducible," being told to build a
  portfolio without being told what one is.
- **Attracted by**: small wins, visible progress, a clear path, and a named human who will
  answer them.
- **Format**: short interactive lessons, immediate feedback, video for encouragement.
- **Returns for**: streaks, progress, and the next small win.
- **Pays for**: the career practicals — portfolio evidence, GitHub profile, professional
  profile — and, later, mentorship. **CDI already sells exactly this, with no free entry point
  into it.**

### C. The clinical / health data professional

Clinical researcher, epidemiologist, health-informatics analyst, or clinician-in-training.

- **Wants**: to work with EHR-derived data credibly, and to avoid the classic traps.
- **Problem**: their data is messy in domain-specific ways — impossible dates, mixed units,
  missingness that means five different things.
- **Level**: strong domain reasoning, variable technical skill, high sensitivity to rigour.
- **Intimidated by**: nothing about the domain; wary of anything that looks like it will
  produce an indefensible result.
- **Attracted by**: the governance and quality material — CDI's clinical guide is 21 chapters
  and includes an FHIR/interoperability roadmap.
- **Format**: reference-grade text with strong tables, plus checklists they can apply at work.
- **Returns for**: it becoming their standard reference.
- **Pays for**: team training and institutional licensing. **Currently nothing is sold here at
  all despite it being the largest guide on the site.**

### D. The general data-science beginner

Student or self-learner exploring the field.

- **Wants**: to find out whether this is for them.
- **Problem**: everything looks either trivial or impossible.
- **Level**: true beginner.
- **Attracted by**: playfulness, quick wins, "learn in 10 minutes."
- **Pays for**: little, initially. High volume, low intent — valuable as top-of-funnel, not as
  a target.

### E. Institutions and teams

Labs, university departments, NGOs, and small companies.

- **Wants**: to upskill several people consistently.
- **Level**: mixed.
- **Attracted by**: credibility, structure, and the ability to point staff at one place.
- **Pays for**: cohorts, licensing, and consulting — the highest-value line. **Requires the
  credibility layer to exist first.**

---

## 6. Recommended primary audience

> **Segment A: the bench-to-bioinformatics researcher — a working scientist who has their own
> omics or clinical dataset and needs to analyse it in a way that will survive peer review.**

Design the first experience for one person: *a second-year PhD student with an RNA-Seq count
matrix, a supervisor expecting results in three weeks, and no formal computational training.*

**Why this segment first:**

1. **It is where the content is deepest.** Six omics guides, ~75 chapters, and 11 of 22 paid
   products. CDI can serve this person today; it cannot yet serve the AI learner at all.
2. **It is where the founder's authority is real and provable.** A published, still-maintained
   microbiome pipeline (iMAP, *BMC Bioinformatics* 2019) and a decade of citations
   **[EXTERNAL]** mean something specific to this audience and almost nothing to a general
   beginner. Credibility that is *legible to the audience* is the scarcest asset CDI has.
3. **"Defensible" is a real value proposition here and only here.** To a beginner, "defensible
   insight" is abstract. To someone facing Reviewer 2, it is the entire product. CDI's existing
   headline is already written for this person.
4. **They have budget and urgency.** Grant-funded, deadline-driven, and used to paying for
   tools. A $14.99 practical that saves a week is a trivial decision — *if* they can see what
   they're getting.
5. **It is defensible against competition.** Coursera and DataCamp own the generic beginner.
   Nobody owns "rigorous, reproducible, reviewer-proof omics analysis taught by a practising
   computational biologist."
6. **The other segments are reachable from here.** Career switchers aspire to be this person.
   Clinical professionals share the defensibility concern. Institutions employ them.

**What this means concretely**: the homepage speaks to someone with data in hand. The first
learning path is omics. The sample lesson is chosen for breadth of entry (data cleaning — the
step every one of these people must do first) but framed in this audience's language. Career
Development and general Data Science remain fully available as secondary paths, and the
platform is built to add AI and Clinical as their content matures.

---

*Continued in `02-strategy-and-design.md`.*
