import { Product, Image } from '../../utils/types'

export default function toCommerceProducts(products: Product[]) {
  return products.map((product: Product) => {
    return {
      node: {
        id: product.id,
        entityId: product.id,
        name: product.title,
        title: product.title,
        vendor: product.vendor,
        description: product.descriptionHtml,
        path: `/${product.handle}`,
        prices: {
          price: {
            value: +product.variants[0].price,
            currencyCode: 'AUD',
          },
        },
        images: {
          edges: product.images.map((image: Image) => {
            return {
              node: {
                urlOriginal: image.src,
              },
            }
          }),
        },
        variants: [],
        productOptions: {
          edges: [],
        },
        options: [],
      },
    }
  })
}
