import React, {FC, useEffect} from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useUserAddresses} from '../../../../hooks/user/useUserAddresses';
import {Loader} from '../../../../components/Loader';
import {EmptySelectAddress} from './components/EmptySelectAddress';
import {Address} from '../../../../services';
import {SelectAddressItem} from './components/SelectAddressItem';
import {useUserProfile} from '../../../../hooks/user/useUserProfile';
import {SelectAddressScreenProps} from '../../../../navigation';

export const SelectAddressScreen: FC<SelectAddressScreenProps> = ({
  navigation,
  route,
}) => {
  const {
    isLoading: isProfileLoading,
    profile,
    mutate: profileMutate,
  } = useUserProfile();
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
      {(addresses?.length === 0 || !profile?.name) && (
        <EmptySelectAddress
          onAddressPress={() => navigation.navigate('NewAddress')}
          addressError={addresses?.length === 0}
          onProfilePress={() => navigation.navigate('UpdateProfile')}
          profileError={!profile?.name}
        />
      )}

      {addresses && addresses?.length > 0 && profile?.name ? (
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
                navigation.replace('CartOrderDetails', {
                  coupon: route.params.coupon,
                  addressId: item.id,
                });
              }}
            />
          )}
        />
      ) : null}
    </SafeAreaView>
  );
};
