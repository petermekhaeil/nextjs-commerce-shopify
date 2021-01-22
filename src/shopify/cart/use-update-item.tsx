import { useCallback } from 'react'
import { useCommerce } from '../index'
import { Product } from '../utils/types'

const useUpdateItem = (item: Product) => {
  const { checkout, client, updateCheckout } = useCommerce()

  return useCallback(
    async function updateItem({ quantity }: { quantity: number }) {
      const lineItemsToUpdate = [{ id: item.id, quantity }]

      const cart = await client?.checkout.updateLineItems(
        checkout.id,
        lineItemsToUpdate
      )

      updateCheckout(cart)

      return cart
    },
    [checkout, client]
  )
}

export default useUpdateItem
