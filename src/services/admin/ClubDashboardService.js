import React from 'react';

import routes from 'routes';
import {
  meetTableRowLimit,
  upcomingTableRowLimit,
} from 'config/admin/clubDashboard';
import { convertDateTime } from 'utils/time';
import {
  getAgeGroupLabel,
  getEventTypeLabel,
} from 'services/admin/MeetService';

import TableViewButton from 'components/admin/TableViewButton';
import competitionMeetImage from 'assets/images/uifb.png';
import trainingMeetImage from 'assets/images/uifd.png';
import MedalBadge from 'assets/images/icon_medal_badge.png';

/**
 * Transforms a list of meets into a formatted recent meets data array.
 *
 * This function filters and formats meet data to create an array for display
 * in a recent meets table. It limits the number of meets based on the
 * `meetTableRowLimit` and adds formatted date, time, and action buttons.
 *
 * @param {Meet[]} meets - An array of meet objects. Each meet object should include:
 *   - {string} meetDate: The ISO string of the meet date and time (e.g., "2024-12-30T14:30").
 *   - {string} clubID: The ID of the associated club.
 *   - {string} meetID: The ID of the meet.
 *   - Any other additional fields as required.
 *
 * @returns {Array<Object>} An array of formatted recent meet objects containing:
 *   - {string} date: The formatted date of the meet (e.g., "2024-12-30").
 *   - {string} time: The formatted time of the meet (e.g., "14:30").
 *   - {JSX.Element} buttons: A `TableViewButton` component directing to the meet results page.
 *   - Any other fields included in the original meet object.
 *
 * Example:
 * Input:
 *   meets = [
 *     {
 *       meetDate: "2024-12-30T14:30",
 *       clubID: "123",
 *       meetID: "456",
 *       otherField: "value",
 *     },
 *   ]
 * Output:
 *   [
 *     {
 *       date: "2024-12-30",
 *       time: "14:30",
 *       buttons: <TableViewButton url="/admin/events/123/456" />,
 *       otherField: "value",
 *     },
 *   ]
 */
export const getRecentMeetData = (meets) => {
  const recentMeets = [];

  meets.forEach((meet) => {
    if (recentMeets.length < meetTableRowLimit) {
      recentMeets.push({
        ...meet,
        date: convertDateTime(meet.meetDate).date,
        time: convertDateTime(meet.meetDate).time,
        buttons: (
          <TableViewButton
            url={routes.admin.events.url(meet.clubID, meet.meetID)}
          />
        ),
      });
    }
  });

  return recentMeets;
};

/**
 * Processes and formats data for upcoming meets.
 *
 * This function filters and formats a list of upcoming meets, ensuring the result
 * is limited to a predefined number (`upcomingTableRowLimit`). For each meet,
 * it formats the date and time using `convertDateTime` and assigns a background
 * image based on the meet's index in the list. The image selection cycles through
 * four predefined images in a sequential manner.
 *
 * @param {Meet[]} meets - An array of meet objects. Each object should include:
 *   - `meetDate` (string): The date and time of the meet in a standard format.
 *   - Other meet-specific properties, which are included in the result as-is.
 * @returns {Array} - A list of formatted upcoming meet objects, each including:
 *   - `date` (string): The formatted date of the meet (e.g., "02 Dec 2024").
 *   - `time` (string): The formatted time of the meet (e.g., "6:00 AM").
 *   - `image` (string): The assigned background image for the meet.
 *
 * @example
 * const meets = [
 *   { meetDate: "2024-12-02T06:00:00", name: "Meet 1" },
 *   { meetDate: "2024-12-03T09:00:00", name: "Meet 2" },
 * ];
 * const upcomingMeets = getUpcomingMeetData(meets);
 * // Output:
 * // [
 * //   {
 * //     ...meet,
 * //     date: "02 Dec 2024",
 * //     time: "6:00 AM",
 * //     image: trainingMeetImage,
 * //   },
 * //   {
 * //     ...meet,
 * //     date: "03 Dec 2024",
 * //     time: "9:00 AM",
 * //     image: competitionMeetImage,
 * //   }
 * // ]
 *
 * @notes
 * - Ensure `upcomingTableRowLimit` is defined globally to limit the number of upcoming meets.
 * - Requires `convertDateTime` to properly format the meet's date and time.
 * - Depends on the predefined background images (`competitionMeetImage`, `trainingMeetImage`, etc.).
 */
