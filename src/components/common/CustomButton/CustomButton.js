import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomButton.module.css';

export const defaultButtonStyle = {
  maxWidth: '100%',
  color: '#fff',
  backgroundColor: '#cf2c47',
  marginBottom: 26,
};

const CustomButton = ({
  children,
  onClick,
  style = defaultButtonStyle,
  disabled,
}) => {
  return (
    <div
      className={`${styles.buttonStyle} ${disabled ? '' : styles.buttonActiveStyle}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
  width: PropTypes.string,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  marginBottom: PropTypes.string,
  disabled: PropTypes.bool,
};

export default CustomButton;
