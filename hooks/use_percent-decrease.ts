import { useMemo } from 'react';

export const usePercentDecrease = ({
  comparePrice,
  salePrice
}: {
  comparePrice: number;
  salePrice: number;
}) => {
  const percentDecrease = useMemo(
    () => -(((comparePrice - salePrice) / comparePrice) * 100),
    [comparePrice, salePrice]
  );

  return `${percentDecrease?.toFixed(0)}%`;
};
