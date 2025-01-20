import { authApi } from 'api';

export const createClubMember = async (userInfo) => {
  return await authApi.post('/Users/add-member', userInfo);
};

/**
 * Fetch the list of members for a specific club by sending a GET request to the '/users/{clubId}/members' endpoint.
 *
 * @param {string} clubId - The ID of the club whose members are to be fetched.
 * @returns {Promise} - The response from the API containing the list of members.
 */
export const getMembers = async (clubId) => {
  return await authApi.get(`/users/${clubId}/members-profiles`);
};

/**
 * Fetches a club member's details by their email.
 *
 * This function sends a GET request to the `/users/{clubId}/members/{email}` endpoint
 * to retrieve details of a specific club member associated with the given club ID and email.
 *
 * @param {string} clubId - The unique identifier of the club.
 * @param {string} email - The email address of the member to fetch.
 * @returns {Promise<Object>} - A promise that resolves with the response from the server,
 *   containing the club member's details.
 *
 * Example usage:
 * const memberDetails = await getClubMemberByEmail('12345', 'member@example.com');
 */
export const getClubMemberByEmail = async (clubId, email) => {
  return await authApi.get(`/users/${clubId}/members/${email}`);
};

/**
 * Fetches athletes associated with a specific club member's email.
 *
 * This function sends a GET request to the `/users/{clubId}/members/{email}/athletes` endpoint
 * to retrieve the list of athletes linked to the specified club member identified by their email.
 *
 * @param {string} clubId - The unique identifier of the club.
 * @param {string} email - The email address of the member whose athletes are to be fetched.
 * @returns {Promise<Array>} - A promise that resolves with the response from the server,
 *   containing an array of athletes linked to the club member.
 *
 * Example usage:
 * const athletes = await getAthletesByMemberEmail('12345', 'member@example.com');
 */
export const getAthletesByMemberEmail = async (clubId, email) => {
  return await authApi.get(`/users/clubs/${clubId}/members/${email}/athletes`);
};

/**
 * Updates the details of a specific club member.
 *
 * This function sends a PUT request to the `/users/clubs/{clubId}/members/{email}` endpoint
 * to update the information of a club member identified by their email address within a specific club.
 *
 * @param {string} clubId - The unique identifier of the club where the member belongs.
 * @param {string} email - The email address of the member to be updated.
 * @param {Object} updateInfo - An object containing the updated member information.
 * @returns {Promise<Object>} - A promise that resolves with the server's response,
 *   typically containing the updated member details or confirmation of the update.
 *
 * Example usage:
 * const updatedMember = await updateMember('12345', 'member@example.com', { name: 'John Doe', status: 'active' });
 */
export const updateMember = async (clubId, email, updateInfo) => {
  return await authApi.put(
    `/users/clubs/${clubId}/members/${email}`,
    updateInfo
  );
};

/**
 * Adds a new athlete to the system using their email.
 *
 * This function sends a POST request to the `/users/add-athlete-by-email` endpoint
 * with the athlete's information to register them in the system.
 *
 * @param {Object} athleteInfo - An object containing the athlete's details, such as name, email, and other relevant data.
 * @returns {Promise<Object>} - A promise that resolves with the server's response,
 *   typically confirming the successful addition of the athlete or providing details about the newly added athlete.
 *
 * Example usage:
 * const newAthlete = await addAthlete({ name: 'Jane Doe', email: 'jane.doe@example.com', clubId: '12345' });
 */
export const addAthlete = async (athleteInfo) => {
  return await authApi.post('/users/add-athlete-by-email', athleteInfo);
};

/**
 * Sends an invitation to join a club.
 *
 * This function sends a POST request to the `/users/send-club-invitation` endpoint
 * to invite a user to join a specific club. It includes the option to force resending
 * the invitation if it has already been sent previously.
 *
 * @param {string} clubID - The unique identifier of the club to which the invitation is being sent.
 * @param {string} email - The email address of the user to whom the invitation is sent.
 * @returns {Promise<Object>} - A promise that resolves with the server's response, typically confirming the invitation's success or providing error details.
 *
 * Example usage:
 * const response = await sendInvitation('12345', 'user@example.com');
 * console.log(response);
 */
export const sendInvitation = async (clubID, email) => {
  return await authApi.post(`/users/send-club-invitation`, {
    clubID,
    email,
    forceResend: true,
  });
};

/**
 * Fetches the details of an athlete by their profile ID within a specific club.
 *
 * This function sends a GET request to the `/users/clubs/:clubId/athlete/:athleteProfileId` endpoint
 * to retrieve information about a specific athlete in a given club.
 *
 * @param {string} clubId - The unique identifier of the club to which the athlete belongs.
 * @param {string} athleteProfileId - The unique identifier of the athlete's profile.
 * @returns {Promise<Object>} - A promise that resolves with the athlete's details from the server.
 *
 * Example usage:
 * const athleteDetails = await getAthlete('12345', '67890');
 * console.log(athleteDetails);
 */
export const getAthlete = async (clubId, athleteProfileId) => {
  return await authApi.get(
    `/users/clubs/${clubId}/athlete/${athleteProfileId}`
  );
};

/**
 * Updates the details of an athlete in a specific club.
 *
 * This function sends a PUT request to the `/users/clubs/:clubId/athletes/:athleteId` endpoint
 * with the updated athlete information to modify the athlete's details.
 *
 * @param {string} clubId - The unique identifier of the club the athlete belongs to.
 * @param {string} athleteId - The unique identifier of the athlete to be updated.
 * @param {Object} updateInfo - An object containing the updated athlete details.
 *   This could include properties like `name`, `age`, `team`, or other attributes.
 * @returns {Promise<Object>} - A promise that resolves with the server's response,
 *   indicating the success or failure of the update.
 *
 * Example usage:
 * const updateInfo = { name: 'John Doe', team: 'Team A' };
 * const response = await updateAthlete('12345', '67890', updateInfo);
 * console.log(response);
 */
export const updateAthlete = async (clubId, athleteId, updateInfo) => {
  return await authApi.put(
    `/users/clubs/${clubId}/athletes/${athleteId}`,
    updateInfo
  );
};

/**
 * Fetches the most recent meet details for a specific athlete in a given club.
 *
 * @param {string} clubId - The ID of the club.
 * @param {string} athleteId - The ID of the athlete.
 * @returns {Promise<Object>} - A promise that resolves with the recent meet details.
 */
export const getRecentMeetByAthleteId = async (clubId, athleteId) => {
  return await authApi.post('/athletedashboard/recent-meet', {
    clubId,
    athleteId,
  });
};

/**
 * Fetches the list of past meets for the current season for a specific athlete in a given club.
 *
 * @param {string} clubId - The ID of the club.
 * @param {string} athleteId - The ID of the athlete.
 * @returns {Promise<Object>} - A promise that resolves with the list of past meets for the current season.
 */
export const getPastMeetAtCurrentSeason = async (clubId, athleteId) => {
  return await authApi.post('/athletedashboard/past-meets', {
    clubId,
    athleteId,
  });
};

/**
 * Fetches the event history for a specific athlete in a given club based on the event type.
 *
 * @param {string} clubId - The ID of the club.
 * @param {string} athleteId - The ID of the athlete.
 * @param {string} eventType - The type of the event (e.g., race, competition).
 * @returns {Promise<Object>} - A promise that resolves with the event history.
 */
export const getEventHistory = async (clubId, athleteId, eventType) => {
  return await authApi.post('/athletedashboard/event-history', {
    clubId,
    athleteId,
    eventType,
  });
};
