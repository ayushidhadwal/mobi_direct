import React, {FC, useEffect, useState} from 'react';
import {
  Box,
  Text,
  Button,
  Pressable,
  HStack,
  Divider,
  ScrollView,
} from 'native-base';
import {Calendar} from 'react-native-calendars';
import {useTranslation} from 'react-i18next';
import {format} from 'date-fns';
import {ActivityIndicator, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useAvailableSlots} from '../../../../hooks/user/appointment/useAvailableSlots';
import {RescheduleScreenProps} from '../../../../navigation';
import {useMessage} from '../../../../hooks/useMessage';
import {rescheduleAppointment} from '../../../../services';

const {width} = Dimensions.get('window');
const WIDTH = (width * 40) / 100;

export const RescheduleScreen: FC<RescheduleScreenProps> = ({
  route,
  navigation,
}) => {
  const {orderNumber} = route.params;

  const {t} = useTranslation('DateTimeLang');

  const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [appointmentTimeId, setAppointmentTimeId] = useState<number>(0);
  const [appointmentTime, setAppointmentTime] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const {availableSlots, isLoading, trigger} = useAvailableSlots();

  useEffect(() => {
    (async () => {
      await trigger(date);
    })();
  }, [date, trigger]);

  const setMessage = useMessage();

  const submitForm = async () => {
    try {
      setLoading(true);
      await rescheduleAppointment({
        appointmentTimeId,
        date,
        orderCode: orderNumber,
      });
      setLoading(false);
      setMessage('Success!');
      navigation.goBack();
    } catch (e: any) {
      setLoading(false);
      setMessage(e.message);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <ScrollView>
        <Box flex={1}>
          <Calendar
            initialDate={date}
            minDate={format(new Date(), 'yyyy-MM-dd')}
            onDayPress={day => {
              setAppointmentTimeId(0);
              setAppointmentTime('');
              setDate(day.dateString);
            }}
            disableAllTouchEventsForDisabledDays={true}
            hideExtraDays={true}
            enableSwipeMonths={true}
          />

          <Box alignItems="center" my={2}>
            <Text textAlign={'left'} fontSize="lg">
              {t('available')}
            </Text>
            <Divider w={'20%'} backgroundColor={'primary.800'} mb={3} />
          </Box>

          {isLoading ? (
            <Box flex={0.5}>
              <ActivityIndicator />
            </Box>
          ) : (
            <HStack flexWrap="wrap" mx={4} mb={4}>
              {availableSlots?.map(m => (
                <Pressable
                  key={String(m.id)}
                  flexGrow={1}
                  flexBasis={String(WIDTH)}
                  m={2}
                  onPress={() => {
                    if (!m.bookStatus) {
                      setAppointmentTimeId(m.id);
                      setAppointmentTime(m.timeSlot);
                    }
                  }}
                  backgroundColor={
                    m.bookStatus
                      ? 'red.500'
                      : appointmentTimeId === m.id
                      ? 'primary.800'
                      : 'primary.300'
                  }
                  borderRadius={'full'}
                  p={2}>
                  <Text textAlign={'center'} color={'white'}>
                    {m.timeSlot}
                  </Text>
                </Pressable>
              ))}
            </HStack>
          )}

          {appointmentTimeId === 0 ? (
            <Text my={2} textAlign="center" fontSize="sm" color="red.500">
              {t('continue')}
            </Text>
          ) : (
            <Text my={2} textAlign="center" fontSize="sm" color="primary.700">
              {appointmentTime}
            </Text>
          )}

          <Button
            isLoading={loading}
            isDisabled={appointmentTimeId === 0 || loading}
            colorScheme={'secondary'}
            size="lg"
            borderRadius="full"
            m={4}
            onPress={submitForm}>
            {t('proceed')}
          </Button>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
