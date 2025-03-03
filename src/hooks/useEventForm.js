import { useState } from 'react';

const useEventForm = (initialValues) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.eventType)
      newErrors.eventType = 'Please select the event type';
    if (!formValues.gender) newErrors.gender = 'Gender is required';
    if (!formValues.ageGroup)
      newErrors.ageGroup = 'Please select the age group';
    if (!formValues.roundType) newErrors.roundType = 'Round type is required';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return {
    formValues,
    setFormValues,
    errors,
    setErrors,
    validateForm,
    handleInputChange,
    loading,
    setLoading,
  };
};

export default useEventForm;
