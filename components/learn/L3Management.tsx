'use client';

import { useMemo, useState } from 'react';
import { CopyButton, Meter, Slider, WidgetCard } from '@/components/shared/Controls';

/* ==========================================================================
   W10 — TRADE-OFF SLIDER
   ========================================================================== */

function TradeOffSlider() {
  const [value, setValue] = useState(50);
  const t = value / 100;

  // Reach climbs with individualisation but with falling returns; the three
  // cost meters climb faster the further right the slider goes.
  const reach = Math.round(18 + 74 * Math.sqrt(t));
  const buildEffort = Math.round(12 + 84 * t * t);
  const maintenance = Math.round(10 + 86 * Math.pow(t, 1.8));
  const testCoverage = Math.round(14 + 82 * Math.pow(t, 1.6));

  const note =
    value <= 12
      ? 'At full standardisation one presentation has to carry every user. Whoever it does not fit has nowhere to go.'
      : value >= 88
        ? 'At full individualisation the options themselves become the problem: they have to be found, explained, maintained and retested in every combination.'
        : 'Somewhere in between you are trading reach against everything it costs to keep. This widget will not pick the point for you.';

  return (
    <div className="space-y-4">
      <Slider
        label="Standardisation ←→ Individualisation"
        value={value}
        min={0}
        max={100}
        onChange={setValue}
      />
      <p className="text-[15px] text-ink70">
        0 = one fixed presentation for everyone · 100 = everything configurable per
        person
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <Meter label="Inclusion reach" value={reach} tone="good" caption={`${reach}`} />
        <Meter label="Build effort" value={buildEffort} tone="cost" caption={`${buildEffort}`} />
        <Meter label="Maintenance load" value={maintenance} tone="cost" caption={`${maintenance}`} />
        <Meter
          label="Test coverage needed"
          value={testCoverage}
          tone="cost"
          caption={`${testCoverage}`}
        />
      </div>

      <p className="rounded-md border border-line bg-lilac p-3 text-[15px] text-navy">
        {note}
      </p>
    </div>
  );
}

/* ==========================================================================
   W11 — BUDGET ALLOCATOR
   Four buckets that always sum to 100%.
   ========================================================================== */

const TOTAL_BUDGET = 175000;

interface Bucket {
  id: string;
  label: string;
  /** Qualitative consequence when this bucket is starved / well funded. */
  starved: string;
  funded: string;
}

const BUCKETS: Bucket[] = [
  {
    id: 'base',
    label: 'Low-stimulus base structure',
    starved:
      'The base surface stays busy, so every later measure has to fight the layout it sits in.',
    funded:
      'The default surface gets calmer for everyone, without anyone having to switch anything on.',
  },
  {
    id: 'patterns',
    label: 'Consistent patterns',
    starved:
      'Each area keeps its own navigation habits, and people relearn the product at every border.',
    funded:
      'One pattern carries across areas, so what is learned once keeps working.',
  },
  {
    id: 'readability',
    label: 'Readability & language',
    starved:
      'Content stays technically accurate and practically unreadable for a large slice of users.',
    funded:
      'Typography and wording stop being the hurdle; support questions shift away from "what does this mean".',
  },
  {
    id: 'modes',
    label: 'Optional adaptation modes',
    starved:
      'People whose needs the default cannot meet have no route left inside the product.',
    funded:
      'Optional modes exist, and they carry an ongoing build, support and test cost.',
  },
];

