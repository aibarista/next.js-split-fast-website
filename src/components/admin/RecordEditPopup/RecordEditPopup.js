import React, { useEffect, useState } from 'react';
import styles from './ReocrdEditPopup.module.css';

import BackIcon from 'assets/images/icon_arrow_right.svg';
import CloseIcon from 'assets/images/icon_close.svg';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';

const RecordEditPopup = ({
  showPopup,
  closePopup,
}) => {

  return (
    <div
      className={`${styles.recordEditPopupOverlay} ${
        showPopup ? styles.active : ''
      }`}
    >
      <div className={styles.recordEditPopup}>
        <div className={styles.recordEditPopupContainer}>
          <div className={styles.title}>
            Publish Record
          </div>
          <div className={styles.subtitle}>Age 7-90m</div>
          <div className={styles.buttonWrapper}>
            
          </div>
          <div className={styles.table}>
            <div className={styles.tableWrapper}>
             
            </div>
          </div>
          <div className={styles.popupText}>
            This record will be made public for all administrators. If a mistake has been made, you can edit the results using the button below
          </div>
          <div className={styles.buttons}>
            <CustomButton
              style={{
                ...defaultButtonStyle,
                marginBottom: 9,
                marginRight: 9,
                width: 274,
                fontSize: 21,
                fontWeight: 600,
                backgroundColor: '#889398',
              }}
              onClick={() => {}}
              disabled={true}
            >
              Save to Pending
            </CustomButton>
            <CustomButton
              style={{
                ...defaultButtonStyle,
                marginBottom: 9,
                width: 274,
                fontSize: 21,
                fontWeight: 600,
              }}
              onClick={() => {}}
              disabled={false}
            >
              Save and Publish
            </CustomButton>
          </div>
          <div
            className={styles.goBack}
            onClick={closePopup}
          >
            <div className={styles.goBackImage} >
              <img src={BackIcon} alt="back" />
            </div>
            <div className={styles.goBackText}>Back</div>
          </div>
        </div>
        <div
          className={styles.closeBtn}
          onClick={closePopup}
        >
          <img src={CloseIcon} alt="close" />
        </div>
      </div>
    </div>
  );
};

export default RecordEditPopup;
