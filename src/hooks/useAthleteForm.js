import { useCallback, useEffect, useState } from 'react';
import { getClubMemberByEmail } from 'api/userApi';
import { handleCompetingAge } from 'utils/athlete';

const useAthleteForm = (initialValues, id, email) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchingMember, setFetchingMember] = useState(true);
  const [member, setMember] = useState({});
  const [competingAgeOptions, setCompetingAgeOptions] = useState([]);

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.firstName) newErrors.firstName = 'First name is required';
    if (!formValues.lastName) newErrors.lastName = 'Last name is required';

    if (!formValues.gender) newErrors.gender = 'Gender not selected';
    if (!formValues.birthday) newErrors.birthday = 'Birthday is required';
    if (!formValues.clubAthleteNumber)
      newErrors.clubAthleteNumber = 'Club ID Number is required';

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const fetchMember = useCallback(async () => {
    try {
      const response = await getClubMemberByEmail(id, email);
      setMember(response.data);
    } catch (err) {
      console.log('[AddAthlete] Fetch Member error: ', err);
    }
  }, [id, email]);

  useEffect(() => {
    fetchMember().then(() => setFetchingMember(false));
  }, [fetchMember]);

  useEffect(() => {
    handleCompetingAge(
      formValues,
      setFormValues,
      setCompetingAgeOptions,
      setErrors
    );
  }, [formValues]);

  return {
    formValues,
    setFormValues,
    errors,
    setErrors,
    loading,
    setLoading,
    fetchingMember,
    member,
    competingAgeOptions,
    validateForm,
    handleInputChange,
  };
};

export default useAthleteForm;
