import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {LoginCredentialsDTO, VerifyLoginResponse} from '../types';
import {createSession} from '../../utils/createSession';

export const login = async (
  loginCredentialsDTO: LoginCredentialsDTO,
): Promise<VerifyLoginResponse> => {
  const {mobileNumber, password} = loginCredentialsDTO;

  const response = await axios.post(ApiEndpoints.auth.login, {
    phone: mobileNumber,
    password: password,
  });

  const {status, message, data} = response.data;

  if (status) {
    return await createSession(data.user_type, data.token);
  } else {
    throw new Error(message);
  }
};
