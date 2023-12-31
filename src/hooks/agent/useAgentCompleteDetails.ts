import {useEffect} from 'react';
import useSWR from 'swr';

import {axios} from '../../lib/axios';
import {useMessage} from '../useMessage';
import {ApiEndpoints} from '../../services';
import {formatAddress} from '../../utils/formatAddress';

type AgentAddon = {
  id: string;
  title: string;
  qty: number;
};

export type AgentPendingRequestsDetails = {
  id: number;
  orderNumber: string;
  vehicleNumber: string;
  bookingDate: string;
  slotTimeStart: string;
  slotTimeEnd: string;
  address: string;
  serviceStartTime: string;
  serviceEndTime: string;
  remarks: string;
  addOn: AgentAddon[];
  engineOilName: string;
  oilFilterName: string;
  userName: string;
  userMobileNumber: string;
  reviews: {
    rating: string;
    comment: string;
  };
  mileage: string;
  serviceRemarks: string;
};

const fetcher = async (url: string): Promise<AgentPendingRequestsDetails> => {
  const result = await axios.get(url);
  const {status, data} = result.data;

  let response: AgentPendingRequestsDetails = {
    id: 0,
    orderNumber: '',
    vehicleNumber: '',
    bookingDate: '',
    slotTimeStart: '',
    slotTimeEnd: '',
    address: '',
    serviceStartTime: '',
    serviceEndTime: '',
    remarks: '',
    addOn: [],
    engineOilName: '',
    oilFilterName: '',
    userName: '',
    userMobileNumber: '',
    reviews: {
      rating: '',
      comment: '',
    },
    mileage: '',
    serviceRemarks: '',
  };

  if (status) {
    response = {
      id: data.id,
      orderNumber: data.order_number,
      vehicleNumber: data.vehicle_number,
      bookingDate: data.booking_date,
      slotTimeStart: data.time_start,
      slotTimeEnd: data.time_end,
      address: data.workshopName
        ? `${data.workshopName}, ${data.workshopAddress}`
        : formatAddress(data.address, data.state, data.city, data.pincode),
      serviceStartTime: data.service_start_time,
      serviceEndTime: data.service_end_time,
      remarks: data.remarks,
      addOn: JSON.parse(data.addOn)?.map(
        (item: any): AgentAddon => ({
          id: String(item.cartId),
          qty: Number(item.cartQty),
          title: item.title,
        }),
      ),
      engineOilName: data.engine_oil_name,
      oilFilterName: data.oil_filter_name,
      userName: data.userName,
      userMobileNumber: data?.phone,
      reviews: data.reviews
        ? {
            rating: String(data.reviews.rating),
            comment: data.reviews.comment,
          }
        : {
            rating: '',
            comment: '',
          },
      mileage: data.new_mileage,
      serviceRemarks: data.service_remarks,
    };
  }

  return response;
};

export const useAgentCompleteDetails = (id: string) => {
  const {data, error, isLoading, mutate, isValidating} = useSWR(
    ApiEndpoints.agent.getCompletedRequestDetails.replace('[REQUEST_ID]', id),
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    details: data,
    isLoading,
    isError: error,
    mutate,
    isValidating,
  };
};
