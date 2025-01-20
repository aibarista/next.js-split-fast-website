import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextLink.module.css';

const TextLink = ({ text, link, linkText }) => {
  return (
    <div className={styles.textLinkWrapper}>
      <div className={styles.textStyle}>{text}</div>
      <a href={link} className={styles.linkStyle}>
        {linkText}
      </a>
    </div>
  );
};

TextLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default TextLink;
