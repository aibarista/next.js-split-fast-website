import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './DashboardNotification.module.css';

import { getGreeting } from 'utils/string';
import routes from 'routes';
import closeIcon from 'assets/images/icon_close.svg';

const DashboardNotification = ({ user, notificationNumber }) => {
  const [showNotification, setShowNotification] = useState(true);

  return showNotification && notificationNumber ? (
    <div className={styles.dbpNotification}>
      <div className={styles.dbpNotificationWrapper}>
        <div className={styles.dbpNotifyBody}>
          <div className={styles.dbpNotifyHello}>
            {getGreeting()}, {user.firstName}
          </div>
          <div className={styles.dbpNotifySmall}>
            You have <span>{notificationNumber}</span> new notifications.
            <Link to={routes.admin.notification} className={styles.notifyView}>
              View notifications.
            </Link>
          </div>
          <div
            className={styles.publishCloseBtn}
            onClick={() => setShowNotification(false)}
          >
            <img src={closeIcon} alt="close" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

DashboardNotification.propTypes = {
  user: PropTypes.object,
  notificationNumber: PropTypes.number,
};

export default DashboardNotification;
