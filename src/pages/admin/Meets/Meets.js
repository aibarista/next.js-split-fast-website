import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import routes from 'routes';
import {
  dataTypeOptions,
  viewTypeOptions,
  columns,
} from 'config/admin/competition';
import { getFilteredMeets } from 'api/clubApi';
import { getClubRole } from 'services/auth/tokenService';
import { meetsToTableData } from 'utils/meet';

import MetaTags from 'components/common/MetaTags';
import AdminTablePageLayout from 'components/admin/AdminTablePageLayout';
import AdminPageHeader from 'components/admin/AdminPageHeader';
import AdminPageOption from 'components/admin/AdminPageOption';
import AdminDataTable from 'components/admin/AdminDataTable';

const Meets = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dataType = searchParams.get('dataType');
  const clubRole = getClubRole();

  const { selectedClub } = useSelector((state) => state.user || {});

  const [fetchingUpcomingMeets, setFetchingUpcomingMeets] = useState(true);
  const [fetchingCompleteMeets, setFetchingCompleteMeets] = useState(true);
  const [fetchingDraftMeets, setFetchingDraftMeets] = useState(true);

  const [competitions, setCompetitions] = useState([]);
  const [trainingSessions, setTrainingSessions] = useState([]);

  const [upcomingMeets, setUpcomingMeets] = useState([]);
  const [completeMeets, setCompleteMeets] = useState([]);
  const [draftMeets, setDraftMeets] = useState([]);

  const [optionValues, setOptionValues] = useState({
    dataType: dataType || 'upcoming',
    viewType: 'table',
  });

  const handleOptionChange = useCallback(
    (name, value) => {
      setOptionValues({ ...optionValues, [name]: value });
      navigate(`${routes.admin.meets}?${name}=${value}`);
    },
    [optionValues, navigate]
  );

  const fetchUpcomingMeets = useCallback(async () => {
    try {
      if (selectedClub) {
        const response = await getFilteredMeets(
          selectedClub?.clubID || '',
          ['Upcoming'],
          ['AdminOnly', 'ClubMembers']
        );

        console.log(response.data);
        setUpcomingMeets(meetsToTableData(response.data, selectedClub?.clubID));
      }
    } catch (err) {
      console.log('[Meets] Fetch Upcoming Meets error: ', err);
    }
  }, [selectedClub]);

  const fetchCompleteMeets = useCallback(async () => {
    try {
      if (selectedClub) {
        const response = await getFilteredMeets(
          selectedClub?.clubID || '',
          ['Complete'],
          ['AdminOnly', 'ClubMembers']
        );

        console.log(response.data);
        setCompleteMeets(meetsToTableData(response.data, selectedClub?.clubID));
      }
    } catch (err) {
      console.log('[Meets] Fetch Complete Meets error: ', err);
    }
  }, [selectedClub]);

  const fetchDraftMeets = useCallback(async () => {
    try {
      if (selectedClub && clubRole !== 'Member') {
        const response = await getFilteredMeets(
          selectedClub?.clubID || '',
          ['Draft'],
          ['AdminOnly', 'ClubMembers']
        );

        console.log(response.data);
        setDraftMeets(meetsToTableData(response.data, selectedClub?.clubID));
      }
    } catch (err) {
      console.log('[Meets] Fetch Draft Meets error: ', err);
    }
  }, [selectedClub, clubRole]);

  useEffect(() => {
    fetchUpcomingMeets().then(() => {
      setFetchingUpcomingMeets(false);
    });
  }, [fetchUpcomingMeets]);

  useEffect(() => {
    fetchCompleteMeets().then(() => {
      setFetchingCompleteMeets(false);
    });
  }, [fetchCompleteMeets]);

  useEffect(() => {
    fetchDraftMeets().then(() => {
      setFetchingDraftMeets(false);
    });
  }, [fetchDraftMeets]);

  useEffect(() => {
    if (optionValues.dataType === 'upcoming') {
      setCompetitions(upcomingMeets.filter((meet) => meet.meetType === 1));
      setTrainingSessions(upcomingMeets.filter((meet) => meet.meetType === 0));
    } else if (optionValues.dataType === 'complete') {
      setCompetitions(completeMeets.filter((meet) => meet.meetType === 1));
      setTrainingSessions(completeMeets.filter((meet) => meet.meetType === 0));
    } else {
      setCompetitions(draftMeets.filter((meet) => meet.meetType === 1));
      setTrainingSessions(draftMeets.filter((meet) => meet.meetType === 0));
    }
  }, [upcomingMeets, completeMeets, draftMeets, optionValues]);

  useEffect(() => {
    const findOption = dataTypeOptions.find(
      (option) => option.value === dataType
    );
    if (findOption) {
      if (
        findOption.allowedRoles &&
        findOption.allowedRoles.indexOf(clubRole) === -1
      )
        handleOptionChange('dataType', 'upcoming');
    } else {
      handleOptionChange('dataType', 'upcoming');
    }
  }, [dataType, clubRole, handleOptionChange]);

  return (
    <>
      <MetaTags title="SplitFast | Competitions" />
      <AdminTablePageLayout
        loading={
          fetchingCompleteMeets || fetchingDraftMeets || fetchingUpcomingMeets
        }
      >
        <AdminPageHeader
          showNumber={false}
          name="Meet"
          buttonLabel="+ Add a Meet"
          handleButton={
            clubRole === 'Member'
              ? null
              : () => navigate(routes.admin.addMeet.url(selectedClub?.clubID))
          }
        />
        <AdminPageOption
          clubRole={clubRole}
          dataTypeOptions={dataTypeOptions}
          viewTypeOptions={viewTypeOptions}
          optionValues={optionValues}
          handleOptionChange={handleOptionChange}
        />
        <h2 className="heading2" style={{ margin: '20px 0' }}>
          Competitions
        </h2>
        {competitions.length ? (
          <AdminDataTable
            columns={columns}
            data={competitions}
            searchInputPlaceholder="Search Competitions"
            headStyle={{
              gridTemplateColumns: '3fr 3fr 4fr 4fr 3fr 2fr 4fr',
            }}
            rowStyle={{
              gridTemplateColumns: '3fr 3fr 4fr 4fr 3fr 2fr 4fr',
            }}
          />
        ) : (
          <div style={{ textAlign: 'center' }}>Competition not found</div>
        )}
        <h2 className="heading2" style={{ margin: '20px 0' }}>
          Training Sessions
        </h2>
        {trainingSessions.length ? (
          <AdminDataTable
            columns={columns}
            data={trainingSessions}
            searchInputPlaceholder="Search Training Sessions"
            headStyle={{
              gridTemplateColumns: '3fr 3fr 4fr 4fr 3fr 2fr 4fr',
            }}
            rowStyle={{
              gridTemplateColumns: '3fr 3fr 4fr 4fr 3fr 2fr 4fr',
            }}
          />
        ) : (
          <div style={{ textAlign: 'center' }}>Training Session not found</div>
        )}
      </AdminTablePageLayout>
    </>
  );
};

export default Meets;
