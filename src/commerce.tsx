import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect
} from 'react';
import Client from 'shopify-buy';
import { Shop, Cart, Client as ClientType } from './utils/types';

const Commerce = createContext<CommerceContextValue | {}>({});

type CommerceProps = {
  children?: ReactNode;
  config: CommerceConfig;
};

type CommerceConfig = {
  token: string;
  domain: string;
  currencyCode: string;
};

type CommerceContextValue = {
  token: string;
  domain: string;
  client?: ClientType;
  shop: Shop;
  checkout: Cart;
  currencyCode: string;
  updateCheckout: (cart: Cart | undefined) => void;
};

const TOKEN = 'nextjs-commerce-shopify-token';

const getCheckoutIdFromStorage = () => {
  if (window && window.sessionStorage) {
    return window.sessionStorage.getItem(TOKEN);
  }

  return null;
};

const setCheckoutIdInStorage = (id: string | number) => {
  if (window && window.sessionStorage) {
    return window.sessionStorage.setItem(TOKEN, id + '');
  }
};

export function CommerceProvider({ children, config }: CommerceProps) {
  const client = Client.buildClient({
    storefrontAccessToken: config.token,
    domain: config.domain
  }) as ClientType;

  const [shop, setShop] = useState<Shop>();
  const [checkout, setCheckout] = useState<Cart>();

  const fetchShopify = async () => {
    const shopInfo = await client.shop.fetchInfo();
    let checkoutResource: Cart;

    const checkoutOptions = {
      presentmentCurrencyCode: config.currencyCode
    };

    let checkoutId = getCheckoutIdFromStorage();

    // we could have a cart id stored in session storage
    // user could be refreshing or navigating back and forth
    if (checkoutId) {
      checkoutResource = await client.checkout.fetch(checkoutId);

      // could be expired order - we will create a new order
      if (checkoutResource.completedAt) {
        checkoutResource = await client.checkout.create(checkoutOptions);
      }
    } else {
      checkoutResource = await client.checkout.create(checkoutOptions);
    }

    setCheckoutIdInStorage(checkoutResource.id);

    setShop(shopInfo);
    setCheckout(checkoutResource);
  };

  useEffect(() => {
    fetchShopify();
  }, []);

  const updateCheckout = (newCheckout: Cart) => {
    setCheckout(newCheckout);
  };

  // Because the config is an object, if the parent re-renders this provider
  // will re-render every consumer unless we memoize the config
  const cfg = useMemo(
    () => ({
      client,
      checkout,
      shop,
      currencyCode: config.currencyCode,
      updateCheckout: updateCheckout
    }),
    [client]
  );

  return <Commerce.Provider value={cfg}>{children}</Commerce.Provider>;
}

export function useCommerce<T extends CommerceContextValue>() {
  return useContext(Commerce) as T;
}
