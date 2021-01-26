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
        variants: {
          edges: product.variants.map((variant) => {
            return {
              node: {
                productOptions: variant.selectedOptions.map(
                  (selectedOption) => {
                    return {
                      node: {
                        __typename: 'MultipleChoiceOption',
                        displayName: selectedOption.name,
                        values: {
                          edges: [
                            {
                              node: {
                                label: selectedOption.value,
                              },
                            },
                          ],
                        },
                      },
                    }
                  }
                ),
              },
            }
          }),
        },
        productOptions: {
          edges: product.options.map((option) => {
            return {
              node: {
                __typename: 'MultipleChoiceOption',
                displayName: option.name,
                values: {
                  edges: option.values.map((value) => {
                    return {
                      node: {
                        entityId: 1,
                        label: value.value,
                        hexColors: [value.value],
                      },
                    }
                  }),
                },
              },
            }
          }),
        },
        options: [],
      },
    }
  })
}
