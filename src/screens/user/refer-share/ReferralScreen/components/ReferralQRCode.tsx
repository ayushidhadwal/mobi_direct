import {Box, Button, Input} from 'native-base';
import React, {FC} from 'react';
import {Dimensions} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useTranslation} from 'react-i18next';
import QRCode from 'react-native-qrcode-svg';

import {useMessage} from '../../../../../hooks/useMessage';

const {height} = Dimensions.get('window');

const HEIGHT = (height * 25) / 100;

type Props = {
  link: string;
};

export const ReferralQRCode: FC<Props> = ({link}) => {
  const {t} = useTranslation('ReferLang');
  const setMessage = useMessage();

  const copyToClipboard = () => {
    Clipboard.setString(link);
    setMessage(String(t('linkCopied')));
  };

  return (
    <Box alignItems="center">
      <QRCode value={link} size={HEIGHT} />

      <Input
        mt={4}
        editable={false}
        variant="rounded"
        value={link}
        InputRightElement={
          <Button
            borderLeftRadius={0}
            onPress={copyToClipboard}
            variant={'ghost'}
            roundedRight="md">
            {t('copy')}
          </Button>
        }
      />
    </Box>
  );
};
