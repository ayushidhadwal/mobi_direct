import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export type StartPendingRequestDTO = {
  id: number;
  OTP: number;
};

export const startPendingRequest = async ({
  id,
  OTP,
}: StartPendingRequestDTO): Promise<boolean> => {
  const response = await axios.post(ApiEndpoints.agent.startPendingRequest, {
    appointment_id: id,
    start_otp: OTP,
  });

  const {status, message} = response.data;

  if (status) {
    return true;
  } else {
    throw new Error(message);
  }
};
