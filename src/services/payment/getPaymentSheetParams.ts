import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export type PaymentSheetParams = {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
  publishableKey: string;
};

export type GetPaymentSheetDTO = {
  remarks: string;
  addressId: number;
  coupon: string;
};

export const getPaymentSheetParams = async ({
  remarks,
  addressId,
  coupon,
}: GetPaymentSheetDTO): Promise<PaymentSheetParams> => {
  const response = await axios.post(
    ApiEndpoints.payment.getPaymentSheetParams,
    {
      address_id: addressId,
      coupon: coupon,
      remarks: remarks,
    },
  );

  const {paymentIntent, ephemeralKey, customer, publishableKey} = response.data;
  return {
    paymentIntent,
    ephemeralKey,
    customer,
    publishableKey,
  };
};
