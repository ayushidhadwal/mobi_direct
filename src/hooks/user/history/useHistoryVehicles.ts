import {useEffect} from 'react';
import useSWR from 'swr';

import {axios} from '../../../lib/axios';
import {ApiEndpoints} from '../../../services';
import {useMessage} from '../../useMessage';

const fetcher = async (url: string): Promise<string[]> => {
  const result = await axios.get(url);

  const {data} = result.data;
  return data.map((item: any): string => item.vehicle_number);
};

export const useHistoryVehicles = () => {
  const {data, error, isLoading, mutate} = useSWR(
    ApiEndpoints.history.getHistoryVehicles,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    vehicles: data,
    mutate,
    isError: error,
    isLoading,
  };
};
