import React from 'react';
import { useParams } from 'react-router-dom';
import AthleteManager from 'components/admin/AthleteManager';

const EditAthlete = () => {
  const { id, email, athleteId } = useParams();

  return (
    <AthleteManager mode="edit" athleteId={athleteId} id={id} email={email} />
  );
};

export default EditAthlete;
