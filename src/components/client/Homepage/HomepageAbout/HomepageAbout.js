import React from 'react';

import styles from './HomepageAbout.module.css';

const HomepageAbout = () => {
  return (
    <div className={styles.hpSplitFastSection}>
      <div className={styles.hpSsectionWrapper}>
        <div className={styles.normalHeading}>About SplitFast</div>
        <div className={styles.hpStexts}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            commodo orci nec dolor ultrices consequat. Curabitur vehicula
            consectetur tellus eu vestibulum. Pellentesque convallis sem id
            lacus luctus gravida quis sed libero. Quisque auctor sapien vel
            mauris dignissim tempor. Vivamus tempor a ipsum a sollicitudin.
            Mauris a magna cursus, convallis risus quis, eleifend nibh. Sed
            porta mi sit amet risus pulvinar, nec auctor dolor pulvinar.
          </p>
          <p>
            Ut est augue, dictum non ipsum posuere, tincidunt ultrices diam.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in
            porta lorem, a imperdiet augue. Nunc efficitur faucibus libero a
            condimentum.
          </p>
          <p>Quisque lacinia dapibus arcu, at tempor mi tincidunt eget!</p>
        </div>
      </div>
    </div>
  );
};

export default HomepageAbout;
