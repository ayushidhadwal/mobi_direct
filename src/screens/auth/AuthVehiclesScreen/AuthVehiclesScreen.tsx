import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {AddIcon, Button} from 'native-base';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {AuthStackParamList} from '../../../navigation/AuthNavigator/AuthNavigator';
import {NoVehicles} from './components/NoVehicles';
import {Vehicles} from './components/Vehicles';
import {useMessage} from '../../../hooks/useMessage';
import {register} from '../../../services';
import {AuthActionTypes, AuthContext} from '../../../contexts/auth';

type Props = NativeStackScreenProps<AuthStackParamList, 'AuthVehicles'>;

export const AuthVehiclesScreen: FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation('VehiclesLang');

  const onAddVehicles = useCallback(
    () => navigation.navigate('AddVehicle'),
    [navigation],
  );

  const [loading, setLoading] = useState(false);

  const {dispatch, state} = useContext(AuthContext);
  const setMessage = useMessage();

  const onRegisterFinish = async () => {
    try {
      setLoading(true);
      const result = await register({
        ...route.params,
        vehicles: state.vehicles,
      });

      dispatch({
        type: AuthActionTypes.SIGN_IN,
        payload: {
          userToken: result.userToken,
          userType: result.userType,
          vehicles: [],
        },
      });
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.vehicles.length > 0) {
      navigation.setOptions({
        headerRight: () => (
          <Button
            colorScheme={'secondary'}
            size={'sm'}
            leftIcon={<AddIcon />}
            onPress={onAddVehicles}>
            {t('add')}
          </Button>
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => null,
      });
    }
  }, [navigation, onAddVehicles, state.vehicles.length, t]);

  const {bottom} = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      {state.vehicles.length === 0 ? (
        <NoVehicles onPress={onAddVehicles} />
      ) : (
        <Vehicles data={state.vehicles} />
      )}

      {state.vehicles.length > 0 && (
        <Button
          onPress={onRegisterFinish}
          colorScheme={'secondary'}
          w={'30%'}
          borderRadius={100}
          position="absolute"
          bottom={bottom ? bottom : 5}
          right={5}
          isLoading={loading}
          isDisabled={loading}>
          {t('finish')}
        </Button>
      )}
    </SafeAreaView>
  );
};
