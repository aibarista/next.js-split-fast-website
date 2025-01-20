import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
  const decoded = jwtDecode(token);

  const userRole =
    decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  const userName =
    decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

  return { userRole, userName };
};
