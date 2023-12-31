import React, {FC, useCallback} from 'react';
import {Image, Text} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Keyboard, StatusBar, StyleSheet} from 'react-native';
import {FormikHelpers} from 'formik';

import OTPForm, {OTPFormValues} from './components/OTPForm';
import OTPResend from './components/OTPResend';
import {useMessage} from '../../../hooks/useMessage';
import {AuthVerifyForgotPasswordProps} from '../../../navigation';
import {forgotPassword} from '../../../services';

export const VerifyForgotPasswordScreen: FC<AuthVerifyForgotPasswordProps> = ({
  navigation,
  route,
}) => {
  const {mobileNumber, OTP, email} = route.params;

  const {t} = useTranslation('OtpLang');

  console.warn(OTP);
  const setMessage = useMessage();

  const onOTPResend = useCallback(async () => {
    try {
      Keyboard.dismiss();
      const result = await forgotPassword({email});
      setMessage('OTP sent!');
      navigation.navigate('VerifyForgotPassword', result);
    } catch (e: any) {
      setMessage(e.message);
    }
  }, [email, navigation, setMessage]);

  const onFormSubmit = useCallback(
    ({OTP: userOTP}: OTPFormValues, {setSubmitting}: FormikHelpers<any>) => {
      Keyboard.dismiss();
      if (Number(userOTP) === Number(OTP)) {
        setSubmitting(false);
        navigation.replace('NewPassword', {
          email,
          mobileNumber,
        });
      } else {
        setSubmitting(false);
        setMessage('Invalid OTP!');
      }
    },
    [OTP, email, mobileNumber, navigation, setMessage],
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#FFF"
        barStyle="dark-content"
      />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../../assets/otp.png')}
          alt={'no image'}
          alignSelf={'center'}
          mt={10}
        />
        <Text fontWeight={'400'} mt={10} alignSelf={'center'} fontSize={'md'}>
          {t('verification')}
        </Text>
        <Text
          textAlign={'center'}
          mb={2}
          fontSize={'sm'}
          p={2}
          color={'muted.500'}>
          {t('text')}
        </Text>
        <OTPForm onFormSubmit={onFormSubmit} />
        <OTPResend onOTPResend={onOTPResend} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
