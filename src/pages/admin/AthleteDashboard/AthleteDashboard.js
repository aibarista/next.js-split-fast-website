import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from './AthleteDashboard.module.css';

import routes from 'routes';

import {
  getAthletesByMemberEmail,
  getEventHistory,
  getPastMeetAtCurrentSeason,
  getRecentMeetByAthleteId,
} from 'api/userApi';
import { getAthletes } from 'api/clubApi';
import { historyResultDataColumns } from 'config/admin/athleteDashboard';
import { getClubRole, getUserEmail } from 'services/auth/tokenService';
import {
  createEventHistory,
  generateAthleteOptions,
  getHistoryPR,
  historyResultData,
} from 'services/admin/AthleteDashboardService';

import Loading from 'components/common/Loading';
import MetaTags from 'components/common/MetaTags';
import DashboardLayout from 'components/admin/DashboardLayout';
import AdminTab from 'components/admin/AdminTab';
import AdminDataTable from 'components/admin/AdminDataTable';
import ResultHistoryPopup from 'components/admin/ResultHistoryPopup';
import AthleteRecentMeet from 'components/admin/AthleteDashboard/AthleteRecentMeet';
import AthletePastMeet from 'components/admin/AthleteDashboard/AthletePastMeet';

import MedalBadge from 'assets/images/icon_medal_badge.png';
import ChartToolTip from './ChartToolTip';

