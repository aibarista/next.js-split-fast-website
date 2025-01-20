import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './Header.module.css';
import routes from 'routes';

import LogoImage from 'assets/images/logo.png';
import UserIcon from 'assets/images/Login_Icon@2x.png';

const headerLinks = [
  {
    url: routes.client.home,
    text: 'About',
  },
  {
    url: routes.auth.login,
    text: 'Pricing',
  },
  {
    url: routes.auth.register,
    text: 'Demo',
  },
];

const Header = () => {
  const location = useLocation();

  return (
    <>
      <div className={styles.hpHeader}>
        <div className={styles.hpHeaderWrapper}>
          <Link to={routes.admin.dashboard} className={styles.hpHlogImage}>
            <img src={LogoImage} alt="logo" />
          </Link>
          <div className={styles.hpHrightParts}>
            {headerLinks.map((link, index) => (
              <Link
                key={index}
                to={link.url}
                className={`${styles.hpHheaderBtn} ${location.pathname === link.url ? styles.redBtn : ''}`}
              >
                {link.text}
              </Link>
            ))}
            <Link to={routes.auth.login} className={styles.hpHheaderLoginBtn}>
              <div className={styles.hpHloginImage}>
                <img src={UserIcon} alt="login" />
              </div>
              <div className={styles.hpHloginText}>Login</div>
            </Link>
            <Link
              to={routes.auth.register}
              className={styles.hpHheaderRegisterBtn}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
