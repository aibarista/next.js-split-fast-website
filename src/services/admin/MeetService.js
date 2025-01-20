import {
  ageGroupOptions,
  fieldEventOptions,
  groupDistanceEventOptions,
  hurdleEventOptions,
  multiLaneSprintEventOptions,
  relayEventOptions,
  sprintAgilityTrainingOptions,
  statusOptions,
  walkEventOptions,
} from 'config/admin/meet';

/**
 * Transforms a meet object into a detailed format for display or processing.
 *
 * This function takes a meet object, converts its properties to more user-friendly formats, and adds derived fields.
 * Specifically, it maps `meetType` to a human-readable string, and formats `ageGroups` and `eventTypes` as comma-separated lists.
 *
 * @param {Meet} meet - The meet object with the following properties:
 *   - {number} meetType - The type of the meet (0 for training, 1 for competition). (typeof: number)
 *   - {Array<number>} ageGroups - An array of age group IDs. (typeof: Array<number>)
 *   - {Array<number>} eventTypes - An array of event type IDs. (typeof: Array<number>)
 *
 * @returns {MeetDetail} - A new meet object containing the following properties:
 *   - All original meet properties.
 *   - {string} meetType - A string representing the meet type ('Training' or 'Competition').
 *   - {string} ageGroups - A comma-separated string of age group labels.
 *   - {string} eventTypes - A comma-separated string of event type labels.
 */
export const generateMeetDetail = (meet) => {
  return {
    ...meet,
    meetType: meet.meetType === 0 ? 'Training' : 'Competition',
    ageGroups: getAgeGroupLabel(meet.ageGroups).join(', '),
    eventTypes: getEventTypeLabel(meet.eventTypes).join(', '),
  };
};

/**
 * Converts a comma-separated string of age group IDs into their corresponding labels.
 *
 * This function takes a string of age group IDs, splits it into an array, and maps each ID to its label using
 * the `ageGroupOptions` array. If an ID does not have a matching label, it is ignored.
 *
 * @param {string} ageGroups - A comma-separated string of age group IDs (e.g., "1,2,3").
 * @returns {Array<string>} - An array of age group labels corresponding to the provided IDs.
 *
 * Example:
 * Input: "1,2,3"
 * Output: ["Under 18", "Adult", "Senior"] (Assuming these are the labels in `ageGroupOptions`.)
 *
 * Assumptions:
 * - `ageGroupOptions` is an array of objects where each object contains:
 *   - {string} value - The ID of the age group.
 *   - {string} label - The corresponding label for the age group.
 */
export const getAgeGroupLabel = (ageGroups) => {
  const ageGroupLabels = [];

  ageGroups.split(',').forEach((ageGroup) => {
    const option = ageGroupOptions.find((option) => option.value === ageGroup);

    if (option) {
      ageGroupLabels.push(option.label);
    }
  });

  return ageGroupLabels;
};

/**
 * Converts event type IDs into their corresponding labels based on predefined options.
 *
 * This function takes a string of event type IDs and determines their labels using various predefined option arrays.
 * The labels are accumulated into the `eventTypeLabels` array and returned.
 *
 * @param {string} eventTypes - A comma-separated string of event type IDs (e.g., "101,202,303").
 * @returns {Array<string>} - An array of event type labels corresponding to the provided IDs.
 *
 * Example:
 * Input: "101,202"
 * Output: ["100m Sprint", "400m Hurdles"] (Assuming these IDs match the labels in the option arrays.)
 *
 * How It Works:
 * - Uses the helper function `pushEventTypeLabel` to match IDs from the `eventTypes` string against multiple
 *   predefined option arrays, including:
 *   - `multiLaneSprintEventOptions`
 *   - `hurdleEventOptions`
 *   - `relayEventOptions`
 *   - `groupDistanceEventOptions`
 *   - `walkEventOptions`
 *   - `sprintAgilityTrainingOptions`
 *   - `fieldEventOptions`
 *   - `statusOptions`
 * - Accumulates all matched labels into `eventTypeLabels` and returns it.
 *
 * Assumptions:
 * - Each option array is an array of objects where:
 *   - {string} value - The event type ID.
 *   - {string} label - The corresponding event type label.
 * - The `pushEventTypeLabel` function properly handles matching IDs and appending labels to the array.
 */

