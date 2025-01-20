import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomImagePicker.module.css';

const CustomImagePicker = ({ icon, label }) => {
  return (
    <div className={styles.addImageWrapper}>
      <div className={styles.addImage}>
        <img src={icon} alt="icon" />
      </div>
      <div className={styles.addImageText}>{label}</div>
    </div>
  );
};

CustomImagePicker.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
};

export default CustomImagePicker;
