import React from 'react';
import routes from 'routes';
import { convertDateTime } from 'utils/time';
import TableViewButton from 'components/admin/TableViewButton';
import styles from 'pages/admin/Meets/Meets.module.css';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';

/**
 * Transforms event data into a format suitable for table display.
 *
 * Processes a list of event objects to add formatted date, time, and a "manage" action
 * link for each event. The action link points to a results aggregation page.
 *
 * @param {Event[]} events - An array of event objects. Each object should include:
 *   - {string} timestamp: The ISO date string of the event (e.g., "2024-12-30T14:30:00").
 *   - {string} eventType: The type of the event (e.g., "100m").
 *   - {string} ageGroup: The age group classification of the event.
 *   - {string} gender: The gender classification of the event.
 *   - {string} roundType: The round type (e.g., "final").
 *   - Any additional properties, which are included in the formatted result as-is.
 * @param {string} clubId - The ID of the club used to construct URLs for managing events.
 * @param {string} meetId - The ID of the meet used to construct URLs for managing events.
 *
 * @returns {Array} A list of formatted event objects, each containing:
 *   - {string} date: Formatted date and time of the event (e.g., "2024-12-30 14:30").
 *   - {JSX.Element} manage: A clickable `Link` component directing to the results page.
 *   - Additional properties from the original event object.
 *
 * @example
 * const events = [
 *   {
 *     timestamp: "2024-12-30T14:30:00",
 *     eventType: "100m",
 *     ageGroup: "U18",
 *     gender: "male",
 *     roundType: "final",
 *   },
 * ];
 * const clubId = "123";
 * const meetId = "456";
 * const tableData = eventsToTableData(events, clubId, meetId);
 * // Output:
 * // [
 * //   {
 * //     ...event,
 * //     date: "2024-12-30 14:30",
 * //     manage: <Link to="..." className={styles.viewButton}>Results</Link>,
 * //   },
 * // ]
 *
 * @notes
 * - Uses `convertDateTime` to format the `timestamp` field into date and time components.
 * - Generates URLs using `routes.admin.results.url`.
 * - Assumes `styles.viewButton` is a valid CSS class for the "Results" button.
 */
export const eventsToTableData = (events, clubId, meetId, handleEdit) => {
  const results = [];
  events.forEach((event) => {
    results.push({
      ...event,
      date: `${convertDateTime(event.timestamp).date} ${convertDateTime(event.timestamp).time}`,
      manage: (
        <div className={styles.buttons}>
          <TableViewButton
            url={routes.admin.results.url(
              clubId,
              meetId,
              event.eventType,
              event.ageGroup,
              event.gender,
              event.roundType
            )}
            style={{ marginRight: 10 }}
          />
          <CustomButton
            onClick={() => handleEdit(event)}
            style={{
              ...defaultButtonStyle,
              fontSize: 11,
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 4,
              paddingBottom: 4,
              marginBottom: 0,
              height: 'auto',
            }}
          >
            Edit
          </CustomButton>
        </div>
      ),
    });
  });

  return results;
};

export const eventsToExportTableData = (pendingEvents, publishedEvents) => {
  const results = [];
  let id = 0;
  pendingEvents.forEach((event) => {
    results.push({
      ...event,
      id,
      isCheck: false,
      status: 'Pending',
    });
    id++;
  });
  publishedEvents.forEach((event) => {
    results.push({
      ...event,
      id,
      isCheck: false,
      status: 'Published',
    });
    id++;
  });
  return results;
};
