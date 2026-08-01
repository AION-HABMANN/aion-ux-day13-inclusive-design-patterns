'use client';

import { useState } from 'react';
import { usePrefersReducedMotion } from '@/components/shared/useLocalStorage';

/**
 * The twelve practice elements, each rendered in its original and its repaired
 * state. Practice products only — nothing here reproduces a planted flaw from
 * an assessment case.
 */

const SPECIALTIES = [
  'General practice', 'Dermatology', 'Cardiology', 'Orthopaedics', 'Paediatrics',
  'Neurology', 'Ophthalmology', 'ENT', 'Gynaecology', 'Urology', 'Endocrinology',
  'Rheumatology', 'Psychiatry', 'Oncology', 'Radiology', 'Dentistry',
  'Physiotherapy', 'Nutrition',
];

const SPECIALTY_GROUPS = [
  { name: 'Everyday care', items: ['General practice', 'Paediatrics', 'Dentistry'] },
  { name: 'Body and movement', items: ['Orthopaedics', 'Physiotherapy', 'Rheumatology'] },
  { name: 'Senses', items: ['Ophthalmology', 'ENT', 'Dermatology'] },
  { name: 'Specialist referral', items: ['Cardiology', 'Neurology', 'Oncology'] },
];

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-line bg-white p-3">{children}</div>
  );
}

/* --- MediBook ------------------------------------------------------------ */

