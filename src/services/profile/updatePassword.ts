import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export type UpdatePasswordDto = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

export const updatePassword = async ({
  confirmPassword,
  newPassword,
  password,
}: UpdatePasswordDto): Promise<boolean> => {
  const response = await axios.post(ApiEndpoints.profile.updatePassword, {
    password: newPassword,
    password_confirmation: confirmPassword,
    currentPassword: password,
  });

  const {status, message} = response.data;

  if (status) {
    return true;
  } else {
    throw new Error(message);
  }
};
