import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { storage } from '@utils/storage';

const DEV_API_URL = 'http://192.168.1.38:5001/api';

// const API_BASE_URL = process.env.REACT_APP_DEV_MODE === 'true' && __DEV__ ? DEV_API_URL : PROD_API_URL;

export const apiClient = axios.create({
  baseURL: DEV_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await storage.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);


apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await storage.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(`${DEV_API_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken } = response.data;
        await storage.setAccessToken(accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        await storage.clearAll();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
