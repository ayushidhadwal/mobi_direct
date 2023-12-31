import React, {FC, useCallback, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {Linking} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Box} from 'native-base';

import Config from '../../../../config';
import {SettingsItem} from './components/SettingsItem';
import {AgentSettingScreenProps} from '../../../../navigation';
import {useLogout} from '../../../../hooks/useLogout';
import {LanguageModel} from '../../../auth/LoginScreen/components/LanguageModel';

export const AgentSettingsScreen: FC<AgentSettingScreenProps> = ({
  navigation,
}) => {
  const {t} = useTranslation('AgentSettingLang');

  const [showModal, setShowModal] = useState<boolean>(false);

  const changeLanguage = () => setShowModal(!showModal);

  const openPrivacyPolicy = useCallback(
    () => Linking.openURL(Config.API_URL + Config.privacyPolicyUrl),
    [],
  );

  const openTermsAndConditions = useCallback(
    () => Linking.openURL(Config.API_URL + Config.termsAndConditionsUrl),
    [],
  );

  const openAboutUs = useCallback(
    () => Linking.openURL(Config.API_URL + Config.aboutUsUrl),
    [],
  );

  const logout = useLogout();

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <Box px={4}>
        <SettingsItem
          label={t('update')}
          icon={Ionicons}
          iconName="md-lock-open-outline"
          onPressHandler={() => navigation.navigate('AgentUpdatePassword')}
        />
        <SettingsItem
          label={t('notification')}
          icon={Ionicons}
          iconName="md-notifications-outline"
          onPressHandler={() => navigation.navigate('Notifications')}
        />
        <SettingsItem
          label={t('about')}
          icon={Ionicons}
          iconName="md-information-circle-outline"
          onPressHandler={openAboutUs}
        />
        <SettingsItem
          label={t('privacy')}
          icon={Ionicons}
          iconName="md-shield-checkmark-outline"
          onPressHandler={openPrivacyPolicy}
        />
        <SettingsItem
          label={t('terms')}
          icon={Ionicons}
          iconName="md-document-text-outline"
          onPressHandler={openTermsAndConditions}
        />
        <SettingsItem
          label={t('language')}
          icon={Ionicons}
          iconName="md-language"
          onPressHandler={changeLanguage}
        />
        <LanguageModel showModal={showModal} toggleModal={changeLanguage} />
        <SettingsItem
          label={t('logout')}
          icon={Ionicons}
          iconName="md-log-in-outline"
          logout
          onPressHandler={logout}
        />
      </Box>
    </SafeAreaView>
  );
};
