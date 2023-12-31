import {format} from 'date-fns';

import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {Vehicle, VehicleDTO} from '../types';

export const updateUserVehicle = async (
  vehicleId: number,
  vehicleDTO: VehicleDTO,
): Promise<Vehicle> => {
  const {
    year,
    lastServiceMileage,
    averageMileage,
    engineOilType,
    carPlateNumber,
    roadTaxDueDate,
  } = vehicleDTO;

  const response = await axios.post(ApiEndpoints.vehicle.update, {
    ...vehicleDTO,
    id: vehicleId,
    year: year,
    road_tax_due_date: roadTaxDueDate
      ? format(new Date(roadTaxDueDate), 'yyyy/MM/dd')
      : '',
    car_plate_number: carPlateNumber,
    last_service_mileage: Number(lastServiceMileage),
    average_mileage: Number(averageMileage),
    engine_oil_type: Number(engineOilType),
  });

  const {status, message, data} = response.data;

  if (status) {
    return {
      id: Number(data.id),
      userId: Number(data.user_id),
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      averageMileage: data.average_mileage,
      year: data.year,
      model: data.model,
      made: data.made,
      carPlateNumber: data.car_plate_number,
      engineOilType: data.engine_oil_type,
      lastServiceMileage: data.last_service_mileage,
      roadTaxDueDate: data.road_tax_due_date,
    };
  } else {
    throw new Error(message);
  }
};
