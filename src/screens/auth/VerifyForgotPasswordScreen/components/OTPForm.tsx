import {Box, Button} from 'native-base';
import {Formik, FormikHelpers} from 'formik';
import React, {FC, memo} from 'react';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';

import OtpTextInput from '../../../../components/otp/OtpTextInput';

export type OTPFormValues = {
  OTP: string;
};

type Props = {
  onFormSubmit: (
    values: OTPFormValues,
    formikHelpers: FormikHelpers<any>,
  ) => void;
};

const OTPForm: FC<Props> = ({onFormSubmit}) => {
  const {t} = useTranslation('OtpLang');

  const initialValues: OTPFormValues = {
    OTP: '',
  };

  const verifyOTPSchema = Yup.object().shape({
    OTP: Yup.string().length(6).required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={verifyOTPSchema}
      onSubmit={onFormSubmit}>
      {({isSubmitting, handleChange, handleSubmit, errors}) => {
        return (
          <Box mx={4}>
            <OtpTextInput
              isInvalid={!!errors.OTP}
              numberOfInput={6}
              onChangeText={handleChange('OTP')}
              autoFocus={true}
            />

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
          </Box>
        );
      }}
    </Formik>
  );
};

export default memo(OTPForm);
