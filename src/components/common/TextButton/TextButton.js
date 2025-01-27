import React from 'react';
import styles from './TextButton.module.css';
import PropTypes from 'prop-types';

const TextButton = ({
  text,
  style,
  textColor = '#000',
  bgColor = '#fff',
  height = '20px',
  textStyle = {
    fontSize: '12px',
  },
  onClick,
}) => {
  const buttonPropsStyle = {
    ...style,
    color: textColor,
    background: bgColor,
    height,
  };

  return (
    <div
      className={styles.buttonStyle}
      style={buttonPropsStyle}
      onClick={onClick}
    >
      <div
        style={
          { ...textStyle }
        }
      >
        {text}
      </div>
    </div>
  );
};

TextButton.propTypes = {
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

export default TextButton;
