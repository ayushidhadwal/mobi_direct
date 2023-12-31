import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export const deleteCart = async (cartId: string): Promise<string> => {
  const response = await axios.get(
    ApiEndpoints.order.cart.deleteCart.replace('[CART_ID]', cartId),
  );

  const {status, message} = response.data;

  if (status) {
    return cartId;
  } else {
    throw new Error(message);
  }
};
