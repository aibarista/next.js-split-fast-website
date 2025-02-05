import { authApi } from 'api';

/**
 * Create a new club by sending a POST request to the '/Clubs' endpoint.
 *
 * @param {Object} clubData - The data of the club to be created.
 * @returns {Promise} - The response from the API.
 */
export const createClub = async (clubData) => {
  return await authApi.post('/Clubs', clubData);
};

/**
 * Fetch the list of all clubs by sending a GET request to the '/Clubs' endpoint.
 *
 * @returns {Promise} - The response from the API containing the list of clubs.
 */
export const getClubs = async () => {
  return await authApi.get('/Clubs');
};

/**
 * Fetch the list of meets for a specific club by sending a GET request to the '/meets/{clubId}' endpoint.
 * Optionally, you can pass the 'lastUpdated' parameter to filter meets after a specific time.
 *
 * @param {string} clubId - The ID of the club whose meets are to be fetched.
 * @param {string|null} lastUpdated - The optional timestamp to filter meets by their last update time.
 * @returns {Promise} - The response from the API containing the list of meets.
 */
export const getMeets = async (clubId, lastUpdated = null) => {
  if (!lastUpdated) {
    return await authApi.get(`/meets/${clubId}`);
  } else {
    return await authApi.get(`/meets/${clubId}?lastUpdated=${lastUpdated}`);
  }
};

/**
 * Fetch the list of recent meets for a specific club by sending a GET request to the '/meets/recent/{clubId}' endpoint.
 * Optionally, you can pass the 'lastUpdated' parameter to filter meets after a specific time.
 *
 * @param {string} clubId - The ID of the club whose recent meets are to be fetched.
 * @param {string|null} lastUpdated - The optional timestamp to filter meets by their last update time.
 * @returns {Promise} - The response from the API containing the list of recent meets.
 */
export const getRecentMeets = async (clubId, lastUpdated = null) => {
  if (!lastUpdated) {
    return await authApi.get(`/meets/recent/${clubId}`);
  } else {
    return await authApi.get(
      `/meets/recent/${clubId}?lastUpdated=${lastUpdated}`
    );
  }
};

/**
 * Fetch the list of upcoming meets for a specific club by sending a GET request to the '/meets/upcoming/{clubId}' endpoint.
 * Optionally, you can pass the 'lastUpdated' parameter to filter meets after a specific time.
 *
 * @param {string} clubId - The ID of the club whose upcoming meets are to be fetched.
 * @param {string|null} lastUpdated - The optional timestamp to filter meets by their last update time.
 * @returns {Promise} - The response from the API containing the list of upcoming meets.
 */
export const getUpcomingMeets = async (clubId, lastUpdated = null) => {
  if (!lastUpdated) {
    return await authApi.get(`/meets/upcoming/${clubId}`);
  } else {
    return await authApi.get(
      `/meets/upcoming/${clubId}?lastUpdated=${lastUpdated}`
    );
  }
};

/**
 * Fetch the details of a specific meet by sending a GET request to the '/meets/{clubId}/{meetId}' endpoint.
 *
 * @param {string} clubId - The ID of the club associated with the meet.
 * @param {string} meetId - The ID of the meet to be fetched.
 * @returns {Promise} - The response from the API containing the details of the specified meet.
 */
export const getMeetById = async (clubId, meetId) => {
  return await authApi.get(`/meets/${clubId}/${meetId}`);
};

/**
 * Fetches athletes for a specific club, optionally filtered by a last updated timestamp.
 *
 * This function retrieves a list of athletes for a given club. If a `lastUpdated` timestamp
 * is provided, it will only return athletes who have been updated since that timestamp.
 *
 * @param {string} clubId - The unique identifier of the club.
 * @param {string|null} lastUpdated - An optional timestamp to filter athletes by their last update date (format: YYYY-MM-DDTHH:mm:ss).
 * @returns {Promise<Object>} - A Promise that resolves to the response from the API containing athletes.
 */
export const getAthletes = async (clubId, lastUpdated = null) => {
  if (!lastUpdated) {
    return await authApi.get(`/users/athletes/${clubId}`);
  } else {
    return await authApi.get(
      `/users/athletes/${clubId}?lastUpdated=${lastUpdated}`
    );
  }
};

/**
 * Creates a new meet.
 *
 * This function sends a request to create a new meet with the provided information.
 *
 * @param {Object} meetInfo - An object containing the details of the meet to be created (e.g., name, date, location).
 * @returns {Promise<Object>} - A Promise that resolves to the API response after creating the meet.
 */
export const createMeet = async (meetInfo) => {
  return await authApi.post(`/meets`, meetInfo);
};

