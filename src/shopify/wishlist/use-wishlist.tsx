import { HookFetcher } from '@commerce/utils/types'
import { SwrOptions } from '@commerce/utils/use-data'
import useCommerceWishlist from '@commerce/wishlist/use-wishlist'
import useCustomer from '../use-customer'

const defaultOpts = {}

export type Wishlist = {
  items: [{ product_id: number; variant_id: number; id: number }]
}

export interface UseWishlistOptions {
  includeProducts?: boolean
}

export interface UseWishlistInput extends UseWishlistOptions {
  customerId?: number
}

export const fetcher: HookFetcher<Wishlist | null, UseWishlistInput> = () => {
  return null
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<Wishlist | null, UseWishlistInput>
) {
  const useWishlist = ({ includeProducts }: UseWishlistOptions = {}) => {
    const { data: customer } = useCustomer()
    const response = useCommerceWishlist(
      defaultOpts,
      [
        ['customerId', customer?.entityId],
        ['includeProducts', includeProducts],
      ],
      customFetcher,
      {
        revalidateOnFocus: false,
        ...swrOptions,
      }
    )

    Object.defineProperty(response, 'isEmpty', {
      get() {
        return true
      },
      set: (x) => x,
    })

    return response
  }

  useWishlist.extend = extendHook

  return useWishlist
}

export default extendHook(fetcher)
