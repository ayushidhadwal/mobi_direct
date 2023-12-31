import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export type AppointmentForReview = {
  id: number;
  agentId: number;
  orderNumber: string;
};

export const getAppointmentForReview = async (): Promise<
  AppointmentForReview | undefined
> => {
  const response = await axios.get(
    ApiEndpoints.appointment.getAppointmentForReview,
  );

  const {status, data} = response.data;

  if (status && data?.id) {
    return {
      id: data.id,
      orderNumber: data.order_number,
      agentId: data.agent_id,
    };
  }
};
