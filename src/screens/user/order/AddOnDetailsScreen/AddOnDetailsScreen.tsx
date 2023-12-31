import React, {FC} from 'react';
import {Text, Image, ScrollView, Box, Divider} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';

import Config from '../../../../config';
import {AddonDetailsFooter} from './components/AddonDetailsFooter';
import {useCart} from '../../../../hooks/user/orders/useCart';
import {useAddOn} from '../../../../hooks/user/orders/useAddOn';
import {Loader} from '../../../../components/Loader';
import {AddOnDetailsScreenProps} from '../../../../navigation';

const {height} = Dimensions.get('window');

const HEIGHT = (height * 30) / 100;

export const AddOnDetailsScreen: FC<AddOnDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const {addOn: item} = route.params;

  const {addOn, isLoading, mutate} = useAddOn();

  const {updateAddOnCart, addToCart} = useCart(addOn, mutate);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 0.9}}>
        <Image
          source={{uri: Config.API_URL + '/' + item.image}}
          alt="Add On Image"
          resizeMode={'contain'}
          w="100%"
          h={HEIGHT}
        />
        <Box m={4}>
          <Text fontSize={'md'} fontWeight={'400'}>
            {item.shortDesc}
          </Text>
          <Divider w={8} backgroundColor={'primary.800'} mb={3} />

          <Text color={'grey'} mb={3}>
            {item.longDesc}
          </Text>
        </Box>
      </ScrollView>

      <AddonDetailsFooter
        cartId={Number(item.id)}
        cartQty={item.cartQty}
        isCart={item.isInCart}
        addToCart={addToCart}
        updateCart={updateAddOnCart}
        price={item.price}
        goToCart={() => navigation.navigate('Cart')}
      />
    </SafeAreaView>
  );
};
