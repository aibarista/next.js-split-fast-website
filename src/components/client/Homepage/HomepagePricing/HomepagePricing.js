import React from 'react';

import styles from './HomepagePricing.module.css';

const HomepagePricing = () => {
  return (
    <div className={styles.hpPricing}>
      <div className={styles.hpPsectionWrapper}>
        <div className={styles.normalHeading}>Pricing for Club Owners</div>
        <div className={styles.sectionItems}>
          <div className={styles.sectionItem}>
            <span>What are the plans?</span>
            <div className={styles.itemBtn}>Choose This Plan</div>
          </div>
          <div className={`${styles.sectionItem} ${styles.sectionItemActive}`}>
            <span>What are the plans?</span>
            <div className={styles.itemBtn}>Choose This Plan</div>
          </div>
          <div className={styles.sectionItem}>
            <span>What are the plans?</span>
            <div className={styles.itemBtn}>Choose This Plan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepagePricing;
