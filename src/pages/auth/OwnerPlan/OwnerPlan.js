import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { authInfoUpdate } from 'services/auth/authSlice';

import styles from './OwnerPlan.module.css';
import routes from 'routes';
import BackButton from 'components/auth/BackButton';
import UserPlan from 'components/auth/UserPlan';
import CustomButton, {
  defaultButtonStyle,
} from 'components/common/CustomButton';
import { toast } from 'react-toastify';

const userPlans = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

const OwnerPlan = () => {
  const navigate = useNavigate();

  const { authInfo } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();

  const selectedUserType = authInfo?.userType;
  const selectedUserPlan = authInfo?.subscriptionLevel;

  const handleUserPlanSelect = (subscriptionLevel) => {
    dispatch(authInfoUpdate({ ...authInfo, subscriptionLevel }));
  };

  useEffect(() => {
    if (selectedUserType !== 'Owner') {
      toast.warn('Please select Owner as user type');

      navigate(routes.auth.register);
    }
  }, [navigate, selectedUserType]);

  return (
    <>
      <BackButton navigate={navigate} />
      <div className={styles.sectionHeading}>Choose a Plan</div>
      <div className={styles.sectionSubheading}>
        Would you like to learn more about SplitFast first?
        <Link to={routes.client.home}>Click here.</Link>
      </div>
      <div className={styles.sectionItems}>
        {userPlans.map((userPlan) => (
          <UserPlan
            key={userPlan.id}
            id={userPlan.id}
            selectedId={selectedUserPlan}
            onClick={() => handleUserPlanSelect(userPlan.id)}
          ></UserPlan>
        ))}
      </div>
      <CustomButton
        style={{
          ...defaultButtonStyle,
          maxWidth: 361,
        }}
        width="361px"
        onClick={() => {
          navigate(routes.auth.billing);
        }}
      >
        Next
      </CustomButton>
    </>
  );
};

export default OwnerPlan;
