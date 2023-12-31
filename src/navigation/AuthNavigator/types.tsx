import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type AuthStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  VerifyForgotPassword: {email: string; mobileNumber: string; OTP: number};
  NewPassword: {email: string; mobileNumber: string};
  Contact: undefined;
};

export type AuthNavigationProps = NativeStackNavigationProp<AuthStackParamList>;

export type AuthOnBoardingProps = NativeStackScreenProps<
  AuthStackParamList,
  'OnBoarding'
>;

export type AuthLoginProps = NativeStackScreenProps<
  AuthStackParamList,
  'Login'
>;

export type AuthRegisterProps = NativeStackScreenProps<
  AuthStackParamList,
  'Register'
>;

export type AuthForgotPasswordProps = NativeStackScreenProps<
  AuthStackParamList,
  'ForgotPassword'
>;

export type AuthVerifyForgotPasswordProps = NativeStackScreenProps<
  AuthStackParamList,
  'VerifyForgotPassword'
>;

export type AuthNewPasswordProps = NativeStackScreenProps<
  AuthStackParamList,
  'NewPassword'
>;
export type AuthContactScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Contact'
>;
