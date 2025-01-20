import React from 'react';
import PropTypes from 'prop-types';
import styles from './LabelText.module.css';

const LabelText = ({ label, text, style, labelStyle, textStyle }) => {
  return (
    <div style={style} className={styles.container}>
      <div className={styles.label} style={labelStyle}>
        {label}
      </div>
      <div className={styles.text} style={textStyle}>
        {text}
      </div>
    </div>
  );
};

LabelText.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object,
  labelStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

export default LabelText;
