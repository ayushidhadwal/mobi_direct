import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IconButton} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import i18n from 'i18next';
import {useCallback, useEffect, useRef, useState} from 'react';
import {SheetManager} from 'react-native-actions-sheet';

import NotificationScreen from '../../../screens/user/notification/NotificationScreen/NotificationScreen';
import {ChooseScreen} from '../../../screens/user/order/ChooseOrderScreen';
import {CarServiceScreen} from '../../../screens/user/order/CarServiceScreen';
import {AddressScreen} from '../../../screens/user/address/AddressScreen';
import {UpdatePasswordScreen} from '../../../screens/user/profile/UpdatePasswordScreen';
import {ReferralScreen} from '../../../screens/user/refer-share/ReferralScreen';
import {CouponScreen} from '../../../screens/user/coupon/CouponScreen';
import {DateTimeScreen} from '../../../screens/user/appointment/DateTimeScreen';
import {CartScreen} from '../../../screens/user/cart/CartScreen';
import {AddOnScreen} from '../../../screens/user/order/AddOnScreen';
import {AddOnDetailsScreen} from '../../../screens/user/order/AddOnDetailsScreen';
import {OrderDetailsScreen} from '../../../screens/user/order/OrderDetailsScreen';
import {CartOrderDetailsScreen} from '../../../screens/user/cart/CartOrderDetailsScreen';
import {UpdateProfileScreen} from '../../../screens/user/profile/UpdateProfileScreen';
import {NewAddressScreen} from '../../../screens/user/address/NewAddressScreen';
import {EditAddressScreen} from '../../../screens/user/address/EditAddressScreen';
import {VehiclesScreen} from '../../../screens/user/vehicle/VehiclesScreen';
import {EditVehicleScreen} from '../../../screens/user/vehicle/EditVehicleScreen';
import {NewVehicleScreen} from '../../../screens/user/vehicle/NewVehicleScreen';
import {CreateAppointmentScreen} from '../../../screens/user/appointment/CreateAppointment';
import {AppointmentSummaryScreen} from '../../../screens/user/appointment/AppointmentSummary';
import {ApplyCouponsScreen} from '../../../screens/user/cart/ApplyCouponsScreen';
import {SelectAddressScreen} from '../../../screens/user/cart/SelectAddressScreen';
import {AppointmentDetailScreen} from '../../../screens/user/appointment/AppoinmentDetail';
import {ServiceHistoryDetailsScreen} from '../../../screens/user/service/ServiceHistoryDetailsScreen';
import {PDFViewerScreen} from '../../../screens/user/order/PDFViewerScreen';
import {PaymentGatewayScreen} from '../../../screens/user/cart/PaymentGatewayScreen';
import {PaymentSuccessScreen} from '../../../screens/user/cart/PaymentSuccessScreen';
import {TransactionScreen} from '../../../screens/user/transaction/TransactionScreen';
import {PaymentFailedScreen} from '../../../screens/user/cart/PaymentFailedScreen';
import {ContactScreen} from '../../../screens/user/contact';
import {FaqScreen} from '../../../screens/user/faq/FaqScreen';
import {FaqDetailScreen} from '../../../screens/user/faq/FaqDetailScreen';
import {WorkShopScreen} from '../../../screens/user/appointment/WorkShopScreen';
import {AppointmentAddressScreen} from '../../../screens/user/appointment/AppointmentAddress';
import {UserRootStackParamList} from './types';
import {UserBottomTabNavigator} from '../UserBottomTabNavigator';
import {DeleteAccountScreen} from '../../../screens/user/settings/DeleteAccountScreen';
import {RescheduleScreen} from '../../../screens/user/appointment/RescheduleScreen/RescheduleScreen';
import {AppointmentForReview, getAppointmentForReview} from '../../../services';

const Stack = createNativeStackNavigator<UserRootStackParamList>();

