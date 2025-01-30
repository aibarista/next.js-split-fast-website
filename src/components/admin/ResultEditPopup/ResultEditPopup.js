import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styles from './ResultEditPopup.module.css';

import {
  updateAggEventStatus,
  updateResults,
  editEventAttempts,
  editHighJumpResults,
} from 'api/resultApi';
import {
  editColumnPrimaryField,
  editFieldEventColumns,
  editTrackEventColumns,
} from 'config/admin/result';
import {
  convertMillisecondsToRecord,
  convertRecordToMilliseconds,
} from 'utils/time';

import BackIcon from 'assets/images/icon_arrow_right.svg';
import CloseIcon from 'assets/images/icon_close.svg';
import { ReactComponent as DeleteIcon } from 'assets/images/icon_delete.svg';
import AdminDataTable from 'components/admin/AdminDataTable';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';

const ResultEditPopup = ({
  resultType,
  results = [],
  clubID,
  meetID,
  eventType,
  ageGroup,
  gender,
  roundType,
  title,
  subtitle,
  showPopup,
  closePopup,
  refreshResults,
}) => {
  const { selectedClub } = useSelector((state) => state.user || {});

  const [tableData, setTableData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const convertResultsToTableData = (results) => {
    if (results.length) {
      const data = [];

      results.forEach((item) => {
        data.push({
          ...item,
          resultValue: convertMillisecondsToRecord(item.resultRawValue),
          buttons: (
            <div className={styles.delete}>
              <DeleteIcon />
            </div>
          ),
        });
      });

      setTableData(data);
    }
  };

  useEffect(() => {
    convertResultsToTableData(results);
  }, [results]);

  const handleValueChange = (rowId, columnKey, newValue, type) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row[editColumnPrimaryField] === rowId
          ? {
              ...row,
              [columnKey]: !type
                ? newValue
                : { ...row[columnKey], [type]: newValue },
            }
          : row
      )
    );
  };

  const saveResults = async () => {
    console.log('tableData', tableData);
    try {
      if (tableData?.length > 0) {
        if (tableData[0].unit === 'm') {
          const attempts = [];

          tableData.forEach((result) => {
            if (result.attempt1?.resultID) {
              attempts.push({
                resultID: result.attempt1.resultID,
                distance: +result.attempt1.distance,
                status: result.attempt1.status,
              });
            }
            if (result.attempt2?.resultID) {
              attempts.push({
                resultID: result.attempt2.resultID,
                distance: +result.attempt2.distance,
                status: result.attempt2.status,
              });
            }
            if (result.attempt3?.resultID) {
              attempts.push({
                resultID: result.attempt3.resultID,
                distance: +result.attempt3.distance,
                status: result.attempt3.status,
              });
            }
            if (result.attempt4?.resultID) {
              attempts.push({
                resultID: result.attempt4.resultID,
                distance: +result.attempt4.distance,
                status: result.attempt4.status,
              });
            }
            if (result.attempt5?.resultID) {
              attempts.push({
                resultID: result.attempt5.resultID,
                distance: +result.attempt5.distance,
                status: result.attempt5.status,
              });
            }
            if (result.attempt6?.resultID) {
              attempts.push({
                resultID: result.attempt6.resultID,
                distance: +result.attempt6.distance,
                status: result.attempt6.status,
              });
            }
          });

          await editEventAttempts({
            eventType,
            ageGroup,
            gender,
            roundType,
            clubID,
            meetID,
            attempts,
          });
          return true;
        } else if (tableData[0].eventType === 'High Jump') {
          const attempts = [];
          tableData.forEach((result) => {
            for (let i = 0; i < result?.heightAttempts.length; i++) {
              attempts.push({
                resultID: result[`heightAttempts${i}`].resultId,
                height: result[`heightAttempts${i}`].height,
                attempt1: result[`heightAttempts${i}`].attempt1,
                attempt2: result[`heightAttempts${i}`].attempt2,
                attempt3: result[`heightAttempts${i}`].attempt3,
              });
            }
          });
          await editHighJumpResults({
            eventType,
            ageGroup,
            gender,
            roundType,
            clubID,
            meetID,
            attempts,
          });

          return true;
        } else {
          const requestBody = tableData.map((result) => ({
            resultID: result.resultID,
            clubID: selectedClub?.clubID,
            resultRawValue: convertRecordToMilliseconds(result.resultValue),
            unit: 's',
            status: result.status,
          }));

          console.log(requestBody);

          await updateResults(
            eventType,
            ageGroup,
            gender,
            roundType,
            clubID,
            meetID,
            requestBody
          );
          return true;
        }
      }
      return false;
    } catch (err) {
      console.log('[saveResults] error response: ', err);
      toast.error(err.response?.data || err.message || 'Results Update Failed');
      return false;
    }
  };

  const finaliseResults = async () => {
    try {
      setIsUpdating(true);

      const response = await saveResults();
      if (!response) return;
      if (resultType !== 'Published') {
        await updateAggEventStatus({
          clubID,
          meetID,
          eventType,
          ageGroup,
          gender,
          roundType,
          newPublishingStatus: 'ClubMembers',
        });
      }

      toast.success('Results updated successfully.');
      closePopup();
      if (refreshResults) {
        refreshResults();
      }
    } catch (err) {
      console.log('[ResultEditPopup] error response: ', err);
      toast.error(err.response?.data || 'Results Update Failed');
    } finally {
      setIsUpdating(false);
    }
  };

  const pendingResults = async () => {
    try {
      setIsUpdating(true);

      const response = await saveResults();
      if (!response) return;
      if (resultType !== 'Pending') {
        await updateAggEventStatus({
          clubID,
          meetID,
          eventType,
          ageGroup,
          gender,
          roundType,
          newPublishingStatus: 'AdminOnly',
        });
      }
      toast.success('Results updated successfully.');
      closePopup();
      if (refreshResults) {
        refreshResults();
      }
    } catch (err) {
      console.log('[pendingResults] error response: ', err);
      toast.error(err.response?.data || 'Results Update Failed');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className={`${styles.resultEditPopupOverlay} ${
        showPopup ? styles.active : ''
      }`}
    >
      <div className={styles.resultEditPopup}>
        <div className={styles.resultEditPopupContainer}>
          <div className={styles.title}>
            {resultType} {title}
          </div>
          <div className={styles.subtitle}>{subtitle}</div>
          <div className={styles.buttonWrapper}>
            <CustomButton
              style={{
                ...defaultButtonStyle,
                margin: '0 0 0 auto',
                padding: '10px 30px',
                width: 'fit-content',
                height: 'fit-content',
              }}
              onClick={() => console.log('add result')}
            >
              + Add result
            </CustomButton>
          </div>
          <div className={styles.table}>
            <div className={styles.tableWrapper}>
              {tableData.length ? (
                <AdminDataTable
                  isEditable={true}
                  borderType="full"
                  isAddedFeatures={false}
                  columns={
                    results[0]?.unit === 'm' || eventType === 'High Jump'
                      ? editFieldEventColumns(results, eventType)
                      : editTrackEventColumns
                  }
                  primaryField={editColumnPrimaryField}
                  data={tableData}
                  handleValueChange={handleValueChange}
                  searchInputPlaceholder=""
                  headStyle={{
                    gridTemplateColumns:
                      results[0]?.unit === 'm'
                        ? `1fr 3fr ${'3fr '.repeat(results[0]?.attempts.length).trim()}`
                        : eventType === 'High Jump'
                          ? `1fr 3fr ${'3fr '.repeat(results[0]?.highJumpAttempts.length).trim()}`
                          : '1fr 4fr 2fr 2fr 3fr 3fr 3fr 1fr',
                    background: '#f1f1f2',
                  }}
                  rowStyle={{
                    gridTemplateColumns:
                      results[0]?.unit === 'm'
                        ? `1fr 3fr ${'3fr '.repeat(results[0]?.attempts.length).trim()}`
                        : eventType === 'High Jump'
                          ? `1fr 3fr ${'3fr '.repeat(results[0]?.highJumpAttempts.length).trim()}`
                          : '1fr 4fr 2fr 2fr 3fr 3fr 3fr 1fr',
                  }}
                />
              ) : (
                <div className={styles.noData}>No results available</div>
              )}
            </div>
          </div>
          <div className={styles.popupText}>
            You can publish these results immediately, or save them to the
            &#34;Pending&#34; tab.
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
              onClick={pendingResults}
              disabled={isUpdating}
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
              onClick={() => finaliseResults()}
              disabled={isUpdating}
            >
              Save and Publish
            </CustomButton>
          </div>
          <div
            className={styles.goBack}
            onClick={() => {
              closePopup();
              convertResultsToTableData(results);
            }}
          >
            <div className={styles.goBackImage}>
              <img src={BackIcon} alt="back" />
            </div>
            <div className={styles.goBackText}>Back</div>
          </div>
        </div>
        <div
          className={styles.closeBtn}
          onClick={() => {
            closePopup();
            convertResultsToTableData(results);
          }}
        >
          <img src={CloseIcon} alt="close" />
        </div>
      </div>
    </div>
  );
};

ResultEditPopup.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  resultType: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.object),
  clubID: PropTypes.string,
  meetID: PropTypes.string,
  eventType: PropTypes.string,
  ageGroup: PropTypes.string,
  gender: PropTypes.string,
  roundType: PropTypes.string,
  showPopup: PropTypes.bool,
  closePopup: PropTypes.func,
  refreshResults: PropTypes.func,
};

export default ResultEditPopup;
