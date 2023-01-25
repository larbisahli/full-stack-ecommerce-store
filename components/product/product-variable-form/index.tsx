import Card from '@components/common/card';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Label from '@components/ui/label';
import Loader from '@components/ui/loader/loader';
import Title from '@components/ui/title';
import { ATTRIBUTES_FOR_SELECT } from '@graphql/attribute';
import { useErrorLogger } from '@hooks/useErrorLogger';
import type { Product, VariationType } from '@ts-types/generated';
import {
  Attribute,
  OrderBy,
  SortOrder,
  VariationActions
} from '@ts-types/generated';
import { cartesian } from '@utils/cartesian';
import cloneDeep from 'lodash/cloneDeep';
import differenceWith from 'lodash/differenceWith';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  VariationAction,
  VariationReducerType,
  VariationTypeExtra
} from '../variations-reducer';
import CartesianProductComponent from './cartesian-product-component';

const Select = dynamic(() => import('@components/ui/select/select'), {
  loading: () => <Loader height="100px" showText={false} />,
  ssr: false
});

type IProps = {
  initialValues?: Product | null;
  variationState?: VariationReducerType;
  dispatchVariationState?: React.Dispatch<VariationAction>;
};

interface TAttributeSelect {
  attributesForAdmin: Attribute[];
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
}

interface CartesianType {
  id: string;
  name: string;
  value: string;
}

function getCartesianProduct(values: VariationType[]) {
  const formattedValues = values
    ?.map((v) =>
      v.selectedValues?.map((a) => ({
        id: a.id,
        name: v.attribute.name,
        value: a.value
      }))
    )
    .filter((i: any) => i !== undefined);

  if (isEmpty(formattedValues)) return [];

  return cartesian<CartesianType[][]>(...formattedValues) as CartesianType[][];
}