export const getEventTypeLabel = (eventTypes) => {
  const eventTypeLabels = [];

  pushEventTypeLabel(eventTypes, eventTypeLabels, multiLaneSprintEventOptions);
  pushEventTypeLabel(eventTypes, eventTypeLabels, hurdleEventOptions);
  pushEventTypeLabel(eventTypes, eventTypeLabels, relayEventOptions);
  pushEventTypeLabel(eventTypes, eventTypeLabels, groupDistanceEventOptions);
  pushEventTypeLabel(eventTypes, eventTypeLabels, walkEventOptions);
  pushEventTypeLabel(eventTypes, eventTypeLabels, sprintAgilityTrainingOptions);
  pushEventTypeLabel(eventTypes, eventTypeLabels, fieldEventOptions);
  pushEventTypeLabel(eventTypes, eventTypeLabels, statusOptions);

  return eventTypeLabels;
};

/**
 * Matches event type IDs with their corresponding labels and appends them to an array.
 *
 * This helper function takes a string of event type IDs, splits it into individual IDs,
 * and matches each ID against a provided set of event options. For each match, the corresponding
 * label is added to the `eventTypeLabels` array.
 *
 * @param {string} eventTypes - A comma-separated string of event type IDs (e.g., "101,202,303").
 * @param {Array<string>} eventTypeLabels - The array to which matched labels will be appended.
 * @param {Option[]} eventOptions - An array of objects representing event options,
 *   where each object contains:
 *   - {string} value: The event type ID.
 *   - {string} label: The corresponding event type label.
 *
 * Example:
 * Input:
 *   eventTypes: "101,202"
 *   eventTypeLabels: []
 *   eventOptions: [
 *     { value: "101", label: "100m Sprint" },
 *     { value: "202", label: "400m Hurdles" },
 *   ]
 * Output:
 *   eventTypeLabels: ["100m Sprint", "400m Hurdles"]
 *
 * How It Works:
 * - Splits the `eventTypes` string by commas to get individual event type IDs.
 * - Iterates over each ID and finds the corresponding object in `eventOptions` where the `value` matches the ID.
 * - If a match is found, its `label` is added to the `eventTypeLabels` array.
 *
 * Assumptions:
 * - `eventTypes` is a valid, comma-separated string of event type IDs.
 * - `eventOptions` contains unique mappings of `value` to `label`.
 */
export const pushEventTypeLabel = (
  eventTypes,
  eventTypeLabels,
  eventOptions
) => {
  eventTypes.split(',').forEach((eventType) => {
    const option = eventOptions.find((option) => option.value === eventType);

    if (option) {
      eventTypeLabels.push(option.label);
    }
  });
};