function BudgetAllocator() {
  const [shares, setShares] = useState<Record<string, number>>({
    base: 25,
    patterns: 25,
    readability: 25,
    modes: 25,
  });

  // Moving one slider redistributes the difference across the other three in
  // proportion to what they currently hold, so the total stays at 100%.
  const setShare = (id: string, next: number) => {
    setShares((current) => {
      const clamped = Math.max(0, Math.min(100, next));
      const others = BUCKETS.filter((bucket) => bucket.id !== id).map((b) => b.id);
      const remaining = 100 - clamped;
      const othersTotal = others.reduce((sum, key) => sum + current[key], 0);

      const updated: Record<string, number> = { [id]: clamped };
      if (othersTotal === 0) {
        others.forEach((key, index) => {
          updated[key] =
            index === 0 ? remaining - Math.floor(remaining / 3) * 2 : Math.floor(remaining / 3);
        });
      } else {
        let allocated = 0;
        others.forEach((key, index) => {
          const share =
            index === others.length - 1
              ? remaining - allocated
              : Math.round((current[key] / othersTotal) * remaining);
          updated[key] = share;
          allocated += share;
        });
      }
      return updated;
    });
  };

  const starved = BUCKETS.filter((bucket) => shares[bucket.id] < 15);
  const total = BUCKETS.reduce((sum, bucket) => sum + shares[bucket.id], 0);

  return (
    <div className="space-y-4">
      <p className="text-[15px] font-semibold text-navy">
        Budget: €{TOTAL_BUDGET.toLocaleString('en-GB')} · allocated: {total}%
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {BUCKETS.map((bucket) => (
          <div key={bucket.id}>
            <Slider
              label={bucket.label}
              value={shares[bucket.id]}
              min={0}
              max={100}
              unit="%"
              onChange={(next) => setShare(bucket.id, next)}
            />
            <p className="text-[15px] text-ink70">
              ≈ €
              {Math.round((shares[bucket.id] / 100) * TOTAL_BUDGET).toLocaleString(
                'en-GB',
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="aion-panel">
        <p className="text-[15px] font-semibold text-navy">Modelled consequences</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-navy">
          {BUCKETS.map((bucket) => (
            <li key={bucket.id}>
              <span className="font-semibold">{bucket.label}:</span>{' '}
              {shares[bucket.id] < 15 ? bucket.starved : bucket.funded}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[15px] text-warn">
          Unallocated risk: nothing in this budget covers rework after testing, content
          migration, or the support load a change creates while people adjust.
          {starved.length > 0 &&
            ` ${starved.length} bucket${starved.length > 1 ? 's are' : ' is'} under 15% — treat that as a risk you are carrying on purpose, not as a saving.`}
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   W12 — GOVERNANCE BUILDER
   ========================================================================== */

type Involvement = '—' | 'Decide' | 'Consult' | 'Inform';

const INVOLVEMENTS: Involvement[] = ['—', 'Decide', 'Consult', 'Inform'];

const ROLES = ['Product', 'Brand', 'Engineering', 'UX/Quality'] as const;

const DECISIONS = [
  'A new component is approved',
  'Brand and readability conflict',
  'An adaptation mode is requested',
  'Test findings contradict the roadmap',
] as const;

function GovernanceBuilder() {
  const [matrix, setMatrix] = useState<Record<string, Involvement>>({});

  const get = (decision: string, role: string): Involvement =>
    matrix[`${decision}|${role}`] ?? '—';

  const cycle = (decision: string, role: string) => {
    const key = `${decision}|${role}`;
    const current = matrix[key] ?? '—';
    const next = INVOLVEMENTS[(INVOLVEMENTS.indexOf(current) + 1) % INVOLVEMENTS.length];
    setMatrix((state) => ({ ...state, [key]: next }));
  };

  const rowsWithoutDecider = DECISIONS.filter(
    (decision) => !ROLES.some((role) => get(decision, role) === 'Decide'),
  );

  const card = useMemo(
    () =>
      [
        'RACI CARD — recurring inclusive-design decisions',
        ...DECISIONS.map(
          (decision) =>
            `${decision}: ` +
            ROLES.map((role) => `${role}=${get(decision, role)}`).join(', '),
        ),
      ].join('\n'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [matrix],
  );

  return (
    <div className="space-y-4">
      <p className="aion-hint">
        Select a cell to cycle it through Decide, Consult and Inform.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-[15px]">
          <thead>
            <tr>
              <th className="border-b border-line p-2 text-left text-navy">Decision</th>
              {ROLES.map((role) => (
                <th key={role} className="border-b border-line p-2 text-left text-navy">
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DECISIONS.map((decision) => (
              <tr key={decision}>
                <th
                  scope="row"
                  className="border-b border-line p-2 text-left font-normal text-navy"
                >
                  {decision}
                </th>
                {ROLES.map((role) => {
                  const involvement = get(decision, role);
                  return (
                    <td key={role} className="border-b border-line p-1">
                      <button
                        type="button"
                        onClick={() => cycle(decision, role)}
                        aria-label={`${decision} — ${role}: ${involvement}`}
                        className={[
                          'w-full rounded border px-2 py-1 transition-colors',
                          involvement === 'Decide'
                            ? 'border-purple bg-purple font-semibold text-white'
                            : involvement === 'Consult'
                              ? 'border-purple bg-lilac text-navy'
                              : involvement === 'Inform'
                                ? 'border-line bg-white text-ink70'
                                : 'border-dashed border-line bg-white text-ink70',
                        ].join(' ')}
                      >
                        {involvement}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rowsWithoutDecider.length > 0 && (
        <p className="rounded-md border border-warn bg-[#FDF6EE] p-3 text-[15px] text-warn">
          No role holds Decide on:{' '}
          {rowsWithoutDecider.map((row) => `“${row}”`).join(', ')}. A row without a
          decider stalls in practice.
        </p>
      )}

      <div className="aion-panel">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[15px] font-semibold text-navy">RACI card</p>
          <CopyButton text={card} />
        </div>
        <pre className="mt-2 whitespace-pre-wrap font-sans text-[15px] text-navy">
          {card}
        </pre>
      </div>
    </div>
  );
}

/* ==========================================================================
   W13 — STAKEHOLDER OBJECTION DECK
   ========================================================================== */

const OBJECTIONS: { front: string; back: string[] }[] = [
  {
    front: '“That’s a niche group.”',
    back: [
      'Reframe the population: the measures target load, wording and structure, which every user carries.',
      'Move from identity to situation: fatigue, noise, small screens and time pressure produce the same failures.',
      'Ask what share of support contacts already name overwhelm, unclarity or reading effort.',
    ],
  },
  {
    front: '“We don’t have data on those users.”',
    back: [
      'Separate the two claims: no segmented data is not the same as no evidence of friction.',
      'Point at the data that does exist — drop-off, form abandonment, repeat tickets, search terms.',
      'Propose the cheapest way to close the gap: a small prototype test, scoped and dated.',
    ],
  },
  {
    front: '“It will dilute the brand.”',
    back: [
      'Distinguish brand identity from brand execution — contrast and type size are execution.',
      'Name the concrete conflict rather than the abstract one, then solve that single case.',
      'Offer the governance route: who decides when readability and brand disagree, and on what basis.',
    ],
  },
  {
    front: '“Add it in phase two.”',
    back: [
      'Sort the measures: base structure is architectural, optional modes are additive.',
      'Show the cost curve — structure retrofitted later is rebuilt, not extended.',
      'Concede the sequencing while protecting the base: agree what phase two may contain.',
    ],
  },
  {
    front: '“Compliance already signed off.”',
    back: [
      'Accept the fact, then separate compliance from usability outcomes.',
      'Point at the failure mode: a formally compliant screen can still be unusable under load.',
      'Convert the disagreement into a test question rather than an opinion contest.',
    ],
  },
];

function ObjectionDeck() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  return (
    <div className="space-y-4">
      <ul className="grid gap-3 md:grid-cols-2">
        {OBJECTIONS.map((objection, index) => {
          const isFlipped = Boolean(flipped[index]);
          return (
            <li key={objection.front}>
              <button
                type="button"
                aria-expanded={isFlipped}
                onClick={() =>
                  setFlipped((current) => ({ ...current, [index]: !current[index] }))
                }
                className="h-full w-full rounded-lg border border-line bg-white p-3 text-left transition-colors hover:bg-lilac"
              >
                <span className="block text-[15px] font-semibold text-navy">
                  {objection.front}
                </span>
                {isFlipped ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-ink70">
                    {objection.back.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="mt-2 block text-[15px] text-purple">
                    Show the counter-argument pattern
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="rounded-md border border-purple bg-lilac p-3 text-[15px] font-semibold text-navy">
        Inclusive design is not an adaptation for a minority. It is a better base
        architecture for many users.
      </p>
    </div>
  );
}

/* ========================================================================== */

export function L3Management() {
  return (
    <div className="space-y-4">
      <WidgetCard
        code="W10"
        title="Trade-off Slider"
        captions={[
          'Reach and cost move together — the question is how far you go.',
          'Neither end of this slider is a defensible position.',
        ]}
      >
        <TradeOffSlider />
      </WidgetCard>

      <WidgetCard
        code="W11"
        title="Budget Allocator"
        captions={[
          'A percentage is a statement about what you will not do.',
          'Consequences are qualitative here on purpose — precise numbers would be invented.',
        ]}
      >
        <BudgetAllocator />
      </WidgetCard>

      <WidgetCard
        code="W12"
        title="Governance Builder"
        captions={[
          'Recurring conflicts need a standing route, not a fresh argument.',
          'The only thing flagged here is a row nobody can decide.',
        ]}
      >
        <GovernanceBuilder />
      </WidgetCard>

      <WidgetCard
        code="W13"
        title="Stakeholder Objection Deck"
        captions={[
          'Each back is a pattern to adapt, not a script to read out.',
          'Answer the interest behind the objection, not only its wording.',
        ]}
      >
        <ObjectionDeck />
      </WidgetCard>
    </div>
  );
}
