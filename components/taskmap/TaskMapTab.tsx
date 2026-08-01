'use client';

import { TabIntro } from '@/components/shared/Chrome';
import type { TabId } from '@/components/shared/tabs';

const ROWS: {
  task: string;
  level: string;
  tab: string;
  tabId: TabId;
  learn: string;
  time: string;
}[] = [
  {
    task: 'Worksheet 1',
    level: 'L1 Knowledge',
    tab: 'StudyPath',
    tabId: 'studypath',
    learn: 'Learn → L1 (W1–W5)',
    time: '25 min',
  },
  {
    task: 'Worksheet 2',
    level: 'L1 Knowledge',
    tab: 'JobAccess',
    tabId: 'jobaccess',
    learn: 'Learn → L1 + W6, W10',
    time: '25 min',
  },
  {
    task: 'Task 3',
    level: 'L2 Application',
    tab: 'LifeGuide',
    tabId: 'lifeguide',
    learn: 'Learn → L2 (W6–W9)',
    time: '45 min',
  },
  {
    task: 'Task 4',
    level: 'L3 Management',
    tab: 'Enterprise Context',
    tabId: 'enterprise',
    learn: 'Learn → L3 (W10–W13)',
    time: '45 min',
  },
];

export function TaskMapTab({ onOpenTab }: { onOpenTab: (tab: TabId) => void }) {
  return (
    <div className="space-y-4">
      <TabIntro
        title="Task Map"
        lead="Which tab each graded task points at, and which part of Learn supports it."
      />

      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[680px] border-collapse text-[15px]">
          <thead className="bg-lilac">
            <tr>
              <th scope="col" className="p-3 text-left text-navy">Task</th>
              <th scope="col" className="p-3 text-left text-navy">Level</th>
              <th scope="col" className="p-3 text-left text-navy">Which tab to use</th>
              <th scope="col" className="p-3 text-left text-navy">
                Which Learn section supports it
              </th>
              <th scope="col" className="p-3 text-left text-navy">Est. time</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.task} className="border-t border-line">
                <th scope="row" className="p-3 text-left font-semibold text-navy">
                  {row.task}
                </th>
                <td className="p-3 text-ink70">{row.level}</td>
                <td className="p-3">
                  <button
                    type="button"
                    className="font-semibold text-purple underline"
                    onClick={() => onOpenTab(row.tabId)}
                  >
                    {row.tab}
                  </button>
                </td>
                <td className="p-3 text-ink70">{row.learn}</td>
                <td className="p-3 text-ink70">{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[15px] text-ink70">
        Training Ground is optional practice. It uses different products on purpose, so
        it never gives away the cases above.
      </p>
    </div>
  );
}
