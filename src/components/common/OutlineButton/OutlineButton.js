import React from 'react';
import styles from './OutlineButton.module.css';
import PropTypes from 'prop-types';

const OutlineButton = ({
  text,
  style,
  textColor = '#000',
  bgColor = '#fff',
  borderColor = '#000',
  height = '42px',
  textStyle = {
    fontSize: '12px',
  },
  onClick,
}) => {
  const buttonPropsStyle = {
    ...style,
    color: textColor,
    background: bgColor,
    border: `1px solid ${borderColor}`,
    height,
  };

  return (
    <div
      className={styles.buttonStyle}
      style={buttonPropsStyle}
      onClick={onClick}
    >
      <div style={{ ...textStyle }}>{text}</div>
    </div>
  );
};

OutlineButton.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
  height: PropTypes.string,
  textStyle: PropTypes.object,
  textFontSize: PropTypes.string,
  onClick: PropTypes.func,
};

export default OutlineButton;
