import React, {FC, useCallback, useEffect, useState} from 'react';
import {Button, ChevronRightIcon} from 'native-base';
import {useTranslation} from 'react-i18next';
import {useStripe} from '@stripe/stripe-react-native';
import {useNavigation} from '@react-navigation/native';
import {useUserProfile} from '../../../../../hooks/user/useUserProfile';
import {getPaymentSheetParams} from '../../../../../services/payment/getPaymentSheetParams';
import {useMessage} from '../../../../../hooks/useMessage';
import {UserNavigationProps} from '../../../../../navigation';
import {verifyPayment} from '../../../../../services/payment/verifyPayment';

type Props = {
  amount: string;
  remarks: string;
  addressId: number;
  coupon: string;
};

export const StripePaymentGateway: FC<Props> = ({
  amount,
  remarks,
  coupon,
  addressId,
}) => {
  const {profile} = useUserProfile();
  const {t} = useTranslation('CartOrderLang');

  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState<boolean>(true);
  const [noError, setNoError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');
  const [paymentIntent, setPaymentIntent] = useState('');
  const [ephemeralKey, setEphemeralKey] = useState('');
  const [customer, setCustomer] = useState('');

  const initializePaymentSheet = useCallback(async () => {
    setLoading(true);
    setErrMsg('');

    try {
      const res = await getPaymentSheetParams({coupon, remarks, addressId});

      setPaymentIntent(res.paymentIntent);
      setEphemeralKey(res.ephemeralKey);
      setCustomer(res.customer);

      const {error} = await initPaymentSheet({
        merchantDisplayName: 'Mobi Direct',
        customerId: res.customer,
        customerEphemeralKeySecret: res.ephemeralKey,
        paymentIntentClientSecret: res.paymentIntent,
        allowsDelayedPaymentMethods: false,
        defaultBillingDetails: {
          name: profile?.name,
          address: {country: 'MY'},
        },
      });

      if (!error) {
        setNoError(true);
      }
    } catch (e: any) {
      setErrMsg('Unable to load payment gateway.');
    } finally {
      setLoading(false);
    }
  }, [addressId, coupon, initPaymentSheet, profile?.name, remarks]);

  const setMessage = useMessage();
  const navigation = useNavigation<UserNavigationProps>();

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      setMessage(error.message);
    } else {
      try {
        setLoading(true);
        const paymentId = await verifyPayment({
          paymentIntent,
          ephemeralKey,
          customer,
          addressId,
          remarks,
          coupon,
          amount,
        });
        setLoading(false);
        navigation.replace('PaymentSuccess', {
          transactionId: paymentId,
        });
      } catch (e: any) {
        setLoading(false);
        navigation.replace('PaymentFailed');
      }
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, [initializePaymentSheet]);

  return (
    <Button
      size="lg"
      isLoading={loading}
      isDisabled={loading || !noError}
      endIcon={<ChevronRightIcon size="md" />}
      onPress={openPaymentSheet}
      colorScheme="secondary"
      rounded="full">
      {errMsg ? errMsg : t('pay')}
    </Button>
  );
};
