import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

type CreateOrderDTO = {
  couponCode: string;
  addressId: number;
  remarks?: string;
};

export const createOrder = async ({
  couponCode,
  addressId,
  remarks,
}: CreateOrderDTO): Promise<boolean> => {
  const response = await axios.post(ApiEndpoints.order.cart.createOrder, {
    addressId,
    couponCode,
    remarks,
  });

  const {status, message} = response.data;

  if (status) {
    return true;
  } else {
    throw new Error(message);
  }
};
