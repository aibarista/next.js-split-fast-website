import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './ClubDashboard.module.css';

import routes from 'routes';
import { getRecentMeets, getUpcomingMeets } from 'api/clubApi';
import { getResultHighlights } from 'api/resultApi';
import {
  meetTableColumns,
  highlightTableColumns,
  resultHighlightsTableRowLimit,
} from 'config/admin/clubDashboard';
import { getClubRole, getUserInfo } from 'services/auth/tokenService';
import {
  getUpcomingMeetData,
  getHighlightTableData,
  getRecentMeetData,
} from 'services/admin/ClubDashboardService';

import DashboardNotification from 'components/admin/DashboardNotification';
import AdminBlock from 'components/admin/AdminBlock';
import AdminTable from 'components/admin/AdminTable';
import EventCard from 'components/admin/EventCard';
import Loading from 'components/common/Loading';
import MetaTags from 'components/common/MetaTags';
import DashboardLayout from 'components/admin/DashboardLayout';

const ClubDashboard = () => {
  const userInfo = JSON.parse(getUserInfo());
  const clubRole = getClubRole();

  const { selectedClub } = useSelector((state) => state.user || {});

  const [fetchingRecentMeets, setFetchingRecentMeets] = useState(true);
  const [fetchingUpcomingMeets, setFetchingUpcomingMeets] = useState(true);
  const [fetchingHighlight, setFetchingHighlight] = useState(true);

  const [meetData, setMeetData] = useState([]);
  const [upcomingMeets, setUpcomingMeets] = useState([]);
  const [highlight, setHighlight] = useState([]);

  const fetchRecentMeets = useCallback(async () => {
    try {
      if (selectedClub?.clubID) {
        const response = await getRecentMeets(selectedClub?.clubID || '');
        const meets = response.data;

        setMeetData(getRecentMeetData(meets));
      }
    } catch (err) {
      console.log('[ClubDashboard] Fetch Meets error: ', err);
    }
  }, [selectedClub?.clubID]);

  const fetchUpcomingMeets = useCallback(async () => {
    try {
      if (selectedClub?.clubID) {
        const response = await getUpcomingMeets(selectedClub?.clubID || '');

        setUpcomingMeets(getUpcomingMeetData(response.data));
      }
    } catch (err) {
      console.log('[ClubDashboard] Fetch Upcoming Meets error: ', err);
    }
  }, [selectedClub?.clubID]);

  const fetchHighlight = useCallback(async () => {
    try {
      if (selectedClub?.clubID) {
        const response = await getResultHighlights(
          selectedClub?.clubID || '',
          resultHighlightsTableRowLimit
        );

        setHighlight(
          getHighlightTableData(response.data, selectedClub?.clubID)
        );
      }
    } catch (err) {
      console.log('[ClubDashboard] Fetch Highlight error: ', err);
    }
  }, [selectedClub?.clubID]);

  useEffect(() => {
    fetchRecentMeets().then(() => {
      setFetchingRecentMeets(false);
    });
  }, [fetchRecentMeets]);

  useEffect(() => {
    fetchUpcomingMeets().then(() => {
      setFetchingUpcomingMeets(false);
    });
  }, [fetchUpcomingMeets]);

  useEffect(() => {
    fetchHighlight().then(() => {
      setFetchingHighlight(false);
    });
  }, [fetchHighlight]);

  return fetchingRecentMeets || fetchingUpcomingMeets || fetchingHighlight ? (
    <>
      <Loading isLoadingAdminPage={true} />
    </>
  ) : (
    <>
      <MetaTags title="SplitFast | Club Dashboard" />
      <DashboardLayout
        title="Club Dashboard"
        linkUrl={routes.admin.athleteDashboard}
        linkName="Switch to My Dashboard"
        showLink={clubRole === 'Member'}
      >
        <DashboardNotification user={userInfo} notificationNumber={0} />
        <div className={styles.competitionTraining}>
          <div className={styles.competitionTrainingWrapper}>
            <AdminBlock
              title="Recent Meets"
              url={`${routes.admin.meets}?dataType=complete`}
            >
              <AdminTable
                columns={meetTableColumns}
                data={meetData}
                rowStyle={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 2fr 2fr 2fr 1fr',
                }}
              />
            </AdminBlock>
          </div>
        </div>
        <div className={styles.resultHighlights}>
          <div className={styles.resultHighlightsWrapper}>
            <AdminBlock title="Result Highlights">
              <AdminTable
                columns={highlightTableColumns}
                data={highlight}
                rowStyle={{
                  display: 'grid',
                  gridTemplateColumns: '7fr 7fr 7fr 7fr 7fr 4fr 3fr 8fr',
                  alignItems: 'center',
                  padding: '22px 18px 26px 22px',
                }}
              />
            </AdminBlock>
          </div>
        </div>
        <div className={styles.upcomingPas}>
          <div className={styles.upcomingPasWrapper}>
            <div className={styles.upcomingWrapper}>
              <AdminBlock
                title="Upcoming Meets"
                url={`${routes.admin.meets}?dataType=upcoming`}
              >
                <div className={styles.upcomingCards}>
                  {upcomingMeets.map((event, index) => (
                    <EventCard
                      key={index}
                      meet={event}
                      clubId={selectedClub?.clubID}
                    />
                  ))}
                </div>
              </AdminBlock>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ClubDashboard;
