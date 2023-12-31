import {Box, Button, FormControl, Input, WarningOutlineIcon} from 'native-base';
import {Formik} from 'formik';
import React, {FC} from 'react';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {Keyboard} from 'react-native';

import {useMessage} from '../../../../../hooks/useMessage';
import {useUserProfile} from '../../../../../hooks/user/useUserProfile';
import {Loader} from '../../../../../components/Loader';
import {updatePassword, UpdatePasswordDto} from '../../../../../services';

type Props = {};

export const AgentUpdatePasswordForm: FC<Props> = () => {
  const {t} = useTranslation('AgentUpdateLang');

  const {isLoading} = useUserProfile();

  const initialValues: UpdatePasswordDto = {
    confirmPassword: '',
    newPassword: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    newPassword: Yup.string().required('New Password is required'),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const navigation = useNavigation();
  const setMessage = useMessage();

  const onSubmitHandler = async (updatePasswordDto: UpdatePasswordDto) => {
    try {
      Keyboard.dismiss();
      await updatePassword(updatePasswordDto);
      setMessage('Password Updated Successfully!');
      navigation.goBack();
    } catch (e: any) {
      setMessage(e.message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
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
                <FormControl.Label>{t('old')}</FormControl.Label>
                <Input
                  onChangeText={handleChange('password')}
                  value={values.password}
                  placeholder={String(t('enterOld'))}
                  focusOutlineColor="primary.400"
                  size="md"
                  variant="filled"
                  secureTextEntry
                />

                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errors.password}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl
                mb={3}
                isInvalid={'newPassword' in errors}
                isRequired>
                <FormControl.Label>{t('new')}</FormControl.Label>
                <Input
                  onChangeText={handleChange('newPassword')}
                  value={values.newPassword}
                  placeholder={String(t('enter'))}
                  focusOutlineColor="primary.400"
                  size="md"
                  variant="filled"
                  secureTextEntry
                />

                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errors.newPassword}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl
                mb={3}
                isInvalid={'confirmPassword' in errors}
                isRequired>
                <FormControl.Label>{t('confirm')}</FormControl.Label>
                <Input
                  onChangeText={handleChange('confirmPassword')}
                  value={values.confirmPassword}
                  placeholder={String(t('enterNew'))}
                  focusOutlineColor="primary.400"
                  size="md"
                  variant="filled"
                  secureTextEntry
                />

                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errors.confirmPassword}
                </FormControl.ErrorMessage>
              </FormControl>

              <Button
                onPress={handleSubmit}
                colorScheme={'secondary'}
                size="lg"
                my={3}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}>
                {t('update')}
              </Button>
            </Box>
          );
        }}
      </Formik>
    </KeyboardAwareScrollView>
  );
};
