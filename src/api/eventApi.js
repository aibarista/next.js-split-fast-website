import authApi from './index';

/****
 *Request - {
  "eventID": "string",
  "clubID": "string",
  "meetID": "string",
  "eventType": "string",
  "ageGroup": "string",
  "gender": "string",
  "roundType": "string",
  "roundNumber": 0,
  "eventStatus": "string",
  "publishingStatus": "string"
}
 */
export const addEvent = async (payload) => {
  return await authApi.post(`/events`, payload);
};

export const EditEvent = async (
  clubID,
  meetID,
  eventID,
  eventType,
  ageGroup,
  gender,
  roundType,
  publishingStatus,
  eventStatus = 'Upcoming',
  roundNumber = 0
) => {
  return await authApi.put(`/events`, {
    clubID,
    eventID,
    meetID,
    eventType,
    ageGroup,
    gender,
    roundType,
    eventStatus,
    publishingStatus,
  });
};
