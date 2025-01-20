import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './SimpleClub.module.css';
import routes from 'routes';
import clubImage from 'assets/images/turboTrackIcon.png';

const SimpleClub = ({ club }) => {
  return (
    <Link to={routes.admin.dashboard} className={styles.clubContainer}>
      <div className={styles.clubImage}>
        <img src={club?.image || clubImage} alt="club" />
      </div>
      <div className={styles.clubName}>{club?.clubName}</div>
    </Link>
  );
};

SimpleClub.propTypes = {
  club: PropTypes.object,
};

export default SimpleClub;
