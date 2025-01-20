import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Register.module.css';
import { authInfoUpdate } from 'services/auth/authSlice';

import routes from 'routes';
import AuthTab from 'components/auth/AuthTab';
import UserTypeSelector from 'components/auth/UserTypeSelector';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';

import { ReactComponent as OwnerIcon } from 'assets/images/user_card.svg';
import { ReactComponent as MemberIcon } from 'assets/images/user_icon.svg';

const userTypes = [
  {
    userType: 'Owner',
    description:
      'You need to create and manage clubs, and manage the account subscription.',
    icon: <OwnerIcon />,
    tagText: 'Requires Paid Subscription',
  },
  {
    userType: 'Member',
    description:
      'You are club staff, a coach, an athlete or a parent and you need to join a club or clubs.',
    icon: <MemberIcon />,
    tagText: 'No Subscription Required',
  },
];

const Register = () => {
  const navigate = useNavigate();

  const { authInfo } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();

  const selectedUserType = authInfo?.userType;

  const handleUserTypeSelect = (userType) => {
    dispatch(authInfoUpdate({ ...authInfo, userType }));
  };

  return (
    <>
      <AuthTab />
      <div className={styles.registerContent}>
        <div className={styles.registerHeader}>
          Let&apos;s find out which type of account you need
        </div>
        <div className={`${styles.accountTypes}`}>
          {userTypes.map((userType) => (
            <UserTypeSelector
              key={userType.userType}
              {...userType}
              selectedUserType={selectedUserType}
              onClick={() => handleUserTypeSelect(userType.userType)}
            />
          ))}
        </div>
        <CustomButton
          style={{
            ...defaultButtonStyle,
            maxWidth: 145,
          }}
          disabled={!selectedUserType}
          onClick={() => {
            navigate(routes.auth.general);
          }}
        >
          Next
        </CustomButton>
      </div>
    </>
  );
};

export default Register;
