import React, {FC} from 'react';
import {Box, ScrollView, Text} from 'native-base';
import {SvgUri} from 'react-native-svg';
import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

import {usePendingAppointmentDetails} from '../../../../hooks/user/appointment/usePendingAppointmentDetails';
import {Loader} from '../../../../components/Loader';
import {CarDetails} from '../../../../components/appointment/CarDetails';
import {AppointmentAddon} from '../../../../components/appointment/AppointmentAddon';
import {AppointmentRemarks} from '../../../../components/appointment/AppointmentRemarks';
import {AppointmentDetails} from '../../../../components/appointment/AppointmentDetails';
import {AppointmentQRDetails} from '../../../../components/appointment/AppointmentQRDetails';
import Config from '../../../../config';
import {AppointmentDetailScreenProps} from '../../../../navigation';
import {NotFoundError} from '../../../../components/NotFoundError';
import {AppointmentAddress} from '../AppointmentSummary/components/AppointmentAddress';

const {height} = Dimensions.get('window');

const HEIGHT = (height * 25) / 100;

export const AppointmentDetailScreen: FC<AppointmentDetailScreenProps> = ({
  route,
}) => {
  const itemId = route.params.itemId;

  const {t} = useTranslation('AppointmentSummaryLang');

  const {pendingAppointmentDetails, isLoading} = usePendingAppointmentDetails(
    String(itemId),
  );

  const getBookingStatus = () => {
    const status: {
      status: string;
      QRCode: string;
      OTP: string;
    } = {
      status: '',
      QRCode: '',
      OTP: '',
    };

    if (
      pendingAppointmentDetails?.agent &&
      !pendingAppointmentDetails?.serviceStartTime
    ) {
      status.status = 'Assigned';
      status.QRCode =
        Config.API_URL + '/' + pendingAppointmentDetails?.startQRCode;
      status.OTP = pendingAppointmentDetails?.startOTP;
    } else if (
      pendingAppointmentDetails?.serviceStartTime &&
      !pendingAppointmentDetails?.serviceEndTime
    ) {
      status.status = 'Work in progress';
      status.QRCode =
        Config.API_URL + '/' + pendingAppointmentDetails?.endQRCode;
      status.OTP = pendingAppointmentDetails?.endOTP;
    } else {
      status.status = 'Pending';
      status.QRCode = '';
      status.OTP = '';
    }

    return status;
  };

  const status = getBookingStatus();

  if (isLoading) {
    return <Loader />;
  }

  if (!pendingAppointmentDetails?.id) {
    return <NotFoundError />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <ScrollView flex={1} mx={5} mb={15} showsVerticalScrollIndicator={false}>
        {status.QRCode && (
          <Box>
            <Text
              fontWeight={'400'}
              fontSize={'md'}
              textAlign={'center'}
              mt={4}>
              {t('qrCode')}
            </Text>
            <SvgUri width="100%" height={HEIGHT} uri={status.QRCode} />

            <Text
              fontWeight={'400'}
              fontSize={'md'}
              mt={3}
              textAlign={'center'}
              color={'gray.400'}>
              {t('show')}
            </Text>
          </Box>
        )}
        <AppointmentQRDetails
          bookingStatus={status.status}
          otp={status.OTP}
          agent={pendingAppointmentDetails?.agent}
        />

        <AppointmentAddress
          address={
            pendingAppointmentDetails?.workshopName
              ? `${pendingAppointmentDetails?.workshopName},\n${pendingAppointmentDetails.workshopAddress}`
              : pendingAppointmentDetails?.address
          }
        />

        <AppointmentDetails
          orderCode={pendingAppointmentDetails?.orderNumber}
          date={pendingAppointmentDetails?.bookingDate}
          appointmentTime={
            pendingAppointmentDetails?.timeStart +
            ' - ' +
            pendingAppointmentDetails?.timeEnd
          }
        />

        <CarDetails
          vehicleNumberPlate={pendingAppointmentDetails?.vehicleNumber}
          engineOil={pendingAppointmentDetails?.engineOil}
          oilFilter={pendingAppointmentDetails?.oilFilter}
        />

        {(pendingAppointmentDetails !== undefined &&
          pendingAppointmentDetails?.addOn.length) > 0 && (
          <AppointmentAddon addOnList={pendingAppointmentDetails?.addOn} />
        )}
        {pendingAppointmentDetails?.remarks && (
          <AppointmentRemarks remarks={pendingAppointmentDetails?.remarks} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
