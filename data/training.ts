/**
 * Training Ground practice items.
 *
 * Training Ground uses practice products only — MediBook, CityPass and
 * BookNest. It never uses StudyPath, JobAccess, LifeGuide or the Enterprise
 * Context surfaces, and it never reproduces one of their planted flaws, so
 * practising here cannot give away an assessment case.
 */

import type { CategoryId, ProfileId } from './categories';

export type ProductId = 'medibook' | 'citypass' | 'booknest';

export interface Product {
  id: ProductId;
  name: string;
  blurb: string;
}

export const PRODUCTS: Product[] = [
  { id: 'medibook', name: 'MediBook', blurb: 'Clinic appointment booking' },
  { id: 'citypass', name: 'CityPass', blurb: 'Public transport tickets' },
  { id: 'booknest', name: 'BookNest', blurb: 'Reading and e-library' },
];

export interface TrainingItem {
  id: string;
  product: ProductId;
  title: string;
  /** What the learner is asked to do with the element before judging it. */
  task: string;
  category: CategoryId;
  /** Reveal card: one sentence naming the barrier. */
  what: string;
  /** Reveal card: which profiles this strains. */
  who: ProfileId[];
  /** Label for the live-fix toggle's repaired state. */
  fixNote: string;
}

export const TRAINING_ITEMS: TrainingItem[] = [
  {
    id: 'mb-1',
    product: 'medibook',
    title: 'Choose a specialty',
    task: 'Pick the specialty you need from the chooser.',
    category: 'stimulus-load',
    what: 'Eighteen equally weighted chips and three live counters all compete for the same glance.',
    who: ['ADHD', 'Autism'],
    fixNote:
      'Grouped into four named areas, counters removed, one thing to read at a time.',
  },
  {
    id: 'mb-2',
    product: 'medibook',
    title: 'Book the appointment',
    task: 'Start the booking and try to reach the end.',
    category: 'task-clarity',
    what: 'The flow never says how many steps there are, and each step reveals new required questions.',
    who: ['ADHD', 'Autism'],
    fixNote: 'The step count is stated up front and does not change while you work.',
  },
  {
    id: 'mb-3',
    product: 'medibook',
    title: 'Confirm your details',
    task: 'Submit the details form.',
    category: 'error-tolerance',
    what: 'The only sign of a problem is a red border — no text, no name of the field, no way to know what is wrong.',
    who: ['ADHD', 'Autism', 'Dyslexia'],
    fixNote: 'The error names the field, states the rule, and gives an example.',
  },
  {
    id: 'mb-4',
    product: 'medibook',
    title: 'Existing appointment',
    task: 'Use the action on the appointment card.',
    category: 'comprehensibility',
    what: '"Manage" does not say what it does, and what it does is cancel the appointment.',
    who: ['Autism', 'Dyslexia'],
    fixNote: 'The label names the outcome, and the destructive action is separated out.',
  },
  {
    id: 'cp-1',
    product: 'citypass',
    title: 'Buy a single ticket',
    task: 'Step through the purchase.',
    category: 'predictability',
    what: 'The primary action changes both its position and its wording between the two steps.',
    who: ['Autism', 'ADHD'],
    fixNote: 'The primary action keeps one position and one wording throughout.',
  },
  {
    id: 'cp-2',
    product: 'citypass',
    title: 'Find your active ticket',
    task: 'Move between the three views and say where you are.',
    category: 'orientation',
    what: 'Three different views all carry the same title, so nothing tells you which one you are on.',
    who: ['Autism', 'ADHD'],
    fixNote: 'Each view names itself, and the current view is marked in the nav.',
  },
  {
    id: 'cp-3',
    product: 'citypass',
    title: 'Open display settings',
    task: 'Look for a way to make the app easier to read.',
    category: 'adaptability',
    what: 'There is a settings area, but nothing in it changes text size, motion or density.',
    who: ['Dyslexia', 'ADHD', 'Autism'],
    fixNote: 'Text size, reduced motion and a calmer layout become real, working options.',
  },
  {
    id: 'cp-4',
    product: 'citypass',
    title: 'Read the fare conditions',
    task: 'Read the conditions and find when the ticket expires.',
    category: 'readability',
    what: 'Conditions are set in tightly tracked capitals at 12px, which removes the word shapes people read by.',
    who: ['Dyslexia'],
    fixNote: 'Sentence case at a readable size, with the expiry pulled out as its own line.',
  },
  {
    id: 'bn-1',
    product: 'booknest',
    title: 'Read a book description',
    task: 'Read the description and decide whether to borrow the book.',
    category: 'readability',
    what: 'The description is centre-aligned across a very long measure, so every line starts somewhere new.',
    who: ['Dyslexia', 'ADHD'],
    fixNote: 'Left-aligned, short measure, so the eye finds the next line without hunting.',
  },
  {
    id: 'bn-2',
    product: 'booknest',
    title: 'Browse the shelves',
    task: 'Try to settle on one book from the shelves.',
    category: 'stimulus-load',
    what: 'A live activity ticker runs beside six shelves that all move on their own.',
    who: ['ADHD', 'Autism'],
    fixNote: 'Motion stops, the ticker goes, and one shelf is given the room.',
  },
  {
    id: 'bn-3',
    product: 'booknest',
    title: 'Return a loan',
    task: 'Return the borrowed book.',
    category: 'error-tolerance',
    what: 'The failure message says nothing about what happened, and there is no way to see whether the return went through.',
    who: ['ADHD', 'Autism', 'Dyslexia'],
    fixNote: 'The state is stated plainly and a retry is offered in place.',
  },
  {
    id: 'bn-4',
    product: 'booknest',
    title: 'Save a book for later',
    task: 'Save one book from each of the two shelves.',
    category: 'predictability',
    what: 'The same save function is a visible button on one shelf and a hidden menu on the next.',
    who: ['Autism', 'ADHD'],
    fixNote: 'One save control, in the same place, on every shelf.',
  },
];

export const LEVELS = [
  { name: 'Observer', minXp: 0 },
  { name: 'Analyst', minXp: 60 },
  { name: 'Inclusive Designer', minXp: 140 },
  { name: 'UX Architect', minXp: 220 },
] as const;

export const XP_PER_ITEM = 20;
