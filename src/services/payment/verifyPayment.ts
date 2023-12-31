import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export type VerifyPaymentDTO = {
  remarks: string;
  addressId: number;
  coupon: string;
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
  amount: string;
};

export const verifyPayment = async ({
  remarks,
  addressId,
  coupon,
  paymentIntent,
  ephemeralKey,
  customer,
  amount,
}: VerifyPaymentDTO): Promise<string> => {
  const response = await axios.post(ApiEndpoints.payment.verifyPayment, {
    address_id: addressId,
    coupon: coupon,
    remarks: remarks,
    paymentIntent,
    ephemeralKey,
    customer,
    amount,
  });

  const {status, message} = response.data;

  if (status) {
    return response.data?.data?.order_number;
  } else {
    throw new Error(message);
  }
};
