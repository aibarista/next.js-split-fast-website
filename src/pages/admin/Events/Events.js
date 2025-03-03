import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from 'routes';
import { getAggEventsByStatus, exportResultsToFile } from 'api/resultApi';
import { getMeetById } from 'api/clubApi';
import { columns } from 'config/admin/event';
import { dataTypeOptions } from 'config/admin/event';
import { getClubRole } from 'services/auth/tokenService';
import {
  eventsToExportTableData,
  eventsToTableData,
} from 'services/admin/EventService';
import { convertDateTime } from 'utils/time';

import MetaTags from 'components/common/MetaTags';
import AdminPageHeader from 'components/admin/AdminPageHeader';
import AdminTablePageLayout from 'components/admin/AdminTablePageLayout';
import AdminDataTable from 'components/admin/AdminDataTable';
import AdminPageOption from 'components/admin/AdminPageOption';
import { defaultButtonStyle } from 'components/common/CustomButton';
import EventEditPopup from 'components/admin/EventEditPopup';
import ResultExportPopup from 'components/admin/ResultsExportPopup/ResultsExportPopup';

const Events = ({ isOpenEditPopup = false }) => {
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
  const [allEvents, setAllEvents] = useState([]);

  const [pendingEvents, setPendingEvents] = useState([]);
  const [publishedEvents, setPublishedEvents] = useState([]);

  const [showPopup, setShowPopup] = React.useState(isOpenEditPopup);
  const [showExportPopup, setShowExportPopup] = React.useState(isOpenEditPopup);

  const [csvFormat, setCsvFormat] = useState('sf_csv');
  const [editMode, setEditMode] = useState('add');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchPendingEvents = useCallback(async () => {
    try {
      if (['Owner', 'Admin', 'Official'].includes(clubRole)) {
        const response = await getAggEventsByStatus(
          clubId,
          meetId,
          'AdminOnly'
        );
        console.log('Aggregated pending events: ', response.data);
        setPendingEvents(
          eventsToTableData(response.data, clubId, meetId, openEditPopup)
        );
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

      setPublishedEvents(
        eventsToTableData(response.data, clubId, meetId, openEditPopup)
      );
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

  const handleAddEvent = () => {
    setEditMode('add');
    setShowPopup(true);
    navigate(routes.admin.addEvent.url(clubId, meetId));
  };

  const handleImportResults = () => {
    console.log('handling import results');
  };

  const openExportPopup = () => {
    console.log('handling export results');
    setShowExportPopup(true);
  };

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
    setAllEvents(eventsToExportTableData(pendingEvents, publishedEvents));
  }, [pendingEvents, publishedEvents, optionValues]);

  const handleOptionChange = (name, value) => {
    setOptionValues({ ...optionValues, [name]: value });
  };

  const closeEditPopup = () => {
    setShowPopup(false);
    setSelectedEvent(null);
    navigate(routes.admin.events.url(clubId, meetId));
  };

  const closeExportPopup = () => {
    setShowExportPopup(false);
    navigate(routes.admin.events.url(clubId, meetId));
  };

  const handleEventsExport = async () => {
    setShowExportPopup(false);
    // navigate(routes.admin.events.url(clubId, meetId));
    const selectedEvents = allEvents.filter((e) => e.isCheck);
    const eventIds = selectedEvents.reduce((acc, e) => {
      acc = [...acc, ...e.eventIDs];
      return acc;
    }, []);
    const data = await exportResultsToFile(clubId, meetId, csvFormat, eventIds);
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `athlete_results_${(Date.now() / 1000).toFixed(0)}.csv`; // File name
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleEventAdding = async () => {
    closeEditPopup();
  };

  const openEditPopup = async (event) => {
    setEditMode('edit');
    setSelectedEvent(event);
    setShowPopup(true);
  };

  const handleEventSelect = (event) => {
    setAllEvents((prevData) =>
      prevData.map((row) =>
        row.id === event.id
          ? {
              ...row,
              isCheck: !row.isCheck,
            }
          : row
      )
    );
  };

  const handleCsvFormatChange = (e) => {
    setCsvFormat(e.target.value);
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
        />
        {['Owner', 'Admin', 'Official'].includes(clubRole) && (
          <AdminPageOption
            dataTypeOptions={dataTypeOptions}
            hasButton={true}
            handleOptionChange={handleOptionChange}
            optionValues={optionValues}
            buttonLabel="+ Add Event"
            buttonStyle={{
              ...defaultButtonStyle,
              marginBottom: 0,
              height: 'unset',
              padding: '10px 20px',
            }}
            handleButton={handleAddEvent}
            hasImportButton={true}
            handleImportButton={handleImportResults}
            handleExportButton={openExportPopup}
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
      <EventEditPopup
        clubId={clubId}
        meet={meet}
        event={selectedEvent}
        mode={editMode}
        showPopup={showPopup}
        closePopup={closeEditPopup}
        handleButton={handleEventAdding}
      ></EventEditPopup>
      <ResultExportPopup
        showPopup={showExportPopup}
        onClose={closeExportPopup}
        handleButton={handleEventsExport}
        events={allEvents}
        handleCheckBoxValueChange={handleEventSelect}
        csvFormat={csvFormat}
        setCsvFormat={handleCsvFormatChange}
      ></ResultExportPopup>
    </>
  );
};

Events.propTypes = {
  isOpenEditPopup: PropTypes.bool,
};

export default Events;
