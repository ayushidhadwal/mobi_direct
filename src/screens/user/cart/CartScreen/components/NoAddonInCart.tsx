import React from 'react';
import {Box, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {UserNavigationProps} from '../../../../../navigation';

export const NoAddonInCart = () => {
  const navigation = useNavigation<UserNavigationProps>();

  const onPress = () => navigation.navigate('AddOn');

  const {t} = useTranslation('CartLang')

  return (
    <Box shadow={1} bg="#FFF" borderRadius={5} mb={3} p={3}>
      <Text color="warning.400" bold textAlign="center" mb={3}>
          {t("additionalOrder")}
      </Text>
      <Text
        onPress={onPress}
        fontSize="md"
        underline
        bold
        color="primary.700"
        textAlign="center">
          {t("pressAddOn")}
      </Text>
    </Box>
  );
};
