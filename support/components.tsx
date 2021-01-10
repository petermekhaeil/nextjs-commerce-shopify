import React from 'react';
import { useRemoveItem, useUpdateItem, usePrice, useAddItem } from '../src';
import { CommerceProvider, useCommerce } from '../src/commerce';

export const Wrapper = ({ children }) => {
  return (
    <CommerceProvider
      config={{ domain: 'XXX', token: 'XXX', currencyCode: 'SGD' }}
    >
      {children}
    </CommerceProvider>
  );
};

export const CartItem = ({ item }) => {
  const removeItem = useRemoveItem();
  const updateItem = useUpdateItem(item);

  const { price } = usePrice({
    variant: item.variant
  });

  const handleRemove = async () => {
    await removeItem({ id: 'variant-id' });
  };

  const handleUpdate = async () => {
    await updateItem({ quantity: 2 });
  };

  return (
    <div key={item.index}>
      {item.title} {price} <button onClick={handleUpdate}>Update Item</button>
      <button onClick={handleRemove}>Remove Item</button>
    </div>
  );
};

export const App = () => {
  const { checkout } = useCommerce();
  const { price } = usePrice({ amount: 10 });
  const addItem = useAddItem();

  const itemsCount = checkout?.lineItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const items = checkout?.lineItems ?? [];

  const addToCart = async () => {
    await addItem({
      variantId: 'variant-id',
      quantity: 1
    });
  };

  return (
    <>
      <div data-testid="price">{price}</div>
      <button onClick={addToCart}>Add Item</button>
      <div data-testid="total-items">{itemsCount}</div>
      {items.map((item, index) => (
        <CartItem item={item} key={index} />
      ))}
    </>
  );
};
