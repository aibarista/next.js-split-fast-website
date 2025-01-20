import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './ShowMember.module.css';

import routes from 'routes';
import { getAthletesByMemberEmail, getClubMemberByEmail } from 'api/userApi';
import { dataTypeOptions } from 'config/admin/clubMembers';
import { getClubRole } from 'services/auth/tokenService';

import MetaTags from 'components/common/MetaTags';
import AdminTablePageLayout from 'components/admin/AdminTablePageLayout';
import AdminPageHeader from 'components/admin/AdminPageHeader';
import AdminPageOption from 'components/admin/AdminPageOption';
import MemberDetails from 'components/admin/MemberDetails';
import AthleteTable from 'components/admin/AthleteTable';
import TableViewButton from 'components/admin/TableViewButton';

import { ReactComponent as EditIcon } from 'assets/images/icon_edit.svg';

const ShowMember = () => {
  const clubRole = getClubRole();

  const { id, email } = useParams();
  const [optionValues, setOptionValues] = useState({ dataType: 'general' });
  const [fetchingMember, setFetchingMember] = useState(true);
  const [fetchingAthletes, setFetchingAthletes] = useState(true);
  const [member, setMember] = useState(null);
  const [athletes, setAthletes] = useState([]);

  const fetchMember = useCallback(async () => {
    try {
      const response = await getClubMemberByEmail(id, email);
      console.log('member: ', response.data);
      setMember(response.data);
    } catch (err) {
      console.log('[ShowMember] Fetch member error: ', err);
    }
  }, [id, email]);

  const fetchAthletes = useCallback(async () => {
    try {
      const response = await getAthletesByMemberEmail(id, email);
      console.log('athletes: ', response.data);
      const athletes = [];
      response.data.forEach((athlete) => {
        athletes.push({
          ...athlete,
          athleteName: `${athlete.firstName} ${athlete.lastName}`,
          buttons: (
            <div className={styles.buttons}>
              <TableViewButton
                url={`${routes.admin.athleteDashboard}?athleteId=${athlete.athleteID}`}
                style={{ marginRight: 10 }}
                iconSize="20px"
                textFontSize="16px"
              />
              {['Owner', 'Admin', 'Official'].includes(clubRole) && (
                <Link
                  to={routes.admin.editAthlete.url(
                    id,
                    email,
                    athlete.athleteID
                  )}
                  className={styles.editButton}
                >
                  <EditIcon />
                </Link>
              )}
            </div>
          ),
        });
      });
      setAthletes(athletes);
    } catch (err) {
      console.log('[ShowMember] Fetch athletes error: ', err);
    }
  }, [id, email, clubRole]);

  useEffect(() => {
    fetchMember().then(() => {
      setFetchingMember(false);
    });
  }, [fetchMember]);

  useEffect(() => {
    fetchAthletes().then(() => {
      setFetchingAthletes(false);
    });
  }, [fetchAthletes]);

  const handleOptionChange = (name, value) => {
    setOptionValues({ ...optionValues, [name]: value });
  };

  return (
    <>
      <MetaTags title="SplitFast | Member Information" />
      <AdminTablePageLayout loading={fetchingMember || fetchingAthletes}>
        <AdminPageHeader showNumber={false} title="Member Information" />
        <AdminPageOption
          dataTypeOptions={dataTypeOptions}
          optionValues={optionValues}
          handleOptionChange={handleOptionChange}
        />
        <MemberDetails member={member} clubId={id} />
        <AthleteTable athletes={athletes} clubId={id} email={email} />
      </AdminTablePageLayout>
    </>
  );
};

export default ShowMember;
