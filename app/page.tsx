'use client';

import { useCallback, useEffect } from 'react';
import { Footer, Header, TabBar } from '@/components/shared/Chrome';
import { useLocalStorage } from '@/components/shared/useLocalStorage';
import { tabFromHash, type TabId } from '@/components/shared/tabs';
import { LearnTab } from '@/components/learn/LearnTab';
import { TrainingGroundTab } from '@/components/training/TrainingGroundTab';
import { StudyPathCase } from '@/components/cases/StudyPathCase';
import { JobAccessCase } from '@/components/cases/JobAccessCase';
import { LifeGuideCase } from '@/components/cases/LifeGuideCase';
import { EnterpriseContextCase } from '@/components/cases/EnterpriseContextCase';
import { TaskMapTab } from '@/components/taskmap/TaskMapTab';
import { useTrainingProgress } from '@/components/training/useTrainingProgress';

export default function Page() {
  const [tab, setTab] = useLocalStorage<TabId>('active-tab', 'learn');
  const progress = useTrainingProgress();

  // The URL hash wins on load, so an instructor can deep-link a tab.
  useEffect(() => {
    const fromHash = tabFromHash(window.location.hash);
    if (fromHash) setTab(fromHash);

    const onHashChange = () => {
      const next = tabFromHash(window.location.hash);
      if (next) setTab(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeTab = useCallback(
    (next: TabId) => {
      setTab(next);
      if (window.location.hash !== `#${next}`) {
        window.history.replaceState(null, '', `#${next}`);
      }
      window.scrollTo({ top: 0 });
    },
    [setTab],
  );

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <Header progressLabel={progress.progressLabel} />
      <TabBar active={tab} onChange={changeTab} />
      <main id="main" className="mx-auto w-full max-w-chrome flex-1 px-4 py-6">
        {tab === 'learn' && <LearnTab />}
        {tab === 'training' && <TrainingGroundTab progress={progress} />}
        {tab === 'studypath' && <StudyPathCase />}
        {tab === 'jobaccess' && <JobAccessCase />}
        {tab === 'lifeguide' && <LifeGuideCase />}
        {tab === 'enterprise' && <EnterpriseContextCase />}
        {tab === 'taskmap' && <TaskMapTab onOpenTab={changeTab} />}
      </main>
      <Footer />
    </div>
  );
}
