import {format} from 'date-fns';

import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {ProfileDTO} from '../types';

export const updateUserProfile = async (
  profileDTO: ProfileDTO,
): Promise<ProfileDTO> => {
  const {licenseDueDate, name, email, mobileNumber} = profileDTO;

  const response = await axios.post(ApiEndpoints.profile.update, {
    name: name,
    email: email,
    license_due_date: licenseDueDate
      ? format(new Date(licenseDueDate as string), 'yyyy-MM-dd')
      : '',
    phone: mobileNumber,
  });

  const {status, message, data} = response.data;

  if (status) {
    return {
      name: data.name,
      email: data.email,
      licenseDueDate: data.license_due_date,
      mobileNumber: data.phone,
    };
  } else {
    throw new Error(message);
  }
};
