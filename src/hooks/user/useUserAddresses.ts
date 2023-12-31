import {useEffect} from 'react';
import useSWR from 'swr';

import {Address, ApiEndpoints} from '../../services';
import {axios} from '../../lib/axios';
import {useMessage} from '../useMessage';

const fetcher = async (url: string): Promise<Address[]> => {
  const {data} = await axios.get(url);
  const addresses = data.data;

  return addresses.map((item: any) => ({
    address: item.address,
    city: item.city,
    state: item.state,
    pinCode: item.pincode,
    id: item.id,
    updatedAt: item.updated_at,
    createdAt: item.created_at,
    userId: item.user_id,
  }));
};

export const useUserAddresses = () => {
  const {data, error, isLoading, mutate, isValidating} = useSWR(
    ApiEndpoints.address.get,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    addresses: data,
    isLoading,
    isError: error,
    mutate,
    isValidating,
  };
};
