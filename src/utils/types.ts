import {
  Product as BaseProduct,
  ProductVariant as BaseProductVariant,
  Cart as BaseCart,
  CheckoutResource as BaseCheckoutResource,
  AttributeInput,
  Client as BaseClient,
  Shop as BaseShop
} from 'shopify-buy';

export type SelectedOptions = {
  id: string;
  name: string;
  value: string;
};

export type PresentmentPrice = {
  price: PriceV2;
};

export type ProductVariant = BaseProductVariant & {
  selectedOptions: Array<SelectedOptions>;
  presentmentPrices: Array<PresentmentPrice>;
};

export type Product = BaseProduct & {
  handle: string;
  descriptionHtml: string;
  variants: Array<ProductVariant>;
};

export type PriceV2 = {
  amount: number;
  currencyCode: string;
};

export type Cart = BaseCart & {
  webUrl?: string;
  currencyCode?: string;
  lineItemsSubtotalPrice?: PriceV2;
  totalPriceV2?: PriceV2;
};

export type Shop = BaseShop & {
  currencyCode?: string;
};

export type Create = {
  presentmentCurrencyCode?: string;
};

export type CheckoutResource = BaseCheckoutResource & {
  updateLineItems(
    checkoutId: string | number,
    lineItems: AttributeInput[]
  ): Promise<Cart>;

  create: (input: Create) => Promise<Cart>;
};

export type Client = BaseClient & {
  checkout: CheckoutResource;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  url: string;
};

export type PageEdge = {
  node: Page;
};
