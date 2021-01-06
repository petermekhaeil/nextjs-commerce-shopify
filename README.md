## Table of Contents

- [nextjs-commerce-shopify](#nextjs-commerce-shopify)
  - [Getting Started](#getting-started)
    - [CommerceProvider](#commerceprovider)
  - [Hooks](#hooks)
    - [usePrice](#useprice)
    - [useAddItem](#useadditem)
    - [useRemoveItem](#useremoveitem)
    - [useUpdateItem](#useupdateitem)
  - [APIs](#apis)
    - [getProduct](#getproduct)
    - [getAllProducts](#getallproducts)
    - [getCollections](#getcollections)
    - [getAllPages](#getallpages)

# nextjs-commerce-shopify

Collection of hooks and data fetching functions to integrate Shopify in a React application. Designed to work with Next.js (See [Next.js Commerce](https://demo.vercel.store/)).

> This project is under active development. APIs may change to suit the [Next.js Commerce Framework](https://github.com/vercel/commerce-framework).

## Getting Started

### CommerceProvider

Provider component that creates the commerce context for children.

```js
import { CommerceProvider } from 'nextjs-commerce-shopify';

const App = ({ children }) => {
  return (
    <CommerceProvider
      config={{
        domain: 'myshop.shopify.com',
        token: 'XXXXXX',
        currenyCode: 'SGD'
      }}
    >
      {children}
    </CommerceProvider>
  );
};

export default App;
```

The `config` takes:

- `domain`: Shopify domain. This is **required**.
- `token`: Shopify Storefront API Access Token. This is **required**.
- `currencyCode`: Currency code to use in store. This is **required**.

## Hooks

### usePrice

Display the product variant price according to currency and locale.

```js
import usePrice from 'nextjs-commerce-shopify/dist/use-price';

const { price } = usePrice({
  amount
});
```

Takes in either `amount` or `variant`:

- `amount`: A price value for a particular item if the amount is known.
- `variant`: A shopify product variant. Price will be extracted from the variant.

### useAddItem

```js
import useAddItem from 'nextjs-commerce-shopify/dist/use-add-item';

const AddToCartButton = ({ variantId, quantity }) => {
  const addItem = useAddItem();

  const addToCart = async () => {
    await addItem({
      variantId,
      quantity
    });
  };

  return <button onClick={addToCart}>Add To Cart</button>;
};
```

### useRemoveItem

```js
import useRemoveItem from 'nextjs-commerce-shopify/dist/use-remove-item';

const RemoveButton = ({ item }) => {
  const removeItem = useRemoveItem();

  const handleRemove = async () => {
    await removeItem({ id: item.id });
  };

  return <button onClick={handleRemove}>Remove</button>;
};
```

### useUpdateItem

```js
import useUpdateItem from 'nextjs-commerce-shopify/dist/use-update-item';

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const updateItem = useUpdateItem(item);

  const updateQuantity = async (e) => {
    const val = e.target.value;
    await updateItem({ quantity: val });
  };

  return (
    <input
      type="number"
      max={99}
      min={0}
      value={quantity}
      onChange={updateQuantity}
    />
  );
};
```

## APIs

Collections of APIs to fetch data from a Shopify store:

### getProduct

Get a single product by its `handle`.

```js
import getProduct from 'nextjs-commerce-shopify/dist/api/get-product';

const product = await getProduct({
  domain,
  token,
  handle
});
```

### getAllProducts

```js
import getAllProducts from 'nextjs-commerce-shopify/dist/api/get-all-products';

const products = await getAllProducts({
  domain,
  token
});
```

### getCollections

```js
import getCollections from 'nextjs-commerce-shopify/dist/api/get-collections';

const collections = await getCollections({
  domain,
  token
});
```

### getAllPages

```js
import getAllPages from 'nextjs-commerce-shopify/dist/api/get-all-pages';

const pages = await getAllPages({
  domain,
  token
});
```
