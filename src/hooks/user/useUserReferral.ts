import {useEffect} from 'react';
import useSWR from 'swr';

import {ApiEndpoints} from '../../services';
import {axios} from '../../lib/axios';
import {useMessage} from '../useMessage';

export type UserReferral = {
  userId: number;
  referralQR: string;
  referralId: string;
  createdAt: string;
  updatedAt: string;
};

const fetcher = async (url: string): Promise<UserReferral> => {
  const result = await axios.get(url);

  const [referral] = result.data.data;

  return {
    userId: referral.id,
    referralQR: referral.qr_code,
    referralId: referral.qr_code_value,
    createdAt: referral.created_at,
    updatedAt: referral.updated_at,
  };
};

export const useUserReferral = () => {
  const {data, error, isLoading} = useSWR(ApiEndpoints.referral.get, fetcher);

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    referral: data,
    isLoading,
    isError: error,
  };
};