function Mb1({ fixed }: { fixed: boolean }) {
  const [picked, setPicked] = useState<string | null>(null);

  if (fixed) {
    return (
      <Frame>
        <p className="text-[15px] font-semibold text-navy">What do you need?</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {SPECIALTY_GROUPS.map((group) => (
            <div key={group.name}>
              <p className="text-[15px] font-semibold text-ink70">{group.name}</p>
              <ul className="mt-1 flex flex-wrap gap-1">
                {group.items.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => setPicked(item)}
                      className={[
                        'rounded border px-2 py-1 text-[15px]',
                        picked === item
                          ? 'border-purple bg-purple text-white'
                          : 'border-line text-navy hover:bg-lilac',
                      ].join(' ')}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {picked && <p className="mt-2 text-[15px] text-navy">Selected: {picked}</p>}
      </Frame>
    );
  }

  return (
    <Frame>
      <div className="mb-2 flex flex-wrap gap-2">
        {['32 slots free', '8 doctors online', '4 urgent'].map((counter) => (
          <span
            key={counter}
            className="case-blink rounded bg-[#C2185B] px-2 py-0.5 text-[12px] font-bold text-white"
          >
            {counter}
          </span>
        ))}
      </div>
      <ul className="flex flex-wrap gap-1">
        {SPECIALTIES.map((item) => (
          <li key={item}>
            <button
              type="button"
              onClick={() => setPicked(item)}
              className={[
                'rounded border px-2 py-1 text-[12px]',
                picked === item ? 'border-[#0277BD] bg-[#0277BD] text-white' : 'border-[#D8D8D8]',
              ].join(' ')}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      {picked && <p className="mt-2 text-[12px]">Selected: {picked}</p>}
    </Frame>
  );
}

function Mb2({ fixed }: { fixed: boolean }) {
  const [step, setStep] = useState(1);
  const total = 3;

  return (
    <Frame>
      <p className={fixed ? 'text-[15px] font-semibold text-purple' : 'text-[12px] text-[#6B6B6B]'}>
        {fixed ? `Step ${step} of ${total}` : `Step ${step}`}
      </p>
      <div className="mt-2 space-y-2">
        <label className="block text-[15px] text-navy">
          {['Reason for the visit', 'Preferred day', 'Insurance number'][step - 1]}
          <input className="mt-1 w-full rounded border border-line px-2 py-1 text-[15px]" />
        </label>
        {!fixed && step > 1 && (
          <label className="block text-[12px] text-[#6B6B6B]">
            Additional question we also need ({step - 1} more added at this step)
            <input className="mt-1 w-full rounded border border-[#D8D8D8] px-2 py-1 text-[12px]" />
          </label>
        )}
      </div>
      <button
        type="button"
        onClick={() => setStep((current) => (current % total) + 1)}
        className="mt-3 rounded bg-purple px-3 py-1.5 text-[15px] font-semibold text-white"
      >
        {fixed ? (step === total ? 'Finish' : `Go to step ${step + 1}`) : 'Next'}
      </button>
    </Frame>
  );
}

function Mb3({ fixed }: { fixed: boolean }) {
  const [value, setValue] = useState('7 May');
  const [submitted, setSubmitted] = useState(false);
  const invalid = submitted;

  return (
    <Frame>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        {fixed && submitted && (
          <div className="mb-2 rounded border-l-4 border-warn bg-[#FDF6EE] p-2">
            <p className="text-[15px] font-semibold text-warn">
              Date of birth needs a change.
            </p>
            <p className="text-[15px] text-navy">
              Use the form DD.MM.YYYY, for example 07.05.1984.
            </p>
          </div>
        )}
        <label className="block text-[15px] text-navy">
          Date of birth
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="mt-1 w-full rounded px-2 py-1 text-[15px]"
            style={{
              border: invalid ? '2px solid #C00000' : '1px solid #DDD6EE',
            }}
          />
          {fixed && <span className="text-[15px] text-ink70">Format: DD.MM.YYYY</span>}
        </label>
        <button
          type="submit"
          className="mt-3 rounded bg-purple px-3 py-1.5 text-[15px] font-semibold text-white"
        >
          Confirm details
        </button>
      </form>
    </Frame>
  );
}

function Mb4({ fixed }: { fixed: boolean }) {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <Frame>
      <p className="text-[15px] font-semibold text-navy">
        Dermatology · 18.09.2026 · 09:20
      </p>
      {fixed ? (
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMessage('Opened the appointment to change the date or time.')}
            className="aion-btn-quiet"
          >
            Change date or time
          </button>
          <button
            type="button"
            onClick={() => setMessage('Asked you to confirm before cancelling.')}
            className="rounded-md border border-warn px-3 py-2 text-[15px] text-warn"
          >
            Cancel appointment
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setMessage('Your appointment has been cancelled.')}
          className="mt-2 rounded bg-[#0277BD] px-3 py-1.5 text-[13px] font-semibold text-white"
        >
          Manage
        </button>
      )}
      {message && (
        <p className="mt-2 text-[15px] text-navy" aria-live="polite">
          {message}
        </p>
      )}
    </Frame>
  );
}

/* --- CityPass ------------------------------------------------------------ */

function Cp1({ fixed }: { fixed: boolean }) {
  const [step, setStep] = useState<1 | 2>(1);

  const action = (
    <button
      type="button"
      onClick={() => setStep((current) => (current === 1 ? 2 : 1))}
      className="rounded bg-purple px-3 py-1.5 text-[15px] font-semibold text-white"
    >
      {fixed ? 'Continue' : step === 1 ? 'Next' : 'Buy'}
    </button>
  );

  const alignRight = !fixed && step === 2;

  return (
    <Frame>
      <p className="text-[15px] font-semibold text-navy">
        {step === 1 ? 'Choose your zone' : 'Confirm and pay'}
      </p>
      <p className="mt-1 text-[15px] text-ink70">
        {step === 1 ? 'Zone A · single · €2.90' : '€2.90 · valid 90 minutes'}
      </p>
      <div className={`mt-3 flex ${alignRight ? 'justify-end' : 'justify-start'}`}>
        {action}
      </div>
    </Frame>
  );
}

function Cp2({ fixed }: { fixed: boolean }) {
  const [view, setView] = useState(0);
  const views = fixed
    ? ['Active ticket', 'Purchase history', 'Saved routes']
    : ['Tickets', 'Tickets', 'Tickets'];

  return (
    <Frame>
      <ul className="flex flex-wrap gap-2 border-b border-line pb-1">
        {views.map((name, index) => (
          <li key={`${name}-${index}`}>
            <button
              type="button"
              onClick={() => setView(index)}
              aria-current={fixed && view === index ? 'page' : undefined}
              className={[
                'rounded px-2 py-1 text-[15px]',
                fixed && view === index
                  ? 'bg-purple font-semibold text-white'
                  : 'text-navy hover:bg-lilac',
              ].join(' ')}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[15px] font-semibold text-navy">{views[view]}</p>
      <p className="text-[15px] text-ink70">
        {['Zone A single, valid until 14:40.', 'Six purchases in the last 30 days.', 'Two saved routes.'][view]}
      </p>
    </Frame>
  );
}

function Cp3({ fixed }: { fixed: boolean }) {
  const [large, setLarge] = useState(false);
  const [calm, setCalm] = useState(false);

  return (
    <Frame>
      <p className="text-[15px] font-semibold text-navy">Settings · Display</p>
      {fixed ? (
        <div className="mt-2 space-y-2">
          <label className="flex items-center gap-2 text-[15px] text-navy">
            <input
              type="checkbox"
              className="h-4 w-4 accent-[#5624D0]"
              checked={large}
              onChange={(event) => setLarge(event.target.checked)}
            />
            Larger text
          </label>
          <label className="flex items-center gap-2 text-[15px] text-navy">
            <input
              type="checkbox"
              className="h-4 w-4 accent-[#5624D0]"
              checked={calm}
              onChange={(event) => setCalm(event.target.checked)}
            />
            Reduce motion and colour
          </label>
        </div>
      ) : (
        <label className="mt-2 block text-[15px] text-navy">
          Language
          <select className="mt-1 block rounded border border-line px-2 py-1 text-[15px]">
            <option>German</option>
            <option>English</option>
          </select>
        </label>
      )}

      <div
        className="mt-3 rounded border p-2"
        style={{
          borderColor: fixed && calm ? '#DDD6EE' : '#EF6C00',
          fontSize: fixed && large ? 19 : 13,
          color: fixed && calm ? '#231A45' : '#EF6C00',
        }}
      >
        Zone A single · valid 90 minutes
      </div>
    </Frame>
  );
}

const FARE_TEXT =
  'THE TICKET IS VALID FOR NINETY MINUTES FROM ACTIVATION IN THE SELECTED ZONE AND MAY NOT BE TRANSFERRED. THE TICKET EXPIRES AT 14:40 TODAY.';

function Cp4({ fixed }: { fixed: boolean }) {
  if (fixed) {
    return (
      <Frame>
        <p className="text-[15px] font-semibold text-navy">Expires at 14:40 today.</p>
        <p className="mt-1 max-w-[60ch] text-[15px] text-navy">
          The ticket is valid for ninety minutes from activation, in the zone you
          selected. It cannot be transferred to someone else.
        </p>
      </Frame>
    );
  }
  return (
    <Frame>
      <p
        style={{
          fontSize: '12px',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          color: '#4A4A4A',
        }}
      >
        {FARE_TEXT}
      </p>
    </Frame>
  );
}

/* --- BookNest ------------------------------------------------------------ */

const BOOK_TEXT =
  'A quiet novel about a cartographer who returns to the coastal town she grew up in, and finds that the maps she drew as a child no longer match the shoreline. Over one winter she re-surveys the cliffs, the harbour and the people she left behind, and learns which of them have moved.';

function Bn1({ fixed }: { fixed: boolean }) {
  const [borrowed, setBorrowed] = useState(false);
  return (
    <Frame>
      <p className="text-[15px] font-semibold text-navy">The Shifting Shore</p>
      <p
        className="mt-1"
        style={
          fixed
            ? { fontSize: 15, lineHeight: 1.6, maxWidth: '60ch', textAlign: 'left' }
            : { fontSize: 14, lineHeight: 1.3, maxWidth: '110ch', textAlign: 'center' }
        }
      >
        {BOOK_TEXT}
      </p>
      <button
        type="button"
        onClick={() => setBorrowed(true)}
        className="mt-2 rounded bg-purple px-3 py-1.5 text-[15px] font-semibold text-white"
      >
        Borrow
      </button>
      {borrowed && <p className="mt-1 text-[15px] text-success">Borrowed.</p>}
    </Frame>
  );
}

const SHELVES = [
  'Trending now', 'New arrivals', 'Staff picks', 'Short reads',
  'Award winners', 'Coming back soon',
];

function Bn2({ fixed }: { fixed: boolean }) {
  const reducedMotion = usePrefersReducedMotion();
  const [picked, setPicked] = useState<string | null>(null);

  if (fixed) {
    return (
      <Frame>
        <p className="text-[15px] font-semibold text-navy">Continue reading</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {['The Shifting Shore', 'Harbour Light', 'Winter Survey'].map((book) => (
            <li key={book}>
              <button
                type="button"
                onClick={() => setPicked(book)}
                className={[
                  'rounded border px-3 py-2 text-[15px]',
                  picked === book
                    ? 'border-purple bg-purple text-white'
                    : 'border-line text-navy hover:bg-lilac',
                ].join(' ')}
              >
                {book}
              </button>
            </li>
          ))}
        </ul>
        {picked && <p className="mt-2 text-[15px] text-navy">Selected: {picked}</p>}
      </Frame>
    );
  }

  return (
    <Frame>
      <p
        className={`text-[12px] font-bold text-[#AD1457] ${reducedMotion ? '' : 'case-blink'}`}
      >
        412 readers are reading right now
      </p>
      <div className="mt-2 space-y-1">
        {SHELVES.map((shelf, shelfIndex) => (
          <div key={shelf}>
            <p className="text-[11px] font-semibold text-[#00695C]">{shelf}</p>
            <ul className="flex gap-1 overflow-hidden">
              {Array.from({ length: 6 }).map((_, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => setPicked(`${shelf} ${index + 1}`)}
                    className="h-8 w-12 rounded text-[10px] text-white"
                    style={{
                      backgroundColor: ['#00695C', '#AD1457', '#EF6C00', '#283593'][
                        (shelfIndex + index) % 4
                      ],
                    }}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {picked && <p className="mt-2 text-[12px]">Selected: {picked}</p>}
    </Frame>
  );
}

function Bn3({ fixed }: { fixed: boolean }) {
  const [state, setState] = useState<'idle' | 'failed'>('idle');

  return (
    <Frame>
      <p className="text-[15px] font-semibold text-navy">
        Harbour Light — due back 12.09
      </p>
      {state === 'idle' ? (
        <button
          type="button"
          onClick={() => setState('failed')}
          className="mt-2 rounded bg-purple px-3 py-1.5 text-[15px] font-semibold text-white"
        >
          Return
        </button>
      ) : fixed ? (
        <div className="mt-2 rounded border-l-4 border-warn bg-[#FDF6EE] p-2">
          <p className="text-[15px] font-semibold text-warn">
            The return did not go through. The book is still on loan.
          </p>
          <p className="text-[15px] text-navy">
            The library service did not respond. Nothing has changed on your account.
          </p>
          <button
            type="button"
            onClick={() => setState('idle')}
            className="mt-2 rounded bg-purple px-3 py-1.5 text-[15px] font-semibold text-white"
          >
            Try the return again
          </button>
        </div>
      ) : (
        <p className="mt-2 text-[12px] text-[#C00000]">Something went wrong.</p>
      )}
    </Frame>
  );
}

function Bn4({ fixed }: { fixed: boolean }) {
  const [saved, setSaved] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggle = (book: string) =>
    setSaved((current) =>
      current.includes(book) ? current.filter((item) => item !== book) : [...current, book],
    );

  return (
    <Frame>
      <div className="space-y-3">
        <div>
          <p className="text-[15px] font-semibold text-navy">Staff picks</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[15px] text-navy">Winter Survey</span>
            <button
              type="button"
              onClick={() => toggle('Winter Survey')}
              className="aion-btn-quiet px-2 py-1 text-[15px]"
            >
              {saved.includes('Winter Survey') ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        <div>
          <p className="text-[15px] font-semibold text-navy">New arrivals</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[15px] text-navy">Harbour Light</span>
            {fixed ? (
              <button
                type="button"
                onClick={() => toggle('Harbour Light')}
                className="aion-btn-quiet px-2 py-1 text-[15px]"
              >
                {saved.includes('Harbour Light') ? 'Saved' : 'Save'}
              </button>
            ) : (
              <span className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="rounded border border-[#D8D8D8] px-2 py-1 text-[13px]"
                >
                  ⋯
                </button>
                {menuOpen && (
                  <span className="absolute left-0 top-full z-10 mt-1 block w-32 rounded border border-[#D8D8D8] bg-white p-1 text-[13px]">
                    <button
                      type="button"
                      onClick={() => {
                        toggle('Harbour Light');
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left"
                    >
                      {saved.includes('Harbour Light') ? 'Remove from list' : 'Add to list'}
                    </button>
                  </span>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------------- */

const SURFACES: Record<string, (props: { fixed: boolean }) => JSX.Element> = {
  'mb-1': Mb1,
  'mb-2': Mb2,
  'mb-3': Mb3,
  'mb-4': Mb4,
  'cp-1': Cp1,
  'cp-2': Cp2,
  'cp-3': Cp3,
  'cp-4': Cp4,
  'bn-1': Bn1,
  'bn-2': Bn2,
  'bn-3': Bn3,
  'bn-4': Bn4,
};

export function PracticeSurface({ itemId, fixed }: { itemId: string; fixed: boolean }) {
  const Surface = SURFACES[itemId];
  if (!Surface) return null;
  // Remounting on the toggle so each state starts from a clean interaction.
  return <Surface key={`${itemId}-${fixed}`} fixed={fixed} />;
}
