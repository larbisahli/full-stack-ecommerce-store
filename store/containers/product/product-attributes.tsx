import { sentry } from '@lib/sentry';
import type {
  AttributeValue,
  VariationOptionsType,
  VariationType
} from '@ts-types/generated';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import React, { memo, useEffect, useMemo } from 'react';

import AttributeValueLabel from './attribute-value-label';

interface Props {
  className?: string;
  variations: VariationType[];
  variation: VariationType;
  variationOptions: VariationOptionsType[];
  // eslint-disable-next-line no-unused-vars
  setSelectedVariations: (key: any) => void;
  selectedVariations: VariationType[];
  defaultVariationOption?: VariationOptionsType;
}

const ProductAttributes: React.FC<Props> = ({
  className = '',
  variation,
  variations,
  variationOptions,
  selectedVariations,
  setSelectedVariations,
  defaultVariationOption
}) => {
  const { attribute, values } = variation;

  useEffect(() => {
    try {
      let selectedVariationOptions = {} as VariationOptionsType;

      if (isEmpty(variationOptions)) return;

      if (isEmpty(defaultVariationOption)) {
        selectedVariationOptions = variationOptions?.reduce((acc, loc) =>
          acc?.salePrice < loc?.salePrice ? acc : loc
        );
      } else {
        selectedVariationOptions = defaultVariationOption;
      }

      if (isEmpty(selectedVariationOptions)) return;

      // map default
      const results = variations?.map((v) => {
        const options = selectedVariationOptions?.options;
        return {
          attribute: v?.attribute,
          value: (v?.values?.filter((v) => options.includes(v?.id)) ?? [])[0]
        };
      });

      setSelectedVariations(results);
    } catch (error) {
      sentry({
        message: 'ProductAttributes variationOptions defaults',
        error
      });
    }
  }, [setSelectedVariations, variationOptions, variations]);

  const selectedVariation = useMemo(
    () => selectedVariations?.find((sv) => sv?.attribute?.id === attribute?.id),
    [selectedVariations, attribute]
  );

  const handleSelectedAttributeValue = (value: AttributeValue) => {
    setSelectedVariations((prev: VariationType[]) => {
      return prev?.map((v) => {
        if (v?.attribute?.id === attribute?.id) {
          v.value = value;
        }
        return v;
      });
    });
  };

  if (isEmpty(variation)) return null;

  return (
    <div className={cn(className)}>
      <div className="font-normal mb-3 capitalize">
        <span className="font-semibold text-base">{attribute?.name}</span>
        <span className="mr-1 font-medium">:</span>
        <span className="text-14px text-skin-extraMuted">
          {selectedVariation?.value?.value ?? ''}
        </span>
      </div>
      <ul className="flex flex-wrap">
        {values?.map((value) => (
          <AttributeValueLabel
            key={value?.id}
            selectedAttributeValueId={selectedVariation?.value?.id}
            {...{ handleSelectedAttributeValue, value }}
          />
        ))}
      </ul>
    </div>
  );
};

export default memo(ProductAttributes);
