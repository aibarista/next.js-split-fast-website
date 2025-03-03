export const meetTypeOptions = [
  { value: '0', label: 'Training Session' },
  { value: '1', label: 'Competition' },
];

export const ageGroupOptions = [
  { value: '0', label: 'U5' },
  { value: '1', label: 'U6' },
  { value: '2', label: 'U7' },
  { value: '3', label: 'U8' },
  { value: '4', label: 'U9' },
  { value: '5', label: 'U10' },
  { value: '6', label: 'U11' },
  { value: '7', label: 'U12' },
  { value: '8', label: 'U13' },
  { value: '9', label: 'U14-17' },
  { value: '10', label: 'U18' },
  { value: '11', label: 'U20' },
  { value: '13', label: 'Seniors' },
  { value: '14', label: 'Masters' },
];

export const multiLaneSprintEventOptions = [
  { value: '20', label: '60m' },
  { value: '21', label: '70m' },
  { value: '22', label: '100m' },
  { value: '24', label: '200m' },
  { value: '25', label: '400m' },
];

export const hurdleEventOptions = [
  { value: '29', label: '100mH', label2: '100mH Hurdles' },
  { value: '23', label: '110mH', label2: '100mH Hurdles' },
  { value: '26', label: '400mH', label2: '100mH Hurdles' },
];

export const relayEventOptions = [
  { value: '27', label: '4x70m' },
  { value: '28', label: '4x100m' },
  { value: '34', label: '4x200m' },
  { value: '35', label: '4x400m' },
];

export const groupDistanceEventOptions = [
  { value: '31', label: '800m' },
  { value: '32', label: '1500m' },
  { value: '33', label: '3000m' },
];

export const walkEventOptions = [
  { value: '41', label: '300m', label2: '300m Walk' },
  { value: '45', label: '500m', label2: '500m Walk' },
  { value: '42', label: '700m', label2: '700m Walk' },
  { value: '43', label: '1100m', label2: '1100m Walk' },
  { value: '44', label: '1500m', label2: '1500m Walk' },
];

export const sprintAgilityTrainingOptions = [
  { value: '1', label: 'Sprint' },
  { value: '2', label: 'Flying Start' },
  { value: '3', label: 'Shuttle' },
  { value: '4', label: 'Lap' },
  { value: '6', label: 'Agility' },
];

export const fieldEventOptions = [
  { value: '61', label: 'High Jump' },
  { value: '62', label: 'Long Jump' },
  { value: '63', label: 'Triple Jump' },
  { value: '64', label: 'Discus' },
  { value: '65', label: 'Javelin' },
  { value: '66', label: 'Shot Put' },
];

export const statusOptions = [
  { value: 'Draft', label: 'Draft' },
  { value: 'Upcoming', label: 'Upcoming' },
  { value: 'Complete', label: 'Completed' },
];

/**
 * Configuration for displaying meet details on the "Show Meet" page.
 *
 * This array defines the settings used to render detailed information about a meet.
 * Each configuration object specifies the key from the meet data and the corresponding
 * label to display on the page.
 *
 * @type {Config[]}
 * @example
 * // Sample meet data:
 * const meet = {
 *   meetType: "Regional",
 *   meetStatus: "Scheduled",
 *   location: "Central Stadium",
 *   ageGroups: ["U12", "U14", "U16"],
 *   eventTypes: ["100m", "200m", "High Jump"],
 * };
 *
 * // Using `meetDetailConfig` to display:
 * meetDetailConfig.forEach(({ key, label }) => {
 *   console.log(`${label}: ${meet[key]}`);
 * });
 * // Output:
 * // Type: Regional
 * // Status: Scheduled
 * // Location: Central Stadium
 * // Age groups: U12,U14,U16
 * // Events: 100m,200m,High Jump
 */
export const meetDetailConfig = [
  { key: 'meetType', label: 'Type' },
  { key: 'meetStatus', label: 'Status' },
  { key: 'location', label: 'Location' },
  { key: 'ageGroups', label: 'Age groups' },
  { key: 'eventTypes', label: 'Events' },
];
