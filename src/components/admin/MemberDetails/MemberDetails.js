import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MemberDetails.module.css';
import { toast } from 'react-toastify';

import routes from 'routes';
import { sendInvitation } from 'api/userApi';
import { getClubRole } from 'services/auth/tokenService';
import LabelText from 'components/common/LabelText';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';
import { ReactComponent as EditIcon } from 'assets/images/icon_edit.svg';

const MemberDetails = ({ member, clubId }) => {
  const clubRole = getClubRole();
  const navigate = useNavigate();
  const [inviting, setInviting] = useState(false);

  const invite = async () => {
    try {
      setInviting(true);
      await sendInvitation(clubId, member.email);

      toast.success('Successfully invited member');
    } catch (err) {
      console.log('[MemberDetails] Member invitation error: ', err);
    } finally {
      setInviting(false);
    }
  };

  return (
    <>
      <div className={styles.headerTitle}>
        <h5 className={styles.title}>Member Details</h5>
        {['Owner', 'Admin', 'Official'].includes(clubRole) && (
          <div
            className={styles.editIcon}
            onClick={() =>
              navigate(routes.admin.editMember.url(clubId, member.email))
            }
          >
            <EditIcon />
          </div>
        )}
      </div>
      <LabelText
        label="Member Name"
        text={`${member.firstName} ${member.lastName}`}
      />
      <LabelText label="Member Email" text={member.email} />
      <div className={styles.permissionStatusContainer}>
        <LabelText
          label="Permissions"
          text={member.role}
          style={{ marginRight: 50 }}
        />
        <LabelText
          label="Club Status"
          text={member.participationStatus}
          style={{ marginRight: 30 }}
        />
        {member.invitationStatus !== 'Accepted' && (
          <>
            <LabelText
              label="Status"
              text={member.invitationStatus}
              style={{ marginRight: 30 }}
            />
            <CustomButton
              style={{
                ...defaultButtonStyle,
                marginBottom: 0,
                height: 'fit-content',
                padding: '5px 20px',
              }}
              disabled={inviting}
              onClick={invite}
            >
              Invite
            </CustomButton>
          </>
        )}
      </div>
    </>
  );
};

MemberDetails.propTypes = {
  member: PropTypes.object,
  clubId: PropTypes.string,
};

export default MemberDetails;
