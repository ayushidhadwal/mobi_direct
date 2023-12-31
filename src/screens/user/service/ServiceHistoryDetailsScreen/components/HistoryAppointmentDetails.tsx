import {Box, Divider, HStack, Text, VStack} from 'native-base';
import React, {FC} from 'react';
import {format} from 'date-fns';

import {OrderStatus} from '../../../../../hooks/user/orders/useOrderDetails';
import {useTranslation} from 'react-i18next';

type Props = {
  item: {
    date: string;
    status: OrderStatus;
    timeSlot: string;
    serviceStartTime: string;
    serviceEndTime: string;
    agent: string;
  };
};

const Row: FC<any> = ({heading, value}) => {
  return (
    <HStack space={2}>
      <Box flex={1}>
        <Text color="gray.400" fontWeight="600" fontSize="md">
          {heading}:{' '}
        </Text>
      </Box>
      <Box flex={1}>
        <Text
          color="gray.600"
          fontWeight="400"
          flexShrink={1}
          numberOfLines={3}>
          {value}
        </Text>
      </Box>
    </HStack>
  );
};

export const HistoryAppointmentDetails: FC<Props> = ({item}) => {
  const {t} = useTranslation('OrderDetailsLang');
  return (
    <>
      <Text fontSize="lg" fontWeight="400">
        {t('appointmentDetails')}
      </Text>
      <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

      <Box
        borderWidth={0.4}
        borderColor="gray.400"
        bg="#FFF"
        borderRadius={5}
        mb={3}>
        <VStack p={3} space={2}>
          <Row
            heading={String(t('date'))}
            value={format(new Date(item.date), 'dd, MMM yyyy')}
          />

          <Row heading={String(t('timeSlot'))} value={item.timeSlot} />

          <Row
            heading={String(t('status'))}
            value={item?.status.toUpperCase()}
          />

          <Row heading={String(t('agent'))} value={item?.agent} />
          <Row
            heading={String(t('serviceStart'))}
            value={item.serviceStartTime}
          />
          <Row heading={String(t('serviceEnd'))} value={item.serviceEndTime} />
        </VStack>
      </Box>
    </>
  );
};
