import * as React from 'react';
import {FC} from 'react';
import {Box, Divider, HStack, Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';

type Props = {
  vehicleNumberPlate: string | undefined;
  engineOil: string | undefined;
  oilFilter: string | undefined;
};

export const CarDetails: FC<Props> = ({
  vehicleNumberPlate,
  engineOil,
  oilFilter,
}) => {
  const {t} = useTranslation('AppointmentSummaryLang');
  return (
    <>
      <Text color="gray.400" fontWeight="600" fontSize="md">
        {t('details')}:
      </Text>
      <Divider w={'10%'} backgroundColor={'primary.800'} mb={2} />

      <Box shadow={1} bg="#FFF" borderRadius={5} mb={3} mx={1}>
        <VStack p={3} space={2}>
          <HStack space={2}>
            <Box flex={1}>
              <Text color="gray.400" fontWeight="600" fontSize="md">
                {t('vehicleNo')}:
              </Text>
            </Box>
            <Box flex={2}>
              <Text
                color="gray.600"
                fontWeight="400"
                flexShrink={1}
                numberOfLines={3}>
                {vehicleNumberPlate}
              </Text>
            </Box>
          </HStack>
          <HStack space={2}>
            <Box flex={1}>
              <Text color="gray.400" fontWeight="600" fontSize="md">
                {t('oil')}:
              </Text>
            </Box>
            <Box flex={2}>
              <Text
                color="gray.600"
                fontWeight="400"
                flexShrink={1}
                numberOfLines={3}>
                {engineOil}
              </Text>
            </Box>
          </HStack>
          <HStack space={2}>
            <Box flex={1}>
              <Text color="gray.400" fontWeight="600" fontSize="md">
                {t('filter')}:
              </Text>
            </Box>
            <Box flex={2}>
              <Text
                color="gray.600"
                fontWeight="400"
                flexShrink={1}
                numberOfLines={3}>
                {oilFilter}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};
