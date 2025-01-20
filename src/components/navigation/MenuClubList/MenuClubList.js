import React from 'react';
import PropTypes from 'prop-types';

import styles from './MenuClubList.module.css';

import { ReactComponent as ArrowIcon } from 'assets/images/icon_arrow.svg';
import { ReactComponent as ShortArrowIcon } from 'assets/images/icon_short_arrow.svg';

import clubImage from 'assets/images/turboTrackIcon.png';
import { getPortalRole } from '../../../services/auth/tokenService';

const MenuClubList = ({ selectedClub, clubs }) => {
  const [isOpened, setIsOpened] = React.useState(false);

  const portalRole = getPortalRole();
  return (
    <div
      className={`${styles.menuClubListContainer} ${isOpened ? styles.menuClubListContainerActive : ''}`}
      onClick={() => setIsOpened(!isOpened)}
    >
      <div className={styles.selectedClub}>
        <div className={styles.selectedClubImage}>
          <img src={selectedClub?.image || clubImage} alt="club" />
        </div>
        <div className={styles.selectedClubInfo}>
          <div className={styles.selectedClubName}>
            {selectedClub?.clubName}
          </div>
          <div className={styles.selectedClubRole}>
            {selectedClub?.userRole}
          </div>
        </div>
        <div className={styles.image}>
          <ArrowIcon />
        </div>
      </div>
      <div className={styles.menuClubList}>
        <div className={styles.menuClubListWrapper}>
          {clubs?.map((item, i) => (
            <div key={i} className={styles.menuClubItem}>
              <div className={styles.menuClubItemImage}>
                <img src={item.image || clubImage} alt="PNG" />
              </div>
              <div className={styles.menuClubName}>{item.clubName}</div>
              <div className={styles.image}>
                <ShortArrowIcon />
              </div>
            </div>
          ))}
        </div>
        {portalRole === 'AccountOwner' && (
          <div className={styles.addClubButton}>+Add a club</div>
        )}
      </div>
    </div>
  );
};

MenuClubList.propTypes = {
  selectedClub: PropTypes.object,
  clubs: PropTypes.array,
};

export default MenuClubList;