const AthleteDashboard = () => {
  const clubRole = getClubRole();

  const { selectedClub } = useSelector((state) => state.user || {});
  const email = getUserEmail();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const athleteId = searchParams.get('athleteId');

  const [athletes, setAthletes] = useState([]);

  const [fetchingAthletes, setFetchingAthletes] = useState(true);
  const [fetchingRecentMeet, setFetchingRecentMeet] = useState(true);
  const [fetchingPastMeets, setFetchingPastMeets] = useState(true);
  const [fetchingEventHistory, setFetchingEventHistory] = useState(true);

  const [showPopup, setShowPopup] = useState(false);
  const [tabValue, setTabValue] = useState(athleteId || null);
  const [athleteName, setAthleteName] = useState(null);
  const [recentMeet, setRecentMeet] = useState(null);
  const [pastMeets, setPastMeets] = useState(null);
  const [historyEventType, setHistoryEventType] = useState(null);
  const [historySeasonName, setHistorySeasonName] = useState('');
  const [historyData, setHistoryData] = useState([]);
  const [historyResults, setHistoryResults] = useState([]);
  const [historyPR, setHistoryPR] = useState('');

  const fetchAthletes = useCallback(async () => {
    try {
      if (clubRole === 'Member') {
        const response = await getAthletesByMemberEmail(
          selectedClub?.clubID,
          email
        );
        return response.data;
      } else {
        const response = await getAthletes(selectedClub?.clubID);
        return response.data;
      }
    } catch (err) {
      console.log('[AthleteDashboard] Fetch athletes error: ', err);
      return [];
    }
  }, [selectedClub?.clubID, email, clubRole]);

  const fetchRecentMeet = useCallback(async () => {
    try {
      setFetchingRecentMeet(true);
      if (tabValue) {
        const response = await getRecentMeetByAthleteId(
          selectedClub?.clubID,
          tabValue
        );
        return response.data;
      } else {
        return null;
      }
    } catch (err) {
      console.log('[AthleteDashboard] Fetch recent meet error: ', err);
      return null;
    }
  }, [selectedClub?.clubID, tabValue]);

  const fetchPastMeets = useCallback(async () => {
    try {
      setFetchingPastMeets(true);
      if (tabValue) {
        const response = await getPastMeetAtCurrentSeason(
          selectedClub?.clubID,
          tabValue
        );
        return response.data;
      } else {
        return null;
      }
    } catch (err) {
      console.log('[AthleteDashboard] Fetch past meets error: ', err);
      return null;
    }
  }, [selectedClub?.clubID, tabValue]);

  const fetchEventHistory = useCallback(async () => {
    try {
      setFetchingEventHistory(true);
      if (tabValue && selectedClub?.clubID && historyEventType) {
        const response = await getEventHistory(
          selectedClub?.clubID,
          tabValue,
          historyEventType
        );
        return response.data;
      } else {
        return [];
      }
    } catch (err) {
      console.log('[AthleteDashboard] Fetch event history error: ', err);
      return [];
    }
  }, [selectedClub?.clubID, tabValue, historyEventType]);

  const clickTab = useCallback(
    (value) => {
      setTabValue(value);
      navigate(`${routes.admin.athleteDashboard}?athleteId=${value}`);
    },
    [navigate]
  );

  const openHistoryPopup = (eventType) => {
    setShowPopup(true);
    setHistoryEventType(eventType);
  };

  const closeHistoryPopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    fetchAthletes().then((athletes) => {
      setAthletes(athletes);
      setFetchingAthletes(false);
    });
  }, [fetchAthletes]);

  useEffect(() => {
    fetchRecentMeet().then((meet) => {
      setRecentMeet(meet);
      setFetchingRecentMeet(false);
    });
  }, [fetchRecentMeet]);

  useEffect(() => {
    fetchPastMeets().then((meets) => {
      setPastMeets(meets);
      setFetchingPastMeets(false);
    });
  }, [fetchPastMeets]);

  useEffect(() => {
    fetchEventHistory().then((eventHistory) => {
      setFetchingEventHistory(false);
      setHistorySeasonName(eventHistory.seasonName);
      if (eventHistory.results) {
        setHistoryData(createEventHistory(eventHistory.results));
        setHistoryResults(eventHistory.results);
        setHistoryPR(getHistoryPR(eventHistory.results));
      }
    });
  }, [fetchEventHistory]);

  useEffect(() => {
    if (athletes.length > 0) {
      if (tabValue) {
        const athlete = athletes.find(
          (athlete) => athlete.athleteID === tabValue
        );
        if (!athlete) navigate(routes.notFound);
        else setAthleteName(`${athlete.firstName} ${athlete.lastName}`);
      } else {
        setTabValue(athletes[0].athleteID);
        setAthleteName(`${athletes[0].firstName} ${athletes[0].lastName}`);
      }
    }
  }, [athletes, tabValue, navigate]);

  return fetchingAthletes ? (
    <Loading isLoadingAdminPage={true} />
  ) : (
    <>
      <MetaTags title="SplitFast | My Dashboard" />
      <DashboardLayout
        title={clubRole === 'Member' ? 'My Dashboard' : athleteName}
        linkUrl={routes.admin.dashboard}
        linkName="Switch to Club Dashboard"
        showLink={clubRole === 'Member'}
      >
        {clubRole === 'Member' && (
          <AdminTab
            clubRole={clubRole}
            options={generateAthleteOptions(athletes)}
            value={tabValue}
            clickTab={clickTab}
            disabled={fetchingRecentMeet || fetchingPastMeets}
          />
        )}
        {fetchingRecentMeet || fetchingPastMeets ? (
          <Loading />
        ) : pastMeets?.meets[0]?.results.length > 0 ||
          recentMeet?.meets[0]?.results.length > 0 ? (
          <>
            <AthleteRecentMeet
              recentMeet={recentMeet}
              clubId={selectedClub?.clubID}
              openPopup={openHistoryPopup}
            />
            <AthletePastMeet
              pastMeets={pastMeets}
              openPopup={openHistoryPopup}
              clubId={selectedClub?.clubID}
            />
          </>
        ) : (
          <>No results found</>
        )}
      </DashboardLayout>
      <ResultHistoryPopup
        showPopup={showPopup}
        title={`${historyEventType} Event History`}
        subtitle={`${historySeasonName} season`}
        onClose={closeHistoryPopup}
        loading={fetchingEventHistory}
      >
        <h3 className="heading1" style={{ marginTop: 0 }}>
          {athleteName}
        </h3>
        {historyPR && (
          <div className={styles.historyPR}>
            PB {historyPR}
            <img src={MedalBadge} style={{ width: '30px' }} alt="PB" />
          </div>
        )}
        <ResponsiveContainer
          width="100%"
          height="45%"
          style={{ margin: 'auto' }}
        >
          <AreaChart
            width={400}
            height={200}
            data={historyData}
            margin={{
              top: 40,
              right: 0,
              left: 0,
              bottom: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<ChartToolTip />} />
            <Area
              type="monotone"
              dataKey="record"
              stroke="#cf2c47"
              fill="#cf2c47"
              dot={true}
              activeDot={true}
            ></Area>
          </AreaChart>
        </ResponsiveContainer>
        {historyResults.length > 0 ? (
          <AdminDataTable
            borderType="full"
            isAddedFeatures={false}
            columns={historyResultDataColumns}
            data={historyResultData(historyResults)}
            searchInputPlaceholder=""
            headStyle={{
              gridTemplateColumns: 'repeat(4, 1fr)',
              background: '#f1f1f2',
            }}
            rowStyle={{
              gridTemplateColumns: 'repeat(4, 1fr)',
            }}
          />
        ) : (
          <>No history found</>
        )}
      </ResultHistoryPopup>
    </>
  );
};

export default AthleteDashboard;
