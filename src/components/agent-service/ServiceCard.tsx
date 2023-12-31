import React, {FC} from 'react';
import {Pressable, Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';

import {AgentPendingRequests} from '../../hooks/agent/useAgentPendingRequests';
import {CardTextRow} from '../common/CardTextRow';

type Props = {
  onPress: () => void;
  item: AgentPendingRequests;
};

export const ServiceCard: FC<Props> = ({onPress, item}) => {
  const {t} = useTranslation('AgentHomeLang');
  return (
    <Pressable onPress={onPress} mx={4}>
      <VStack space={1} shadow={1} borderRadius="lg" bg="#FFF" mb={3} p={4}>
        <CardTextRow
          heading={t('orderId')}
          value={
            <Text fontWeight="bold" color="primary.400">
              {item?.orderNumber}
            </Text>
          }
        />
        <CardTextRow heading={t('date')} value={item?.bookingDate} />
        <CardTextRow
          heading={t('slotTime')}
          value={`${item?.slotTimeStart} - ${item?.slotTimeEnd}`}
        />
        <CardTextRow heading={t('vehicleNumber')} value={item?.vehicleNumber} />
        <CardTextRow heading={t('location')} value={item?.address} />
      </VStack>
    </Pressable>
  );
};
