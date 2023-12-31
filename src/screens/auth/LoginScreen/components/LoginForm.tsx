import {
  Box,
  Button,
  FormControl,
  Input,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import {Formik} from 'formik';
import React, {FC, useContext} from 'react';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useMessage} from '../../../../hooks/useMessage';
import {login, LoginCredentialsDTO} from '../../../../services';
import {AuthActionTypes, AuthContext} from '../../../../contexts/auth';
import {mobileNumberRegExp} from '../../../../utils/helpers';
import {AuthNavigationProps} from '../../../../navigation';

export const LoginForm: FC = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const {t} = useTranslation('LoginLang');

  const initialValues: LoginCredentialsDTO = {
    mobileNumber: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    mobileNumber: Yup.string()
      .required()
      .matches(mobileNumberRegExp, String(t('mobileInvalid'))),
    password: Yup.string().required(),
  });

  const {dispatch} = useContext(AuthContext);
  const setMessage = useMessage();

  const onSubmitHandler = async (values: LoginCredentialsDTO) => {
    try {
      Keyboard.dismiss();
      const result = await login(values);

      dispatch({
        type: AuthActionTypes.SIGN_IN,
        payload: {
          userToken: result.userToken,
          userType: result.userType,
        },
      });
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
          <Box mt={5}>
            <FormControl mb={3} isInvalid={'mobileNumber' in errors} isRequired>
              <FormControl.Label>{t('mobile')}</FormControl.Label>
              <Input
                onChangeText={handleChange('mobileNumber')}
                value={values.mobileNumber}
                placeholder={String(t('enterMobile'))}
                keyboardType="numeric"
                focusOutlineColor="primary.400"
                size="md"
                variant="rounded"
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.mobileNumber}
              </FormControl.ErrorMessage>
            </FormControl>

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

            <Text
              textAlign="right"
              onPress={() => navigation.navigate('ForgotPassword')}
              underline
              color="primary.500"
              fontWeight="bold">
              {t('forgotPassword')}
            </Text>

            <Button
              onPress={handleSubmit}
              colorScheme="secondary"
              size="lg"
              borderRadius="full"
              my={3}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}>
              {t('login')}
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};
