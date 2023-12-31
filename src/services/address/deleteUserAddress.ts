import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export const deleteUserAddresses = async (
  addressId: number,
): Promise<number> => {
  const response = await axios.post(ApiEndpoints.address.delete, {
    id: addressId,
  });

  const {status, message, data} = response.data;

  if (status) {
    return Number(data.id);
  } else {
    throw new Error(message);
  }
};