export const UserRootStackNavigator = () => {
  const [forReview, setForReview] = useState<AppointmentForReview | null>(null);

  const getLatestReview = useCallback(() => {
    console.log('Getting review...');
    getAppointmentForReview()
      .then(data => setForReview(data as AppointmentForReview))
      .catch(() => {});
  }, []);

  const timerRef = useRef<number>();
  useEffect(() => {
    if (!forReview?.id) {
      console.log('timer started');
      timerRef.current = setInterval(getLatestReview, 1000 * 5);
    } else {
      console.log('timer cleared');
      clearInterval(timerRef.current as number);
    }
  }, [forReview?.id, getLatestReview]);

  useEffect(() => {
    SheetManager.hide('review-sheet');
    if (forReview?.id) {
      SheetManager.show('review-sheet', {
        payload: {
          orderNumber: forReview.orderNumber,
          appointmentId: forReview.id,
          agentId: forReview.agentId,
          onSubmit: () => {
            setForReview(null);
            getLatestReview();
          },
        },
      });
    }
  }, [forReview, getLatestReview]);

  return (
    <Stack.Navigator
      initialRouteName={'BottomTabs'}
      screenOptions={({navigation}) => ({
        headerShadowVisible: false,
        headerBackVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: '#ffa200',
        headerTitleStyle: {
          textAlign: 'center',
          fontWeight: '300',
        },
        headerLeft: () => (
          <IconButton
            onPress={() => navigation.goBack()}
            borderRadius="full"
            variant={'subtle'}
            size={'xs'}
            colorScheme={'primary'}
            _icon={{
              as: Ionicons,
              name: 'chevron-back',
              size: 'xs',
              color: 'white',
            }}
          />
        ),
      })}>
      <Stack.Screen
        name="BottomTabs"
        component={UserBottomTabNavigator}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfileScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:profile')),
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:notification')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Faq"
        component={FaqScreen}
        options={{
          headerTitle: 'FAQ',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="FaqDetail"
        component={FaqDetailScreen}
        options={{
          headerTitle: 'FAQ Details',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Choose"
        component={ChooseScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:choose')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="CarService"
        component={CarServiceScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:car')),
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="Address"
        component={AddressScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:address')),
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="NewAddress"
        component={NewAddressScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:newAddress')),
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="EditAddress"
        component={EditAddressScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:editAddress')),
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="Vehicles"
        component={VehiclesScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:vehicles')),
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="EditVehicle"
        component={EditVehicleScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:editVehicle')),
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="NewVehicle"
        component={NewVehicleScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:newVehicle')),
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePasswordScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:updatePassword')),
        }}
      />

      <Stack.Screen
        name="CreateAppointment"
        component={CreateAppointmentScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:appointment')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Refer"
        component={ReferralScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:refer')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:transaction')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Coupon"
        component={CouponScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:coupon')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="DateTime"
        component={DateTimeScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:date')),
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:cart')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="ApplyCoupons"
        component={ApplyCouponsScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:applyCoupons')),
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="SelectAddress"
        component={SelectAddressScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:selectAddress')),
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="AddOn"
        component={AddOnScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:add')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="AddOnDetails"
        component={AddOnDetailsScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:addOnDetails')),
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:order')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="CartOrderDetails"
        component={CartOrderDetailsScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:orderSummary')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="AppointmentSummary"
        component={AppointmentSummaryScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:summary')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="AppointmentDetail"
        component={AppointmentDetailScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:appointmentDetails')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="HistoryDetails"
        component={ServiceHistoryDetailsScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:historyDetails')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="PDFViewer"
        component={PDFViewerScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:engineOilGuide')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="PaymentGateway"
        component={PaymentGatewayScreen}
        options={{
          // headerShown: false,
          headerTitle: String(i18n.t('RootNavigationLang:paymentGateway')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="PaymentSuccess"
        component={PaymentSuccessScreen}
        options={{
          headerShown: false,
          headerTitle: 'Order Confirmation',
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="PaymentFailed"
        component={PaymentFailedScreen}
        options={{
          headerShown: false,
          headerTitle: 'Payment Failed',
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:contactUs')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="WorkShop"
        component={WorkShopScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:Workshops')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="AppointmentAddress"
        component={AppointmentAddressScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:selectAddress')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccountScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:DeleteAccount')),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Reschedule"
        component={RescheduleScreen}
        options={{
          headerTitle: String(i18n.t('RootNavigationLang:date')),
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
