import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from 'routes';
import {
  getSelectedEvents,
  getAggResultsForEventType,
  getAggEventsByStatus,
  getEventsByStatus,
  getHighJumpResults,
} from 'api/resultApi';
import { getMeetById, getClubRecords } from 'api/clubApi';
import { convertDateTime, convertMillisecondsToRecord } from 'utils/time';
import { getClubRole } from 'services/auth/tokenService';
import {
  resultsToTableData,
  getAgeGroupsForClubRecords,
} from 'services/admin/ResultService';
import styles from './Results.module.css';
import MetaTags from 'components/common/MetaTags';
import AdminPageHeader from 'components/admin/AdminPageHeader';
import AdminTablePageLayout from 'components/admin/AdminTablePageLayout';
import AdminPageOption from 'components/admin/AdminPageOption';
import { defaultButtonStyle } from 'components/common/CustomButton';
import ResultEditPopup from 'components/admin/ResultEditPopup';
import ResultDataTable from 'components/admin/ResultDataTable';

const Results = ({ isOpenEditPopup = false }) => {
  const navigate = useNavigate();
  const clubRole = getClubRole();

  const { clubId, eventId, meetId, eventType, ageGroup, gender, roundType } =
    useParams();

  const [showEditPopup, setShowEditPopup] = React.useState(isOpenEditPopup);
  const [isPopupReady, setIsPopupReady] = useState(false);

  const [fetchingResults, setFetchingResults] = useState(true);
  const [fetchingEvent, setFetchingEvent] = useState(true);
  const [fetchingMeet, setFetchingMeet] = useState(true);
  const [fetchingEvents, setFetchingEvents] = useState(true);
  const [fetchingClubRecords, setFetchingClubRecords] = useState(true);
  const [clubRecords, setClubRecords] = useState([]);

  const [meet, setMeet] = useState(null);
  const [events, setEvents] = useState([]);
  const [, setEvent] = useState(null);
  const [results, setResults] = useState([]);
  const [resultType, setResultType] = useState('');

  const fetchResults = useCallback(async () => {
    try {
      setFetchingResults(true);

      let response;

      if (eventType === 'High Jump') {
        response = await getHighJumpResults(
          clubId,
          meetId,
          eventType,
          ageGroup,
          gender,
          roundType
        );
      } else {
        response = await getAggResultsForEventType(
          clubId,
          meetId,
          eventType,
          ageGroup,
          gender,
          roundType
        );
      }
      setResults(resultsToTableData(response.data, eventType));
    } catch (err) {
      console.error('[Results] Fetching results Error: ', err);
    } finally {
      setFetchingResults(false);
    }
  }, [clubId, meetId, eventType, ageGroup, gender, roundType]);

  const fetchEvent = useCallback(async () => {
    try {
      const response = await getSelectedEvents(clubId, meetId, [eventId]);
      setEvent(response.data[0]);
    } catch (err) {
      console.log('[Results] Fetch Event error: ', err);
    }
  }, [clubId, meetId, eventId]);

  const fetchMeet = useCallback(async () => {
    try {
      const response = await getMeetById(clubId, meetId);

      setMeet(response.data);
    } catch (err) {
      console.log('[Results] Fetch Meets error: ', err);
    }
  }, [clubId, meetId]);

  const fetchEvents = useCallback(async () => {
    try {
      let fetchedEvents;
      let response = await getEventsByStatus(clubId, meetId, 'AdminOnly');
      console.log('Aggregated pending events: ', response.data);
      fetchedEvents = response.data;

      response = await getAggEventsByStatus(clubId, meetId, 'ClubMembers');

      fetchedEvents = [...fetchedEvents, ...response.data];

      console.log('Aggregated published events: ', response.data);

      setEvents(fetchedEvents);
    } catch (err) {
      console.error('[Results] Fetch events error: ', err);
    }
  }, [clubId, meetId]);

  const fetchClubRecords = useCallback(async () => {
    if (eventType !== 'Mixed' && ageGroup !== 'Mixed' && gender !== 'Mixed') {
      const response = await getClubRecords(
        clubId,
        eventType,
        getAgeGroupsForClubRecords(ageGroup),
        gender
      ).catch((e) => {
        console.error(e); // "No club record found for the specified criteria."
        return null;
      });
      if (response) {
        console.log('club records: ', response.data);
        setClubRecords(response.data);
      }
    }
  }, [clubId, eventType, ageGroup, gender]);

  const openEditPopup = () => {
    setShowEditPopup(true);
    navigate(
      routes.admin.editResults.url(
        clubId,
        meetId,
        eventType,
        ageGroup,
        gender,
        roundType
      )
    );
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
    navigate(
      routes.admin.results.url(
        clubId,
        meetId,
        eventType,
        ageGroup,
        gender,
        roundType
      )
    );
  };

  useEffect(() => {
    if (results.length > 0) {
      setIsPopupReady(true);
    }
  }, [results]);

  useEffect(() => {
    fetchResults().then(() => {
      setFetchingResults(false);
    });
  }, [fetchResults]);

  useEffect(() => {
    fetchEvent().then(() => {
      setFetchingEvent(false);
    });
  }, [fetchEvent]);

  useEffect(() => {
    fetchMeet().then(() => {
      setFetchingMeet(false);
    });
  }, [fetchMeet]);

  useEffect(() => {
    fetchEvents().then(() => {
      setFetchingEvents(false);
    });
  }, [fetchEvents]);

  useEffect(() => {
    fetchClubRecords().then(() => {
      setFetchingClubRecords(false);
    });
  }, [fetchClubRecords]);

  useEffect(() => {
    if (events) {
      const event = events.find(
        (event) =>
          event.eventType === eventType &&
          event.gender === gender &&
          event.ageGroup === ageGroup &&
          event.roundType === roundType
      );

      if (event) {
        if (event.publishingStatus === 'ClubMembers')
          setResultType('Published');
        else setResultType('Pending');
      }
    }
  }, [events, eventType, ageGroup, gender, roundType]);

  return (
    <>
      <MetaTags title="SplitFast | Results" />
      <AdminTablePageLayout
        loading={
          fetchingMeet ||
          fetchingEvent ||
          fetchingResults ||
          fetchingEvents ||
          fetchingClubRecords
        }
      >
        <AdminPageHeader
          title={
            eventType && ageGroup && gender && roundType
              ? `Results for ${gender} ${ageGroup} ${eventType} ${roundType}`
              : 'Results'
          }
          showNumber={false}
          numberText={`${results.length} Published, 0 Pending`}
          name="Result"
          buttonLabel={
            meet
              ? `${meet?.meetName} - ${convertDateTime(meet?.meetDate || '').date}`
              : 'Go to event'
          }
          buttonStyle={{
            color: '#24282a',
            fontWeight: 600,
            textDecoration: 'underline',
            backgroundColor: 'transparent',
            height: 'unset',
          }}
          handleButton={() => {
            navigate(routes.admin.events.url(clubId, meetId));
          }}
          style={{
            marginBottom: 0,
          }}
        />
        {clubRecords?.map((clubRecord, index) => (
          <div className={styles.subtitle} key={index}>
            Club record: {clubRecord?.athleteName}{' '}
            {[
              'Discus',
              'Javelin',
              'Shot Put',
              'High Jump',
              'Long Jump',
              'Triple Jump',
            ].indexOf(eventType) > -1
              ? `${parseFloat(clubRecord?.recordValue).toFixed(2)} m`
              : `${convertMillisecondsToRecord(clubRecord?.recordValue, 2)}`}{' '}
            - {convertDateTime(clubRecord?.achievedAt).date}
          </div>
        ))}
        <AdminPageOption
          hasButton={clubRole !== 'Member'}
          buttonLabel="Edit Results"
          buttonStyle={{
            ...defaultButtonStyle,
            marginBottom: 0,
            height: 'unset',
            padding: '10px 20px',
          }}
          buttonDisabled={!isPopupReady}
          handleButton={openEditPopup}
        />
        <ResultDataTable results={results} eventType={eventType} />
      </AdminTablePageLayout>
      {clubRole !== 'Member' && (
        <ResultEditPopup
          resultType={resultType}
          results={results}
          eventID={eventId}
          clubID={clubId}
          meetID={meetId}
          eventType={eventType}
          ageGroup={ageGroup}
          gender={gender}
          roundType={roundType}
          title={
            eventType && ageGroup && gender && roundType
              ? `Results for ${gender} ${ageGroup} ${eventType} ${roundType}`
              : 'Results'
          }
          subtitle={meet ? convertDateTime(meet?.meetDate || '').date : ''}
          showPopup={showEditPopup && results.length > 0}
          closePopup={closeEditPopup}
          refreshResults={fetchResults}
        />
      )}
    </>
  );
};

Results.propTypes = {
  isOpenEditPopup: PropTypes.bool,
};

export default Results;
