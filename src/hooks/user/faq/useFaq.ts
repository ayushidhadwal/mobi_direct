import {useEffect} from 'react';
import useSWR from 'swr';

import {axios} from '../../../lib/axios';
import {ApiEndpoints} from '../../../services';
import {useMessage} from '../../useMessage';

export type FAQItem = {
  id: number;
  videoId: string;
  title: string;
  desc: string;
};

const fetcher = async (url: string): Promise<FAQItem[]> => {
  const result = await axios.get(url);
  return result.data.data.map(
    (item: any): FAQItem => ({
      id: Number(item.faq_id),
      videoId: item.faq_video,
      title: item.faq_title,
      desc: item.faq_description,
    }),
  );
};

export const useFaq = () => {
  const {data, error, isLoading} = useSWR(ApiEndpoints.faq.getFaqList, fetcher);

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    faqList: data,
    isLoading,
    isError: error,
  };
};
