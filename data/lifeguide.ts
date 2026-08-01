/**
 * LifeGuide — fictional service portal for health, counselling and support
 * services. Supports Task 3 (Level 2).
 *
 * Hard-coded and deterministic. `data-flaw-id` values referenced in the
 * components exist for instructor verification only and are never rendered,
 * styled, read by UI code, or announced. The inventory lives in README.md.
 */

/** LG-02 — nine accent-coloured calls to action visible at once on Home. */
export const LG_ACCENTS = ['#00695C', '#AD1457', '#EF6C00', '#283593', '#558B2F'];

export const LG_HOME_CTAS = [
  'Book a consultation',
  'Find a counsellor',
  'Emergency contacts',
  'Apply for support',
  'Check your entitlement',
  'Download forms',
  'Ask a question',
  'Join a group',
  'Report a change',
];

/** LG-11 — a primary label that does not say what happens next. */
export const LG_PRIMARY_LABEL = 'Get started with your matters';

/** LG-01 — four zones of equal visual weight, no entry point ranked above another. */
export const LG_HOME_ZONES = [
  {
    id: 'emergency',
    title: 'Emergency information',
    items: [
      'Out-of-hours line: 0800 000 0000',
      'Crisis chat available 18:00–08:00',
      'Nearest walk-in centre: Ostplatz 4',
    ],
  },
  {
    id: 'news',
    title: 'News',
    items: [
      'Counselling hours extended from October',
      'New funding round for family support',
      'Office closed on 03.10',
    ],
  },
  {
    id: 'catalogue',
    title: 'Service catalogue',
    items: [
      'Health advice',
      'Debt counselling',
      'Family support',
      'Care coordination',
      'Housing assistance',
    ],
  },
  {
    id: 'campaign',
    title: 'Campaign',
    items: [
      'Winter wellbeing programme — register now',
      'Volunteer as a peer companion',
      'Share your experience with the service',
    ],
  },
];

/** Find Support — filter groups. LG-03 moves these after a filter is applied. */
export const LG_FILTERS = [
  { id: 'topic', label: 'Topic', options: ['Health', 'Finance', 'Family', 'Housing'] },
  { id: 'format', label: 'Format', options: ['In person', 'Phone', 'Online'] },
  { id: 'language', label: 'Language', options: ['German', 'English', 'Turkish'] },
];

/**
 * LG-05 — descriptions that are factually accurate and written in long
 * nominalised sentences (average 34 words), set at 13px with 1.2 line height.
 */
export const LG_RESULTS = [
  {
    id: 'r1',
    title: 'General health counselling',
    body: 'The provision of the counselling service is effectuated on the basis of an assessment of need, the determination of which is undertaken in a preliminary discussion, whereupon the allocation of an appointment is arranged.',
  },
  {
    id: 'r2',
    title: 'Debt counselling',
    body: 'Participation in the debt counselling programme presupposes the submission of documentation concerning income and liabilities, whereby the completeness of the documentation is a precondition for the commencement of the counselling relationship and its continuation.',
  },
  {
    id: 'r3',
    title: 'Family support coordination',
    body: 'The coordination of family support measures encompasses the identification of applicable entitlements, the establishment of contact with the responsible bodies, and the documentation of the measures undertaken over the duration of the support relationship.',
  },
  {
    id: 'r4',
    title: 'Housing assistance',
    body: 'Assistance in housing matters is made available where a demonstrable threat to the accommodation situation is present, the assessment of which is carried out by the responsible caseworker following an examination of the circumstances.',
  },
];

/** LG-06 / LG-07 — sixteen fields on one page, two of them format-sensitive. */
export interface LgField {
  id: string;
  label: string;
  /** Format-sensitive fields carry no rule until a submit has failed. */
  strictFormat?: string;
  /** LG-08 clears these three fields on a failed submit. */
  clearedOnFailure?: boolean;
}

export const LG_REQUEST_FIELDS: LgField[] = [
  { id: 'given-name', label: 'Given name' },
  { id: 'family-name', label: 'Family name' },
  { id: 'dob', label: 'Date of birth' },
  {
    id: 'case-reference',
    label: 'Case reference',
    strictFormat: 'Case reference must be two letters, a hyphen and six digits.',
  },
  { id: 'email', label: 'Email address' },
  { id: 'phone', label: 'Phone' },
  { id: 'street', label: 'Street' },
  { id: 'house-number', label: 'House number' },
  { id: 'postcode', label: 'Postcode' },
  { id: 'city', label: 'City' },
  { id: 'district', label: 'District' },
  {
    id: 'preferred-date',
    label: 'Preferred date',
    strictFormat: 'Preferred date must be entered as DD.MM.YYYY.',
  },
  { id: 'topic', label: 'Topic of the request', clearedOnFailure: true },
  { id: 'description', label: 'Description of the situation', clearedOnFailure: true },
  { id: 'previous-contact', label: 'Previous contact with the service', clearedOnFailure: true },
  { id: 'referrer', label: 'Referred by' },
];

/** LG-08 — the whole of the feedback a failed submit produces at the top. */
export const LG_SUBMIT_ERROR = 'Your request could not be processed.';

/** LG-09 — a timeout notice with no extend option. */
export const LG_TIMEOUT_NOTICE =
  'Session ends after 12 minutes without activity.';

/** Framework conditions, reproduced from the curriculum. */
export const LG_CONSTRAINTS = [
  'Budget: €175,000.',
  '14 weeks implementation time.',
  'A full relaunch is excluded.',
  'The platform must remain usable for broad user groups.',
  'Only limited test data across user groups exists.',
  'First prototypes are to be trialled at short notice.',
];