export const getUpcomingMeetData = (meets) => {
  const upcomingMeets = [];
  meets.forEach((meet) => {
    if (upcomingMeets.length < upcomingTableRowLimit) {
      upcomingMeets.push({
        ...meet,
        image: meet.meetType === 1 ? competitionMeetImage : trainingMeetImage,
        date: convertDateTime(meet.meetDate).date,
        time: convertDateTime(meet.meetDate).time,
        ageGroups: getAgeGroupLabel(meet.ageGroups).join(', '),
        eventTypes: getEventTypeLabel(meet.eventTypes).join(', '),
      });
    }
  });

  return upcomingMeets;
};

/**
 * Formats highlight data for use in a table.
 *
 * Processes a list of highlight objects to format their data for table display.
 * Adds formatted date, a URL link, and a visual indicator for personal records (PB).
 *
 * @param {Highlight[]} highlights - List of highlight objects, each including:
 *   - {string} resultDate: The ISO date string of the highlight (e.g., "2024-12-02T06:00:00").
 *   - {string} meetId: The ID of the associated meet.
 *   - {string} eventType: The type of event (e.g., "100m").
 *   - {string} ageGroup: Age group classification (e.g., "U18").
 *   - {string} gender: Gender classification (e.g., "male").
 *   - {string} roundType: The round type (e.g., "final").
 *   - {boolean} isPR: Whether the highlight represents a personal record.
 *   - Additional properties are included in the formatted result as-is.
 * @param {string} clubId - The ID of the club used to construct URLs.
 *
 * @returns {Array} A list of formatted highlight objects, each containing:
 *   - {string} date: Formatted date (e.g., "02 Dec 2024").
 *   - {JSX.Element} url: A `TableViewButton` component linking to the event details.
 *   - {JSX.Element|null} isPR: A medal badge image if the highlight is a personal record, otherwise `null`.
 *   - Additional properties from the original highlight object.
 *
 * @example
 * const highlights = [
 *   {
 *     resultDate: "2024-12-02T06:00:00",
 *     meetId: "123",
 *     eventType: "100m",
 *     ageGroup: "U18",
 *     gender: "male",
 *     roundType: "final",
 *     isPR: true,
 *   },
 * ];
 * const clubId = "456";
 * const tableData = getHighlightTableData(highlights, clubId);
 * // Output:
 * // [
 * //   {
 * //     ...highlight,
 * //     date: "02 Dec 2024",
 * //     url: <TableViewButton url="..." />,
 * //     isPR: <img src={MedalBadge} style={{ width: '30px' }} alt="PB" />,
 * //   },
 * // ]
 *
 * @notes
 * - Uses `convertDateTime` to format the `resultDate`.
 * - Generates URLs using `routes.admin.results.url`.
 * - Assumes `MedalBadge` is a valid imported image asset for PB highlights.
 */
export const getHighlightTableData = (highlights, clubId) => {
  const result = [];

  highlights.forEach((highlight) => {
    result.push({
      ...highlight,
      date: `${convertDateTime(highlight.resultDate).date}`,
      url: (
        <TableViewButton
          url={routes.admin.results.url(
            clubId,
            highlight.meetId,
            highlight.eventType,
            highlight.ageGroup,
            highlight.gender,
            highlight.roundType
          )}
        />
      ),
      isPR: highlight.isPR ? (
        <img src={MedalBadge} style={{ width: '30px' }} alt="PB" />
      ) : null,
    });
  });

  return result;
};
