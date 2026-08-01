'use client';

import { useRef, useState } from 'react';
import { TabIntro } from '@/components/shared/Chrome';
import {
  CaseLayout,
  CaseViewport,
  ConstraintsPanel,
  NotesPanel,
  TryMeNudge,
} from '@/components/shared/CaseFrame';
import {
  LG_ACCENTS,
  LG_CONSTRAINTS,
  LG_FILTERS,
  LG_HOME_CTAS,
  LG_HOME_ZONES,
  LG_PRIMARY_LABEL,
  LG_REQUEST_FIELDS,
  LG_RESULTS,
  LG_SUBMIT_ERROR,
  LG_TIMEOUT_NOTICE,
} from '@/data/lifeguide';

type Screen = 'home' | 'find' | 'request';

const SCREENS: { id: Screen; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'find', label: 'Find Support' },
  { id: 'request', label: 'Support Request' },
];

/* -------------------------------------------------------------------------- */

function LifeGuideHome({ onPrimary }: { onPrimary: () => void }) {
  return (
    <div className="p-3">
      <div className="mb-3 flex flex-wrap gap-1" data-flaw-id="LG-02">
        {LG_HOME_CTAS.map((cta, index) => (
          <button
            key={cta}
            type="button"
            className="rounded px-2 py-1 text-[12px] font-semibold text-white"
            style={{ backgroundColor: LG_ACCENTS[index % LG_ACCENTS.length] }}
          >
            {cta}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onPrimary}
        className="mb-3 rounded px-3 py-1.5 text-[13px] font-semibold text-white"
        style={{ backgroundColor: LG_ACCENTS[3] }}
        data-flaw-id="LG-11"
      >
        {LG_PRIMARY_LABEL}
      </button>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" data-flaw-id="LG-01">
        {LG_HOME_ZONES.map((zone, index) => (
          <section
            key={zone.id}
            className="rounded border p-2"
            style={{ borderColor: LG_ACCENTS[index % LG_ACCENTS.length] }}
          >
            <h4
              className="text-[13px] font-semibold"
              style={{ color: LG_ACCENTS[index % LG_ACCENTS.length] }}
            >
              {zone.title}
            </h4>
            <ul className="mt-1 space-y-0.5 text-[12px]" style={{ color: '#4A4A4A' }}>
              {zone.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function FilterBlock({
  layout,
  selected,
  onSelect,
}: {
  layout: 'left' | 'top';
  selected: Record<string, string>;
  onSelect: (groupId: string, option: string) => void;
}) {
  return (
    <div
      className={
        layout === 'left'
          ? 'w-40 shrink-0 space-y-3 border-r pr-3'
          : 'mb-3 flex flex-wrap gap-4 border-b pb-3'
      }
      style={{ borderColor: '#D8D8D8' }}
      data-flaw-id="LG-03"
    >
      {LG_FILTERS.map((group) => (
        <fieldset key={group.id}>
          <legend className="text-[12px] font-semibold" style={{ color: '#4A4A4A' }}>
            {group.label}
          </legend>
          <div className={layout === 'left' ? 'mt-1 space-y-0.5' : 'mt-1 flex flex-wrap gap-2'}>
            {group.options.map((option) => (
              <label
                key={option}
                className="flex items-center gap-1 text-[12px]"
                style={{ color: '#4A4A4A' }}
              >
                <input
                  type="radio"
                  name={`lg-${group.id}`}
                  checked={selected[group.id] === option}
                  onChange={() => onSelect(group.id, option)}
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

function LifeGuideFind({
  selected,
  setSelected,
  applied,
  setApplied,
}: {
  selected: Record<string, string>;
  setSelected: (next: Record<string, string>) => void;
  applied: boolean;
  setApplied: (next: boolean) => void;
}) {
  const layout = applied ? 'top' : 'left';

  return (
    <div className="p-3">
      {!applied && (
        <p className="mb-2 text-[12px]" style={{ color: '#6B6B6B' }} data-flaw-id="LG-04">
          Home &rsaquo; Find Support
        </p>
      )}

      <div className={layout === 'left' ? 'flex gap-3' : ''}>
        <FilterBlock
          layout={layout}
          selected={selected}
          onSelect={(groupId, option) => {
            setSelected({ ...selected, [groupId]: option });
            setApplied(true);
          }}
        />

        <div className="min-w-0 flex-1">
          <p className="mb-2 text-[13px] font-bold" style={{ color: '#333333' }}>
            {applied ? `${LG_RESULTS.length} services` : 'Select a filter to see services'}
          </p>

          {applied && (
            <ul className="space-y-2" data-flaw-id="LG-05">
              {LG_RESULTS.map((result) => (
                <li key={result.id} className="rounded border p-2" style={{ borderColor: '#D8D8D8' }}>
                  <p className="text-[13px] font-semibold" style={{ color: '#333333' }}>
                    {result.title}
                  </p>
                  <p style={{ fontSize: '13px', lineHeight: 1.2, color: '#4A4A4A' }}>
                    {result.body}
                  </p>
                  <button
                    type="button"
                    className="mt-1 rounded px-2 py-0.5 text-[12px] font-semibold text-white"
                    style={{ backgroundColor: LG_ACCENTS[0] }}
                  >
                    Select
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function LifeGuideRequest({
  values,
  setValues,
  failed,
  setFailed,
  topRef,
}: {
  values: Record<string, string>;
  setValues: (next: Record<string, string>) => void;
  failed: boolean;
  setFailed: (next: boolean) => void;
  topRef: React.RefObject<HTMLDivElement>;
}) {
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next = { ...values };
    for (const field of LG_REQUEST_FIELDS) {
      if (field.clearedOnFailure) next[field.id] = '';
    }
    setValues(next);
    setFailed(true);
    topRef.current?.scrollIntoView({ block: 'start' });
  };

  return (
    <div className="p-3">
      {failed && (
        <p className="mb-3 text-[13px]" style={{ color: '#C00000' }} data-flaw-id="LG-08">
          {LG_SUBMIT_ERROR}
        </p>
      )}

      <p className="mb-2 text-[13px] font-bold" style={{ color: '#333333' }}>
        Support Request
      </p>

      <form onSubmit={submit} data-flaw-id="LG-06">
        <div className="grid gap-2 sm:grid-cols-2">
          {LG_REQUEST_FIELDS.map((field) => (
            <label
              key={field.id}
              className="block text-[13px]"
              style={{ color: '#4A4A4A' }}
              data-flaw-id={field.strictFormat ? 'LG-07' : undefined}
            >
              {field.label}
              <input
                value={values[field.id] ?? ''}
                onChange={(event) => setValues({ ...values, [field.id]: event.target.value })}
                className="mt-0.5 w-full rounded border px-2 py-1 text-[13px]"
                style={{ borderColor: '#D8D8D8' }}
              />
              {failed && field.strictFormat && (
                <span className="block text-[11px]" style={{ color: '#C00000' }}>
                  {field.strictFormat}
                </span>
              )}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="mt-3 rounded px-3 py-1.5 text-[13px] font-semibold text-white"
          style={{ backgroundColor: LG_ACCENTS[0] }}
        >
          Send request
        </button>
      </form>

      <p className="mt-3 text-[11px]" style={{ color: '#9A9A9A' }} data-flaw-id="LG-09">
        {LG_TIMEOUT_NOTICE}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function LifeGuideCase() {
  const [screen, setScreen] = useState<Screen>('home');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [applied, setApplied] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [failed, setFailed] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const resetCase = () => {
    setScreen('home');
    setFilters({});
    setApplied(false);
    setValues({});
    setFailed(false);
  };

  return (
    <div className="space-y-4" data-flaw-id="LG-10">
      <TabIntro
        title="LifeGuide"
        lead="A fictional service portal for health, counselling and support services. Work through all three screens and try to complete a support request."
      />

      <TryMeNudge storageKey="lifeguide" />

      <CaseLayout
        main={
          <CaseViewport onReset={resetCase}>
            <div ref={topRef} className="scroll-mt-4" />
            <div className="border-b bg-[#F4F4F4] px-3 py-2" style={{ borderColor: '#D8D8D8' }}>
              <ul className="flex flex-wrap gap-2">
                {SCREENS.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setScreen(item.id)}
                      className="rounded px-2 py-1 text-[13px]"
                      style={
                        screen === item.id
                          ? { backgroundColor: LG_ACCENTS[3], color: '#FFFFFF' }
                          : { color: '#4A4A4A' }
                      }
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {screen === 'home' && <LifeGuideHome onPrimary={() => setScreen('find')} />}
            {screen === 'find' && (
              <LifeGuideFind
                selected={filters}
                setSelected={setFilters}
                applied={applied}
                setApplied={setApplied}
              />
            )}
            {screen === 'request' && (
              <LifeGuideRequest
                values={values}
                setValues={setValues}
                failed={failed}
                setFailed={setFailed}
                topRef={topRef}
              />
            )}
          </CaseViewport>
        }
        rail={
          <>
            <ConstraintsPanel items={LG_CONSTRAINTS} />
            <NotesPanel storageKey="lifeguide" />
          </>
        }
      />
    </div>
  );
}
