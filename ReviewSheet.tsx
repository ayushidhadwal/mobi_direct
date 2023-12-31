import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import {Box, Divider, Text, VStack} from 'native-base';
import {Keyboard} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {AppointmentHistoryReviewForm} from './src/screens/user/service/ServiceHistoryDetailsScreen/components/AppointmentHistoryReviewForm';
import {postUserReview} from './src/services/history/postUserReview';

function ReviewSheet({
  sheetId,
  payload,
}: SheetProps<{
  orderNumber: string;
  appointmentId: number;
  agentId: number;
  onSubmit: () => void;
}>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState('5');
  const [error, setError] = useState('');

  const {t} = useTranslation('OrderDetailsLang');

  const ref = useRef<ActionSheetRef>(null);

  const handleSubmit = useCallback(async () => {
    Keyboard.dismiss();
    if (!userReview) {
      setError(t('reviewIsRequired') as string);
      return;
    }

    try {
      setIsSubmitting(true);

      await postUserReview({
        comment: userReview,
        rating: Number(userRating),
        orderNumber: String(payload?.orderNumber),
        appointmentId: Number(payload?.appointmentId),
        agentId: Number(payload?.agentId),
      });
      payload?.onSubmit();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsSubmitting(false);
    }
  }, [payload, t, userRating, userReview]);

  return (
    <ActionSheet
      ref={ref}
      id={sheetId}
      closeOnTouchBackdrop={false}
      closeOnPressBack={false}>
      <Box p={5}>
        <VStack mb={5}>
          <Text fontSize="lg" fontWeight="bold">
            {t('giveFeedback')}
          </Text>
          <Text fontSize="sm">
            {t('appointmentId')}:{' '}
            <Text color="primary.400">#${payload?.orderNumber}</Text>
          </Text>
          <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />
        </VStack>

        {error ? (
          <Text color={'red.400'} mb={3}>
            <Text fontWeight="bold">{t('error')}: </Text>
            {error}
          </Text>
        ) : null}
        <AppointmentHistoryReviewForm
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          userReview={userReview}
          setUserReview={setUserReview}
          userRating={userRating}
          setUserRating={setUserRating}
        />
      </Box>
    </ActionSheet>
  );
}

export default ReviewSheet;
