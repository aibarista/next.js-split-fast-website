/**
 * @typedef {Object} Meet
 * @property {string} ageGroups
 * @property {string} clubID
 * @property {string} description
 * @property {string} eventTypes
 * @property {string} location
 * @property {string} meetDate
 * @property {string} meetID
 * @property {string} meetName
 * @property {string} meetStatus
 * @property {0 | 1} meetType
 * @property {'AdminOnly' | 'ClubMembers'} publishingAccess
 * @property {string} timeZone
 */

/**
 * @typedef {Object} MeetDetail
 * @property {string} ageGroups
 * @property {string} clubID
 * @property {string} description
 * @property {string} eventTypes
 * @property {string} location
 * @property {string} meetDate
 * @property {string} meetID
 * @property {string} meetName
 * @property {string} meetStatus
 * @property {'Training' | 'Competition'} meetType
 * @property {'AdminOnly' | 'ClubMembers'} publishingAccess
 * @property {string} timeZone
 */

/**
 * @typedef {Object} MeetFormData
 * @property {string} meetName
 * @property {string} date
 * @property {string} time
 * @property {Timezone} timezone
 * @property {string} description
 * @property {'0' | '1'} meetType
 * @property {string} location
 * @property {string[]} ageGroups
 * @property {string[]} multiLaneEvents
 * @property {string[]} hurdleEvents
 * @property {string[]} relayEvents
 * @property {string[]} groupDistanceEvents
 * @property {string[]} walkEvents
 * @property {string[]} sprintAgilityTraining
 * @property {string[]} fieldEvents
 * @property {string} meetStatus
 */

/**
 * @typedef {Object} MeetRequest
 * @property {string} meetName
 * @property {'0' | '1'} meetType
 * @property {string} meetDate
 * @property {string} timeZone
 * @property {string} location
 * @property {string} description
 * @property {string} meetStatus
 * @property {string[]} ageGroups
 * @property {string[]} eventTypes
 */
