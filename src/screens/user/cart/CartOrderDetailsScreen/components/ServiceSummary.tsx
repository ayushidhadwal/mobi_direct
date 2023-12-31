import React, {FC} from 'react';
import {Box, Divider, HStack, Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';

import {TableRow} from '../../CartScreen/components/TableRow';

type Props = {
  item: {
    vehicleNumber: string;
    engineOilName: string;
    engineOilPrice: number;
    oilFilterName: string;
    oilFilterPrice: number;
  };
};

export const ServiceSummary: FC<Props> = ({item}) => {
  const {t} = useTranslation('CartOrderLang');

  if (!item.vehicleNumber) {
    return null;
  }

  return (
    <>
      <Text fontSize="lg" fontWeight="400">
        {t('carServiceDetails')}
      </Text>
      <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

      <Box shadow={1} bg="#FFF" borderRadius={5} mb={3}>
        <HStack justifyContent="space-between">
          <HStack p={3} alignItems="center" flexShrink={1}>
            <Text color="gray.400" fontWeight="600" fontSize="md">
              {t('vehicleNo')}{' '}
            </Text>
            <Text
              color="gray.600"
              fontWeight="400"
              numberOfLines={1}
              flexShrink={1}>
              {item?.vehicleNumber}
            </Text>
          </HStack>
        </HStack>

        <VStack p={3} space={2}>
          <TableRow
            heading={String(t('oil'))}
            price={item?.engineOilPrice}
            value={item?.engineOilName}
          />

          <TableRow
            heading={String(t('filter'))}
            value={item?.oilFilterName}
            price={item?.oilFilterPrice}
          />
        </VStack>
      </Box>
    </>
  );
};
