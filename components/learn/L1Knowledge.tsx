'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Meter,
  SegmentedControl,
  Slider,
  SwitchToggle,
  WidgetCard,
} from '@/components/shared/Controls';
import { CategoryChip } from '@/components/shared/CategoryChip';
import { CATEGORIES, type CategoryId } from '@/data/categories';
import { usePrefersReducedMotion } from '@/components/shared/useLocalStorage';

/* ==========================================================================
   W1 — STIMULUS DIAL
   One generic sample dashboard card, re-rendered live from a single dial.
   ========================================================================== */

const SAMPLE_MODULES = [
  'Overview',
  'Recent activity',
  'Saved items',
  'Team updates',
  'Usage summary',
  'Shortcuts',
  'Suggested next',
  'Announcements',
  'Quick links',
  'Trending',
  'Reminders',
  'Highlights',
];

const ACCENTS = ['#5624D0', '#B45309', '#1E8E5A', '#231A45', '#C026A3'];

const SAMPLE_SLIDES = [
  'Sample promotion — slide 1 of 3',
  'Sample promotion — slide 2 of 3',
  'Sample promotion — slide 3 of 3',
];

function StimulusDial() {
  const [level, setLevel] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const [slide, setSlide] = useState(0);

  const moduleCount = Math.max(1, Math.round(1 + level * 1.1));
  const accentCount = level === 0 ? 1 : Math.max(1, Math.round(level / 2));
  const badgeCount = level >= 8 ? 3 : level >= 6 ? 2 : level >= 4 ? 1 : 0;
  const hasBlink = level >= 7;
  const hasBanner = level >= 5;
  const competing =
    moduleCount + badgeCount + (hasBlink ? 1 : 0) + (hasBanner ? 1 : 0);

  useEffect(() => {
    if (!hasBanner || reducedMotion) return;
    const timer = setInterval(
      () => setSlide((current) => (current + 1) % SAMPLE_SLIDES.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [hasBanner, reducedMotion]);

  const gap = level < 3 ? 'gap-3' : level < 7 ? 'gap-2' : 'gap-1';
  const pad = level < 3 ? 'p-4' : level < 7 ? 'p-3' : 'p-2';

  return (
    <div className="space-y-4">
      <Slider
        label="Stimulus level"
        value={level}
        min={0}
        max={10}
        onChange={setLevel}
      />
      <p className="text-[15px] font-semibold text-navy" aria-live="polite">
        Elements competing for attention: {competing}
      </p>

      <div className="rounded-lg border border-line bg-white p-3">
        <p className="mb-2 text-[13px] uppercase tracking-wide text-ink70">
          Sample Card
        </p>

        {hasBanner && (
          <div
            className="mb-2 rounded px-3 py-2 text-[14px] text-white"
            style={{ backgroundColor: ACCENTS[1] }}
          >
            {SAMPLE_SLIDES[reducedMotion ? 0 : slide]}
          </div>
        )}

        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h4
            className="font-bold text-navy"
            style={{ fontSize: level < 5 ? 18 : 16 }}
          >
            Sample dashboard
          </h4>
          {hasBlink && (
            <span className="case-blink rounded bg-[#C026A3] px-2 py-0.5 text-[12px] font-bold text-white">
              NEW
            </span>
          )}
          {Array.from({ length: badgeCount }).map((_, index) => (
            <span
              key={index}
              className="rounded-full px-2 py-0.5 text-[12px] font-bold text-white"
              style={{ backgroundColor: ACCENTS[(index + 2) % ACCENTS.length] }}
            >
              {[7, 12, 3][index]}
            </span>
          ))}
        </div>

        <div className={`grid ${gap} sm:grid-cols-2 lg:grid-cols-3`}>
          {SAMPLE_MODULES.slice(0, moduleCount).map((title, index) => {
            const accent = ACCENTS[index % accentCount];
            return (
              <div
                key={title}
                className={`rounded border ${pad}`}
                style={{ borderColor: accent }}
              >
                <p
                  className="font-semibold"
                  style={{ color: accent, fontSize: level < 5 ? 15 : 13 }}
                >
                  {title}
                </p>
                <p
                  className="text-ink70"
                  style={{ fontSize: level < 5 ? 15 : 12 }}
                >
                  Sample content block.
                </p>
                {index === 0 && (
                  <button
                    type="button"
                    className="mt-2 rounded px-2 py-1 text-[13px] font-semibold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    Sample action
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-2 text-[13px] text-ink70">
          Accent colours in use: {accentCount}
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   W2 — PREDICTABILITY TOGGLE
   ========================================================================== */

function MiniPage({
  title,
  navPosition,
  fileLabel,
  actionOnLeft,
}: {
  title: string;
  navPosition: 'left' | 'top' | 'hamburger';
  fileLabel: string;
  actionOnLeft: boolean;
}) {
  const navItems = ['Home', fileLabel, 'Settings'];

  return (
    <div className="rounded border border-line bg-white p-2 text-[13px]">
      <p className="mb-2 font-semibold text-navy">{title}</p>

      {navPosition === 'top' && (
        <ul className="mb-2 flex gap-2 border-b border-line pb-1">
          {navItems.map((item) => (
            <li key={item} className="text-purple">
              {item}
            </li>
          ))}
        </ul>
      )}

      {navPosition === 'hamburger' && (
        <div className="mb-2 flex justify-end">
          <span className="rounded border border-line px-2 py-0.5 text-purple">
            ☰ Menu
          </span>
        </div>
      )}

      <div className="flex gap-2">
        {navPosition === 'left' && (
          <ul className="w-20 shrink-0 space-y-1 border-r border-line pr-2">
            {navItems.map((item) => (
              <li key={item} className="text-purple">
                {item}
              </li>
            ))}
          </ul>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-ink70">Sample page content.</p>
          <div
            className={`mt-3 flex ${actionOnLeft ? 'justify-start' : 'justify-end'}`}
          >
            <span className="rounded bg-purple px-2 py-1 font-semibold text-white">
              Continue
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PredictabilityToggle() {
  const [mode, setMode] = useState<'consistent' | 'shifting'>('consistent');
  const consistent = mode === 'consistent';

  return (
    <div className="space-y-4">
      <SegmentedControl
        label="Pattern behaviour"
        value={mode}
        onChange={setMode}
        options={[
          { value: 'consistent', label: 'Consistent' },
          { value: 'shifting', label: 'Shifting' },
        ]}
      />
      <p className="text-[15px] font-semibold text-navy" aria-live="polite">
        Relearning events required: {consistent ? 0 : 4}
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <MiniPage
          title="Sample Page 1"
          navPosition="left"
          fileLabel="My Files"
          actionOnLeft={false}
        />
        <MiniPage
          title="Sample Page 2"
          navPosition={consistent ? 'left' : 'top'}
          fileLabel={consistent ? 'My Files' : 'Materials'}
          actionOnLeft={!consistent}
        />
        <MiniPage
          title="Sample Page 3"
          navPosition={consistent ? 'left' : 'hamburger'}
          fileLabel={consistent ? 'My Files' : 'Downloads'}
          actionOnLeft={false}
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   W3 — READABILITY LAB
   ========================================================================== */

const PLAIN_TEXT =
  'You can book a room online. Pick a date, then pick a time. The system shows only rooms that are free. When you confirm, you get an email with the room number and the floor. If you need to change the booking, open the email and select "Change booking". You can change it up to one hour before the start. If you no longer need the room, cancel it so someone else can use it. Cancelling is free and takes one click. Your team can see the booking in the shared calendar.';

const COMPLEX_TEXT =
  'The utilisation of the room reservation functionality is effectuated via the online interface, subject to the prior specification of a date parameter and a corresponding time parameter, whereupon an availability-restricted presentation of the room inventory is undertaken. Upon confirmation, a notification containing the room designation and the floor allocation is transmitted. Modification of an existing reservation is permissible up to one hour prior to commencement, by means of the modification option contained in the aforementioned notification. In the event of non-requirement, cancellation is recommended in the interest of resource availability for other parties.';

function ReadabilityLab() {
  const [fontSize, setFontSize] = useState(13);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [measure, setMeasure] = useState(105);
  const [justified, setJustified] = useState(true);
  const [extraSpacing, setExtraSpacing] = useState(false);
  const [plain, setPlain] = useState(false);

  // Indicative only: each control contributes to a simple additive score.
  const effort = useMemo(() => {
    let score = 0;
    score += fontSize < 15 ? 22 : fontSize < 17 ? 10 : 0;
    score += lineHeight < 1.3 ? 20 : lineHeight < 1.5 ? 9 : 0;
    score += measure > 90 ? 20 : measure > 75 ? 9 : 0;
    score += justified ? 14 : 0;
    score += extraSpacing ? 0 : 8;
    score += plain ? 0 : 24;
    return Math.min(100, score);
  }, [fontSize, lineHeight, measure, justified, extraSpacing, plain]);

  const effortLabel = effort > 60 ? 'High' : effort > 30 ? 'Moderate' : 'Low';

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Slider
          label="Font size"
          value={fontSize}
          min={12}
          max={20}
          unit="px"
          onChange={setFontSize}
        />
        <Slider
          label="Line height"
          value={lineHeight}
          min={1}
          max={2}
          step={0.1}
          onChange={setLineHeight}
        />
        <Slider
          label="Line length"
          value={measure}
          min={45}
          max={110}
          unit=" ch"
          onChange={setMeasure}
        />
        <div className="space-y-2">
          <SwitchToggle
            label="Text alignment"
            checked={justified}
            onChange={setJustified}
            offLabel="Left-aligned"
            onLabel="Justified"
          />
          <SwitchToggle
            label="Extra letter and word spacing"
            checked={extraSpacing}
            onChange={setExtraSpacing}
          />
          <SwitchToggle
            label="Language version"
            checked={plain}
            onChange={setPlain}
            offLabel="Nominalised"
            onLabel="Plain"
          />
        </div>
      </div>

      <Meter
        label="Reading effort"
        value={effort}
        caption={`${effortLabel} — indicative only, not a scientific score`}
        tone={effort > 60 ? 'cost' : 'neutral'}
      />

      <div className="rounded border border-line bg-white p-3">
        <p className="mb-2 text-[13px] uppercase tracking-wide text-ink70">
          Sample paragraph
        </p>
        <p
          style={{
            fontSize: `${fontSize}px`,
            lineHeight,
            maxWidth: `${measure}ch`,
            textAlign: justified ? 'justify' : 'left',
            letterSpacing: extraSpacing ? '0.06em' : 'normal',
            wordSpacing: extraSpacing ? '0.14em' : 'normal',
          }}
        >
          {plain ? PLAIN_TEXT : COMPLEX_TEXT}
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   W4 — PROFILE LENS
   Strain lists come straight from the curriculum; nothing is added.
   ========================================================================== */

type LensId = 'ADHD' | 'Autism' | 'Dyslexia' | 'All';

interface LensHighlight {
  /** Which region of the generic sample page the strain attaches to. */
  region:
    | 'banner'
    | 'nav'
    | 'tiles'
    | 'text'
    | 'chain'
    | 'label';
  text: string;
}

const LENS: Record<Exclude<LensId, 'All'>, LensHighlight[]> = {
  ADHD: [
    { region: 'tiles', text: 'Competing stimuli' },
    { region: 'banner', text: 'Competing stimuli' },
    { region: 'label', text: 'Unclear priority' },
    { region: 'chain', text: 'Long task chains' },
  ],
  Autism: [
    { region: 'banner', text: 'Sensory overload' },
    { region: 'nav', text: 'Unclear navigation logic' },
    { region: 'tiles', text: 'Inconsistent patterns' },
    { region: 'label', text: 'Ambiguous wording' },
  ],
  Dyslexia: [
    { region: 'text', text: 'Dense text blocks' },
    { region: 'text', text: 'Unsuitable typography' },
    { region: 'chain', text: 'Unclear text structure' },
    { region: 'label', text: 'Complex language' },
  ],
};

function regionStrains(lens: LensId, region: LensHighlight['region']): string[] {
  const sources: Exclude<LensId, 'All'>[] =
    lens === 'All' ? ['ADHD', 'Autism', 'Dyslexia'] : [lens];
  const labels: string[] = [];
  for (const source of sources) {
    for (const highlight of LENS[source]) {
      if (highlight.region !== region) continue;
      const label = lens === 'All' ? `${source}: ${highlight.text}` : highlight.text;
      if (!labels.includes(label)) labels.push(label);
    }
  }
  return labels;
}

function LensRegion({
  lens,
  region,
  children,
}: {
  lens: LensId;
  region: LensHighlight['region'];
  children: React.ReactNode;
}) {
  const strains = regionStrains(lens, region);
  const active = strains.length > 0;

  return (
    <div
      className={[
        'rounded p-2 transition-colors',
        active ? 'bg-lilac ring-2 ring-purple/50' : '',
      ].join(' ')}
    >
      {children}
      {active && (
        <ul className="mt-1 flex flex-wrap gap-1">
          {strains.map((strain) => (
            <li
              key={strain}
              className="rounded bg-white px-2 py-0.5 text-[13px] font-semibold text-purple ring-1 ring-purple/30"
            >
              {strain}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProfileLens() {
  const [lens, setLens] = useState<LensId>('ADHD');

  return (
    <div className="space-y-4">
      <SegmentedControl
        label="Profile lens"
        value={lens}
        onChange={setLens}
        options={[
          { value: 'ADHD', label: 'ADHD' },
          { value: 'Autism', label: 'Autism' },
          { value: 'Dyslexia', label: 'Dyslexia' },
          { value: 'All', label: 'All' },
        ]}
      />

      <div className="rounded border border-line bg-white p-3">
        <p className="mb-2 text-[13px] uppercase tracking-wide text-ink70">
          Sample Page
        </p>

        <LensRegion lens={lens} region="banner">
          <div className="rounded bg-[#B45309] px-3 py-2 text-[14px] text-white">
            Sample banner with a moving offer
          </div>
        </LensRegion>

        <LensRegion lens={lens} region="nav">
          <ul className="flex flex-wrap gap-3 border-b border-line pb-1 text-[15px] text-purple">
            <li>Start</li>
            <li>Area</li>
            <li>Items</li>
            <li>More</li>
          </ul>
        </LensRegion>

        <LensRegion lens={lens} region="tiles">
          <div className="grid gap-2 sm:grid-cols-3">
            {['Sample tile A', 'Sample tile B', 'Sample tile C'].map((tile) => (
              <div key={tile} className="rounded border border-line p-2 text-[14px]">
                {tile}
              </div>
            ))}
          </div>
        </LensRegion>

        <LensRegion lens={lens} region="text">
          <p className="text-[13px] leading-[1.2]" style={{ textAlign: 'justify' }}>
            Sample body copy set as one dense block without headings or list
            structure, so the eye has to hold its own place across every line of a
            long measure while the sentences continue to accumulate qualifications
            and subordinate clauses that postpone the point being made.
          </p>
        </LensRegion>

        <LensRegion lens={lens} region="label">
          <p className="text-[15px] font-semibold text-navy">
            Proceed with the applicable items
          </p>
        </LensRegion>

        <LensRegion lens={lens} region="chain">
          <ol className="list-decimal pl-5 text-[14px] text-ink70">
            <li>Sample step</li>
            <li>Sample step</li>
            <li>Sample step</li>
            <li>Sample step</li>
            <li>Sample step</li>
            <li>Sample step</li>
          </ol>
        </LensRegion>
      </div>

      {lens === 'All' && (
        <p className="text-[15px] font-semibold text-navy">
          Most fixes serve more than one profile — that is the point.
        </p>
      )}
    </div>
  );
}

/* ==========================================================================
   W5 — CATEGORY SORTER
   Pick a chip, then place it on a card. Works with pointer and keyboard.
   ========================================================================== */

const SORTER_CARDS: { id: CategoryId; text: string }[] = CATEGORIES.map(
  (category) => ({ id: category.id, text: category.definition }),
);

// Fixed presentation order, so the drill is the same for every learner.
const SORTER_ORDER: CategoryId[] = [
  'error-tolerance',
  'readability',
  'adaptability',
  'stimulus-load',
  'comprehensibility',
  'orientation',
  'task-clarity',
  'predictability',
];

function CategorySorter() {
  const [held, setHeld] = useState<CategoryId | null>(null);
  const [placed, setPlaced] = useState<Partial<Record<CategoryId, CategoryId>>>({});

  const cards = SORTER_ORDER.map(
    (id) => SORTER_CARDS.find((card) => card.id === id)!,
  );

  const place = (cardId: CategoryId, chipId: CategoryId) => {
    setPlaced((current) => ({ ...current, [cardId]: chipId }));
    setHeld(null);
  };

  const solved = cards.filter((card) => placed[card.id] === card.id).length;

  return (
    <div className="space-y-4">
      <div>
        <p className="aion-label">Category chips</p>
        <p className="aion-hint">
          Select a chip, then select a definition card. Or drag it across.
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                draggable
                onDragStart={() => setHeld(category.id)}
                aria-pressed={held === category.id}
                onClick={() =>
                  setHeld((current) =>
                    current === category.id ? null : category.id,
                  )
                }
                className={[
                  'cursor-grab rounded-full border px-3 py-1 text-[15px] transition-colors',
                  held === category.id
                    ? 'ring-2 ring-purple ring-offset-2'
                    : 'hover:bg-lilac',
                ].join(' ')}
                style={{
                  backgroundColor: category.chip.bg,
                  color: category.chip.fg,
                  borderColor: category.chip.border,
                }}
              >
                {category.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-[15px] text-ink70" aria-live="polite">
        Matched: {solved} of {cards.length}. Nothing is scored — retry as often as
        you like.
      </p>

      <ul className="grid gap-3 md:grid-cols-2">
        {cards.map((card) => {
          const assigned = placed[card.id];
          const isRight = assigned === card.id;
          return (
            <li key={card.id}>
              <button
                type="button"
                onClick={() => held && place(card.id, held)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  if (held) place(card.id, held);
                }}
                className={[
                  'flex h-full w-full flex-col items-start gap-2 rounded-lg border p-3 text-left transition-colors',
                  assigned === undefined
                    ? 'border-line bg-white hover:bg-lilac'
                    : isRight
                      ? 'border-success bg-[#F1FAF5]'
                      : 'border-warn bg-[#FDF6EE]',
                ].join(' ')}
              >
                <span className="text-[15px] text-navy">{card.text}</span>
                {assigned !== undefined && (
                  <span className="flex flex-wrap items-center gap-2">
                    <CategoryChip id={assigned} size="sm" />
                    <span
                      className={[
                        'text-[15px] font-semibold',
                        isRight ? 'text-success' : 'text-warn',
                      ].join(' ')}
                    >
                      {isRight ? 'Match' : 'Not this one — try another chip'}
                    </span>
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        className="aion-btn-quiet"
        onClick={() => {
          setPlaced({});
          setHeld(null);
        }}
      >
        Clear the board
      </button>
    </div>
  );
}

/* ========================================================================== */

export function L1Knowledge() {
  return (
    <div className="space-y-4">
      <WidgetCard
        code="W1"
        title="Stimulus Dial"
        categoryTag={<CategoryChip id="stimulus-load" size="sm" />}
        captions={[
          'Every extra element takes a slice of the same attention budget.',
          'ADHD focus breaks first where nothing is ranked above anything else.',
          'This density is a design choice, not something the content demanded.',
        ]}
      >
        <StimulusDial />
      </WidgetCard>

      <WidgetCard
        code="W2"
        title="Predictability Toggle"
        categoryTag={
          <span className="flex gap-2">
            <CategoryChip id="predictability" size="sm" />
            <CategoryChip id="orientation" size="sm" />
          </span>
        }
        captions={[
          'A pattern that moves has to be learned again at every stop.',
          'Autistic users pay the highest price for inconsistent patterns.',
          'Three names for one function make three mental models.',
        ]}
      >
        <PredictabilityToggle />
      </WidgetCard>

      <WidgetCard
        code="W3"
        title="Readability Lab"
        categoryTag={<CategoryChip id="readability" size="sm" />}
        captions={[
          'Size, leading and measure decide whether the eye keeps its place.',
          'Justified text opens rivers that dyslexic readers get lost in.',
          'Complexity is not precision — plain wording says the same thing.',
        ]}
      >
        <ReadabilityLab />
      </WidgetCard>

      <WidgetCard
        code="W4"
        title="Profile Lens"
        captions={[
          'One surface, three different kinds of strain.',
          'Profiles overlap far more often than they diverge.',
          'Name the strain before you name the fix.',
        ]}
      >
        <ProfileLens />
      </WidgetCard>

      <WidgetCard
        code="W5"
        title="Category Sorter"
        captions={[
          'These eight labels are the vocabulary the worksheets grade on.',
          'Feedback is instant; nothing here is recorded.',
        ]}
      >
        <CategorySorter />
      </WidgetCard>
    </div>
  );
}
