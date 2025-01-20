import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './ResetPassword.module.css';
import routes from 'routes';
import { resetPassword } from 'api/authApi';
import MetaTags from 'components/common/MetaTags';
import CustomInput from 'components/common/CustomInput/CustomInput';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get('email');
  console.log('email: ', email);

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: email || '',
    code: '',
    password: '',
    repeat_password: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formValues.code) newErrors.code = 'Code is required';

    if (!formValues.password) {
      newErrors.password = 'Password is required';
    } else if (formValues.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*\d)/.test(formValues.password)) {
      newErrors.password = "Passwords must have at least one digit ('0'-'9')";
    } else if (!/(?=.*[a-z])/.test(formValues.password)) {
      newErrors.password =
        "Passwords must have at least one lowercase ('a'-'z')";
    } else if (!/(?=.*[A-Z])/.test(formValues.password)) {
      newErrors.password =
        "Passwords must have at least one uppercase ('A'-'Z')";
    }

    if (formValues.password !== formValues.repeat_password)
      newErrors.repeat_password = 'Password not matched';

    return newErrors;
  };

  const changePassword = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      try {
        await resetPassword(
          formValues.email,
          formValues.code,
          formValues.password
        );
        toast.success('Password updated successfully.');
        navigate(routes.auth.login);
      } catch (e) {
        console.log('error: ', e);
        toast.error(e.response.data.title || e.response.data);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <MetaTags title="SplitFast | ResetPassword" />
      <div className={styles.resetPasswordContainer}>
        <div className={styles.sectionHeading}>Reset password</div>
        <CustomInput
          label="Email"
          name="email"
          type="text"
          placeholder="Type email"
          value={formValues.email}
          error={errors.email}
          onChange={handleInputChange}
        />
        <CustomInput
          label="Code"
          name="code"
          type="text"
          placeholder="Type code"
          value={formValues.code}
          error={errors.code}
          onChange={handleInputChange}
        />
        <CustomInput
          label="Password"
          name="password"
          type="password"
          placeholder="Type password"
          value={formValues.password}
          error={errors.password}
          onChange={handleInputChange}
        />
        <CustomInput
          label="Repeat Password"
          name="repeat_password"
          type="password"
          placeholder="Type Password"
          value={formValues.repeat_password}
          error={errors.repeat_password}
          onChange={handleInputChange}
        />
        <CustomButton
          disabled={loading}
          onClick={changePassword}
          style={{
            ...defaultButtonStyle,
            maxWidth: 361,
          }}
        >
          Change password
        </CustomButton>
      </div>
    </>
  );
};

export default ResetPassword;
