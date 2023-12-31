import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export type File = {
  name: string;
  type: string;
  uri: string;
};

export type FinishPendingRequestDTO = {
  id: number;
  OTP: number;
  mileage: number;
  remarks: string;
  files: File[];
};

export const finishPendingRequest = async ({
  id,
  OTP,
  files,
  mileage,
  remarks,
}: FinishPendingRequestDTO): Promise<boolean> => {
  const fd = new FormData();
  fd.append('appointment_id', id);
  fd.append('finish_otp', OTP);
  fd.append('mileage', mileage);
  fd.append('remarks', remarks);

  files.forEach((file, index) => {
    fd.append(`attachments[${index}]`, file);
  });

  const response = await axios.post(ApiEndpoints.agent.endPendingRequest, fd, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });

  const {status, message} = response.data;

  if (status) {
    return true;
  } else {
    throw new Error(message);
  }
};
