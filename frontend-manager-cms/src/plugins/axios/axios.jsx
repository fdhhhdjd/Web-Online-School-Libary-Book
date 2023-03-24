//! LIBRARY
import axios from 'axios';

//! SHARE
import CONSTANTS from 'configs/constants';
import { getToken } from 'utils/auth';

//! API
import API_STUDENT from 'api/api_admin';

export const axiosIns = axios.create({
  baseURL: '',
  timeout: CONSTANTS.TIME_OUT_AXIOS,
  withCredentials: CONSTANTS.DELETED_ENABLE,
  headers: {
    Accept: CONSTANTS.ACCEPT_HEADER,
  },
});

axiosIns.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};
    if (config.url !== API_STUDENT.LOGIN_STUDENT) {
      const auth = getToken(CONSTANTS.AUTH_TOKEN) || CONSTANTS.DATA._NULL;

      if (auth) {
        config.headers.authorization = `${CONSTANTS.BEARER_HEADER} ${auth}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
