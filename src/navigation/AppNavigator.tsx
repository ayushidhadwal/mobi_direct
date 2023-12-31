import * as React from 'react';
import {useCallback, useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import {AuthContext} from '../contexts/auth';
import {updateFcmToken, UserType} from '../services';
import {NavigationTheme} from '../styles';
import {AuthNavigator} from './AuthNavigator';
import {AgentRootStackNavigator} from './AgentNavigator';
import {UserRootStackNavigator} from './UserNavigator';

export const AppNavigator = () => {
  const {
    state: {isLoading, userToken, userType},
  } = useContext(AuthContext);

  const requestUserPermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  }, []);

  useEffect(() => {
    if (userToken) {
      (async () => {
        const enabled = await requestUserPermission();
        if (enabled || Platform.OS === 'android') {
          try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
              console.log({fcmToken});
              await updateFcmToken({token: fcmToken});
            }
          } catch (e: any) {
            console.log(e.message);
          }
        }
      })();
    }
  }, [requestUserPermission, userToken]);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer
      theme={NavigationTheme}
      onReady={() => SplashScreen.hide()}>
      {userToken && userType === UserType.USER ? (
        <UserRootStackNavigator />
      ) : userToken && userType === UserType.AGENT ? (
        <AgentRootStackNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};
