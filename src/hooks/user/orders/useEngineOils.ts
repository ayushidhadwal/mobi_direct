import {useEffect} from 'react';
import useSWRMutation from 'swr/mutation';

import {axios} from '../../../lib/axios';
import {ApiEndpoints} from '../../../services';
import {useMessage} from '../../useMessage';

type EngineOil = {
  id: number;
  name: string;
  price: number;
};

const fetcher = async (
  url: string,
  {arg}: {arg: number},
): Promise<EngineOil[]> => {
  const result = await axios.get(url, {
    params: {
      type: arg,
    },
  });
  return result.data.data.map(
    (item: any): EngineOil => ({
      id: Number(item.id),
      name: item.engine_oil_name,
      price: item.engine_oil_price,
    }),
  );
};

export const useEngineOils = () => {
  const {data, error, isMutating, trigger, reset} = useSWRMutation(
    ApiEndpoints.order.service.getEngineOils,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    engineOils: data,
    isMutating,
    isError: error,
    trigger,
    reset,
  };
};
