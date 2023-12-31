import React, {FC, useEffect, useState} from 'react';
import {Box, Button, ScrollView, ChevronRightIcon, Text} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

import {CartMainCard} from './components/CartMainCard';
import {CartAddOnList} from './components/CartAddOnList';
import {ApplyCoupon} from './components/ApplyCoupon';
import {
  CartItem,
  CartItemType,
  useUserCart,
} from '../../../../hooks/user/cart/useUserCart';
import {Loader} from '../../../../components/Loader';
import {useMessage} from '../../../../hooks/useMessage';
import {deleteCart} from '../../../../services/order/deleteCart';
import {updateCart, UpdateCartAction} from '../../../../services';
import {
  AppliedCoupon,
  applyCoupon,
} from '../../../../services/coupon/applyCoupon';
import {CartScreenProps} from '../../../../navigation';

export const CartScreen: FC<CartScreenProps> = ({navigation, route}) => {
  const {userCart, isLoading, mutate} = useUserCart();

  const coupon = route.params?.coupon;

  const {t} = useTranslation('CartLang');

  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon>({
    couponDiscount: 0,
    coupon: '',
    finalAmount: 0,
  });
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [mainCard, setMainCard] = useState<CartItem | null>(null);
  const [addOn, setAddon] = useState<CartItem[]>([]);

  useEffect(() => {
    if (userCart && userCart?.length > 0) {
      const item = userCart?.find(c => c.productType === CartItemType.service);
      if (item) {
        setMainCard(item);
      }

      setAddon(userCart.filter(c => c.productType === CartItemType.addon));
      let total = 0;
      userCart.forEach((cItem: CartItem) => {
        total += Number(cItem.totalPrice) * Number(cItem.qty);
      });

      setCartTotal(total);
    }
  }, [userCart]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => mutate());

    return () => {
      unsubscribe();
    };
  }, [mutate, navigation]);

  const setMessage = useMessage();

  const removeCartItem = async (
    cartId: string,
    type?: CartItemType,
  ): Promise<void> => {
    try {
      const result = await deleteCart(cartId);
      if (type === CartItemType.service) {
        setMainCard(null);
      } else {
        setAddon(prevState =>
          prevState.filter(item => Number(item.id) !== Number(result)),
        );
      }
      setMessage(String(t('success')));
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      await mutate();
    }
  };

  const updateCartItem = async (
    itemId: number,
    itemQty: number,
    action: UpdateCartAction,
  ) => {
    try {
      await updateCart({itemId, action});
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      await mutate();
    }
  };

  useEffect(() => {
    if (coupon) {
      (async () => {
        try {
          const result = await applyCoupon(coupon);
          setAppliedCoupon({
            couponDiscount: result.couponDiscount,
            coupon: result.coupon,
            finalAmount: result.finalAmount,
          });
        } catch (e: any) {
          setMessage(e.message);
        }
      })();
    }
  }, [coupon, setMessage]);

  if (isLoading) {
    return <Loader />;
  }

  if (!mainCard?.id && addOn.length === 0) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text>{t('emptyCart')}</Text>
        <Text
          onPress={() => navigation.navigate('Choose')}
          fontSize="md"
          bold
          underline
          color="primary.400">
          {t('startShopping')}
        </Text>
      </Box>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <Box flex={1} m={4}>
          {mainCard?.id ? (
            <CartMainCard item={mainCard} onDelete={removeCartItem} />
          ) : null}

          <CartAddOnList
            items={addOn}
            onDelete={removeCartItem}
            onUpdate={updateCartItem}
          />

          <ApplyCoupon
            isApplied={!!appliedCoupon.coupon}
            onPress={() => {
              setAppliedCoupon({
                coupon: '',
                couponDiscount: 0,
                finalAmount: 0,
              });
              navigation.navigate('Cart');
              navigation.navigate('ApplyCoupons');
            }}
            code={coupon}
            discount={appliedCoupon.couponDiscount.toFixed(2)}
          />

          <Button
            size="lg"
            endIcon={<ChevronRightIcon size="md" />}
            onPress={() => {
              let amt = Number(cartTotal);
              if (appliedCoupon.couponDiscount) {
                amt = Number(appliedCoupon.finalAmount);
              }

              if (amt < 3) {
                setMessage(
                  'Minimum cart balance should be equal to or greater than RM 3.00',
                );
              } else {
                navigation.replace('SelectAddress', {
                  coupon: appliedCoupon.coupon,
                });
              }
            }}
            colorScheme="secondary"
            rounded="2xl">
            {appliedCoupon.couponDiscount
              ? `RM ${Number(appliedCoupon.finalAmount).toFixed(2)}`
              : `RM ${cartTotal.toFixed(2)}`}
          </Button>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
