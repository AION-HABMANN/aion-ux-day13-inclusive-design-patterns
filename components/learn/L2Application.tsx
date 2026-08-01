'use client';

import { useMemo, useState } from 'react';
import {
  CopyButton,
  SegmentedControl,
  SwitchToggle,
  WidgetCard,
} from '@/components/shared/Controls';
import { CategoryChip } from '@/components/shared/CategoryChip';
import type { CategoryId } from '@/data/categories';

/* ==========================================================================
   W6 — PATTERN FIX SIMULATOR
   Four generic before/after pairs. Each pair names the categories it moves.
   ========================================================================== */

function DenseLanding({ fixed }: { fixed: boolean }) {
  if (fixed) {
    return (
      <div className="rounded border border-line bg-white p-4">
        <h5 className="text-[17px] font-bold text-navy">Continue Sample Task 2</h5>
        <p className="mt-1 text-[15px] text-ink70">
          Three steps left. About 4 minutes.
        </p>
        <button type="button" className="aion-btn mt-3">
          Continue
        </button>
        <p className="mt-4 border-t border-line pt-2 text-[15px] text-ink70">
          Everything else lives under <span className="text-purple">All areas</span>.
        </p>
      </div>
    );
  }
  return (
    <div className="grid gap-1 rounded border border-line bg-white p-2 sm:grid-cols-3">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="rounded border border-line p-2">
          <p className="text-[13px] font-semibold text-navy">Sample area {index + 1}</p>
          <button
            type="button"
            className="mt-1 rounded bg-purple px-2 py-0.5 text-[12px] text-white"
          >
            Continue
          </button>
        </div>
      ))}
    </div>
  );
}

const FORM_FIELDS = [
  'Given name',
  'Family name',
  'Email',
  'Phone',
  'Street',
  'House number',
  'Postcode',
  'City',
  'Start date',
  'Reference number',
];

function LongForm({ fixed }: { fixed: boolean }) {
  if (fixed) {
    return (
      <div className="rounded border border-line bg-white p-4">
        <p className="text-[15px] font-semibold text-purple">Step 1 of 3 · About you</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {FORM_FIELDS.slice(0, 4).map((field) => (
            <label key={field} className="block">
              <span className="aion-label">{field}</span>
              <input
                className="mt-1 w-full rounded border border-line px-2 py-1.5 text-[15px]"
                placeholder={field === 'Phone' ? 'Example: 030 1234567' : undefined}
              />
              {field === 'Phone' && (
                <span className="aion-hint">Numbers only, with area code.</span>
              )}
            </label>
          ))}
        </div>
        <button type="button" className="aion-btn mt-3">
          Go to step 2
        </button>
      </div>
    );
  }
  return (
    <div className="rounded border border-line bg-white p-3">
      <div className="grid gap-1.5">
        {FORM_FIELDS.map((field) => (
          <label key={field} className="flex items-center gap-2 text-[13px]">
            <span className="w-28 shrink-0 text-navy">{field} *</span>
            <input className="w-full rounded border border-line px-2 py-1 text-[13px]" />
          </label>
        ))}
      </div>
      <button
        type="button"
        className="mt-2 rounded bg-purple px-3 py-1 text-[13px] text-white"
      >
        Submit
      </button>
    </div>
  );
}

function ErrorPattern({ fixed }: { fixed: boolean }) {
  if (fixed) {
    return (
      <div className="rounded border border-line bg-white p-4">
        <div className="rounded border-l-4 border-warn bg-[#FDF6EE] p-3">
          <p className="text-[15px] font-semibold text-warn">
            One field needs a change before you can continue.
          </p>
          <ul className="mt-1 list-disc pl-5 text-[15px] text-navy">
            <li>
              <a href="#w6-start-date" className="text-purple underline">
                Start date
              </a>{' '}
              — use the form DD.MM.YYYY, for example 04.09.2026.
            </li>
          </ul>
        </div>
        <label className="mt-3 block">
          <span className="aion-label">Start date</span>
          <input
            id="w6-start-date"
            defaultValue="4 Sept"
            className="mt-1 w-full rounded border-2 border-warn px-2 py-1.5 text-[15px]"
          />
          <span className="aion-hint">Format: DD.MM.YYYY</span>
        </label>
      </div>
    );
  }
  return (
    <div className="rounded border border-line bg-white p-4">
      <p className="text-[15px] text-[#C00000]">Error. Please check your entries.</p>
      <label className="mt-3 block">
        <span className="text-[13px] text-navy">Start date</span>
        <input
          defaultValue="4 Sept"
          className="mt-1 w-full rounded border border-line px-2 py-1.5 text-[15px]"
        />
      </label>
    </div>
  );
}

