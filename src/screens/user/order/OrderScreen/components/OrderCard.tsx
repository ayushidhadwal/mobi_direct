import React, {FC} from 'react';
import {Box, HStack, Pressable, Text, VStack} from 'native-base';
import {format} from 'date-fns';
import { useTranslation } from 'react-i18next';

import {OrderStatus} from '../../../../../hooks/user/orders/useOrderDetails';

type Props = {
  onPress: () => void;
  mt?: number;
  date: string;
  vehicleNumber: string;
  engineOil: string;
  oilFilter: string;
  total: number;
  status: OrderStatus;
  orderNumber: string;
};

export const OrderCard: FC<Props> = ({
  onPress,
  total,
  date,
  engineOil,
  oilFilter,
  vehicleNumber,
  status,
  orderNumber,
}) => {
  const {t} = useTranslation('OrderLang');
  return (
    <Pressable
      onPress={onPress}
      shadow={1}
      bg="#FFF"
      mb={4}
      mx={4}
      borderRadius={8}>
      <VStack p={3} space={2}>
        <HStack
          justifyContent="space-between"
          alignItems="flex-start"
          space={3}>
          <Box flex={1}>
            <Text color={'gray.400'}>{t("orderNumber")}</Text>
          </Box>
          <Box flex={2} flexShrink={1}>
            <Text numberOfLines={1}>{orderNumber}</Text>
          </Box>
        </HStack>

        <HStack
          justifyContent="space-between"
          alignItems="flex-start"
          space={3}>
          <Box flex={1}>
            <Text color={'gray.400'}>{t("date")}</Text>
          </Box>
          <Box flex={2} flexShrink={1}>
            <Text numberOfLines={1}>
              {format(new Date(date), 'dd, MMM yyyy hh:mm aaa')}
            </Text>
          </Box>
        </HStack>

        {vehicleNumber ? (
          <HStack
            justifyContent="space-between"
            alignItems="flex-start"
            space={3}>
            <Box flex={1}>
              <Text flexShrink={1} color={'gray.400'}>
                {t("vehicleNumber")}
              </Text>
            </Box>
            <Box flex={2} flexShrink={1}>
              <Text numberOfLines={1}>{vehicleNumber}</Text>
            </Box>
          </HStack>
        ) : null}

        {engineOil ? (
          <HStack
            justifyContent="space-between"
            alignItems="flex-start"
            space={3}>
            <Box flex={1}>
              <Text color={'gray.400'}>{t("engineOil")}</Text>
            </Box>
            <Box flex={2} flexShrink={1}>
              <Text numberOfLines={3}>{engineOil}</Text>
            </Box>
          </HStack>
        ) : null}

        {oilFilter ? (
          <HStack
            justifyContent="space-between"
            alignItems="flex-start"
            space={3}>
            <Box flex={1}>
              <Text color={'gray.400'}>{t('oilFilter')}</Text>
            </Box>
            <Box flex={2} flexShrink={1}>
              <Text numberOfLines={3}>{oilFilter}</Text>
            </Box>
          </HStack>
        ) : null}

        <HStack
          justifyContent="space-between"
          alignItems="flex-start"
          space={3}>
          <Box flex={1}>
            <Text color={'gray.400'}>{t('status')}</Text>
          </Box>
          <Box flex={2} flexShrink={1}>
            <Text numberOfLines={3}>{status?.toUpperCase()}</Text>
          </Box>
        </HStack>

        <HStack
          justifyContent="space-between"
          alignItems="flex-start"
          space={3}>
          <Box flex={1}>
            <Text color={'gray.400'}>{t('total')}</Text>
          </Box>
          <Box flex={2} flexShrink={1}>
            <Text color="primary.400" numberOfLines={1}>
              {t('RM')} {Number(total).toFixed(2)}
            </Text>
          </Box>
        </HStack>
      </VStack>
    </Pressable>
  );
};
