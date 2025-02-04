import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import MetaTags from 'components/common/MetaTags';
import AdminTablePageLayout from 'components/admin/AdminTablePageLayout';
import AdminPageHeader from 'components/admin/AdminPageHeader';
import AdminPageOption from 'components/admin/AdminPageOption';
import AdminDataTable from 'components/admin/AdminDataTable';
import { columns } from 'config/admin/clubRecord';
import { dataTypeOptions } from 'config/admin/event';
import { getClubRole } from 'services/auth/tokenService';
import styles from './ClubRecords.module.css';
import { blackColor, redColor } from 'config/global';
import OutlineButton from 'components/common/OutlineButton';
import TextButton from 'components/common/TextButton';
import RecordEditPopup from 'components/admin/RecordEditPopup';
import { getAllClubRecords } from 'api/clubApi';
import { convertDateTime } from 'utils/time';

const ClubRecords = () => {
  const { selectedClub } = useSelector((state) => state.user || {});
  const clubRole = getClubRole();
  const [records, setRecords] = useState([]);
  const [pendingRecordCounts, setPendingRecordCounts] = useState(0);
  const [optionValues, setOptionValues] = useState({
    dataType: 'published',
  });
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleOptionChange = (name, value) => {
    setOptionValues({ ...optionValues, [name]: value });
  };

  useEffect(() => {
    filterRecords();
    // getPendingRecordsCount();
  }, [optionValues]);

  const fetchAllClubRecords = useCallback(async () => {
    try {
      if (selectedClub) {
        const response = await getAllClubRecords(selectedClub?.clubID);
        setRecords(
          response.data.map((record) => {
            record.buttons = (
              <TextButton
                text="Manage Record"
                textColor={redColor}
                onClick={openEditPopup}
              ></TextButton>
            );
            record.timestamp = convertDateTime(record.lastModified).date;
            record.result = (record.recordValue / 1000).toFixed(2);
            return record;
          })
        );
      }
    } catch (err) {
      console.log('[Meets] Fetch Upcoming Meets error: ', err);
    }
  }, [selectedClub]);

  useEffect(() => {
    fetchAllClubRecords().then(() => {
      console.log('fetched');
    });
  }, [fetchAllClubRecords]);

  // const getPendingRecordsCount = () => {
  //   setPendingRecordCounts(tempData.filter(item => item.publishingStatus === "ClubMembers").length);
  // }

  const filterRecords = () => {
    if (optionValues.dataType === 'published') {
      // setRecords(tempData.filter((record) => {
      //   if (record.publishingStatus === "ClubMembers") {
      //     record.result = (<div className={styles.roundBadgeContainer}><div>{record.result}</div><RoundBadge text='!' /></div>);
      //   }
      //   record.buttons = <TextButton
      //     text='View Record'
      //     textColor={redColor}
      //   ></TextButton>;
      //   return record;
      // }));
    } else {
      // setRecords(tempData.filter((record) => {
      // if (record.publishingStatus === "ClubMembers") {
      //   record.buttons = <TextButton
      //     text='Manage Record'
      //     textColor={redColor}
      //     onClick={openEditPopup}
      //   ></TextButton>;
      //   return record;
      // }
      // }));
    }
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
  };

  const openEditPopup = () => {
    setShowEditPopup(true);
  };

  return (
    <>
      <MetaTags title="SplitFast | Competitions" />
      <AdminTablePageLayout>
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
            <div className={styles.badge}>{pendingRecordCounts} new</div>
          </div>
          {optionValues.dataType === 'published' ? (
            <></>
          ) : (
            <OutlineButton
              text="Publish All"
              onClick={() => alert('click Publish All')}
              textColor={blackColor}
              borderColor={redColor}
              textStyle={{
                fontSize: 14,
              }}
            />
          )}
        </div>
        {records.length > 0 ? (
          <AdminDataTable
            columns={columns}
            data={records}
            searchInputPlaceholder="Search Athletes"
            headStyle={{
              gridTemplateColumns: '2fr 3fr 2fr 2fr 2fr 3fr 4fr',
            }}
            rowStyle={{
              gridTemplateColumns: '2fr 3fr 2fr 2fr 2fr 3fr 4fr',
            }}
          />
        ) : (
          <div style={{ textAlign: 'center' }}>Club records not found</div>
        )}
      </AdminTablePageLayout>
      <RecordEditPopup showPopup={showEditPopup} closePopup={closeEditPopup} />
    </>
  );
};

export default ClubRecords;
