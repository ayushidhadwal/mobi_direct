import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export const deleteAccount = async (password: string): Promise<boolean> => {
  const response = await axios.post(ApiEndpoints.deleteAccount, {
    password: password,
  });

  const {status, message} = response.data;

  if (status) {
    return true;
  } else {
    throw new Error(message);
  }
};
