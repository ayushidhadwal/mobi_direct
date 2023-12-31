import React, {FC} from 'react';
import {Box} from 'native-base';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {AuthStackParamList} from '../../../navigation';
import {AuthAddressForm} from './components/AuthAddressForm';
import {AddressDTO} from '../../../services';

type Props = NativeStackScreenProps<AuthStackParamList, 'AddAddress'>;

export const AddAddressScreen: FC<Props> = ({navigation, route}) => {
  const onSubmitHandler = async (values: AddressDTO) =>
    navigation.navigate('AuthVehicles', {...route.params, addresses: [values]});

  return (
    <Box flex={1} p={2}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <AuthAddressForm
          onSubmitHandler={onSubmitHandler}
          goBack={() => navigation.goBack()}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};
