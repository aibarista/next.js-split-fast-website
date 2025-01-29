import React, { useEffect, useState } from 'react';
import styles from './ReocrdEditPopup.module.css';

import BackIcon from 'assets/images/icon_arrow_right.svg';
import CloseIcon from 'assets/images/icon_close.svg';
import { ReactComponent as DeleteIcon } from 'assets/images/icon_delete.svg';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';
import IconTextButton from 'components/common/IconTextButton';
import { redColor, whiteColor } from 'config/global';
import ConfirmPopup from '../ConfirmPopup';

const RecordEditPopup = ({
  showPopup,
  closePopup,
}) => {

  const [popupState, setPopupState] = useState('publish');
  const [confirmState, setConfirmState] = useState(false);

  const setPublish = () => {
    setPopupState("publish");
  }
  const setEdit = () => {
    setPopupState("edit");
  }

  const openConfirmPopup = () => {
    setConfirmState(true);
  }

  const closeConfirmPopup = () => {
    setConfirmState(false);
  }

  return (
    <div
      className={`${styles.recordEditPopupOverlay} ${showPopup ? styles.active : ''
        }`}
    >
      <div className={styles.recordEditPopup}>
        <div className={styles.recordEditPopupContainer}>
          <div className={styles.title}>
            {popupState === "publish" ? "Publish Record" : "Edit Record"}
          </div>
          <div className={styles.subtitle}>Age 7-90m</div>
          <div className={styles.contentWapper}>
            <div className={styles.currentRecord}>
              <div className={styles.recordHeaderDescription}>Current Record</div>
              <div className={styles.currentRecordColumn}>
                <div>70m</div>
                <div>9</div>
                <div>Male</div>
                <div>19:56</div>
                <div>Sam Carson</div>
                <div>Oct 11,1999</div>
              </div>
            </div>
            <div className={styles.newRecord}>
              <div className={styles.recordHeaderDescription}>New Record</div>
              <div className={styles.recordTableWapper}>
                <div className={styles.recordTableHeader}>
                  <div className={styles.headerItem}>Event</div>
                  <div className={styles.headerItem}>Age Group</div>
                  <div className={styles.headerItem}>Gender</div>
                  <div className={styles.headerItem}>Result</div>
                  <div className={styles.headerItem}>Althlete</div>
                  <div className={`${styles.headerItem} ${styles.lastHeaderItem}`}>Date</div>
                </div>
                <div className={styles.recordTableBody}>
                  <div className={styles.bodyItem}>70m</div>
                  <div className={styles.bodyItem}>9</div>
                  <div className={styles.bodyItem}>Male</div>
                  <div className={styles.bodyItem}>{popupState === "publish" ? "19:56" : (<input className={styles.changeResult} value={"19:56"}></input>)}</div>
                  <div className={styles.bodyItem}>Sam Carson</div>
                  <div className={`${styles.bodyItem} ${styles.lastBodyItem}`}>Oct 11,1999</div>
                </div>
              </div>
            </div>
          </div>
          {
            popupState === "publish" ? <div className={styles.popupText}>
              This record will be made public for all administrators. If a mistake has been made, you can edit the results using the button below
            </div> : <div className={`${styles.popupText} ${styles.nonText}`}></div>
          }
          {
            popupState === "publish" ? <div className={styles.buttons}>
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
                onClick={setEdit}
                disabled={false}
              >
                Edit Record
              </CustomButton>
              <CustomButton
                style={{
                  ...defaultButtonStyle,
                  marginBottom: 9,
                  width: 274,
                  fontSize: 21,
                  fontWeight: 600,
                }}
                onClick={() => { }}
                disabled={false}
              >
                Publish Record
              </CustomButton>
            </div> : <div className={styles.buttons}><CustomButton
              style={{
                ...defaultButtonStyle,
                marginBottom: 9,
                width: 274,
                fontSize: 21,
                fontWeight: 600,
              }}
              onClick={setPublish}
              disabled={false}
            >
              Save Record
            </CustomButton></div>
          }
          {
            popupState === "publish" ? <div className={styles.bottonButton}>
              <IconTextButton
                text="Discard this record"
                icon={<DeleteIcon />}
                height="50px"
                iconPadding="5px"
                iconPosition="left"
                textColor={redColor}
                borderColor={whiteColor}
                iconColor={redColor}
                iconSize="24px"
                textStyle={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
                bgColor="transparent"
                onClick={openConfirmPopup}
              />
            </div> : <></>
          }
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
      <ConfirmPopup
        showPopup={confirmState}
        closePopup={closeConfirmPopup}
      />
    </div>
  );
};

export default RecordEditPopup;
