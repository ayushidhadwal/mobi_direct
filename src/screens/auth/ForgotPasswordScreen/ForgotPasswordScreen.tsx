import React, {FC} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Fab, Icon, Text} from 'native-base';
import {useTranslation} from 'react-i18next';

import {
  AuthForgotPasswordProps,
  UserNavigationProps,
} from '../../../navigation';
import {ForgotPasswordForm} from './components/ForgotPasswordForm';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const ForgotPasswordScreen: FC<AuthForgotPasswordProps> = ({}) => {
  const {t} = useTranslation('ForgotPasswordLang');
  const navigation = useNavigation<UserNavigationProps>();

  const {bottom} = useSafeAreaInsets();

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
          {t('heading')}
        </Text>

        <ForgotPasswordForm />
      </KeyboardAwareScrollView>
      <Fab
        bottom={bottom ? bottom : 10}
        onPress={() => navigation.navigate('Contact')}
        renderInPortal={false}
        shadow={2}
        placement="bottom-right"
        size="sm"
        icon={<Icon color="white" as={FontAwesome5} name="headset" size="4" />}
        label={String(t('CustomerSupport'))}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
