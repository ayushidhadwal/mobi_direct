import React, {FC} from 'react';
import {Box, Divider, HStack, Text, VStack} from 'native-base';
import { useTranslation } from 'react-i18next';

import {CartSummaryAddon} from '../../../../../hooks/user/cart/useOrderSummary';

type Props = {
  items?: CartSummaryAddon[];
};

export const SummaryAddon: FC<Props> = ({items}: Props) => {
  if (items?.length === 0) {
    return null;
  }
    const {t} = useTranslation("CartOrderLang")

  return (
    <>
      <Text fontSize="lg" fontWeight="400" mt={3}>
          {t("addon")}
      </Text>
      <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

      {items?.map(item => {
        return (
          <Box key={item.cartId} shadow={1} bg="#FFF" borderRadius={5} mb={3}>
            <HStack justifyContent="space-between" alignItems="flex-start">
              <HStack p={3} pb={0} alignItems="center" flexShrink={1}>
                <Text
                  color="gray.600"
                  fontWeight="400"
                  numberOfLines={3}
                  flexShrink={1}>
                  {item.title}
                </Text>
              </HStack>
            </HStack>

            <VStack p={3} pt={1} space={2}>
              <HStack space={2} alignItems="center">
                <Box flex={2} alignItems="flex-end">
                  <Text
                    color="gray.600"
                    fontWeight="400"
                    flexShrink={1}
                    numberOfLines={2}>
                    x{item.cartQty}
                  </Text>
                </Box>
                <Box flex={1} alignItems="flex-end">
                  <Text color="primary.400" flexShrink={1} numberOfLines={2}>
                    RM {Number(item.totalPrice).toFixed(2)}
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </Box>
        );
      })}
    </>
  );
};
