import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DeleteAccountScreenProps} from '../../../navigation';
import {Formik} from 'formik';
import {Box, Button, FormControl, Input, WarningOutlineIcon} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';
import {Alert, Keyboard} from 'react-native';
import * as Yup from 'yup';
import {useMessage} from '../../../hooks/useMessage';
import {useLogout} from '../../../hooks/useLogout';
import {deleteAccount} from '../../../services';
import {FormikHelpers} from 'formik/dist/types';

type PasswordFormValues = {
  password: string;
};

export const DeleteAccountScreen: FC<DeleteAccountScreenProps> = () => {
  const {t} = useTranslation('MobileLang');

  const logout = useLogout();

  const initialValues: PasswordFormValues = {
    password: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required(String(t('passwordReq'))),
  });

  const setMessage = useMessage();

  const onSubmitHandler = async (
    {password}: PasswordFormValues,
    {setSubmitting}: FormikHelpers<any>,
  ) => {
    Keyboard.dismiss();

    Alert.alert(t('alertTitle'), t('alertMsg') as string, [
      {
        onPress: async () => {
          try {
            setSubmitting(true);
            await deleteAccount(password);
            setSubmitting(false);
            await logout();
          } catch (e: any) {
            setMessage(e.message);
            setSubmitting(false);
          }
        },
        text: t('alertConfirmBtn') as string,
        style: 'destructive',
      },
      {
        text: t('alertCancelBtn') as string,
      },
    ]);
  };

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}>
          {({isSubmitting, handleChange, handleSubmit, values, errors}) => {
            return (
              <Box m={5}>
                <FormControl mb={3} isInvalid={'password' in errors} isRequired>
                  <FormControl.Label>{t('password')}</FormControl.Label>
                  <Input
                    onChangeText={handleChange('password')}
                    value={values.password}
                    placeholder={String(t('enterPassword'))}
                    focusOutlineColor="primary.400"
                    size="md"
                    variant="rounded"
                    secureTextEntry
                  />

                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.password}
                  </FormControl.ErrorMessage>
                </FormControl>

                <Button
                  onPress={handleSubmit}
                  colorScheme={'secondary'}
                  size="lg"
                  borderRadius="full"
                  my={3}
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}>
                  {t('delete')}
                </Button>
              </Box>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
