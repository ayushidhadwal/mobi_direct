import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';

export interface ServiceAddToCartDTO {
  vehicleId: string;
  engineOilId: string;
  oilFilterId: string;
}

export const serviceAddToCart = async ({
  engineOilId,
  oilFilterId,
  vehicleId,
}: ServiceAddToCartDTO): Promise<any> => {
  const response = await axios.post(ApiEndpoints.order.service.addToCart, {
    vehicles_number_id: vehicleId,
    engine_oil_id: engineOilId,
    oil_filter_id: oilFilterId,
  });

  const {status, message} = response.data;

  if (status) {
    return {};
  } else {
    throw new Error(message);
  }
};
