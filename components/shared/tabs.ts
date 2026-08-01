export type TabId =
  | 'learn'
  | 'training'
  | 'studypath'
  | 'jobaccess'
  | 'lifeguide'
  | 'enterprise'
  | 'taskmap';

export interface TabDefinition {
  id: TabId;
  label: string;
  /** Small marker rendered in the tab bar. */
  marker?: 'practice' | 'case';
}

export const TABS: TabDefinition[] = [
  { id: 'learn', label: 'Learn', marker: 'practice' },
  { id: 'training', label: 'Training Ground', marker: 'practice' },
  { id: 'studypath', label: 'StudyPath', marker: 'case' },
  { id: 'jobaccess', label: 'JobAccess', marker: 'case' },
  { id: 'lifeguide', label: 'LifeGuide', marker: 'case' },
  { id: 'enterprise', label: 'Enterprise Context', marker: 'case' },
  { id: 'taskmap', label: 'Task Map' },
];

const TAB_IDS = new Set<string>(TABS.map((tab) => tab.id));

export function isTabId(value: string): value is TabId {
  return TAB_IDS.has(value);
}

export function tabFromHash(hash: string): TabId | null {
  const candidate = hash.replace(/^#/, '').trim().toLowerCase();
  return isTabId(candidate) ? candidate : null;
}
