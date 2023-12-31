import {useEffect} from 'react';
import useSWRMutation from 'swr/mutation';

import {ApiEndpoints} from '../../../services';
import {axios} from '../../../lib/axios';
import {useMessage} from '../../useMessage';

export type AvailableSlots = {
  bookStatus: boolean;
  id: number;
  start: string;
  end: string;
  timeSlot: string;
};

const fetcher = async (
  url: string,
  {arg}: {arg: string},
): Promise<AvailableSlots[]> => {
  const result = await axios.get(url, {
    params: {
      date: arg,
    },
  });

  return result.data.data.map((item: any) => ({
    bookStatus: item.bookStatus,
    id: Number(item.id),
    start: item.start_time,
    end: item.end_time,
    timeSlot: item.time_slots,
  }));
};

export const useAvailableSlots = () => {
  const {
    data,
    error,
    isMutating: isLoading,
    trigger,
  } = useSWRMutation(ApiEndpoints.appointment.availableSlots, fetcher);

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    availableSlots: data,
    isLoading,
    isError: error,
    trigger,
  };
};
