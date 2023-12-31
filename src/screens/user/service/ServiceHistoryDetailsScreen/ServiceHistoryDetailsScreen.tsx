import React, {FC} from 'react';
import {Box, Divider, HStack, Pressable, Text} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

import {Loader} from '../../../../components/Loader';
import {DetailsAddress} from '../../order/OrderDetailsScreen/components/DetailsAddress';
import {DetailsRemark} from '../../order/OrderDetailsScreen/components/DetailsRemark';
import {DetailsService} from '../../order/OrderDetailsScreen/components/DetailsService';
import {DetailsAddOn} from '../../order/OrderDetailsScreen/components/DetailsAddOn';
import {PriceSummary} from '../../cart/CartOrderDetailsScreen/components/PriceSummary';
import {useHistoryDetails} from '../../../../hooks/user/history/useHistoryDetails';
import {HistoryAppointmentDetails} from './components/HistoryAppointmentDetails';
import {StarIcon} from './components/AppointmentHistoryReviewForm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {HistoryDetailsScreenProps} from '../../../../navigation';
import {NotFoundError} from '../../../../components/NotFoundError';
import {Linking} from 'react-native';
import Config from '../../../../config';

export const ServiceHistoryDetailsScreen: FC<HistoryDetailsScreenProps> = ({
  route,
}) => {
  const {id} = route.params;
  const {t} = useTranslation('OrderDetailsLang');

  const {details, isLoading} = useHistoryDetails(id);

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
        <Box m={4}>
          <HistoryAppointmentDetails
            item={{
              status: details.status,
              date: details.date,
              serviceStartTime: details.serviceStartTime,
              serviceEndTime: details.serviceEndTime,
              timeSlot: `${details.slotTimeStart} - ${details.slotTimeEnd}`,
              agent: details.agent,
            }}
          />
          <DetailsAddress address={details?.address as string} />
          <DetailsRemark remarks={details.remarks} />
          <DetailsService
            item={{
              status: details.status,
              date: details.date,
              orderID: details.orderNumber,
              vehicleNumber: details.vehicleNumber,
              engineOilName: details.engineOilName,
              engineOilPrice: details.engineOilPrice,
              oilFilterPrice: details.oilFilterPrice,
              oilFilterName: details.oilFilterName,
            }}
          />
          {details.addOn.length > 0 && <DetailsAddOn addOn={details.addOn} />}

          <PriceSummary
            discount={details?.couponDiscount as number}
            total={details?.grandTotal as number}
            subTotal={details?.subTotal as number}
          />

          {details.reviews.comment ? (
            <Box mb={3}>
              <Text fontSize="lg" fontWeight="400">
                {t('yourReview')}
              </Text>
              <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

              <Box
                borderRadius="lg"
                borderWidth={0.5}
                borderColor="#dedede"
                p={3}>
                <HStack space={2} mb={1}>
                  {[1, 2, 3, 4, 5].map(rating => (
                    <StarIcon
                      key={rating}
                      selected={Number(details.reviews.rating) >= rating}
                    />
                  ))}
                </HStack>
                <Text>{details.reviews.comment}</Text>
              </Box>
            </Box>
          ) : null}

          {details.serviceRemarks ? (
            <Box mb={3}>
              <Text fontSize="lg" fontWeight="400">
                {t('agentResponse')}
              </Text>
              <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

              <Text fontWeight="bold">{t('remarks')}</Text>
              {details.serviceRemarks ? (
                <Text mb={3}>{details.serviceRemarks}</Text>
              ) : (
                <Text fontSize="xs" color="gray.400">
                  -- {t('noRemarks')} --
                </Text>
              )}

              <Text fontWeight="bold">{t('attachments')}</Text>
              {details.attachment.length > 0 ? (
                details.attachment.map((attachment, i) => {
                  return (
                    <Pressable
                      onPress={() =>
                        Linking.openURL(Config.API_URL + '/' + attachment)
                      }>
                      <Text underline>
                        {t('attachment')} {i + 1}
                      </Text>
                    </Pressable>
                  );
                })
              ) : (
                <Text fontSize="xs" color="gray.400">
                  -- {t('noAttachments')} --
                </Text>
              )}
            </Box>
          ) : null}
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
