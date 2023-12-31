import React from 'react';

import {AppointmentCard} from './AppointmentCard';
import {AppointmentDTO} from '../../../../../services';

export const RenderAppointment = ({item}: {item: AppointmentDTO}) => {
  return (
    <AppointmentCard
      bookingDate={item.bookingDate}
      endStart={item.endStart}
      orderNumber={item.orderNumber}
      timeStart={item.timeStart}
      vehicleNumber={item.vehicleNumber}
      id={item.id}
    />
  );
};
