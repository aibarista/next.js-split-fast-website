import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import routes from 'routes';
import styles from './AuthLayout.module.css';

import logoImage from 'assets/images/logo.png';
import MobileBackImage from 'assets/images/m_back.png';
import MobileCurveImage from 'assets/images/mobile_sad.png';
import Footer from '../../components/common/Footer';

const AuthLayout = () => {
  const location = useLocation();

  const getBackgroundStyle = () => {
    switch (location.pathname) {
      case routes.auth.login:
        return styles.defaultBackground;
      case routes.auth.register:
        return styles.defaultBackground;
      case routes.auth.general:
        return styles.ownerDetailBackground;
      case routes.auth.plan:
        return styles.ownerDetailBackground;
      default:
        return styles.defaultBackground;
    }
  };

  const mobileBackground = () => {
    switch (location.pathname) {
      case routes.auth.login:
        return MobileBackImage;
      case routes.auth.register:
        return MobileBackImage;
      case routes.auth.general:
        return MobileBackImage;
      case routes.auth.plan:
        return MobileBackImage;
      default:
        return MobileBackImage;
    }
  };

  return (
    <div
      className={`${styles.sectionHolder} ${getBackgroundStyle()} ${location.pathname === routes.auth.setupClub ? styles.ownerSetUpClubSectionHolder : ''}`}
    >
      <div className={styles.mobileBack}>
        <img src={mobileBackground()} alt="mobile_image" />
      </div>
      <div className={styles.sectionHolderWrapper}>
        <div className={styles.sContent}>
          <Link to={routes.admin.dashboard} className={styles.logoImage}>
            <img src={logoImage} alt="logo" />
          </Link>
          <Outlet />
          <div className={styles.mobileCurve}>
            <img src={MobileCurveImage} alt="mobile_curve_image" />
          </div>
        </div>
      </div>
      {routes.auth.setupClub ? <Footer /> : null}
    </div>
  );
};

export default AuthLayout;
