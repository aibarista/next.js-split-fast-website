import React from 'react';
import PropTypes from 'prop-types';

import styles from './CustomSelect.module.css';

import SelectImage from 'assets/images/select.png';

const CustomSelect = ({ label, name, onChange, options, value, error }) => {
  return (
    <div className={styles.inputItem}>
      <label>{label}</label>
      <div className={styles.inputWrapper}>
        <div className={styles.selectWrapper}>
          <select name={name} onChange={onChange} value={value}>
            <option value=""></option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <img src={SelectImage} className={styles.selectImage} alt="select" />
          {value === '' && <div className={styles.posterText}>Select</div>}
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

CustomSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string,
  error: PropTypes.string,
};

export default CustomSelect;
