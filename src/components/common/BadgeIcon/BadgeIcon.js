import React from 'react';
import PropTypes from 'prop-types';
import styles from './BadgeIcon.module.css';

const BadgeIcon = ({ icon, number }) => {
  return (
    <div className={styles.badgeIconContainer}>
      <div className={styles.icon}>{icon}</div>
      {number ? (
        <div className={styles.badge}>
          <span>{number}</span>
        </div>
      ) : null}
    </div>
  );
};

BadgeIcon.propTypes = {
  icon: PropTypes.node,
  number: PropTypes.number,
};

export default BadgeIcon;
