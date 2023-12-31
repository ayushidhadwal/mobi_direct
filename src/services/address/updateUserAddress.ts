import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {Address, AddressDTO} from '../types';

export const updateUserAddresses = async (
  addressId: number,
  addressDTO: AddressDTO,
): Promise<Address> => {
  const {pinCode} = addressDTO;
  const response = await axios.post(ApiEndpoints.address.update, {
    ...addressDTO,
    address_id: addressId,
    pincode: pinCode,
  });

  const {status, message, data} = response.data;

  if (status) {
    return {
      id: Number(data.id),
      userId: Number(data.user_id),
      address: data.address,
      city: data.city,
      state: data.state,
      pinCode: data.pincode,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } else {
    throw new Error(message);
  }
};
