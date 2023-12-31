import {useEffect} from 'react';
import useSWR from 'swr';

import {axios} from '../../../lib/axios';
import {ApiEndpoints} from '../../../services';
import {useMessage} from '../../useMessage';

export type UpcomingService = {
  vehicleId: string;
  vehicleNumber: string;
  dueDate: string;
};

const fetcher = async (url: string): Promise<UpcomingService[]> => {
  const result = await axios.get(url);

  const {data} = result.data;
  return data.map(
    (item: any): UpcomingService => ({
      vehicleId: item.vehicle_id,
      dueDate: item.dueDate,
      vehicleNumber: item.vehicle_number,
    }),
  );
};

export const useUpcomingService = () => {
  const {data, error, isLoading, mutate} = useSWR(
    ApiEndpoints.order.service.getUpcomingService,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    upcomingService: data,
    isLoading,
    isError: error,
    mutate,
  };
};
