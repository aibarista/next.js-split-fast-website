import { authApi } from 'api';

/**
 * Fetches the list of timezones from the API.
 * This function sends a GET request to the `/timezones` endpoint using the `authApi` instance.
 *
 * @returns {Promise} - Resolves with the API response containing the timezones.
 *                      Ensure proper handling of the response to access the data.
 *
 * Usage:
 * const timezones = await getTimezones();
 */
export const getTimezones = async () => {
  return await authApi.get(`/timezones`);
};
