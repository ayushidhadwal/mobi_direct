import {useEffect} from 'react';
import useSWR from 'swr';

import {ApiEndpoints} from '../../services';
import {axios} from '../../lib/axios';
import {useMessage} from '../useMessage';

type EngineOilType = {
  id: number;
  name: string;
};

const fetcher = async (url: string): Promise<EngineOilType[]> => {
  const result = await axios.get(url);
  return result.data.data.map((item: any) => ({
    id: Number(item.id),
    name: item.engine_oil_name,
  }));
};

export const useEngineOilTypes = () => {
  const {data, error, isLoading} = useSWR(
    ApiEndpoints.engineOilTypes.get,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    engineOilTypes: data,
    isLoading,
    isError: error,
  };
};
