import Axios from 'axios';

import Config from '../config';
import {ApiEndpoints, VerifyLoginResponse} from '../services';
import * as storage from '../utils/storage';

export const axios = Axios.create({
  baseURL: Config.API_URL,
});

const authRoutes: string[] = [
  ApiEndpoints.auth.login,
  ApiEndpoints.auth.register,
  ApiEndpoints.auth.checkAvailableEmail,
  ApiEndpoints.auth.forgotPassword,
  ApiEndpoints.auth.resetPassword,
];

axios.interceptors.request.use(
  async function (config) {
    config.headers = config.headers ?? {};
    if (!authRoutes.find(route => route === config.url)) {
      const user: VerifyLoginResponse = await storage.load(Config.USER_SESSION);

      if (user?.userToken && user?.userType) {
        const {userToken, userType} = user;

        if (userToken && userType) {
          config.headers.Authorization = `Bearer ${userToken}`;
          config.headers.Accept = 'application/json';
        }
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
