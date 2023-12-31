import {useEffect} from 'react';
import useSWRMutation from 'swr/mutation';

import {axios} from '../../../lib/axios';
import {ApiEndpoints} from '../../../services';
import {useMessage} from '../../useMessage';

export type HistoryItem = {
  appointmentId: number;
  serviceDate: string;
  mileage: number;
  previousServiceDate: string;
  previousMileage: number;
  noOfDays: number;
  totalMileage: number;
};

type HistorySummary = {
  averageServiceInterval: number;
  nextService: number;
};

type History = {
  summary: HistorySummary;
  list: HistoryItem[];
};

type HistoryDTO = {
  vehicleNumber: string;
  year: number;
  month: number;
};

const fetcher = async (
  url: string,
  {arg}: {arg: HistoryDTO},
): Promise<History> => {
  const result = await axios.post(url, {
    vehicle_number: arg.vehicleNumber,
    year: arg.year,
    month: arg.month,
  });

  const {status, data} = result.data;
  let response = {
    list: [],
    summary: {
      averageServiceInterval: 0,
      nextService: 0,
    },
  };

  if (status) {
    const {summary, list} = data;

    response = {
      list: list.map(
        (item: any): HistoryItem => ({
          appointmentId: item.appointmentId,
          mileage: item.mileage,
          noOfDays: item.noOfDays,
          previousMileage: item.previous_mileage,
          previousServiceDate: item.previous_service_date,
          serviceDate: item.service_date,
          totalMileage: item.totalMileage,
        }),
      ),
      summary: {
        averageServiceInterval: summary.average_service_interval,
        nextService: summary.next_service,
      },
    };
  }

  return response;
};

export const useHistory = () => {
  const {data, error, isMutating, trigger, reset} = useSWRMutation(
    ApiEndpoints.history.getHistory,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    history: data,
    isMutating,
    isError: error,
    trigger,
    reset,
  };
};
