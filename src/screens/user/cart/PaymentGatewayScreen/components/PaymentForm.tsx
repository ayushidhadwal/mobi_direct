import React, {FC} from 'react';
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  WarningOutlineIcon,
} from 'native-base';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';

import {CardDTO} from '../../../../../services';

type Props = {
  onSubmit: (values: CardDTO, formikHelpers: FormikHelpers<any>) => void;
};

export const PaymentForm: FC<Props> = ({onSubmit}: Props) => {
  const {t} = useTranslation('PaymentLang');

  const initialValues: CardDTO = {
    cardName: '',
    cardNumber: '',
    cvv: '',
    expireMonth: '',
    expireYear: '',
  };

  const validationSchema = Yup.object().shape({
    cardName: Yup.string().required(),
    cardNumber: Yup.string().required(),
    expireMonth: Yup.string().required(),
    expireYear: Yup.string().required(),
    cvv: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({isSubmitting, handleChange, handleSubmit, values, errors}) => {
        return (
          <Box px={5}>
            <FormControl mb={3} isInvalid={'cardName' in errors} isRequired>
              <FormControl.Label>{t('cardName')}</FormControl.Label>
              <Input
                onChangeText={handleChange('cardName')}
                value={values.cardName}
                placeholder={String(t('enterHolderName'))}
                keyboardType="default"
                focusOutlineColor="primary.400"
                size="md"
                variant="rounded"
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.cardName}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={3} isInvalid={'cardNumber' in errors} isRequired>
              <FormControl.Label>{t('cardNumber')}</FormControl.Label>
              <Input
                onChangeText={handleChange('cardNumber')}
                value={values.cardNumber}
                placeholder={String(t('enterCardNumber'))}
                keyboardType="numeric"
                focusOutlineColor="primary.400"
                size="md"
                variant="rounded"
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.cardNumber}
              </FormControl.ErrorMessage>
            </FormControl>
            <HStack mb={3}>
              <FormControl
                isInvalid={'expireMonth' in errors}
                w={'35%'}
                isRequired>
                <FormControl.Label>{t('expireDate')}</FormControl.Label>
                <Input
                  onChangeText={handleChange('expireMonth')}
                  value={values.expireMonth}
                  placeholder={String(t('enterMM'))}
                  focusOutlineColor="primary.400"
                  size="md"
                  variant="rounded"
                  maxLength={2}
                  keyboardType={'numeric'}
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errors.expireMonth}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={'expireYear' in errors} ml={3}>
                <FormControl.Label> </FormControl.Label>
                <Input
                  w={'40%'}
                  onChangeText={handleChange('expireYear')}
                  value={values.expireYear}
                  placeholder={String(t('enterYYYY'))}
                  focusOutlineColor="primary.400"
                  size="md"
                  variant="rounded"
                  maxLength={4}
                  keyboardType={'numeric'}
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errors.expireYear}
                </FormControl.ErrorMessage>
              </FormControl>
            </HStack>
            <FormControl mb={3} isInvalid={'cvv' in errors} isRequired>
              <FormControl.Label>{t('cvv')}</FormControl.Label>
              <Input
                onChangeText={handleChange('cvv')}
                value={values.cvv}
                placeholder={String(t('cvv'))}
                focusOutlineColor="primary.400"
                size="md"
                variant="rounded"
                maxLength={4}
                keyboardType={'numeric'}
                secureTextEntry
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.cvv}
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
              {t('payNow')}
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};
