import axios from 'axios';
import { BASE_URL } from 'constants';
import { getToken } from 'services/auth/tokenService';

export const defaultApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

defaultApi.interceptors.request.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default authApi;
