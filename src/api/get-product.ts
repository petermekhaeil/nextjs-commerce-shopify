import Client from 'shopify-buy';
import { Product } from '../utils/types';

type Options = {
  domain: string;
  token: string;
  handle: string;
};

const getProduct = async (options: Options): Promise<Product> => {
  const { domain, token, handle } = options;

  const client = Client.buildClient({
    storefrontAccessToken: token,
    domain: domain
  });

  const res = await client.product.fetchByHandle(handle);

  return JSON.parse(JSON.stringify(res));
};

export default getProduct;
