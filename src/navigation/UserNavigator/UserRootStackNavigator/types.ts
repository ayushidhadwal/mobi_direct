import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {Address, Vehicle} from '../../../services';
import {AddOn} from '../../../hooks/user/orders/useAddOn';
import {UserBottomTabsParamList} from '../UserBottomTabNavigator';

export type UserRootStackParamList = {
  BottomTabs: NavigatorScreenParams<UserBottomTabsParamList>;
  UpdateProfile: undefined;
  Notifications: undefined;
  UpdatePassword: undefined;
  Refer: undefined;
  Address: undefined;
  NewAddress: undefined;
  EditAddress: Address;
  Vehicles: undefined;
  NewVehicle: undefined;
  EditVehicle: Vehicle;
  Choose: undefined;
  Contact: undefined;
  AddOn: undefined;
  AddOnDetails: {addOn: AddOn};
  CarService: {vehicleId: string} | undefined;
  Cart: {coupon: string} | undefined;
  ApplyCoupons: undefined;
  SelectAddress: {coupon: string};
  CartOrderDetails: {coupon: string; addressId: number};
  OrderDetails: {orderId: number};
  AppointmentSummary: {
    date: string;
    appointmentTimeId: number;
    orderCode: string;
    vehicleCode: string;
    appointmentTime: string;
    addressId: number | null;
    address: string | null;
    workshopId: number | null;
    workshopName: string | null;
    workshopAddress: string | null;
  };
  AppointmentAddress: {
    date: string;
    appointmentTimeId: number;
    orderCode: string;
    vehicleCode: string;
    appointmentTime: string;
  };
  AppointmentDetail: {itemId: number};
  DateTime: {
    vehicleCode: string;
    orderCode: string;
  };
  CreateAppointment: undefined;
  Transaction: undefined;
  Coupon: undefined;
  HistoryDetails: {id: string};
  PDFViewer: {uri: string};
  PaymentGateway: {
    coupon: string;
    addressId: number;
    remarks: string;
    amount: number;
  };
  PaymentSuccess: {
    transactionId: string;
  };
  PaymentFailed: undefined;
  Faq: undefined;
  FaqDetail: {
    videoId: string;
    desc: string;
    title: string;
  };
  WorkShop: {
    date: string;
    appointmentTimeId: number;
    orderCode: string;
    vehicleCode: string;
    appointmentTime: string;
    addressId: number;
  };
  DeleteAccount: undefined;
  Reschedule: {
    orderNumber: string;
  };
};

export type UserNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<UserRootStackParamList>,
  BottomTabNavigationProp<UserBottomTabsParamList>
>;

export type UpdateProfileScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'UpdateProfile'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type DeleteAccountScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'DeleteAccount'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type NotificationsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'Notifications'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type UpdatePasswordScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'UpdatePassword'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type ReferScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'Refer'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type AddressScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'Address'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type NewAddressScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'NewAddress'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type EditAddressScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'EditAddress'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type VehiclesScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'Vehicles'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type NewVehicleScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'NewVehicle'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type EditVehicleScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'EditVehicle'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type ChooseScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'Choose'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type AddOnScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'AddOn'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type AddOnDetailsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'AddOnDetails'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type CarServiceScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'CarService'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type CartScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'Cart'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type ApplyCouponsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'ApplyCoupons'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type SelectAddressScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'SelectAddress'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type CartOrderDetailsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'CartOrderDetails'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type OrderDetailsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'OrderDetails'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type AppointmentSummaryScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'AppointmentSummary'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type AppointmentDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'AppointmentDetail'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type DateTimeScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'DateTime'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type CreateAppointmentScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'CreateAppointment'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type TransactionScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'Transaction'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type CouponScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'Coupon'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type HistoryDetailsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'HistoryDetails'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type PDFViewerScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'PDFViewer'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type PaymentGatewayScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'PaymentGateway'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type PaymentSuccessScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'PaymentSuccess'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type PaymentFailedScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'PaymentFailed'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type ContactScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'Contact'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;
export type FaqScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'Faq'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;
export type FaqDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'FaqDetail'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type WorkShopScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'WorkShop'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;
export type AppointmentAddressScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'AppointmentAddress'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;

export type RescheduleScreenProps = CompositeScreenProps<
  NativeStackScreenProps<UserRootStackParamList, 'Reschedule'>,
  BottomTabScreenProps<UserBottomTabsParamList>
>;
