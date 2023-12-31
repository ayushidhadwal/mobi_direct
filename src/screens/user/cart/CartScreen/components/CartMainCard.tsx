import React, {FC} from 'react';
import {
  Box,
  Divider,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import {TableRow} from './TableRow';
import {
  CartItem,
  CartItemType,
} from '../../../../../hooks/user/cart/useUserCart';

type Props = {
  item: CartItem | null;
  onDelete: (cartId: string, type?: CartItemType) => void;
};

export const CartMainCard: FC<Props> = ({item, onDelete}) => {
  const {t} = useTranslation('CartLang');

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
              {item?.vehicleName}
            </Text>
          </HStack>
          <IconButton
            onPress={() => onDelete(String(item?.id), item?.productType)}
            variant="solid"
            alignSelf="flex-start"
            colorScheme="danger"
            size="xs"
            icon={
              <Icon size="sm" as={<Ionicons name="trash" />} color="white" />
            }
          />
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
          <Divider w={'10%'} backgroundColor={'primary.800'} />

          <TableRow heading={String(t('total'))} price={item?.totalPrice} />
        </VStack>
      </Box>
    </>
  );
};
