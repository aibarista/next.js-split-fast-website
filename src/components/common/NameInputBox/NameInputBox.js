import React from 'react';
import PropTypes from 'prop-types';
import styles from './NameInputBox.module.css';

const NameInputBox = ({
  label = 'Your Name',
  formValues,
  errors,
  handleInputChange,
  style,
  labelStyle,
  inputStyle,
  placeholderColor,
}) => {
  return (
    <>
      <style>
        {`
          input::placeholder {
            color: ${placeholderColor};
          }
        `}
      </style>
      <div className={styles.inputItem} style={style}>
        <label style={labelStyle}>{label}</label>
        <div className={styles.nameWrapper}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formValues?.firstName}
              onChange={handleInputChange}
              style={inputStyle}
            />
            {errors?.firstName && <p className="error">{errors?.firstName}</p>}
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formValues?.lastName}
              onChange={handleInputChange}
              style={inputStyle}
            />
            {errors?.lastName && <p className="error">{errors?.lastName}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

NameInputBox.propTypes = {
  label: PropTypes.string,
  formValues: PropTypes.object,
  errors: PropTypes.object,
  handleInputChange: PropTypes.func,
  style: PropTypes.object,
  labelStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  placeholderColor: PropTypes.string,
};

export default NameInputBox;
