import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './AthleteTable.module.css';

import routes from 'routes';
import { athleteColumns } from 'config/admin/clubMembers';
import { getClubRole } from 'services/auth/tokenService';
import AdminDataTable from 'components/admin/AdminDataTable';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';

const AthleteTable = ({ athletes, clubId, email }) => {
  const clubRole = getClubRole();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Athlete Profiles</h5>
      {athletes.length ? (
        <AdminDataTable
          borderType="none"
          isShadow={false}
          isAddedFeatures={false}
          columns={athleteColumns}
          data={athletes}
          searchInputPlaceholder=""
          tableStyle={{
            marginTop: 20,
          }}
          headStyle={{
            gridTemplateColumns: '1fr 4fr 2fr 1fr 3fr 2fr',
            background: '#f9fbfc',
            border: 'none',
          }}
          rowStyle={{
            gridTemplateColumns: '1fr 4fr 2fr 1fr 3fr 2fr',
            background: '#f9fbfc',
            border: '2px solid #aeb7bb',
            borderRadius: 4,
            margin: '10px 0',
          }}
        />
      ) : (
        <div style={{ textAlign: 'center', marginTop: 10, marginBottom: 30 }}>
          No found athlete profiles
        </div>
      )}
      {['Owner', 'Admin', 'Official'].includes(clubRole) && (
        <CustomButton
          style={{
            ...defaultButtonStyle,
            height: 'fit-content',
            width: 'fit-content',
            padding: '10px 30px',
            margin: '-20px 0 20px auto',
          }}
          onClick={() => navigate(routes.admin.addAthlete.url(clubId, email))}
        >
          + Add profile
        </CustomButton>
      )}
    </div>
  );
};

AthleteTable.propTypes = {
  athletes: PropTypes.arrayOf(PropTypes.object),
  clubId: PropTypes.string,
  email: PropTypes.string,
};

export default AthleteTable;
