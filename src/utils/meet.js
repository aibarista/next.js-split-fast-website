import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';

import styles from 'pages/admin/Meets/Meets.module.css';
import { convertDateTime } from 'utils/time';
import { ageGroupOptions } from 'config/admin/meet';
import { getClubRole } from 'services/auth/tokenService';

import upcomingEventImage1 from 'assets/images/uifb.png';
import upcomingEventImage3 from 'assets/images/uijh.png';
import upcomingEventImage4 from 'assets/images/uiqw.png';
import upcomingEventImage2 from 'assets/images/uifd.png';
import TableViewButton from 'components/admin/TableViewButton';

export const ageOptionValuesToLabel = (ageOptionValues) => {
  if (!ageOptionValues) {
    return;
  }
  console.log('ageOptionValues', ageOptionValues);
  const values = ageOptionValues.split(',');

  const labels = [];

  values.forEach((value) => {
    const label = ageGroupOptions.find(
      (option) => option.value === value
    )?.label;
    if (label) {
      labels.push(label);
    }
  });

  return labels.join(', ');
};

export const meetsToTableData = (meets, clubId) => {
  const results = [];
  const clubRole = getClubRole();

  meets.forEach((meet, index) => {
    let image;
    switch (index % 4) {
      case 1:
        image = upcomingEventImage1;
        break;

      case 2:
        image = upcomingEventImage3;
        break;

      case 3:
        image = upcomingEventImage4;
        break;

      default:
        image = upcomingEventImage2;
    }
    results.push({
      ...meet,
      date: convertDateTime(meet.meetDate).date,
      time: convertDateTime(meet.meetDate).time,
      image,
      age: ageOptionValuesToLabel(meet.ageGroups),
      buttons: (
        <div className={styles.buttons}>
          <TableViewButton
            url={routes.admin.showMeet.url(clubId, meet.meetID)}
            style={{ marginRight: 10 }}
          />
          {clubRole !== 'Member' && (
            <Link
              to={routes.admin.editMeet.url(clubId, meet.meetID)}
              className={styles.editButton}
            >
              Edit
            </Link>
          )}
        </div>
      ),
    });
  });

  return results;
};
