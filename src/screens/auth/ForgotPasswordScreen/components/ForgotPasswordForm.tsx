import {Box, Button, FormControl, Input, WarningOutlineIcon} from 'native-base';
import {Formik} from 'formik';
import React, {FC} from 'react';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {Keyboard} from 'react-native';

import {useMessage} from '../../../../hooks/useMessage';
import {ForgotPasswordDTO, forgotPassword} from '../../../../services';
import {AuthNavigationProps} from '../../../../navigation';
import {emailRegExp} from '../../../../utils/helpers';
import {useTranslation} from 'react-i18next';

export const ForgotPasswordForm: FC = () => {
  const navigation = useNavigation<AuthNavigationProps>();

  const {t} = useTranslation('ForgotPasswordLang');

  const initialValues: ForgotPasswordDTO = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required()
      .matches(emailRegExp, String(t('invalidEmail'))),
  });

  const setMessage = useMessage();

  const onSubmitHandler = async (values: ForgotPasswordDTO) => {
    try {
      Keyboard.dismiss();
      const result = await forgotPassword(values);
      navigation.navigate('VerifyForgotPassword', result);
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
            <FormControl mb={3} isInvalid={'email' in errors} isRequired>
              <FormControl.Label>{t('email')}</FormControl.Label>
              <Input
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder={String(t('enterEmail'))}
                keyboardType="email-address"
                focusOutlineColor="primary.400"
                size="md"
                variant="rounded"
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.email}
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
              {t('continue')}
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};
