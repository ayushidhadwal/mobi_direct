import {useEffect} from 'react';
import useSWR from 'swr';

import {ApiEndpoints} from '../../services';
import {axios} from '../../lib/axios';
import {useMessage} from '../useMessage';

export type BannerItem = {
  id: number;
  bannerImg: string;
  bannerLink: string;
};

const fetcher = async (url: string): Promise<BannerItem[]> => {
  const result = await axios.get(url);
  return result.data.data.banner.map(
    (item: any): BannerItem => ({
      id: Number(item.banner_id),
      bannerImg: item.banner_img,
      bannerLink: item.banner_link,
    }),
  );
};

export const useHomeBanner = () => {
  const {data, error, isLoading} = useSWR(
    ApiEndpoints.banner.getBannerList,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    bannerList: data,
    isLoading,
    isError: error,
  };
};
