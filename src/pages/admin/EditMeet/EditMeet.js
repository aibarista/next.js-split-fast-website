import React from 'react';
import { useParams } from 'react-router-dom';
import MeetManager from 'components/admin/MeetManager/MeetManager';

const EditMeet = () => {
  const { clubId, meetId } = useParams();

  return <MeetManager meetId={meetId} clubId={clubId} mode="edit" />;
};

export default EditMeet;