/**
 * Transforms a meet object into a formatted form data object.
 *
 * This function prepares the meet data for use in a form by extracting and formatting
 * relevant fields from the provided `meet` object. It handles splitting date, time,
 * and event types into structured properties suitable for form submission or UI rendering.
 *
 * @param {Meet} meet - The meet object containing raw data, including the following fields:
 *   - {string} meetName: The name of the meet.
 *   - {string} meetDate: The date and time of the meet in ISO format (e.g., "2024-12-30T14:30:00").
 *   - {string} [timeZone]: The time zone of the meet (e.g., "UTC").
 *   - {string} [description]: A description of the meet.
 *   - {number} meetType: The type of the meet (e.g., 0 for Training, 1 for Competition).
 *   - {string} location: The location of the meet.
 *   - {string} [ageGroups]: Comma-separated age groups (e.g., "U10,U12").
 *   - {string} eventTypes: Comma-separated event type IDs (e.g., "20,23,41").
 *   - {string} meetStatus: The current status of the meet (e.g., "Scheduled").
 *
 * @returns {MeetFormData} A formatted form data object containing:
 *   - {string} meetName: The name of the meet.
 *   - {string} date: The date of the meet (e.g., "2024-12-30").
 *   - {string} time: The time of the meet (e.g., "14:30").
 *   - {Object} timezone: An object with `id` and `displayName` for the time zone.
 *   - {string} description: The meet description.
 *   - {string} meetType: The type of the meet as a string (e.g., "0").
 *   - {string} location: The location of the meet.
 *   - {Array<string>} ageGroups: An array of age group IDs.
 *   - {Array<string>} multiLaneEvents: Event type IDs for multi-lane events.
 *   - {Array<string>} hurdleEvents: Event type IDs for hurdle events.
 *   - {Array<string>} relayEvents: Event type IDs for relay events.
 *   - {Array<string>} groupDistanceEvents: Event type IDs for group distance events.
 *   - {Array<string>} walkEvents: Event type IDs for walk events.
 *   - {Array<string>} sprintAgilityTraining: Event type IDs for sprint/agility training.
 *   - {Array<string>} fieldEvents: Event type IDs for field events.
 *   - {string} meetStatus: The current status of the meet.
 *
 * Example:
 * Input:
 *   meet = {
 *     meetName: "Annual Sprint Meet",
 *     meetDate: "2024-12-30T14:30:00",
 *     timeZone: "UTC",
 *     description: "End-of-year competition",
 *     meetType: 1,
 *     location: "Main Stadium",
 *     ageGroups: "U10,U12",
 *     eventTypes: "20,23,41,61",
 *     meetStatus: "Scheduled"
 *   }
 * Output:
 *   {
 *     meetName: "Annual Sprint Meet",
 *     date: "2024-12-30",
 *     time: "14:30",
 *     timezone: { id: "UTC", displayName: "UTC" },
 *     description: "End-of-year competition",
 *     meetType: "1",
 *     location: "Main Stadium",
 *     ageGroups: ["U10", "U12"],
 *     multiLaneEvents: ["20"],
 *     hurdleEvents: ["23"],
 *     relayEvents: [],
 *     groupDistanceEvents: [],
 *     walkEvents: ["41"],
 *     sprintAgilityTraining: [],
 *     fieldEvents: ["61"],
 *     meetStatus: "Scheduled"
 *   }
 */
export const getMeetFormData = (meet) => {
  return {
    meetName: meet.meetName,
    date: meet.meetDate.split('T')[0],
    time: `${meet.meetDate.split('T')[1].split(':')[0]}:${meet.meetDate.split('T')[1].split(':')[1]}`,
    timezone: meet.timeZone
      ? { id: meet.timeZone, displayName: meet.timeZone }
      : { id: 'UTC', displayName: 'UTC' },
    description: meet.description,
    meetType: meet.meetType.toString(),
    location: meet.location,
    ageGroups:
      !meet.ageGroups || meet.ageGroups === '' ? [] : meet.ageGroups.split(','),
    multiLaneEvents: meet.eventTypes
      .split(',')
      .filter(
        (item) =>
          !!multiLaneSprintEventOptions.find((option) => option.value === item)
      ),
    hurdleEvents: meet.eventTypes
      .split(',')
      .filter(
        (item) => !!hurdleEventOptions.find((option) => option.value === item)
      ),
    relayEvents: meet.eventTypes
      .split(',')
      .filter(
        (item) => !!relayEventOptions.find((option) => option.value === item)
      ),
    groupDistanceEvents: meet.eventTypes
      .split(',')
      .filter(
        (item) =>
          !!groupDistanceEventOptions.find((option) => option.value === item)
      ),
    walkEvents: meet.eventTypes
      .split(',')
      .filter(
        (item) => !!walkEventOptions.find((option) => option.value === item)
      ),
    sprintAgilityTraining: meet.eventTypes
      .split(',')
      .filter(
        (item) =>
          !!sprintAgilityTrainingOptions.find((option) => option.value === item)
      ),
    fieldEvents: meet.eventTypes
      .split(',')
      .filter(
        (item) => !!fieldEventOptions.find((option) => option.value === item)
      ),
    meetStatus: meet.meetStatus,
  };
};

