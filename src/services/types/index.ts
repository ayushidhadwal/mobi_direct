import {UserType} from '../enums';

export type CheckAvailableEmailDTO = {
  email: string;
};

export type LoginCredentialsDTO = {
  mobileNumber: string;
  password: string;
};

export type ForgotPasswordDTO = {
  email: string;
};

export type ForgotPasswordResponse = {
  email: string;
  mobileNumber: string;
  OTP: number;
};

export type NewPasswordDTO = {
  password: string;
  email: string;
  mobileNumber: string;
};

export interface AddressDTO {
  address: string;
  state: string;
  city: string;
  pinCode: string;
}

export interface Address extends AddressDTO {
  id: number;
  userId: number;
  updatedAt: string;
  createdAt: string;
}

export interface VehicleDTO {
  made: string;
  model: string;
  year: string;
  roadTaxDueDate: string;
  carPlateNumber: string;
  lastServiceMileage: number;
  averageMileage: number;
  engineOilType: number;
  engineOilTypeName?: string;
}

export interface Vehicle extends VehicleDTO {
  id: number;
  userId: number;
  updatedAt: string;
  createdAt: string;
}

export interface RegisterDTO {
  name: string;
  mobileNumber: string;
  password: string;
  email?: string;
  driverLicenseDueDate?: string;
  referral?: string;
}

export type VerifyLoginCredentialsDTO = {
  mobileNumber: string;
  OTP: string;
};

export type VerifyLoginResponse = {
  userType: UserType;
  userToken: string;
};

export interface ProfileDTO {
  name: string;
  mobileNumber: string;
  email?: string;
  licenseDueDate?: string;
}

export interface User extends ProfileDTO {
  id: number;
  mobileNumber: string;
}

export type CreateAppointmentDTO = {
  date: string;
  appointmentTimeId: string;
  orderCode: string;
  vehicleCode: string;
  WorkShopId: number;
  addressId: number;
};

export interface AppointmentDTO {
  vehicleNumber: string;
  orderNumber: string;
  bookingDate: string;
  timeStart: string;
  endStart: string;
  id: number;
  workshopName: string;
  workshopAddress: string;
}

export interface CardDTO {
  cardName: string;
  cardNumber: string;
  cvv: string;
  expireMonth: string;
  expireYear: string;
}
