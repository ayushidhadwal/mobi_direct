import {format} from 'date-fns';

import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {CreateAppointmentDTO} from '../types';

export const createAppointment = async ({
  appointmentTimeId,
  orderCode,
  vehicleCode,
  date,
  WorkShopId,
  addressId,
}: CreateAppointmentDTO): Promise<any> => {
  const response = await axios.post(
    ApiEndpoints.appointment.createAppointment,
    {
      vehicle_number: vehicleCode,
      order_number: orderCode,
      appointment_time_id: appointmentTimeId,
      appointment_date: format(new Date(date), 'dd-MM-yyyy'),
      workshop_id: WorkShopId,
      address_id: addressId,
    },
  );

  const {status, message} = response.data;

  if (status) {
    return true;
  } else {
    throw new Error(message);
  }
};
