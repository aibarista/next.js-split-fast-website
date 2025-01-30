import React from 'react';
import { Link } from 'react-router-dom';
import 'types/global';
import routes from 'routes';
import { convertDateTime, convertRecordToMilliseconds } from 'utils/time';
import MedalBadge from 'assets/images/icon_medal_badge.png';
import { ReactComponent as EyeIcon } from 'assets/images/icon_eye.svg';
import { ReactComponent as ChartIcon } from 'assets/images/icon_chart.svg';

/**
 * Generates a list of options for a dropdown or selection component from athlete data.
 *
 * This function processes an array of athlete objects and returns a formatted array
 * suitable for use in dropdown menus or selection components. Each option includes
 * a `label` (athlete's full name) and a `value` (athlete's unique ID).
 *
 * @param {Athlete[]} athletes - An array of athlete objects. Each object should include:
 *   - `firstName` (string): The first name of the athlete.
 *   - `lastName` (string): The last name of the athlete.
 *   - `athleteID` (string): A unique identifier for the athlete.
 * @returns {Array} - A list of options, each with:
 *   - `label` (string): The athlete's full name (e.g., "John Doe").
 *   - `value` (string|number): The unique ID of the athlete.
 *
 * @example
 * const athletes = [
 *   { firstName: "John", lastName: "Doe", athleteID: 1 },
 *   { firstName: "Jane", lastName: "Smith", athleteID: 2 },
 * ];
 * const options = generateAthleteOptions(athletes);
 * // Output:
 * // [
 * //   { label: "John Doe", value: 1 },
 * //   { label: "Jane Smith", value: 2 },
 * // ]
 *
 * @notes
 * - Assumes that each athlete object has valid `firstName`, `lastName`, and `athleteID` properties.
 * - Does not handle duplicate `athleteID` values; ensure uniqueness in the input data.
 */
export const generateAthleteOptions = (athletes) => {
  const options = [];

  athletes.forEach((athlete) => {
    options.push({
      label: `${athlete.firstName} ${athlete.lastName}`,
      value: athlete.athleteID,
    });
  });

  return options;
};

/**
 * Processes recent meet data to generate a formatted table-friendly structure.
 *
 * This function takes recent meet details and processes the results from the most recent meet
 * to generate a structured array. Each entry contains details about the event, formatted
 * result values, and interactive elements such as links and icons.
 *
 * @param {Object} recentMeet - An object containing recent meet data, including:
 *   - `meets` (Array): A list of meet objects. The first meet is processed if available.
 *     - Each meet object should have:
 *       - `results` (Array): The results of the meet. Each result should include:
 *         - `eventType` (string): The type of event.
 *         - `resultValue` (string|number): The result value for the event.
 *         - `isPR` (boolean): Indicates if the result is a personal record (PB).
 *         - `ageGroup`, `gender`, `roundType` (strings): Additional event details.
 *       - `meetId` (string|number): Unique identifier for the meet.
 * @param {string|number} clubId - The unique identifier for the club.
 * @param {Function} openHistoryPopup - A callback function to open the history popup for a given event type.
 * @returns {Array} - A structured array of data objects formatted for a table. Each object includes:
 *   - `eventType` (JSX): A clickable event type with a chart icon.
 *   - `result` (JSX): A display of the result value, optionally including a PB medal icon.
 *   - `buttons` (JSX): A link to view detailed event results.
 *
 * @example
 * const recentMeet = {
 *   meets: [
 *     {
 *       meetId: 123,
 *       results: [
 *         {
 *           eventType: "100m Freestyle",
 *           resultValue: "00:54.32",
 *           isPR: true,
 *           ageGroup: "U18",
 *           gender: "M",
 *           roundType: "Final",
 *         },
 *       ],
 *     },
 *   ],
 * };
 * const clubId = 1;
 * const openHistoryPopup = (eventType) => console.log(`Open history for ${eventType}`);
 *
 * const data = recentMeetData(recentMeet, clubId, openHistoryPopup);
 * // Output:
 * // [
 * //   {
 * //     eventType: <div>...</div>,
 * //     result: <div>...</div>,
 * //     buttons: <Link>...</Link>,
 * //   },
 * // ]
 *
 * @notes
 * - If no meets or results are available, an empty array is returned.
 * - Assumes CSS classes `tableCellLink` and icons `ChartIcon`, `EyeIcon` for styling.
 */
export const recentMeetData = (recentMeet, clubId, openHistoryPopup) => {
  const data = [];

  if (recentMeet.meets.length > 0) {
    recentMeet.meets[0].results.forEach((result) => {
      data.push({
        ...result,
        eventType: (
          <div
            className="tableCellLink"
            onClick={() => openHistoryPopup(result.eventType)}
          >
            {result.eventType}
            <ChartIcon />
          </div>
        ),
        result: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {result.resultValue}
            {result.isPR ? (
              <img src={MedalBadge} style={{ width: '30px' }} alt="PB" />
            ) : null}
          </div>
        ),
        buttons: (
          <Link
            to={routes.admin.results.url(
              clubId,
              recentMeet.meets[0].meetId,
              result.eventType,
              result.ageGroup,
              result.gender,
              result.roundType
            )}
            className="tableCellLink"
          >
            View
            <EyeIcon />
          </Link>
        ),
      });
    });
  }

  return data;
};

