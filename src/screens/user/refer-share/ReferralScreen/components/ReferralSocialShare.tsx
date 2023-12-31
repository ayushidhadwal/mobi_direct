import React, {FC} from 'react';
import {Button, Icon} from 'native-base';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
  onShare: () => void;
};

export const ReferralSocialShare: FC<Props> = ({onShare}) => {
  const {t} = useTranslation('ReferLang');

  return (
    <Button
      onPress={onShare}
      leftIcon={<Icon as={AntDesign} name="sharealt" size="sm" />}
      w={'50%'}
      alignSelf={'center'}
      my={5}>
      {t('share')}
    </Button>
  );
};
