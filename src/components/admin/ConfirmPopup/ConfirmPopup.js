import React from 'react';
import styles from './ConfirmPopup.module.css';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';
import PropTypes from 'prop-types';

const ConfirmPopup = ({ title, subTitle, showPopup, closePopup, confirm }) => {
  return (
    <div
      className={`${styles.confirmPopupOverlay} ${
        showPopup ? styles.active : ''
      }`}
    >
      <div className={styles.confirmPopup}>
        <div className={styles.confirmPopupContainer}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subtitle}>{subTitle}</div>
          <div className={styles.buttons}>
            <CustomButton
              style={{
                ...defaultButtonStyle,
                marginBottom: 9,
                marginRight: 9,
                width: 200,
                height: 50,
                fontSize: 18,
                fontWeight: 600,
                backgroundColor: '#889398',
              }}
              onClick={closePopup}
              disabled={false}
            >
              No, go back
            </CustomButton>
            <CustomButton
              style={{
                ...defaultButtonStyle,
                marginBottom: 9,
                width: 200,
                height: 50,
                fontSize: 18,
                fontWeight: 600,
              }}
              onClick={confirm}
              disabled={false}
            >
              Yes, delete
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmPopup.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  showPopup: PropTypes.bool,
  closePopup: PropTypes.func,
  confirm: PropTypes.func,
};

export default ConfirmPopup;