/**
 * Processes past meet data and transforms it into a structured format for display in a table.
 *
 * This function iterates through the past meets and their results, and generates an array of objects
 * that include the formatted event type, result, and date. It provides interactive elements like
 * clickable links for event type and date, as well as a chart icon and PB badge for enhanced UI.
 *
 * @param {Object} pastMeets - The object containing past meet data.
 *   - {Array} meets - An array of meet objects.
 *     - {Array} results - An array of result objects for each meet.
 * @param {string} clubId - The ID of the club.
 * @param {Function} openHistoryPopup - A callback function to open the history popup for a specific event type.
 *
 * @returns {Array} - An array of objects formatted for table rows, containing:
 *   - {Object} result - The original result object.
 *   - {JSX.Element} eventType - A clickable element to trigger the history popup with a chart icon.
 *   - {JSX.Element} result - The result value with a PB badge if applicable.
 *   - {JSX.Element} date - A clickable link displaying the result's date.
 */
export const pastMeetsData = (pastMeets, clubId, openHistoryPopup) => {
  const data = [];

  if (pastMeets.meets.length > 0) {
    pastMeets.meets.forEach((meet) => {
      meet.results.forEach((result) => {
        data.push({
          ...result,
          eventType: (
            <div
              className="tableCellLink"
              onClick={() => openHistoryPopup(result.eventType)}
            >
              {result.eventType}
              <ChartIcon />
            </div>
          ),
          result: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {result.resultValue}
              {result.isPR ? (
                <img src={MedalBadge} style={{ width: '30px' }} alt="PB" />
              ) : null}
            </div>
          ),
          date: (
            <Link
              className="tableCellLink"
              to={routes.admin.results.url(
                clubId,
                result.meetId,
                result.eventType,
                result.ageGroup,
                result.gender,
                result.roundType
              )}
            >
              {convertDateTime(result.resultTimestamp).date}
            </Link>
          ),
        });
      });
    });
  }

  return data;
};

/**
 * Generates a history of event results sorted by timestamp for display or analysis.
 *
 * This function processes an array of event results, sorts them by the result timestamp in ascending order,
 * and creates a history array with formatted date and numeric record values.
 *
 * @param {Result[]} results - An array of result objects to process. Each object should have:
 *   - {string} resultTimestamp - The timestamp of the result (e.g., "2024-12-24T10:00:00").
 *   - {string} resultValue - The result value, expected to be in a string format with 'm' (e.g., "10.5m").
 *
 * @returns {Array} - An array of history objects, each containing:
 *   - {string} name - The formatted date of the result (e.g., "24 Dec 2024").
 *   - {number} record - The numeric value of the result (e.g., 10.5).
 */
export const createEventHistory = (results) => {
  const history = [];

  results
    .sort((a, b) => new Date(a.resultTimestamp) - new Date(b.resultTimestamp))
    .forEach((result) => {
      history.push({
        name: convertDateTime(result.resultTimestamp).date,
        record: result.resultValue.includes('m')
          ? result.resultValue.replace('m', '')
          : convertRecordToMilliseconds(result.resultValue) / 1000,
        unit: result.resultValue.includes('m') ? 'm' : 's',
      });
    });

  return history;
};

/**
 * Retrieves the best personal record (PB) from a list of event results.
 *
 * This function processes an array of results, checking each one to determine if it's a personal record (PB).
 * It compares results with the same unit (meters or other) and returns the highest PB found.
 *
 * @param {Array<Object>} results - An array of result objects. Each object should have the following properties:
 *   - {boolean} isPR - A flag indicating whether the result is a personal record. (typeof: boolean)
 *   - {string} resultValue - The result value, which may include a unit (e.g., "10.5m"). (typeof: string)
 *
 * @returns {string|null} - The highest personal record in the format "value unit" (e.g., "10.5 m"), or null if no PB is found.
 */
export const getHistoryPR = (results) => {
  let resultPR = null;
  let resultType = '';
  results.forEach((result) => {
    if (result.isPR) {
      if (result.resultValue.includes('m')) {
        resultType = ' m';
        if (!resultPR || resultPR < +result.resultValue.replace(' m', '')) {
          resultPR = +result.resultValue.replace(' m', '');
        }
      } else {
        if (!resultPR || resultPR > +result.resultValue)
          resultPR = +result.resultValue;
      }
    }
  });

  if (!resultPR) return null;
  else return `${resultPR}${resultType}`;
};

/**
 * Transforms a list of historical results into a data structure suitable for display in a table.
 *
 * This function processes an array of result objects, formats the date, and includes the result value along with a
 * badge if it's a personal record (PB).
 *
 * @param {Array<Object>} results - An array of result objects. Each object should have the following properties:
 *   - {string} resultTimestamp - The timestamp when the result was recorded. (typeof: string)
 *   - {string} resultValue - The value of the result, such as time or distance. (typeof: string)
 *   - {boolean} isPR - A flag indicating whether the result is a personal record. (typeof: boolean)
 *
 * @returns {Array<Object>} - An array of objects containing:
 *   - `date`: The formatted date string of the result (typeof: string).
 *   - `result`: The result value, possibly with a PB badge (typeof: JSX.Element).
 */
export const historyResultData = (results) => {
  const data = [];

  if (results.length > 0) {
    results.forEach((result) => {
      data.push({
        ...result,
        date: convertDateTime(result.resultTimestamp).date,
        result: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {result.resultValue}
            {result.isPR ? (
              <img src={MedalBadge} style={{ width: '30px' }} alt="PB" />
            ) : null}
          </div>
        ),
      });
    });
  }

  return data;
};
