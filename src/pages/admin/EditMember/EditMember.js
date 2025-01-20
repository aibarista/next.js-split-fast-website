import React from 'react';
import { useParams } from 'react-router-dom';
import MemberManager from 'components/admin/MemberManager';

const EditMember = () => {
  const { id, email } = useParams();

  return <MemberManager mode="edit" id={id} email={email} />;
};

export default EditMember;
