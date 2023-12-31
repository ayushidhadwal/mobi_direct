import React, {FC} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'native-base';
import {useTranslation} from 'react-i18next';

import {AuthNewPasswordProps} from '../../../navigation';
import {NewPasswordForm} from './components/NewPasswordForm';

export const NewPasswordScreen: FC<AuthNewPasswordProps> = ({route}) => {
  const {email, mobileNumber} = route.params;
  const {t} = useTranslation('NewPasswordLang');

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#FFF"
        barStyle="dark-content"
      />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text fontSize="md" fontWeight="600" color="gray.500" mx={5} mt={5}>
          {t('text')}
        </Text>

        <NewPasswordForm mobileNumber={mobileNumber} email={email} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
