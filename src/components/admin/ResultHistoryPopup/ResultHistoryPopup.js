import React from 'react';
import PropTypes from 'prop-types';
import styles from './ResultHistoryPopup.module.css';
import CloseIcon from 'assets/images/icon_close.svg';
import BackIcon from 'assets/images/icon_arrow_right.svg';
import Loading from 'components/common/Loading';

const ResultHistoryPopup = ({
  children,
  showPopup,
  title,
  subtitle,
  onClose,
  loading,
}) => {
  return (
    <div className={`${styles.popupOverlay} ${showPopup ? styles.active : ''}`}>
      <div className={styles.popup}>
        <div className={styles.popupContainer}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className={styles.title}>{title}</div>
              <div className={styles.subtitle}>{subtitle}</div>
              {children}
            </>
          )}
        </div>
        <div className={styles.closeBtn} onClick={onClose}>
          <img src={CloseIcon} alt="close" />
        </div>
        <div className={styles.goBack} onClick={onClose}>
          <div className={styles.goBackImage}>
            <img src={BackIcon} alt="back" />
          </div>
          <div className={styles.goBackText}>Back</div>
        </div>
      </div>
    </div>
  );
};

ResultHistoryPopup.propTypes = {
  children: PropTypes.node.isRequired,
  showPopup: PropTypes.bool.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onClose: PropTypes.func,
  loading: PropTypes.bool.isRequired,
};

export default ResultHistoryPopup;
