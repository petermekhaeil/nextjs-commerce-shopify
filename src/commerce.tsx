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
  currencyCode?: string;
  locale?: string;
  sessionToken?: string;
};

type CommerceContextValue = {
  client: ClientType;
  shop: Shop;
  checkout: Cart;
  updateCheckout: (cart: Cart | undefined) => void;
  currencyCode: string;
  locale: string;
  sessionToken: string;
};

const getCheckoutIdFromStorage = (token: string) => {
  if (window && window.sessionStorage) {
    return window.sessionStorage.getItem(token);
  }

  return null;
};

const setCheckoutIdInStorage = (token: string, id: string | number) => {
  if (window && window.sessionStorage) {
    return window.sessionStorage.setItem(token, id + '');
  }
};

const defaults = {
  locale: 'en-US',
  sessionToken: 'nextjs-commerce-shopify-token'
};

export function CommerceProvider({ children, config }: CommerceProps) {
  const sessionToken = config.sessionToken || defaults.sessionToken;
  const locale = config.locale || defaults.locale;

  const client = Client.buildClient({
    storefrontAccessToken: config.token,
    domain: config.domain,
    language: locale
  }) as ClientType;

  const [shop, setShop] = useState<Shop>();
  const [checkout, setCheckout] = useState<Cart>();

  const fetchShopify = async () => {
    const shopInfo: Shop = await client.shop.fetchInfo();
    let checkoutResource: Cart;

    const checkoutOptions = {
      presentmentCurrencyCode: config.currencyCode || shopInfo?.currencyCode
    };

    let checkoutId = getCheckoutIdFromStorage(sessionToken);

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

    setCheckoutIdInStorage(sessionToken, checkoutResource.id);

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
      updateCheckout: updateCheckout,
      currencyCode: config.currencyCode || checkout?.currencyCode,
      locale,
      sessionToken
    }),
    [client]
  );

  return <Commerce.Provider value={cfg}>{children}</Commerce.Provider>;
}

export function useCommerce<T extends CommerceContextValue>() {
  return useContext(Commerce) as T;
}
