import React, {FC} from 'react';
import {Box, Divider, HStack, Text} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTranslation} from 'react-i18next';

type Props = {
  address: string;
  onPress: () => void;
};

export const SummaryAddress: FC<Props> = ({address, onPress}) => {
  const {t} = useTranslation('CartOrderLang');
  return (
    <Box mb={3}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="lg" fontWeight="400">
          {t('location')}
        </Text>
        <Text
          onPress={onPress}
          fontSize="sm"
          fontWeight="400"
          underline
          color="primary.800">
          {t('changeLocation')}
        </Text>
      </HStack>
      <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

      <HStack alignItems="flex-start">
        <Box
          p={1}
          borderRadius={5}
          alignItems={'center'}
          backgroundColor={'primary.50'}>
          <Entypo name="location-pin" size={24} color="red.500" />
        </Box>

        <Text mx={2} flexShrink={1} color={'gray.400'}>
          {address}
        </Text>
      </HStack>
    </Box>
  );
};
