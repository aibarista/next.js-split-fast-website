import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './Login.module.css';
import routes from 'routes';

import { login } from 'api/authApi';
import { decodeToken } from 'utils/auth';
import {
  setPortalRole,
  setToken,
  setUserEmail,
  setUserInfo,
} from 'services/auth/tokenService';

import CustomInput from 'components/common/CustomInput/CustomInput';
import CustomButton from 'components/common/CustomButton';
import TextLink from 'components/common/TextLink';
import CustomCheckbox from 'components/common/CustomCheckbox';
import MetaTags from 'components/common/MetaTags';

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
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
    if (!formValues.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const clickLoginButton = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      try {
        const response = await login(formValues);
        const token = response.data.token;

        const storage = rememberMe ? localStorage : sessionStorage;
        setToken(storage, token);
        setUserInfo(
          storage,
          JSON.stringify({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
          })
        );

        setUserEmail(storage, formValues.email);
        const portalRole = decodeToken(token).userRole;
        setPortalRole(portalRole);

        toast.success('Login successfully.');
        navigate(routes.admin.dashboard);
        // await loadClubs();
      } catch (e) {
        console.log('error: ', e);
        toast.error(e.response?.data || 'Login Failed');
      } finally {
        setLoading(false);
      }
    }
  };

  // const loadClubs = async () => {
  //   try {
  //     const response = await getClubs();

  //     const clubs = response.data;

  //     const token = getToken();
  //     const portalRole = decodeToken(token).userRole;

  //     setPortalRole(portalRole);

  //     if (clubs.length > 0) {
  //       navigate(routes.admin.dashboard);
  //     } else {
  //       if (portalRole === 'AccountOwner') {
  //         navigate(routes.auth.setupClub);
  //       } else {
  //         navigate(routes.auth.findClubs);
  //       }
  //     }
  //   } catch (err) {
  //     toast.error(err.message);
  //     navigate(routes.auth.login);
  //   }
  // };

  return (
    <>
      <MetaTags title="SplitFast | Login" />
      <div className={styles.loginContent}>
        <div className={styles.loginInputWrappers}>
          <CustomInput
            label="Email Address"
            type="text"
            name="email"
            placeholder="myemail@gmail.com"
            error={errors.email}
            onChange={handleInputChange}
          />
          <CustomInput
            label="Password"
            type="password"
            name="password"
            placeholder="Type password"
            error={errors.password}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.lrmForgotP}>
          <CustomCheckbox
            label="Remember Me"
            onChange={() => setRememberMe(!rememberMe)}
            checked={rememberMe}
            style={{ margin: 0 }}
            labelStyle={{ fontWeight: 'normal' }}
          />
          <Link
            to={routes.auth.forgotPassword}
            className={styles.forgotPassword}
          >
            Forgot Password?
          </Link>
        </div>
        <CustomButton disabled={loading} onClick={clickLoginButton}>
          Log in
        </CustomButton>
        <TextLink
          text="Don't have an account?"
          link={routes.auth.login}
          linkText="Register Now"
        />
      </div>
    </>
  );
};

export default Login;
