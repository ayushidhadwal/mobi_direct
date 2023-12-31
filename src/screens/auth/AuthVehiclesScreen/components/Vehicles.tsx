import React, {FC} from 'react';
import {FlatList} from 'native-base';

import {VehicleDTO} from '../../../../services';
import {RenderVehicles} from './RenderVehicles';

type Props = {
  data: VehicleDTO[];
};

export const Vehicles: FC<Props> = ({data}) => {
  return (
    <FlatList
      contentContainerStyle={{marginTop: 14}}
      data={data}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => String(item.carPlateNumber)}
      renderItem={RenderVehicles}
    />
  );
};
