import {useEffect} from 'react';
import useSWR from 'swr';

import {axios} from '../../../lib/axios';
import {ApiEndpoints} from '../../../services';
import {useMessage} from '../../useMessage';

export interface contactItem {
  contactId: number;
  supportNumber: string;
  whatsappNumber: string;
  supportEmail: string;
}

const fetcher = async (url: string): Promise<contactItem> => {
  const result = await axios.get(url);

  const {data} = result.data;

  return {
    contactId: Number(data.contact_id),
    supportNumber: data.support_number,
    whatsappNumber: data.whatsapp_number,
    supportEmail: data.support_email,
  };
};

export const useContact = () => {
  const {data, error, isLoading} = useSWR(
    ApiEndpoints.contact.getContact,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    contactDetails: data,
    isLoading,
    isError: error,
  };
};
