import {Box, Divider, Text, VStack} from 'native-base';
import React, {FC} from 'react';
import {format} from 'date-fns';
import {useTranslation} from 'react-i18next';

import {TableRow} from '../../../cart/CartScreen/components/TableRow';
import {OrderStatus} from '../../../../../hooks/user/orders/useOrderDetails';

type Props = {
  item: {
    date: string;
    status: OrderStatus;
    orderID: string;
    vehicleNumber: string;
    engineOilName: string;
    engineOilPrice: number;
    oilFilterName: string;
    oilFilterPrice: number;
  };
};

export const DetailsService: FC<Props> = ({item}) => {
  const {t} = useTranslation('OrderDetailsLang');
  return (
    <>
      <Text fontSize="lg" fontWeight="400">
        {t('details')}
      </Text>
      <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

      <Box borderRadius={5} mb={3}>
        <VStack space={2}>
          <TableRow
            heading={String(t('orderId'))}
            value={item?.orderID}
            noPrice={true}
          />

          <TableRow
            heading={String(t('date'))}
            value={format(new Date(item.date), 'dd, MMM yyyy hh:mm aaa')}
            noPrice={true}
          />

          <TableRow
            heading={String(t('status'))}
            value={item?.status.toUpperCase()}
            noPrice={true}
          />

          {item?.vehicleNumber ? (
            <TableRow
              heading={String(t('vehicle'))}
              value={item?.vehicleNumber}
              noPrice={true}
            />
          ) : null}

          {item?.engineOilName ? (
            <TableRow
              heading={String(t('oil'))}
              price={item?.engineOilPrice}
              value={item?.engineOilName}
            />
          ) : null}

          {item.oilFilterName ? (
            <TableRow
              heading={String(t('filter'))}
              value={item?.oilFilterName}
              price={item?.oilFilterPrice}
            />
          ) : null}
        </VStack>
      </Box>
    </>
  );
};
