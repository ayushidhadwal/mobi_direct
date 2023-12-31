import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {UserRootStackParamList} from '../UserRootStackNavigator';

export type UserBottomTabsParamList = {
  Home: undefined;
  Orders: undefined;
  Service: undefined;
  Appointment: undefined;
  Settings: undefined;
};

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<UserBottomTabsParamList, 'Home'>,
  NativeStackScreenProps<UserRootStackParamList>
>;

export type OrdersScreenProps = CompositeScreenProps<
  BottomTabScreenProps<UserBottomTabsParamList, 'Orders'>,
  NativeStackScreenProps<UserRootStackParamList>
>;

export type ServiceScreenProps = CompositeScreenProps<
  BottomTabScreenProps<UserBottomTabsParamList, 'Service'>,
  NativeStackScreenProps<UserRootStackParamList>
>;

export type AppointmentScreenProps = CompositeScreenProps<
  BottomTabScreenProps<UserBottomTabsParamList, 'Appointment'>,
  NativeStackScreenProps<UserRootStackParamList>
>;

export type SettingsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<UserBottomTabsParamList, 'Settings'>,
  NativeStackScreenProps<UserRootStackParamList>
>;
