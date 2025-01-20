import React from 'react';
import PropsTypes from 'prop-types';
import styles from './CircleText.module.css';

const CircleText = ({ children }) => {
  return <div className={styles.circleText}>{children}</div>;
};

CircleText.propTypes = {
  children: PropsTypes.node.isRequired,
};

export default CircleText;
