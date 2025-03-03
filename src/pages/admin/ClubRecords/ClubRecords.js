import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaTags from 'components/common/MetaTags';
import AdminTablePageLayout from 'components/admin/AdminTablePageLayout';
import AdminPageHeader from 'components/admin/AdminPageHeader';
import AdminPageOption from 'components/admin/AdminPageOption';
import AdminDataTable from 'components/admin/AdminDataTable';
import {
  publishColumns,
  pendingColumns,
  dataTypeOptions,
} from 'config/admin/clubRecord';
import { getClubRole } from 'services/auth/tokenService';
import styles from './ClubRecords.module.css';
import { redColor } from 'config/global';
import RecordEditPopup from 'components/admin/RecordEditPopup';
import {
  getAllClubRecords,
  getPendingClubRecords,
  getPendingClubRecordsCount,
  updateStatusOfPendingClubRecordResult,
} from 'api/clubApi';
import {
  getOfficialRecordTableSortData,
  getPendingRecordTableSortData,
} from 'services/admin/ClubRecordService';

import { toast } from 'react-toastify';
import IconTextButton from 'components/common/IconTextButton';
import { ReactComponent as EyeIcon } from 'assets/images/icon_eye.svg';
import { updateClubRecordsPendingCount } from 'services/user/userSlice';