/**
 * Updates an existing meet's details.
 *
 * This function sends a request to update the information of an existing meet identified by its unique ID.
 *
 * @param {string} meetId - The unique identifier of the meet to be updated.
 * @param {Object} meetInfo - An object containing the updated meet details (e.g., name, date, location).
 * @returns {Promise<Object>} - A Promise that resolves to the API response after updating the meet.
 */
export const updateMeet = async (meetId, meetInfo) => {
  return await authApi.put(`/meets/${meetId}`, meetInfo);
};

/**
 * Retrieves filtered meets based on specific criteria.
 *
 * This function sends a request to fetch a list of meets that match the provided filters, including club ID, meet statuses, publishing access, and an optional last updated timestamp.
 *
 * @param {string} clubID - The unique identifier of the club to filter meets for.
 * @param {Array<string>} meetStatuses - An array of meet statuses to filter by (e.g., "active", "completed").
 * @param {Array<string>} publishingAccessList - An array of access levels or roles with publishing permissions.
 * @param {string|null} [lastUpdated=null] - An optional ISO timestamp to filter meets updated after this time.
 * @returns {Promise<Object>} - A Promise that resolves to the API response containing the filtered list of meets.
 */
export const getFilteredMeets = async (
  clubID,
  meetStatuses,
  publishingAccessList,
  lastUpdated = null
) => {
  return await authApi.post(`/meets/get-filtered-meets`, {
    clubID,
    meetStatuses,
    publishingAccessList,
    lastUpdated,
  });
};

/**
 * Fetches historical club records for a specific event type, age group(s), and gender.
 *
 * This function sends an authenticated POST request to retrieve one or more club records
 * matching the given criteria. It requires the caller to be a member of the club and
 * uses a JWT token for authorization.
 *
 * @async
 * @param {string} clubId - The unique identifier of the club (required).
 * @param {string} eventType - The type of the event (e.g., "80m Hurdles", "Discus") (required).
 * @param {string[]} ageGroups - An array of age group strings (e.g., ["12", "13", "16"]) (at least one required).
 * @param {string} gender - The gender classification (e.g., "F", "female", "women") (required).
 *
 * @returns {Promise<Array>} A promise that resolves to an array of club record objects.
 * Each object includes:
 *   - `athleteName` (string): The name of the athlete who holds the record.
 *   - `recordValue` (number): The value of the record. Times are in milliseconds, and distances are in meters.
 *   - `achievedAt` (string): The ISO date when the record was achieved (e.g., "2023-10-28T00:00:00").
 *   - `ageGroup` (string): The age group associated with the record.
 *
 * @example
 * const clubId = "6e4e5e7d-cf3a-4147-a13a-7883866f7b20";
 * const eventType = "80m Hurdles";
 * const ageGroups = ["12", "13", "16", "17"];
 * const gender = "F";
 * const records = await getClubRecords(clubId, eventType, ageGroups, gender);
 * // Output:
 * // [
 * //   {
 * //     athleteName: "Ellyse Schofield",
 * //     recordValue: 14930,
 * //     achievedAt: "2023-10-28T00:00:00",
 * //     ageGroup: "12"
 * //   },
 * //   {
 * //     athleteName: "Nicole Mullen",
 * //     recordValue: 14000,
 * //     achievedAt: "1999-10-01T00:00:00",
 * //     ageGroup: "13"
 * //   }
 * // ]
 *
 * @notes
 * - Supported event types include standard track events, hurdles, walking events, and field events.
 * - Age groups can range from "5" to "20" for youth or "Senior" and "Masters" for adults.
 * - Gender strings are case-insensitive and support variations like "male", "boys", "men" for males, and "female", "girls", "women" for females.
 * - Mixed age or gender queries are not supported.
 * - Ensure proper error handling for scenarios like missing or invalid parameters.
 */
export const getClubRecords = async (clubId, eventType, ageGroups, gender) => {
  return await authApi.post(`/clubRecords/get-club-records`, {
    clubId,
    eventType,
    ageGroups,
    gender,
  });
};

export const getAllClubRecords = async (clubId) => {
  return await authApi.get(`/clubRecords/all?clubId=${clubId}`);
};

export const getPendingClubRecords = async (clubId) => {
  return await authApi.get(`/clubRecords/pending?clubId=${clubId}`);
};

export const getPendingClubRecordsCount = async (clubId) => {
  return await authApi.get(`/ClubRecords/pending/count?clubId=${clubId}`);
};

export const updateStatusOfPendingClubRecordResult = async ( clubId, resultId, newStatus ) => {
  return await authApi.post(`/ClubRecords/update-status`, {
    clubId,
    resultId,
    newStatus
  });
}

