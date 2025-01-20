import React from 'react';
import PropsType from 'prop-types';

import styles from './BackButton.module.css';

import BackIcon from 'assets/images/icon_arrow_right.svg';
import PropTypes from 'prop-types';

const BackButton = ({ navigate, text = 'Go back' }) => {
  const backPage = () => {
    navigate(-1);
  };

  return (
    <div className={styles.goBack} onClick={backPage}>
      <div className={styles.goBackImage}>
        <img src={BackIcon} alt="back_icon" />
      </div>
      <div className={styles.goBackText}>{text}</div>
    </div>
  );
};

BackButton.propTypes = {
  navigate: PropsType.func.isRequired,
  text: PropTypes.string,
};

export default BackButton;
