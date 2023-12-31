import {Box, Image, Text} from 'native-base';
import React, {FC} from 'react';
import {Dimensions} from 'react-native';
import {useTranslation} from 'react-i18next';

const {height} = Dimensions.get('window');

const HEIGHT = (height * 25) / 100;

const LOGO_IMG = require('../../../../assets/logonew.png');

type Props = {
  heading: string;
};

export const AuthHeader: FC<Props> = ({heading}) => {
  const {t} = useTranslation('LoginLang');
  return (
    <>
      <Box h={HEIGHT} overflow="hidden" alignItems="center">
        <Image
          source={LOGO_IMG}
          h="full"
          w="full"
          alt="Logo"
          resizeMode="contain"
        />
      </Box>

      <Box px={5}>
        <Text fontWeight="900" fontSize="2xl" color="primary.500">
          {heading}
        </Text>
        <Text fontSize="md" fontWeight="600" color="gray.500">
          {t('hello')}
        </Text>
      </Box>
    </>
  );
};
