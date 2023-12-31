import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Keyboard} from 'react-native';
import { useTranslation } from 'react-i18next';

import {Loader} from '../../../../components/Loader';
import {useUserVehicles} from '../../../../hooks/user/useUserVehicles';
import {AddVehicleForm} from '../../../auth/AddAuthVehicleScreen/components/AddVehicleForm';
import {useMessage} from '../../../../hooks/useMessage';
import {addUserVehicle, VehicleDTO} from '../../../../services';
import {NewVehicleScreenProps} from '../../../../navigation';

export const NewVehicleScreen: FC<NewVehicleScreenProps> = ({navigation}) => {
  const {vehicles, isLoading, mutate} = useUserVehicles();
  const {t} = useTranslation('AddVehiclesLang');

  const setMessage = useMessage();

  const onSubmitHandler = async (values: VehicleDTO) => {
    try {
      Keyboard.dismiss();
      const result = await addUserVehicle(values);
      if (vehicles) {
        await mutate([result, ...vehicles]);
        setMessage(String(t("newVehicleAdded")));
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
        <AddVehicleForm onSubmit={onSubmitHandler} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
