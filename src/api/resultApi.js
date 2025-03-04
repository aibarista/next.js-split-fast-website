import authApi from './index';

/**
 * Fetch the result highlights for a specific club by sending a GET request to the '/results/get-result-highlights' endpoint.
 * It takes the club ID and the number of highlights to fetch (default is 8).
 *
 * @param {string} clubId - The ID of the club whose result highlights are to be fetched.
 * @param {number} numberOfHighlights - The number of result highlights to fetch (default is 8).
 * @returns {Promise} - The response from the API containing the result highlights.
 */
export const getResultHighlights = async (clubId, numberOfHighlights = 8) => {
  return await authApi.get(
    `/results/get-result-highlights?clubId=${clubId}&numberOfHighlights=${numberOfHighlights}`
  );
};

/**
 * Fetch the list of completed events for a specific club and meet by sending a GET request to the '/results/get-events' endpoint.
 * Optionally, you can pass the 'lastUpdated' parameter to filter events updated after a specific time.
 *
 * @param {string} clubId - The ID of the club whose completed events are to be fetched.
 * @param {string} meetId - The ID of the meet whose completed events are to be fetched.
 * @param {string|null} lastUpdated - The optional timestamp to filter events by their last update time.
 * @returns {Promise} - The response from the API containing the list of completed events.
 */
export const getCompletedEvents = async (
  clubId,
  meetId,
  lastUpdated = null
) => {
  if (!lastUpdated) {
    return await authApi.get(
      `/results/get-events?clubId=${clubId}&meetId=${meetId}`
    );
  } else {
    return await authApi.get(
      `/results/get-events?clubId=${clubId}&meetId=${meetId}&lastUpdated=${lastUpdated}`
    );
  }
};

/**
 * Fetch the results for specific events by sending a POST request to the '/results/get-event-results' endpoint.
 * The request includes a list of event IDs, the club ID, and an optional timestamp to filter results updated after a specific time.
 *
 * @param {Array<string>} eventIds - An array of event IDs for which results are to be fetched.
 * @param {string} clubId - The ID of the club associated with these events.
 * @param {string|null} since - An optional timestamp to filter results by their last update time.
 * @returns {Promise} - The response from the API containing the results for the specified events.
 */
export const getResultsForEvents = async (eventIds, clubId, since = null) => {
  return await authApi.post('/results/get-event-results', {
    eventIds,
    clubId,
    since,
  });
};

/**
 * Fetches aggregate event results.
 *
 * This function retrieves aggregated results for a specific club, meet, event type, age group, gender, and round type.
 *
 * @param {string} clubID - The unique identifier of the club.
 * @param {string} meetID - The unique identifier of the meet.
 * @param {string} eventType - The type of the event (e.g., "100m", "Relay").
 * @param {string} ageGroup - The age group for the event (e.g., "U14").
 * @param {string} gender - The gender for the event (e.g., "Male", "Female").
 * @param {string} roundType - The round type for the event (e.g., "Heat", "Final").
 * @returns {Promise<Object>} - A Promise that resolves to the API response containing the event results.
 */
export const getAggResultsForEventType = async (
  clubID,
  meetID,
  eventType,
  ageGroup,
  gender,
  roundType
) => {
  const requestData = {
    clubID,
    meetID,
    eventType,
    ageGroup,
    gender,
    roundType,
  };

  return await authApi.post(`/events/get-agg-event-results`, requestData);
};

/**
 * Fetches details of selected events for a specific club and meet.
 *
 * This function retrieves information about specific events for a given club and meet.
 * Optionally, it filters the results based on a `lastUpdated` timestamp.
 *
 * @param {string} clubId - The unique identifier of the club.
 * @param {string} meetId - The unique identifier of the meet.
 * @param {Array<string>} eventIds - An array of event IDs to fetch details for.
 * @param {string|null} lastUpdated - An optional timestamp to filter events by their last update date (format: YYYY-MM-DDTHH:mm:ss).
 * @returns {Promise<Object>} - A Promise that resolves to the API response containing details of the selected events.
 */
export const getSelectedEvents = async (
  clubId,
  meetId,
  eventIds,
  lastUpdated = null
) => {
  return await authApi.post(`/results/get-selected-events`, {
    clubId,
    meetId,
    eventIds,
    lastUpdated,
  });
};

/**
 * TRACK EVENTS
 *
 * Updates the event results for a specific track timing aggregate event in the database.
 *
 * This function sends a PUT request to update multiple timing results in an aggregated track timing event.
 * Must only be used for track timing events (e.g., 100m, 1500m) where results have time measurements.
 *
 * @param {string} eventType - The type of event being updated.
 * @param {string} ageGroup - The age group category of the event.
 * @param {string} gender - The gender category of the event.
 * @param {string} roundType - The round type of the event.
 * @param {string} clubID - The unique identifier for the club.
 * @param {string} meetID - The unique identifier for the meet.
 * @param {Array} results - The updated time results for the event.
 * @returns {Promise} A Promise resolving to the API response.
 */
