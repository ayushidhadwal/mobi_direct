import {useEffect} from 'react';
import useSWR from 'swr';

import {axios} from '../../../lib/axios';
import {useMessage} from '../../useMessage';
import {ApiEndpoints} from '../../../services';

export type AddOn = {
  id: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  price: string;
  isInCart: boolean;
  cartQty: number;
};

const fetcher = async (url: string): Promise<AddOn[]> => {
  const result = await axios.get(url);
  return result.data.data.map(
    (item: any): AddOn => ({
      id: item.id,
      cartQty: item.qty,
      image: item.add_on_image,
      isInCart: item.cart,
      longDesc: item.long_desc,
      price: item.addon_price,
      shortDesc: item.short_desc,
    }),
  );
};

export const useAddOn = () => {
  const {data, error, isLoading, mutate, isValidating} = useSWR(
    ApiEndpoints.order.addOn.get,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    addOn: data,
    isLoading,
    isError: error,
    isValidating,
    mutate,
  };
};
