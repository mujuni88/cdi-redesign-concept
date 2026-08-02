# Complex Data Insights — Conversion & Implementation Roadmap

Deliverables 17–18. Continues from `02-strategy-and-design.md`.

---

## 17. Free-to-paid conversion strategy

### The diagnosis

CDI's conversion problem is **not pricing and not traffic quality**. It is that the funnel is
physically disconnected at every joint:

1. **No free chapter links to its paid practical.** The highest-intent moment on the entire
   site — a learner who just finished a chapter and wants to *do* the thing — currently ends
   with "Looking Ahead" and a link to more free content.
2. **No product page links back to its free chapter**, offers a sample, a table of contents, a
   screenshot, or a preview. One tab: Description. The buyer is asked for $14.99 with no way to
   see what they'd get.
3. **No email capture works.** `/stay-updated/` renders the literal string
   `[mailpoet_form id="2"]`. 135 chapters of free content generate zero relationships.
4. **Mentorship, likely the highest-margin line, has no price**, no tier, no package, and no
   booking link — only a contact form. Every enquiry requires manual scoping before any revenue
   exists.
5. **Zero social proof anywhere.** No reviews, no counts, no testimonials, empty Reviews tab.

Each of these is fixable independently, and none requires the redesign to ship first.

### The model: free proves the method, paid does the work

CDI's own three-beat line is already the right funnel. It just needs to be built:

| Stage | What the learner gets | What CDI gets |
|---|---|---|
| **Learn openly** | Interactive lessons + 135 reference chapters, no account | Trust, and a demonstrated method |
| *(the join)* | A saved decision trail → needs an account | **An email, and a reason to return** |
| **Practise independently** | A runnable workflow, real data, real artifacts, $9.99–$39.99 | Transactional revenue |
| **Grow with guidance** | Review of *your* analysis | High-margin recurring revenue |

### The five conversion mechanics

**1. The trail is the email capture.** A learner finishes the cleaning lesson and has produced a
real `cleaning-report.txt`. Offering to *save your decision trail and download your report* is
a genuine benefit at the exact moment of accomplishment — not an interstitial demanding an
address before value is delivered. This converts far better than a newsletter box and it is
honest.

**2. The lesson ends by naming the gap precisely.** Not "buy the practical" but: *"You just made
these decisions on 150 rows of Iris with the rules chosen for you. The Data Cleaning and
Validation Practical gives you the reusable script, a messy real-world dataset, and the
validation report generator — so you can do this to your own data."* State the delta, not the
price.

**3. Every practical gets a preview.** This is the single highest-ROI change on the current
site. Add to every product page: the free lesson it extends, a real screenshot of an output it
produces, the table of contents, the tool stack, and a 12-second screen recording. The RNA-Seq
product already *names* nine outputs including a volcano plot and a PCA — **show them.**

**4. Publish mentorship pricing.** Three tiers with real prices, real scopes, and a booking
link. Unpriced services convert a fraction as well as priced ones because the enquiry itself
costs the buyer social risk. Suggested structure **[PLACEHOLDER — prices require TMB's
decision]**:

| Tier | Scope | Price |
|---|---|---|
| Analysis review | One workflow or report reviewed, written feedback | *[TBD]* |
| Project guidance | Multiple sessions across a defined project | *[TBD]* |
| Ongoing mentorship | Monthly, capped hours | *[TBD]* |

**5. Build proof deliberately.** Enable reviews and ask every existing buyer for one. Surface
the founder's citation record and the iMAP paper **[EXTERNAL — confirm before publishing]**.
Publish a real "what learners produced" gallery from mentorship work, with permission. None of
this is design work; all of it moves conversion more than design will.

### Bundling and pricing observations

Current pricing is **too low to signal quality** for the primary audience. A postdoc paying
$14.99 for a workflow that saves a week is not making a considered purchase — they are making
an impulse one, which means CDI captures almost none of the value it creates and gets no
commitment in return. Two options, both worth testing:

- **Raise individual practicals** into the $29–$49 band and lean harder on demonstrating
  outcomes. The existing bundle logic ($39.99 vs $55.96) already shows the mechanism works.
- **Introduce a path bundle**: all RNA-Seq practicals plus the reference library plus one
  analysis review, priced as a single defensible-analysis package.

Keep the free tier genuinely free and ungated. It is CDI's best asset and the only reason
anyone will ever trust the paid tier.

### Metrics that matter

| Stage | Metric | Today |
|---|---|---|
| Discovery | Sessions reaching any lesson | Unknown, no analytics named |
| Activation | **% completing one interactive lesson** | Not measurable — no lessons exist |
| Capture | % saving a trail | 0 — no mechanism |
| Purchase | Free-lesson → practical conversion | 0 — no link exists |
| Expansion | Practical → mentorship enquiry | Unknown |

