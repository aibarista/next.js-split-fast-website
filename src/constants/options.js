export const GENDER_OPTIONS = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
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
