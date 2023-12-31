import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

type UserReviewDTO = {
  agentId: number;
  appointmentId: number;
  orderNumber: string;
  comment: string;
  rating: number;
};

export const postUserReview = async ({
  agentId,
  comment,
  appointmentId,
  rating,
  orderNumber,
}: UserReviewDTO): Promise<any> => {
  const response = await axios.post(ApiEndpoints.history.addReview, {
    agent_id: agentId,
    appointment_id: appointmentId,
    order_number: orderNumber,
    rating: rating,
    comment: comment,
  });

  const {status, message} = response.data;

  if (status) {
    return {
      rating: rating,
      comment: comment,
    };
  } else {
    throw new Error(message);
  }
};
