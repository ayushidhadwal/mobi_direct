import {useEffect} from 'react';
import useSWR from 'swr';

import {axios} from '../../../lib/axios';
import {ApiEndpoints} from '../../../services';
import {useMessage} from '../../useMessage';
import {OrderStatus} from './useOrderDetails';

export type OrderItem = {
  id: number;
  date: string;
  vehicleNumber: string;
  engineOil: string;
  oilFilter: string;
  totalPrice: number;
  status: OrderStatus;
  orderNumber: string;
};

const fetcher = async (url: string): Promise<OrderItem[]> => {
  const result = await axios.get(url);
  return result.data.data.map(
    (item: any): OrderItem => ({
      id: Number(item.id),
      orderNumber: item.order_number,
      date: item.created_at,
      engineOil: item.engineOilName,
      oilFilter: item.oilFilterName,
      vehicleNumber: item.vehicles_number_plate,
      totalPrice: item.grandTotal,
      status: item.status,
    }),
  );
};

export const useOrders = () => {
  const {data, error, isLoading, mutate, isValidating} = useSWR(
    ApiEndpoints.order.get,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    orders: data,
    isLoading,
    isError: error,
    mutate,
    isValidating,
  };
};
