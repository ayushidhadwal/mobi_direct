import React from 'react';

import {Coupon} from '../../../../../hooks/user/useUserCoupons';
import {ApplyCouponItem} from '../../../cart/ApplyCouponsScreen/components/ApplyCouponItem';

export const RenderCoupons = ({item}: {item: Coupon}) => {
  return (
    <ApplyCouponItem
      code={item.name}
      amount={Number(item.amount)}
      apply={() => {}}
      isApply={false}
      type={item.type}
      title={item.title}
    />
  );
};
