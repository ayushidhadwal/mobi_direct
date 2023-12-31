import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HStack, IconButton, Text} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import i18n from 'i18next';

import {HomeScreen} from '../../../screens/user/home/HomeScreen';
import {OrderScreen} from '../../../screens/user/order/OrderScreen';
import {ServiceHistoryScreen} from '../../../screens/user/service/ServiceHistoryScreen';
import {AppointmentScreen} from '../../../screens/user/appointment/AppointmentList';
import SettingsScreen from '../../../screens/user/settings/SettingsScreen';
import {BottomTabs} from '../../../components/navigation/BottomTabs';
import {useUserProfile} from '../../../hooks/user/useUserProfile';
import {UserBottomTabsParamList} from './types';

const UserBottomTab = createBottomTabNavigator<UserBottomTabsParamList>();

export const UserBottomTabNavigator = () => {
  const {isLoading, profile} = useUserProfile();

  return (
    <UserBottomTab.Navigator
      tabBar={props => <BottomTabs {...props} />}
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'left',
        headerRight: () => (
          <HStack>
            <IconButton
              mr={1}
              onPress={() =>
                navigation.navigate('Cart', {
                  coupon: undefined,
                })
              }
              borderRadius="full"
              size="xs"
              _icon={{
                as: Ionicons,
                name: 'md-cart',
                size: 'lg',
                color: 'black',
              }}
            />
            <IconButton
              mr={1}
              onPress={() => navigation.navigate('Notifications')}
              borderRadius="full"
              size="xs"
              _icon={{
                as: Ionicons,
                name: 'md-notifications',
                size: 'lg',
                color: 'black',
              }}
            />

            <IconButton
              mr={3}
              onPress={() => navigation.navigate('Faq')}
              borderRadius="full"
              size="xs"
              _icon={{
                as: MaterialIcons,
                name: 'headset-mic',
                size: 'lg',
                color: 'black',
              }}
            />
          </HStack>
        ),
        tabBarActiveBackgroundColor: '#fff',
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#000',
        },
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#ffa200',
        headerTitleStyle: {
          fontWeight: '400',
        },
      })}>
      <UserBottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <Text fontWeight="500" fontSize="md" color="primary.400">
              {i18n.t('BottomNavigationLang:welcome')}{' '}
              <Text fontWeight="400" numberOfLines={1} color="black">
                {isLoading ? 'Please wait...' : profile?.name}
              </Text>
            </Text>
          ),
          tabBarIcon: ({color}) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <UserBottomTab.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          headerTitle: String(i18n.t('BottomNavigationLang:order')),
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="checkbox-marked-circle-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <UserBottomTab.Screen
        name="Service"
        component={ServiceHistoryScreen}
        options={{
          headerTitle: String(i18n.t('BottomNavigationLang:service')),
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="clipboard-text-clock"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <UserBottomTab.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={{
          headerTitle: String(i18n.t('BottomNavigationLang:appointment')),
          tabBarIcon: ({color}) => (
            <EvilIcons name="calendar" size={24} color={color} />
          ),
        }}
      />
      <UserBottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: String(i18n.t('BottomNavigationLang:settings')),
          tabBarIcon: ({color}) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </UserBottomTab.Navigator>
  );
};
