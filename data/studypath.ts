/**
 * StudyPath — fictional learning platform for professional development and
 * exam organisation. Supports Worksheet 1 (Level 1).
 *
 * Everything here is hard-coded and deterministic: every learner on every
 * device on every day sees byte-identical content. The `data-flaw-id` values
 * referenced in the components are for instructor verification only — they are
 * never rendered, styled, read by UI code, or announced.
 *
 * The flaw inventory (ID → category) lives in README.md and must not be shared
 * with learners before assessment.
 */

export interface HomeModule {
  title: string;
  meta: string;
  /** Numeric badge counter, where one is planted. */
  badge?: string;
  /** Accent colour, from the five competing accents planted on Home. */
  accent: string;
}

/** SP-01 — five competing accent colours on one screen. */
export const SP_ACCENTS = ['#C2185B', '#0277BD', '#EF6C00', '#2E7D32', '#6A1B9A'];

/** SP-01 / SP-02 — 14 modules, every card identical in size and weight. */
export const SP_MODULES: HomeModule[] = [
  { title: 'Project Management Basics', meta: 'Unit 4 of 9', accent: SP_ACCENTS[0], badge: '12' },
  { title: 'Data Protection Refresher', meta: 'Unit 1 of 6', accent: SP_ACCENTS[1] },
  { title: 'Presentation Techniques', meta: 'Unit 7 of 8', accent: SP_ACCENTS[2], badge: '4' },
  { title: 'Applied Statistics', meta: 'Unit 2 of 11', accent: SP_ACCENTS[3] },
  { title: 'Workplace Safety', meta: 'Unit 3 of 5', accent: SP_ACCENTS[4] },
  { title: 'Business English B2', meta: 'Unit 9 of 14', accent: SP_ACCENTS[0], badge: '7' },
  { title: 'Process Modelling', meta: 'Unit 1 of 7', accent: SP_ACCENTS[1] },
  { title: 'Quality Standards', meta: 'Unit 5 of 5', accent: SP_ACCENTS[2] },
  { title: 'Cost Accounting', meta: 'Unit 2 of 9', accent: SP_ACCENTS[3] },
  { title: 'Team Communication', meta: 'Unit 6 of 10', accent: SP_ACCENTS[4] },
  { title: 'Digital Documentation', meta: 'Unit 3 of 6', accent: SP_ACCENTS[0] },
  { title: 'Contract Fundamentals', meta: 'Unit 8 of 12', accent: SP_ACCENTS[1] },
  { title: 'Time Management', meta: 'Unit 1 of 4', accent: SP_ACCENTS[2] },
  { title: 'Exam Preparation', meta: 'Unit 4 of 7', accent: SP_ACCENTS[3] },
];

/** SP-02 — the same undifferentiated action label, repeated six times. */
export const SP_CONTINUE_INDEXES = [0, 2, 5, 7, 9, 13];

/** SP-01 — three banners stacked above the module grid. */
export const SP_BANNERS = [
  { text: 'Autumn term registration is open', accent: SP_ACCENTS[0] },
  { text: 'New: 42 additional units added this month', accent: SP_ACCENTS[2] },
  { text: 'Platform maintenance on 14.09 from 22:00', accent: SP_ACCENTS[1] },
];

/** SP-03 — three fixed slides, rotating every 5 seconds, no pause control. */
export const SP_ROTATOR_SLIDES = [
  'Refer a colleague and both of you receive a bonus unit',
  'Certificate templates have been updated for this term',
  'Live session on exam organisation — seats are limited',
];

/** SP-01 — two promotional tiles inside the same grid as real modules. */
export const SP_PROMO_TILES = [
  { title: 'Upgrade to StudyPath Plus', body: 'Unlimited units, priority support.' },
  { title: 'Invite your team', body: 'Group rates from five participants.' },
];

/** SP-11 — a status badge with no label, legend or tooltip. */
export const SP_STATUS_BADGE = 'Status: 3';

