import React, {FC, useCallback, useEffect} from 'react';
import {Box, Divider, HStack, Text, VStack} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';

import {Loader} from '../../../components/Loader';
import {CardTextRow} from '../../../components/common/CardTextRow';
import {useAgentCompleteDetails} from '../../../hooks/agent/useAgentCompleteDetails';
import {StarIcon} from '../../user/service/ServiceHistoryDetailsScreen/components/AppointmentHistoryReviewForm';
import {AgentHistoryDetailScreenProps} from '../../../navigation';
import {NotFoundError} from '../../../components/NotFoundError';

const AgentHistoryDetailScreen: FC<AgentHistoryDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const id = route.params.id;

  const {t} = useTranslation('HistoryDetailLang');

  const {mutate, isLoading, details} = useAgentCompleteDetails(String(id));

  const getPendingRequests = useCallback(async () => {
    await mutate();
  }, [mutate]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getPendingRequests);

    return () => {
      unsubscribe();
    };
  }, [getPendingRequests, mutate, navigation]);

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
          <VStack space={2} shadow={1} borderRadius="lg" bg="#FFF" mb={3} p={4}>
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

          <VStack space={2} shadow={1} borderRadius="lg" bg="#FFF" mb={3} p={4}>
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

          <VStack space={2} shadow={1} borderRadius="lg" bg="#FFF" mb={3} p={4}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="md" fontWeight="400">
                {t('serviceDetails')}
              </Text>
            </HStack>
            <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

            <CardTextRow
              heading={t('startedAt')}
              value={details?.serviceStartTime}
            />
            <CardTextRow
              heading={t('completedAt')}
              value={details?.serviceEndTime}
            />
            <CardTextRow
              heading={t('remarks')}
              value={details?.serviceRemarks ? details?.serviceRemarks : 'NIL'}
            />
            <CardTextRow heading={t('mileage')} value={details?.mileage} />
          </VStack>

          {details?.reviews.comment && (
            <VStack
              space={1}
              shadow={1}
              borderRadius="lg"
              bg="#FFF"
              mb={3}
              p={4}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="md" fontWeight="400">
                  {t('userReview')}
                </Text>
              </HStack>
              <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

              <Box>
                <HStack space={2} mb={1}>
                  {[1, 2, 3, 4, 5].map(rating => (
                    <StarIcon
                      key={rating}
                      selected={Number(details?.reviews?.rating) >= rating}
                    />
                  ))}
                </HStack>
                <Text>{details?.reviews?.comment}</Text>
              </Box>
            </VStack>
          )}
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AgentHistoryDetailScreen;
