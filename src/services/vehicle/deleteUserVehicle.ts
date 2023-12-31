import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export const deleteUserVehicle = async (vehicleId: number): Promise<number> => {
  const response = await axios.post(ApiEndpoints.vehicle.delete, {
    id: vehicleId,
  });

  const {status, message} = response.data;

  if (status) {
    return Number(vehicleId);
  } else {
    throw new Error(message);
  }
};
