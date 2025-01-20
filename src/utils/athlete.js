/**
 * Calculates the age based on the given birthday.
 *
 * @param {string} birthday - The birthday string in the format "YYYY-MM-DD".
 * @returns {number} The calculated age.
 * @throws {Error} If the birthday format is invalid or in the future.
 *
 * @example
 * calculateAge("2000-12-16"); // Returns 24 (as of 2024)
 * calculateAge("1990-01-01"); // Returns 34 (as of 2024)
 */
export const calculateAge = (birthday) => {
  const birthdayRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  const match = birthday.match(birthdayRegex);

  if (!match) {
    throw new Error(
      "Invalid birthday format. Expected format is 'YYYY-MM-DD'."
    );
  }

  const [year, month, day] = birthday.split('-').map(Number);

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  if (birthDate > today) {
    throw new Error('Birthday cannot be in the future.');
  }

  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust age if the birthday hasn't occurred yet this year
  const birthdayThisYear = new Date(today.getFullYear(), month - 1, day);
  if (today < birthdayThisYear) {
    age--;
  }

  return age;
};

/**
 * Generates an array of competing age options based on the given age.
 *
 * @param {number} age - The current age to generate options for.
 * @returns {Array<{value: number, label: string}>} An array of competing age options.
 *
 * @example
 * generateCompetingAgeOptions(15); // Returns [{ value: 14, label: '14' }, { value: 15, label: '15' }, { value: 16, label: '16' }]
 * generateCompetingAgeOptions(1); // Returns [{ value: 1, label: '1' }, { value: 2, label: '2' }]
 */
export const generateCompetingAgeOptions = (age) => {
  if (age < 0) {
    throw new Error('Age must be a positive number.');
  }

  const competingAgeOptions = [];

  for (let i = -1; i <= 1; i++) {
    const currentAge = age + i;
    if (currentAge >= 0) {
      competingAgeOptions.push({
        value: currentAge,
        label: String(currentAge),
      });
    }
  }

  return competingAgeOptions;
};

/**
 * Handles the logic for setting competing age and updating form values.
 *
 * Steps:
 * 1. Validates if a birthday is provided in the form values.
 * 2. Calculates the age based on the provided birthday using `calculateAge`.
 * 3. Generates competing age options (e.g., age ± 1) using `generateCompetingAgeOptions`.
 * 4. Sets the competing age options into the state via `setCompetingAgeOptions`.
 * 5. Updates the `competingAge` field in form values if it is empty.
 * 6. Catches any errors (e.g., invalid birthday format) and updates the `errors` state.
 *
 * @param {Object} formValues - The current form values.
 * @param {Function} setFormValues - Function to update the form values state.
 * @param {Function} setCompetingAgeOptions - Function to set competing age options in the state.
 * @param {Function} setErrors - Function to update error messages in the state.
 */
export const handleCompetingAge = (
  formValues,
  setFormValues,
  setCompetingAgeOptions,
  setErrors
) => {
  try {
    // Check if birthday is provided and not empty
    if (formValues.birthday && formValues.birthday !== '') {
      // Calculate age from the birthday
      const age = calculateAge(formValues.birthday);

      // Generate competing age options (e.g., age ± 1 within valid bounds)
      const competingAgeOptions = generateCompetingAgeOptions(age);

      // Update competing age options in the state
      setCompetingAgeOptions(competingAgeOptions);

      // If competingAge field is empty, set it to the calculated age
      if (!formValues.competingAge || formValues.competingAge === '') {
        setFormValues((prevState) => ({
          ...prevState,
          competingAge: age.toString(),
        }));
      }
    }
  } catch (e) {
    // If an error occurs (e.g., invalid birthday format), update errors state
    const newErrors = {};
    newErrors.birthday = e.message;
    setErrors(newErrors);
  }
};
