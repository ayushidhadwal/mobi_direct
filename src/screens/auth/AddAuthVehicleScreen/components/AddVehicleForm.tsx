import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  HStack,
  Input,
  Select,
  WarningOutlineIcon,
} from 'native-base';
import {Formik, FormikHelpers} from 'formik';
import React, {FC, useState} from 'react';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {format} from 'date-fns';
import {ActivityIndicator, Pressable, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {VehicleDTO} from '../../../../services';
import {useEngineOilTypes} from '../../../../hooks/user/useEngineOilTypes';
import {vehicleYears} from '../../../../utils/vehicleYears';

type Props = {
  onSubmit: (values: VehicleDTO, helpers: FormikHelpers<any>) => void;
  edit?: VehicleDTO;
};

export const AddVehicleForm: FC<Props> = ({onSubmit, edit}) => {
  const {t} = useTranslation('AddVehiclesLang');

  const [open, setOpen] = useState(false);

  const {engineOilTypes, isLoading} = useEngineOilTypes();

  const initialValues: VehicleDTO = {
    model: edit?.model ? edit.model : '',
    carPlateNumber: edit?.carPlateNumber ? edit.carPlateNumber : '',
    // @ts-ignore
    engineOilType: edit?.engineOilType ? edit.engineOilType : '',
    // @ts-ignore
    averageMileage: edit?.averageMileage ? edit.averageMileage : '',
    // @ts-ignore
    lastServiceMileage: edit?.lastServiceMileage ? edit.lastServiceMileage : '',
    year: edit?.year ? String(edit.year) : '',
    made: edit?.made ? edit.made : '',
    roadTaxDueDate: edit?.roadTaxDueDate ? edit.roadTaxDueDate : '',
    engineOilTypeName: edit?.engineOilTypeName ? edit.engineOilTypeName : '',
  };

  const addVehicleSchema = Yup.object().shape({
    model: Yup.string().required(),
    carPlateNumber: Yup.string().required(),
    engineOilType: Yup.number().required(),
    year: Yup.string().required(),
    made: Yup.string().required(),
    roadTaxDueDate: Yup.string(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addVehicleSchema}
      onSubmit={onSubmit}>
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
            <FormControl mb={5} isInvalid={'made' in errors} w="100%">
              <FormControl.Label>{t('made')}</FormControl.Label>
              <Input
                borderRadius={20}
                onChangeText={handleChange('made')}
                value={values.made}
                placeholder={t('enter') as string}
                focusOutlineColor={'primary.400'}
                size="lg"
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.made}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={5} isInvalid={'model' in errors} w="100%">
              <FormControl.Label>{t('model')}</FormControl.Label>
              <Input
                borderRadius="full"
                onChangeText={handleChange('model')}
                value={values.model}
                placeholder={t('enter') as string}
                focusOutlineColor={'primary.400'}
                size="lg"
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.model}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={5} isInvalid={'year' in errors} w="100%">
              <FormControl.Label>{t('year')}</FormControl.Label>
              <Select
                size="lg"
                alignSelf={'center'}
                placeholder={t('choose') as string}
                selectedValue={values.year}
                width="full"
                borderRadius={'full'}
                onValueChange={handleChange('year')}
                _selectedItem={{
                  bg: 'primary.400',
                  endIcon: <CheckIcon size={3} />,
                }}
                mt={1}>
                {vehicleYears.map(item => (
                  <Select.Item key={item} label={item} value={item} />
                ))}
              </Select>

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.year}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={5} isInvalid={'roadTaxDueDate' in errors}>
              <FormControl.Label>Road Tax Due Date</FormControl.Label>
              <Pressable onPress={() => setOpen(true)}>
                <View pointerEvents="none">
                  <Input
                    borderRadius="full"
                    onChangeText={handleChange('roadTaxDueDate')}
                    value={
                      values.roadTaxDueDate
                        ? format(new Date(values.roadTaxDueDate), 'yyyy/MM/dd')
                        : ''
                    }
                    placeholder={t('enter') as string}
                    focusOutlineColor={'primary.400'}
                    size="lg"
                    editable={false}
                  />
                </View>
              </Pressable>

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.roadTaxDueDate}
              </FormControl.ErrorMessage>
            </FormControl>

            <DatePicker
              theme="light"
              modal
              mode="date"
              minimumDate={new Date()}
              open={open}
              date={
                values.roadTaxDueDate
                  ? new Date(values.roadTaxDueDate)
                  : new Date()
              }
              onConfirm={date => {
                setOpen(false);
                setFieldValue('roadTaxDueDate', date.toDateString());
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            <FormControl mb={5} isInvalid={'carPlateNumber' in errors} w="100%">
              <FormControl.Label>{t('car')}</FormControl.Label>
              <Input
                borderRadius="full"
                onChangeText={handleChange('carPlateNumber')}
                value={values.carPlateNumber}
                placeholder={t('enter') as string}
                focusOutlineColor={'primary.400'}
                size="lg"
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.carPlateNumber}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl
              mb={5}
              isInvalid={'lastServiceMileage' in errors}
              w="100%">
              <FormControl.Label>{t('last')}</FormControl.Label>
              <Input
                borderRadius="full"
                onChangeText={handleChange('lastServiceMileage')}
                value={
                  values.lastServiceMileage === 0
                    ? ''
                    : String(values.lastServiceMileage)
                }
                placeholder={t('enter') as string}
                keyboardType={'numeric'}
                focusOutlineColor={'primary.400'}
                size="lg"
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.lastServiceMileage}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={5} isInvalid={'averageMileage' in errors} w="100%">
              <FormControl.Label>{t('average')}</FormControl.Label>
              <Input
                borderRadius="full"
                onChangeText={handleChange('averageMileage')}
                value={
                  values.averageMileage === 0
                    ? ''
                    : String(values.averageMileage)
                }
                placeholder={t('enter') as string}
                keyboardType={'numeric'}
                focusOutlineColor={'primary.400'}
                size="lg"
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.averageMileage}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={5} isInvalid={'engineOilType' in errors} w="100%">
              <FormControl.Label>{t('engine')}</FormControl.Label>

              {isLoading ? (
                <HStack alignItems="center" justifyContent="center">
                  <ActivityIndicator />
                </HStack>
              ) : (
                <Select
                  size="lg"
                  alignSelf={'center'}
                  placeholder={t('choose') as string}
                  selectedValue={
                    values.engineOilType === 0
                      ? ''
                      : String(values.engineOilType)
                  }
                  width="full"
                  borderRadius={'full'}
                  onValueChange={itemValue => {
                    setFieldValue('engineOilType', itemValue);
                    const item = engineOilTypes?.find(
                      engineOilType =>
                        Number(engineOilType.id) === Number(itemValue),
                    );

                    setFieldValue('engineOilTypeName', item?.name);
                  }}
                  _selectedItem={{
                    bg: 'primary.400',
                    endIcon: <CheckIcon size={3} />,
                  }}
                  mt={1}>
                  {engineOilTypes?.map(item => (
                    <Select.Item
                      key={String(item.id)}
                      label={item.name}
                      value={String(item.id)}
                    />
                  ))}
                </Select>
              )}

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.engineOilType}
              </FormControl.ErrorMessage>
            </FormControl>

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
