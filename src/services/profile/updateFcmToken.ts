import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export type UpdateFcmTokenDto = {
  token: string;
};

export const updateFcmToken = async ({
  token,
}: UpdateFcmTokenDto): Promise<boolean> => {
  await axios.post(ApiEndpoints.profile.updateFcmToken, {
    token: token,
  });

  return true;
};
