import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomInput.module.css';

import eyeIcon from 'assets/images/icon_eye.svg';
import eyeCrossIcon from 'assets/images/icon_eye_cross.png';

const CustomInput = ({
  label,
  style,
  labelFontWeight = 500,
  labelColor = '#000',
  inputStyle,
  type = 'text',
  name,
  value,
  placeholder,
  error,
  onChange,
}) => {
  const labelPropsStyle = {
    color: labelColor,
    fontWeight: labelFontWeight,
  };

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={styles.lInputWrapper} style={style}>
      <label style={labelPropsStyle}>{label}</label>
      <div className={styles.inputWrapper}>
        {type === 'password' ? (
          <div className={styles.inputWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              style={inputStyle}
              value={value}
            />
            <img
              src={eyeCrossIcon}
              className={showPassword ? styles.iconEyeHide : ''}
              alt="icon_eye_cross"
              onClick={() => setShowPassword(true)}
            />
            <img
              src={eyeIcon}
              className={showPassword ? '' : styles.iconEyeHide}
              alt="eye"
              onClick={() => setShowPassword(false)}
            />
          </div>
        ) : (
          <>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              style={inputStyle}
              value={value}
              min="1"
            />
          </>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string,
  style: PropTypes.object,
  labelFontWeight: PropTypes.number,
  labelColor: PropTypes.string,
  inputStyle: PropTypes.object,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  width: PropTypes.string,
  value: PropTypes.string,
};

export default CustomInput;
