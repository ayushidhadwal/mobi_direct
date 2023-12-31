import React, {FC} from 'react';
import {Box} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';

import {AuthAddressForm} from '../../../auth/AddAddressScreen/components/AuthAddressForm';
import {AddressDTO, updateUserAddresses} from '../../../../services';
import {useUserAddresses} from '../../../../hooks/user/useUserAddresses';
import {Loader} from '../../../../components/Loader';
import {useMessage} from '../../../../hooks/useMessage';
import {EditAddressScreenProps} from '../../../../navigation';

export const EditAddressScreen: FC<EditAddressScreenProps> = ({
  navigation,
  route,
}) => {
  const address = route.params;

  const {t} = useTranslation("AddAddressLang");

  const setMessage = useMessage();
  const {addresses, mutate, isLoading} = useUserAddresses();

  const onSubmitHandler = async (values: AddressDTO) => {
    try {
      const result = await updateUserAddresses(Number(address.id), values);
      if (addresses) {
        const index = addresses.findIndex(
          a => Number(a.id) === Number(address.id),
        );
        if (index > -1) {
          addresses[index] = result;
        }
        await mutate([...addresses]);
        setMessage(String(t("addressUpdated")));
        navigation.goBack();
      }
    } catch (e: any) {
      setMessage(e?.message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box flex={1} p={2}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <AuthAddressForm
          onSubmitHandler={onSubmitHandler}
          address={address.address}
          state={address.state}
          pinCode={address.pinCode}
          city={address.city}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};