/** SP-04 / SP-05 — three courses, three navigation patterns, three names. */
export interface SpCourse {
  id: 'a' | 'b' | 'c';
  name: string;
  navPattern: 'sidebar' | 'toprow' | 'hamburger';
  /** SP-05 — the same function under three different names. */
  filesLabel: string;
  navItems: string[];
}

export const SP_COURSES: SpCourse[] = [
  {
    id: 'a',
    name: 'Course A — Project Management Basics',
    navPattern: 'sidebar',
    filesLabel: 'My Files',
    navItems: ['Overview', 'Units', 'My Files', 'Dates', 'Contact'],
  },
  {
    id: 'b',
    name: 'Course B — Applied Statistics',
    navPattern: 'toprow',
    filesLabel: 'Materials',
    navItems: ['Start', 'Materials', 'Schedule', 'Units', 'Help'],
  },
  {
    id: 'c',
    name: 'Course C — Business English B2',
    navPattern: 'hamburger',
    filesLabel: 'Downloads',
    navItems: ['Home', 'Lessons', 'Downloads', 'Calendar', 'Support'],
  },
];

/**
 * SP-06 — one 220-word paragraph, no headings, no lists, no paragraph breaks.
 * Rendered justified at 13px with a line height of 1.15.
 */
export const SP_DENSE_PARAGRAPH =
  'The completion of the module requires participation in all scheduled units as well as the submission of the associated documents within the applicable periods, whereby the periods are derived from the respective course configuration and may deviate between courses, which is why a separate examination of the configuration is necessary in each case, since a general statement about the applicable periods cannot be made here; furthermore it is pointed out that the provision of materials takes place at different times depending on the course, that the availability of the materials is not guaranteed for the entire duration of the module, and that a download of the materials is therefore advisable promptly, whereby responsibility for storage lies with the participants themselves; in addition, registration for the examination is to be carried out separately from registration for the course, the examination registration being subject to its own period which as a rule ends earlier than the course period, so that a registration for the examination after expiry of the examination registration period is not possible even if the course period has not yet expired; in the event of non-participation in the examination a re-registration in the subsequent period is required, whereby previously achieved partial performances may lose their validity depending on the configuration, which is why an early clarification is generally expedient.';

/** SP-07 — one long italic passage, set in the same low-contrast grey. */
export const SP_ITALIC_PASSAGE =
  'Please note that deviating provisions may result from the respective course configuration, from supplementary arrangements made with the course management, or from term-specific announcements, and that in the event of contradictions between these sources the more recently published provision applies, unless the earlier provision has been expressly designated as binding for the duration of the term.';

/** SP-08 — an instruction that cannot be acted on. */
export const SP_AMBIGUOUS_INSTRUCTION =
  'Complete your pending items where applicable prior to the applicable deadline.';

/** SP-09 — eleven required fields, presented at once, no grouping, no help. */
export interface SpField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel';
  /** Format-sensitive fields ship no example and no rule. */
  formatSensitive?: boolean;
}

export const SP_FORM_FIELDS: SpField[] = [
  { id: 'given-name', label: 'Given name', type: 'text' },
  { id: 'family-name', label: 'Family name', type: 'text' },
  { id: 'dob', label: 'Date of birth', type: 'text', formatSensitive: true },
  { id: 'participant-id', label: 'Participant reference', type: 'text', formatSensitive: true },
  { id: 'email', label: 'Email address', type: 'email' },
  { id: 'phone', label: 'Phone', type: 'tel' },
  { id: 'street', label: 'Street and house number', type: 'text' },
  { id: 'postcode', label: 'Postcode', type: 'text' },
  { id: 'city', label: 'City', type: 'text' },
  { id: 'employer', label: 'Employer', type: 'text' },
  { id: 'cost-centre', label: 'Cost centre', type: 'text' },
];

/** SP-10 — the only feedback a failed submit produces. */
export const SP_SUBMIT_ERROR = 'Error. Please check your entries.';
