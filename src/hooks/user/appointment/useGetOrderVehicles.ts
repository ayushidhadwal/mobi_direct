import {useEffect} from 'react';
import useSWR from 'swr';

import {ApiEndpoints} from '../../../services';
import {axios} from '../../../lib/axios';
import {useMessage} from '../../useMessage';

export type GetOrderVehicles = {
  vehiclesNumberPlate: string;
};

const fetcher = async (url: string): Promise<GetOrderVehicles[]> => {
  const result = await axios.get(url);

  return result.data.data.map((item: any) => ({
    vehiclesNumberPlate: item.vehicles_number_plate,
  }));
};

export const useGetOrderVehicles = () => {
  const {data, error, isLoading} = useSWR(
    ApiEndpoints.appointment.getOrderVehicle,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    orderVehicleList: data,
    isLoading,
    isError: error,
  };
};
