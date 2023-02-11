import { useSettings } from '@contexts/settings.context';
import { usePercentDecrease } from '@hooks/use_percent-decrease';
import { usePrice } from '@hooks/use-price';
import { VariationOptionsType } from '@ts-types/generated';
import { useRouter } from 'next/router';
import { memo, useMemo } from 'react';

interface Props {
  selectedVariationOption: VariationOptionsType;
  salePrice: number;
  comparePrice: number;
  isVariableType: boolean;
}

function VariationPrice({
  selectedVariationOption,
  salePrice,
  comparePrice,
  isVariableType
}: Props) {
  const router = useRouter();
  const { locale } = router;

  const {
    currency: { code }
  } = useSettings();

  const selectedSalePrice = isVariableType
    ? selectedVariationOption?.salePrice
    : salePrice;
  const selectedComparePrice = isVariableType
    ? selectedVariationOption?.comparePrice
    : comparePrice;

  const percentDecrease = usePercentDecrease({
    comparePrice: selectedComparePrice,
    salePrice: selectedSalePrice
  });

  const price = usePrice({
    amount: selectedSalePrice ?? 0,
    locale,
    currencyCode: code
  });

  const productPrice = useMemo(
    () =>
      price
        ?.replace(/(\.0+|0+)$/, '')
        ?.split(/([0-9]+)/)
        ?.filter((v) => v),
    [price]
  );

  const discount = usePrice({
    amount: selectedComparePrice,
    locale,
    currencyCode: code
  });

  const productDiscount = useMemo(
    () => discount?.replace(/(\.0+|0+)$/, ''),
    [discount]
  );

  return (
    <div className="flex flex-col mt-5">
      <div className="text-skin-base font-bold text-3xl">
        {!!selectedSalePrice && productPrice}
      </div>
      {selectedComparePrice && (
        <div className="flex items-center mt-1">
          <del className="text-base text-red-700">{productDiscount}</del>
          <div className="text-white mx-1 px-2 font-semibold bg-red-600">
            {percentDecrease}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(VariationPrice);
