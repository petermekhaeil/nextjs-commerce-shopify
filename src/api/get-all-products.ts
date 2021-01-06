import Client from 'shopify-buy';
import { Product } from '../utils/types';

type Options = {
  domain: string;
  token: string;
};

const getAllProducts = async (options: Options): Promise<Product[]> => {
  const { domain, token } = options;

  const client = Client.buildClient({
    storefrontAccessToken: token,
    domain: domain
  });

  const res = await client.product.fetchAll();

  return JSON.parse(JSON.stringify(res));
};

export default getAllProducts;
