import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import { convertDateTime, convertMillisecondsToRecord } from 'utils/time';
import { Link } from 'react-router-dom';

const RecordEditPopup = ({
  showPopup,
  closePopup,
  selectedClubRecordResult,
  changeStatus,
}) => {
  const [confirmState, setConfirmState] = useState(false);

  const openConfirmPopup = () => {
    setConfirmState(true);
  };

  const closeConfirmPopup = () => {
    setConfirmState(false);
  };

  const discardRecord = () => {
    changeStatus('Rejected');
    setConfirmState(false);
  };

  return (
    <div
      className={`${styles.recordEditPopupOverlay} ${
        showPopup ? styles.active : ''
      }`}
    >
      <div className={styles.recordEditPopup}>
        <div className={styles.recordEditPopupContainer}>
          <div className={styles.title}>{'Review Pending Record'}</div>
          <div
            className={styles.subtitle}
          >{`${selectedClubRecordResult.gender} ${selectedClubRecordResult.athleteAge} ${selectedClubRecordResult.eventType}`}</div>
          <div className={styles.contentWapper}>
            <div className={styles.currentRecord}>
              <div className={styles.recordHeaderDescription}>
                {selectedClubRecordResult?.currentRecordHolderName
                  ? 'Current Record'
                  : 'No club record has been recorded for this event and age group'}
              </div>
              <div className={styles.currentRecordColumn}>
                <div>{selectedClubRecordResult?.eventType}</div>
                <div>{selectedClubRecordResult?.athleteAge}</div>
                <div>{selectedClubRecordResult?.gender}</div>
                <div>
                  {selectedClubRecordResult?.currentRecordValue != null &&
                    (selectedClubRecordResult?.unit === 'm'
                      ? `${selectedClubRecordResult?.currentRecordValue} m`
                      : convertMillisecondsToRecord(
                          selectedClubRecordResult?.currentRecordValue,
                          2
                        ))}
                </div>
                <div>{selectedClubRecordResult?.currentRecordHolderName}</div>
                <div>
                  {convertDateTime(
                    selectedClubRecordResult?.currentRecordAchievedAt
                  ).date || ''}
                </div>
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
                  <div className={styles.headerItem}>Athlete</div>
                  <div
                    className={`${styles.headerItem} ${styles.lastHeaderItem}`}
                  >
                    Date
                  </div>
                </div>
                <div className={styles.recordTableBody}>
                  <div className={styles.bodyItem}>
                    {selectedClubRecordResult?.eventType}
                  </div>
                  <div className={styles.bodyItem}>
                    {selectedClubRecordResult?.athleteAge}
                  </div>
                  <div className={styles.bodyItem}>
                    {selectedClubRecordResult?.gender}
                  </div>
                  <div className={styles.bodyItem}>
                    {selectedClubRecordResult?.result}
                  </div>
                  <div className={styles.bodyItem}>
                    <Link
                      className="tableCellLink"
                      to={`/athlete-dashboard?athleteId=${selectedClubRecordResult?.athleteId}`}
                    >
                      {selectedClubRecordResult?.athleteName}
                    </Link>
                  </div>
                  <div className={`${styles.bodyItem} ${styles.lastBodyItem}`}>
                    {convertDateTime(selectedClubRecordResult?.meetDate).date ||
                      ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.popupText}>
            Approving this record with replace the current club record.
            Rejecting the record will remove it from the pending records list.
          </div>
          <div className={styles.buttons}>
            <CustomButton
              style={{
                ...defaultButtonStyle,
                marginBottom: 9,
                width: 274,
                fontSize: 21,
                fontWeight: 600,
              }}
              onClick={() => changeStatus('Approved')}
              disabled={false}
            >
              Approve Record
            </CustomButton>
          </div>
          <div className={styles.bottonButton}>
            <IconTextButton
              text="Reject Record"
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
          </div>
          <div className={styles.goBack} onClick={closePopup}>
            <div className={styles.goBackImage}>
              <img src={BackIcon} alt="back" />
            </div>
            <div className={styles.goBackText}>Back</div>
          </div>
        </div>
        <div className={styles.closeBtn} onClick={closePopup}>
          <img src={CloseIcon} alt="close" />
        </div>
      </div>
      <ConfirmPopup
        title={'Do you really want to discard this record?'}
        subTitle={`You won't be able to recover it once it has been discarded.`}
        showPopup={confirmState}
        closePopup={closeConfirmPopup}
        confirm={discardRecord}
      />
    </div>
  );
};

RecordEditPopup.propTypes = {
  showPopup: PropTypes.bool,
  closePopup: PropTypes.func,
  selectedClubRecordResult: PropTypes.object,
  changeStatus: PropTypes.func,
};

export default RecordEditPopup;
