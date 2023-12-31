import {useEffect} from 'react';
import useSWR from 'swr';

import {ApiEndpoints} from '../../../services';
import {axios} from '../../../lib/axios';
import {useMessage} from '../../useMessage';

export interface WorkShop {
  workShopId: number;
  name: string;
  address: string;
}

const fetcher = async (url: string): Promise<WorkShop[]> => {
  const result = await axios.get(url);

  return result.data.data.map((item: any) => ({
    workShopId: item.id,
    name: item.name,
    address: item.address,
  }));
};

export const useWorkShopList = () => {
  const {data, error, isLoading} = useSWR(
    ApiEndpoints.appointment.getWorkShopList,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    workShopList: data,
    isLoading,
    isError: error,
  };
};
