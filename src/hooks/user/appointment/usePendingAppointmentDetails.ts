import {useEffect} from 'react';
import useSWR from 'swr';

import {ApiEndpoints} from '../../../services';
import {axios} from '../../../lib/axios';
import {useMessage} from '../../useMessage';
import {formatAddress} from '../../../utils/formatAddress';

export interface Addon {
  cartId: number;
  title: string;
  cartQty: number;
}

export interface PendingAppointmentDetails {
  id: number;
  orderNumber: string;
  vehicleNumber: string;
  timeStart: string;
  timeEnd: string;
  bookingDate: string;
  remarks: string;
  addOn: Addon[];
  engineOil: string;
  oilFilter: string;
  startQRCode: string;
  startOTP: string;
  endQRCode: string;
  endOTP: string;
  bookingStatus: string;
  agent: string;
  serviceStartTime: string;
  serviceEndTime: string;
  address: string;
  workshopName: string;
  workshopAddress: string;
}

const fetcher = async (url: string): Promise<PendingAppointmentDetails> => {
  const result = await axios.get(url);

  if (result.data.status) {
    const {data} = result.data;

    return {
      id: data.id,
      orderNumber: data.order_number,
      vehicleNumber: data.vehicle_number,
      timeStart: data.time_start,
      timeEnd: data.time_end,
      bookingDate: data.booking_date,
      remarks: data.remarks,
      addOn: JSON.parse(data.addOn),
      engineOil: data.engine_oil_name,
      oilFilter: data.oil_filter_name,
      startQRCode: data.start_qr_code,
      startOTP: data.start_otp,
      endQRCode: data.end_qr_code,
      endOTP: data.end_otp,
      bookingStatus: data.booking_status,
      agent: data.agentName,
      serviceEndTime: data.service_end_time,
      serviceStartTime: data.service_start_time,
      address: formatAddress(data.address, data.state, data.city, data.pincode),
      workshopName: data.workshop_name,
      workshopAddress: data.workshop_address,
    };
  } else {
    throw new Error(result.data.message);
  }
};

export const usePendingAppointmentDetails = (appointmentId: string) => {
  const {data, error, isLoading} = useSWR(
    ApiEndpoints.appointment.pendingAppointmentDetails.replace(
      '[APPOINTMENT_ID]',
      appointmentId,
    ),
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    pendingAppointmentDetails: data,
    isLoading,
    isError: error,
  };
};
