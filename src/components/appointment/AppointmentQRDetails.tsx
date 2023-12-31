import * as React from 'react';
import {FC} from 'react';
import {Box, HStack, Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';

type Props = {
  bookingStatus: string;
  otp?: string | null;
  agent?: string;
};

export const AppointmentQRDetails: FC<Props> = ({
  bookingStatus,
  otp,
  agent,
}) => {
  const {t} = useTranslation('AppointmentSummaryLang');
  return (
    <Box shadow={1} bg="#FFF" borderRadius={5} mb={3} mx={1} mt={3}>
      <VStack p={3} space={2}>
        {otp ? (
          <HStack space={2}>
            <Box flex={1}>
              <Text color="gray.400" fontWeight="600" fontSize="md">
                {t('yourOTP')}:
              </Text>
            </Box>
            <Box flex={2}>
              <Text
                color="gray.600"
                fontWeight="400"
                flexShrink={1}
                numberOfLines={3}>
                {otp}
              </Text>
            </Box>
          </HStack>
        ) : null}
        <HStack space={2}>
          <Box flex={1}>
            <Text color="gray.400" fontWeight="600" fontSize="md">
              {t('status')}:
            </Text>
          </Box>
          <Box flex={2}>
            <Text
              color="gray.600"
              fontWeight="400"
              flexShrink={1}
              textTransform={'capitalize'}
              numberOfLines={3}>
              {bookingStatus}
            </Text>
          </Box>
        </HStack>

        {agent ? (
          <HStack space={2}>
            <Box flex={1}>
              <Text color="gray.400" fontWeight="600" fontSize="md">
                {t('agent')}:
              </Text>
            </Box>
            <Box flex={2}>
              <Text
                color="gray.600"
                fontWeight="400"
                flexShrink={1}
                textTransform={'capitalize'}
                numberOfLines={3}>
                {agent}
              </Text>
            </Box>
          </HStack>
        ) : null}
      </VStack>
    </Box>
  );
};
