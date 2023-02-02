import { useMemo } from 'react';

export function usePrice({
  amount,
  currencyCode,
  locale
}: {
  amount: number;
  currencyCode: string;
  locale: string;
}) {
  const formatCurrency = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode
      }),
    [locale, currencyCode]
  );

  return formatCurrency.format(amount);
}
