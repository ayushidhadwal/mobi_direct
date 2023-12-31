import React, {FC} from 'react';
import {Fab, Icon} from 'native-base';
import {FlatList, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';

import {useUserAddresses} from '../../../../hooks/user/useUserAddresses';
import {Loader} from '../../../../components/Loader';
import {AddressItem} from './components/AddressItem';
import {EmptyAddress} from './components/EmptyAddress';
import {Address, deleteUserAddresses} from '../../../../services';
import {useMessage} from '../../../../hooks/useMessage';
import {AddressScreenProps} from '../../../../navigation';

export const AddressScreen: FC<AddressScreenProps> = ({navigation}) => {
  const {addresses, isLoading, mutate, isValidating} = useUserAddresses();

  const addAddress = () => navigation.navigate('NewAddress');

  const setMessage = useMessage();

  const deleteAddress = async (addressId: number) => {
    try {
      await deleteUserAddresses(addressId);
      if (addresses) {
        await mutate(
          addresses?.filter(
            address => Number(address.id) !== Number(addressId),
          ),
        );
      }
    } catch (e: any) {
      setMessage(e?.message);
    }
  };

  const isFocused = useIsFocused();
  const {bottom} = useSafeAreaInsets();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.screen}>
      {isFocused && (
        <Fab
          placement="bottom-right"
          onPress={addAddress}
          size="md"
          bottom={bottom ? bottom : null}
          icon={<Icon color="white" as={<AntDesign name="plus" />} size="md" />}
        />
      )}
      <FlatList
        refreshing={isValidating}
        onRefresh={() => mutate()}
        data={addresses}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={<EmptyAddress onPress={addAddress} />}
        renderItem={({item}: {item: Address}) => (
          <AddressItem
            id={item.id}
            address={item.address}
            city={item.city}
            pinCode={item.pinCode}
            state={item.state}
            deleteAddress={deleteAddress}
            editAddress={() => navigation.navigate('EditAddress', item)}
          />
        )}
        contentContainerStyle={styles.contentContainer}
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
