import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, StyleSheet} from 'react-native';

import {useUserNotifications} from '../../../../hooks/user/useUserNotification';
import {Loader} from '../../../../components/Loader';
import {RenderNotifications} from './components/RenderNotifications';
import {NotificationsScreenProps} from '../../../../navigation';
import {Empty} from '../../../../components/Empty';
import {EmptyNotification} from './components/EmptyNotification';

const NotificationScreen: FC<NotificationsScreenProps> = ({}) => {
  const {notifications, isLoading, mutate, isValidating} =
    useUserNotifications();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <FlatList
        onRefresh={() => mutate()}
        refreshing={isValidating}
        data={notifications}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={RenderNotifications}
        ListEmptyComponent={<EmptyNotification />}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    marginVertical: 16,
  },
});

export default NotificationScreen;
