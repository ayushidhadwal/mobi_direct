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
import {useTranslation} from 'react-i18next';
import {useWorkShopList} from '../../../../../hooks/user/appointment/useWorkShopList';

type Props = {
  onSubmit: ({
    id,
    name,
    address,
  }: {
    id: number;
    name: string;
    address: string;
  }) => void;
  onSelect: (value: number) => void;
};

type ChooseWorkShopDTO = {
  workShop: '';
};

export const SelectWorkshop: FC<Props> = ({onSubmit, onSelect}) => {
  const {t} = useTranslation('WorkshopLang');

  const {workShopList, isLoading} = useWorkShopList();

  const initialValues: ChooseWorkShopDTO = {
    workShop: '',
  };

  const onSubmitForm = async (values: ChooseWorkShopDTO) => {
    const workshop = workShopList?.find(
      item => Number(item.workShopId) === Number(values.workShop),
    );
    if (workshop) {
      onSubmit({
        id: workshop?.workShopId,
        name: workshop?.name,
        address: workshop?.address,
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmitForm}>
      {({setFieldValue, isSubmitting, handleSubmit, values, errors}) => {
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
                  onValueChange={(value: string) => {
                    setFieldValue('workShop', value);
                    onSelect(Number(value));
                  }}
                  _selectedItem={{
                    bg: 'primary.400',
                    endIcon: <CheckIcon size={3} />,
                  }}
                  mt={1}>
                  {workShopList
                    ? [
                        {
                          workShopId: '',
                          name: '',
                          address: '--Select Workshop--',
                        },
                        ...workShopList,
                      ]?.map(item => (
                        <Select.Item
                          key={String(item.workShopId)}
                          label={`${item.name}`}
                          value={String(item.workShopId)}
                        />
                      ))
                    : null}
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
              isDisabled={isSubmitting || !values.workShop}>
              {t('continue')}
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};
