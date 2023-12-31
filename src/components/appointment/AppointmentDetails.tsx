import React, {FC} from 'react';
import {Box, Divider, HStack, Text, VStack} from 'native-base';
import {format} from 'date-fns';
import {useTranslation} from 'react-i18next';

type Props = {
  orderCode: string | undefined;
  date: string | undefined;
  appointmentTime: string | undefined;
};

export const AppointmentDetails: FC<Props> = ({
  orderCode,
  date,
  appointmentTime,
}) => {
  const {t} = useTranslation('AppointmentSummaryLang');
  return (
    <>
      <Text color="gray.400" fontWeight="600" fontSize="md">
        {t('appointmentDetails')}:
      </Text>
      <Divider w={'20%'} backgroundColor={'primary.800'} mb={2} />
      <Box shadow={1} bg="#FFF" borderRadius={5} mb={3} mx={1}>
        <VStack p={3} space={2}>
          <HStack space={2}>
            <Box flex={1}>
              <Text color="gray.400" fontWeight="600" fontSize="md">
                {t('orderNo')}:
              </Text>
            </Box>
            <Box flex={2}>
              <Text
                color="gray.600"
                fontWeight="400"
                flexShrink={1}
                numberOfLines={3}>
                {orderCode}
              </Text>
            </Box>
          </HStack>
          <HStack space={2}>
            <Box flex={1}>
              <Text color="gray.400" fontWeight="600" fontSize="md">
                {t('date')}:
              </Text>
            </Box>
            <Box flex={2}>
              <Text
                color="gray.600"
                fontWeight="400"
                flexShrink={1}
                numberOfLines={3}>
                {date ? format(new Date(date), 'dd/MM/yyyy') : '--'}
              </Text>
            </Box>
          </HStack>
          <HStack space={2}>
            <Box flex={1}>
              <Text color="gray.400" fontWeight="600" fontSize="md">
                {t('timeSlot')}:
              </Text>
            </Box>
            <Box flex={2}>
              <Text
                color="gray.600"
                fontWeight="400"
                flexShrink={1}
                numberOfLines={3}>
                {appointmentTime}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};
