/**
 * The eight graded categories. These labels are the module's assessment
 * taxonomy: they must be used verbatim everywhere in the app. The German
 * original is carried alongside because the source curriculum is German and
 * each tab shows it in brackets on first appearance.
 *
 * Each category owns one fixed chip colour, derived from the AION palette.
 * The same colour is used for a category in every tab.
 */

export type CategoryId =
  | 'stimulus-load'
  | 'orientation'
  | 'readability'
  | 'predictability'
  | 'task-clarity'
  | 'comprehensibility'
  | 'error-tolerance'
  | 'adaptability';

export type ProfileId = 'ADHD' | 'Autism' | 'Dyslexia';

export interface Category {
  id: CategoryId;
  /** Graded English label. Never substitute a synonym. */
  label: string;
  /** German original from the source curriculum. */
  de: string;
  /** Fixed chip colours (background / text / border). */
  chip: { bg: string; fg: string; border: string };
  /** One-line meaning, used by the Learn taxonomy drill. */
  definition: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'stimulus-load',
    label: 'Stimulus Load',
    de: 'Reizbelastung',
    chip: { bg: '#5624D0', fg: '#FFFFFF', border: '#5624D0' },
    definition:
      'How much competes for attention at the same moment on one surface.',
  },
  {
    id: 'orientation',
    label: 'Orientation',
    de: 'Orientierung',
    chip: { bg: '#231A45', fg: '#FFFFFF', border: '#231A45' },
    definition:
      'Whether people can tell where they are, where they came from and where things live.',
  },
  {
    id: 'readability',
    label: 'Readability',
    de: 'Lesbarkeit',
    chip: { bg: '#EEE9F9', fg: '#231A45', border: '#5624D0' },
    definition:
      'Whether the typography and text shape let the eye move through the text without effort.',
  },
  {
    id: 'predictability',
    label: 'Predictability',
    de: 'Vorhersagbarkeit',
    chip: { bg: '#DDD6EE', fg: '#231A45', border: '#231A45' },
    definition:
      'Whether the same pattern behaves the same way each time it appears.',
  },
  {
    id: 'task-clarity',
    label: 'Task Clarity',
    de: 'Aufgabenklarheit / Aufgabenstruktur',
    chip: { bg: '#1E8E5A', fg: '#FFFFFF', border: '#1E8E5A' },
    definition:
      'Whether it is obvious what to do next, in what order, and how long it will take.',
  },
  {
    id: 'comprehensibility',
    label: 'Comprehensibility',
    de: 'Verständlichkeit',
    chip: { bg: '#F3F0FB', fg: '#231A45', border: '#4A4362' },
    definition:
      'Whether the wording carries a single, unambiguous meaning on first reading.',
  },
  {
    id: 'error-tolerance',
    label: 'Error Tolerance',
    de: 'Fehlertoleranz',
    chip: { bg: '#B45309', fg: '#FFFFFF', border: '#B45309' },
    definition:
      'Whether a mistake can be located, understood and repaired without losing work.',
  },
  {
    id: 'adaptability',
    label: 'Adaptability',
    de: 'Anpassbarkeit',
    chip: { bg: '#4A4362', fg: '#FFFFFF', border: '#4A4362' },
    definition:
      'Whether people can shift the surface towards how they personally read and focus.',
  },
];

export const CATEGORY_BY_ID: Record<CategoryId, Category> = CATEGORIES.reduce(
  (acc, category) => {
    acc[category.id] = category;
    return acc;
  },
  {} as Record<CategoryId, Category>,
);

export function categoryLabel(id: CategoryId): string {
  return CATEGORY_BY_ID[id].label;
}

/** "Stimulus Load [Reizbelastung]" — the first-appearance form used per tab. */
export function categoryLabelWithGerman(id: CategoryId): string {
  const category = CATEGORY_BY_ID[id];
  return `${category.label} [${category.de}]`;
}
