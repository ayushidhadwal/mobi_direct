import React, {FC, useState} from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  HStack,
  Icon,
  Input,
  Modal,
  Pressable,
  Text,
  View,
  WarningOutlineIcon,
} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DocumentPicker from 'react-native-document-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import {useMessage} from '../../../../hooks/useMessage';
import {
  File,
  finishPendingRequest,
} from '../../../../services/agent/finishPendingRequest';
import {AgentEndRequestOTPScreenProps} from '../../../../navigation';

export const AgentEndRequestOTPScreen: FC<AgentEndRequestOTPScreenProps> = ({
  navigation,
  route,
}) => {
  const id = route.params.id;

  const {t} = useTranslation('PendingDetailLang');

  const [errors, setErrors] = useState<{mileage?: string}>({});
  const [mileage, setMileage] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serviceOTP, setServiceOTP] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  const setMessage = useMessage();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      await finishPendingRequest({
        OTP: Number(serviceOTP),
        mileage: Number(mileage),
        id: id,
        remarks: remarks,
        files: files,
      });

      setIsSubmitting(false);
      setMessage(String(t('success')));
      navigation.navigate('AgentService');
    } catch (e: any) {
      setIsSubmitting(false);
      setMessage(e.message);
    }
  };

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
        type: '.jpeg .jpg .png .pdf',
      });

      if (response.length > 0) {
        setFiles(
          response.map(
            (file): File => ({
              name: file.name as string,
              type: file.type as string,
              uri: file.uri,
            }),
          ),
        );
      }
    } catch (e: any) {
      setMessage(e.code);
    }
  };

  const validate = () => {
    if (mileage) {
      setErrors({
        mileage: '',
      });
      return true;
    } else {
      setErrors({
        mileage: String(t('PleaseEnterMileage')),
      });
      return false;
    }
  };

  const toggleModel = () => {
    if (validate()) {
      setShow(!show);
    }
  };

  const handleSubmitQR = () => {
    if (validate()) {
      navigation.navigate('AgentEndRequestQR', {
        id: id,
        remarks: remarks,
        files: files,
        mileage: mileage,
      });
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Box flex={1} m={4}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="md" fontWeight="400">
              {t('reqDetails')}
            </Text>
          </HStack>
          <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

          <FormControl mb={5} isInvalid={'mileage' in errors} isRequired>
            <FormControl.Label>{t('mileage')}</FormControl.Label>
            <Input
              onChangeText={setMileage}
              value={mileage}
              placeholder={String(t('enterMileage'))}
              focusOutlineColor={'primary.400'}
              size="lg"
              keyboardType="number-pad"
            />

            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors?.mileage}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl mb={5}>
            <FormControl.Label>{t('remarks')}</FormControl.Label>
            <Input
              onChangeText={setRemarks}
              value={remarks}
              placeholder={String(t('enterRemarks'))}
              focusOutlineColor={'primary.400'}
              size="lg"
              multiline
              numberOfLines={5}
              minH={100}
            />
          </FormControl>

          <FormControl mb={5}>
            <FormControl.Label>{t('files')}</FormControl.Label>
            <Pressable onPress={handleDocumentSelection}>
              <View pointerEvents="none">
                <Input
                  variant="filled"
                  isReadOnly
                  placeholder={String(t('selectFiles'))}
                  focusOutlineColor={'primary.400'}
                  size="lg"
                  mb={1}
                  leftElement={
                    <Icon
                      as={Ionicons}
                      name="md-cloud-upload-outline"
                      size={5}
                      color="primary.400"
                      ml={3}
                    />
                  }
                />
                {files.length > 0 && (
                  <Text color="info.400">
                    {files.length}
                    {t('selected')}
                  </Text>
                )}
              </View>
            </Pressable>
          </FormControl>
        </Box>
      </KeyboardAwareScrollView>

      <Modal
        isOpen={show}
        onClose={toggleModel}
        avoidKeyboard
        bottom="4"
        size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{t('completeAppointment')}</Modal.Header>
          <Modal.Body>
            {t('askOTP')}
            <FormControl mt={3}>
              <FormControl.Label>{t('serviceFinishOTP')}</FormControl.Label>
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
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              onPress={handleSubmit}
              isLoading={isSubmitting}
              disabled={!serviceOTP || isSubmitting}>
              {t('proceed')}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Box p={4}>
        <HStack space={2}>
          <Button
            flex={1}
            onPress={toggleModel}
            colorScheme="secondary"
            size="lg"
            borderRadius="lg">
            {t('enterOTP')}
          </Button>
          <Button
            flex={1}
            onPress={handleSubmitQR}
            colorScheme="primary"
            size="lg"
            borderRadius="lg">
            {t('scanQR')}
          </Button>
        </HStack>
      </Box>
    </SafeAreaView>
  );
};
