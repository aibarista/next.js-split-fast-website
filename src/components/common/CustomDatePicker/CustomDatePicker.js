import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomDatePicker.module.css';

import calendarIcon from 'assets/images/icon_calender.png';

const CustomDatePicker = ({ label, name, value, onChange, error }) => {
  return (
    <div className={styles.inputItem}>
      <label>{label}</label>
      <div className={`${styles.inputWrapper} ${styles.datePickerWrapper}`}>
        <div className={styles.inputWrapper}>
          <input
            type="date"
            name={name}
            min="1900-01-01"
            onChange={onChange}
            value={value}
            className={(!!value) ? styles.dateHasValue : ''}
          />
          <img
            src={calendarIcon}
            className={styles.calendarImage}
            alt="calendar"
          />
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

CustomDatePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default CustomDatePicker;
