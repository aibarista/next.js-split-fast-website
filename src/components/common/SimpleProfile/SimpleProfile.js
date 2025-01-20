import React from 'react';
import PropTypes from 'prop-types';
import styles from './SimpleProfile.module.css';
import avatarImage from 'assets/images/account_circle.svg';

const SimpleProfile = ({ user, onClick }) => {
  return (
    <div className={styles.profileContainer} onClick={onClick}>
      <div className={styles.userName}>
        {user.firstName} {user.lastName}
      </div>
      <div className={styles.userImage}>
        <img src={user.image || avatarImage} alt={user.name} />
      </div>
    </div>
  );
};

SimpleProfile.propTypes = {
  user: PropTypes.object,
  onClick: PropTypes.func,
};

export default SimpleProfile;