function AdaptableLayout({ fixed }: { fixed: boolean }) {
  const [calm, setCalm] = useState(false);
  const quiet = fixed && calm;

  return (
    <div className="rounded border border-line bg-white p-3">
      {fixed && (
        <div className="mb-3 border-b border-line pb-2">
          <SwitchToggle
            label="Reduced-stimulus mode"
            hint="Optional. Your choice is remembered for this page."
            checked={calm}
            onChange={setCalm}
          />
        </div>
      )}
      <div className="grid gap-2 sm:grid-cols-3">
        {['Sample block A', 'Sample block B', 'Sample block C'].map((block, index) => (
          <div
            key={block}
            className="rounded border p-2 text-[14px]"
            style={{
              borderColor: quiet ? '#DDD6EE' : ['#5624D0', '#B45309', '#1E8E5A'][index],
              color: quiet ? '#231A45' : ['#5624D0', '#B45309', '#1E8E5A'][index],
            }}
          >
            {block}
          </div>
        ))}
      </div>
      {!quiet && (
        <div className="mt-2 rounded bg-[#B45309] px-3 py-1.5 text-[13px] text-white">
          Sample promotional strip
        </div>
      )}
      {!fixed && (
        <p className="mt-2 text-[13px] text-ink70">
          One fixed presentation for everyone.
        </p>
      )}
    </div>
  );
}

interface FixPair {
  id: string;
  title: string;
  before: string;
  after: string;
  improves: CategoryId[];
  render: (fixed: boolean) => React.ReactNode;
}

const FIX_PAIRS: FixPair[] = [
  {
    id: 'landing',
    title: 'Dense landing → prioritised single-focus landing',
    before: 'Dense landing',
    after: 'Single-focus landing',
    improves: ['stimulus-load', 'task-clarity', 'orientation'],
    render: (fixed) => <DenseLanding fixed={fixed} />,
  },
  {
    id: 'form',
    title: 'Long single form → grouped, stepped form with inline help',
    before: 'Long single form',
    after: 'Grouped, stepped form',
    improves: ['task-clarity', 'comprehensibility'],
    render: (fixed) => <LongForm fixed={fixed} />,
  },
  {
    id: 'error',
    title: 'Vague error → specific, field-anchored, recovery-oriented error',
    before: 'Vague error',
    after: 'Field-anchored error',
    improves: ['error-tolerance', 'comprehensibility'],
    render: (fixed) => <ErrorPattern fixed={fixed} />,
  },
  {
    id: 'adaptable',
    title: 'Fixed rigid layout → same layout plus an optional reduced-stimulus mode',
    before: 'Fixed layout',
    after: 'Layout with optional mode',
    improves: ['adaptability', 'stimulus-load'],
    render: (fixed) => <AdaptableLayout fixed={fixed} />,
  },
];

