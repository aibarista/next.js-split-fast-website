import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authInfoUpdate } from 'services/auth/authSlice';

import styles from './OwnerDetail.module.css';

import routes from 'routes';
import { createMemberAccount } from 'api/authApi';

import googleIcon from 'assets/images/Google_Icon.png';
import appleIcon from 'assets/images/Apple_Icon.png';

import CustomInput from 'components/common/CustomInput/CustomInput';
import CustomButton from 'components/common/CustomButton';
import TextLink from 'components/common/TextLink';
import CircleText from 'components/common/CircleText';
import IconTextButton from 'components/common/IconTextButton';
import BackButton from 'components/auth/BackButton';
import CustomSelect from 'components/common/CustomSelect';
import CustomDatePicker from 'components/common/CustomDatePicker';
import NameInputBox from 'components/common/NameInputBox';
import { GENDER_OPTIONS } from 'constants';

const OwnerDetail = () => {
  const navigate = useNavigate();

  const { authInfo } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();

  const selectedUserType = authInfo?.userType;

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeat_password: '',
    gender: '',
    birthday: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!selectedUserType) {
      toast.warn('Please select the user type');

      navigate(routes.auth.register);
    }
  }, [navigate, selectedUserType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.firstName) newErrors.firstName = 'First name is required';
    if (!formValues.lastName) newErrors.lastName = 'Last name is required';
    if (!formValues.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Email address is invalid';
    }
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

    if (!formValues.gender) newErrors.gender = 'Gender not selected';

    if (!formValues.birthday) newErrors.birthday = 'Birthday is required';

    return newErrors;
  };

  const handleButton = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch(
        authInfoUpdate({
          ...authInfo,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          password: formValues.password,
          gender: formValues.gender,
          birthday: formValues.birthday,
        })
      );
      if (selectedUserType === 'Owner') {
        navigate(routes.auth.plan);
      } else if (selectedUserType === 'Member') {
        setLoading(true);
        try {
          await createMemberAccount(authInfo);
          navigate(routes.auth.verifyEmail);
        } catch (err) {
          console.log(err);
          toast.error(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        toast.warn('Please select the user type');
        navigate(routes.auth.register);
      }
    }
  };

  return (
    <>
      <BackButton navigate={navigate} />
      <div className={styles.formContainer}>
        <div className={styles.sectionHeading}>General Details</div>
        <div className={styles.inputItems}>
          <NameInputBox
            formValues={formValues}
            errors={errors}
            handleInputChange={handleInputChange}
          />
          <CustomInput
            label="Email Address"
            name="email"
            placeholder="myemail@gmail.com"
            error={errors.email}
            onChange={handleInputChange}
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
          <CustomSelect
            label="Gender"
            name="gender"
            onChange={handleInputChange}
            options={GENDER_OPTIONS}
            value={formValues.gender}
            error={errors.gender}
          />
          <CustomDatePicker
            label="Date of Birth"
            name="birthday"
            onChange={handleInputChange}
            error={errors.birthday}
          />
        </div>
        <CustomButton onClick={handleButton} disabled={loading}>
          {selectedUserType === 'Member' ? 'Register' : 'Next'}
        </CustomButton>
        <TextLink
          text="Already have an account?"
          link={routes.auth.login}
          linkText="Log in"
        />
        <CircleText>or</CircleText>
        <IconTextButton
          text="Continue with Google"
          icon={<img src={googleIcon} alt={text} />}
          borderColor="#e1edf3"
        />
        <IconTextButton
          text="Continue with Apple"
          icon={<img src={appleIcon} alt={text} />}
          textColor="#fff"
          bgColor="#101010"
          borderColor="#101010"
        />
      </div>
    </>
  );
};

export default OwnerDetail;
