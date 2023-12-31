import React from 'react';

import {VehicleDTO} from '../../../../services';
import {VehicleItem} from './VehicleItem';

export const RenderVehicles = ({item}: {item: VehicleDTO}) => {
  return (
    <VehicleItem
      made={item.made}
      model={item.model}
      year={item.year}
      roadTaxDueDate={item.roadTaxDueDate}
      carPlateNumber={item.carPlateNumber}
      lastServiceMileage={item.lastServiceMileage}
      averageMileage={item.averageMileage}
      engineOilTypeName={item.engineOilTypeName as string}
    />
  );
};