function PatternFixSimulator() {
  const [fixed, setFixed] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-4">
      {FIX_PAIRS.map((pair) => {
        const isFixed = Boolean(fixed[pair.id]);
        return (
          <div key={pair.id} className="rounded-lg border border-line p-3">
            <p className="text-[15px] font-semibold text-navy">{pair.title}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <SegmentedControl
                label={pair.title}
                value={isFixed ? 'after' : 'before'}
                onChange={(value) =>
                  setFixed((current) => ({ ...current, [pair.id]: value === 'after' }))
                }
                options={[
                  { value: 'before', label: pair.before },
                  { value: 'after', label: pair.after },
                ]}
              />
              <span className="flex flex-wrap gap-1">
                {pair.improves.map((category) => (
                  <CategoryChip key={category} id={category} size="sm" />
                ))}
              </span>
            </div>
            <div className="mt-3">{pair.render(isFixed)}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ==========================================================================
   W7 — ASSISTIVE TECH STRIP
   ========================================================================== */

function AssistiveTechStrip() {
  const [outline, setOutline] = useState(false);
  const [tts, setTts] = useState(false);
  const [readerMode, setReaderMode] = useState(false);
  const [scaled, setScaled] = useState(false);

  const scale = scaled ? 2 : 1;
  const readingOrder = ['heading', 'intro', 'section', 'body', 'action'] as const;
  const [spoken, setSpoken] = useState(0);

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <SwitchToggle
          label="Screen-reader structure"
          hint="Show the heading outline that would be announced."
          checked={outline}
          onChange={setOutline}
        />
        <SwitchToggle
          label="Text-to-speech reading order"
          hint="Step through the order the page would be read in."
          checked={tts}
          onChange={(value) => {
            setTts(value);
            setSpoken(0);
          }}
        />
        <SwitchToggle
          label="Browser reader mode"
          hint="Strip decoration, keep the article."
          checked={readerMode}
          onChange={setReaderMode}
        />
        <SwitchToggle
          label="OS text scaling at 200%"
          checked={scaled}
          onChange={setScaled}
        />
      </div>

      {outline && (
        <div className="rounded border border-line bg-lilac p-3">
          <p className="text-[15px] font-semibold text-navy">
            Announced heading outline
          </p>
          <ul className="mt-1 text-[15px] text-navy">
            <li>H1 — Sample Page</li>
            <li className="pl-4">H2 — What this page does</li>
            <li className="pl-4">H2 — How to start</li>
            <li className="pl-8">H3 — What you need</li>
          </ul>
        </div>
      )}

      {tts && (
        <div className="flex flex-wrap items-center gap-3 rounded border border-line bg-lilac p-3">
          <button
            type="button"
            className="aion-btn-quiet"
            onClick={() => setSpoken((current) => (current + 1) % readingOrder.length)}
          >
            Next element
          </button>
          <span className="text-[15px] text-navy" aria-live="polite">
            Reading {spoken + 1} of {readingOrder.length}: {readingOrder[spoken]}
          </span>
        </div>
      )}

      <div
        className={[
          'rounded border border-line p-3',
          readerMode ? 'bg-[#FBFAFD]' : 'bg-white',
        ].join(' ')}
        style={{ fontSize: `${scale}em` }}
      >
        {!readerMode && (
          <div className="mb-2 rounded bg-[#B45309] px-2 py-1 text-[0.8em] text-white">
            Sample promotional strip
          </div>
        )}
        <div
          className={[
            'rounded p-1',
            tts && readingOrder[spoken] === 'heading' ? 'bg-lilac ring-2 ring-purple' : '',
          ].join(' ')}
        >
          <h5 className="font-bold text-navy">Sample Page</h5>
        </div>
        <div
          className={[
            'rounded p-1',
            tts && readingOrder[spoken] === 'intro' ? 'bg-lilac ring-2 ring-purple' : '',
          ].join(' ')}
        >
          <p className="text-ink70">A short sample introduction.</p>
        </div>
        <div
          className={[
            'rounded p-1',
            tts && readingOrder[spoken] === 'section' ? 'bg-lilac ring-2 ring-purple' : '',
          ].join(' ')}
        >
          <h6 className="font-semibold text-navy">What this page does</h6>
        </div>
        <div
          className={[
            'rounded p-1',
            tts && readingOrder[spoken] === 'body' ? 'bg-lilac ring-2 ring-purple' : '',
          ].join(' ')}
        >
          <p style={{ maxWidth: readerMode ? '62ch' : 'none' }}>
            Sample body copy that sits under a real heading, which is what lets any
            assistive tool find it.
          </p>
        </div>
        <div
          className={[
            'rounded p-1',
            tts && readingOrder[spoken] === 'action' ? 'bg-lilac ring-2 ring-purple' : '',
          ].join(' ')}
        >
          <button type="button" className="aion-btn text-[0.9em]">
            Sample action
          </button>
        </div>
        {!readerMode && (
          <div className="mt-2 grid grid-cols-3 gap-1 text-[0.75em] text-ink70">
            <span className="rounded border border-line p-1">Sample aside</span>
            <span className="rounded border border-line p-1">Sample aside</span>
            <span className="rounded border border-line p-1">Sample aside</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   W8 — PRIORITISATION GRID
   ========================================================================== */

type Quadrant = 'high-low' | 'high-high' | 'low-low' | 'low-high';

const QUADRANTS: { id: Quadrant; label: string; tag: string }[] = [
  { id: 'high-low', label: 'High impact · Low effort', tag: 'Do first' },
  { id: 'high-high', label: 'High impact · High effort', tag: 'Plan' },
  { id: 'low-low', label: 'Low impact · Low effort', tag: 'Later' },
  { id: 'low-high', label: 'Low impact · High effort', tag: 'Question it' },
];

const MEASURE_CARDS = [
  'Cut the landing page to one primary action',
  'Use one navigation pattern across all areas',
  'Rewrite the ten most-read pages in plain language',
  'Split the longest form into three steps',
  'Add an optional reduced-stimulus mode',
  'Rewrite every error message to name its field',
];

function PrioritisationGrid() {
  const [held, setHeld] = useState<string | null>(null);
  const [placement, setPlacement] = useState<Record<string, Quadrant>>({});

  const unplaced = MEASURE_CARDS.filter((card) => !placement[card]);

  const drop = (quadrant: Quadrant) => {
    if (!held) return;
    setPlacement((current) => ({ ...current, [held]: quadrant }));
    setHeld(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="aion-label">Measure cards</p>
        <p className="aion-hint">
          Select a card, then select a quadrant. Or drag it across.
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {unplaced.length === 0 && (
            <li className="text-[15px] text-ink70">All six placed.</li>
          )}
          {unplaced.map((card) => (
            <li key={card}>
              <button
                type="button"
                draggable
                onDragStart={() => setHeld(card)}
                aria-pressed={held === card}
                onClick={() => setHeld((current) => (current === card ? null : card))}
                className={[
                  'cursor-grab rounded-md border border-line bg-white px-3 py-1.5 text-left text-[15px] text-navy transition-colors',
                  held === card ? 'ring-2 ring-purple ring-offset-2' : 'hover:bg-lilac',
                ].join(' ')}
              >
                {card}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {QUADRANTS.map((quadrant) => {
          const cards = MEASURE_CARDS.filter((card) => placement[card] === quadrant.id);
          return (
            <div
              key={quadrant.id}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                drop(quadrant.id);
              }}
              className="rounded-lg border border-line bg-white p-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[15px] font-semibold text-navy">{quadrant.label}</p>
                <span className="rounded bg-lilac px-2 py-0.5 text-[13px] font-semibold text-purple">
                  {quadrant.tag}
                </span>
              </div>
              <button
                type="button"
                onClick={() => drop(quadrant.id)}
                disabled={!held}
                className="mt-2 w-full rounded border border-dashed border-line px-2 py-1 text-[15px] text-ink70 disabled:opacity-50"
              >
                {held ? `Place “${held}” here` : 'Select a card first'}
              </button>
              <ul className="mt-2 space-y-1">
                {cards.map((card) => (
                  <li
                    key={card}
                    className="flex items-start justify-between gap-2 rounded bg-lilac px-2 py-1 text-[15px] text-navy"
                  >
                    <span>{card}</span>
                    <button
                      type="button"
                      className="shrink-0 text-[13px] font-semibold text-purple underline"
                      onClick={() =>
                        setPlacement((current) => {
                          const next = { ...current };
                          delete next[card];
                          return next;
                        })
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="text-[15px] text-ink70">
        The grid asserts no arrangement. Where a card sits is your argument, and you
        should be able to say out loud why it sits there.
      </p>
    </div>
  );
}

/* ==========================================================================
   W9 — TEST PLAN BUILDER
   ========================================================================== */

const FOCUS_AREAS = [
  'Orientation',
  'Stimulus load',
  'Task completion',
  'Readability',
  'Perceived control',
];

const SCENARIOS = [
  'Calm situation',
  'Time pressure',
  'After an error',
];

function TestPlanBuilder() {
  const [focus, setFocus] = useState<string[]>([]);
  const [scenarios, setScenarios] = useState<string[]>([]);

  const toggle = (
    value: string,
    list: string[],
    setList: (next: string[]) => void,
  ) => {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  const plan = useMemo(() => {
    const focusLine = focus.length ? focus.join(', ') : '—';
    const scenarioLine = scenarios.length ? scenarios.join(', ') : '—';
    return [
      'TEST PLAN — neurodiverse UX prototype',
      `Test focus: ${focusLine}`,
      `Participant scenarios: ${scenarioLine}`,
      `Sessions: ${Math.max(1, focus.length) * Math.max(1, scenarios.length)} runs, one focus per run`,
      'Observe: where people stop, what they re-read, what they ask about.',
      'Record: hesitation points, wrong turns, abandoned steps, recovery attempts.',
    ].join('\n');
  }, [focus, scenarios]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <fieldset>
          <legend className="aion-label">Test focus areas</legend>
          <ul className="mt-2 space-y-1">
            {FOCUS_AREAS.map((area) => (
              <li key={area}>
                <label className="flex items-center gap-2 text-[15px] text-navy">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#5624D0]"
                    checked={focus.includes(area)}
                    onChange={() => toggle(area, focus, setFocus)}
                  />
                  {area}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        <fieldset>
          <legend className="aion-label">Participant scenarios</legend>
          <ul className="mt-2 space-y-1">
            {SCENARIOS.map((scenario) => (
              <li key={scenario}>
                <label className="flex items-center gap-2 text-[15px] text-navy">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#5624D0]"
                    checked={scenarios.includes(scenario)}
                    onChange={() => toggle(scenario, scenarios, setScenarios)}
                  />
                  {scenario}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      </div>

      <div className="aion-panel">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[15px] font-semibold text-navy">Generated test plan</p>
          <CopyButton text={plan} />
        </div>
        <pre className="mt-2 whitespace-pre-wrap font-sans text-[15px] text-navy">
          {plan}
        </pre>
      </div>
    </div>
  );
}

/* ========================================================================== */

export function L2Application() {
  return (
    <div className="space-y-4">
      <WidgetCard
        code="W6"
        title="Pattern Fix Simulator"
        captions={[
          'The same content, restructured — nothing was deleted.',
          'One repair usually moves several categories at once.',
        ]}
      >
        <PatternFixSimulator />
      </WidgetCard>

      <WidgetCard
        code="W7"
        title="Assistive Tech Strip"
        captions={[
          'Assistive tech reads structure, so structure is the deliverable.',
          'It cannot repair a broken foundation — it only exposes it.',
          'Text at 200% is a layout requirement, not an edge case.',
        ]}
      >
        <AssistiveTechStrip />
      </WidgetCard>

      <WidgetCard
        code="W8"
        title="Prioritisation Grid"
        captions={[
          'Impact and effort are estimates you must be able to defend.',
          'The tag follows the placement — the placement is yours.',
        ]}
      >
        <PrioritisationGrid />
      </WidgetCard>

      <WidgetCard
        code="W9"
        title="Test Plan Builder"
        captions={[
          'Prototypes make real hurdles visible instead of assumed.',
          'One focus per run, or you will not know what caused the stumble.',
        ]}
      >
        <TestPlanBuilder />
      </WidgetCard>
    </div>
  );
}
