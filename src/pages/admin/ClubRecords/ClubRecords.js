import React, { useCallback, useEffect, useState } from 'react';
import MetaTags from 'components/common/MetaTags';
import AdminTablePageLayout from 'components/admin/AdminTablePageLayout';
import AdminPageHeader from 'components/admin/AdminPageHeader';
import AdminPageOption from 'components/admin/AdminPageOption';
import AdminDataTable from 'components/admin/AdminDataTable';
import { columns } from 'config/admin/clubRecord';

const ClubRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords([
      {
          "clubID": "8ed17d65-be35-48ad-9ceb-a30ab53a232d",
          "meetID": "57fef0ae-d6e9-479f-9891-215a66e48669",
          "eventType": "100m",
          "ageGroup": "U12",
          "gender": "Boys",
          "athlete": "athlete tester1",
          "roundType": "Heat",
          "result": "10.99",
          "timestamp": "2025-01-08T10:43:10",
          "publishingStatus": "ClubMembers"
      },
      {
          "clubID": "8ed17d65-be35-48ad-9ceb-a30ab53a232d",
          "meetID": "57fef0ae-d6e9-479f-9891-215a66e48669",
          "eventType": "Javelin",
          "ageGroup": "Mixed",
          "gender": "Boys",
          "athlete": "athlete tester2",
          "roundType": "Heat",
          "result": "8.88",
          "timestamp": "2025-01-20T07:40:03",
          "publishingStatus": "ClubMembers"
      }
  ])
  }, []);

  return (
    <>
      <MetaTags title="SplitFast | Competitions" />
      <AdminTablePageLayout
      >
        <AdminPageHeader
          showNumber={false}
          name="Club Record"
        />
        {records.length > 0 ? (
          <AdminDataTable
            columns={columns}
            data={records}
            searchInputPlaceholder="Search Athletes"
            headStyle={{
              gridTemplateColumns: '2fr 3fr 2fr 2fr 2fr 3fr 2fr',
            }}
            rowStyle={{
              gridTemplateColumns: '2fr 3fr 2fr 2fr 2fr 3fr 2fr',
            }}
          />
        ) : <div style={{ textAlign: 'center' }}>Club records not found</div>}
      </AdminTablePageLayout>
    </>
  );
};

export default ClubRecords;
