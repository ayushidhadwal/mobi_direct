import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export const addOnAddToCart = async (addOnId: number): Promise<number> => {
  const response = await axios.post(ApiEndpoints.order.addOn.addToCart, {
    add_on_id: addOnId,
  });

  const {status, message} = response.data;

  if (status) {
    return addOnId;
  } else {
    throw new Error(message);
  }
};