/**
 * Transforms form data into a formatted meet request object for submission.
 *
 * This function converts meet form data into a structured object suitable
 * for backend API requests. It formats date and time, combines event types,
 * and prepares the necessary fields for the request payload.
 *
 * @param {MeetFormData} meetFormData - The form data object containing:
 *   - {string} meetName: The name of the meet.
 *   - {'0' | '1'} meetType: The type of the meet as a string (e.g., "0" for Training, "1" for Competition).
 *   - {string} date: The date of the meet (e.g., "2024-12-30").
 *   - {string} time: The time of the meet (e.g., "14:30").
 *   - {Object} timezone: An object with `id` and `displayName` for the time zone.
 *   - {string} location: The location of the meet.
 *   - {string} description: A description of the meet.
 *   - {string} meetStatus: The current status of the meet (e.g., "Scheduled").
 *   - {Array<string>} ageGroups: An array of age group IDs.
 *   - {Array<string>} multiLaneEvents: Event type IDs for multi-lane events.
 *   - {Array<string>} hurdleEvents: Event type IDs for hurdle events.
 *   - {Array<string>} relayEvents: Event type IDs for relay events.
 *   - {Array<string>} groupDistanceEvents: Event type IDs for group distance events.
 *   - {Array<string>} walkEvents: Event type IDs for walk events.
 *   - {Array<string>} sprintAgilityTraining: Event type IDs for sprint/agility training.
 *   - {Array<string>} fieldEvents: Event type IDs for field events.
 *
 * @returns {MeetRequest} A formatted meet request object containing:
 *   - {string} meetName: The name of the meet.
 *   - {'0' | '1'} meetType: The type of the meet.
 *   - {string} meetDate: The combined date and time in ISO format (e.g., "2024-12-30T14:30").
 *   - {string} timeZone: The time zone ID.
 *   - {string} location: The location of the meet.
 *   - {string} description: The description of the meet.
 *   - {string} meetStatus: The current status of the meet.
 *   - {string[]} ageGroups: Comma-separated age group IDs.
 *   - {string[]} eventTypes: Comma-separated event type IDs.
 *
 * Example:
 * Input:
 *   meetFormData = {
 *     meetName: "Annual Sprint Meet",
 *     meetType: "1",
 *     date: "2024-12-30",
 *     time: "14:30",
 *     timezone: { id: "UTC", displayName: "UTC" },
 *     location: "Main Stadium",
 *     description: "End-of-year competition",
 *     meetStatus: "Scheduled",
 *     ageGroups: ["U10", "U12"],
 *     multiLaneEvents: ["20"],
 *     hurdleEvents: ["23"],
 *     relayEvents: [],
 *     groupDistanceEvents: [],
 *     walkEvents: ["41"],
 *     sprintAgilityTraining: [],
 *     fieldEvents: ["61"],
 *   }
 * Output:
 *   {
 *     meetName: "Annual Sprint Meet",
 *     meetType: "1",
 *     meetDate: "2024-12-30T14:30",
 *     timeZone: "UTC",
 *     location: "Main Stadium",
 *     description: "End-of-year competition",
 *     meetStatus: "Scheduled",
 *     ageGroups: "U10,U12",
 *     eventTypes: "20,23,41,61",
 *   }
 */
export const getMeetRequest = (meetFormData) => {
  return {
    meetName: meetFormData.meetName,
    meetType: meetFormData.meetType,
    meetDate: `${meetFormData.date}T${meetFormData.time}`,
    timeZone: meetFormData.timezone.id,
    location: meetFormData.location,
    description: meetFormData.description,
    meetStatus: meetFormData.meetStatus,
    ageGroups: meetFormData.ageGroups.join(','),
    eventTypes: [
      ...meetFormData.multiLaneEvents,
      ...meetFormData.hurdleEvents,
      ...meetFormData.relayEvents,
      ...meetFormData.groupDistanceEvents,
      ...meetFormData.walkEvents,
      ...meetFormData.sprintAgilityTraining,
      ...meetFormData.fieldEvents,
    ].join(','),
  };
};
