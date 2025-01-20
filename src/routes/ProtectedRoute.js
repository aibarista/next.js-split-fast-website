import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  getClubRole,
  getToken,
  getUserEmail,
} from 'services/auth/tokenService';
import { decodeToken } from 'utils/auth';
import routes from 'routes';

const ProtectedRoute = ({
  children,
  allowedRoles,
  isShowMemberPage = false,
}) => {
  const token = getToken();
  const { email } = useParams();

  if (!token) {
    toast.error('You must be logged in.');
    return <Navigate to={routes.auth.login} />;
  }

  const decodedToken = decodeToken(token);
  if (!decodedToken) {
    toast.error('You must be logged in.');
    return <Navigate to={routes.auth.login} />;
  }

  const { userRole, exp } = decodedToken;

  if (userRole === 'AccountOwner' || userRole === 'RegisteredUser') {
    console.log('Validated portal Role is :', userRole);
  }

  const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
  if (exp < currentTime) {
    toast.error('Session expired. Please log in again.');
    return <Navigate to={routes.auth.login} />;
  }

  const clubRole = getClubRole();

  if (isShowMemberPage && email === getUserEmail()) return children;

  if (allowedRoles) {
    if (!allowedRoles.includes(clubRole)) {
      toast.error('You do not have permission to view the page.');
      return <Navigate to={routes.admin.dashboard} />;
    }
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  isShowMemberPage: PropTypes.bool,
};

export default ProtectedRoute;
