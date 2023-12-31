import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native';

import {RenderNotifications} from '../../user/notification/NotificationScreen/components/RenderNotifications';
import {Loader} from '../../../components/Loader';
import {useAgentNotifications} from '../../../hooks/agent/useAgentNotifications';
import {AgentNotificationsScreenProps} from '../../../navigation';
import {EmptyNotification} from '../../user/notification/NotificationScreen/components/EmptyNotification';

const AgentNotificationScreen: FC<AgentNotificationsScreenProps> = ({}) => {
  const {notifications, isLoading, mutate, isValidating} =
    useAgentNotifications();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <FlatList
        onRefresh={() => mutate()}
        refreshing={isValidating}
        contentContainerStyle={{marginVertical: 10}}
        data={notifications}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={RenderNotifications}
        ListEmptyComponent={<EmptyNotification />}
      />
    </SafeAreaView>
  );
};
export default AgentNotificationScreen;
