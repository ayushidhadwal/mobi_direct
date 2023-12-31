import React, {FC} from 'react';
import {Box} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

import {RegisterForm} from './components/RegisterForm';
import {AuthRegisterProps} from '../../../navigation';
import {AuthHeader} from '../LoginScreen/components/AuthHeader';
import {UpdateLanguage} from '../LoginScreen/components/UpdateLanguage';

export const RegisterScreen: FC<AuthRegisterProps> = ({navigation}) => {
  const {t} = useTranslation('RegisterLang');

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
        <AuthHeader heading={t('register')} />

        <Box px={5}>
          <RegisterForm />

          <UpdateLanguage onLogin={() => navigation.navigate('Login')} />
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
