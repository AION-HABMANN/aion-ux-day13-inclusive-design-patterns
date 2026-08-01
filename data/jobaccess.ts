/**
 * JobAccess — fictional platform for applications, further training and career
 * planning. Supports Worksheet 2 (Level 1).
 *
 * This tab is a variant comparator, not a flaw hunt: the same content blocks,
 * the same form and the same navigation are rendered three ways. Nothing here
 * ranks, scores or endorses a variant — Worksheet 2 does the evaluating.
 *
 * All content is hard-coded and identical across variants.
 */

export interface JaBlock {
  id: string;
  title: string;
  /** Standard copy, used by variants A and B and by C when not simplified. */
  body: string;
  /** Pre-written plain-language copy, used only by Variant C's simplified view. */
  plainBody: string;
  /** Secondary blocks are the ones Variant C's simplified view hides. */
  secondary: boolean;
  detail: string;
}

export const JA_NAV = ['Dashboard', 'Applications', 'Training', 'Documents', 'Profile'];

export const JA_BLOCKS: JaBlock[] = [
  {
    id: 'applications',
    title: 'Your applications',
    body: 'Four applications are currently in progress. Two of them are awaiting a response from the organisation, one requires a document to be added, and one has been scheduled for an interview on 18.09.',
    plainBody: 'You have 4 applications. 1 needs a document from you. 1 has an interview on 18 September.',
    secondary: false,
    detail:
      'Each application shows its status, the date it was sent, and what is expected from you next.',
  },
  {
    id: 'open-roles',
    title: 'Open roles',
    body: 'Twenty-eight roles match the fields you selected in your profile. Eleven of these were published in the last seven days, and six of them accept applications without a formal reference letter.',
    plainBody: '28 roles match your profile. 11 are new this week.',
    secondary: false,
    detail: 'Roles are listed with the employer, the location and the closing date.',
  },
  {
    id: 'training',
    title: 'Training and further education',
    body: 'Nine courses are available in your region this quarter, of which four are funded and can be booked without an employer confirmation. Registration periods differ between providers.',
    plainBody: '9 courses are available this quarter. 4 are funded.',
    secondary: false,
    detail: 'Each course shows the provider, the dates, the cost and how to register.',
  },
  {
    id: 'career-plan',
    title: 'Career plan',
    body: 'Your plan contains three goals with a combined horizon of eighteen months. Progress against each goal is derived from the activities recorded in your account since the plan was created.',
    plainBody: 'Your plan has 3 goals for the next 18 months.',
    secondary: true,
    detail: 'Goals can be edited, paused or replaced at any time.',
  },
  {
    id: 'documents',
    title: 'Documents',
    body: 'Seven documents are stored in your account. Two of them are older than twelve months and may need to be renewed before they can be attached to a new application.',
    plainBody: 'You have 7 documents. 2 are more than a year old.',
    secondary: true,
    detail: 'Documents can be attached to an application from this list.',
  },
  {
    id: 'messages',
    title: 'Messages and deadlines',
    body: 'You have five unread messages and two deadlines within the next fourteen days. Deadlines relate to a funding confirmation and to a document that must be submitted before an interview.',
    plainBody: 'You have 5 unread messages and 2 deadlines in the next 2 weeks.',
    secondary: true,
    detail: 'Messages from organisations and from your adviser arrive here.',
  },
];

export interface JaField {
  id: string;
  label: string;
  hint: string;
  plainHint: string;
}

export const JA_FORM_FIELDS: JaField[] = [
  {
    id: 'target-role',
    label: 'Target role',
    hint: 'Specification of the occupational designation to which your search shall be oriented.',
    plainHint: 'What job are you looking for?',
  },
  {
    id: 'region',
    label: 'Region',
    hint: 'Indication of the geographical area within which employment is being sought.',
    plainHint: 'Where do you want to work?',
  },
  {
    id: 'availability',
    label: 'Available from',
    hint: 'Date as of which the commencement of an employment relationship is possible.',
    plainHint: 'When can you start? Use the form DD.MM.YYYY.',
  },
];

/** Framework conditions, reproduced from the curriculum. */
export const JA_CONSTRAINTS = [
  'Very heterogeneous target group.',
  'The company wants to appear modern, inclusive and professional.',
  'Limited budget for technical development.',
  'Release in 12 weeks.',
  'Legal and reputational requirements are relevant.',
  'No data from neurodiversity-specific user tests yet.',
];

export const JA_VARIANTS = [
  { id: 'a', label: 'Variant A', descriptor: 'modern and compact' },
  { id: 'b', label: 'Variant B', descriptor: 'clear and calm' },
  { id: 'c', label: 'Variant C', descriptor: 'structured plus options' },
] as const;

export type JaVariantId = (typeof JA_VARIANTS)[number]['id'];

/** Stated as a fact in Variant C only, never as a verdict. */
export const JA_MODES_NOTE =
  'Optional modes require additional build and test effort.';
