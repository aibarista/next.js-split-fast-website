import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './MenuLinkList.module.css';
import { links } from 'config/admin/menu';
import { getClubRole } from 'services/auth/tokenService';
import { useSelector } from 'react-redux';

const MenuLinkList = ({ closeMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const clubRole = getClubRole();
  const { clubRecordsPendingCount } = useSelector((state) => state.user || 0);

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
              {link.pending && clubRecordsPendingCount > 0 && (
                <div className={styles.badge}>
                  {clubRecordsPendingCount} new
                </div>
              )}
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
