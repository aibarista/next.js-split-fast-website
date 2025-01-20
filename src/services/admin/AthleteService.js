/**
 * Transforms athlete data into a formatted object suitable for form usage.
 *
 * This function processes raw athlete data and converts it into a structured
 * format for use in forms or UI components. It ensures the data adheres to
 * specific types and formats required by the form fields.
 *
 * @param {Athlete} athlete - The raw athlete data object.
 *
 * @returns {Object} A formatted athlete data object for form usage.
 * @property {string} firstName - The first name of the athlete.
 * @property {string} lastName - The last name of the athlete.
 * @property {string} gender - The gender of the athlete.
 * @property {string} competingAge - The competing age group as a string.
 * @property {string} birthday - The athlete's birth date.
 * @property {string} participationStatus - The participation status in uppercase.
 * @property {string} clubAthleteNumber - The club athlete number as a string.
 *
 * @example
 * const athlete = {
 *   firstName: "John",
 *   lastName: "Doe",
 *   gender: "male",
 *   ageGroup: 18,
 *   birthDate: "2006-02-15",
 *   participationStatus: "active",
 *   clubAthleteNumber: 12345,
 * };
 *
 * const formData = getAthleteFormData(athlete);
 * // Output:
 * // {
 * //   firstName: "John",
 * //   lastName: "Doe",
 * //   gender: "male",
 * //   competingAge: "18",
 * //   birthday: "2006-02-15",
 * //   participationStatus: "ACTIVE",
 * //   clubAthleteNumber: "12345",
 * // }
 */
export const getAthleteFormData = (athlete) => {
  return {
    firstName: athlete.firstName,
    lastName: athlete.lastName,
    gender: athlete.gender,
    competingAge: athlete.ageGroup.toString(),
    birthday: athlete.birthDate,
    participationStatus: athlete.participationStatus.toUpperCase(),
    clubAthleteNumber: athlete.clubAthleteNumber.toString(),
  };
};

/**
 * Converts athlete form data into a formatted request object for API usage.
 *
 * This function processes data collected from a form and structures it into
 * a format required by the API to submit or update athlete details. It ensures
 * the data types are properly cast and aligned with the API's expectations.
 *
 * @param {AthleteFormData} athleteFormData - The data object from the athlete form.
 *
 * @returns {Object} A formatted request object for API submission.
 * @property {string} firstName - The first name of the athlete.
 * @property {string} lastName - The last name of the athlete.
 * @property {string} birthDate - The athlete's birth date.
 * @property {number} ageGroup - The competing age group as a number.
 * @property {string} gender - The gender of the athlete.
 * @property {string} participationStatus - The participation status as is.
 * @property {number} clubAthleteNumber - The club athlete number as a number.
 *
 * @example
 * const athleteFormData = {
 *   firstName: "John",
 *   lastName: "Doe",
 *   birthday: "2006-02-15",
 *   competingAge: "18",
 *   gender: "male",
 *   participationStatus: "ACTIVE",
 *   clubAthleteNumber: "12345",
 * };
 *
 * const apiRequest = getAthleteRequest(athleteFormData);
 * // Output:
 * // {
 * //   firstName: "John",
 * //   lastName: "Doe",
 * //   birthDate: "2006-02-15",
 * //   ageGroup: 18,
 * //   gender: "male",
 * //   participationStatus: "ACTIVE",
 * //   clubAthleteNumber: 12345,
 * // }
 */
export const getAthleteRequest = (athleteFormData) => {
  return {
    firstName: athleteFormData.firstName,
    lastName: athleteFormData.lastName,
    birthDate: athleteFormData.birthday,
    ageGroup: +athleteFormData.competingAge,
    gender: athleteFormData.gender,
    participationStatus: athleteFormData.participationStatus,
    clubAthleteNumber: +athleteFormData.clubAthleteNumber,
  };
};
