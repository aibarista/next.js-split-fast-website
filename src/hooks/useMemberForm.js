import { useState } from 'react';

const useMemberForm = (initialValues) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.firstName) newErrors.firstName = 'First name is required';
    if (!formValues.lastName) newErrors.lastName = 'Last name is required';
    if (!formValues.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formValues.participationStatus)
      newErrors.participationStatus = 'Please select a participation status';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCheckboxChange = (name) => {
    setFormValues({ ...formValues, [name]: !formValues[name] });
  };

  const handleRadioChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  return {
    formValues,
    setFormValues,
    errors,
    setErrors,
    loading,
    setLoading,
    validateForm,
    handleInputChange,
    handleCheckboxChange,
    handleRadioChange,
  };
};

export default useMemberForm;
