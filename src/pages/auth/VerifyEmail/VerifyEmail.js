import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './VerifyEmail.module.css';

import { confirmInvitation } from 'api/authApi';
import routes from 'routes';
import CustomInput from 'components/common/CustomInput/CustomInput';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';
import LabelText from 'components/common/LabelText';

const VerifyEmail = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const email = searchParams.get('email');
  const clubId = searchParams.get('clubId');

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = React.useState({
    code: '',
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

    if (!formValues.code) {
      newErrors.code = 'Code is required';
    }

    return newErrors;
  };

  const clickVerifyEmail = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      try {
        const response = await confirmInvitation(
          clubId,
          atob(email),
          formValues.code
        );
        toast.success('Email verified successfully.');
        if (response.data.needsPassword) {
          navigate(`${routes.auth.setPassword}?email=${email}`);
        } else {
          navigate(routes.auth.login);
        }
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
      <div className={styles.findClubsContainer}>
        <div className={styles.sectionHeading}>Input the code</div>
        <LabelText
          label="Your Email"
          text={email ? atob(email) : ''}
          style={{ marginBottom: 30 }}
        />
        <CustomInput
          name="code"
          placeholder="Enter your code"
          style={{
            marginBottom: 256,
          }}
          inputStyle={{
            fontSize: '20px',
            height: '60',
          }}
          onChange={handleInputChange}
          error={errors.code}
        />
        <div className={styles.noteText}>
          <span>Note: </span>
          To complete your registration, please enter the verification code sent
          to your email. Simply input the code below to confirm your email
          address. If you haven’t received the code, check your spam folder or
          request a new code.
        </div>
        <CustomButton
          disabled={loading}
          onClick={clickVerifyEmail}
          style={{
            ...defaultButtonStyle,
            maxWidth: 361,
          }}
        >
          Verify
        </CustomButton>
      </div>
    </>
  );
};

export default VerifyEmail;
