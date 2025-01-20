const TOKEN_KEY = 'jwt_token';
const CLUB_ROLE_KEY = 'club_role';
const PORTAL_ROLE_KEY = 'portal_role';
const USER_INFO_KEY = 'user_info';
const USER_EMAIL_KEY = 'user_email';

export const setToken = (storage, token) => {
  storage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
};

export const setClubRole = (clubRole) => {
  localStorage.setItem(CLUB_ROLE_KEY, clubRole);
};

export const getClubRole = () => {
  return (
    localStorage.getItem(CLUB_ROLE_KEY) || sessionStorage.getItem(CLUB_ROLE_KEY)
  );
};

export const removeClubRole = () => {
  localStorage.removeItem(CLUB_ROLE_KEY);
  sessionStorage.removeItem(CLUB_ROLE_KEY);
};

export const setPortalRole = (portalRole) => {
  localStorage.setItem(PORTAL_ROLE_KEY, portalRole);
};

export const getPortalRole = () => {
  return (
    localStorage.getItem(PORTAL_ROLE_KEY) ||
    sessionStorage.getItem(PORTAL_ROLE_KEY)
  );
};

export const removePortalRole = () => {
  localStorage.removeItem(PORTAL_ROLE_KEY);
  sessionStorage.removeItem(PORTAL_ROLE_KEY);
};

export const setUserInfo = (storage, userInfo) => {
  storage.setItem(USER_INFO_KEY, userInfo);
};

export const getUserInfo = () => {
  return (
    localStorage.getItem(USER_INFO_KEY) || sessionStorage.getItem(USER_INFO_KEY)
  );
};

export const removeUserInfo = () => {
  localStorage.removeItem(USER_INFO_KEY);
  sessionStorage.removeItem(USER_INFO_KEY);
};

export const setUserEmail = (storage, userEmail) => {
  storage.setItem(USER_EMAIL_KEY, userEmail);
};

export const getUserEmail = () => {
  return (
    localStorage.getItem(USER_EMAIL_KEY) ||
    sessionStorage.getItem(USER_EMAIL_KEY)
  );
};

export const removeUserEmail = () => {
  localStorage.removeItem(USER_EMAIL_KEY);
  sessionStorage.removeItem(USER_EMAIL_KEY);
};
