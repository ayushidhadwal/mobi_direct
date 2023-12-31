import React, {FC} from 'react';
import {Box, Text} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';
import {FormikHelpers} from 'formik';
import {Keyboard} from 'react-native';

import {PaymentGatewayScreenProps} from '../../../../navigation';
import {PaymentForm} from './components/PaymentForm';
import {CardDTO} from '../../../../services';
import {useMessage} from '../../../../hooks/useMessage';
import {makePayment} from '../../../../services/payment/makePayment';

export const PaymentGatewayScreen: FC<PaymentGatewayScreenProps> = ({
  navigation,
  route: {
    params: {coupon, addressId, remarks, amount},
  },
}) => {
  const {t} = useTranslation('PaymentLang');

  const setMessage = useMessage();

  const onSubmitHandler = async (
    values: CardDTO,
    {resetForm, setSubmitting}: FormikHelpers<any>,
  ) => {
    try {
      Keyboard.dismiss();
      const result = await makePayment(values, coupon, addressId, remarks);
      resetForm();
      setSubmitting(false);
      if (result) {
        navigation.replace('PaymentSuccess', {
          transactionId: result,
        });
      } else {
        navigation.replace('PaymentFailed');
      }
    } catch (e: any) {
      setSubmitting(false);
      setMessage(e.message);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      edges={['bottom']}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Box backgroundColor={'primary.400'} p={12} alignItems={'center'}>
          <Text fontSize="2xl" bold color={'white'}>
            {t('total')}: RM {amount.toFixed(2)}
          </Text>
        </Box>
        <Box
          backgroundColor={'white'}
          shadow={3}
          mx={4}
          py={4}
          mt={-6}
          mb={5}
          borderRadius={20}>
          <PaymentForm onSubmit={onSubmitHandler} />
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
