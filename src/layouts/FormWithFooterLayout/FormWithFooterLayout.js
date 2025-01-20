import React from 'react';
import styles from './FormWithFooterLayout.module.css';
import { useNavigate, Outlet } from 'react-router-dom';
import MobileCurveImage from 'assets/images/mobile_sad.png';
import MobileBackImage from 'assets/images/m_back.png';
import Footer from 'components/common/Footer';
import BackButton from 'components/auth/BackButton';

const FormWithFooterLayout = () => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.sectionHolder} ${styles.defaultBackground}`}>
      <div className={styles.mobileBack}>
        <img src={MobileBackImage} alt="mobile_image" />
      </div>
      <div className={styles.sectionHolderWrapper}>
        <div className={styles.sContent}>
          <BackButton navigate={navigate} text="Do it later" />
          <Outlet />
          <BackButton navigate={navigate} text="Do it later" />
          <div className={styles.mobileCurve}>
            <img src={MobileCurveImage} alt="mobile_curve_image" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FormWithFooterLayout;
