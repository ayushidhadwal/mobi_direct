import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthStackParamList} from './types';
import {HeaderButton} from '../../components/HeaderButton';
import {
  LoginScreen,
  OnBoardingScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  VerifyForgotPasswordScreen,
  NewPasswordScreen,
} from '../../screens/auth';
import {ContactScreen} from '../../screens/user/contact';
import i18n from 'i18next';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="OnBoarding"
      screenOptions={({navigation}) => ({
        headerShown: false,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <HeaderButton
            icon="chevron-back"
            onPress={() => navigation.goBack()}
          />
        ),
      })}>
      <AuthStack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />

      <AuthStack.Group
        screenOptions={{
          headerShown: true,
        }}>
        <AuthStack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{
            headerTitle: 'Forgot Password?',
          }}
        />
        <AuthStack.Screen
          name="VerifyForgotPassword"
          component={VerifyForgotPasswordScreen}
          options={{
            headerTitle: 'Verify OTP',
          }}
        />
        <AuthStack.Screen
          name="NewPassword"
          component={NewPasswordScreen}
          options={{
            headerTitle: 'New Password',
          }}
        />
        <AuthStack.Screen
          name="Contact"
          component={ContactScreen}
          options={{
            headerTitle: String(i18n.t('RootNavigationLang:contactUs')),
            headerBackVisible: false,
          }}
        />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};
