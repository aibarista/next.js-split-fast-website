import { getResultHighJumpHeights } from 'config/admin/result';
import React from 'react';
import { convertDateTime } from 'utils/time';

/**
 * Converts a list of results into a format suitable for rendering in a table.
 * Handles different event types, with custom handling for "High Jump" events.
 *
 * @function resultsToTableData
 *
 * @param {Array<Object>} results - The list of results to convert. Each result should conform to the `Result` object structure.
 * @param {string} eventType - The type of the event (e.g., "High Jump", "Track", "Field").
 *
 * @returns {Array<Object>} A formatted array of table data, customized for the event type.
 *
 * @example
 * // Example usage for a High Jump event
 * const highJumpData = resultsToTableData(results, 'High Jump');
 *
 * @example
 * // Example usage for default event types
 * const tableData = resultsToTableData(results, 'Track');
 *
 * @notes
 * - High Jump events use `resultsToHighJumpTableData` for specialized formatting.
 * - Default event handling includes fields such as `athleteName`, `result`, `position`, and attempts.
 * - Results include a visual representation of attempts for field events like throws or jumps.
 */
export const resultsToTableData = (results, eventType) => {
  switch (eventType) {
    case 'High Jump':
      return resultsToHighJumpTableData(results, eventType);
    default:
      const data = [];
      results.forEach((result) => {
        data.push({
          ...result,
          result: result.status === 'OK' ? result.resultValue : result.status,
          date: `${convertDateTime(result.timestamp || '').date} ${convertDateTime(result.timestamp || '').time}`,
          athleteName: `${result.athleteFirstName} ${result.athleteLastName}`,
          position: result.status === 'OK' ? result.position : '',
          pr: result.isPR ? 'YES' : 'NO',
          attempt1:
            result.attempts?.length > 0
              ? result.attempts[0]
              : { distance: result.resultValue, status: 'OK' },
          attempt2: result.attempts?.length > 1 ? result.attempts[1] : null,
          attempt3: result.attempts?.length > 2 ? result.attempts[2] : null,
          attempt4: result.attempts?.length > 3 ? result.attempts[3] : null,
          attempt5: result.attempts?.length > 4 ? result.attempts[4] : null,
          attempt6: result.attempts?.length > 5 ? result.attempts[5] : null,
          attempts: result?.attempts?.map((attempt, index) => (
            <div style={{ paddingLeft: 20, minWidth: 70 }} key={index}>
              {attempt.status === 'OK'
                ? `${attempt.distance.toFixed(2)} m`
                : attempt.status === 'Foul'
                  ? 'X'
                  : attempt.status}
            </div>
          )),
        });
      });

      return data;
  }
};

/**
 * Maps an age group string into an array of corresponding age values or categories for club records.
 *
 * This function processes the provided age group string to extract a list of relevant age values or categories
 * based on the format of the input. It supports specific formats such as ranges (e.g., "U14-17"), single ages
 * (e.g., "U12"), or broader categories (e.g., "Senior", "Masters").
 *
 * @param {string} ageGroup - The age group string to process. Expected formats include:
 *   - `U<number>`: A single under-age value, e.g., "U12" maps to `[12]`.
 *   - `U<number>-<number>`: A range of under-age values, e.g., "U14-17" maps to `[14, 15, 16, 17]`.
 *   - `"Senior"` or `"Masters"`: Broader categories that map directly to themselves in an array, e.g., `["Senior"]`.
 *
 * @returns {Array<number|string>} - An array of processed age values or categories:
 *   - A single-element array for a single under-age group, e.g., `[12]` for "U12".
 *   - A range of ages for an under-age range group, e.g., `[14, 15, 16, 17]` for "U14-17".
 *   - A single-element array for broader categories, e.g., `["Senior"]` or `["Masters"]`.
 *   - An empty array if the input does not match a supported format.
 *
 * @example
 * // Single under-age group
 * const ageGroup1 = getAgeGroupsForClubRecords("U12");
 * console.log(ageGroup1); // Output: [12]
 *
 * // Under-age range
 * const ageGroup2 = getAgeGroupsForClubRecords("U14-17");
 * console.log(ageGroup2); // Output: [14, 15, 16, 17]
 *
 * // Senior category
 * const ageGroup3 = getAgeGroupsForClubRecords("Senior");
 * console.log(ageGroup3); // Output: ["Senior"]
 *
 * // Unsupported format
 * const ageGroup4 = getAgeGroupsForClubRecords("Unknown");
 * console.log(ageGroup4); // Output: []
 */
export const getAgeGroupsForClubRecords = (ageGroup) => {
  if (ageGroup.includes('U')) {
    if (ageGroup === 'U14-17') {
      return ['14', '15', '16', '17'];
    } else {
      return [ageGroup.replace('U', '')];
    }
  }

  if (['Senior', 'Masters'].indexOf(ageGroup) > -1) return [ageGroup];

  return [];
};

export const resultsToHighJumpTableData = (results, eventType) => {
  const heightsArray = getResultHighJumpHeights(results);
  const data = [];
  results.forEach((result) => {
    let highJumpAttempts = [];
    for (let i = 0; i < heightsArray.length; i++) {
      const attempt = result?.heightAttempts.find(
        (ha) => ha.height === heightsArray[i]
      );
      if (attempt) {
        highJumpAttempts.push(
          <div style={{ paddingLeft: 20, minWidth: 70 }} key={i}>
            {`${attempt.attempt1} ${attempt.attempt2} ${attempt.attempt3}`}
          </div>
        );
      } else {
        highJumpAttempts.push(<div></div>);
      }
    }
    let res = {
      ...result,
      result: `${result.bestClearedHeight} m`,
      date: `${convertDateTime(result.timestamp || '').date} ${convertDateTime(result.timestamp || '').time}`,
      athleteName: `${result.firstName} ${result.lastName}`,
      position: result.position || '',
      pr: result.isPR ? 'YES' : 'NO',
      highJumpAttempts,
      eventType,
      resultID: result.athleteId,
    };
    for (let i = 0; i < heightsArray.length; i++) {
      const attempt = result?.heightAttempts.find(
        (ha) => ha.height === heightsArray[i]
      );
      if (attempt) {
        res[`heightAttempts${i}`] = attempt;
      } else {
        res[`heightAttempts${i}`] = { height: heightsArray[i], empty: true };
      }
    }
    data.push(res);
  });
  return data;
};
