# AION UX Class · Module 6 · Inclusive Design Patterns

A single-page learning playground for the Neurodiversity in UX module (ADHD, Autism,
Dyslexia). It is the one environment where learners **learn** the concepts, **practise**
spotting barriers, and **analyse** the four frozen assessment cases the graded
worksheets point at.

Next.js (App Router) + TypeScript + Tailwind CSS. No backend, no database, no auth, no
external API calls. All state lives in `localStorage`.

---

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build a static export

```bash
npm run build        # output: ./out
```

`next.config.mjs` sets `output: 'export'`, so `npm run build` writes a fully static site
to `out/`. There is no separate export step.

Preview the export locally:

```bash
npx serve out
```

## Deploy

**Netlify** — build command `npm run build`, publish directory `out`. No plugin and no
environment variables are needed; the site is plain static files.

**Vercel** — import the repository and accept the detected Next.js preset. The
`output: 'export'` setting is honoured automatically; no configuration is required.

Both hosts serve the site from the repository root. Because tab state is carried in the
URL hash (`#learn`, `#training`, `#studypath`, `#jobaccess`, `#lifeguide`, `#enterprise`,
`#taskmap`), an instructor can deep-link any tab and no server-side routing is involved.

---

## Structure

```
app/                       page shell, global styles, favicon
components/shared/         chrome, category chips, controls, case frame, storage hooks
components/learn/          Learn tab and widgets W1–W13
components/training/       Training Ground, practice surfaces, progress hook
components/cases/          the four assessment case tabs
components/taskmap/        Task Map reference card
data/categories.ts         the eight graded categories and their fixed chip colours
data/studypath.ts          StudyPath case content
data/jobaccess.ts          JobAccess variant content
data/lifeguide.ts          LifeGuide case content
data/enterprise.ts         Enterprise Context briefing content
data/training.ts           the twelve practice items
```

All case content is typed and hard-coded in `data/`, so every planted flaw is auditable
and reproducible. Nothing is random, time-derived, personalised or A/B switched: every
learner on every device on every day sees byte-identical case content.

---

## Tabs

| Tab | Marker | What it is |
| --- | --- | --- |
| Learn | Practice | Three accordion levels (L1 Knowledge, L2 Application, L3 Management decision) with thirteen interactive widgets. |
| Training Ground | Practice | Twelve gamified practice items across three practice products, reveals on. |
| StudyPath | Assessment case | Fictional learning platform. Three screens. Supports Worksheet 1. |
| JobAccess | Assessment case | Fictional career platform, one screen rendered as three variants. Supports Worksheet 2. |
| LifeGuide | Assessment case | Fictional service portal. Three screens. Supports Task 3. |
| Enterprise Context | Assessment case | Decision briefing across three surfaces. Supports Task 4. |
| Task Map | — | One reference table linking each task to its tab and its Learn section. |

---

## The graded category set

The eight categories are the assessment taxonomy. They are used verbatim everywhere,
each with one fixed chip colour, and the German original from the source curriculum is
shown in brackets on first appearance in each tab that uses them.

1. Stimulus Load [Reizbelastung]
2. Orientation [Orientierung]
3. Readability [Lesbarkeit]
4. Predictability [Vorhersagbarkeit]
5. Task Clarity [Aufgabenklarheit / Aufgabenstruktur]
6. Comprehensibility [Verständlichkeit]
7. Error Tolerance [Fehlertoleranz]
8. Adaptability [Anpassbarkeit]

WCAG / POUR appears exactly once, as a one-line footnote at the bottom of the Learn tab.
It is never a filter, a chip, or an answer option.

---

## Anti-leak design

- Learn widgets teach generically. They use neutral sample content ("Sample Card",
  "Sample Page", "Sample Form") and never name or reproduce a case surface.
- Training Ground uses practice products only — **MediBook**, **CityPass**, **BookNest** —
  and never reproduces a planted case flaw, so practising cannot give away a case.
- The four case tabs have reveals off: no hints, no category chips, no highlights, no
  issue markers, no counts, no tooltips that explain anything.
- `data-flaw-id` attributes are present in the DOM for instructor verification. They are
  never rendered, never styled, never read by UI code, and never announced to assistive
  technology.

---

## Flaw inventory — INSTRUCTORS ONLY

> **Do not share this inventory with learners before assessment.** The four case tabs are
> what the graded worksheets point at, and their whole value rests on learners
> discovering the barriers themselves. Handing over the IDs, the categories, or even the
> counts turns an assessment into a copying exercise and removes the only evidence you
> have that a learner can recognise a barrier unaided. Distribute it after grading, as a
> debrief artefact, or keep it to yourself entirely.

### StudyPath (Worksheet 1) — 12 planted flaws

