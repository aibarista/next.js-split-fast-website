import React from 'react';
import { useParams } from 'react-router-dom';
import MemberManager from 'components/admin/MemberManager';

const AddMember = () => {
  const { id } = useParams();

  return <MemberManager mode="add" id={id} />;
};

export default AddMember;
