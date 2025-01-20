import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';
import routes from 'routes';

import { ReactComponent as HamburgerIcon } from 'assets/images/hamburger.svg';
import { ReactComponent as AlertIcon } from 'assets/images/icon_alert.svg';
import logoImage from 'assets/images/logo.png';

import SimpleClub from 'components/admin/SimpleClub';
import BadgeIcon from 'components/common/BadgeIcon';
import ProfileMenu from 'components/admin/ProfileMenu';

import { getUserInfo } from 'services/auth/tokenService';

const Header = ({ openMenu, club }) => {
  const userInfo = JSON.parse(getUserInfo());

  return (
    <div className={styles.bdpHeader}>
      <div className={styles.bdpHeaderWrapper}>
        <div className={styles.leftPart}>
          <div className={styles.hamburgerImage} onClick={openMenu}>
            <HamburgerIcon />
          </div>
          <Link to={routes.admin.dashboard} className={styles.logoImage}>
            <img src={logoImage} alt="logo" />
          </Link>
        </div>
        <SimpleClub club={club} />
        <div className={styles.rightPart}>
          <BadgeIcon icon={<AlertIcon />} number={0} />
          <ProfileMenu user={userInfo} clubId={club.clubID} />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  openMenu: PropTypes.func,
  club: PropTypes.object,
};

export default Header;
