import {format} from 'date-fns';

import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {RegisterDTO, VerifyLoginResponse} from '../types';
import {createSession} from '../../utils/createSession';

export const register = async ({
  name,
  email,
  referral,
  mobileNumber,
  driverLicenseDueDate,
  password,
}: RegisterDTO): Promise<VerifyLoginResponse> => {
  const response = await axios.post(ApiEndpoints.auth.register, {
    name: name,
    phone: mobileNumber,
    password: password,
    driver_license_due_date: driverLicenseDueDate
      ? format(new Date(driverLicenseDueDate), 'yyyy-MM-dd')
      : '',
    email: email,
    refer_by: referral,
  });

  const {status, message, data} = response.data;

  if (status) {
    return await createSession(data.user_type, data.token);
  } else {
    throw new Error(message);
  }
};
