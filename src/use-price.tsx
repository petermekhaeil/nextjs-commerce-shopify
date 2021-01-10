import { useMemo } from 'react';
import { useCommerce } from './commerce';
import { ProductVariant } from './utils/types';

export function formatPrice({
  amount,
  currencyCode,
  locale
}: {
  amount: number;
  currencyCode: string;
  locale: string;
}) {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  });

  return formatCurrency.format(amount);
}

export default function usePrice(
  data?: {
    amount?: number;
    variant?: ProductVariant;
  } | null
) {
  const { currencyCode } = useCommerce();
  const { amount, variant } = data ?? {};
  const locale = 'en-US';
  let variantPriceInCurrency = -1;

  if (variant && variant.presentmentPrices) {
    const pricePresentmentInCurrency = variant.presentmentPrices.find(
      (presentmentPrice) => {
        return presentmentPrice.price.currencyCode === currencyCode;
      }
    );

    if (pricePresentmentInCurrency) {
      variantPriceInCurrency = pricePresentmentInCurrency.price.amount;
    }
  }

  const amountToUse = amount || variantPriceInCurrency;

  // best to return empty string than an incorrect value
  if (amountToUse < 0) {
    return { price: '' };
  }

  const value = useMemo(() => {
    return formatPrice({ amount: amountToUse, currencyCode, locale });
  }, [amount, currencyCode]);

  return { price: value };
}
