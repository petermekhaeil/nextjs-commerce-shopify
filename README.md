## Table of Contents

- [Getting Started](#getting-started)
- [General Usage](#general-usage)
  - [CommerceProvider](#commerceprovider)
  - [useCommerce](#usecommerce)
- [Hooks](#hooks)
  - [usePrice](#useprice)
  - [useAddItem](#useadditem)
  - [useRemoveItem](#useremoveitem)
  - [useUpdateItem](#useupdateitem)
- [APIs](#apis)
  - [getProduct](#getproduct)
  - [getAllProducts](#getallproducts)
  - [getAllCollections](#getallcollections)
  - [getAllPages](#getallpages)

# nextjs-commerce-shopify

Collection of hooks and data fetching functions to integrate Shopify in a React application. Designed to work with [Next.js Commerce](https://demo.vercel.store/).

> This package is still in heavy development until its ready to be merged back into [vercel/commerce](https://github.com/vercel/commerce). Once merged back into the project, these documentations will be updated with newer installation instructions.

## Getting Started

1. Copy [`shopify`](https://github.com/petermekhaeil/nextjs-commerce-shopify/tree/use-commerce-framework/src/shopify) folder into your [`framework`](https://github.com/vercel/commerce/tree/master/framework) folder.

2. Install dependencies:

```
yarn install shopify-buy
yarn install -D @types/shopify-buy
```

3. Environment variables need to be set:

```
SHOPIFY_STORE_DOMAIN=
SHOPIFY_STOREFRONT_ACCESS_TOKEN=
```

4. Point the framework to `shopify` by updating `tsconfig.json`:

```
"@framework/*": ["framework/shopify/*"],
"@framework": ["framework/shopify"]
```

5. Update image domains list in `next.config.js`:

```
module.exports = {
  images: {
    domains: ['cdn.shopify.com'],
  },
}
```

## General Usage

### CommerceProvider

Provider component that creates the commerce context for children.

```js
import { CommerceProvider } from 'nextjs-commerce-shopify'

const App = ({ children }) => {
  return (
    <CommerceProvider
      config={{
        domain: 'myshop.shopify.com',
        token: 'XXXXXX',
        currencyCode: 'SGD',
      }}
    >
      {children}
    </CommerceProvider>
  )
}

export default App
```

The `config` takes:

- `domain`: Shopify domain. This is **required**.
- `token`: Shopify Storefront API Access Token. This is **required**.
- `currencyCode`: Currency code to use in store. Defaults to your Shopify default currency.
- `locale`: Used for currency format and if your Shopify supports translated content. Defaults to `en-US`.

### useCommerce

Returns the configs that are defined in the nearest `CommerceProvider`. Also provides access to Shopify's `checkout` and `shop`.

```js
import { useCommerce } from 'nextjs-commerce-shopify'

const { checkout, shop } = useCommerce()
```

- `checkout`: The information required to checkout items and pay ([Documentation](https://shopify.dev/docs/storefront-api/reference/checkouts/checkout)).
- `shop`: Represents a collection of the general settings and information about the shop ([Documentation](https://shopify.dev/docs/storefront-api/reference/online-store/shop/index)).

## Hooks

### usePrice

Display the product variant price according to currency and locale.

```js
import { usePrice } from 'nextjs-commerce-shopify'

const { price } = usePrice({
  amount,
})
```

Takes in either `amount` or `variant`:

- `amount`: A price value for a particular item if the amount is known.
- `variant`: A shopify product variant. Price will be extracted from the variant.

### useAddItem

```js
import { useAddItem } from 'nextjs-commerce-shopify'

const AddToCartButton = ({ variantId, quantity }) => {
  const addItem = useAddItem()

  const addToCart = async () => {
    await addItem({
      variantId,
      quantity,
    })
  }

  return <button onClick={addToCart}>Add To Cart</button>
}
```

### useRemoveItem

```js
import { useRemoveItem } from 'nextjs-commerce-shopify'

const RemoveButton = ({ item }) => {
  const removeItem = useRemoveItem()

  const handleRemove = async () => {
    await removeItem({ id: item.id })
  }

  return <button onClick={handleRemove}>Remove</button>
}
```

### useUpdateItem

```js
import { useUpdateItem } from 'nextjs-commerce-shopify'

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity)
  const updateItem = useUpdateItem(item)

  const updateQuantity = async (e) => {
    const val = e.target.value
    await updateItem({ quantity: val })
  }

  return (
    <input
      type="number"
      max={99}
      min={0}
      value={quantity}
      onChange={updateQuantity}
    />
  )
}
```

## APIs

Collections of APIs to fetch data from a Shopify store.

The data is fetched using the [Shopify JavaScript Buy SDK](https://github.com/Shopify/js-buy-sdk#readme). Read the [Shopify Storefront API reference](https://shopify.dev/docs/storefront-api/reference) for more information.

### getProduct

Get a single product by its `handle`.

```js
import { getProduct, getConfig } from 'nextjs-commerce-shopify'

const config = getConfig()

const product = await getProduct({
  variables: { slug },
  config,
})
```

### getAllProducts

```js
import { getAllProducts, getConfig } from 'nextjs-commerce-shopify'

const config = getConfig()

const { products } = await getAllProducts({
  variables: { first: 12 },
  config,
})
```

### getAllCollections

```js
import { getAllCollections, getConfig } from 'nextjs-commerce-shopify'

const config = getConfig()

const collections = await getCollections({
  config,
})
```

### getAllPages

```js
import { getAllPages, getConfig } from 'nextjs-commerce-shopify'

const config = getConfig()

const pages = await getAllPages({
  variables: { first: 12 },
  config,
})
```
