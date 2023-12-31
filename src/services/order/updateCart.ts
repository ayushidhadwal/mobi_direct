import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export enum UpdateCartAction {
  minus = 'minus',
  add = 'plus',
}

export interface UpdateCartDTO {
  itemId: number;
  action: UpdateCartAction;
}

export const updateCart = async ({
  action,
  itemId,
}: UpdateCartDTO): Promise<number> => {
  const response = await axios.post(ApiEndpoints.order.cart.updateCart, {
    add_on_id: itemId,
    qty_type: action,
  });

  const {status, message} = response.data;

  if (status) {
    return itemId;
  } else {
    throw new Error(message);
  }
};
