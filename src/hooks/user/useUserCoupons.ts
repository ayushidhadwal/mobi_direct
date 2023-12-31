import {useEffect} from 'react';
import useSWR from 'swr';

import {ApiEndpoints} from '../../services';
import {axios} from '../../lib/axios';
import {useMessage} from '../useMessage';

export enum CouponType {
  percentage = 'percentage',
  numeric = 'numeric',
}

export type Coupon = {
  id: number;
  userId: number;
  name: string;
  title: string;
  type: CouponType;
  amount: string;
  createdAt: string;
  updatedAt: string;
};

const fetcher = async (url: string): Promise<Coupon[]> => {
  const {data} = await axios.get(url);
  const coupons = data.data;

  return coupons.map(
    (item: any): Coupon => ({
      id: Number(item.id),
      userId: item.user_id,
      name: item.name,
      title: item.title,
      type: item.coupons_type,
      amount: item.amount,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }),
  );
};

export const useUserCoupons = () => {
  const {data, error, isLoading, mutate, isValidating} = useSWR(
    ApiEndpoints.discountCoupons.get,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    coupons: data,
    isLoading,
    isError: error,
    mutate,
    isValidating,
  };
};