export const updateResults = async (
  eventType,
  ageGroup,
  gender,
  roundType,
  clubID,
  meetID,
  results
) => {
  return await authApi.put(`/results/edit-event-results`, {
    eventType,
    ageGroup,
    gender,
    roundType,
    clubID,
    meetID,
    results,
  });
};

/**
 * FIELD EVENTS
 *
 * Using the new edit-event-attempts API for to update attempt results for field events.
 *
 * This function sends a PUT request to update multiple attempts in an aggregated field event.
 * Must only be used for field events (e.g., throws, jumps) where attempts have distance measurements.
 *
 * @param {Object} params - The parameters for updating attempts
 * @param {string} params.eventType - The type of event
 * @param {string} params.ageGroup - The age group category
 * @param {string} params.gender - The gender category
 * @param {string} params.roundType - The type of round
 * @param {string} params.clubID - The club identifier
 * @param {string} params.meetID - The meet identifier
 * @param {Array} params.attempts - Array of attempt objects to update
 * @returns {Promise} A Promise resolving to the API response
 */
export const editEventAttempts = async ({
  eventType,
  ageGroup,
  gender,
  roundType,
  clubID,
  meetID,
  attempts,
}) => {
  console.log('Making API request to edit-event-attempts:');
  console.log('URL:', '/api/Results/edit-event-attempts');
  console.log('Request body:', {
    eventType,
    ageGroup,
    gender,
    roundType,
    clubID,
    meetID,
    attempts,
  });

  try {
    const response = await authApi.put('/results/edit-event-attempts', {
      eventType,
      ageGroup,
      gender,
      roundType,
      clubID,
      meetID,
      attempts,
    });
    console.log('API response:', response);
    return response;
  } catch (error) {
    console.error('API error:', error);
    console.error('Error response:', error.response);
    throw error;
  }
};

/**
 * FIELD EVENTS
 *
 * Using the new edit-high-jump-results API for to update highJump results for field events.
 *
 * This function sends a PUT request to update multiple attempts in an aggregated field event.
 * Must only be used for field events (e.g., throws, jumps) where attempts have distance measurements.
 *
 * @param {Object} params - The parameters for updating attempts
 * @param {string} params.eventType - The type of event
 * @param {string} params.ageGroup - The age group category
 * @param {string} params.gender - The gender category
 * @param {string} params.roundType - The type of round
 * @param {string} params.clubID - The club identifier
 * @param {string} params.meetID - The meet identifier
 * @param {Array} params.attempts - Array of attempt objects {
 *    "resultID": "string",
      "height": 0,
      "attempt1": "string",
      "attempt2": "string",
      "attempt3": "string"}[]
 * @returns {Promise} A Promise resolving to the API response
 */
export const editHighJumpResults = async ({
  eventType,
  ageGroup,
  gender,
  roundType,
  clubID,
  meetID,
  attempts,
}) => {
  console.log('Making API request to edit-high-jump-results:');
  console.log('URL:', '/api/Results/edit-high-jump-results');
  console.log('Request body:', {
    eventType,
    ageGroup,
    gender,
    roundType,
    clubID,
    meetID,
    attempts,
  });
  try {
    const response = await authApi.put('/results/edit-high-jump-results', {
      eventType,
      ageGroup,
      gender,
      roundType,
      clubID,
      meetID,
      attempts,
    });
    console.log('API response:', response);
    return response;
  } catch (error) {
    console.error('API error:', error);
    console.error('Error response:', error.response);
    throw error;
  }
};

/**
 * Fetches events based on their publishing status.
 *
 * This function retrieves events for a specific club and meet, filtered by their publishing status.
 * Optionally, it filters events updated after a specific timestamp.
 *
 * @param {string} clubID - The unique identifier of the club.
 * @param {string} meetID - The unique identifier of the meet.
 * @param {string} publishingStatus - The publishing status of the events (e.g., "ClubMembers", "AdminOnly").
 * @param {string|null} lastUpdated - An optional timestamp to filter events by their last update date (format: YYYY-MM-DDTHH:mm:ss).
 * @returns {Promise<Object>} - A Promise that resolves to the API response containing the filtered events.
 */
export const getEventsByStatus = async (
  clubID,
  meetID,
  publishingStatus,
  lastUpdated = null
) => {
  return await authApi.post(`/results/get-pubstatus-events`, {
    clubID,
    meetID,
    publishingStatus,
    lastUpdated,
  });
};

/**
 * Fetches aggregated events based on their publishing status.
 *
 * This function retrieves events for a specific club and meet, filtered by their publishing status.
 * The events are aggregated by event type and agegroup. For exaxmple, if there are multiple Heats for a single event,
 * they will be aggregated into a single event.
 *
 * @param {string} clubID - The unique identifier of the club.
 * @param {string} meetID - The unique identifier of the meet.
 * @param {string} publishingStatus - The publishing status of the events (e.g., "ClubMembers", "AdminOnly").
 * @returns {Promise<Object>} - A Promise that resolves to the API response containing the filtered events.
 */
