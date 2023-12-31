import {useEffect} from 'react';
import useSWR from 'swr';

import {ApiEndpoints} from '../../services';
import {axios} from '../../lib/axios';
import {useMessage} from '../useMessage';

export enum UserTransactionStatus {
  failed = 'Failed',
  success = 'Success',
}

export type UserTransaction = {
  id: number;
  txnId: number;
  status: UserTransactionStatus;
  date: string;
  amount: number;
  orderId: number;
};

const fetcher = async (url: string): Promise<UserTransaction[]> => {
  const {data} = await axios.get(url);
  const notifications = data.data;

  return notifications.map(
    (item: any): UserTransaction => ({
      id: Number(item.id),
      txnId: item.txn_id,
      status:
        item.txn_status === 1
          ? UserTransactionStatus.success
          : UserTransactionStatus.failed,
      date: item.created_at,
      amount: item.amount,
      orderId: item.order_id,
    }),
  );
};

export const useUserTransactions = () => {
  const {data, error, isLoading, mutate, isValidating} = useSWR(
    ApiEndpoints.paymentGateway.getTransactions,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    transactions: data,
    isLoading,
    isError: error,
    mutate,
    isValidating,
  };
};
