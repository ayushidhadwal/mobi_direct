import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {VerifyLoginCredentialsDTO, VerifyLoginResponse} from '../types';
import {createSession} from '../../utils/createSession';

export const verifyLogin = async (
  verifyLoginCredentialsDTO: VerifyLoginCredentialsDTO,
): Promise<VerifyLoginResponse> => {
  const {OTP, mobileNumber} = verifyLoginCredentialsDTO;

  const response = await axios.post(ApiEndpoints.auth.verifyLogin, {
    otp: OTP,
    phone: mobileNumber,
  });

  const {status, message, data} = response.data;

  if (status) {
    return await createSession(data.user_type, data.token);
  } else {
    throw new Error(message);
  }
};
