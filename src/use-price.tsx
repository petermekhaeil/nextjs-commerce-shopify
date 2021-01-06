import { useMemo } from 'react';
import { useCommerce } from './index';
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

  if (!currencyCode) {
    return { price: '' };
  }

  if (variant) {
    const pricePresentmentInCurrency = variant.presentmentPrices.find(
      (presentmentPrice) => {
        return presentmentPrice.price.currencyCode === currencyCode;
      }
    );

    if (pricePresentmentInCurrency) {
      variantPriceInCurrency = +pricePresentmentInCurrency.price.amount;
    }
  }

  const amountToUse = amount || variantPriceInCurrency;

  const value = useMemo(() => {
    return formatPrice({ amount: amountToUse, currencyCode, locale });
  }, [amount, currencyCode]);

  return { price: value };
}
