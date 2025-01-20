import { authApi, defaultApi } from 'api';
import {
  removeToken,
  removeUserInfo,
  removePortalRole,
  removeUserEmail,
} from 'services/auth/tokenService';

export const createSubscriptionAccount = async (userData) => {
  return (await defaultApi.post('/Auth/create-account', userData)).data;
};

export const createMemberAccount = async (userData) => {
  return (await defaultApi.post('/Auth/register', userData)).data;
};

export const confirmInvitation = async (clubID, email, code) => {
  return await defaultApi.post(`/auth/confirm-invitation`, {
    clubID,
    email,
    code,
  });
};

export const setPassword = async (email, password) => {
  return await authApi.post(`/auth/set-password`, {
    email,
    newPassword: password,
  });
};

export const forgotPassword = async (email) => {
  return await authApi.post(`/auth/forgot-password`, { email });
};

export const resetPassword = async (email, code, newPassword) => {
  return await authApi.post(`/auth/reset-password`, {
    email,
    code,
    newPassword,
  });
};

export const login = async (credential) => {
  return await defaultApi.post('/Auth/login', credential);
};

export const logout = async () => {
  removeToken();
  removePortalRole();
  removeUserInfo();
  removeUserEmail();
};
