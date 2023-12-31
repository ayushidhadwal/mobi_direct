import {Box, Button, FormControl, Input, WarningOutlineIcon} from 'native-base';
import {Formik} from 'formik';
import React, {FC} from 'react';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useMessage} from '../../../../hooks/useMessage';
import {AuthNavigationProps} from '../../../../navigation';
import {resetPassword} from '../../../../services';

type FormikForm = {
  password: string;
  confirmPassword: string;
};

type Props = {
  email: string;
  mobileNumber: string;
};

export const NewPasswordForm: FC<Props> = ({email, mobileNumber}) => {
  const navigation = useNavigation<AuthNavigationProps>();

  const {t} = useTranslation('NewPasswordLang');

  const initialValues: FormikForm = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const setMessage = useMessage();

  const onSubmitHandler = async ({password}: FormikForm) => {
    try {
      Keyboard.dismiss();
      await resetPassword({
        email,
        password,
        mobileNumber,
      });
      setMessage(String(t('success')));
      navigation.navigate('Login');
    } catch (e: any) {
      setMessage(e.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}>
      {({isSubmitting, handleChange, handleSubmit, values, errors}) => {
        return (
          <Box m={5}>
            <FormControl mb={3} isInvalid={'password' in errors} isRequired>
              <FormControl.Label>{t('newPassword')}</FormControl.Label>
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

            <FormControl
              mb={3}
              isInvalid={'confirmPassword' in errors}
              isRequired>
              <FormControl.Label>{t('confirmPassword')}</FormControl.Label>
              <Input
                onChangeText={handleChange('confirmPassword')}
                value={values.confirmPassword}
                placeholder={String(t('confirmNewPassword'))}
                focusOutlineColor="primary.400"
                size="md"
                variant="rounded"
                secureTextEntry
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.confirmPassword}
              </FormControl.ErrorMessage>
            </FormControl>

            <Button
              onPress={handleSubmit}
              colorScheme="secondary"
              size="lg"
              borderRadius="full"
              my={3}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}>
              {t('submit')}
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};
