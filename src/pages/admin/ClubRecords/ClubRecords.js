import React, { useCallback, useEffect, useState } from 'react';
import MetaTags from 'components/common/MetaTags';
import AdminTablePageLayout from 'components/admin/AdminTablePageLayout';
import AdminPageHeader from 'components/admin/AdminPageHeader';
import AdminPageOption from 'components/admin/AdminPageOption';
import AdminDataTable from 'components/admin/AdminDataTable';
import { columns } from 'config/admin/clubRecord';

const ClubRecords = () => {
  const [records, setRecords] = useState([]);

  return (
    <>
      <MetaTags title="SplitFast | Competitions" />
      <AdminTablePageLayout
      >
        <AdminPageHeader
          showNumber={false}
          name="Club Record"
        />
        <AdminDataTable
          columns={columns}
          data={records}
          searchInputPlaceholder="Search Club Records"
          headStyle={{
            gridTemplateColumns: '2fr 3fr 2fr 2fr 2fr 3fr 2fr',
          }}
          rowStyle={{
            gridTemplateColumns: '2fr 3fr 2fr 2fr 2fr 3fr 2fr',
          }}
        />
      </AdminTablePageLayout>
    </>
  );
};

export default ClubRecords;
