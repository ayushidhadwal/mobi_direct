import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {Address, AddressDTO} from '../types';

export const addUserAddresses = async (
  addressDTO: AddressDTO,
): Promise<Address> => {
  const {pinCode} = addressDTO;

  const response = await axios.post(ApiEndpoints.address.add, {
    ...addressDTO,
    pincode: pinCode,
  });

  const {status, message, data} = response.data;

  if (status) {
    return {
      id: Number(data.id),
      userId: Number(data.user_id),
      address: data.address,
      city: data.city,
      pinCode: data.pincode,
      state: data.state,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } else {
    throw new Error(message);
  }
};
