import React from 'react';
import { useParams } from 'react-router-dom';
import AthleteManager from 'components/admin/AthleteManager';

const AddAthlete = () => {
  const { id, email } = useParams();

  return <AthleteManager mode="add" id={id} email={email} />;
};

export default AddAthlete;
