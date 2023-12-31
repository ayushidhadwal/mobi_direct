import React, {FC, useState} from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  HStack,
  Input,
  Text,
} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';

import {useMessage} from '../../../../hooks/useMessage';
import {startPendingRequest} from '../../../../services/agent/startPendingRequest';
import {AgentStartRequestOTPScreenProps} from '../../../../navigation';

export const AgentStartRequestOTPScreen: FC<
  AgentStartRequestOTPScreenProps
> = ({navigation, route}) => {
  const id = route.params.id;

  const {t} = useTranslation('PendingDetailLang');

  const [serviceOTP, setServiceOTP] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setMessage = useMessage();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await startPendingRequest({
        OTP: Number(serviceOTP),
        id: id,
      });
      setIsSubmitting(false);
      navigation.goBack();
    } catch (e: any) {
      setIsSubmitting(false);
      setMessage(e.message);
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Box flex={1} m={4}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="md" fontWeight="400" color="primary.600">
              {t('askOTP')}
            </Text>
          </HStack>
          <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

          <FormControl w="100%">
            <FormControl.Label>{t('startOTP')}</FormControl.Label>
            <Input
              onChangeText={setServiceOTP}
              value={serviceOTP}
              keyboardType="number-pad"
              maxLength={6}
              placeholder={String(t('enterOTP'))}
              focusOutlineColor={'primary.400'}
              size="lg"
              mb="4"
            />
          </FormControl>
        </Box>
      </KeyboardAwareScrollView>
      <Box p={4}>
        <Button
          isLoading={isSubmitting}
          disabled={!serviceOTP || isSubmitting}
          onPress={handleSubmit}
          colorScheme="secondary"
          size="lg"
          borderRadius="lg">
          {t('startWorking')}
        </Button>
      </Box>
    </SafeAreaView>
  );
};
