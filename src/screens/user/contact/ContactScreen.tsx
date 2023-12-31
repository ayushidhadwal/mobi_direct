import React, {FC, useCallback} from 'react';
import {Image} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Linking} from 'react-native';
import {useTranslation} from 'react-i18next';

import {AuthContactScreenProps, ContactScreenProps} from '../../../navigation';
import {SupportCard} from './components/SupportCard';
import {useContact} from '../../../hooks/user/contact/useContact';
import {Loader} from '../../../components/Loader';

export const ContactScreen: FC<
  ContactScreenProps & AuthContactScreenProps
> = ({}) => {
  const {t} = useTranslation('ContactLang');
  const {contactDetails, isLoading} = useContact();

  const supportNumber = contactDetails?.supportNumber;
  const whatsappNumber = contactDetails?.whatsappNumber;
  const supportEmail = contactDetails?.supportEmail;

  const phoneSupport = useCallback(
    () => Linking.openURL(`tel:${supportNumber}`),
    [supportNumber],
  );

  const mailSupport = useCallback(
    () => Linking.openURL(`mailto:${supportEmail}?subject=${''}&body=${''}`),
    [supportEmail],
  );

  const whatsAppSupport = useCallback(
    () => Linking.openURL(`whatsapp://send?text=${''}&phone=${whatsappNumber}`),
    [whatsappNumber],
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <Image
        source={require('../../../assets/customerLogo.png')}
        alt={'no img'}
        resizeMode={'contain'}
        w={'30%'}
        h={'30%'}
        alignSelf={'center'}
      />
      <SupportCard
        heading={String(t('customerCare'))}
        onPress={phoneSupport}
        icon={'call'}
      />
      <SupportCard
        heading={String(t('sendMail'))}
        onPress={mailSupport}
        icon={'mail'}
      />
      <SupportCard
        heading={String(t('connectOnWhatsapp'))}
        onPress={whatsAppSupport}
        icon={'logo-whatsapp'}
      />
    </SafeAreaView>
  );
};
