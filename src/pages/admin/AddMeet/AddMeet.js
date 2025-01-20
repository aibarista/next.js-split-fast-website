import React from 'react';
import { useParams } from 'react-router-dom';
import MeetManager from 'components/admin/MeetManager/MeetManager';

const AddMeet = () => {
  const { id } = useParams();

  return <MeetManager clubId={id} mode="add" />;
};

export default AddMeet;
