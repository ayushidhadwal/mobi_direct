import React, {FC, useCallback} from 'react';
import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
import {Fab, Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';
import {FlatList, StyleSheet} from 'react-native';

import {Loader} from '../../../../components/Loader';
import {useUserVehicles} from '../../../../hooks/user/useUserVehicles';
import {deleteUserVehicle, Vehicle} from '../../../../services';
import {useMessage} from '../../../../hooks/useMessage';
import {VehicleCard} from './components/VehicleCard';
import {VehiclesScreenProps} from '../../../../navigation';
import {EmptyVehicles} from './components/EmptyVehicles';

export const VehiclesScreen: FC<VehiclesScreenProps> = ({navigation}) => {
  const {vehicles, isLoading, mutate, isValidating} = useUserVehicles();

  const onAddVehicles = useCallback(
    () => navigation.navigate('NewVehicle'),
    [navigation],
  );

  const setMessage = useMessage();

  const deleteVehicle = async (vehicleId: number) => {
    try {
      await deleteUserVehicle(vehicleId);
      if (vehicles) {
        await mutate(
          vehicles?.filter(vehicle => Number(vehicle.id) !== Number(vehicleId)),
        );
      }
    } catch (e: any) {
      setMessage(e?.message);
    }
  };

  const {bottom} = useSafeAreaInsets();
  const isFocused = useIsFocused();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.screen}>
      {isFocused && (
        <Fab
          onPress={onAddVehicles}
          placement="bottom-right"
          size="md"
          bottom={bottom ? bottom : null}
          icon={<Icon color="white" as={<AntDesign name="plus" />} size="md" />}
        />
      )}

      <FlatList
        refreshing={isValidating}
        onRefresh={() => mutate()}
        ListEmptyComponent={<EmptyVehicles onPress={onAddVehicles} />}
        contentContainerStyle={styles.contentContainer}
        data={vehicles}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={({item}: {item: Vehicle}) => (
          <VehicleCard
            id={item.id}
            made={item.made}
            model={item.model}
            year={item.year}
            roadTaxDueDate={item.roadTaxDueDate}
            carPlateNumber={item.carPlateNumber}
            lastServiceMileage={item.lastServiceMileage}
            averageMileage={item.averageMileage}
            engineOilTypeName={item.engineOilTypeName as string}
            deleteVehicle={deleteVehicle}
            editVehicle={() => navigation.navigate('EditVehicle', item)}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    marginVertical: 16,
  },
  screen: {
    flex: 1,
  },
});
