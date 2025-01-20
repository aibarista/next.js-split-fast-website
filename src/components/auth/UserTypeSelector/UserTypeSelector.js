import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserTypeSelector.module.css';

const UserTypeSelector = ({
  selectedUserType,
  userType,
  description,
  tagText,
  icon,
  onClick,
}) => {
  return (
    <div
      className={`${styles.accountType} ${selectedUserType === userType ? styles.accountTypeActive : ''}`}
      onClick={onClick}
    >
      <div className={styles.accountTypeRadio}>
        <div className={styles.accountTypeRadioWrapper}></div>
      </div>
      <label>
        <div className={styles.accountTypeHeader}>{userType}</div>
        <div className={styles.accountTypeText}>{description}</div>
      </label>
      <div className={styles.tagImage}>{icon}</div>
      <div className={styles.tagText}>{tagText}</div>
    </div>
  );
};

UserTypeSelector.propTypes = {
  selectedUserType: PropTypes.any,
  userType: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tagText: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
};

export default UserTypeSelector;
