/**
 * Converts a date-time string into formatted date and time strings.
 *
 * This function takes an ISO 8601 date-time string, converts it to a JavaScript `Date` object,
 * and formats the date and time using `Intl.DateTimeFormat`. The resulting date is in the
 * format `DD MMM YYYY` (e.g., `02 Dec 2024`), and the time is in `h:mm A` format (e.g., `6:00 AM`).
 *
 * @param {string} dateTimeString - The ISO 8601 date-time string to convert (e.g., "2024-12-02T06:00:00Z").
 * @returns {Object} - An object containing formatted `date` and `time` strings:
 *   - `date`: Formatted as 'DD MMM YYYY' (e.g., '02 Dec 2024').
 *   - `time`: Formatted as 'h:mm A' (e.g., '6:00 AM').
 *
 * Example usage:
 * const { date, time } = convertDateTime("2024-12-02T06:00:00Z");
 * console.log(date); // Output: "02 Dec 2024"
 * console.log(time); // Output: "6:00 AM"
 */
export const convertDateTime = (dateTimeString) => {
  if (!dateTimeString) return { date: '', time: '' };

  const formattedDate = new Date(dateTimeString);
  // Format for date: 02 Dec 2024
  const date = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(formattedDate);

  // Format for time: 6:00 AM
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(formattedDate);

  return { date, time };
};

/**
 * Converts a time duration in milliseconds into a formatted record string.
 *
 * This function takes a time duration in milliseconds and returns a string
 * representation in the format `MM:SS.mmm` (if minutes are present) or `SS.mmm`
 * (if only seconds and milliseconds are present). The milliseconds are padded
 * with leading zeros based on the specified count.
 *
 * @param {number} milliseconds - The time duration in milliseconds. Must be a non-negative number.
 * @param {number} [millisecondZeroCount=3] - The number of digits to display for milliseconds.
 *   Defaults to 3 (e.g., "003" for milliseconds).
 *
 * @throws {Error} Throws an error if the input milliseconds is negative.
 *
 * @returns {string} The formatted time string in `MM:SS.mmm` or `SS.mmm` format.
 *
 * @example
 * // Example 1: Formatting a time duration with minutes and milliseconds
 * const time1 = convertMillisecondsToRecord(125678);
 * // Output: "2:05.678"
 *
 * // Example 2: Formatting a time duration without minutes
 * const time2 = convertMillisecondsToRecord(45678);
 * // Output: "45.678"
 *
 * // Example 3: Customizing the number of digits for milliseconds
 * const time3 = convertMillisecondsToRecord(125678, 2);
 * // Output: "2:05.67"
 *
 * @notes
 * - Milliseconds are formatted with leading zeros as per the `millisecondZeroCount` parameter.
 * - If the time is less than one minute, the output will exclude the minutes field.
 */
export const convertMillisecondsToRecord = (
  milliseconds,
  millisecondZeroCount = 3
) => {
  if (milliseconds < 0) {
    throw new Error('Milliseconds cannot be negative');
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const millis = milliseconds % 1000;

  // Format milliseconds with leading zeros
  const formattedMillis = Math.floor(millis / 10 ** (3 - millisecondZeroCount))
    .toString()
    .padStart(millisecondZeroCount, '0');

  // Return the formatted string
  if (minutes > 0) {
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${minutes}:${formattedSeconds}.${formattedMillis}`;
  } else {
    const formattedSeconds =
      seconds < 10 ? seconds.toString() : seconds.toString().padStart(2, '0');
    return `${formattedSeconds}.${formattedMillis}`;
  }
};

/**
 * Converts a time record string in various valid formats into milliseconds.
 *
 * Supported formats:
 * - M:SS.s, M:SS.ss, M:SS.sss
 * - MM:SS.s, MM:SS.ss, MM:SS.sss
 * - S.s, S.ss, S.sss (if minutes are 0)
 * - SS.s, SS.ss, SS.sss (if minutes are 0)
 *
 * @param {string} record - The time record string to convert.
 * @returns {number} The time in milliseconds.
 * @throws {Error} If the input format is invalid.
 *
 * Example:
 * convertRecordToMilliseconds("2:24.391");  // 1444391
 * convertRecordToMilliseconds("02:05.5");  // 125500
 * convertRecordToMilliseconds("9.123");    // 9123
 * convertRecordToMilliseconds("12.45");    // 12450
 */
export const convertRecordToMilliseconds = (record) => {
  const recordRegex = /^(?:(\d{1,2}):(\d{2})\.(\d{1,3})|(\d{1,2})\.(\d{1,3}))$/; // Matches valid formats
  const match = record.match(recordRegex);

  if (!match) {
    if (record.includes(':')) {
      throw new Error(
        'Invalid record format. Supported formats for durations more than 1 minute: M:SS.s, M:SS.ss, M:SS.sss, MM:SS.s, MM:SS.ss, MM:SS.sss.'
      );
    } else {
      throw new Error(
        'Invalid record format. Supported formats for durations less than 1 minute: S.s, S.ss, S.sss, SS.s, SS.ss, SS.sss.'
      );
    }
  }

  if (match[1] !== undefined) {
    // Format with minutes
    const minutes = match[1];
    const seconds = match[2];
    const milliseconds = match[3];

    // Normalize milliseconds to 3 digits
    const normalizedMilliseconds = milliseconds.padEnd(3, '0');

    return (
      parseInt(minutes, 10) * 60 * 1000 +
      parseInt(seconds, 10) * 1000 +
      parseInt(normalizedMilliseconds, 10)
    );
  } else {
    // Format without minutes
    const seconds = match[4];
    const milliseconds = match[5];

    // Normalize milliseconds to 3 digits
    const normalizedMilliseconds = milliseconds.padEnd(3, '0');

    return parseInt(seconds, 10) * 1000 + parseInt(normalizedMilliseconds, 10);
  }
};
