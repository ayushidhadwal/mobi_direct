import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {CheckAvailableEmailDTO} from '../types';

export const checkAvailableEmail = async (
  checkAvailableEmailDTO: CheckAvailableEmailDTO,
): Promise<boolean> => {
  if (checkAvailableEmailDTO?.email) {
    const response = await axios.post(
      ApiEndpoints.auth.checkAvailableEmail,
      checkAvailableEmailDTO,
    );

    const {status} = response.data;
    return status;
  } else {
    return true;
  }
};
