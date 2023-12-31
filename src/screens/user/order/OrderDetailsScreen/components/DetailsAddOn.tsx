import React, {FC} from 'react';
import {Box, Divider, HStack, Text} from 'native-base';
import { useTranslation } from 'react-i18next';

import {CartSummaryAddon} from '../../../../../hooks/user/cart/useOrderSummary';

type Props = {
  addOn: CartSummaryAddon[];
};

export const DetailsAddOn: FC<Props> = ({addOn}) => {
    const {t} = useTranslation('OrderDetailsLang');

    return (
    <>
      <Text fontSize="lg" fontWeight="400">
          {t("addOn")}
      </Text>
      <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

      <Box bg="#FFF" borderRadius={5} mb={3}>
        {addOn.map(item => {
          return (
            <HStack space={2} mb={3} key={item.cartId}>
              <Box flex={3}>
                <Text
                  color="gray.400"
                  textTransform="capitalize"
                  numberOfLines={3}>
                  {item.title}
                </Text>
              </Box>
              <Box flex={1} alignItems="flex-end">
                <Text color="gray.400">x{item.cartQty}</Text>
              </Box>
              <Box flex={1} alignItems="flex-end">
                <Text>
                  {Number(
                    Number(item.cartQty) * Number(item.totalPrice),
                  ).toFixed(2)}
                </Text>
              </Box>
            </HStack>
          );
        })}
      </Box>
    </>
  );
};
