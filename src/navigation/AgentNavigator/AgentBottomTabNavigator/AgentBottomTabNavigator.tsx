import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconButton, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import i18n from 'i18next';

import {AgentHomeScreen} from '../../../screens/agent/agent-home/AgentHomeScreen';
import {AgentSettingsScreen} from '../../../screens/agent/agent-settings/AgentSettingsScreen';
import {AgentServiceHistoryScreen} from '../../../screens/agent/agent-service-history/AgentServiceHistoryScreen';
import {useUserProfile} from '../../../hooks/user/useUserProfile';
import {AgentBottomTabsParamList} from './types';

const AgentBottomTab = createBottomTabNavigator<AgentBottomTabsParamList>();

export const AgentBottomTabNavigator = () => {
  const {isLoading, profile} = useUserProfile();

  return (
    <AgentBottomTab.Navigator
      initialRouteName="AgentHome"
      screenOptions={({navigation}) => ({
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
        headerRight: () => (
          <IconButton
            mr={2}
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
        ),
      })}>
      <AgentBottomTab.Screen
        name="AgentHome"
        component={AgentHomeScreen}
        options={{
          headerTitleAlign: 'left',
          headerTitle: () => (
            <Text fontStyle="normal" fontSize="md" color="black">
              <Text color="primary.400">
                {i18n.t('AgentBottomNavigationLang:welcome')},
              </Text>{' '}
              {isLoading ? '...' : profile?.name}
            </Text>
          ),
          tabBarLabel: ({color}) => (
            <Text
              fontFamily="body"
              fontWeight={'300'}
              fontStyle="normal"
              fontSize={'sm'}
              color={color}
              numberOfLines={1}>
              {i18n.t('AgentBottomNavigationLang:home')}
            </Text>
          ),
          tabBarIcon: ({color}) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <AgentBottomTab.Screen
        name="AgentService"
        component={AgentServiceHistoryScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text
              fontFamily="body"
              fontWeight={'400'}
              fontStyle="normal"
              fontSize={'lg'}
              color={'black'}
              ml={3}
              numberOfLines={1}>
              {i18n.t('AgentBottomNavigationLang:service')}
            </Text>
          ),
          tabBarLabel: ({color}) => (
            <Text
              fontFamily="body"
              fontWeight={'300'}
              fontStyle="normal"
              fontSize={'sm'}
              color={color}
              numberOfLines={1}>
              {i18n.t('AgentBottomNavigationLang:service')}
            </Text>
          ),
          tabBarIcon: ({color}) => (
            <Ionicons name="document-text-sharp" size={22} color={color} />
          ),
        }}
      />
      <AgentBottomTab.Screen
        name="AgentSetting"
        component={AgentSettingsScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text
              fontFamily="body"
              fontWeight={'400'}
              fontStyle="normal"
              fontSize={'lg'}
              color={'black'}
              ml={3}
              numberOfLines={1}>
              {i18n.t('AgentBottomNavigationLang:settings')}
            </Text>
          ),
          tabBarLabel: ({color}) => (
            <Text
              fontFamily="body"
              fontWeight={'300'}
              fontStyle="normal"
              fontSize={'sm'}
              color={color}
              numberOfLines={1}>
              {i18n.t('AgentBottomNavigationLang:settings')}
            </Text>
          ),
          tabBarIcon: ({color}) => (
            <Ionicons name="settings" size={22} color={color} />
          ),
        }}
      />
    </AgentBottomTab.Navigator>
  );
};
