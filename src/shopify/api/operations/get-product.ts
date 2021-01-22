import Client from 'shopify-buy'
import { ShopifyConfig } from '../index'
import { Product, ProductVariant } from '../../utils/types'
import toCommerceProducts from '../utils/to-commerce-products'

// TODO
type ProductOptions = {
  edges: [
    {
      node: {
        __typename: string
        displayName: string
        values: {
          edges: [
            {
              node: {
                label: string
              }
            }
          ]
        }
      }
    }
  ]
}

// TODO
export type ProductNode = Product & {
  productOptions: ProductOptions
  variants: Array<ProductVariant> & {
    edges: [
      {
        node: {
          productOptions: ProductOptions
        }
      }
    ]
  }
}

type Variables = {
  slug: string
}

type Options = {
  variables: Variables
  config: ShopifyConfig
  preview?: boolean
}

type ReturnType = {
  product: any
}

const getProduct = async (options: Options): Promise<ReturnType> => {
  const { variables, config } = options

  const client = Client.buildClient({
    storefrontAccessToken: config.apiToken,
    domain: config.commerceUrl,
  })

  const res = (await client.product.fetchByHandle(variables.slug)) as Product

  return {
    product: toCommerceProducts([res])[0].node,
  }
}

export default getProduct
