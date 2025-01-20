import React from 'react';

import styles from './HomepageVideo.module.css';

import PlayIcon from 'assets/images/icon_play.png';

const HomepageVideo = () => {
  return (
    <div className={styles.hpDemo}>
      <div className={styles.hpDsectionWrapper}>
        <div className={styles.normalHeading}>Demo</div>
        <div className={styles.videoWrapper}>
          <div className={styles.itemVideo}></div>
          <div className={styles.playBtnWrapper}>
            <div className={styles.playBtn}>
              <img src={PlayIcon} alt="play" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageVideo;
