import React from 'react';
import PropTypes from 'prop-types';
import styles from './Loading.module.css';
import loadingGif from 'assets/images/loading.gif';

const Loading = ({ isLoadingAdminPage = false }) => {
  return (
    <div
      className={`${styles.loadingContainer} ${isLoadingAdminPage ? styles.adminPageLoadingContainer : ''}`}
    >
      <img src={loadingGif} alt="Loading..." className={styles.loadingGif} />
    </div>
  );
};

Loading.propTypes = {
  isLoadingAdminPage: PropTypes.bool,
};

export default Loading;
