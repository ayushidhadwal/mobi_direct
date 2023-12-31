import {useEffect} from 'react';
import useSWR from 'swr';

import {ApiEndpoints} from '../../../services';
import {axios} from '../../../lib/axios';
import {useMessage} from '../../useMessage';

export type AppointmentList = {
  id: number;
  vehicleNumber: string;
  orderNumber: string;
  bookingDate: string;
  timeStart: string;
  endStart: string;
  workshopName: string;
  workshopAddress: string;
};

const fetcher = async (url: string): Promise<AppointmentList[]> => {
  const result = await axios.get(url);

  return result.data.data.map((item: any) => ({
    id: Number(item.id),
    vehicleNumber: item.vehicle_number,
    orderNumber: item.order_number,
    bookingDate: item.booking_date,
    timeStart: item.time_start,
    endStart: item.time_end,
    workshopName: item.workshop_name,
    workshopAddress: item.workshop_address,
  }));
};

export const useAppointmentList = () => {
  const {data, error, isLoading, mutate, isValidating} = useSWR(
    ApiEndpoints.appointment.appointmentList,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    appointmentList: data,
    isLoading,
    isError: error,
    mutate,
    isValidating,
  };
};
