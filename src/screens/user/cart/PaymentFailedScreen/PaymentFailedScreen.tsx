import React, {FC} from 'react';
import {Dimensions} from 'react-native';
import {Box, Button, Icon, Image, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import {PaymentFailedScreenProps} from '../../../../navigation';
import {useUserCart} from '../../../../hooks/user/cart/useUserCart';

const IMG = require('../../../../../assets/payment/payment-failed.jpg');

const {height, width} = Dimensions.get('window');

export const PaymentFailedScreen: FC<PaymentFailedScreenProps> = ({
  navigation,
}) => {
  const {} = useUserCart();
  const onConfirm = () => navigation.replace('Cart');
  const {t} = useTranslation('PaymentLang');

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text fontSize="2xl" bold>
        {t('ohSnap')}
      </Text>
      <Image
        source={IMG}
        alt="Success"
        resizeMode="contain"
        w={width - 100}
        height={height / 2.5}
        mb={3}
      />
      <Text fontSize="lg" bold color="black" mb={3}>
        {t('incorrect')}
      </Text>
      <Text fontSize="sm" color="danger.700" mb={3}>
        {t('failed')}
      </Text>
      <Button
        onPress={onConfirm}
        colorScheme="primary"
        endIcon={<Icon as={Ionicons} name="md-reload" size="sm" />}>
        {t('tryAgain')}
      </Button>
    </Box>
  );
};
