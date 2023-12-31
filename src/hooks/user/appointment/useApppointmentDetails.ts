import {useEffect} from 'react';
import useSWR from 'swr';

import {ApiEndpoints} from '../../../services';
import {axios} from '../../../lib/axios';
import {useMessage} from '../../useMessage';
import {formatAddress} from '../../../utils/formatAddress';

export interface Addon {
  cartId: number;
  title: string;
  ModelYear: string;
  Color: string;
  cartQty: number;
}

export interface AppointmentDetails {
  id: number;
  orderNumber: string;
  remarks: string;
  vehicleNumberPlate: string;
  addOn: Addon[];
  engineOil: string;
  oilFilter: string;
  address: string;
  workshopName: string;
  workshopAddress: string;
}

const fetcher = async (
  url: string,
  vehicleCode: string,
  orderCode: string,
): Promise<AppointmentDetails> => {
  const result = await axios.post(url, {
    vehicle_number: vehicleCode,
    order_no: orderCode,
  });

  const {data} = result.data;

  return {
    id: data.id,
    orderNumber: data.order_number,
    remarks: data.remarks,
    vehicleNumberPlate: data.vehicles_number_plate,
    engineOil: data.engineOil,
    oilFilter: data.oilFIlter,
    addOn: JSON.parse(data.addOn),
    address: formatAddress(data.address, data.state, data.city, data.pincode),
    workshopName: data.workshop_name,
    workshopAddress: data.workshop_address,
  };
};

export const useAppointmentDetails = (
  vehicleCode?: string,
  orderCode?: string,
) => {
  const {data, error, isLoading} = useSWR(
    vehicleCode && orderCode
      ? ApiEndpoints.appointment.appointmentDetails
      : null,
    (url: string) => fetcher(url, vehicleCode as string, orderCode as string),
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    appointmentDetails: data,
    isLoading,
    isError: error,
  };
};
