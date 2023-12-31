import React, {FC, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useUserAddresses} from '../../../../hooks/user/useUserAddresses';
import {Loader} from '../../../../components/Loader';
import {EmptySelectAddress} from './components/EmptySelectAddress';
import {Address} from '../../../../services';
import {SelectAddressItem} from './components/SelectAddressItem';
import {useUserProfile} from '../../../../hooks/user/useUserProfile';
import {AppointmentAddressScreenProps} from '../../../../navigation';
import {SelectWorkshop} from './components/SelectWorkshop';
import {Box, Divider} from 'native-base';
import {formatAddress} from '../../../../utils/formatAddress';

export const AppointmentAddressScreen: FC<AppointmentAddressScreenProps> = ({
  navigation,
  route,
}) => {
  const {date, appointmentTimeId, appointmentTime, orderCode, vehicleCode} =
    route.params;

  const [selectedWorkshop, setSelectedWorkshop] = useState<number | null>(null);
  const {isLoading: isProfileLoading, mutate: profileMutate} = useUserProfile();
  const {isLoading, addresses, mutate: addressMutate} = useUserAddresses();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await Promise.all([addressMutate, profileMutate]);
    });

    return () => {
      unsubscribe();
    };
  }, [addressMutate, navigation, profileMutate]);

  if (isLoading || isProfileLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      {!selectedWorkshop ? (
        <Box flex={1}>
          {addresses && addresses?.length > 0 ? (
            <FlatList
              contentContainerStyle={{marginVertical: 16}}
              data={addresses}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => String(item.id)}
              renderItem={({item}: {item: Address}) => (
                <SelectAddressItem
                  address={item.address}
                  city={item.city}
                  pinCode={item.pinCode}
                  state={item.state}
                  onSelect={() => {
                    navigation.navigate('AppointmentSummary', {
                      date: date,
                      appointmentTimeId: appointmentTimeId,
                      appointmentTime: appointmentTime,
                      orderCode: orderCode,
                      vehicleCode: vehicleCode,
                      addressId: item.id,
                      address: formatAddress(
                        item.address,
                        item.state,
                        item.city,
                        item.pinCode,
                      ),
                      workshopId: null,
                      workshopName: null,
                      workshopAddress: null,
                    });
                  }}
                />
              )}
            />
          ) : (
            <EmptySelectAddress
              onAddressPress={() => navigation.navigate('NewAddress')}
              addressError={addresses?.length !== 0}
              onProfilePress={() => navigation.navigate('UpdateProfile')}
              profileError={false}
            />
          )}
        </Box>
      ) : null}
      <Divider bg="muted.200" />

      <SelectWorkshop
        onSelect={setSelectedWorkshop}
        onSubmit={({id, name, address}) => {
          navigation.navigate('AppointmentSummary', {
            date: date,
            appointmentTimeId: appointmentTimeId,
            appointmentTime: appointmentTime,
            orderCode: orderCode,
            vehicleCode: vehicleCode,
            addressId: null,
            address: null,
            workshopId: id,
            workshopName: name,
            workshopAddress: address,
          });
        }}
      />
    </SafeAreaView>
  );
};
