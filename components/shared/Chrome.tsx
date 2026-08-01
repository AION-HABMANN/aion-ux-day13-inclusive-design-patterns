'use client';

import { TABS, type TabId } from './tabs';

export function Header({ progressLabel }: { progressLabel: string }) {
  return (
    <header className="border-b border-line bg-navy text-white">
      <div className="mx-auto flex max-w-chrome flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <span className="text-lg font-bold tracking-[0.14em]">AION</span>
        <span className="flex-1 text-[15px] leading-snug text-white/85">
          Module 6 · Inclusive Design Patterns — Neurodiversity in UX
        </span>
        <span
          className="rounded-full bg-white/12 px-3 py-1 text-[15px] text-white ring-1 ring-inset ring-white/25"
          aria-live="polite"
        >
          {progressLabel}
        </span>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-12 border-t border-line bg-navy text-white">
      <div className="mx-auto max-w-chrome px-4 py-5 text-[15px]">
        <p>AION UX Class · Module 6 · Inclusive Design Patterns</p>
        <p className="text-white/75">
          All cases are fictional and built for training.
        </p>
      </div>
    </footer>
  );
}

export function TabBar({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (tab: TabId) => void;
}) {
  return (
    <nav aria-label="Module sections" className="border-b border-line bg-white">
      <div className="mx-auto max-w-chrome px-2">
        <ul className="flex flex-wrap gap-1 py-2">
          {TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <li key={tab.id}>
                <a
                  href={`#${tab.id}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(event) => {
                    // Let modified clicks open a new tab as usual.
                    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
                    event.preventDefault();
                    onChange(tab.id);
                  }}
                  className={[
                    'flex items-center gap-2 rounded-md px-3 py-2 text-[15px] no-underline transition-colors',
                    isActive
                      ? 'bg-purple font-semibold text-white'
                      : 'text-navy hover:bg-lilac',
                  ].join(' ')}
                >
                  <span>{tab.label}</span>
                  {tab.marker === 'case' && (
                    <span
                      className={[
                        'rounded px-1.5 py-0.5 text-[11px] uppercase tracking-wide',
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#EFEFEF] text-[#5B5B5B]',
                      ].join(' ')}
                    >
                      Assessment case
                    </span>
                  )}
                  {tab.marker === 'practice' && (
                    <span
                      className={[
                        'rounded px-1.5 py-0.5 text-[11px] uppercase tracking-wide',
                        isActive ? 'bg-white/20 text-white' : 'bg-lilac text-purple',
                      ].join(' ')}
                    >
                      Practice
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export function TabIntro({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-navy">{title}</h1>
      <p className="mt-1 max-w-[70ch] text-ink70">{lead}</p>
      {children}
    </div>
  );
}
