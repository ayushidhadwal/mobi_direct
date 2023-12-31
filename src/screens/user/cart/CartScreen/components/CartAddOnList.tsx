import React, {FC} from 'react';
import {Divider, Text} from 'native-base';
import {NoAddonInCart} from './NoAddonInCart';
import { useTranslation } from 'react-i18next';

import {CartAddOnCard} from './CartAddOnCard';
import {
  CartItem,
  CartItemType,
} from '../../../../../hooks/user/cart/useUserCart';
import {UpdateCartAction} from '../../../../../services';

type Props = {
  items: CartItem[];
  onDelete: (cartId: string, type: CartItemType) => void;
  onUpdate: (itemId: number, itemQty: number, action: UpdateCartAction) => void;
};

export const CartAddOnList: FC<Props> = ({
  items,
  onDelete,
  onUpdate,
}: Props) => {
    const {t} = useTranslation('CartLang')

    return (
    <>
      <Text fontSize="lg" fontWeight="400" mt={3}>
          {t("addOn")}
      </Text>
      <Divider w={'10%'} backgroundColor={'primary.800'} mb={3} />

      {items.length === 0 ? (
        <NoAddonInCart />
      ) : (
        items.map(item => {
          return (
            <CartAddOnCard
              key={item.id}
              price={Number(Number(item.qty) * Number(item.totalPrice)).toFixed(
                2,
              )}
              qty={item.qty}
              name={item.addOnName as string}
              onDelete={() => onDelete(String(item.id), item.productType)}
              onQtyAdd={() =>
                onUpdate(Number(item.addOnId), item.qty, UpdateCartAction.add)
              }
              onQtyMinus={() =>
                onUpdate(Number(item.addOnId), item.qty, UpdateCartAction.minus)
              }
            />
          );
        })
      )}
    </>
  );
};
