import {useEffect} from 'react';
import useSWR from 'swr';

import {axios} from '../../../lib/axios';
import {ApiEndpoints} from '../../../services';
import {useMessage} from '../../useMessage';
import {OrderStatus} from '../orders/useOrderDetails';
import {CartSummaryAddon} from '../cart/useOrderSummary';
import {formatAddress} from '../../../utils/formatAddress';

export type HistoryDetails = {
  id: number;
  orderNumber: string;
  vehicleNumber: string;
  status: OrderStatus;
  slotTimeStart: string;
  slotTimeEnd: string;
  date: string;
  agent: string;
  agentId: number;
  serviceStartTime: string;
  serviceEndTime: string;
  address: string;
  engineOilName: string;
  engineOilPrice: number;
  oilFilterName: string;
  oilFilterPrice: number;
  addOn: CartSummaryAddon[];
  remarks: string;
  subTotal: number;
  grandTotal: number;
  couponDiscount: number;
  reviews: {
    rating: string;
    comment: string;
  };
  serviceRemarks: '';
  attachment: [];
};

const fetcher = async (url: string): Promise<HistoryDetails> => {
  const result = await axios.get(url);

  const {status, data} = result.data;

  let response: HistoryDetails = {
    id: 0,
    addOn: [],
    agent: '',
    address: '',
    couponDiscount: 0,
    date: '',
    engineOilName: '',
    engineOilPrice: 0,
    grandTotal: 0,
    oilFilterName: '',
    oilFilterPrice: 0,
    reviews: {
      rating: '',
      comment: '',
    },
    orderNumber: '',
    remarks: '',
    serviceEndTime: '',
    serviceStartTime: '',
    slotTimeEnd: '',
    slotTimeStart: '',
    status: OrderStatus.complete,
    subTotal: 0,
    vehicleNumber: '',
    agentId: 0,
    serviceRemarks: '',
    attachment: [],
  };

  if (status) {
    response = {
      id: data.id,
      addOn: JSON.parse(data.addOn),
      agentId: data.agent_id,
      agent: data.name,
      address: formatAddress(data.address, data.state, data.city, data.pincode),
      date: data.booking_date,
      engineOilName: data.engine_oil_name,
      engineOilPrice: data.engine_oil_price,
      oilFilterName: data.oil_filter_name,
      oilFilterPrice: data.oil_filter_price,
      reviews: data.reviews
        ? {
            rating: String(data.reviews.rating),
            comment: data.reviews.comment,
          }
        : {
            rating: '',
            comment: '',
          },
      orderNumber: data.order_number,
      remarks: data.remarks,
      serviceStartTime: data.service_start_time,
      serviceEndTime: data.service_end_time,
      slotTimeEnd: data.time_start,
      slotTimeStart: data.time_end,
      status: data.booking_status,
      subTotal: data.subTotal,
      couponDiscount: data.couponDiscount,
      grandTotal: data.grandTotal,
      vehicleNumber: data.vehicle_number,
      serviceRemarks: data.service_remarks,
      attachment: data.attachment,
    };
  }

  return response;
};

export const useHistoryDetails = (historyId: string) => {
  const {data, error, isLoading, mutate} = useSWR(
    ApiEndpoints.history.details.replace('[HISTORY_ID]', historyId),
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
    mutate,
    isError: error,
    isLoading,
  };
};
