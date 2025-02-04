import React, { useEffect, useState } from 'react';
import styles from './ConfirmPopup.module.css';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';

const ConfirmPopup = ({ showPopup, closePopup }) => {
  return (
    <div
      className={`${styles.confirmPopupOverlay} ${
        showPopup ? styles.active : ''
      }`}
    >
      <div className={styles.confirmPopup}>
        <div className={styles.confirmPopupContainer}>
          <div className={styles.title}>
            Do you really want to discard this record?
          </div>
          <div className={styles.subtitle}>
            You won't be able to recover it once it has been discarded.
          </div>
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
              onClick={() => {}}
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

export default ConfirmPopup;
