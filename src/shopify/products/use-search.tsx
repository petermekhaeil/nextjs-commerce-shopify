import type { HookFetcher } from '@commerce/utils/types'
import type { SwrOptions } from '@commerce/utils/use-data'
import useCommerceSearch from '@commerce/products/use-search'
import { ProductEdge } from '@framework/utils/types'

const defaultOpts = {}

export type SearchProductsInput = {
  search?: string
  categoryId?: number
  brandId?: number
  sort?: string
}

export type SearchProductsData = {
  products: ProductEdge[]
  found: boolean
}

export const fetcher: HookFetcher<SearchProductsData, SearchProductsInput> = (
  options,
  { search, categoryId, brandId, sort },
  fetch
) => {
  return { found: false, products: [] }
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<SearchProductsData, SearchProductsInput>
) {
  const useSearch = (input: SearchProductsInput = {}) => {
    const response = useCommerceSearch(
      defaultOpts,
      [
        ['search', input.search],
        ['categoryId', input.categoryId],
        ['brandId', input.brandId],
        ['sort', input.sort],
      ],
      customFetcher,
      { revalidateOnFocus: false, ...swrOptions }
    )

    return response
  }

  useSearch.extend = extendHook

  return useSearch
}

export default extendHook(fetcher)
