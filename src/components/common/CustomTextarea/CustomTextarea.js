import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomTextarea.module.css';

const CustomTextarea = ({
  label,
  name,
  value,
  maxLength = 250,
  placeholder,
  error,
  onChange,
  style,
  inputStyle,
}) => {
  return (
    <div className={styles.clubDescription} style={style}>
      <label>{label}</label>
      <textarea
        maxLength={maxLength}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        style={inputStyle}
        value={value}
      ></textarea>
      <span>0/{maxLength}</span>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

CustomTextarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  inputStyle: PropTypes.object,
  style: PropTypes.object,
};

export default CustomTextarea;
