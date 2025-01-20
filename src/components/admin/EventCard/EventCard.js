import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './EventCard.module.css';
import routes from 'routes';
import ReadMoreText from 'components/common/ReadMoreText';
import { ReactComponent as CompetitionIcon } from 'assets/images/icon_competition.svg';
import { ReactComponent as TrainingIcon } from 'assets/images/icon_training.svg';

const EventCard = ({ meet, clubId }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(routes.admin.showMeet.url(clubId, meet.meetID));
  };

  return (
    <div onClick={handleCardClick} className={styles.meetCard}>
      <div className={styles.meetCardImageWrapper}>
        <div className={styles.meetCardImage}>
          <img src={meet.image} alt={meet.meetName} />
        </div>
        <div
          className={`${styles.meetCardTagWrapper} ${meet.meetType === 0 ? styles.meetCardTrainingTagWrapper : ''}`}
        >
          <div className={styles.meetCardTagImage}>
            {meet.meetType === 0 ? <TrainingIcon /> : <CompetitionIcon />}
          </div>
          <div className={styles.meetCardTagText}>
            {meet.meetType === 0 ? 'training' : 'competition'}
          </div>
        </div>
      </div>
      <div className={styles.meetCardBody}>
        <div className={styles.meetCardTitle}>{meet.meetName}</div>
        <div className={styles.meetCardTime}>
          {meet.date} <span>from {meet.time}</span>
        </div>
        <ReadMoreText
          text={meet.description}
          style={{
            fontSize: 14,
            color: '#313131',
            marginBottom: 9,
            lineHeight: 1.5,
          }}
          readMoreStyle={{
            fontSize: 16,
            fontWeight: 700,
            color: '#cf2c47',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        />
        <div className={styles.detailContainer}>
          <div className={styles.detailLabel}>Ages:</div>
          <div className={styles.detailValue}>{meet.ageGroups}</div>
        </div>
        <div className={styles.detailContainer}>
          <div className={styles.detailLabel}>Events:</div>
          <div className={styles.detailValue}>{meet.eventTypes}</div>
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  meet: PropTypes.object,
  clubId: PropTypes.string,
};

export default EventCard;
