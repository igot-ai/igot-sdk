import { isArray } from 'lodash';

import axios, { AxiosResponse } from 'axios';
import { API_URLS } from '../constants';
import { getConfig } from '../config';

const appConfig = getConfig();

const api = axios.create({
  baseURL: API_URLS.BASE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = appConfig.apiKey;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error) => {
    if (error.response?.data?.message) {
      if (isArray(error.response?.data?.message)) {
        // TODO: Handle array of error message
      }
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
      // TODO: Handle unauthorized error
    }

    return Promise.reject(error.response?.data);
  }
);

export { api };
