import {
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {UpdateCartAction} from '../../../../../services';
import {MutatedCartItem} from '../../../../../hooks/user/orders/useCart';

type Props = {
  cartId: number;
  isCart: boolean;
  cartQty: number;
  addToCart: (itemId: number) => Promise<MutatedCartItem | undefined>;
  updateCart: (
    itemId: number,
    itemQty: number,
    type: UpdateCartAction,
  ) => Promise<MutatedCartItem | undefined>;
  price: string;
  goToCart: () => void;
};

export const AddonDetailsFooter: FC<Props> = ({
  cartId,
  isCart,
  cartQty,
  addToCart,
  updateCart,
  price,
  goToCart,
}) => {
  const {t} = useTranslation('DetailsLang');

  const [inCart, setInCart] = useState<boolean>(isCart);
  const [qty, setQty] = useState<number>(cartQty);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const _addToCart = async () => {
    if (!isLoading) {
      setIsLoading(true);
      const result = await addToCart(cartId);
      updateState(result as MutatedCartItem);
      setIsLoading(false);
    }
  };

  const _updateCart = async (action: UpdateCartAction) => {
    if (!isLoading) {
      setIsLoading(true);
      const result = await updateCart(Number(cartId), Number(qty), action);
      updateState(result as MutatedCartItem);
      setIsLoading(false);
    }
  };

  const updateState = (result: MutatedCartItem) => {
    if (result) {
      setQty(result.cartQty);
      setInCart(result.isInCart);
    }
  };

  return (
    <VStack p={3} justifyContent="space-between">
      <HStack justifyContent="space-between" mb={3} space={2}>
        <VStack flex={1}>
          <Text fontSize={'md'} fontWeight={'400'}>
            {t('price')}
          </Text>
          <Divider w={5} my={1} backgroundColor={'primary.800'} />

          <Text color={'primary.400'} fontSize={'md'} fontWeight={'400'}>
            RM{price}
          </Text>
        </VStack>

        {inCart && (
          <HStack
            borderRadius="full"
            alignItems="center"
            flex={1 / 2}
            justifyContent="space-between">
            <IconButton
              onPress={() => _updateCart(UpdateCartAction.minus)}
              size="md"
              _icon={{
                as: Ionicons,
                name: 'md-remove-circle',
                size: 'lg',
              }}
            />
            <Text fontWeight="400" fontSize="md">
              {qty}
            </Text>
            <IconButton
              onPress={() => _updateCart(UpdateCartAction.add)}
              size="md"
              _icon={{
                as: Ionicons,
                name: 'md-add-circle',
                size: 'lg',
              }}
            />
          </HStack>
        )}
      </HStack>

      {inCart ? (
        <Button
          onPress={goToCart}
          disabled={isLoading}
          isLoading={isLoading}
          colorScheme="secondary"
          size="lg"
          borderRadius="full"
          startIcon={
            <Icon as={Ionicons} name="cart" size={5} color={'white'} />
          }>
          {t("goToCart")}
        </Button>
      ) : (
        <Button
          onPress={_addToCart}
          disabled={isLoading}
          isLoading={isLoading}
          colorScheme="secondary"
          size="lg"
          borderRadius="full"
          startIcon={
            <Icon as={Ionicons} name="cart" size={5} color={'white'} />
          }>
          {t('add')}
        </Button>
      )}
    </VStack>
  );
};
