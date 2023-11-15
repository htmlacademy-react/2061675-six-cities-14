import axios, { AxiosInstance } from 'axios';
import { getToken } from './token.ts';

const BACKEND_URL = 'https://14.design.pages.academy';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });
  instance.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return instance;
};
