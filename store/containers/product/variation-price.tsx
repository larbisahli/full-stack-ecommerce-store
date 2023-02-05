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
    currency: { currencyCode }
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
    currencyCode
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
    currencyCode
  });

  const productDiscount = useMemo(
    () => discount?.replace(/(\.0+|0+)$/, ''),
    [discount]
  );

  return (
    <div className="flex items-center mt-5">
      <div className="text-skin-base font-bold text-base md:text-xl xl:text-[22px]">
        {!!selectedSalePrice && productPrice}
      </div>
      {selectedComparePrice && (
        <>
          <del className="text-sm md:text-15px pl-3 text-skin-base text-opacity-50">
            {productDiscount}
          </del>
          <div className="text-red-600 mx-1">{percentDecrease}</div>
        </>
      )}
    </div>
  );
}

export default memo(VariationPrice);
