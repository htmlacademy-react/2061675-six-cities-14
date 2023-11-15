import axios from 'axios';
import { getToken } from './token.ts';

const BACKEND_URL = 'https://14.design.pages.academy';
const REQUEST_TIMEOUT = 5000;

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

export class HttpClient {
  static post<T>(url: string, data: any): Promise<T> {
    return instance.post<T>(url, data).then((x) => x.data);
  }

  static put<T>(url: string, data: any): Promise<T> {
    return instance.put<T>(url, data).then((x) => x.data);
  }

  static get<T>(url: string): Promise<T> {
    return instance.get<T>(url).then((x) => x.data);
  }

  static delete<T>(url: string, data: any): Promise<T> {
    return instance.delete<T>(url, {data}).then((x) => x.data);
  }
}