function ProductVariableForm({
  initialValues,
  variationState,
  dispatchVariationState
}: IProps) {
  const { t } = useTranslation();

  // const { data, loading, error } = useQuery<TAttributeSelect, OptionsVariable>(
  //   ATTRIBUTES_FOR_SELECT,
  //   {
  //     variables: {
  //       page: 1,
  //       limit: 999,
  //       orderBy: OrderBy.CREATED_AT,
  //       sortedBy: SortOrder.Desc
  //     },
  //     fetchPolicy: 'cache-and-network'
  //   }
  // );

  // useErrorLogger(error);

  const { watch } = useFormContext();

  const [attributeValuesChangesState, setAttributeValuesChangesState] =
    useState([]);
  const [cartesianProduct, setCartesianProduct] = useState([]);
  const [init, setInit] = useState(false);

  const gallery = watch('gallery');
  const variations = variationState.variations;
  const variationOptions = variationState.variationOptions;
  const attributes = []//data?.attributesForAdmin ?? [];

  const attributeValuesChanges = [].concat(
    ...(variations?.map((v) => v?.selectedValues) ?? [])
  );

  useEffect(() => {
    const diffAdd = differenceWith(
      attributeValuesChanges,
      attributeValuesChangesState,
      isEqual
    );

    const diffDel = differenceWith(
      attributeValuesChangesState,
      attributeValuesChanges,
      isEqual
    );

    if (!isEmpty(diffAdd) || !isEmpty(diffDel)) {
      const cp = getCartesianProduct(variations);
      setCartesianProduct(cp);
      setAttributeValuesChangesState(attributeValuesChanges);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributeValuesChanges, attributeValuesChangesState]);

  useEffect(() => {
    if (
      isEmpty(variationOptions) &&
      !isEmpty(initialValues?.variationOptions)
    ) {
      const variationOptions = cloneDeep(initialValues?.variationOptions ?? []);
      const variations = cloneDeep(initialValues?.variations ?? []);
      dispatchVariationState({
        type: VariationActions.INIT,
        payload: {
          value: {
            variations: variations?.map((variation) => {
              return {
                id: nanoid(),
                ...variation
              };
            }),
            variationOptions
          }
        }
      });
    } else if (isEmpty(initialValues?.variationOptions)) {
      setInit(true);
    }
  }, []);

  useEffect(() => {
    if (init) {
      dispatchVariationState({
        type: VariationActions.CARTESIAN,
        payload: {
          values: cartesianProduct
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartesianProduct]);

  const appendVariant = (e: any) => {
    e.preventDefault();
    dispatchVariationState({
      type: VariationActions.APPEND_VARIATION,
      payload: {
        value: { id: nanoid(), attribute: attributes[0], selectedValues: [] }
      }
    });
  };

  return (
    <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
      <Description
        title={t('form:form-title-variation-product-info')}
        details={`${
          initialValues
            ? t('form:item-description-update')
            : t('form:item-description-choose')
        } ${t('form:form-description-variation-product-info')}`}
        className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
      />
      <Card className="w-full sm:w-8/12 md:w-2/3 p-0 md:p-0">
        <div className="border-t border-dashed border-border-200 mb-5 md:mb-8">
          <Title className="text-lg uppercase text-center px-5 md:px-8 mb-0 mt-8">
            {t('form:form-title-options')}
          </Title>
          <div>
            {variations?.map((variant, index) => {
              return (
                <VariationComponent
                  key={variant.id}
                  {...{
                    variant,
                    attributes,
                    // loading,
                    index,
                    dispatchVariationState
                  }}
                />
              );
            })}
          </div>

          <div className="px-5 md:px-8">
            <Button
              disabled={variations.length === attributes?.length}
              onClick={appendVariant}
              type="button"
            >
              {t('form:button-label-add-option')}
            </Button>
          </div>

          {/* Preview generation section start */}
          {!!variationOptions?.length && (
            <div className="border-t border-dashed border-border-200 pt-5 md:pt-8 mt-5 md:mt-8">
              <Title className="text-lg uppercase text-center px-5 md:px-8 mb-0">
                {variationOptions?.length}{' '}
                {variationOptions?.length > 1
                  ? t('form:total-variations-added')
                  : t('form:total-variation-added')}
              </Title>
              {variationOptions?.map((variationOption, index: number) => {
                return (
                  <CartesianProductComponent
                    key={index}
                    gallery={gallery}
                    variationOption={variationOption}
                    dispatchVariationState={dispatchVariationState}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

interface VCProps {
  variant: VariationTypeExtra;
  attributes: Attribute[];
  index: number;
  loading: boolean;
  dispatchVariationState: React.Dispatch<VariationAction>;
}

const VariationComponent = ({
  variant,
  index,
  attributes,
  loading,
  dispatchVariationState
}: VCProps) => {
  const { t } = useTranslation();

  const remove = () => {
    dispatchVariationState({
      type: VariationActions.REMOVE_VARIATION,
      payload: {
        id: variant.id
      }
    });
  };

  const changeAttribute = (attribute) => {
    dispatchVariationState({
      type: VariationActions.CHANGE_VARIATION,
      payload: {
        value: attribute,
        id: variant.id
      }
    });
  };

  const changeValues = (values) => {
    dispatchVariationState({
      type: VariationActions.CHANGE_VARIATION_VALUES,
      payload: {
        values,
        id: variant.id
      }
    });
  };

  const values = useMemo(
    () =>
      attributes?.find((attribute) => attribute.id === variant.attribute.id)
        ?.values,
    [variant.attribute, attributes]
  );

  return (
    <div className="border-b border-dashed border-border-200 last:border-0 p-5 md:p-8">
      <div className="flex items-center justify-between">
        <Title className="mb-0">
          {t('form:form-title-options')} {index + 1}
        </Title>
        <button
          onClick={remove}
          type="button"
          className="text-sm text-red-500 hover:text-red-700 
          transition-colors duration-200 focus:outline-none"
        >
          {t('form:button-label-remove')}
        </button>
      </div>

      <div className="grid grid-cols-fit gap-5">
        <div className="mt-5">
          <Label>{t('form:input-label-attribute-name')}*</Label>
          <Select
            value={variant.attribute}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.id}
            isLoading={loading}
            closeMenuOnSelect
            hideSelectedOptions
            options={attributes}
            onChange={changeAttribute}
          />
        </div>

        <div className="mt-5 col-span-2">
          <Label>{t('form:input-label-attribute-value')}*</Label>
          <Select
            value={variant.selectedValues}
            getOptionLabel={(option: any) => option.value}
            getOptionValue={(option: any) => option.id}
            isMulti
            isLoading={loading}
            closeMenuOnSelect
            hideSelectedOptions
            options={values}
            onChange={changeValues}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductVariableForm);
