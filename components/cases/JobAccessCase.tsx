'use client';

import { useState } from 'react';
import { TabIntro } from '@/components/shared/Chrome';
import {
  CaseLayout,
  CaseViewport,
  ConstraintsPanel,
  NotesPanel,
  TryMeNudge,
} from '@/components/shared/CaseFrame';
import {
  JA_BLOCKS,
  JA_CONSTRAINTS,
  JA_FORM_FIELDS,
  JA_MODES_NOTE,
  JA_NAV,
  JA_VARIANTS,
  type JaVariantId,
} from '@/data/jobaccess';

interface Modes {
  reading: boolean;
  reducedStimulus: boolean;
  simplified: boolean;
}

const NO_MODES: Modes = { reading: false, reducedStimulus: false, simplified: false };

const BRAND = '#0B5FBF';
const ACCENTS = ['#0B5FBF', '#B4005A', '#00796B'];

/* -------------------------------------------------------------------------- */

function VariantNav({
  variant,
  view,
  muted,
  large,
}: {
  variant: JaVariantId;
  view: 'dashboard' | 'detail';
  muted: boolean;
  large: boolean;
}) {
  // Variant A switches its navigation pattern between the dashboard and the
  // detail view. B and C keep one pattern everywhere.
  const asSidebar = variant === 'a' && view === 'detail';
  const color = muted ? '#3A3A3A' : BRAND;
  const size = large ? 16 : variant === 'a' ? 12 : 15;

  if (asSidebar) {
    return (
      <ul
        className="w-32 shrink-0 space-y-1 border-r pr-2"
        style={{ borderColor: '#DADADA', fontSize: size }}
      >
        {JA_NAV.map((item) => (
          <li key={item} style={{ color }}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={`flex flex-wrap border-b ${variant === 'a' ? 'gap-2 pb-1' : 'gap-4 pb-2'}`}
      style={{ borderColor: '#DADADA', fontSize: size }}
    >
      {JA_NAV.map((item) => (
        <li key={item} style={{ color }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function VariantDashboard({
  variant,
  modes,
  onOpenDetail,
}: {
  variant: JaVariantId;
  modes: Modes;
  onOpenDetail: (id: string) => void;
}) {
  const compact = variant === 'a';
  const muted = modes.reducedStimulus;
  const simplified = modes.simplified;

  const bodySize = modes.reading ? 18 : compact ? 12 : 16;
  const bodyLeading = modes.reading ? 1.9 : compact ? 1.25 : 1.6;
  const measure = modes.reading ? '58ch' : 'none';

  const blocks = simplified
    ? JA_BLOCKS.filter((block) => !block.secondary)
    : JA_BLOCKS;

  return (
    <div className={compact ? 'p-2' : 'p-5'}>
      <VariantNav variant={variant} view="dashboard" muted={muted} large={modes.reading} />

      {!muted && !simplified && (
        <div
          className={compact ? 'mt-2 rounded px-3 py-2' : 'mt-4 rounded px-4 py-3'}
          style={{ backgroundColor: compact ? BRAND : '#EAF2FB', color: compact ? '#FFFFFF' : '#123' }}
        >
          <span style={{ fontSize: compact ? 12 : 15 }}>
            Career Dashboard — your applications, roles and training in one place.
          </span>
        </div>
      )}

      <h3
        className={compact ? 'mt-2 font-bold' : 'mt-5 font-bold'}
        style={{ fontSize: modes.reading ? 24 : compact ? 15 : 20, color: '#1A1A1A' }}
      >
        Career Dashboard
      </h3>

      <div
        className={
          compact
            ? 'mt-2 grid gap-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'mt-4 grid gap-4 sm:grid-cols-2'
        }
      >
        {blocks.map((block, index) => (
          <section
            key={block.id}
            className={compact ? 'rounded border p-2' : 'rounded-lg border p-4'}
            style={{
              borderColor: muted || !compact ? '#DADADA' : ACCENTS[index % ACCENTS.length],
            }}
          >
            <h4
              className="font-semibold"
              style={{
                fontSize: modes.reading ? 19 : compact ? 13 : 17,
                color: muted ? '#1A1A1A' : compact ? ACCENTS[index % ACCENTS.length] : '#1A1A1A',
              }}
            >
              {block.title}
            </h4>
            <p
              style={{
                fontSize: bodySize,
                lineHeight: bodyLeading,
                maxWidth: measure,
                textAlign: modes.reading ? 'left' : compact ? 'justify' : 'left',
                color: '#333333',
              }}
            >
              {simplified ? block.plainBody : block.body}
            </p>
            <div className={compact ? 'mt-1 flex flex-wrap gap-1' : 'mt-3'}>
              <button
                type="button"
                onClick={() => onOpenDetail(block.id)}
                className="rounded font-semibold text-white"
                style={{
                  backgroundColor: muted ? '#3A3A3A' : compact ? ACCENTS[index % ACCENTS.length] : BRAND,
                  fontSize: modes.reading ? 17 : compact ? 12 : 15,
                  padding: compact ? '2px 8px' : '8px 14px',
                }}
              >
                Open
              </button>
              {compact && (
                <>
                  <button
                    type="button"
                    onClick={() => onOpenDetail(block.id)}
                    className="rounded border px-2 text-[12px]"
                    style={{ borderColor: '#DADADA', color: '#3A3A3A' }}
                  >
                    Share
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenDetail(block.id)}
                    className="rounded border px-2 text-[12px]"
                    style={{ borderColor: '#DADADA', color: '#3A3A3A' }}
                  >
                    Hide
                  </button>
                </>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function VariantForm({
  variant,
  modes,
  values,
  setValues,
}: {
  variant: JaVariantId;
  modes: Modes;
  values: Record<string, string>;
  setValues: (next: Record<string, string>) => void;
}) {
  const compact = variant === 'a';
  const [saved, setSaved] = useState(false);

  return (
    <form
      className={compact ? 'border-t p-2' : 'border-t p-5'}
      style={{ borderColor: '#DADADA' }}
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(true);
      }}
    >
      <h4
        className="font-semibold"
        style={{ fontSize: modes.reading ? 19 : compact ? 13 : 17, color: '#1A1A1A' }}
      >
        Update your search profile
      </h4>
      <div className={compact ? 'mt-1 grid gap-1 sm:grid-cols-3' : 'mt-3 grid gap-4 sm:grid-cols-3'}>
        {JA_FORM_FIELDS.map((field) => (
          <label key={field.id} className="block" style={{ color: '#1A1A1A' }}>
            <span
              style={{ fontSize: modes.reading ? 17 : compact ? 12 : 15, fontWeight: 600 }}
            >
              {field.label}
            </span>
            <input
              value={values[field.id] ?? ''}
              onChange={(event) => {
                setValues({ ...values, [field.id]: event.target.value });
                setSaved(false);
              }}
              className="mt-1 w-full rounded border px-2 py-1.5"
              style={{
                borderColor: '#DADADA',
                fontSize: modes.reading ? 17 : compact ? 12 : 15,
              }}
            />
            <span
              className="block"
              style={{
                fontSize: modes.reading ? 16 : compact ? 11 : 14,
                lineHeight: modes.reading ? 1.8 : 1.4,
                color: '#555555',
              }}
            >
              {modes.simplified ? field.plainHint : field.hint}
            </span>
          </label>
        ))}
      </div>
      <button
        type="submit"
        className="mt-3 rounded font-semibold text-white"
        style={{
          backgroundColor: modes.reducedStimulus ? '#3A3A3A' : BRAND,
          fontSize: modes.reading ? 17 : compact ? 12 : 15,
          padding: compact ? '4px 10px' : '10px 16px',
        }}
      >
        Save profile
      </button>
      {saved && (
        <p
          className="mt-2"
          style={{ fontSize: modes.reading ? 17 : compact ? 12 : 15, color: '#1A1A1A' }}
          aria-live="polite"
        >
          Your search profile has been saved.
        </p>
      )}
    </form>
  );
}

function VariantDetail({
  variant,
  modes,
  blockId,
  onBack,
}: {
  variant: JaVariantId;
  modes: Modes;
  blockId: string;
  onBack: () => void;
}) {
  const block = JA_BLOCKS.find((item) => item.id === blockId)!;
  const compact = variant === 'a';
  const asSidebar = variant === 'a';

  const content = (
    <div className="min-w-0 flex-1">
      <button
        type="button"
        onClick={onBack}
        className="underline"
        style={{ color: modes.reducedStimulus ? '#3A3A3A' : BRAND, fontSize: compact ? 12 : 15 }}
      >
        Back to dashboard
      </button>
      <h3
        className="mt-2 font-bold"
        style={{ fontSize: modes.reading ? 24 : compact ? 15 : 20, color: '#1A1A1A' }}
      >
        {block.title}
      </h3>
      <p
        className="mt-2"
        style={{
          fontSize: modes.reading ? 18 : compact ? 12 : 16,
          lineHeight: modes.reading ? 1.9 : compact ? 1.25 : 1.6,
          maxWidth: modes.reading ? '58ch' : 'none',
          color: '#333333',
        }}
      >
        {modes.simplified ? block.plainBody : block.body}
      </p>
      <p
        className="mt-2"
        style={{
          fontSize: modes.reading ? 18 : compact ? 12 : 16,
          lineHeight: modes.reading ? 1.9 : compact ? 1.25 : 1.6,
          maxWidth: modes.reading ? '58ch' : 'none',
          color: '#333333',
        }}
      >
        {block.detail}
      </p>
    </div>
  );

  return (
    <div className={compact ? 'p-2' : 'p-5'}>
      {!asSidebar && (
        <VariantNav variant={variant} view="detail" muted={modes.reducedStimulus} large={modes.reading} />
      )}
      <div className={asSidebar ? 'flex gap-3' : 'mt-4'}>
        {asSidebar && (
          <VariantNav variant={variant} view="detail" muted={modes.reducedStimulus} large={modes.reading} />
        )}
        {content}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function ModeToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-[15px]" style={{ color: '#1A1A1A' }}>
      <input
        type="checkbox"
        className="h-4 w-4"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      {label}
    </label>
  );
}

export function JobAccessCase() {
  const [variant, setVariant] = useState<JaVariantId>('a');
  const [view, setView] = useState<'dashboard' | 'detail'>('dashboard');
  const [detailId, setDetailId] = useState<string>(JA_BLOCKS[0].id);
  const [values, setValues] = useState<Record<string, string>>({});
  const [modes, setModes] = useState<Modes>(NO_MODES);

  const activeModes = variant === 'c' ? modes : NO_MODES;

  const resetCase = () => {
    setVariant('a');
    setView('dashboard');
    setDetailId(JA_BLOCKS[0].id);
    setValues({});
    setModes(NO_MODES);
  };

  return (
    <div className="space-y-4">
      <TabIntro
        title="JobAccess"
        lead="A fictional platform for applications, further training and career planning. One screen, rendered three ways. The content is the same in all three — only the treatment changes."
      />

      <TryMeNudge storageKey="jobaccess" />

      <CaseLayout
        main={
          <div className="space-y-3">
            <div
              role="group"
              aria-label="Variant"
              className="inline-flex flex-wrap gap-1 rounded-lg border border-line bg-white p-1"
            >
              {JA_VARIANTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={variant === item.id}
                  onClick={() => {
                    setVariant(item.id);
                    setView('dashboard');
                  }}
                  className={[
                    'rounded-md px-3 py-1.5 text-left text-[15px] transition-colors',
                    variant === item.id
                      ? 'bg-purple font-semibold text-white'
                      : 'text-navy hover:bg-lilac',
                  ].join(' ')}
                >
                  {item.label}
                  <span className="block text-[13px] opacity-80">{item.descriptor}</span>
                </button>
              ))}
            </div>

            <CaseViewport onReset={resetCase}>
              {variant === 'c' && (
                <div
                  className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b bg-[#F6F6F6] px-4 py-3"
                  style={{ borderColor: '#DADADA' }}
                >
                  <span className="text-[15px] font-semibold" style={{ color: '#1A1A1A' }}>
                    Display options
                  </span>
                  <ModeToggle
                    label="Reading mode"
                    checked={modes.reading}
                    onChange={(next) => setModes((current) => ({ ...current, reading: next }))}
                  />
                  <ModeToggle
                    label="Reduced stimulus"
                    checked={modes.reducedStimulus}
                    onChange={(next) =>
                      setModes((current) => ({ ...current, reducedStimulus: next }))
                    }
                  />
                  <ModeToggle
                    label="Simplified view"
                    checked={modes.simplified}
                    onChange={(next) =>
                      setModes((current) => ({ ...current, simplified: next }))
                    }
                  />
                  <span className="w-full text-[14px]" style={{ color: '#555555' }}>
                    {JA_MODES_NOTE}
                  </span>
                </div>
              )}

              {view === 'dashboard' ? (
                <>
                  <VariantDashboard
                    variant={variant}
                    modes={activeModes}
                    onOpenDetail={(id) => {
                      setDetailId(id);
                      setView('detail');
                    }}
                  />
                  <VariantForm
                    variant={variant}
                    modes={activeModes}
                    values={values}
                    setValues={setValues}
                  />
                </>
              ) : (
                <VariantDetail
                  variant={variant}
                  modes={activeModes}
                  blockId={detailId}
                  onBack={() => setView('dashboard')}
                />
              )}
            </CaseViewport>
          </div>
        }
        rail={
          <>
            <ConstraintsPanel items={JA_CONSTRAINTS} />
            <NotesPanel storageKey="jobaccess" />
          </>
        }
      />
    </div>
  );
}
