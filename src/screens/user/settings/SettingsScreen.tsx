import React, {FC, useCallback, useState} from 'react';
import {Box, VStack} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {Linking} from 'react-native';

import {SettingsCard} from '../../../components/settings/SettingsCard';
import Config from '../../../config';
import {LanguageModel} from '../../auth/LoginScreen/components/LanguageModel';
import {SettingsScreenProps} from '../../../navigation';
import {useLogout} from '../../../hooks/useLogout';

const SettingScreen: FC<SettingsScreenProps> = ({navigation}) => {
  const {t} = useTranslation('SettingsLang');

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

  const logout = useLogout();

  return (
    <Box flex="1">
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <VStack m={3}>
          <SettingsCard
            name={t('update')}
            iconName="person"
            icon={Ionicons}
            onPress={() => navigation.navigate('UpdateProfile')}
          />
          <SettingsCard
            name={t('addressBook')}
            iconName="building"
            icon={FontAwesome}
            onPress={() => navigation.navigate('Address')}
          />
          <SettingsCard
            name={t('updatePassword')}
            iconName="mobile1"
            icon={AntDesign}
            onPress={() => navigation.navigate('UpdatePassword')}
          />
          <SettingsCard
            name={t('notification')}
            iconName="md-notifications"
            icon={Ionicons}
            onPress={() => navigation.navigate('Notifications')}
          />
          <SettingsCard
            name={t('coupon')}
            iconName="new-releases"
            icon={MaterialIcons}
            onPress={() => navigation.navigate('Coupon')}
          />
          <SettingsCard
            name={t('refer')}
            iconName="share"
            icon={Entypo}
            onPress={() => navigation.navigate('Refer')}
          />
          <SettingsCard
            name={t('vehicles')}
            iconName="car"
            icon={FontAwesome5}
            onPress={() => navigation.navigate('Vehicles')}
          />
          <SettingsCard
            name={t('contact')}
            iconName="headset"
            icon={FontAwesome5}
            onPress={() => navigation.navigate('Contact')}
          />
          <SettingsCard
            name={t('privacy')}
            iconName="account-lock"
            icon={MaterialCommunityIcons}
            onPress={openPrivacyPolicy}
          />
          <SettingsCard
            name={t('terms')}
            iconName="text-document"
            icon={Entypo}
            onPress={openTermsAndConditions}
          />
          <SettingsCard
            name={t('language')}
            iconName="language"
            icon={Ionicons}
            onPress={changeLanguage}
          />
          <LanguageModel showModal={showModal} toggleModal={changeLanguage} />
          <SettingsCard
            name={t('transactions')}
            iconName="credit-card"
            icon={SimpleLineIcons}
            onPress={() => navigation.navigate('Transaction')}
          />
          <SettingsCard
            name={t('faq')}
            iconName="help-circle"
            icon={Ionicons}
            onPress={() => navigation.navigate('Faq')}
          />
          <SettingsCard
            danger
            name={t('deleteAccount')}
            iconName="warning-outline"
            icon={Ionicons}
            onPress={() => navigation.navigate('DeleteAccount')}
          />
          <SettingsCard
            name={t('logout')}
            iconName="logout"
            icon={SimpleLineIcons}
            onPress={logout}
            logout
          />
        </VStack>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default SettingScreen;
