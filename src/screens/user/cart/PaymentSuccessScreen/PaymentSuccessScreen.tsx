import React, {FC} from 'react';
import {Dimensions} from 'react-native';
import {Box, Button, Icon, Image, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import {PaymentSuccessScreenProps} from '../../../../navigation';
import {useUserCart} from '../../../../hooks/user/cart/useUserCart';

const IMG = require('../../../../../assets/payment/order-confirm.jpg');

const {height, width} = Dimensions.get('window');

export const PaymentSuccessScreen: FC<PaymentSuccessScreenProps> = ({
  navigation,
  route: {
    params: {transactionId},
  },
}) => {
  const {mutate} = useUserCart();
  const {t} = useTranslation('PaymentLang');

  const onConfirm = async () => {
    await mutate([]);
    navigation.navigate('BottomTabs', {
      screen: 'Orders',
    });
  };

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Image
        source={IMG}
        alt="Success"
        resizeMode="contain"
        w={width - 100}
        height={height / 2.5}
        mb={3}
      />
      <Text fontSize="2xl" bold>
        {t('thanks')}
      </Text>
      <Text fontSize="md" color="success.700">
        {t('success')}
      </Text>
      <Text mb={3} color="gray.400">
        {t('id')} #{transactionId}
      </Text>
      <Button
        onPress={onConfirm}
        colorScheme="primary"
        endIcon={<Icon as={Ionicons} name="md-arrow-forward" size="sm" />}>
        {t('continue')}
      </Button>
    </Box>
  );
};
