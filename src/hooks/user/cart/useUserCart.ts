import {useEffect} from 'react';
import useSWR from 'swr';

import {axios} from '../../../lib/axios';
import {useMessage} from '../../useMessage';
import {ApiEndpoints} from '../../../services';

export enum CartItemType {
  service = 'service',
  addon = 'addon',
}

export type CartItem = {
  id: number;
  userId: number;
  addOnId?: number;
  addOnName?: string;
  qty: number;
  engineOilName?: string;
  engineOilPrice?: number;
  oilFilterName?: string;
  oilFilterPrice?: number;
  totalPrice: number;
  productType: CartItemType;
  vehicleName?: string;
};

const fetcher = async (url: string): Promise<CartItem[]> => {
  const result = await axios.get(url);
  return result.data.data.map(
    (item: any): CartItem => ({
      id: item.id,
      userId: item.user_id,
      addOnId: item.add_on_id,
      addOnName: item.addOnName,
      qty: item.qty,
      engineOilName: item.engineOilName,
      engineOilPrice: item.engineOilPrice,
      oilFilterName: item.oilFilterName,
      oilFilterPrice: item.oilFilterPrice,
      totalPrice: Number(item.total_price),
      productType: item.product_type,
      vehicleName: item.vehicleName,
    }),
  );
};

export const useUserCart = () => {
  const {data, error, isLoading, mutate, isValidating} = useSWR(
    ApiEndpoints.order.cart.get,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    userCart: data,
    isLoading,
    isError: error,
    isValidating,
    mutate,
  };
};
