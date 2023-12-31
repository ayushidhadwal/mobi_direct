import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export type AppliedCoupon = {
  couponDiscount: number;
  finalAmount: number;
  coupon: string;
};

export const applyCoupon = async (coupon: string): Promise<AppliedCoupon> => {
  const response = await axios.post(ApiEndpoints.discountCoupons.apply, {
    coupons_name: coupon,
  });

  const {status, message, data} = response.data;

  if (status) {
    return {
      coupon: coupon,
      couponDiscount: Number(data.couponDiscount),
      finalAmount: Number(data.finalAmount),
    };
  } else {
    throw new Error(message);
  }
};
