export const GENDER_OPTIONS = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
];

export const EVENT_GENDER_OPTIONS = [
  { value: 'Boys', label: 'Boys' },
  { value: 'Girls', label: 'Girls' },
  { value: 'Mixed', label: 'Mixed' },
  { value: 'Men', label: 'Men' },
  { value: 'Women', label: 'Women' },
];

export const USER_PERMISSIONS = [
  {
    value: 'Admin',
    label: 'Administrator',
    text: 'An administrator can manage members and create and edit meets and results',
  },
  {
    value: 'Official',
    label: 'Official',
    text: 'An official can view and edit results, but cannot edit member profiles',
  },
  {
    value: 'Member',
    label: 'Member',
    text: 'A member can view results and meets, but cannot edit content',
  },
];

export const CSV_FORMAT_OPTIONS = [
  { value: 'sf_csv', label: 'SplitFast CSV' },
  { value: 'rhq_excel', label: 'ResultsHQ' },
  { value: 'sport80_csv', label: 'Sport:80' },
];
