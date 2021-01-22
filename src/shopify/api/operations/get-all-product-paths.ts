import Client from 'shopify-buy'
import { getConfig } from '../index'
import { Product } from '../../utils/types'
import toCommerceProducts from '../utils/to-commerce-products'

type ReturnType = {
  products: any[]
}

const getAllProductPaths = async (): Promise<ReturnType> => {
  const config = getConfig()

  const client = Client.buildClient({
    storefrontAccessToken: config.apiToken,
    domain: config.commerceUrl,
  })

  const res = (await client.product.fetchAll()) as Product[]

  const products = toCommerceProducts(res)

  return {
    products,
  }
}

export default getAllProductPaths
