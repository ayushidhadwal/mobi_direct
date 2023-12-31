import {Box, Image, Text} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions} from 'react-native';

const ERROR_IMG = require('../assets/Error.png');

const {height, width} = Dimensions.get('window');

export const NotFoundError = () => {
  const {t} = useTranslation('CartOrderLang');
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Image
        source={ERROR_IMG}
        alt="Error"
        resizeMode="contain"
        w={width - 100}
        height={height / 2.5}
        mb={3}
      />
      <Text fontSize="md" color="danger.500" bold>
        {t('somethingWentWrong')}
      </Text>
      <Text color="muted.400" bold>
        {t('tryAgain')}
      </Text>
    </Box>
  );
};
