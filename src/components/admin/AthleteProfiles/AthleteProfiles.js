import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './AthleteProfile.module.css';
import routes from 'routes';

const AthleteProfiles = ({ athletes, clubId, email }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Athlete Profiles</div>
        <Link
          to={routes.admin.addAthlete.url(clubId, email)}
          className={styles.link}
        >
          + Add a profile
        </Link>
      </div>
      <div>
        {athletes.map((athlete, index) => (
          <div key={index} className={styles.athlete}>
            <div className={styles.athleteName}>
              {athlete.firstName} {athlete.lastName}
            </div>
            <Link
              to={routes.admin.editAthlete.url(
                clubId,
                email,
                athlete.athleteID
              )}
              className={styles.link}
            >
              Edit Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

AthleteProfiles.propTypes = {
  athletes: PropTypes.arrayOf(PropTypes.object),
  clubId: PropTypes.string,
  email: PropTypes.string,
};

export default AthleteProfiles;
