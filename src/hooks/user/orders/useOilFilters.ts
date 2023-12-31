import {useEffect} from 'react';
import useSWRMutation from 'swr/mutation';

import {axios} from '../../../lib/axios';
import {ApiEndpoints} from '../../../services';
import {useMessage} from '../../useMessage';

type OilFilter = {
  id: number;
  name: string;
  price: number;
};

const fetcher = async (
  url: string,
  {arg}: {arg: number},
): Promise<OilFilter[]> => {
  const result = await axios.get(url, {
    params: {
      type: arg,
    },
  });
  return result.data.data.map(
    (item: any): OilFilter => ({
      id: Number(item.id),
      name: item.oil_filter_name,
      price: item.oil_filter_price,
    }),
  );
};

export const useOilFilters = () => {
  const {data, error, trigger, reset, isMutating} = useSWRMutation(
    ApiEndpoints.order.service.getOilFilters,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    oilFilters: data,
    isMutating,
    isError: error,
    trigger,
    reset,
  };
};
