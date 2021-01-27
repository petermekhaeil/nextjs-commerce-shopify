import { useCommerce } from '../index'

export function emptyHook() {
  const { checkout } = useCommerce()
  const { lineItems, totalPriceV2 } = checkout || {}

  return {
    data: {
      base_amount: totalPriceV2?.amount || 0,
      cart_amount: totalPriceV2?.amount || 0,
      currency: {
        code: '',
      },
      line_items: {
        physical_items:
          lineItems?.map((item) => {
            return {
              id: item.id,
              name: item.title,
              image_url: '/jacket.png',
              url: '/',
              quantity: item.quantity,
            }
          }) || [],
      },
    },
    isEmpty: false,
  }
}

export default emptyHook
