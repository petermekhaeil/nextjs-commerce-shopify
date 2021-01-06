import { Page, PageEdge } from '../utils/types';

type Options = {
  domain: string;
  token: string;
};

const getAllPages = async (options: Options): Promise<Page[]> => {
  const { domain, token } = options;

  const url = `https://${domain}/api/2020-07/graphql.json`;

  const query = `
    {
      pages(first: 100) {
        edges {
          node {
            id
            title
            handle
            body
            bodySummary
            url
          }
        }
      }
    }
  `;

  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token
    },
    body: JSON.stringify({ query })
  };

  const res = await fetch(url, opts).then((res) => res.json());

  return res.data.pages.edges.map(({ node }: PageEdge) => node);
};

export default getAllPages;