The first job is not optimisation. It is **instrumentation of a funnel that currently has no
joints to measure.**

---

## 18. Phased implementation plan

### Phase 1 — Fast, high-impact fixes to the current site *(1–2 weeks, no redesign required)*

Everything here is achievable on the existing WordPress + Quarto stack and pays for itself
before any redesign ships.

**Fix what is broken**
- Restore or remove `model-deployment.` (dead TLS, still linked from `/resources/` as live)
- Fix `/about/` → `/collaboration/` 404 → `/collaborate/`
- Fix the footer `/licensing/` redirect; remove `/guides/` from the sitemap (404)
- Repair or replace the newsletter form on `/stay-updated/` (currently renders raw shortcode)
- Fix the leaking Markdown fences in `clinical/14` — the largest guide renders wrong
- Strip the ~3,000 words of sklearn HTML `repr` boilerplate from `machine-learning/06`
- Remove the exposed admin email from `wp-json/wp/v2/users`; disable user enumeration
- Delete `/terms.html`, `/privacy.html`, `/premium/`, `/donate/`, `/team/`, `/elementor-28544/`,
  `/giithub-skills/`; 301 the remaining ~24 orphans
- Retire `/faq/` — it contradicts the store ("no paywalls, subscriptions, or account requirements")

**Connect the funnel** *(highest revenue impact in this phase)*
- Add a linked call-to-action at the end of **every free chapter** pointing to its practical
- Add to **every product page**: the free chapter it extends, a table of contents, and at least
  one real screenshot of an output
- Add a working email capture at the end of each guide

**Make the content legible**
- Add estimated time and difficulty to every chapter header (the `ID/Type/Audience/Theme` block
  already exists — extend it)
- Embed the figures the code already generates. Learners currently read about volcano plots they
  never see.
- Offer the scripts and datasets as actual downloads

**Establish credibility**
- Add a photo and a first-person bio to `/about/` **[requires TMB]**
- Surface publications and the iMAP pipeline **[EXTERNAL — confirm first]**
- Enable and solicit product reviews

**Publish mentorship pricing** **[requires TMB's decision]**

### Phase 2 — Redesigned homepage and navigation *(3–4 weeks)*

- Ship the new homepage (the prototype in this repository)
- Collapse 7 nav items to 4; merge Domains into Learn
- Build `/start` — a four-question router that ends on a recommended path
- Build the unified catalogue with real filters (domain, level, duration, language)
- Wrap the Quarto books in the CDI shell so a learner never leaves the brand; add cross-book
  search
- Migrate to static/edge hosting; drop the 397KB Elementor bundle

### Phase 3 — Complete sample lesson prototype *(2–3 weeks)*

- Ship `/lessons/data-cleaning` (built in this repository)
- Instrument it: completion rate, per-section drop-off, knowledge-check accuracy
- **Validate before building more.** If learners do not complete one lesson, building twelve
  is the wrong next move. The gate for Phase 4 should be an explicit completion-rate threshold.
- Add trail saving with account creation at the artifact moment

### Phase 4 — Reusable course and lesson system *(4–6 weeks)*

- Generalise the lesson components into an authoring format (MDX + a typed interaction registry)
  so a lesson is content plus configuration, not bespoke React
- Build the interaction library the back catalogue needs: threshold slider, colour-by scatter,
  diff viewer, pipeline stepper, quality-matrix checker
- Build `/trail` — saved artifacts, progress across paths, resumption
- Convert 4–6 further lessons, one per domain, chosen for funnel value:
  RNA-Seq differential expression · microbiome diversity · clinical data quality ·
  model evaluation · portfolio evidence
- Add hover previews and Netflix-style discovery to the full catalogue

### Phase 5 — Content migration and paid offerings *(ongoing)*

- Migrate all 14 Quarto books into the platform as the reference layer, preserving the existing
  stable IDs (`DS-L03`, `RNASEQ-009`, `CMDS-09`) as canonical identifiers
- Rebuild the practicals as in-platform experiences rather than downloadable HTML, with the
  purchased workflow running against the learner's own data
- Launch mentorship tiers with booking
- Fill the two structural content gaps: **a free entry point for Career Development** (currently
  paid-only) and **paid practicals for Clinical** (currently 21 free chapters and nothing to buy)
- Decide honestly about the **AI domain**: it is advertised on the homepage, the resources page,
  the practicals page and the mentorship page, and it is completely empty. Either build it or
  stop advertising it.
- Institutional and team licensing

### Sequencing logic

Phase 1 makes money on the current site and costs almost nothing. Phase 2 fixes the first
impression. Phase 3 proves the learning model is worth the investment **before** Phase 4 commits
to building a platform around it. Phase 5 is only justified once Phase 3 has produced evidence.

**Do not redesign every course before validating the direction.** The homepage and one complete
lesson are the proof of concept for the entire platform.
