import {useEffect} from 'react';
import useSWR from 'swr';

import {axios} from '../../../lib/axios';
import {useMessage} from '../../useMessage';
import {ApiEndpoints} from '../../../services';
import {formatAddress} from '../../../utils/formatAddress';

export type CartSummaryAddon = {
  cartId: number;
  title: string;
  cartQty: number;
  totalPrice: string;
};

export type CartSummary = {
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
};

const fetcher = async (
  url: string,
  couponCode: string,
  addressId: number,
): Promise<CartSummary> => {
  const result = await axios.get(url, {
    params: {
      couponCode,
      addressId,
    },
  });

  if (result.data.status) {
    const data = result.data.data.orderSummary;

    return {
      vehicleNumber: data.vehicleNumber,
      engineOilName: data.engineOilName,
      engineOilPrice: data.engineOilPrice,
      oilFilterName: data.oilFilterName,
      oilFilterPrice: data.oilFilterPrice,
      subTotal: data.subTotal,
      couponDiscount: data.couponDiscount,
      grandTotal: data.grandTotal,
      addOn: data.addOn.map(
        (a: any): CartSummaryAddon => ({
          cartId: a.cartId,
          cartQty: a.cartQty,
          title: a.title,
          totalPrice: a.totalPrice,
        }),
      ),
      address: formatAddress(
        data.address.address,
        data.address.state,
        data.address.city,
        data.address.pincode,
      ),
    };
  } else {
    throw new Error(result.data.message);
  }
};

export const useOrderSummary = (couponCode: string, addressId: number) => {
  const {data, error, isLoading, mutate, isValidating} = useSWR(
    ApiEndpoints.order.cart.getSummary,
    (url: string) => fetcher(url, couponCode, addressId),
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    summary: data,
    isLoading,
    isError: error,
    isValidating,
    mutate,
  };
};
