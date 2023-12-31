import {useEffect} from 'react';
import useSWRMutation from 'swr/mutation';

import {ApiEndpoints} from '../../../services';
import {axios} from '../../../lib/axios';
import {useMessage} from '../../useMessage';

export interface OrderNumber {
  id: number;
  orderNumber: string;
  vehicleNumberPlate: string;
  vehicleNumberId: number;
}

const fetcher = async (
  url: string,
  {arg}: {arg: string},
): Promise<OrderNumber[]> => {
  const result = await axios.post(url, {
    vehicle_number: arg,
  });

  return result.data.data.map((item: any) => ({
    id: item.id,
    orderNumber: item.order_number,
    vehicleNumberPlate: item.vehicles_number_plate,
    vehicleNumberId: item.vehicles_number_id,
  }));
};

export const useOrderNumber = () => {
  const {
    data,
    error,
    isMutating: isLoading,
    trigger,
  } = useSWRMutation(ApiEndpoints.appointment.getOrderCode, fetcher);

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    orderNumberList: data,
    isLoading,
    isError: error,
    trigger,
  };
};
