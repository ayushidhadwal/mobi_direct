import React, {FC} from 'react';
import {Box} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import {LoginForm} from './components/LoginForm';
import {UpdateLanguage} from './components/UpdateLanguage';
import {AuthLoginProps} from '../../../navigation';
import {AuthHeader} from './components/AuthHeader';

export const LoginScreen: FC<AuthLoginProps> = ({navigation}) => {
  const {t} = useTranslation('LoginLang');
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
        <AuthHeader heading={t('login')} />

        <Box px={5}>
          <LoginForm />
          <UpdateLanguage onRegister={() => navigation.navigate('Register')} />
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
