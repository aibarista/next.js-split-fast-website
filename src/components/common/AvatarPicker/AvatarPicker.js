import React from 'react';
import styles from './AvatarPicker.module.css';
import avatarImage from 'assets/images/account_circle.svg';

const AvatarPicker = () => {
  return (
    <div className={styles.avatarWrapper}>
      <div className={styles.avatar}>
        <img src={avatarImage} alt="PNG" />
      </div>
      <div className={styles.updateButton}>Update Image</div>
      <div className={styles.removeButton}>Remove Image</div>
    </div>
  );
};

export default AvatarPicker;
