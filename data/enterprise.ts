/**
 * Enterprise Context — a decision briefing surface for Task 4 (Level 3).
 *
 * No flaws are planted here and nothing is evaluated. Every field is fixed, so
 * the briefing reads identically for every learner on every device.
 */

export interface Surface {
  id: 'website' | 'portal' | 'app';
  name: string;
  primaryTask: string;
  monthlySessions: string;
  /** Drawn only from: feeling overwhelmed, lack of clarity, reading difficulty. */
  complaintThemes: string[];
  /** Fixed twelve-month ticket volume, rendered as a static sparkline. */
  ticketTrend: number[];
  accessibilityReview: string;
  technicalConstraint: string;
}

export const SURFACES: Surface[] = [
  {
    id: 'website',
    name: 'Website',
    primaryTask: 'Find a product or service and get in contact',
    monthlySessions: '1,850,000',
    complaintThemes: ['Feeling overwhelmed', 'Lack of clarity', 'Reading difficulty'],
    ticketTrend: [320, 305, 340, 360, 355, 380, 410, 425, 450, 470, 465, 500],
    accessibilityReview: 'Formally compliant (reviewed 03.2026)',
    technicalConstraint: 'Shared component library with the portal; changes ship to both.',
  },
  {
    id: 'portal',
    name: 'Customer Portal',
    primaryTask: 'Manage a contract, submit documents and track requests',
    monthlySessions: '640,000',
    complaintThemes: ['Lack of clarity', 'Reading difficulty', 'Feeling overwhelmed'],
    ticketTrend: [880, 905, 890, 940, 980, 1010, 1060, 1090, 1140, 1180, 1210, 1265],
    accessibilityReview: 'Formally compliant (reviewed 11.2025)',
    technicalConstraint: 'Legacy front-end; component upgrades require a migration step.',
  },
  {
    id: 'app',
    name: 'Mobile App',
    primaryTask: 'Check status and complete short tasks on the move',
    monthlySessions: '2,300,000',
    complaintThemes: ['Feeling overwhelmed', 'Reading difficulty', 'Lack of clarity'],
    ticketTrend: [210, 230, 225, 260, 280, 275, 300, 330, 345, 340, 370, 395],
    accessibilityReview: 'Formally compliant (reviewed 01.2026)',
    technicalConstraint: 'Separate release train; store review adds up to two weeks.',
  },
];

/** Framework conditions, reproduced from the curriculum. */
export const ENTERPRISE_CONSTRAINTS = [
  'Budget is limited.',
  'Stakeholders pursue different goals.',
  'Not all systems can be adapted simultaneously.',
  'Test data is patchy.',
  'Legal, reputational and quality requirements are relevant.',
  'First improvements must be visible quickly.',
  'Wrong decisions increase exclusion, support load and loss of trust.',
];
