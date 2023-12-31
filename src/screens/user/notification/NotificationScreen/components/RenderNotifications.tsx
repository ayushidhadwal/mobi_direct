import React from 'react';
import {Notification} from '../../../../../hooks/user/useUserNotification';
import {NotificationItem} from './NotificationItem';

export const RenderNotifications = ({item}: {item: Notification}) => {
  return (
    <NotificationItem
      heading={item.heading}
      message={item.message}
      status={item.status}
      createdAt={item.createdAt}
    />
  );
};
