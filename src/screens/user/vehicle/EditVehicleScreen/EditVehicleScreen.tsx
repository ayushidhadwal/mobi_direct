import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Keyboard} from 'react-native';
import { useTranslation } from 'react-i18next';

import {Loader} from '../../../../components/Loader';
import {useUserVehicles} from '../../../../hooks/user/useUserVehicles';
import {useMessage} from '../../../../hooks/useMessage';
import {updateUserVehicle, VehicleDTO} from '../../../../services';
import {AddVehicleForm} from '../../../auth/AddAuthVehicleScreen/components/AddVehicleForm';
import {EditVehicleScreenProps} from '../../../../navigation';

export const EditVehicleScreen: FC<EditVehicleScreenProps> = ({
  navigation,
  route,
}) => {
  const vehicle = route.params;
  const {t} = useTranslation('AddVehiclesLang');

  const {vehicles, isLoading, mutate} = useUserVehicles();

  const setMessage = useMessage();

  const onSubmitHandler = async (values: VehicleDTO) => {
    try {
      Keyboard.dismiss();
      const result = await updateUserVehicle(Number(vehicle.id), values);
      if (vehicles) {
        const index = vehicles.findIndex(
          a => Number(a.id) === Number(vehicle.id),
        );
        if (index > -1) {
          vehicles[index] = result;
        }
        await mutate([...vehicles]);
        setMessage(String(t("vehicleUpdated")));
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
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <AddVehicleForm onSubmit={onSubmitHandler} edit={vehicle} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
