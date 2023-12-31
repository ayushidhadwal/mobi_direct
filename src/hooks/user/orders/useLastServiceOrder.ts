import {useEffect} from 'react';
import useSWRMutation from 'swr/mutation';

import {axios} from '../../../lib/axios';
import {ApiEndpoints} from '../../../services';
import {useMessage} from '../../useMessage';

type LastServiceOrder = {
  vehicleId: string;
  vehicleNumber: string;
  engineOilName: string;
  oilFilterName: string;
  engineOilId: number;
  oilFilterId: number;
  grandTotal: number;
};

const fetcher = async (url: string): Promise<LastServiceOrder> => {
  const result = await axios.get(url);

  const response: LastServiceOrder = {
    vehicleId: '',
    vehicleNumber: '',
    engineOilName: '',
    oilFilterName: '',
    engineOilId: 0,
    oilFilterId: 0,
    grandTotal: 0,
  };

  if (result.data.status) {
    const {data} = result.data;

    response.vehicleId = String(data.vehicleId);
    response.vehicleNumber = data.vehicle_number;
    response.engineOilName = data.engine_oil_name;
    response.oilFilterName = data.oil_filter_name;
    response.engineOilId = data.engine_oil_id;
    response.oilFilterId = data.oil_filter_id;
    response.grandTotal = data.grandTotal;
  }

  return response;
};

export const useLastServiceOrder = () => {
  const {data, error, isMutating, trigger} = useSWRMutation(
    ApiEndpoints.order.service.getLastService,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    lastService: data,
    isMutating,
    isError: error,
    trigger,
  };
};
