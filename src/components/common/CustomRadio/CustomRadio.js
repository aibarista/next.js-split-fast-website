import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomRadio.module.css';

const CustomRadio = ({
  label,
  options,
  values = [],
  onChange,
  isText,
  error,
}) => {
  return (
    <>
      <div className={styles.radioContainer}>
        <div className={styles.radioLabel}>{label}</div>
        <div className={styles.radioItems}>
          {options.map((option, index) => (
            <div
              key={index}
              className={`${styles.radioItem} ${values.includes(option.value) ? styles.radioItemActive : ''}`}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
      {isText ? (
        <div className={styles.radioTextContainer}>
          {options.map((option, index) =>
            values.includes(option.value) ? (
              <div key={index} className={styles.radioText}>
                {option.text}
              </div>
            ) : null
          )}
        </div>
      ) : null}
      {error && <p className="error">{error}</p>}
    </>
  );
};

CustomRadio.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  values: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  isText: PropTypes.bool,
  error: PropTypes.string,
};

export default CustomRadio;
