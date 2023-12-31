import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export const updateUserMobileGetOTP = async (
  mobileNumber: string,
): Promise<number> => {
  const response = await axios.post(
    ApiEndpoints.profile.updateUserMobileGetOTP,
    {
      phone: mobileNumber,
    },
  );

  const {status, message, data} = response.data;

  if (status) {
    return data.otp;
  } else {
    throw new Error(message);
  }
};
