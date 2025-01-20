import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './AdminMenu.module.css';
import routes from 'routes';

import { ReactComponent as HamburgerIcon } from 'assets/images/hamburger.svg';
import { ReactComponent as CloseIcon } from 'assets/images/icon_close.svg';

import logoImage from 'assets/images/logo.png';
import MenuClubList from 'components/navigation/MenuClubList';
import MenuLinkList from 'components/navigation/MenuLinkList';

const AdminMenu = ({ isOpened, closeMenu, selectedClub, clubs }) => {
  return (
    <div
      className={`${styles.mobileMenu} ${isOpened ? styles.mobileMenuActive : ''}`}
    >
      <div className={styles.mobileMenuWrapper}>
        <div className={styles.topPart}>
          <div className={styles.hamburgerImage} onClick={closeMenu}>
            <HamburgerIcon />
          </div>
          <Link to={routes.admin.dashboard} className={styles.logoImage}>
            <img src={logoImage} alt="logo" />
          </Link>
          <div className={styles.mobileMenuClose}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.mobileMenuOverflowWrapper}>
          <div>
            <MenuClubList selectedClub={selectedClub} clubs={clubs} />
            <MenuLinkList closeMenu={closeMenu} />
          </div>
        </div>
      </div>
    </div>
  );
};

AdminMenu.propTypes = {
  isOpened: PropTypes.bool,
  closeMenu: PropTypes.func,
  selectedClub: PropTypes.object,
  clubs: PropTypes.array,
};

export default AdminMenu;
