import React, {FC} from 'react';
import {HStack, Pressable, Text} from 'native-base';

import i18n from '../../i18n';
import {HistoryItem} from '../../hooks/user/history/useHistory';

type Props = {
  item: HistoryItem;
  onPress: () => void;
};

export const ServiceCard: FC<Props> = ({item, onPress}) => {
  const {
    serviceDate,
    previousServiceDate,
    previousMileage,
    mileage,
    totalMileage,
    noOfDays,
  } = item;

  return (
    <Pressable
      onPress={onPress}
      p={3}
      borderRadius={5}
      mb={5}
      mx={4}
      backgroundColor={'white'}
      shadow={2}>
      <HStack justifyContent={'space-between'} mb={1}>
        <Text color={'grey'} fontSize={'md'}>
          {i18n.t('ServiceLang:service')}
        </Text>
        <Text fontSize={'md'}>{serviceDate}</Text>
      </HStack>

      <HStack justifyContent={'space-between'} mb={1}>
        <Text color={'grey'} fontSize={'md'}>
          {i18n.t('ServiceLang:mileage')}
        </Text>
        <Text fontSize={'md'}>{mileage}</Text>
      </HStack>

      <HStack justifyContent={'space-between'} mb={1}>
        <Text color={'grey'} fontSize={'md'}>
          {i18n.t('ServiceLang:previous')}
        </Text>
        <Text fontSize={'md'}>{previousServiceDate}</Text>
      </HStack>

      <HStack justifyContent={'space-between'} mb={1}>
        <Text color={'grey'} fontSize={'md'}>
          {i18n.t('ServiceLang:previousService')}
        </Text>
        <Text fontSize={'md'}>{previousMileage}</Text>
      </HStack>

      <HStack justifyContent={'space-between'} mb={1}>
        <Text color={'grey'} fontSize={'md'}>
          {i18n.t('ServiceLang:no')}
        </Text>
        <Text fontSize={'md'}> {noOfDays}</Text>
      </HStack>

      <HStack justifyContent={'space-between'} mb={1}>
        <Text color={'grey'} fontSize={'md'}>
          {i18n.t('ServiceLang:total')}
        </Text>
        <Text fontSize={'md'}>{totalMileage}</Text>
      </HStack>
    </Pressable>
  );
};
