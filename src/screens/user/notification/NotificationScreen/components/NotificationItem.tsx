import React, {FC} from 'react';
import {VStack, Text} from 'native-base';
import {format} from 'date-fns';

import {NotificationStatus} from '../../../../../hooks/user/useUserNotification';

type Props = {
  heading: string;
  message: string;
  status: NotificationStatus;
  createdAt: string;
};

export const NotificationItem: FC<Props> = ({
  heading,
  message,
  status,
  createdAt,
}) => {
  return (
    <VStack
      borderRadius={5}
      shadow={1}
      mx={3}
      mb={3}
      bg={status === NotificationStatus.unread ? '#dedede' : '#fff'}
      p={2}>
      <Text fontSize="md">{heading}</Text>
      <Text mb={2} color="muted.600">
        {message}
      </Text>
      <Text fontSize="xs" alignSelf="flex-end" color="muted.400">
        {format(new Date(createdAt), 'dd, MMM yyyy hh:mm aaa')}
      </Text>
    </VStack>
  );
};
