import React from 'react';
import styles from './IconTextButton.module.css';
import PropTypes from 'prop-types';

const IconTextButton = ({
  text,
  icon,
  style,
  textColor = '#000',
  bgColor = '#fff',
  borderColor = '#000',
  height = '42px',
  iconPadding = '13px',
  iconColor,
  iconPosition = 'left',
  iconSize = '18px',
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

  const iconSizeStyle = {
    width: iconSize,
    height: iconSize,
  };

  const styledIcon = React.cloneElement(icon, {
    style: {
      fill: iconColor,
    },
  });

  return (
    <div
      className={styles.buttonStyle}
      style={buttonPropsStyle}
      onClick={onClick}
    >
      <div
        className={styles.buttonIcon}
        style={
          iconPosition === 'left'
            ? {
                ...iconSizeStyle,
                marginRight: iconPadding,
              }
            : { ...iconSizeStyle, order: 2, marginLeft: iconPadding }
        }
      >
        {styledIcon}
      </div>
      <div
        style={
          iconPosition === 'left'
            ? { ...textStyle }
            : { ...textStyle, order: 1 }
        }
      >
        {text}
      </div>
    </div>
  );
};

IconTextButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  style: PropTypes.object,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
  height: PropTypes.string,
  iconPadding: PropTypes.string,
  iconColor: PropTypes.string,
  iconPosition: PropTypes.string,
  iconSize: PropTypes.string,
  textStyle: PropTypes.object,
  textFontSize: PropTypes.string,
  onClick: PropTypes.func,
};

export default IconTextButton;
