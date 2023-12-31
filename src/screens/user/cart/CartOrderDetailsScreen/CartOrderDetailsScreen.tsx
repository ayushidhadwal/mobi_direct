import React, {FC, useState} from 'react';
import {Box} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useOrderSummary} from '../../../../hooks/user/cart/useOrderSummary';
import {Loader} from '../../../../components/Loader';
import {PriceSummary} from './components/PriceSummary';
import {Remark} from './components/Remark';
import {SummaryAddress} from './components/SummaryAddress';
import {SummaryCoupon} from './components/SummaryCoupon';
import {ServiceSummary} from './components/ServiceSummary';
import {SummaryAddon} from './components/SummaryAddon';
import {CartOrderDetailsScreenProps} from '../../../../navigation';
import {NotFoundError} from '../../../../components/NotFoundError';
import {StripePaymentGateway} from './components/StripePaymentGateway';

export const CartOrderDetailsScreen: FC<CartOrderDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const {coupon, addressId} = route.params;

  const [remarks, setRemarks] = useState<string>('');

  const {summary, isLoading, isValidating} = useOrderSummary(coupon, addressId);

  if (isLoading || isValidating) {
    return <Loader />;
  }

  if (!summary?.grandTotal) {
    return <NotFoundError />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Box flex={1} m={4}>
          <ServiceSummary
            item={{
              engineOilPrice: summary?.engineOilPrice as number,
              oilFilterName: summary?.oilFilterName as string,
              oilFilterPrice: summary?.oilFilterPrice as number,
              engineOilName: summary?.engineOilName as string,
              vehicleNumber: summary?.vehicleNumber as string,
            }}
          />

          <SummaryAddon items={summary?.addOn} />

          <SummaryCoupon
            discount={summary?.couponDiscount as number}
            code={coupon}
            isApplied={!!coupon}
            onPress={() =>
              navigation.replace('Cart', {
                coupon,
              })
            }
          />

          <SummaryAddress
            address={summary?.address as string}
            onPress={() =>
              navigation.replace('SelectAddress', {
                coupon,
              })
            }
          />

          <Remark handleChange={setRemarks} value={remarks} />

          <PriceSummary
            discount={summary?.couponDiscount as number}
            total={summary?.grandTotal as number}
            subTotal={summary?.subTotal as number}
          />

          <StripePaymentGateway
            addressId={addressId}
            coupon={coupon}
            remarks={remarks}
            amount={summary?.grandTotal.toFixed(2)}
          />
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
