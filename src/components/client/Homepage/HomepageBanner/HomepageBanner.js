import React from 'react';

import styles from './HomepageBanner.module.css';

import OverlayImage from 'assets/images/overlay_bg.png';

const HomepageBanner = () => {
  return (
    <div className={styles.hpBanner}>
      <div className={styles.hpBannerOverlay}>
        <img src={OverlayImage} alt="overlay" />
      </div>
      <div className={styles.hpBsectionWrapper}>
        <div className={styles.hpBheading}>
          Athletics management: <span>elevated.</span>
        </div>
        <div className={styles.hpBsubheading}>
          All-in-One Solution for Competition Scheduling, <br />
          Real-Time Results, and Athlete Performance Management
        </div>
        <div className={styles.forFreeBtn}>Get started for free</div>
      </div>
    </div>
  );
};

export default HomepageBanner;
