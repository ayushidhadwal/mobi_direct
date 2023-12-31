import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {ForgotPasswordDTO, ForgotPasswordResponse} from '../types';

export const forgotPassword = async ({
  email,
}: ForgotPasswordDTO): Promise<ForgotPasswordResponse> => {
  const response = await axios.post(ApiEndpoints.auth.forgotPassword, {
    email: email,
  });

  const {status, message, data} = response.data;

  if (status) {
    return {
      email: data.email,
      mobileNumber: data.phone,
      OTP: data.otp,
    };
  } else {
    throw new Error(message);
  }
};
