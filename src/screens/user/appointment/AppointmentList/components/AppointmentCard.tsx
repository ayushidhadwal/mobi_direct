import React, {FC} from 'react';
import {Badge, Box, Button, HStack, Pressable, Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {format, isPast, parse} from 'date-fns';

import {UserNavigationProps} from '../../../../../navigation';

type Props = {
  vehicleNumber: string;
  orderNumber: string;
  bookingDate: string;
  timeStart: string;
  endStart: string;
  id: number;
};

export const AppointmentCard: FC<Props> = ({
  vehicleNumber,
  orderNumber,
  bookingDate,
  timeStart,
  endStart,
  id,
}) => {
  const {t} = useTranslation('AppointmentLang');

  const navigation = useNavigation<UserNavigationProps>();

  const isExpired = isPast(parse(endStart, 'HH:mm:ss', new Date(bookingDate)));

  return (
    <Pressable
      onPress={() => navigation.navigate('AppointmentDetail', {itemId: id})}
      shadow={1}
      bg="#FFF"
      mb={4}
      mx={4}
      borderRadius="lg">
      <VStack p={3} space={2}>
        <HStack
          justifyContent="space-between"
          alignItems="flex-start"
          space={3}>
          <Box flex={1}>
            <Text color={'gray.400'}>{t('vehicleNumber')}</Text>
          </Box>
          <Box flex={2} flexShrink={1}>
            <Text numberOfLines={1}>{vehicleNumber}</Text>
          </Box>
        </HStack>

        <HStack
          justifyContent="space-between"
          alignItems="flex-start"
          space={3}>
          <Box flex={1}>
            <Text flexShrink={1} color={'gray.400'}>
              {t('orderID')}
            </Text>
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
            <Text color={'gray.400'}>{t('date')}</Text>
          </Box>
          <Box flex={2} flexShrink={1}>
            <Text numberOfLines={3}>
              {format(new Date(bookingDate), 'dd/MM/yyyy')}
            </Text>
          </Box>
        </HStack>

        <HStack
          justifyContent="space-between"
          alignItems="flex-start"
          space={3}>
          <Box flex={1}>
            <Text color={'gray.400'}>{t('timeSlot')}</Text>
          </Box>
          <Box flex={2} flexShrink={1}>
            <Text numberOfLines={3}>{timeStart + '-' + endStart}</Text>
          </Box>
        </HStack>

        {isExpired ? (
          <HStack justifyContent="space-between">
            <Badge colorScheme="danger">Expired</Badge>

            <Button
              onPress={() =>
                navigation.navigate('Reschedule', {orderNumber: orderNumber})
              }
              alignSelf="flex-end"
              size="xs">
              Reschedule
            </Button>
          </HStack>
        ) : null}
      </VStack>
    </Pressable>
  );
};
