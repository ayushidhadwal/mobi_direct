import React, {FC} from 'react';
import {Box} from 'native-base';
import {FlatList} from 'react-native';

import {AddOn, useAddOn} from '../../../../hooks/user/orders/useAddOn';
import {Loader} from '../../../../components/Loader';
import {AddOnItem} from './components/AddOnItem';
import {useCart} from '../../../../hooks/user/orders/useCart';
import {AddOnScreenProps} from '../../../../navigation';

export const AddOnScreen: FC<AddOnScreenProps> = () => {
  const {addOn, isLoading, mutate, isValidating} = useAddOn();

  const {updateAddOnCart, addToCart} = useCart(addOn, mutate);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box flex={1}>
      <FlatList
        contentContainerStyle={{marginVertical: 16}}
        data={addOn}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        renderItem={({item}: {item: AddOn}) => {
          return (
            <AddOnItem
              item={item}
              addToCart={addToCart}
              updateCart={updateAddOnCart}
            />
          );
        }}
        extraData={isValidating}
      />
    </Box>
  );
};
