import {useEffect} from 'react';
import useSWR from 'swr';

import {axios} from '../../lib/axios';
import {useMessage} from '../useMessage';
import {ApiEndpoints} from '../../services';
import {formatAddress} from '../../utils/formatAddress';

export type AgentPendingRequests = {
  id: number;
  vehicleNumber: string;
  orderNumber: string;
  bookingDate: string;
  slotTimeStart: string;
  slotTimeEnd: string;
  address: string;
};

const fetcher = async (url: string): Promise<AgentPendingRequests[]> => {
  const {data} = await axios.get(url);
  const requests = data.data;

  return requests.map(
    (item: any): AgentPendingRequests => ({
      id: item.id,
      vehicleNumber: item.vehicle_number,
      orderNumber: item.order_number,
      bookingDate: item.booking_date,
      slotTimeStart: item.time_start,
      slotTimeEnd: item.time_end,
      address: item.workshopName
        ? `${item.workshopName}, ${item.workshopAddress}`
        : formatAddress(item.address, item.state, item.city, item.pincode),
    }),
  );
};

export const useAgentPendingRequests = () => {
  const {data, error, isLoading, mutate, isValidating} = useSWR(
    ApiEndpoints.agent.getPendingRequests,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    requests: data,
    isLoading,
    isError: error,
    mutate,
    isValidating,
  };
};
