import {Box, Button, FormControl, Input, WarningOutlineIcon} from 'native-base';
import {Formik} from 'formik';
import React, {FC, useContext, useEffect, useState} from 'react';
import * as Yup from 'yup';
import DatePicker from 'react-native-date-picker';
import {Keyboard, Pressable, View} from 'react-native';
import {format} from 'date-fns';
import {useTranslation} from 'react-i18next';

import {register, RegisterDTO} from '../../../../services';
import {mobileNumberRegExp} from '../../../../utils/helpers';
import {AuthActionTypes, AuthContext} from '../../../../contexts/auth';
import {useMessage} from '../../../../hooks/useMessage';
import * as storage from '../../../../utils/storage';
import Config from '../../../../config';

type Props = {};

export const RegisterForm: FC<Props> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [referral, setReferral] = useState<string>('');

  const {t} = useTranslation('RegisterLang');

  const initialValues: RegisterDTO = {
    name: '',
    mobileNumber: '',
    password: '',
    email: '',
    driverLicenseDueDate: '',
    referral: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    mobileNumber: Yup.string()
      .required()
      .matches(mobileNumberRegExp, String(t('invalidMobile'))),
    password: Yup.string().required(),
    driverLicenseDueDate: Yup.string(),
    email: Yup.string().email(),
  });

  const {dispatch} = useContext(AuthContext);
  const setMessage = useMessage();

  const onSubmitHandler = async (values: RegisterDTO) => {
    try {
      Keyboard.dismiss();
      const result = await register(values);

      await storage.remove(Config.REFERRAL_ID);

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

  useEffect(() => {
    (async () => {
      const val = await storage.loadString(Config.REFERRAL_ID);
      if (val) {
        setReferral(val);
      }
    })();
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={{...initialValues, referral: referral}}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}>
      {({
        isSubmitting,
        setFieldValue,
        handleChange,
        handleSubmit,
        values,
        errors,
      }) => {
        return (
          <Box mt={5}>
            <FormControl mb={3} isInvalid={'name' in errors} isRequired>
              <FormControl.Label>{t('name')}</FormControl.Label>
              <Input
                onChangeText={handleChange('name')}
                value={values.name}
                placeholder={String(t('enterName'))}
                focusOutlineColor="primary.400"
                size="md"
                variant="rounded"
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.name}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={3} isInvalid={'mobileNumber' in errors} isRequired>
              <FormControl.Label>{t('mobileNumber')}</FormControl.Label>
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

            <FormControl mb={3} isInvalid={'email' in errors}>
              <FormControl.Label>{t('email')}</FormControl.Label>
              <Input
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder={String(t('enterEmail'))}
                focusOutlineColor="primary.400"
                size="md"
                variant="rounded"
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.email}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={3} isInvalid={'driverLicenseDueDate' in errors}>
              <FormControl.Label>{t('licenseDueDate')}</FormControl.Label>
              <Pressable onPress={() => setOpen(true)}>
                <View pointerEvents="none">
                  <Input
                    value={
                      values.driverLicenseDueDate
                        ? format(
                            new Date(values.driverLicenseDueDate),
                            'yyyy/MM/dd',
                          )
                        : ''
                    }
                    placeholder={String(t('licenseDueDate'))}
                    focusOutlineColor={'primary.400'}
                    size="md"
                    variant="rounded"
                    editable={false}
                  />
                </View>
              </Pressable>

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.driverLicenseDueDate}
              </FormControl.ErrorMessage>
            </FormControl>

            <DatePicker
              theme="light"
              modal
              mode="date"
              minimumDate={new Date()}
              open={open}
              date={
                values.driverLicenseDueDate
                  ? new Date(values.driverLicenseDueDate)
                  : new Date()
              }
              onConfirm={date => {
                setOpen(false);
                setFieldValue('driverLicenseDueDate', date.toDateString());
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            <FormControl mb={3} isInvalid={'referral' in errors}>
              <FormControl.Label>{t('referralId')}</FormControl.Label>
              <Input
                onChangeText={handleChange('referral')}
                value={values.referral}
                placeholder={String(t('enterReferral'))}
                focusOutlineColor="primary.400"
                size="md"
                variant="rounded"
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.referral}
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
              {t('register')}
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};
