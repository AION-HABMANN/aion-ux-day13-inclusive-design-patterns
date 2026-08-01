'use client';

import { useMemo, useState } from 'react';
import { TabIntro } from '@/components/shared/Chrome';
import {
  CaseLayout,
  CaseViewport,
  ConstraintsPanel,
  NotesPanel,
  TryMeNudge,
} from '@/components/shared/CaseFrame';
import { CopyButton } from '@/components/shared/Controls';
import { useLocalStorage } from '@/components/shared/useLocalStorage';
import { ENTERPRISE_CONSTRAINTS, SURFACES, type Surface } from '@/data/enterprise';

/** A fixed, decorative sparkline. The numbers beside it carry the meaning. */
function Sparkline({ values }: { values: number[] }) {
  const width = 120;
  const height = 32;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / span) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Support ticket volume over twelve months, from ${values[0]} to ${values[values.length - 1]} per month`}
      className="mt-1"
    >
      <polyline
        points={points}
        fill="none"
        stroke="#5624D0"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SurfaceCard({ surface }: { surface: Surface }) {
  return (
    <section className="aion-card">
      <h3 className="text-[17px] font-bold text-navy">{surface.name}</h3>
      <dl className="mt-3 space-y-3 text-[15px]">
        <div>
          <dt className="font-semibold text-navy">Primary user task</dt>
          <dd className="text-ink70">{surface.primaryTask}</dd>
        </div>
        <div>
          <dt className="font-semibold text-navy">Monthly sessions</dt>
          <dd className="text-ink70">{surface.monthlySessions}</dd>
        </div>
        <div>
          <dt className="font-semibold text-navy">Top three complaint themes</dt>
          <dd>
            <ol className="list-decimal pl-5 text-ink70">
              {surface.complaintThemes.map((theme) => (
                <li key={theme}>{theme}</li>
              ))}
            </ol>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-navy">Support ticket volume, 12 months</dt>
          <dd className="text-ink70">
            {surface.ticketTrend[0]} → {surface.ticketTrend[surface.ticketTrend.length - 1]} per
            month
            <Sparkline values={surface.ticketTrend} />
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-navy">Last accessibility review</dt>
          <dd className="text-ink70">{surface.accessibilityReview}</dd>
        </div>
        <div>
          <dt className="font-semibold text-navy">Technical constraint</dt>
          <dd className="text-ink70">{surface.technicalConstraint}</dd>
        </div>
      </dl>
    </section>
  );
}

interface SequencingState {
  order: (Surface['id'] | null)[];
  rationales: Record<string, string>;
}

const EMPTY_SEQUENCE: SequencingState = {
  order: [null, null, null],
  rationales: {},
};

const POSITION_LABELS = ['1st', '2nd', '3rd'];

function SequencingSandbox({
  state,
  setState,
  onClear,
}: {
  state: SequencingState;
  setState: React.Dispatch<React.SetStateAction<SequencingState>>;
  onClear: () => void;
}) {
  const [held, setHeld] = useState<Surface['id'] | null>(null);

  const placed = state.order.filter(Boolean) as Surface['id'][];
  const available = SURFACES.filter((surface) => !placed.includes(surface.id));

  const place = (slot: number) => {
    if (!held) return;
    setState((current) => {
      const order = [...current.order];
      // A surface holds one slot at a time.
      const existing = order.indexOf(held);
      if (existing !== -1) order[existing] = null;
      order[slot] = held;
      return { ...current, order };
    });
    setHeld(null);
  };

  const clearSlot = (slot: number) => {
    setState((current) => {
      const order = [...current.order];
      order[slot] = null;
      return { ...current, order };
    });
  };

  const summary = useMemo(
    () =>
      [
        'SEQUENCING — order and rationale',
        ...state.order.map((id, index) => {
          const surface = SURFACES.find((item) => item.id === id);
          const rationale = id ? (state.rationales[id] ?? '') : '';
          return `${POSITION_LABELS[index]}: ${surface ? surface.name : '—'}${
            rationale ? ` — ${rationale}` : ''
          }`;
        }),
      ].join('\n'),
    [state],
  );

  return (
    <section className="aion-card" aria-labelledby="sequencing-heading">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="sequencing-heading" className="text-[17px] font-bold text-navy">
          Sequencing sandbox
        </h2>
        <div className="flex gap-2">
          <CopyButton text={summary} />
          <button type="button" className="aion-btn-quiet" onClick={onClear}>
            Clear
          </button>
        </div>
      </div>

      <p className="aion-hint mt-1">
        Select a surface, then select a position. Or drag it across. Nothing here is
        scored — the rationale is the work.
      </p>

      <ul className="mt-3 flex flex-wrap gap-2">
        {available.length === 0 && (
          <li className="text-[15px] text-ink70">All three placed.</li>
        )}
        {available.map((surface) => (
          <li key={surface.id}>
            <button
              type="button"
              draggable
              onDragStart={() => setHeld(surface.id)}
              aria-pressed={held === surface.id}
              onClick={() =>
                setHeld((current) => (current === surface.id ? null : surface.id))
              }
              className={[
                'cursor-grab rounded-md border border-line bg-white px-3 py-1.5 text-[15px] text-navy transition-colors',
                held === surface.id ? 'ring-2 ring-purple ring-offset-2' : 'hover:bg-lilac',
              ].join(' ')}
            >
              {surface.name}
            </button>
          </li>
        ))}
      </ul>

      <ol className="mt-4 space-y-3">
        {state.order.map((id, index) => {
          const surface = SURFACES.find((item) => item.id === id);
          return (
            <li
              key={POSITION_LABELS[index]}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                place(index);
              }}
              className="rounded-lg border border-line p-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-lilac px-2 py-0.5 text-[15px] font-semibold text-purple">
                  {POSITION_LABELS[index]}
                </span>
                {surface ? (
                  <>
                    <span className="text-[15px] font-semibold text-navy">
                      {surface.name}
                    </span>
                    <button
                      type="button"
                      className="text-[15px] text-purple underline"
                      onClick={() => clearSlot(index)}
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => place(index)}
                    disabled={!held}
                    className="rounded border border-dashed border-line px-3 py-1 text-[15px] text-ink70 disabled:opacity-50"
                  >
                    {held ? 'Place here' : 'Select a surface first'}
                  </button>
                )}
              </div>
              <label className="mt-2 block">
                <span className="aion-label">Rationale, one line</span>
                <input
                  value={surface ? (state.rationales[surface.id] ?? '') : ''}
                  disabled={!surface}
                  onChange={(event) => {
                    if (!surface) return;
                    const next = event.target.value;
                    setState((current) => ({
                      ...current,
                      rationales: { ...current.rationales, [surface.id]: next },
                    }));
                  }}
                  className="mt-1 w-full rounded border border-line px-3 py-2 text-[15px] disabled:bg-[#F6F5FA]"
                />
              </label>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function EnterpriseContextCase() {
  const [sequence, setSequence, { reset }] = useLocalStorage<SequencingState>(
    'enterprise:sequence',
    EMPTY_SEQUENCE,
  );

  return (
    <div className="space-y-4">
      <TabIntro
        title="Enterprise Context"
        lead="A decision briefing across a company's whole digital estate: three surfaces, one set of constraints, and a sequencing decision to argue for."
      />

      <TryMeNudge storageKey="enterprise" />

      <CaseLayout
        main={
          <CaseViewport onReset={reset}>
            <div className="space-y-4 p-4">
              <div className="grid gap-4 lg:grid-cols-3">
                {SURFACES.map((surface) => (
                  <SurfaceCard key={surface.id} surface={surface} />
                ))}
              </div>
              <ConstraintsPanel items={ENTERPRISE_CONSTRAINTS} />
              <SequencingSandbox
                state={sequence}
                setState={setSequence}
                onClear={reset}
              />
            </div>
          </CaseViewport>
        }
        rail={<NotesPanel storageKey="enterprise" />}
      />
    </div>
  );
}
