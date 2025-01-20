import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import routes from 'routes';

import AdminDataTable from 'components/admin/AdminDataTable';
import AdminPageHeader from 'components/admin/AdminPageHeader';
import AdminTablePageLayout from 'components/admin/AdminTablePageLayout';
import MetaTags from 'components/common/MetaTags';
import TableViewButton from 'components/admin/TableViewButton';

import { getAthletes } from 'api/clubApi';
import { columns } from 'config/admin/athlete';

const Athletes = () => {
  const { selectedClub } = useSelector((state) => state.user || {});

  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);

  const fetchMembers = useCallback(async () => {
    try {
      if (selectedClub) {
        const response = await getAthletes(selectedClub?.clubID || '');

        return response.data;
      }
    } catch (err) {
      console.log('[Athletes] Fetch Members error: ', err);
      setLoading(false);
    }
  }, [selectedClub]);

  useEffect(() => {
    fetchMembers().then((members) => {
      console.log(members);
      const memberData = [];

      members.forEach((member) => {
        memberData.push({
          ...member,
          teams: '',
          userName: `${member.firstName} ${member.lastName}`,
          manage: (
            <TableViewButton
              url={`${routes.admin.athleteDashboard}?athleteId=${member.athleteID}`}
            />
          ),
        });
      });

      setMembers(memberData);
      setLoading(false);
    });
  }, [fetchMembers]);

  return (
    <>
      <MetaTags title="SplitFast | Athletes" />
      <AdminTablePageLayout loading={loading}>
        <AdminPageHeader number={members?.length} name="Athlete" />
        {members.length ? (
          <AdminDataTable
            columns={columns}
            data={members}
            searchInputPlaceholder="Search Athletes"
            headStyle={{
              gridTemplateColumns: '2fr 3fr 2fr 2fr 2fr 3fr 2fr',
            }}
            rowStyle={{
              gridTemplateColumns: '2fr 3fr 2fr 2fr 2fr 3fr 2fr',
            }}
          />
        ) : null}
      </AdminTablePageLayout>
    </>
  );
};

export default Athletes;
