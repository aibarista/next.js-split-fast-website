import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import routes from 'routes';
import { getAggEventsByStatus } from 'api/resultApi';
import { getMeetById } from 'api/clubApi';
import { columns } from 'config/admin/event';
import { dataTypeOptions } from 'config/admin/event';
import { getClubRole } from 'services/auth/tokenService';
import { eventsToTableData } from 'services/admin/EventService';
import { convertDateTime } from 'utils/time';

import MetaTags from 'components/common/MetaTags';
import AdminPageHeader from 'components/admin/AdminPageHeader';
import AdminTablePageLayout from 'components/admin/AdminTablePageLayout';
import AdminDataTable from 'components/admin/AdminDataTable';
import AdminPageOption from 'components/admin/AdminPageOption';

const Events = () => {
  const clubRole = getClubRole();
  const { clubId, meetId } = useParams();
  const navigate = useNavigate();

  const [fetchingPendingEvents, setFetchingPendingEvents] = useState(true);
  const [fetchingPublishedEvents, setFetchingPublishedEvents] = useState(true);
  const [fetchingMeet, setFetchingMeet] = useState(true);

  const [optionValues, setOptionValues] = useState({
    dataType: 'published',
  });
  const [meet, setMeet] = useState(null);
  const [events, setEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [publishedEvents, setPublishedEvents] = useState([]);

  const fetchPendingEvents = useCallback(async () => {
    try {
      if (['Owner', 'Admin', 'Official'].includes(clubRole)) {
        const response = await getAggEventsByStatus(
          clubId,
          meetId,
          'AdminOnly'
        );
        console.log('Aggregated pending events: ', response.data);
        setPendingEvents(eventsToTableData(response.data, clubId, meetId));
      }
    } catch (err) {
      console.error('[Events] Fetch pending events error: ', err);
      if (err.status === 404) {
        navigate(routes.notFound);
      }
    }
  }, [clubId, meetId, clubRole, navigate]);

  const fetchPublishedEvents = useCallback(async () => {
    try {
      const response = await getAggEventsByStatus(
        clubId,
        meetId,
        'ClubMembers'
      );

      console.log('Aggregated published events: ', response.data);

      setPublishedEvents(eventsToTableData(response.data, clubId, meetId));
    } catch (err) {
      console.error('[Events] Fetch published events error: ', err);
    }
  }, [clubId, meetId]);

  const fetchMeet = useCallback(async () => {
    try {
      const response = await getMeetById(clubId, meetId);
      console.log(response.data);

      setMeet(response.data);
    } catch (err) {
      console.log('[Events] Fetch Meets error: ', err);
    }
  }, [clubId, meetId]);

  useEffect(() => {
    fetchPendingEvents().then(() => {
      setFetchingPendingEvents(false);
    });
  }, [fetchPendingEvents]);

  useEffect(() => {
    fetchPublishedEvents().then(() => {
      setFetchingPublishedEvents(false);
    });
  }, [fetchPublishedEvents]);

  useEffect(() => {
    fetchMeet().then(() => {
      setFetchingMeet(false);
    });
  }, [fetchMeet]);

  useEffect(() => {
    if (optionValues.dataType === 'published') {
      setEvents(publishedEvents);
    } else {
      setEvents(pendingEvents);
    }
  }, [pendingEvents, publishedEvents, optionValues]);

  const handleOptionChange = (name, value) => {
    setOptionValues({ ...optionValues, [name]: value });
  };

  return (
    <>
      <MetaTags title="SplitFast | Events" />
      <AdminTablePageLayout
        loading={
          fetchingPendingEvents || fetchingPublishedEvents || fetchingMeet
        }
      >
        <AdminPageHeader
          title={
            meet
              ? `Events for ${meet?.meetName} - ${convertDateTime(meet?.meetDate).date}`
              : 'Events'
          }
          showNumber={false}
          number={events.length}
          name="Event"
          buttonLabel="+ Add an Event"
          handleButton={null}
        />
        {['Owner', 'Admin', 'Official'].includes(clubRole) && (
          <AdminPageOption
            dataTypeOptions={dataTypeOptions}
            hasButton={false}
            handleOptionChange={handleOptionChange}
            optionValues={optionValues}
          />
        )}
        {events.length ? (
          <AdminDataTable
            columns={columns}
            data={events}
            searchInputPlaceholder="Search Events"
            headStyle={{
              gridTemplateColumns: '6fr 4fr 4fr 4fr 2fr',
            }}
            rowStyle={{
              gridTemplateColumns: '6fr 4fr 4fr 4fr 2fr',
            }}
          />
        ) : (
          <div style={{ textAlign: 'center' }}>
            {optionValues.dataType === 'published'
              ? 'No published event results'
              : 'No pending event results'}
          </div>
        )}
      </AdminTablePageLayout>
    </>
  );
};

export default Events;
