import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconButton, Text} from 'native-base';
import i18n from 'i18next';

import AgentHistoryDetailScreen from '../../../screens/agent/agent-service-history/AgentHistoryDetailScreen';
import {AgentBottomTabNavigator} from '../AgentBottomTabNavigator';
import AgentNotificationScreen from '../../../screens/agent/agent-notification/AgentNotificationScreen';
import AgentUpdatePasswordScreen from '../../../screens/agent/agent-password/AgentUpdatePasswordScreen/AgentUpdatePasswordScreen';
import {AgentPendingDetailsScreen} from '../../../screens/agent/agent-home/AgentPendingDetailsScreen';
import {AgentStartRequestOTPScreen} from '../../../screens/agent/agent-home/AgentStartRequestOTPScreen';
import {AgentEndRequestOTPScreen} from '../../../screens/agent/agent-home/AgentEndRequestOTPScreen';
import {AgentEndRequestQRScreen} from '../../../screens/agent/agent-home/AgentEndRequestQRScreen';
import {AgentRootStackParamList} from './types';

const AgentRootStack = createNativeStackNavigator<AgentRootStackParamList>();

export const AgentRootStackNavigator = () => {
  return (
    <AgentRootStack.Navigator
      initialRouteName="AgentBottomTabs"
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerLeft: () => (
          <IconButton
            onPress={() => navigation.goBack()}
            borderRadius="full"
            size="xs"
            _icon={{
              as: Ionicons,
              name: 'chevron-back',
              size: 'lg',
              color: 'black',
            }}
          />
        ),
      })}>
      <AgentRootStack.Screen
        name="AgentBottomTabs"
        component={AgentBottomTabNavigator}
        options={{headerShown: false}}
      />
      <AgentRootStack.Screen
        name="AgentPendingDetails"
        component={AgentPendingDetailsScreen}
        options={{
          headerTitle: String(i18n.t('AgentRootNavigationLang:details')),
        }}
      />
      <AgentRootStack.Screen
        name="AgentHistoryDetail"
        component={AgentHistoryDetailScreen}
        options={{
          headerTitle: String(i18n.t('AgentRootNavigationLang:history')),
        }}
      />
      <AgentRootStack.Screen
        name="AgentUpdatePassword"
        component={AgentUpdatePasswordScreen}
        options={{
          headerTitle: String(i18n.t('AgentRootNavigationLang:update')),
        }}
      />
      <AgentRootStack.Screen
        name="Notifications"
        component={AgentNotificationScreen}
        options={{
          headerTitle: String(i18n.t('AgentRootNavigationLang:notifications')),
        }}
      />

      <AgentRootStack.Screen
        name="AgentStartRequestOTP"
        component={AgentStartRequestOTPScreen}
        options={{
          headerTitle: String(i18n.t('AgentRootNavigationLang:startRequest')),
        }}
      />

      <AgentRootStack.Screen
        name="AgentEndRequestOTP"
        component={AgentEndRequestOTPScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text
              fontFamily="body"
              fontWeight={'400'}
              fontStyle="normal"
              fontSize={'lg'}
              color={'black'}>
              {i18n.t('AgentRootNavigationLang:completeRequest')}
            </Text>
          ),
        }}
      />

      <AgentRootStack.Screen
        name="AgentEndRequestQR"
        component={AgentEndRequestQRScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text
              fontFamily="body"
              fontWeight={'400'}
              fontStyle="normal"
              fontSize={'lg'}
              color={'black'}>
              {i18n.t('AgentRootNavigationLang:scanQr')}
            </Text>
          ),
        }}
      />
    </AgentRootStack.Navigator>
  );
};
