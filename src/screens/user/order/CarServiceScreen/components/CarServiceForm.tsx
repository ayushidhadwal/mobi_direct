import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  HStack,
  Icon,
  Select,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import {Formik, FormikHelpers} from 'formik';
import React, {FC, useEffect} from 'react';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {
  serviceAddToCart,
  ServiceAddToCartDTO,
} from '../../../../../services/order/serviceAddToCart';
import {useUserVehicles} from '../../../../../hooks/user/useUserVehicles';
import {useEngineOils} from '../../../../../hooks/user/orders/useEngineOils';
import {useOilFilters} from '../../../../../hooks/user/orders/useOilFilters';
import {useMessage} from '../../../../../hooks/useMessage';
import Config from '../../../../../config';
import {UserNavigationProps} from '../../../../../navigation';
import {CartItem} from '../../../../../hooks/user/cart/useUserCart';

type Props = {
  vehicleId: string;
  engineOilId: string;
  oilFilterId: string;
  trigger: any;
  userCart?: CartItem[];
};

export const CarServiceForm: FC<Props> = ({
  trigger,
  vehicleId,
  engineOilId,
  oilFilterId,
  userCart,
}) => {
  const {t} = useTranslation('CarServiceLang');

  const initialValues: ServiceAddToCartDTO = {
    vehicleId: vehicleId,
    engineOilId: engineOilId,
    oilFilterId: oilFilterId,
  };

  const serviceSchema = Yup.object().shape({
    vehicleId: Yup.number().required(),
    engineOilId: Yup.number().required(),
    oilFilterId: Yup.number().required(),
  });

  const {isLoading: vehiclesIsLoading, vehicles} = useUserVehicles();

  const {
    isMutating: engineOilLoading,
    engineOils,
    trigger: triggerEngineOils,
  } = useEngineOils();

  const {
    isMutating: oilFilterLoading,
    oilFilters,
    trigger: triggerOilFilters,
  } = useOilFilters();

  const navigation = useNavigation<UserNavigationProps>();
  const setMessage = useMessage();

  const getCartStatus = () =>
    !(userCart && userCart?.length > 0 && userCart[0]?.engineOilName);

  const onSubmit = async (
    values: ServiceAddToCartDTO,
    {resetForm}: FormikHelpers<any>,
  ) => {
    try {
      if (getCartStatus()) {
        await serviceAddToCart(values);
      }
      resetForm();
      navigation.navigate('Cart');
    } catch (e: any) {
      setMessage(e?.message);
    }
  };

  useEffect(() => {
    if (vehicleId) {
      Promise.all([
        triggerEngineOils(Number(vehicleId)),
        triggerOilFilters(Number(vehicleId)),
      ]).then();
    }
  }, [vehicleId, triggerEngineOils, triggerOilFilters]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={serviceSchema}
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
          <Box>
            <FormControl mb={3} isInvalid={'vehicleId' in errors} w="100%">
              <FormControl.Label>{t('vehicle')}</FormControl.Label>

              {vehiclesIsLoading ? (
                <HStack alignItems="center" justifyContent="center">
                  <ActivityIndicator />
                </HStack>
              ) : (
                <Select
                  size="lg"
                  alignSelf={'center'}
                  placeholder={t('choose') as string}
                  selectedValue={values.vehicleId}
                  width="full"
                  borderRadius={'full'}
                  onValueChange={async itemValue => {
                    setFieldValue('vehicleId', itemValue);
                    setFieldValue('engineOilId', '');
                    setFieldValue('oilFilterId', '');

                    const id = Number(itemValue);
                    await Promise.all([
                      triggerEngineOils(id),
                      triggerOilFilters(id),
                      trigger(),
                    ]);
                  }}
                  _selectedItem={{
                    bg: 'primary.400',
                    endIcon: <CheckIcon size={3} />,
                  }}
                  mt={1}>
                  {vehicles?.map(item => (
                    <Select.Item
                      key={String(item.id)}
                      label={item.carPlateNumber}
                      value={String(item.id)}
                    />
                  ))}
                </Select>
              )}

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.vehicleId}
              </FormControl.ErrorMessage>

              <HStack mt={2} justifyContent="space-between">
                <HStack alignItems="center" space={1}>
                  <Icon
                    as={Ionicons}
                    name="ios-download"
                    size={5}
                    color="danger.400"
                  />
                  <Text
                    onPress={() =>
                      navigation.navigate('PDFViewer', {
                        uri: Config.API_URL + Config.engineOilGuide,
                      })
                    }
                    underline
                    color="danger.400">
                    {t('engineOilGuide')}
                  </Text>
                </HStack>
                <HStack alignItems="center" space={1}>
                  <Icon
                    as={Ionicons}
                    name="ios-add-circle"
                    size={5}
                    color="primary.400"
                  />
                  <Text
                    onPress={() => navigation.navigate('NewVehicle')}
                    underline
                    color="primary.400">
                    {t('addVehicle')}
                  </Text>
                </HStack>
              </HStack>
            </FormControl>

            <FormControl mb={3} isInvalid={'engineOilId' in errors} w="100%">
              <FormControl.Label>{t('engine')}</FormControl.Label>

              {engineOilLoading ? (
                <HStack alignItems="center" justifyContent="center">
                  <ActivityIndicator />
                </HStack>
              ) : (
                <Select
                  size="lg"
                  alignSelf={'center'}
                  placeholder={t('choose') as string}
                  selectedValue={values.engineOilId}
                  width="full"
                  borderRadius={'full'}
                  onValueChange={handleChange('engineOilId')}
                  _selectedItem={{
                    bg: 'primary.400',
                    endIcon: <CheckIcon size={3} />,
                  }}
                  mt={1}>
                  {engineOils?.map(item => (
                    <Select.Item
                      key={String(item.id)}
                      label={`RM${item.price} | ${item.name}`}
                      value={String(item.id)}
                    />
                  ))}
                </Select>
              )}

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.engineOilId}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={5} isInvalid={'oilFilterId' in errors} w="100%">
              <FormControl.Label>{t('oil')}</FormControl.Label>

              {oilFilterLoading ? (
                <HStack alignItems="center" justifyContent="center">
                  <ActivityIndicator />
                </HStack>
              ) : (
                <Select
                  size="lg"
                  alignSelf={'center'}
                  placeholder={t('choose') as string}
                  selectedValue={values.oilFilterId}
                  width="full"
                  borderRadius={'full'}
                  onValueChange={handleChange('oilFilterId')}
                  _selectedItem={{
                    bg: 'primary.400',
                    endIcon: <CheckIcon size={3} />,
                  }}
                  mt={1}>
                  {oilFilters?.map(item => (
                    <Select.Item
                      key={String(item.id)}
                      label={`RM${item.price} | ${item.name}`}
                      // label={`${item.name}`}
                      value={String(item.id)}
                    />
                  ))}
                </Select>
              )}

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.oilFilterId}
              </FormControl.ErrorMessage>
            </FormControl>

            <Button
              startIcon={<Icon as={Ionicons} name="cart" size={5} />}
              onPress={handleSubmit}
              colorScheme={'secondary'}
              size="lg"
              borderRadius="full"
              mt={5}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}>
              {getCartStatus() ? t('cart') : t('goToCart')}
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};
