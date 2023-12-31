import {useCallback, useState} from 'react';
import {KeyedMutator} from 'swr/_internal';

import {addOnAddToCart, updateCart, UpdateCartAction} from '../../../services';
import {useMessage} from '../../useMessage';
import {AddOn} from './useAddOn';

export type MutatedCartItem = {
  cartQty: number;
  isInCart: boolean;
};

export const useCart = (
  addOn: AddOn[] | undefined,
  mutate: KeyedMutator<any>,
) => {
  const [isLoading, setIsLoading] = useState(false);

  const setMessage = useMessage();

  const mutateAddOn = useCallback(
    async (itemId: number, qty: number): Promise<MutatedCartItem> => {
      let cartQty = null;
      let isInCart = null;

      if (addOn) {
        const updateAddOn = addOn.map(item => item);

        const index = updateAddOn.findIndex(
          item => Number(item.id) === Number(itemId),
        );

        if ((index as number) > -1) {
          cartQty = qty;
          isInCart = qty > 0;

          updateAddOn[index as number].cartQty = cartQty;
          updateAddOn[index as number].isInCart = isInCart;
        }
        await mutate([...updateAddOn]);
      }

      return {
        cartQty: cartQty as number,
        isInCart: isInCart as boolean,
      };
    },
    [addOn, mutate],
  );

  const addToCart = useCallback(
    async (itemId: number): Promise<MutatedCartItem | undefined> => {
      try {
        if (!isLoading) {
          setIsLoading(true);
          const id = await addOnAddToCart(Number(itemId));
          return await mutateAddOn(id, 1);
        }
      } catch (e: any) {
        setMessage(e?.message);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, mutateAddOn, setMessage],
  );

  const updateAddOnCart = useCallback(
    async (
      itemId: number,
      itemQty: number,
      action: UpdateCartAction,
    ): Promise<MutatedCartItem | undefined> => {
      try {
        if (!isLoading) {
          setIsLoading(true);
          const id = await updateCart({itemId, action});
          const qty =
            action === UpdateCartAction.add ? itemQty + 1 : itemQty - 1;
          return await mutateAddOn(id, qty);
        }
      } catch (e: any) {
        setMessage(e?.message);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, mutateAddOn, setMessage],
  );

  return {addToCart, updateAddOnCart};
};
