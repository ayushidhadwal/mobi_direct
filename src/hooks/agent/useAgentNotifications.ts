import {useEffect} from 'react';
import useSWR from 'swr';

import {ApiEndpoints} from '../../services';
import {axios} from '../../lib/axios';
import {useMessage} from '../useMessage';
import {Notification} from '../user/useUserNotification';

const fetcher = async (url: string): Promise<Notification[]> => {
  const {data} = await axios.get(url);
  const notifications = data.data;

  return notifications.map(
    (item: any): Notification => ({
      id: Number(item.id),
      heading: item.heading,
      message: item.message,
      status: item.status,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }),
  );
};

export const useAgentNotifications = () => {
  const {data, error, isLoading, mutate, isValidating} = useSWR(
    ApiEndpoints.agent.getNotifications,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    notifications: data,
    isLoading,
    isError: error,
    mutate,
    isValidating,
  };
};
