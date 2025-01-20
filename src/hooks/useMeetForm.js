import { useState } from 'react';

const useMeetForm = (initialValues) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.meetName) newErrors.meetName = 'Meet name is required';
    if (!formValues.date) newErrors.date = 'Date is required';
    if (!formValues.time) newErrors.time = 'Time is required';
    if (!formValues.description)
      newErrors.description = 'Description is required';
    if (!formValues.meetType)
      newErrors.meetType = 'Please select the meet type';
    if (!formValues.location) newErrors.location = 'Location is required';
    if (!formValues.ageGroups.length)
      newErrors.ageGroups = 'Please select the age groups';
    if (!formValues.meetStatus)
      newErrors.meetStatus = 'Please select the status';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRadioChange = (name, value) => {
    setFormValues((prev) => {
      if (prev[name].includes(value)) {
        return {
          ...formValues,
          [name]: prev[name].filter((v) => v !== value),
        };
      } else {
        return {
          ...formValues,
          [name]: [...prev[name], value],
        };
      }
    });
  };

  const handleTimeChange = (time) => {
    setFormValues({ ...formValues, time });
  };

  const handleTimezoneChange = (timezone) => {
    setFormValues({
      ...formValues,
      timezone: {
        id: timezone,
        displayName: timezone,
      },
    });
  };

  return {
    formValues,
    setFormValues,
    errors,
    setErrors,
    validateForm,
    handleInputChange,
    handleRadioChange,
    handleTimeChange,
    handleTimezoneChange,
    loading,
    setLoading,
  };
};

export default useMeetForm;
