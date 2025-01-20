import React from 'react';

import styles from './HomepageReady.module.css';

const HomepageReady = () => {
  return (
    <div className={styles.hpReady}>
      <div className={styles.hpRsectionWrapper}>
        <div className={styles.bigHeading}>Ready to up your game?</div>
        <div className={styles.forFreeBtn}>Get started for free</div>
      </div>
    </div>
  );
};

export default HomepageReady;
