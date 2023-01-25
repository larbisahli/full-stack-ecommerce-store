import type { VariationOptionsType, VariationType } from '@ts-types/generated';
import { VariationActions } from '@ts-types/generated';
import differenceWith from 'lodash/differenceWith';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

// An interface for our actions
export interface VariationAction {
  type: VariationActions;
  payload: {
    value?: any;
    id?: string;
    values?: any[];
    field?: string;
    options?: string[];
  };
}

export interface VariationTypeExtra extends VariationType {
  id: string;
}

export interface VariationReducerType {
  variations: VariationTypeExtra[];
  variationOptions: VariationOptionsType[];
}

export function variationsReducer(
  state: VariationReducerType,
  action: VariationAction
) {
  const { type, payload } = action;
  switch (type) {
    case VariationActions.APPEND_VARIATION:
      return {
        ...state,
        variations: [...state.variations, payload.value]
      };
    case VariationActions.REMOVE_VARIATION:
      return {
        ...state,
        variations: state.variations?.filter(
          (variant) => variant.id !== payload.id
        )
      };
    case VariationActions.CHANGE_VARIATION:
      return {
        ...state,
        variations: state.variations?.map((variation) => {
          if (variation.id === payload.id) {
            variation.attribute = payload.value;
          }
          return variation;
        })
      };
    case VariationActions.CHANGE_VARIATION_VALUES:
      return {
        ...state,
        variations: state.variations?.map((variation) => {
          if (variation.id === payload.id) {
            variation.selectedValues = payload.values;
          }
          return variation;
        })
      };
    case VariationActions.CHANGE_VARIATION_OPTION:
      return {
        ...state,
        variationOptions: state.variationOptions?.map((option) => {
          if (isEqual(payload?.options?.sort(), option?.options?.sort())) {
            return {
              ...option,
              [payload.field]: payload.value
            };
          }
          return option;
        })
      };
    case VariationActions.INIT:
      return {
        variations: payload.value.variations,
        variationOptions: payload.value.variationOptions
      };
    case VariationActions.CARTESIAN: {
      const payloadOptions = payload.values?.map((v) => {
        return Array.isArray(v) ? v?.map((av) => av.id) : [v.id];
      });

      const stateOptions = state.variationOptions?.map((av) => av.options);

      const added = differenceWith(payloadOptions, stateOptions, isEqual);
      const deleted = differenceWith(stateOptions, payloadOptions, isEqual);

      const cleanedState = !isEmpty(deleted)
        ? state.variationOptions
            ?.map((v) => {
              const combination = payload.values?.find((cart) => {
                const options = Array.isArray(cart)
                  ? cart?.map((av) => av.id)
                  : [cart.id];
                return isEqual(options?.sort(), v.options?.sort());
              });

              if (isEmpty(combination)) {
                return undefined;
              }
              return v;
            })
            ?.filter(function (element) {
              return element !== undefined;
            })
        : state.variationOptions;

      if (!isEmpty(added)) {
        return {
          ...state,
          variationOptions: [
            ...cleanedState,
            ...(payload.values ?? [])
              .map((v) => {
                const options = Array.isArray(v)
                  ? v?.map((av) => av.id)
                  : [v.id];

                const combination = state.variationOptions?.find((s) =>
                  isEqual(s.options?.sort(), options?.sort())
                );

                if (isEmpty(combination)) {
                  const title = Array.isArray(v)
                    ? v.map((av) => av?.value).join('/')
                    : v?.value;
                  return {
                    options,
                    title,
                    buyingPrice: 0,
                    comparePrice: 0,
                    id: null,
                    image: null,
                    isDisable: false,
                    quantity: 1,
                    salePrice: 0,
                    sku: ''
                  };
                }
                return undefined;
              })
              .filter(function (element) {
                return element !== undefined;
              })
          ]
        };
      }
      return {
        ...state,
        variationOptions: !isEmpty(deleted)
          ? [...cleanedState]
          : state.variationOptions
      };
    }
    default:
      return state;
  }
}
