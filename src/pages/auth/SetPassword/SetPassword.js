import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './SetPassword.module.css';

import routes from 'routes';
import { setPassword as changePassword } from 'api/authApi';

import LabelText from 'components/common/LabelText';
import CustomInput from 'components/common/CustomInput/CustomInput';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';
import MetaTags from '../../../components/common/MetaTags';

const SetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get('email');

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
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

  const setPassword = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      try {
        await changePassword(atob(email), formValues.password);
        toast.success('Password set successfully.');
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
      <MetaTags title="SplitFast | Set password" />
      <div className={styles.findClubsContainer}>
        <div className={styles.sectionHeading}>Set password</div>
        <LabelText
          label="Your Email"
          text={email ? atob(email) : ''}
          style={{ marginBottom: 30 }}
        />
        <CustomInput
          label="Password"
          name="password"
          type="password"
          placeholder="Type password"
          error={errors.password}
          onChange={handleInputChange}
        />
        <CustomInput
          label="Repeat Password"
          name="repeat_password"
          type="password"
          placeholder="Type Password"
          error={errors.repeat_password}
          onChange={handleInputChange}
        />
        <div className={styles.noteText}>
          <span>Note: </span>
          To complete your registration, please set a secure password for your
          account. Make sure your password meets the required criteria for your
          safety. After entering your new password, confirm it below to finalize
          the setup.
        </div>
        <CustomButton
          disabled={loading}
          onClick={setPassword}
          style={{
            ...defaultButtonStyle,
            maxWidth: 361,
          }}
        >
          Set password
        </CustomButton>
      </div>
    </>
  );
};

export default SetPassword;
