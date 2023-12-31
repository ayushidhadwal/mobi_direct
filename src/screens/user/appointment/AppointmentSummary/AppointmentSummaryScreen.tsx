import React, {FC, useState} from 'react';
import {Box, Button, ScrollView} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

import {Loader} from '../../../../components/Loader';
import {useAppointmentDetails} from '../../../../hooks/user/appointment/useApppointmentDetails';
import {CarDetails} from '../../../../components/appointment/CarDetails';
import {AppointmentAddon} from '../../../../components/appointment/AppointmentAddon';
import {AppointmentRemarks} from '../../../../components/appointment/AppointmentRemarks';
import {AppointmentDetails} from '../../../../components/appointment/AppointmentDetails';
import {useMessage} from '../../../../hooks/useMessage';
import {createAppointment} from '../../../../services';
import {AppointmentSummaryScreenProps} from '../../../../navigation';
import {AppointmentAddress} from './components/AppointmentAddress';

export const AppointmentSummaryScreen: FC<AppointmentSummaryScreenProps> = ({
  navigation,
  route,
}) => {
  const {
    date,
    appointmentTimeId,
    appointmentTime,
    orderCode,
    vehicleCode,
    address,
    workshopId,
    workshopName,
    workshopAddress,
    addressId,
  } = route.params;

  const {t} = useTranslation('AppointmentSummaryLang');

  const [loading, setLoading] = useState<boolean>(false);

  const {appointmentDetails, isLoading} = useAppointmentDetails(
    vehicleCode,
    orderCode,
  );

  const setMessage = useMessage();

  const onClickHandler = async () => {
    setLoading(true);
    try {
      await createAppointment({
        appointmentTimeId: String(appointmentTimeId),
        orderCode,
        vehicleCode,
        date,
        WorkShopId: workshopId as number,
        addressId: addressId as number,
      });
      setMessage(String(t('appointmentSuccessful')));
      navigation.navigate('Appointment');
    } catch (e: any) {
      setMessage(e.message);
    }
    setLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box m={4}>
          <AppointmentAddress
            address={
              workshopAddress
                ? `${workshopName},\n${workshopAddress}`
                : (address as string)
            }
          />

          <CarDetails
            vehicleNumberPlate={appointmentDetails?.vehicleNumberPlate}
            engineOil={appointmentDetails?.engineOil}
            oilFilter={appointmentDetails?.oilFilter}
          />

          {appointmentDetails !== undefined &&
            appointmentDetails?.addOn.length > 0 && (
              <AppointmentAddon addOnList={appointmentDetails?.addOn} />
            )}
          {appointmentDetails?.remarks && (
            <AppointmentRemarks remarks={appointmentDetails?.remarks} />
          )}

          <AppointmentDetails
            orderCode={orderCode}
            date={date}
            appointmentTime={appointmentTime}
          />
        </Box>
      </ScrollView>
      <Box m={4}>
        <Button
          onPress={onClickHandler}
          colorScheme={'secondary'}
          size="lg"
          isLoading={loading}
          isDisabled={loading}
          borderRadius={'full'}>
          {t('confirmAppointment')}
        </Button>
      </Box>
    </SafeAreaView>
  );
};
