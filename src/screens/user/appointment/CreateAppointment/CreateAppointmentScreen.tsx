import React, {FC} from 'react';
import {
  Box,
  Button,
  FormControl,
  Select,
  CheckIcon,
  HStack,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {Loader} from '../../../../components/Loader';
import {useOrderNumber} from '../../../../hooks/user/appointment/useOrderNumber';
import {useGetOrderVehicles} from '../../../../hooks/user/appointment/useGetOrderVehicles';
import {CreateAppointmentScreenProps} from '../../../../navigation';

export const CreateAppointmentScreen: FC<CreateAppointmentScreenProps> = ({
  navigation,
}) => {
  const {t} = useTranslation('CreateAppointmentLang');

  const initialValues: {vehicleCode: string; orderCode: string} = {
    vehicleCode: '',
    orderCode: '',
  };

  const createAppointmentSchema = Yup.object().shape({
    vehicleCode: Yup.string().required(),
    orderCode: Yup.string().required(),
  });

  const onSubmitHandler = (values: {
    vehicleCode: string;
    orderCode: string;
  }) => {
    navigation.navigate('DateTime', {
      vehicleCode: values.vehicleCode,
      orderCode: values.orderCode,
    });
  };

  const {isLoading: vehiclesLoading, orderVehicleList} = useGetOrderVehicles();
  const {
    isLoading: orderNumberLoading,
    orderNumberList,
    trigger,
  } = useOrderNumber();

  if (vehiclesLoading) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createAppointmentSchema}
      onSubmit={onSubmitHandler}>
      {({setFieldValue, handleSubmit, values, errors}) => {
        return (
          <Box m={4} flex={1}>
            <FormControl isInvalid={'vehicleCode' in errors}>
              <FormControl.Label>{t('vehicle')}</FormControl.Label>
              <Select
                size="lg"
                alignSelf={'center'}
                placeholder={t('choose') as string}
                selectedValue={values.vehicleCode}
                width="full"
                borderRadius={'full'}
                onValueChange={async itemValue => {
                  setFieldValue('vehicleCode', itemValue);
                  await trigger(itemValue);
                }}
                _selectedItem={{
                  bg: 'primary.400',
                  endIcon: <CheckIcon size={3} />,
                }}
                mt={1}>
                {orderVehicleList?.map(m => (
                  <Select.Item
                    key={m.vehiclesNumberPlate}
                    label={m.vehiclesNumberPlate}
                    value={m.vehiclesNumberPlate}
                  />
                ))}
              </Select>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.vehicleCode}
              </FormControl.ErrorMessage>
            </FormControl>
            {orderNumberLoading ? (
              <HStack alignItems="center" justifyContent="center" mt={5}>
                <ActivityIndicator />
              </HStack>
            ) : orderNumberList?.length === 0 ? (
              <Box mt={5} alignItems={'center'}>
                <Text textAlign={'center'} fontWeight={'300'} color={'red.400'}>
                  {t('message')}
                </Text>
              </Box>
            ) : (
              <FormControl mt={5} isInvalid={'orderCode' in errors}>
                <FormControl.Label>{t('order')}</FormControl.Label>
                <Select
                  size="lg"
                  alignSelf={'center'}
                  placeholder={t('choose') as string}
                  selectedValue={values.orderCode}
                  width="full"
                  borderRadius={'full'}
                  onValueChange={itemValue => {
                    setFieldValue('orderCode', itemValue);
                    const item = orderNumberList?.find(
                      orderCode => orderCode.orderNumber === itemValue,
                    );
                    setFieldValue('orderCode', item?.orderNumber);
                  }}
                  _selectedItem={{
                    bg: 'primary.400',
                    endIcon: <CheckIcon size={3} />,
                  }}
                  mt={1}>
                  {orderNumberList?.map(m => (
                    <Select.Item
                      key={String(m.id)}
                      label={m.orderNumber}
                      value={m.orderNumber}
                    />
                  ))}
                </Select>
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errors.orderCode}
                </FormControl.ErrorMessage>
              </FormControl>
            )}
            <Button
              onPress={handleSubmit}
              mb={5}
              mt={10}
              colorScheme={'secondary'}
              size="lg"
              borderRadius={'full'}>
              {t('continue')}
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};
