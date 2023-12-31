import {format} from 'date-fns';

export const vehicleYears: string[] = [];

for (let i = 1990; i <= Number(format(new Date(), 'yyyy')); i++) {
  vehicleYears.push(String(i));
}
