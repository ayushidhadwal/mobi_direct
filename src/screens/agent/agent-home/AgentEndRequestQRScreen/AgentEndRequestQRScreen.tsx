import React, {FC, useCallback, useEffect, useState} from 'react';
import {Box, Button, Text} from 'native-base';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';
import {Linking, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import {AgentEndRequestQRScreenProps} from '../../../../navigation';
import {startPendingRequest} from '../../../../services/agent/startPendingRequest';
import {finishPendingRequest} from '../../../../services/agent/finishPendingRequest';
import {Loader} from '../../../../components/Loader';

export const AgentEndRequestQRScreen: FC<AgentEndRequestQRScreenProps> = ({
  navigation,
  route,
}) => {
  const {id, mileage, files, remarks} = route.params;
  const {t} = useTranslation('PendingDetailLang');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [QRError, setQRError] = useState<string>('');

  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const handleQRScan = useCallback(
    async (value: number) => {
      try {
        setIsLoading(true);

        if (mileage) {
          await finishPendingRequest({
            OTP: value,
            id: id,
            mileage: Number(mileage),
            files: files,
            remarks: remarks,
          });
          setIsLoading(false);
          navigation.navigate('AgentBottomTabs', {
            screen: 'AgentService',
          });
        } else {
          await startPendingRequest({
            OTP: value,
            id: id,
          });
          setIsLoading(false);
          navigation.goBack();
        }
      } catch (e: any) {
        setIsLoading(false);
        setQRError(e.message);
      }
    },
    [files, id, mileage, navigation, remarks],
  );

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();

      if (cameraPermission === 'not-determined') {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === 'authorized');
      } else if (cameraPermission === 'denied') {
        await Linking.openSettings();
      }

      setHasPermission(cameraPermission === 'authorized');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (barcodes.length > 0 && isScanning) {
        setIsScanning(false);

        const [barcode] = barcodes;

        const OTP = Number(barcode.content.data);

        if (!isNaN(OTP)) {
          await handleQRScan(OTP);
        }
      }
    })();
  }, [handleQRScan, barcodes, isScanning]);

  return device != null && hasPermission ? (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
      {isLoading && <Loader />}
      {!isLoading && !isScanning && (
        <Box flex={1} alignItems="center" justifyContent="center" m={4}>
          <Box bg="#fff" p={5} shadow={4} borderRadius="lg" w="full" minH="1/3">
            <Box flex={1}>
              <Text
                textAlign="center"
                mb={2}
                bold
                fontSize="md"
                color="danger.400">
                {t('scanWithError')}
              </Text>

              <Text textAlign="center" numberOfLines={3}>
                {t('error')}
                {QRError}
              </Text>
            </Box>
            <Button onPress={() => setIsScanning(true)}>
              {t('scanAgain')}
            </Button>
          </Box>
        </Box>
      )}
    </>
  ) : (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text>{t('denied')}</Text>
      <Text color="primary.400" onPress={() => Linking.openSettings()}>
        {t('openSettings')}
      </Text>
    </Box>
  );
};
