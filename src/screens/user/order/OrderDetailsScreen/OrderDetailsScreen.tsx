import React, {FC} from 'react';
import {Box, ScrollView} from 'native-base';

import {DetailsAddOn} from './components/DetailsAddOn';
import {DetailsAddress} from './components/DetailsAddress';
import {Loader} from '../../../../components/Loader';
import {useOrderDetails} from '../../../../hooks/user/orders/useOrderDetails';
import {DetailsService} from './components/DetailsService';
import {DetailsRemark} from './components/DetailsRemark';
import {PriceSummary} from '../../cart/CartOrderDetailsScreen/components/PriceSummary';
import {OrderDetailsScreenProps} from '../../../../navigation';
import {NotFoundError} from '../../../../components/NotFoundError';

export const OrderDetailsScreen: FC<OrderDetailsScreenProps> = ({route}) => {
  const {orderId} = route.params;

  const {details, isLoading} = useOrderDetails(orderId);

  if (isLoading) {
    return <Loader />;
  }

  if (!details?.orderId) {
    return <NotFoundError />;
  }

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <Box m={4}>
        <DetailsAddress address={details?.address as string} />
        <DetailsRemark remarks={details.remarks} />
        <DetailsService
          item={{
            status: details.status,
            date: details.date,
            orderID: details.orderNumber,
            vehicleNumber: details.vehicleNumber,
            engineOilName: details.engineOilName,
            engineOilPrice: details.engineOilPrice,
            oilFilterPrice: details.oilFilterPrice,
            oilFilterName: details.oilFilterName,
          }}
        />
        {details.addOn.length > 0 && <DetailsAddOn addOn={details.addOn} />}
        <PriceSummary
          discount={details?.couponDiscount as number}
          total={details?.grandTotal as number}
          subTotal={details?.subTotal as number}
        />
      </Box>
    </ScrollView>
  );
};
