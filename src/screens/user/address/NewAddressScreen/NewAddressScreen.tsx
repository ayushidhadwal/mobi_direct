import React, {FC} from 'react';
import {Box} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';

import {AuthAddressForm} from '../../../auth/AddAddressScreen/components/AuthAddressForm';
import {AddressDTO, addUserAddresses} from '../../../../services';
import {useUserAddresses} from '../../../../hooks/user/useUserAddresses';
import {Loader} from '../../../../components/Loader';
import {useMessage} from '../../../../hooks/useMessage';
import {NewAddressScreenProps} from '../../../../navigation';

export const NewAddressScreen: FC<NewAddressScreenProps> = ({navigation}) => {
  const {t} = useTranslation('AddressLang');

  const setMessage = useMessage();
  const {addresses, mutate, isLoading} = useUserAddresses();

  const onSubmitHandler = async (values: AddressDTO) => {
    try {
      const result = await addUserAddresses(values);
      if (addresses) {
        await mutate([result, ...addresses]);
        setMessage(String(t('newAddressAdded')));
        navigation.goBack();
      }
    } catch (e: any) {
      setMessage(e?.message);
      console.log(e?.message);
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
        <AuthAddressForm onSubmitHandler={onSubmitHandler} />
      </KeyboardAwareScrollView>
    </Box>
  );
};
