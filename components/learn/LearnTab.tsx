'use client';

import { useState } from 'react';
import { TabIntro } from '@/components/shared/Chrome';
import { CategoryLegend } from '@/components/shared/CategoryChip';
import { L1Knowledge } from './L1Knowledge';
import { L2Application } from './L2Application';
import { L3Management } from './L3Management';

type SectionId = 'l1' | 'l2' | 'l3';

const SECTIONS: {
  id: SectionId;
  name: string;
  outcome: string;
  time: string;
}[] = [
  {
    id: 'l1',
    name: 'L1 — Knowledge',
    outcome:
      'Recognise and name neurodiverse barriers using the eight categories.',
    time: 'est. 10 min',
  },
  {
    id: 'l2',
    name: 'L2 — Application',
    outcome:
      'Turn identified barriers into prioritised inclusive measures and a test plan.',
    time: 'est. 12 min',
  },
  {
    id: 'l3',
    name: 'L3 — Management decision',
    outcome:
      'Steer neurodiverse UX as an architecture and governance question under constraints.',
    time: 'est. 10 min',
  },
];

export function LearnTab() {
  // One section open at a time.
  const [open, setOpen] = useState<SectionId | null>('l1');

  return (
    <div className="space-y-6">
      <TabIntro
        title="Learn"
        lead="Every concept here comes with something to move. Read the bullets as captions for the widget, not the other way round."
      />

      <CategoryLegend note="These labels are used identically in every tab. The German original is the wording from the source curriculum." />

      <div className="space-y-3">
        {SECTIONS.map((section) => {
          const isOpen = open === section.id;
          return (
            <section key={section.id} className="rounded-lg border border-line bg-white">
              <h2>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`section-${section.id}`}
                  onClick={() => setOpen(isOpen ? null : section.id)}
                  className="flex w-full flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg px-4 py-3 text-left transition-colors hover:bg-lilac"
                >
                  <span
                    aria-hidden="true"
                    className="text-[15px] font-bold text-purple"
                  >
                    {isOpen ? '▾' : '▸'}
                  </span>
                  <span className="text-[17px] font-bold text-navy">{section.name}</span>
                  <span className="flex-1 text-[15px] text-ink70">{section.outcome}</span>
                  <span className="text-[15px] text-ink70">{section.time}</span>
                </button>
              </h2>
              {isOpen && (
                <div id={`section-${section.id}`} className="border-t border-line bg-[#FBFAFD] p-4">
                  {section.id === 'l1' && <L1Knowledge />}
                  {section.id === 'l2' && <L2Application />}
                  {section.id === 'l3' && <L3Management />}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <p className="text-[15px] text-ink70">
        Related industry reference: WCAG POUR principles. This module grades on the
        eight categories above.
      </p>
    </div>
  );
}
