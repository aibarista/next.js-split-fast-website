import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './ClubMembers.module.css';

import routes from 'routes';
import { getMembers, sendInvitation } from 'api/userApi';
import { columns } from 'config/admin/clubMembers';

import MetaTags from 'components/common/MetaTags';
import AdminTablePageLayout from 'components/admin/AdminTablePageLayout';
import AdminPageHeader from 'components/admin/AdminPageHeader';
import AdminDataTable from 'components/admin/AdminDataTable';
import TableViewButton from 'components/admin/TableViewButton';

const membersToTableData = (members, clubId, invite) => {
  const results = [];

  members.forEach((member) => {
    let profiles = '';

    for (let i = 0; i < member.athletes.length; i++) {
      const athlete = member.athletes[i];
      if (i) profiles = profiles + ', ';
      profiles =
        profiles +
        `${athlete.firstName} ${athlete.lastName} (${athlete.age}${athlete.gender})`;
    }

    results.push({
      ...member,
      name: `${member.firstName} ${member.lastName}`,
      profiles,
      buttons: (
        <div className={styles.buttons}>
          <TableViewButton
            url={routes.admin.showMember.url(clubId, member.email)}
            style={{
              marginRight: 10,
            }}
          />
          {member.invitationStatus !== 'Accepted' && (
            <div
              onClick={() => invite(clubId, member.email)}
              className={styles.button}
            >
              Invite
            </div>
          )}
        </div>
      ),
    });
  });

  return results;
};

const ClubMembers = () => {
  const navigate = useNavigate();

  const { selectedClub } = useSelector((state) => state.user || {});

  const [fetchingMembers, setFetchingMembers] = React.useState(true);
  const [members, setMembers] = React.useState([]);

  const fetchMembers = useCallback(async () => {
    try {
      if (selectedClub?.clubID) {
        const response = await getMembers(selectedClub?.clubID);

        console.log(response.data);
        setMembers(
          membersToTableData(
            response.data,
            selectedClub?.clubID || '',
            inviteMember
          )
        );
      }
    } catch (err) {
      console.log('[ClubMembers] Fetch Members error:', err);
    }
  }, [selectedClub?.clubID]);

  const inviteMember = async (clubId, email) => {
    try {
      await sendInvitation(clubId, email);

      toast.success('Successfully invited member');
    } catch (err) {
      console.log('[ClubMembers] Member invitation error: ', err);
    }
  };

  useEffect(() => {
    fetchMembers().then(() => {
      setFetchingMembers(false);
    });
  }, [fetchMembers]);

  return (
    <>
      <MetaTags title="SplitFast | Members" />
      <AdminTablePageLayout loading={fetchingMembers}>
        <AdminPageHeader
          number={members.length}
          name="Member"
          title="Club Members"
          buttonLabel="+ Add Member"
          handleButton={() =>
            navigate(routes.admin.addMember.url(selectedClub?.clubID))
          }
        />
        {members.length ? (
          <AdminDataTable
            columns={columns}
            data={members}
            searchInputPlaceholder="Search Members"
            headStyle={{
              gridTemplateColumns: '4fr 5fr 2fr 2fr 2fr 4fr',
            }}
            rowStyle={{
              gridTemplateColumns: '4fr 5fr 2fr 2fr 2fr 4fr',
            }}
          />
        ) : (
          <div style={{ textAlign: 'center' }}>Member not found</div>
        )}
      </AdminTablePageLayout>
    </>
  );
};

export default ClubMembers;
