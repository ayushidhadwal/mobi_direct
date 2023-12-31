import React, {FC, useContext} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FormikHelpers} from 'formik';

import {AuthStackParamList} from '../../../navigation/AuthNavigator/AuthNavigator';
import {AddVehicleForm} from './components/AddVehicleForm';
import {VehicleDTO} from '../../../services';
import {AuthActionTypes, AuthContext} from '../../../contexts/auth';
import {useMessage} from '../../../hooks/useMessage';

type Props = NativeStackScreenProps<AuthStackParamList, 'AddVehicle'>;

export const AddAuthVehicleScreen: FC<Props> = ({navigation}) => {
  const {state, dispatch} = useContext(AuthContext);
  const setMessage = useMessage();

  const onSubmitHandler = async (
    values: VehicleDTO,
    {resetForm}: FormikHelpers<any>,
  ) => {
    const isDuplicate = state.vehicles.find(
      vehicle => vehicle.carPlateNumber === values.carPlateNumber,
    );

    if (!isDuplicate) {
      dispatch({
        type: AuthActionTypes.UPDATE_VEHICLES,
        payload: {
          vehicles: [values, ...state.vehicles],
          userToken: null,
          userType: null,
        },
      });
      resetForm();
      navigation.goBack();
    } else {
      setMessage('Duplicate Vehicle!');
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <AddVehicleForm onSubmit={onSubmitHandler} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
