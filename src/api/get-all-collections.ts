import Client from 'shopify-buy';

type Options = {
  domain: string;
  token: string;
};

const getAllCollections = async (options: Options) => {
  const { domain, token } = options;

  const client = Client.buildClient({
    storefrontAccessToken: token,
    domain: domain
  });

  const res = await client.collection.fetchAllWithProducts();

  return JSON.parse(JSON.stringify(res));
};

export default getAllCollections;
