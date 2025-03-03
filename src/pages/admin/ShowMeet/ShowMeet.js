import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './ShowMeet.module.css';
import routes from 'routes';

import { getMeetById } from 'api/clubApi';
import { meetDetailConfig } from 'config/admin/meet';
import { redColor, whiteColor } from 'config/global';
import { getClubRole } from 'services/auth/tokenService';
import { generateMeetDetail } from 'services/admin/MeetService';
import { convertDateTime } from 'utils/time';

import AdminTablePageLayout from 'components/admin/AdminTablePageLayout';
import MetaTags from 'components/common/MetaTags';
import IconTextButton from 'components/common/IconTextButton';

import competitionMeetImage from 'assets/images/uifb.png';
import trainingMeetImage from 'assets/images/uifd.png';
import { ReactComponent as EditIcon } from 'assets/images/icon_edit.svg';
import { ReactComponent as CompetitionIcon } from 'assets/images/icon_competition.svg';
import { ReactComponent as TrainingIcon } from 'assets/images/icon_training.svg';
import { ReactComponent as EyeIcon } from 'assets/images/icon_eye.svg';

const ShowMeet = () => {
  const clubRole = getClubRole();
  const navigate = useNavigate();

  const { clubId, meetId } = useParams();
  const [meet, setMeet] = useState({});
  const [fetchingMeet, setFetchingMeet] = useState(true);

  const fetchMeet = useCallback(async () => {
    try {
      const response = await getMeetById(clubId, meetId);

      setMeet(generateMeetDetail(response.data, true));
    } catch (err) {
      console.log('[ShowMeet] Fetch meet error: ', err);
      if (err.status === 404) {
        navigate(routes.notFound);
      } else {
        toast.error(err.message);
        navigate(routes.admin.dashboard);
      }
    }
  }, [clubId, meetId, navigate]);

  useEffect(() => {
    fetchMeet().then(() => {
      setFetchingMeet(false);
    });
  }, [fetchMeet]);

  return (
    <>
      <MetaTags title="SplitFast | Meet Detail" />
      <AdminTablePageLayout loading={fetchingMeet}>
        <div className={styles.heading}>
          <div className={styles.headerTitle}>
            <h2 className="heading1">{meet.meetName}</h2>
            {['Owner', 'Admin', 'Official'].includes(clubRole) && (
              <div
                className={styles.editIcon}
                onClick={() =>
                  navigate(routes.admin.editMeet.url(clubId, meetId))
                }
              >
                <EditIcon />
              </div>
            )}
          </div>
          <IconTextButton
            text="View Results"
            icon={<EyeIcon />}
            onClick={() => navigate(routes.admin.events.url(clubId, meetId))}
            textColor={redColor}
            borderColor={whiteColor}
            height="unset"
            iconPadding="5px"
            iconColor={redColor}
            iconPosition="right"
            iconSize="24px"
            textStyle={{
              fontSize: '16px',
              fontWeight: '600',
            }}
            bgColor="transparent"
          />
        </div>
        <div className={styles.meetDate}>
          {convertDateTime(meet.meetDate).date} at{' '}
          {convertDateTime(meet.meetDate).time}
        </div>
        <div className={styles.imageDescriptionContainer}>
          <div className={styles.imageContainer}>
            <div className={styles.image}>
              <img
                src={
                  meet.meetType === 'Training'
                    ? trainingMeetImage
                    : competitionMeetImage
                }
                alt={meet.meetName}
              />
            </div>
            <div
              className={`${styles.tagWrapper} ${meet.meetType === 'Training' ? styles.trainingTagWrapper : ''}`}
            >
              <div className={styles.tagImage}>
                {meet.meetType === 'Training' ? (
                  <TrainingIcon />
                ) : (
                  <CompetitionIcon />
                )}
              </div>
              <div className={styles.tagText}>
                {meet.meetType === 'Training' ? 'training' : 'competition'}
              </div>
            </div>
          </div>
          <p>{meet.description}</p>
        </div>
        <div className={styles.details}>
          {meetDetailConfig.map((detail, index) => (
            <div className={styles.detail} key={index}>
              <div className={styles.detailTitle}>{detail.label}</div>
              <div className={styles.detailValue}>{meet[detail.key]}</div>
            </div>
          ))}
        </div>
      </AdminTablePageLayout>
    </>
  );
};

export default ShowMeet;
