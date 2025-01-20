import React from 'react';
import styles from './AuthTab.module.css';
import { Link, useLocation } from 'react-router-dom';
import routes from 'routes';

const AuthTab = () => {
  const location = useLocation();

  return (
    <div className={styles.loginRegisterHeader}>
      <Link
        to={routes.auth.login}
        className={`${styles.lrHead} ${location.pathname === routes.auth.login ? styles.lrHeadActive : ''}`}
      >
        Login
      </Link>
      <Link
        to={routes.auth.register}
        className={`${styles.lrHead} ${location.pathname === routes.auth.register ? styles.lrHeadActive : ''}`}
      >
        Register
      </Link>
    </div>
  );
};

export default AuthTab;
