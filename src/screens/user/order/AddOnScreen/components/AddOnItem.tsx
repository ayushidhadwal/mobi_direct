import React, {FC} from 'react';
import {HStack, IconButton, Image, Pressable, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';

import Config from '../../../../../config';
import {AddOn} from '../../../../../hooks/user/orders/useAddOn';
import {UpdateCartAction} from '../../../../../services';
import {UserNavigationProps} from '../../../../../navigation';

const {height} = Dimensions.get('window');

const HEIGHT = (height * 16) / 100;

type Props = {
  item: AddOn;
  addToCart: (itemId: number) => void;
  updateCart: (itemId: number, itemQty: number, type: UpdateCartAction) => void;
};

export const AddOnItem: FC<Props> = ({item, addToCart, updateCart}) => {
  const navigation = useNavigation<UserNavigationProps>();

  const onPress = () => {
    navigation.navigate('AddOnDetails', {
      addOn: item,
    });
  };

  return (
    <Pressable
      onPress={onPress}
      p={2}
      borderRadius={8}
      w={'45%'}
      ml={3}
      mb={3}
      backgroundColor={'white'}
      shadow={2}>
      <Image
        source={{
          uri: Config.API_URL + '/' + item.image,
        }}
        alt="Add on Image"
        resizeMode="contain"
        h={HEIGHT}
      />
      <Text color={'grey'} mt={1} numberOfLines={3}>
        {item.shortDesc}
      </Text>
      <HStack mt={2} justifyContent="space-between">
        <Text mt={1} color={'primary.400'} fontWeight={'400'} fontSize="sm">
          RM{Number(item.price).toFixed(2)}
        </Text>

        {item.isInCart ? (
          <HStack alignItems="center">
            <IconButton
              onPress={() =>
                updateCart(
                  Number(item.id),
                  Number(item.cartQty),
                  UpdateCartAction.minus,
                )
              }
              size="xs"
              _icon={{
                as: Ionicons,
                name: 'md-remove-circle',
                size: 'md',
                color: 'black',
              }}
            />
            <Text mx={1}>{item.cartQty}</Text>
            <IconButton
              onPress={() =>
                updateCart(
                  Number(item.id),
                  Number(item.cartQty),
                  UpdateCartAction.add,
                )
              }
              size="xs"
              _icon={{
                as: Ionicons,
                name: 'md-add-circle',
                size: 'md',
                color: 'black',
              }}
            />
          </HStack>
        ) : (
          <IconButton
            onPress={() => addToCart(Number(item.id))}
            size="xs"
            shadow={1}
            bg="#FFF"
            _icon={{
              as: Ionicons,
              name: 'cart',
              size: 'md',
              color: 'black',
            }}
          />
        )}
      </HStack>
    </Pressable>
  );
};