| ID | Screen | Flaw | Category |
| --- | --- | --- | --- |
| SP-01 | Home | 14 modules above the fold with 3 banners, 5 accent colours, 3 numeric badge counters and 2 promotional tiles | Stimulus Load |
| SP-02 | Home | No visual priority; every card is the same size and weight, and an identical "Continue" button appears 6 times | Task Clarity |
| SP-03 | Home | Blinking "NEW" tag plus a banner auto-rotating through 3 fixed slides every 5s, no pause control | Stimulus Load |
| SP-04 | Course Area | Courses A / B / C each use a different navigation pattern (left sidebar / top tab row / hamburger) | Predictability |
| SP-05 | Course Area | The same function named three ways: "My Files" / "Materials" / "Downloads" | Orientation |
| SP-06 | Course Area | 220-word single paragraph, justified, line height 1.15, 13px, no headings, no lists, no breaks | Readability |
| SP-07 | Course Area | Body text in low-contrast grey `#8A8A8A` on white, with one long italic passage | Readability |
| SP-08 | Course Area | Ambiguous instruction: "Complete your pending items where applicable prior to the applicable deadline." | Comprehensibility |
| SP-09 | Enrolment Form | 11 required fields at once; no grouping, no headings, no progress indicator, no inline help, no examples for the two format-sensitive fields | Task Clarity |
| SP-10 | Enrolment Form | On submit, one line of red text at the top; no field highlighted, none named, focus does not move | Error Tolerance |
| SP-11 | Home | Status badge reading only "Status: 3", with no label, legend or tooltip | Comprehensibility |
| SP-12 | *(nowhere)* | **Flaw by absence:** no option to reduce stimulus, enlarge text or simplify the view. Nothing is rendered for this ID. | Adaptability |

### JobAccess (Worksheet 2) — no planted flaws

JobAccess is a variant comparator, not a flaw hunt. The same 6 content blocks, the same
form and the same navigation are rendered three ways:

| Variant | Treatment |
| --- | --- |
| A — "modern and compact" | Dense, small type, tight spacing, strong brand colour, and a navigation pattern that changes between dashboard and detail view. |
| B — "clear and calm" | Generous spacing, larger type, one primary action per block, one navigation pattern everywhere, plain language, weaker brand presence. |
| C — "structured plus options" | Variant B's structure plus three working, combinable optional modes: Reading mode, Reduced stimulus, Simplified view. |

The comparator does not rank, score, recommend or star anything, and the variant order is
fixed A, B, C. Variant C carries one neutral factual note: "Optional modes require
additional build and test effort." Worksheet 2 does the evaluating.

### LifeGuide (Task 3) — 11 planted flaws

| ID | Screen | Flaw | Category |
| --- | --- | --- | --- |
| LG-01 | Home | Four competing information zones of equal visual weight (emergency info, news, service catalogue, campaign) with no clear entry point | Stimulus Load |
| LG-02 | Home | 9 accent-coloured calls to action visible at once | Stimulus Load |
| LG-03 | Find Support | Filter controls sit on the left on first load and move to the top once a filter is applied | Predictability |
| LG-04 | Find Support | Breadcrumb disappears on the results view; the back path is unclear | Orientation |
| LG-05 | Find Support | Result descriptions are factually accurate but written in long nominalised sentences (avg. 34 words), set at 13px with 1.2 line height | Readability + Comprehensibility |
| LG-06 | Support Request | 16-field single-page form: no grouping, no steps, no save, no indication of length | Task Clarity |
| LG-07 | Support Request | Two fields demand a strict format and state the rule nowhere until after a failure | Task Clarity |
| LG-08 | Support Request | On failed submit the page scrolls to top and shows "Your request could not be processed."; entered data in three fields is silently cleared | Error Tolerance |
| LG-09 | Support Request | 12-minute inactivity timeout notice as a small grey line, easy to miss, with no extend option | Error Tolerance |
| LG-10 | All three screens | No reading mode, no stimulus reduction, no text sizing, no simplified view | Adaptability |
| LG-11 | Home | Ambiguous primary label: "Get started with your matters" | Comprehensibility |

### Enterprise Context (Task 4) — no planted flaws

A light decision briefing surface: three fixed surface cards (Website, Customer Portal,
Mobile App), one constraints panel, and one Sequencing sandbox. The sandbox does not
evaluate, score or recommend an order.

### Training Ground — 12 practice items (reveals on)

These are separate from the assessment cases and are safe to discuss with learners.

| ID | Product | Element | Category |
| --- | --- | --- | --- |
| mb-1 | MediBook | Specialty chooser | Stimulus Load |
| mb-2 | MediBook | Booking flow with an unstated step count | Task Clarity |
| mb-3 | MediBook | Error signalled by a red border alone | Error Tolerance |
| mb-4 | MediBook | "Manage" action that cancels | Comprehensibility |
| cp-1 | CityPass | Primary action moves and is renamed between steps | Predictability |
| cp-2 | CityPass | Three views sharing one title | Orientation |
| cp-3 | CityPass | Settings area with no display controls | Adaptability |
| cp-4 | CityPass | Fare conditions in tracked capitals at 12px | Readability |
| bn-1 | BookNest | Centre-aligned description across a long measure | Readability |
| bn-2 | BookNest | Live ticker beside six moving shelves | Stimulus Load |
| bn-3 | BookNest | Failure message that hides the resulting state | Error Tolerance |
| bn-4 | BookNest | Save is a button on one shelf, a hidden menu on the next | Predictability |

All eight categories are covered.

---

## Accessibility and motion

The playground chrome is built to be exemplary: 16px body at line-height 1.6, nothing
below 15px, visible focus rings, logical tab order, real headings, `role="switch"` and
`aria-pressed` on stateful controls, and drag-and-drop that also works as
select-then-place for keyboard users.

The only deliberately flawed surfaces are the assessment case viewports, each bounded by
a thin border and captioned "Fictional training case — explore freely." Motion inside
them (the blinking tag, the rotating banner) is deterministic in what it shows and stops
entirely when `prefers-reduced-motion: reduce` is set.

## Stored state

Every key is namespaced `aion-m6:`. Stored: the active tab, Training Ground XP / streak /
badges / completed items, each case's notes, the Enterprise sequencing sandbox, and the
one-time "Try me" dismissals. Training Ground has a visible "Reset practice progress"
button, each case tab has "Reset this case", and each notes panel has "Clear".
