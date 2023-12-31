import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  WarningOutlineIcon,
} from 'native-base';
import {Formik} from 'formik';
import React, {FC} from 'react';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';

import {AddressDTO} from '../../../../services';

type Props = {
  onSubmitHandler: (values: AddressDTO) => void;
  goBack?: () => void;
  address?: string;
  pinCode?: string;
  state?: string;
  city?: string;
};

export const AuthAddressForm: FC<Props> = ({
  address,
  pinCode,
  state,
  city,
  onSubmitHandler,
  goBack,
}) => {
  const {t} = useTranslation('AddAddressLang');

  const initialValues: AddressDTO = {
    address: address ? address : '',
    pinCode: pinCode ? String(pinCode) : '',
    state: state ? state : '',
    city: city ? city : '',
  };

  const authAddressSchema = Yup.object().shape({
    address: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={authAddressSchema}
      onSubmit={onSubmitHandler}>
      {({isSubmitting, handleChange, handleSubmit, values, errors}) => {
        return (
          <Box m={4}>
            <FormControl mb={5} isInvalid={'address' in errors} w="100%">
              <FormControl.Label>{t('address')}</FormControl.Label>
              <Input
                borderRadius={20}
                onChangeText={handleChange('address')}
                value={values.address}
                placeholder={t('enter') as string}
                focusOutlineColor={'primary.400'}
                size="lg"
                multiline
                numberOfLines={3}
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.address}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={5} isInvalid={'state' in errors} w="100%">
              <FormControl.Label>{t('state')}</FormControl.Label>
              <Input
                borderRadius="full"
                onChangeText={handleChange('state')}
                value={values.state}
                placeholder={t('enter') as string}
                focusOutlineColor={'primary.400'}
                size="lg"
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.state}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={5} isInvalid={'city' in errors} w="100%">
              <FormControl.Label>{t('city')}</FormControl.Label>
              <Input
                borderRadius="full"
                onChangeText={handleChange('city')}
                value={values.city}
                placeholder={t('enter') as string}
                focusOutlineColor={'primary.400'}
                size="lg"
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.city}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={5} isInvalid={'pinCode' in errors} w="100%">
              <FormControl.Label>{t('passcode')}</FormControl.Label>
              <Input
                borderRadius="full"
                onChangeText={handleChange('pinCode')}
                value={values.pinCode}
                placeholder={t('enter') as string}
                keyboardType={'numeric'}
                focusOutlineColor={'primary.400'}
                size="lg"
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.pinCode}
              </FormControl.ErrorMessage>
            </FormControl>

            {goBack ? (
              <HStack mt={12} justifyContent={'space-between'}>
                <Button ml={2} size="lg" variant="ghost" onPress={goBack}>
                  {t('previous')}
                </Button>
                <Button
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                  mr={4}
                  mb={2}
                  borderRadius={25}
                  alignSelf={'flex-end'}
                  variant={'solid'}
                  w={'40%'}
                  size={'md'}
                  colorScheme={'secondary'}>
                  {t('next')}
                </Button>
              </HStack>
            ) : (
              <Button
                onPress={handleSubmit}
                colorScheme={'secondary'}
                size="lg"
                borderRadius="full"
                mb={5}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}>
                {t('submit')}
              </Button>
            )}
          </Box>
        );
      }}
    </Formik>
  );
};
