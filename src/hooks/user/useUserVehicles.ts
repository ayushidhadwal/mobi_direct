import {useEffect} from 'react';
import useSWR from 'swr';

import {ApiEndpoints, Vehicle} from '../../services';
import {axios} from '../../lib/axios';
import {useMessage} from '../useMessage';

const fetcher = async (url: string): Promise<Vehicle[]> => {
  const {data} = await axios.get(url);
  const addresses = data.data;

  return addresses.map((item: any) => ({
    id: item.id,
    userId: item.user_id,
    year: item.year,
    model: item.model,
    made: item.made,
    carPlateNumber: item.car_plate_number,
    engineOilTypeName: item.engine_type_name,
    engineOilType: item.engine_oil_type,
    lastServiceMileage: Number(item.last_service_mileage),
    averageMileage: Number(item.average_mileage),
    createdAt: item.created_at,
    roadTaxDueDate: item.road_tax_due_date,
    updatedAt: item.updated_at,
  }));
};

export const useUserVehicles = () => {
  const {data, error, isLoading, mutate, isValidating} = useSWR(
    ApiEndpoints.vehicle.get,
    fetcher,
  );

  const setMessage = useMessage();
  useEffect(() => {
    if (error?.message) {
      setMessage(error?.message);
    }
  }, [error?.message, setMessage]);

  return {
    vehicles: data,
    isLoading,
    isError: error,
    mutate,
    isValidating,
  };
};
