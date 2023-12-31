import React, {FC} from 'react';
import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  HStack,
  Select,
  WarningOutlineIcon,
} from 'native-base';
import {ActivityIndicator} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';

import {WorkShopScreenProps} from '../../../../navigation';
import {useWorkShopList} from '../../../../hooks/user/appointment/useWorkShopList';

type ChooseWorkShopDTO = {
  workShop: string;
};

export const WorkShopScreen: FC<WorkShopScreenProps> = ({
  route,
  navigation,
}) => {
  const {
    date,
    appointmentTimeId,
    appointmentTime,
    orderCode,
    vehicleCode,
    addressId,
  } = route.params;

  const {t} = useTranslation('WorkshopLang');

  const {workShopList, isLoading} = useWorkShopList();

  const initialValues: ChooseWorkShopDTO = {
    workShop: '',
  };

  const serviceSchema = Yup.object().shape({
    workShop: Yup.number().required(),
  });
  const onSubmit = async (values: ChooseWorkShopDTO) => {
    const item = workShopList?.filter(
      i => String(i.workShopId) === values.workShop,
    );
    if (item) {
      navigation.navigate('AppointmentSummary', {
        date: date,
        appointmentTimeId: appointmentTimeId,
        appointmentTime: appointmentTime,
        orderCode: orderCode,
        vehicleCode: vehicleCode,
        addressId: addressId,
        WorkShopId: item[0].workShopId,
        workshopName: item[0].name,
        workshopAddress: item[0].address,
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={serviceSchema}
      onSubmit={onSubmit}>
      {({isSubmitting, handleChange, handleSubmit, values, errors}) => {
        return (
          <Box m={4} flex={1}>
            <FormControl
              mb={5}
              isInvalid={'workShop' in errors}
              w="100%"
              isRequired>
              <FormControl.Label>{t('workShop')}</FormControl.Label>
              {isLoading ? (
                <HStack alignItems="center" justifyContent="center">
                  <ActivityIndicator />
                </HStack>
              ) : (
                <Select
                  size="lg"
                  alignSelf={'center'}
                  placeholder={t('choose') as string}
                  selectedValue={values.workShop}
                  width="full"
                  borderRadius={'full'}
                  onValueChange={handleChange('workShop')}
                  _selectedItem={{
                    bg: 'primary.400',
                    endIcon: <CheckIcon size={3} />,
                  }}
                  mt={1}>
                  {workShopList?.map(item => (
                    <Select.Item
                      key={String(item.workShopId)}
                      label={`${item.address}`}
                      value={String(item.workShopId)}
                    />
                  ))}
                </Select>
              )}
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.workShop}
              </FormControl.ErrorMessage>
            </FormControl>

            <Button
              onPress={handleSubmit}
              colorScheme={'secondary'}
              size="lg"
              borderRadius="full"
              mt={5}
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
