'use client';

import { useLocalStorage } from './useLocalStorage';
import { CopyButton } from './Controls';

/**
 * The bounded frame that separates a fictional training case from the AION
 * chrome. Nothing inside it is annotated, scored or explained — the frame is
 * the only thing the playground says about what is in there.
 */
export function CaseViewport({
  children,
  onReset,
}: {
  children: React.ReactNode;
  onReset: () => void;
}) {
  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[15px] text-[#5B5B5B]">
          Fictional training case — explore freely.
        </p>
        <button type="button" className="aion-btn-quiet" onClick={onReset}>
          Reset this case
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-line bg-white">
        {children}
      </div>
    </div>
  );
}

/**
 * A one-time, dismissible nudge shown on first load of a case tab. Once
 * dismissed it is stored and never shown again.
 */
export function TryMeNudge({ storageKey }: { storageKey: string }) {
  const [dismissed, setDismissed, { hydrated }] = useLocalStorage(
    `nudge:${storageKey}`,
    false,
  );

  if (!hydrated || dismissed) return null;

  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-md border border-line bg-lilac px-3 py-2">
      <p className="text-[15px] text-navy">
        Try me — everything below is interactive. Work through it as a user would.
      </p>
      <button
        type="button"
        className="rounded-md border border-line bg-white px-3 py-1 text-[15px] text-navy hover:bg-white/70"
        onClick={() => setDismissed(true)}
      >
        Got it
      </button>
    </div>
  );
}

/** Learner-owned scratch space. Deliberately prompt-free. */
export function NotesPanel({ storageKey }: { storageKey: string }) {
  const [notes, setNotes, { reset }] = useLocalStorage(`notes:${storageKey}`, '');

  return (
    <section className="aion-card" aria-labelledby={`notes-${storageKey}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id={`notes-${storageKey}`} className="text-[15px] font-semibold text-navy">
          Notes
        </h2>
        <div className="flex gap-2">
          <CopyButton text={notes} />
          <button
            type="button"
            className="aion-btn-quiet"
            onClick={reset}
            disabled={notes.length === 0}
          >
            Clear
          </button>
        </div>
      </div>
      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Your observations…"
        rows={12}
        className="mt-3 w-full resize-y rounded-md border border-line p-3 text-[15px] leading-relaxed text-navy placeholder:text-ink70/70"
      />
    </section>
  );
}

/** Framework conditions, reproduced from the curriculum. */
export function ConstraintsPanel({
  title = 'Framework conditions',
  items,
}: {
  title?: string;
  items: string[];
}) {
  return (
    <section className="aion-panel" aria-labelledby="constraints-heading">
      <h2 id="constraints-heading" className="text-[15px] font-semibold text-navy">
        {title}
      </h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-navy">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Two-column case layout: the case viewport gets the room, the learner's
 * side rail keeps notes and constraints in reach without covering the case.
 */
export function CaseLayout({
  main,
  rail,
}: {
  main: React.ReactNode;
  rail: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">{main}</div>
      <div className="space-y-4 lg:sticky lg:top-4 lg:self-start">{rail}</div>
    </div>
  );
}
