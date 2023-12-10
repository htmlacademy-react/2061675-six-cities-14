import axios, { AxiosError, AxiosResponse } from 'axios';
import { getToken } from './token.ts';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

const BACKEND_URL = 'https://14.design.pages.academy';
const REQUEST_TIMEOUT = 5000;

type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodesMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodesMapping[response.status];

export const createAPI = () => {
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

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);

        toast.warn(detailMessage.message);
      }

      throw error;
    }
  );
  return instance;
};


export class HttpClient {
  private static instance = createAPI();

  static post<T>(url: string, data: any): Promise<T> {
    return HttpClient.instance.post<T>(url, data).then((x) => x.data);
  }

  static put<T>(url: string, data: any): Promise<T> {
    return HttpClient.instance.put<T>(url, data).then((x) => x.data);
  }

  static get<T>(url: string): Promise<T> {
    return HttpClient.instance.get<T>(url).then((x) => x.data);
  }

  static delete<T>(url: string, data: any): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return HttpClient.instance.delete<T>(url, {data}).then((x) => x.data);
  }
}
