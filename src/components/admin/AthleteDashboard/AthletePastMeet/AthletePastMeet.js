import React from 'react';
import PropTypes from 'prop-types';
import { pastMeetsColumns } from 'config/admin/athleteDashboard';
import { pastMeetsData } from 'services/admin/AthleteDashboardService';
import AdminDataTable from 'components/admin/AdminDataTable';

const AthletePastMeet = ({ pastMeets, clubId, openPopup }) => {
  return (
    <>
      {pastMeets?.meets.length > 0 ? (
        <>
          <h2 className="heading2" style={{ margin: '20px 0' }}>
            Events for {pastMeets?.seasonName} season
          </h2>
          {pastMeets.meets[0].results.length > 0 ? (
            <AdminDataTable
              borderType="full"
              isAddedFeatures={false}
              columns={pastMeetsColumns}
              data={pastMeetsData(pastMeets, clubId, openPopup)}
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

AthletePastMeet.propTypes = {
  pastMeets: PropTypes.object,
  clubId: PropTypes.string,
  openPopup: PropTypes.func,
};

export default AthletePastMeet;
