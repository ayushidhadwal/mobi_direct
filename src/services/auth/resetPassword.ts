import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {NewPasswordDTO} from '../types';

export const resetPassword = async ({
  mobileNumber,
  password,
  email,
}: NewPasswordDTO): Promise<boolean> => {
  const response = await axios.post(ApiEndpoints.auth.resetPassword, {
    email: email,
    phone: mobileNumber,
    password: password,
  });

  const {status, message} = response.data;

  if (status) {
    return true;
  } else {
    throw new Error(message);
  }
};