const ClubRecords = () => {
  const dispatch = useDispatch();
  const { selectedClub } = useSelector((state) => state.user || {});
  const { clubRecordsPendingCount } = useSelector((state) => state.user || 0);
  const clubRole = getClubRole();
  const [records, setRecords] = useState([]);
  const [publishedRecords, setPublishedRecords] = useState([]);
  const [pendingRecords, setPendingRecords] = useState([]);
  const [fetchingPublishedRecords, setFetchingPublishedRecords] =
    useState(true);
  const [fetchingPendingRecords, setFetchingPendingRecords] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [selectedClubRecordResult, setSelectedClubRecordResult] = useState({});

  const [optionValues, setOptionValues] = useState({
    dataType: 'pending',
  });
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleOptionChange = (name, value) => {
    setOptionValues({ ...optionValues, [name]: value });
  };

  useEffect(() => {
    const filterRecords = () => {
      if (optionValues.dataType === 'published') {
        setRecords(getOfficialRecordTableSortData(publishedRecords));
      } else {
        setRecords(
          getPendingRecordTableSortData(pendingRecords).map((record) => {
            record.buttons = (
              <IconTextButton
                text="Review Record"
                icon={<EyeIcon />}
                onClick={() => openEditPopup(record)}
                textColor={redColor}
                borderColor="white"
                height="unset"
                iconPadding="5px"
                iconColor={redColor}
                iconPosition="right"
                style={{
                  fontWeight: 'bold',
                }}
              />
            );
            return record;
          })
        );
      }
    };
    filterRecords();
  }, [optionValues, publishedRecords, pendingRecords]);

  const fetchAllClubRecords = useCallback(async () => {
    try {
      if (selectedClub?.clubID && optionValues.dataType === 'published') {
        setFetchingPublishedRecords(true);
        const response = await getAllClubRecords(selectedClub?.clubID);
        if (response.data) {
          setPublishedRecords(response.data);
        }
      }
    } catch (err) {
      console.log('[ClubRecords] Fetch Published Records error: ', err);
    }
  }, [selectedClub?.clubID, optionValues]);

  const fetchPendingClubRecords = useCallback(async () => {
    try {
      if (selectedClub?.clubID && optionValues.dataType === 'pending') {
        setFetchingPendingRecords(true);
        const response = await getPendingClubRecords(selectedClub?.clubID);
        if (response.data) {
          setPendingRecords(response.data);
        }
      }
    } catch (err) {
      console.log('[ClubRecords] Fetch Pending Records error: ', err);
    }
  }, [selectedClub?.clubID, optionValues]);

  const changeStatusOfPendingClubRecordResult = async (status) => {
    setShowEditPopup(false);
    try {
      if (selectedClub) {
        setUpdatingStatus(true);
        await updateStatusOfPendingClubRecordResult(
          selectedClub.clubID,
          selectedClubRecordResult.resultId,
          status
        );
        if (status === 'Approved') {
          toast.success(
            `Club record of ${selectedClubRecordResult.result} is Approved`
          );
        } else {
          toast.success(
            `Club record of ${selectedClubRecordResult.result} was rejected`
          );
        }
        setUpdatingStatus(false);
        setFetchingPublishedRecords(true);
        const response = await getAllClubRecords(selectedClub?.clubID);
        if (response.data) {
          setPublishedRecords(response.data);
        }
        setFetchingPublishedRecords(false);
        setFetchingPendingRecords(true);
        const response2 = await getPendingClubRecords(selectedClub?.clubID);
        if (response2.data) {
          setPendingRecords(response2.data);
        }
        setFetchingPendingRecords(false);
        const response3 = await getPendingClubRecordsCount(
          selectedClub?.clubID
        );
        if (response3.data) {
          dispatch(updateClubRecordsPendingCount(response3.data.count));
        }
      }
    } catch (err) {
      console.log(
        '[ClubRecords] Update Status of Pending Club Records Result error: ',
        err
      );
    }
  };
  useEffect(() => {
    fetchAllClubRecords().then(() => {
      setFetchingPublishedRecords(false);
    });
  }, [fetchAllClubRecords]);

  useEffect(() => {
    fetchPendingClubRecords().then(() => {
      setFetchingPendingRecords(false);
    });
  }, [fetchPendingClubRecords]);

  const closeEditPopup = () => {
    setShowEditPopup(false);
  };

  const openEditPopup = (selectedRecord) => {
    setSelectedClubRecordResult(selectedRecord);
    setShowEditPopup(true);
  };

  return (
    <>
      <MetaTags title="SplitFast | Competitions" />
      <AdminTablePageLayout
        loading={
          fetchingPublishedRecords || fetchingPendingRecords || updatingStatus
        }
      >
        <AdminPageHeader showNumber={false} name="Club Record" />
        <div className={styles.adminPageOptionContainer}>
          <div className={styles.adminPageOptionSubContainer}>
            {['Owner', 'Admin', 'Official'].includes(clubRole) && (
              <AdminPageOption
                dataTypeOptions={dataTypeOptions}
                hasButton={false}
                handleOptionChange={handleOptionChange}
                optionValues={optionValues}
              />
            )}
            {clubRecordsPendingCount > 0 && (
              <div className={styles.badge}>{clubRecordsPendingCount} new</div>
            )}
          </div>
        </div>
        {records.length > 0 ? (
          <AdminDataTable
            columns={
              optionValues.dataType === 'published'
                ? publishColumns
                : pendingColumns
            }
            data={records}
            searchInputPlaceholder="Search Athletes"
            headStyle={
              optionValues.dataType === 'published'
                ? {
                    gridTemplateColumns: '3fr 3fr 2fr 2fr 2fr 3fr',
                  }
                : {
                    gridTemplateColumns: '3fr 3fr 2fr 2fr 2fr 3fr 4fr',
                  }
            }
            rowStyle={
              optionValues.dataType === 'published'
                ? {
                    gridTemplateColumns: '3fr 3fr 2fr 2fr 2fr 3fr',
                  }
                : {
                    gridTemplateColumns: '3fr 3fr 2fr 2fr 2fr 3fr 4fr',
                  }
            }
            title="Records"
          />
        ) : (
          <div style={{ textAlign: 'center' }}>
            {optionValues.dataType === 'published'
              ? 'There are no Official Club Records'
              : 'There are no Pending Club Records'}
          </div>
        )}
      </AdminTablePageLayout>
      <RecordEditPopup
        selectedClubRecordResult={selectedClubRecordResult}
        showPopup={showEditPopup}
        closePopup={closeEditPopup}
        changeStatus={changeStatusOfPendingClubRecordResult}
      />
    </>
  );
};

export default ClubRecords;
