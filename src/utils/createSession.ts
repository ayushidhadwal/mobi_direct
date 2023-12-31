import {UserType, VerifyLoginResponse} from '../services';
import * as Storage from './storage';
import Config from '../config';

export const createSession = async (userType: string, token: string) => {
  const result: VerifyLoginResponse = {
    userType: Number(userType) === 1 ? UserType.AGENT : UserType.USER,
    userToken: token,
  };

  await Storage.save(Config.USER_SESSION, result);

  return result;
};
