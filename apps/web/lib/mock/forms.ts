export type FormStatus = 'published' | 'draft' | 'archived';
export type FormVisibility = 'public' | 'unlisted';

export type FormField = {
  id: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'rating' | 'date' | 'long-text';
  label: string;
  required: boolean;
  helpText?: string;
  options?: string[];
  placeholder?: string;
};

export type FormPage = {
  id: string;
  title: string;
  fields: FormField[];
};

export type Form = {
  id: string;
  name: string;
  slug: string | null;
  status: FormStatus;
  visibility: FormVisibility | null;
  fieldsCount: number;
  responses: number;
  responsesDelta?: number;
  responseLimit?: number;
  lastEdited: string;
  locked?: boolean;
  closesAt?: string;
  description?: string;
  pages?: FormPage[];
};

export const forms: Form[] = [
  {
    id: 'cf-q4-2026',
    name: 'Customer feedback — Q4',
    slug: 'cf-q4-2026',
    status: 'published',
    visibility: 'public',
    fieldsCount: 12,
    responses: 247,
    responsesDelta: 14,
    lastEdited: '2 days ago',
    description: 'Quarterly product feedback from active customers.',
  },
  {
    id: 'beta',
    name: 'Beta waitlist signup',
    slug: 'beta',
    status: 'published',
    visibility: 'public',
    fieldsCount: 4,
    responses: 1204,
    responsesDelta: 87,
    lastEdited: '5 days ago',
    description: 'Early access list for the upcoming AI templates release.',
  },
  {
    id: 'jobs-sd-26',
    name: 'Job application — Senior Designer',
    slug: 'jobs-sd-26',
    status: 'published',
    visibility: 'unlisted',
    fieldsCount: 9,
    responses: 18,
    lastEdited: '1 week ago',
    description: 'Open role on the brand & product design team.',
  },
  {
    id: 'onboarding-survey',
    name: 'Product onboarding survey',
    slug: null,
    status: 'draft',
    visibility: null,
    fieldsCount: 0,
    responses: 0,
    lastEdited: '1 hour ago',
  },
  {
    id: 'eng-pulse-q4',
    name: 'Engineering pulse — Q4',
    slug: 'eng-pulse-q4',
    status: 'published',
    visibility: 'unlisted',
    fieldsCount: 8,
    responses: 34,
    lastEdited: '3 weeks ago',
    locked: true,
    description: 'Quarterly mood check for the engineering org.',
  },
  {
    id: 'openhouse',
    name: 'Event RSVP — Studio Open House',
    slug: 'openhouse',
    status: 'published',
    visibility: 'public',
    fieldsCount: 6,
    responses: 89,
    responseLimit: 150,
    lastEdited: '2 weeks ago',
    closesAt: 'Dec 8',
    description: 'RSVP for the winter studio open house event.',
  },
  {
    id: 'newsletter-2025',
    name: 'Newsletter signup',
    slug: 'newsletter-2025',
    status: 'archived',
    visibility: 'public',
    fieldsCount: 3,
    responses: 412,
    lastEdited: '2 months ago',
  },
];

export const recentForms = forms.filter((f) => f.status !== 'archived').slice(0, 3);

export const workspaceStats = {
  activeForms: 7,
  activeFormsDelta: 2,
  responses: 1592,
  responsesDelta: 18.4,
  completion: 78,
  completionDelta: -2.1,
  avgTime: '2:14',
};

export function statusDotColor(status: FormStatus) {
  if (status === 'published') return 'bg-success';
  if (status === 'draft') return 'bg-amber';
  return 'bg-muted-2';
}