import {useEffect} from 'react';
import useSWR from 'swr';

import {ApiEndpoints, User} from '../../services';
import {axios} from '../../lib/axios';
import {useMessage} from '../useMessage';

const fetcher = async (url: string): Promise<User> => {
  const result = await axios.get(url);

  const [user] = result.data.data;

  return {
    id: user.id,
    mobileNumber: user.phone,
    name: user.name,
    email: user.email,
    licenseDueDate: user.license_due_date,
  };
};

export const useUserProfile = () => {
  const {data, error, isLoading, mutate} = useSWR(
    ApiEndpoints.profile.get,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    profile: data,
    isLoading,
    isError: error,
    mutate,
  };
};
