import {useEffect} from 'react';
import useSWRMutation from 'swr/mutation';

import {axios} from '../../lib/axios';
import {useMessage} from '../useMessage';
import {ApiEndpoints} from '../../services';
import {AgentPendingRequests} from './useAgentPendingRequests';
import {formatAddress} from '../../utils/formatAddress';

const fetcher = async (
  url: string,
  {arg}: {arg: {year: string; month: string}},
): Promise<AgentPendingRequests[]> => {
  const {data} = await axios.post(url, {
    year: arg.year,
    month: arg.month,
  });
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

export const useAgentCompletedRequests = () => {
  const {data, error, isMutating, trigger} = useSWRMutation(
    ApiEndpoints.agent.getCompletedRequests,
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
    isMutating,
    isError: error,
    trigger,
  };
};
