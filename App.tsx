import React, {useCallback, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NativeBaseProvider} from 'native-base';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {Platform} from 'react-native';
import {AppNavigator} from './src/navigation';
import {NativeBaseTheme} from './src/styles';
import {SwrProvider} from './src/lib/SwrProvider';
import {AuthContextProvider} from './src/contexts/auth';
import WithAxios from './src/lib/WithAxios';
import './src/i18n';
import {StripeProvider} from '@stripe/stripe-react-native';
import Config from './src/config';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import * as storage from './src/utils/storage';
import {SheetProvider} from 'react-native-actions-sheet';
import './sheets.tsx';

const App = () => {
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        await notifee.createChannel({
          id: 'default',
          name: 'Mobi Direct',
          lights: false,
          vibration: true,
          importance: AndroidImportance.DEFAULT,
        });
      }
    })();
  }, []);

  const getParameterFromUrl = (url: string, parm: string) => {
    const re = new RegExp('.*[?&]' + parm + '=([^&]+)(&|$)');
    const match = url.match(re);
    return match ? match[1] : '';
  };

  const handleDynamicLink = useCallback(async (link: any) => {
    if (link) {
      console.log(link);
      if (link.url.includes('invitedby')) {
        const parsed = getParameterFromUrl(link.url, 'invitedby');
        if (parsed) {
          await storage.saveString(Config.REFERRAL_ID, parsed);
        }
      }
    }
  }, []);

  useEffect(() => {
    dynamicLinks().getInitialLink().then(handleDynamicLink);

    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, [handleDynamicLink]);

  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <WithAxios>
          <SwrProvider>
            <NativeBaseProvider theme={NativeBaseTheme}>
              <SheetProvider>
                <StripeProvider
                  publishableKey={Config.STRIPE_PUBLISHABLE_KEY}
                  urlScheme="com.mobi.d"
                  merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
                >
                  <AppNavigator />
                </StripeProvider>
              </SheetProvider>
            </NativeBaseProvider>
          </SwrProvider>
        </WithAxios>
      </AuthContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
