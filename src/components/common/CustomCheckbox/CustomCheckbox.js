import React from 'react';
import PropTypes from 'prop-types';

import styles from './CustomCheckbox.module.css';
import FilledCheckboxIcon from 'assets/images/Checkbox_Filled.svg';
import EmptyCheckboxIcon from 'assets/images/Checkbox_empty.svg';

const CustomCheckbox = ({ label, checked, onChange, style, labelStyle }) => {
  return (
    <div
      className={`${styles.checkboxContainer} ${checked ? styles.checkboxContainerActive : ''}`}
      onClick={() => onChange(!checked)}
      style={style}
    >
      <div className={styles.checkbox}>
        <img
          src={FilledCheckboxIcon}
          className={styles.filledCheckbox}
          alt="Checkbox_Filled"
        />
        <img
          src={EmptyCheckboxIcon}
          className={styles.emptyCheckbox}
          alt="Checkbox_empty"
        />
      </div>
      <div className={styles.label} style={labelStyle}>
        {label}
      </div>
    </div>
  );
};

CustomCheckbox.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  style: PropTypes.object,
  labelStyle: PropTypes.object,
};

export default CustomCheckbox;
