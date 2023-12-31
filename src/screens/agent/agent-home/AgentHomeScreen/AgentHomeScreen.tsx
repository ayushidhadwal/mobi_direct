import React, {FC, useCallback, useEffect} from 'react';
import {Box, Divider, FlatList, Text} from 'native-base';
import {useTranslation} from 'react-i18next';

import {ServiceCard} from '../../../../components/agent-service/ServiceCard';
import {
  AgentPendingRequests,
  useAgentPendingRequests,
} from '../../../../hooks/agent/useAgentPendingRequests';
import {Loader} from '../../../../components/Loader';
import {AgentHomeScreenProps} from '../../../../navigation';
import {Empty} from '../../../../components/Empty';

export const AgentHomeScreen: FC<AgentHomeScreenProps> = ({navigation}) => {
  const {t} = useTranslation('AgentHomeLang');

  const {mutate, isLoading, requests, isValidating} = useAgentPendingRequests();

  const getPendingRequests = useCallback(async () => {
    await mutate();
  }, [mutate]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getPendingRequests);

    return () => {
      unsubscribe();
    };
  }, [getPendingRequests, mutate, navigation]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box flex={1}>
      <FlatList
        contentContainerStyle={{paddingVertical: 16}}
        refreshing={isValidating}
        onRefresh={getPendingRequests}
        data={requests}
        renderItem={({item}: {item: AgentPendingRequests}) => (
          <ServiceCard
            onPress={() =>
              navigation.navigate('AgentPendingDetails', {
                pendingId: item.id,
              })
            }
            item={item}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Empty />}
        ListHeaderComponent={
          <Box mx={4}>
            <Text fontSize="lg" mb={1}>
              {t('upcoming')}
            </Text>
            <Divider w={'20%'} backgroundColor={'primary.800'} mb={4} />
          </Box>
        }
        keyExtractor={item => String(item.id)}
      />
    </Box>
  );
};
