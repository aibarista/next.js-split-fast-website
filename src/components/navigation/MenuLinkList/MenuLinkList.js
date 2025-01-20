import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './MenuLinkList.module.css';
import { links } from 'config/admin/menu';
import { getClubRole } from 'services/auth/tokenService';

const MenuLinkList = ({ closeMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const clubRole = getClubRole();

  return (
    <div className={styles.menuLinkList}>
      {links.map(
        (link, index) =>
          (!link.allowedRoles ||
            link.allowedRoles.indexOf(clubRole) !== -1) && (
            <div
              onClick={() => {
                navigate(link.url);
                closeMenu();
              }}
              key={index}
              className={`${styles.menuLinkItem} ${location.pathname === link.url ? styles.menuLinkItemActive : ''}`}
            >
              <div className={styles.image}>{link.icon}</div>
              <div className={styles.menuLinkName}>{link.name}</div>
            </div>
          )
      )}
    </div>
  );
};

MenuLinkList.propTypes = {
  closeMenu: PropTypes.func.isRequired,
};

export default MenuLinkList;
