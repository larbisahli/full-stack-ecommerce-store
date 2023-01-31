import { Product, ProductType, Suppliers, Tag } from '@ts-types/generated';
import differenceWith from 'lodash/differenceWith';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

const creationVariable = (values: Product): Product => {
  const isVariable = values.type.id === ProductType.Variable;
  return {
    name: values.name,
    shortDescription: values.shortDescription,
    description: values.description,
    type: { id: values.type.id },
    published: values.status === 'publish',
    quantity: isVariable ? 0 : Number(values?.quantity),
    salePrice: isVariable ? 0 : Number(values.salePrice),
    comparePrice: isVariable ? 0 : Number(values.comparePrice),
    buyingPrice: isVariable ? 0 : Number(values.buyingPrice),
    sku: isVariable ? null : values.sku,
    note: values.note,
    disableOutOfStock: values?.disableOutOfStock,
    categories: values?.categories?.map(({ id }) => {
      return { id };
    }),
    thumbnail: values?.thumbnail,
    gallery: values.gallery,
    variations: values?.variations?.map((v) => {
      return {
        attribute: { id: v.attribute.id },
        selectedValues: v.selectedValues?.map((av) => {
          return { id: av.id };
        })
      };
    }),
    variationOptions: values?.variationOptions?.map((vo) => {
      return {
        title: vo.title,
        options: vo.options,
        image: vo.image,
        salePrice: vo.salePrice,
        comparePrice: vo.comparePrice,
        buyingPrice: vo.buyingPrice,
        quantity: vo.quantity,
        sku: vo.sku,
        active: !vo.isDisable
      };
    })
  };
};

const updateVariable = (values: Product, initialValues: Product) => {
  // 1) gallery block
  const galleryAdditions = differenceWith(
    values?.gallery,
    initialValues?.gallery,
    isEqual
  );
  const galleryDeletions = differenceWith(
    initialValues?.gallery,
    values?.gallery,
    isEqual
  );

  // 2) thumbnail block
  const thumbnailAddition = differenceWith(
    [values?.thumbnail],
    [initialValues?.thumbnail],
    isEqual
  );
  const thumbnailDeletion = differenceWith(
    [initialValues?.thumbnail],
    [values?.thumbnail],
    isEqual
  );

  // 3) categories block
  const categoriesAdditions = differenceWith(
    values?.categories,
    initialValues?.categories,
    isEqual
  );
  const categoriesDeletions = differenceWith(
    initialValues?.categories,
    values?.categories,
    isEqual
  );

  // 6) product main info block
  const isVariable = values.type.id === ProductType.Variable;

  const newProductValues = {
    name: values.name,
    shortDescription: values.shortDescription,
    description: values.description,
    published: values.status === 'publish',
    type: { id: values.type.id },
    quantity: isVariable ? 0 : Number(values?.quantity),
    salePrice: isVariable ? 0 : Number(values.salePrice),
    comparePrice: isVariable ? 0 : Number(values.comparePrice),
    buyingPrice: isVariable ? 0 : Number(values.buyingPrice),
    sku: isVariable ? null : values.sku,
    note: values.note,
    disableOutOfStock: values?.disableOutOfStock
  };

  const initProductValues = {
    name: initialValues.name,
    shortDescription: initialValues.shortDescription,
    description: initialValues.description,
    sku: initialValues.sku,
    type: initialValues.type,
    published: initialValues.published,
    quantity: Number(initialValues?.quantity),
    salePrice: Number(initialValues.salePrice),
    comparePrice: Number(initialValues.comparePrice),
    buyingPrice: Number(initialValues.buyingPrice),
    note: initialValues.note,
    disableOutOfStock: initialValues?.disableOutOfStock
  };
  const productMainEqual = isEqual(initProductValues, newProductValues);
  const productMain = productMainEqual ? {} : newProductValues;

  // 8) variation options block
  const variationOptions = values?.variationOptions
    ?.filter((e) => e !== undefined)
    ?.map((op) => {
      op.options?.sort();
      return op;
    });

  const clonedVariationOption = JSON.parse(
    JSON.stringify(initialValues?.variationOptions)
  );
  const initVariationOption = clonedVariationOption?.map((op) => {
    op.options?.sort();
    return op;
  });

  const variationOptionsAdditions = differenceWith(
    variationOptions,
    initVariationOption,
    isEqual
  );

  const variationOptionsDeletions = initialValues?.variationOptions?.filter(
    (vo) => {
      return isEmpty(variationOptions?.find((v) => v?.id === vo?.id));
    }
  );

  // 9) variation block

  const variationAdditions = values?.variations
    ?.map((v) => {
      const initVariation = initialValues?.variations?.find(
        (vv) => vv?.attribute?.id === v?.attribute?.id
      );
      if (!isEmpty(initVariation)) {
        const addedSelectedValues = differenceWith(
          v?.selectedValues,
          initVariation?.selectedValues,
          isEqual
        );
        return isEmpty(addedSelectedValues)
          ? undefined
          : {
              attribute: { id: v.attribute.id },
              selectedValues: addedSelectedValues?.map((av) => {
                return { id: av.id };
              })
            };
      } else {
        return {
          attribute: { id: v.attribute.id },
          selectedValues: v.selectedValues?.map((av) => {
            return { id: av.id };
          })
        };
      }
    })
    ?.filter((e) => e !== undefined);

  const variationDeletions = initialValues?.variations
    ?.map((v) => {
      const valueVariation = values?.variations?.find(
        (vv) => vv?.attribute?.id === v?.attribute?.id
      );
      if (!isEmpty(valueVariation)) {
        const deletedSelectedValues = differenceWith(
          v?.selectedValues,
          valueVariation?.selectedValues,
          isEqual
        );
        return isEmpty(deletedSelectedValues)
          ? undefined
          : {
              attribute: { id: v.attribute.id },
              selectedValues: deletedSelectedValues?.map((av) => {
                return { id: av.id };
              })
            };
      } else {
        return {
          attribute: { id: v.attribute.id }
        };
      }
    })
    ?.filter((e) => e !== undefined);

  return {
    id: initialValues?.id,
    additions: {
      productMain,
      gallery: galleryAdditions?.map((img) => {
        return {
          image: img?.image
        };
      }),
      thumbnail: isEmpty(thumbnailDeletion)
        ? null
        : {
            image: thumbnailAddition[0]?.image
          },
      categories: categoriesAdditions?.map(({ id }) => {
        return { id };
      }),
      variationOptions: variationOptionsAdditions?.map((vo) => {
        return {
          ...vo,
          buyingPrice: Number(vo?.buyingPrice),
          comparePrice: Number(vo?.comparePrice),
          quantity: Number(vo?.quantity),
          salePrice: Number(vo?.salePrice),
          active: !vo.isDisable
        };
      }),
      variations: variationAdditions
    },
    deletions: {
      gallery: galleryDeletions?.map((img) => {
        return {
          id: img?.id
        };
      }),
      thumbnail: isEmpty(thumbnailDeletion)
        ? null
        : { id: thumbnailDeletion[0]?.id },
      categories: categoriesDeletions?.map(({ id }) => {
        return { id };
      }),
      variationOptions: variationOptionsDeletions?.map((v) => {
        return { id: v?.id };
      }),
      variations: variationDeletions
    }
  };
};

export { creationVariable, updateVariable };
