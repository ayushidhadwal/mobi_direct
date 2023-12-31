import {useEffect} from 'react';
import useSWR from 'swr';

import {axios} from '../../../lib/axios';
import {useMessage} from '../../useMessage';
import {ApiEndpoints} from '../../../services';
import {CartSummaryAddon} from '../cart/useOrderSummary';
import {formatAddress} from '../../../utils/formatAddress';

export enum OrderStatus {
  complete = 'complete',
  assigned = 'assigned',
  pending = 'pending',
}

export type OrderDetails = {
  orderId: number;
  date: string;
  userId: number;
  orderNumber: string;
  vehicleNumber: string;
  engineOilName: string;
  engineOilPrice: number;
  oilFilterName: string;
  oilFilterPrice: number;
  subTotal: number;
  couponDiscount: number;
  grandTotal: number;
  addOn: CartSummaryAddon[];
  address: string;
  status: OrderStatus;
  remarks: string;
};

const fetcher = async (url: string): Promise<OrderDetails> => {
  const result = await axios.get(url);

  if (result.data.status) {
    const data = result.data.data;

    const addOn = JSON.parse(data.addOn);

    return {
      userId: Number(data.user_id),
      vehicleNumber: data.vehicles_number_plate,
      address: formatAddress(data.address, data.state, data.city, data.pincode),
      couponDiscount: Number(data.couponDiscount),
      engineOilName: data.engineOilName,
      engineOilPrice: Number(data.engineOilPrice),
      grandTotal: Number(data.grandTotal),
      orderId: Number(data.id),
      oilFilterName: data.oilFilterName,
      remarks: data.remarks,
      orderNumber: data.order_number,
      subTotal: Number(data.subTotal),
      oilFilterPrice: Number(data.oilFilterPrice),
      status: data.status,
      addOn: addOn?.map(
        (item: any): CartSummaryAddon => ({
          cartId: Number(item.cartId),
          cartQty: Number(item.cartQty),
          title: item.title,
          totalPrice: item.totalPrice,
        }),
      ),
      date: data.created_at,
    };
  } else {
    throw new Error(result.data.message);
  }
};

export const useOrderDetails = (orderId: number) => {
  const {data, error, isLoading, mutate, isValidating} = useSWR(
    ApiEndpoints.order.getDetails.replace('[ORDER_ID]', String(orderId)),
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    details: data,
    isLoading,
    isError: error,
    isValidating,
    mutate,
  };
};
