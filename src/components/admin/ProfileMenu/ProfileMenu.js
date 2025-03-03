import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import routes from 'routes';
import { logout } from 'api/authApi';

import styles from './ProfileMenu.module.css';
import SimpleProfile from 'components/common/SimpleProfile';
import { getUserEmail } from '../../../services/auth/tokenService';
import { useDispatch } from 'react-redux';
import { logout as logoutSlice } from 'services/user/userSlice';

const ProfileMenu = ({ user, clubId }) => {
  const navigate = useNavigate();
  const email = getUserEmail();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showMenu) {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setShowMenu(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showMenu]);

  const handleLogout = () => {
    logout().then(() => {
      dispatch(logoutSlice());
      navigate(routes.client.home);
    });
  };

  return (
    <div
      ref={menuRef}
      className={`${styles.profileMenu} ${showMenu ? styles.profileMenuActive : ''}`}
    >
      <SimpleProfile user={user} onClick={() => setShowMenu(!showMenu)} />
      {showMenu && (
        <div className={styles.menuContainer}>
          <div>
            <div
              className={styles.menuItem}
              onClick={() => {
                navigate(routes.admin.showMember.url(clubId, email));
                setShowMenu(false);
              }}
            >
              My Profile
            </div>
            <div
              onClick={() => {
                handleLogout();
              }}
              className={`${styles.menuItem} ${styles.menuItemActive}`}
            >
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProfileMenu.propTypes = {
  user: PropTypes.object,
  clubId: PropTypes.string,
};

export default ProfileMenu;
