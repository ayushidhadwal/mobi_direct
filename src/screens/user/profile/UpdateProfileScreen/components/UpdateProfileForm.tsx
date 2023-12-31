import {Box, Button, FormControl, Input, WarningOutlineIcon} from 'native-base';
import {Formik} from 'formik';
import React, {FC, useState} from 'react';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {format} from 'date-fns';
import DatePicker from 'react-native-date-picker';
import {Keyboard, Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ProfileDTO} from '../../../../../services';
import {updateUserProfile} from '../../../../../services';
import {useMessage} from '../../../../../hooks/useMessage';
import {useUserProfile} from '../../../../../hooks/user/useUserProfile';
import {Loader} from '../../../../../components/Loader';
import {mobileNumberRegExp} from '../../../../../utils/helpers';
import {UserNavigationProps} from '../../../../../navigation';

type Props = {};

export const UpdateProfileForm: FC<Props> = ({}) => {
  const {t} = useTranslation('ProfileLang');

  const navigation = useNavigation<UserNavigationProps>();

  const [open, setOpen] = useState(false);
  const {profile, isLoading, mutate} = useUserProfile();

  const initialValues: ProfileDTO = {
    email: profile?.email ? profile?.email : '',
    licenseDueDate: profile?.licenseDueDate ? profile?.licenseDueDate : '',
    name: profile?.name ? profile?.name : '',
    mobileNumber: profile?.mobileNumber ? profile?.mobileNumber : '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    mobileNumber: Yup.string()
      .required()
      .matches(mobileNumberRegExp, String(t('invalid'))),
    driverLicenseDueDate: Yup.string(),
    email: Yup.string().email(),
  });

  const setMessage = useMessage();

  const onSubmitHandler = async (values: ProfileDTO) => {
    try {
      Keyboard.dismiss();
      const result = await updateUserProfile(values);

      if (profile) {
        await mutate({
          ...profile,
          name: result.name,
          email: result.email,
          licenseDueDate: result.licenseDueDate,
          mobileNumber: result.mobileNumber,
        });
      }
      setMessage(String(t('updatedSuccessfully')));
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
        {({
          isSubmitting,
          setFieldValue,
          handleChange,
          handleSubmit,
          values,
          errors,
        }) => {
          return (
            <Box m={4}>
              <FormControl mb={5} isInvalid={'name' in errors} isRequired>
                <FormControl.Label>{t('name')}</FormControl.Label>
                <Input
                  borderRadius={20}
                  onChangeText={handleChange('name')}
                  value={values.name}
                  placeholder={t('enter') as string}
                  focusOutlineColor={'primary.400'}
                  size="lg"
                />

                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errors.name}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl
                mb={3}
                isInvalid={'mobileNumber' in errors}
                isRequired>
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

              <FormControl mb={5} isInvalid={'email' in errors}>
                <FormControl.Label>{t('email')}</FormControl.Label>
                <Input
                  borderRadius="full"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  placeholder={t('enter') as string}
                  focusOutlineColor={'primary.400'}
                  size="lg"
                />

                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errors.email}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl mb={5} isInvalid={'licenseDueDate' in errors}>
                <FormControl.Label>{t('driver')}</FormControl.Label>
                <Pressable onPress={() => setOpen(true)}>
                  <View pointerEvents="none">
                    <Input
                      borderRadius="full"
                      onChangeText={handleChange('licenseDueDate')}
                      value={
                        values.licenseDueDate
                          ? format(
                              new Date(values.licenseDueDate),
                              'yyyy/MM/dd',
                            )
                          : ''
                      }
                      placeholder={t('enter') as string}
                      focusOutlineColor={'primary.400'}
                      size="lg"
                    />
                  </View>
                </Pressable>

                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errors.licenseDueDate}
                </FormControl.ErrorMessage>
              </FormControl>

              <DatePicker
                theme="light"
                modal
                mode="date"
                minimumDate={new Date()}
                open={open}
                date={
                  values.licenseDueDate
                    ? new Date(values.licenseDueDate)
                    : new Date()
                }
                onConfirm={date => {
                  setOpen(false);
                  setFieldValue('licenseDueDate', date.toDateString());
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <Button
                onPress={handleSubmit}
                colorScheme={'secondary'}
                size="lg"
                borderRadius="full"
                mb={5}
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
