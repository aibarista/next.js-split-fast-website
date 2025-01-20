import React from 'react';
import PropsType from 'prop-types';

import { convertDateTime } from 'utils/time';
import { recentMeetColumns } from 'config/admin/athleteDashboard';
import { recentMeetData } from 'services/admin/AthleteDashboardService';

import AdminDataTable from 'components/admin/AdminDataTable';

const AthleteRecentMeet = ({ recentMeet, clubId, openPopup }) => {
  return (
    <>
      {recentMeet?.meets.length > 0 ? (
        <>
          <h2 className="heading2" style={{ margin: '20px 0' }}>
            {recentMeet.meets[0].meetName} (
            {convertDateTime(recentMeet.meets[0].meetDate).date})
          </h2>
          {recentMeet.meets[0].results.length ? (
            <AdminDataTable
              borderType="full"
              isAddedFeatures={false}
              columns={recentMeetColumns}
              data={recentMeetData(recentMeet, clubId, openPopup)}
              searchInputPlaceholder=""
              headStyle={{
                gridTemplateColumns: 'repeat(6, 1fr)',
                background: '#f1f1f2',
              }}
              rowStyle={{
                gridTemplateColumns: 'repeat(6, 1fr)',
              }}
            />
          ) : (
            <>No result found</>
          )}
        </>
      ) : null}
    </>
  );
};

AthleteRecentMeet.propTypes = {
  recentMeet: PropsType.shape({
    meets: PropsType.array,
  }),
  clubId: PropsType.string,
  openPopup: PropsType.func.isRequired,
};

export default AthleteRecentMeet;
