import { useCallback } from 'react';
import { LineItemToAdd } from 'shopify-buy';
import { useCommerce } from './index';

const useAddItem = () => {
  const { checkout, client, updateCheckout } = useCommerce();

  return useCallback(
    async function addItem(lineItems: LineItemToAdd[]) {
      const cart = await client?.checkout.addLineItems(checkout.id, lineItems);
      updateCheckout(cart);
      return cart;
    },
    [checkout, client]
  );
};

export default useAddItem;
