import {format} from 'date-fns';

import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export type RescheduleAppointmentDTO = {
  appointmentTimeId: number;
  orderCode: string;
  date: string;
};

export const rescheduleAppointment = async ({
  appointmentTimeId,
  orderCode,
  date,
}: RescheduleAppointmentDTO): Promise<any> => {
  const response = await axios.post(
    ApiEndpoints.appointment.rescheduleAppointment,
    {
      order_number: orderCode,
      appointment_time_id: appointmentTimeId,
      appointment_date: format(new Date(date), 'dd-MM-yyyy'),
    },
  );

  const {status, message} = response.data;

  if (status) {
    return true;
  } else {
    throw new Error(message);
  }
};
