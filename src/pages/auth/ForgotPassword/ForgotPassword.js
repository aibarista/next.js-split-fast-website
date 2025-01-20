import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';
import routes from 'routes';
import { forgotPassword } from 'api/authApi';
import CustomInput from 'components/common/CustomInput/CustomInput';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';
import MetaTags from 'components/common/MetaTags';
import BackButton from 'components/auth/BackButton';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
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

    return newErrors;
  };

  const resetPassword = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      try {
        const response = await forgotPassword(formValues.email);
        toast.success(response.data);
        navigate(`${routes.auth.resetPassword}?email=${formValues.email}`);
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
      <MetaTags title="SplitFast | Reset password" />
      <BackButton navigate={navigate} />
      <div className={styles.forgotPasswordContainer}>
        <div className={styles.sectionHeading}>Reset password</div>
        <CustomInput
          label="Email"
          name="email"
          type="text"
          placeholder="Type your email"
          error={errors.email}
          onChange={handleInputChange}
        />
        <div className={styles.noteText}>
          <span>Note: </span>
          Enter your email address and click the Reset password button. If you
          have an account, a password reset code will be sent to your email.
        </div>
        <CustomButton
          disabled={loading}
          onClick={resetPassword}
          style={{
            ...defaultButtonStyle,
            maxWidth: 361,
          }}
        >
          Reset password
        </CustomButton>
      </div>
    </>
  );
};

export default ForgotPassword;
