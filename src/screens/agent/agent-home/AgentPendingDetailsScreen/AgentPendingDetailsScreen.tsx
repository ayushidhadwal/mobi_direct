import React, {FC, useCallback, useEffect} from 'react';
import {Box, Button, Divider, HStack, Text, VStack} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';

import {Loader} from '../../../../components/Loader';
import {useAgentPendingRequestsDetails} from '../../../../hooks/agent/useAgentPendingRequestDetails';
import {CardTextRow} from '../../../../components/common/CardTextRow';
import {AgentPendingDetailsScreenProps} from '../../../../navigation';
import {NotFoundError} from '../../../../components/NotFoundError';

enum Status {
  WORKING = 'Start Working',
  COMPLETE = 'Complete Appointment',
}

export const AgentPendingDetailsScreen: FC<AgentPendingDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const id = route.params.pendingId;

  const {t} = useTranslation('PendingDetailLang');

  const {mutate, isLoading, details} = useAgentPendingRequestsDetails(
    String(id),
  );

  const getPendingRequests = useCallback(async () => {
    await mutate();
  }, [mutate]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getPendingRequests);

    return () => {
      unsubscribe();
    };
  }, [getPendingRequests, mutate, navigation]);

  const getAppointmentStatus = (): string => {
    if (!details?.serviceStartTime && !details?.serviceStartTime) {
      return Status.WORKING;
    } else {
      return Status.COMPLETE;
    }
  };

  const handleSubmitQR = () => {
    navigation.navigate('AgentEndRequestQR', {
      id: id,
      remarks: '',
      files: [],
      mileage: '',
    });
  };

  const handleSubmitOTP = () => {
    const status = getAppointmentStatus();
    if (status === Status.WORKING) {
      navigation.navigate('AgentStartRequestOTP', {
        id: id,
      });
    } else {
      navigation.navigate('AgentEndRequestOTP', {
        id: id,
      });
    }
  };

  const handleSubmit = () => {
    navigation.navigate('AgentEndRequestOTP', {
      id: id,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!details?.id) {
    return <NotFoundError />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Box flex={1} m={4}>
          <VStack space={1} shadow={1} borderRadius="lg" bg="#FFF" mb={3} p={4}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="md" fontWeight="400">
                {t('appointmentDetails')}
              </Text>
            </HStack>
            <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

            <CardTextRow
              heading={t('orderID')}
              value={
                <Text fontWeight="bold" color="primary.400">
                  {details?.orderNumber}
                </Text>
              }
            />
            <CardTextRow heading={t('date')} value={details?.bookingDate} />
            <CardTextRow
              heading={t('slotTime')}
              value={`${details?.slotTimeStart} - ${details?.slotTimeEnd}`}
            />
            <CardTextRow
              heading={t('vehicleNumber')}
              value={details?.vehicleNumber}
            />
            <Divider backgroundColor={'#f6f6f6'} my={2} />
            <CardTextRow heading={t('name')} value={details?.userName} />
            <CardTextRow
              heading={t('mobileNumber')}
              value={details?.userMobileNumber}
            />
            <CardTextRow heading={t('location')} value={details?.address} />
            <CardTextRow
              heading={t('remarks')}
              value={details?.remarks ? details?.remarks : 'NIL'}
            />
          </VStack>

          <VStack space={1} shadow={1} borderRadius="lg" bg="#FFF" mb={3} p={4}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="md" fontWeight="400">
                {t('orderDetails')}
              </Text>
            </HStack>
            <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

            {details?.engineOilName && (
              <CardTextRow
                heading={t('engineOil')}
                value={details?.engineOilName}
              />
            )}

            {details?.oilFilterName && (
              <CardTextRow
                heading={t('oilFilter')}
                value={details?.oilFilterName}
              />
            )}

            {details.addOn.length > 0 && (
              <>
                <Divider backgroundColor={'#f6f6f6'} my={2} />
                {details.addOn.map((item, index) => (
                  <HStack key={item.id} space={2}>
                    <Box>
                      <Text color="gray.500" fontWeight="400" flexShrink={1}>
                        {index + 1}.
                      </Text>
                    </Box>
                    <Box flex={2}>
                      <Text
                        textTransform="capitalize"
                        color="gray.500"
                        fontWeight="400"
                        flexShrink={1}>
                        {item.title}
                      </Text>
                    </Box>
                    <Box flex={0.5} alignItems="flex-end">
                      <Text color="gray.600" fontWeight="400" flexShrink={1}>
                        x{item.qty}
                      </Text>
                    </Box>
                  </HStack>
                ))}
              </>
            )}
          </VStack>
        </Box>
      </KeyboardAwareScrollView>
      <Box p={4}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="md" fontWeight="400">
            {getAppointmentStatus()}
          </Text>
        </HStack>
        <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

        {getAppointmentStatus() === Status.WORKING ? (
          <HStack space={2}>
            <Button
              flex={1}
              onPress={handleSubmitOTP}
              colorScheme="secondary"
              size="lg"
              borderRadius="lg">
              {t('enterOTP')}
            </Button>
            <Button
              flex={1}
              onPress={handleSubmitQR}
              colorScheme="secondary"
              size="lg"
              borderRadius="lg">
              {t('scanQR')}
            </Button>
          </HStack>
        ) : (
          <Button
            onPress={handleSubmit}
            colorScheme="success"
            size="lg"
            borderRadius="lg">
            {t('completeRequest')}
          </Button>
        )}
      </Box>
    </SafeAreaView>
  );
};