export const getAggEventsByStatus = async (
  clubID,
  meetID,
  publishingStatus
) => {
  return await authApi.post(`/events/get-agg-events`, {
    clubID,
    meetID,
    publishingStatus,
  });
};

/**
 * Updates the status of specific events.
 *
 * This function sends a request to update the statuses of a list of events.
 *
 * @param {Array<Object>} events - An array of event objects, each containing event details and the updated status.
 * @returns {Promise<Object>} - A Promise that resolves to the API response after updating the event statuses.
 */
export const updateEventStatus = async (events) => {
  return await authApi.put(`/results/event-status`, events);
};

/**
 * Updates the publishing status of aggregated events.
 *
 * This function sends a request to update the publishing status for events matching the specified parameters.
 *
 * @param {Object} params - The parameters for the request, including clubID, meetID, eventType, ageGroup, gender, roundType, and newPublishingStatus.
 * @returns {Promise<Object>} - A Promise that resolves to the API response after updating the publishing status.
 */
export const updateAggEventStatus = async (params) => {
  return await authApi.put(`/events/agg-event-status`, params);
};

/**
 * Fetches high jump results for a specific event, club, and participant group.
 *
 * This function sends a POST request to retrieve high jump results for a specified club,
 * meet, event type, age group, gender, and round type. The results are returned
 * as a promise containing the API response.
 *
 * @async
 * @function getHighJumpResults
 *
 * @param {string} clubID - The unique identifier of the club.
 * @param {string} meetID - The unique identifier of the meet.
 * @param {string} eventType - The type of event (e.g., "High Jump").
 * @param {string} ageGroup - The age group of participants (e.g., "U18", 15).
 * @param {string} gender - The gender category (e.g., "M", "F").
 * @param {string} roundType - The round type of the event (e.g., "final", "qualifier").
 *
 * @returns {Promise<Object>} The API response containing high jump results.
 *
 * @throws {Error} Will throw an error if the API request fails or returns an error response.
 *
 * @example
 * // Example usage
 * const results = await getHighJumpResults(
 *   "123e4567-e89b-12d3-a456-426614174000",
 *   "456e7890-e12b-34c5-d678-426614174111",
 *   "High Jump",
 *   "U18",
 *   "Boys",
 *   "Heat"
 * );
 * console.log(results);
 *
 * @endpoint POST /events/get-high-jump-results
 *
 * @requestBody
 * {
 *   "clubID": "123e4567-e89b-12d3-a456-426614174000",
 *   "meetID": "456e7890-e12b-34c5-d678-426614174111",
 *   "eventType": "High Jump",
 *   "ageGroup": "U18",
 *   "gender": "Boys",
 *   "roundType": "Heat"
 * }
 *
 * @responseBody
 * {
 *   "status": "success",
 *   "data": [
 *     {
 *     "athleteId": "string",
 *     "firstName": "string",
 *     "lastName": "string",
 *     "athleteNumber": 0,
 *     "age": 0,
 *     "gender": "string",
 *     "position": 0,
 *     "bestClearedHeight": 0,
 *     "competitionStatus": "string",
 *     "isPR": true,
 *     "lastAttemptTime": "2025-01-15T02:48:21.702Z",
 *     "heightAttempts": [
 *       {
 *         "resultId": "string",
 *         "height": 0,
 *         "attempt1": "string",
 *         "attempt2": "string",
 *         "attempt3": "string",
 *         "timestamp": "2025-01-15T02:48:21.702Z",
 *         "hasValidClear": true
 *       }
 *     ]
 *   }
 *   ]
 * }
 *
 * @notes
 * - The `authApi` must be correctly configured with authorization headers.
 * - Ensure that the input parameters match the required formats for the API.
 * - The response may include attempts and results for each athlete, along with their positions.
 */
export const getHighJumpResults = async (
  clubID,
  meetID,
  eventType,
  ageGroup,
  gender,
  roundType
) => {
  return await authApi.post(`/events/get-high-jump-results`, {
    clubID,
    meetID,
    eventType,
    ageGroup,
    gender,
    roundType,
  });
};

export const exportResultsToFile = async (
  clubID,
  meetID,
  format = 'sf_csv',
  eventIds = undefined,
  lastUpdated = undefined
) => {
  const res = await authApi.post(`/ResultsExport/export`, {
    clubID,
    meetID,
    format,
    eventIds,
    lastUpdated,
  });
  return res?.data;
};

export const publishResults = async (
  newPublishingStatus
) => {

  const res = await authApi.put(`/events/agg-event-status`, {
    newPublishingStatus
  });
  return res?.data;

};