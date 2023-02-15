import ImageComponent from '@components/ImageComponent';
import Button from '@components/ui/button';
import { useGetItems } from '@hooks/use-store';
import { useAppDispatch } from '@hooks/use-store';
import { addItem, incrementItem } from '@redux/card/index';
import { SwiperType } from '@store/components/carousel/slider';
import ThumbnailCarousel from '@store/components/carousel/thumbnail-carousel';
import { DrawerContext } from '@store/contexts/drawer/drawer.provider';
import {
  Attribute,
  AttributeValue,
  Product,
  ProductType
} from '@ts-types/generated';
import { selectedVariationOptionFun } from '@utils/utils';
import cn from 'classnames';
import ReactHtmlParser from 'html-react-parser';
import isEmpty from 'lodash/isEmpty';
import { memo, useContext, useEffect, useMemo, useState } from 'react';

import ProductAttributes from './product-attributes';
import VariationPrice from './variation-price';

const ProductDetails = ({ product }: { product: Product }) => {
  const {
    id,
    name,
    salePrice,
    comparePrice,
    quantity,
    type,
    description,
    thumbnail,
    gallery,
    variations,
    variationOptions
  } = product ?? {};

  const isVariableType = type?.id === ProductType.Variable;

  const { dispatch: contextDispatch } = useContext(DrawerContext);
  const dispatch = useAppDispatch();

  const [swiperThumbnailInstance, setSwiperThumbnailInstance] =
    useState<SwiperType>(null);

  const [selectedVariations, setSelectedVariations] = useState<
    { attribute: Attribute; value: AttributeValue }[]
  >([]);

  const selectedVariationOption = useMemo(() => {
    return selectedVariationOptionFun({ selectedVariations, variationOptions });
  }, [selectedVariations, variationOptions]);

  const items = useGetItems(id);

  function addToCart() {
    if (isVariableType) {
      const itemExist = items?.find((item) => {
        return (
          !!item?.orderVariationOption.id &&
          !!selectedVariationOption?.id &&
          item?.orderVariationOption.id === selectedVariationOption?.id
        );
      });
      if (isEmpty(itemExist)) {
        dispatch(
          addItem({
            ...product,
            orderQuantity: 1,
            orderVariationOption: selectedVariationOption
          })
        );
      } else {
        dispatch(incrementItem(itemExist));
      }
    } else {
      const item = items[0];
      if (isEmpty(item)) {
        dispatch(addItem(product));
      } else {
        dispatch(incrementItem(item));
      }
    }

    contextDispatch({
      type: 'SLIDE_CART',
      payload: {
        open: true
      }
    });
  }

  const selectedIndex = useMemo(
    () =>
      gallery?.findIndex((i) => i?.image === selectedVariationOption?.image),
    [gallery, selectedVariationOption]
  );

  const productQuantity = isVariableType
    ? selectedVariationOption?.quantity
    : quantity;

  useEffect(() => {
    if (
      selectedIndex === -1 &&
      !isEmpty(swiperThumbnailInstance) &&
      !swiperThumbnailInstance?.destroyed
    ) {
      swiperThumbnailInstance.slideTo(1);
    } else if (
      !isNaN(selectedIndex) &&
      !isEmpty(swiperThumbnailInstance) &&
      !swiperThumbnailInstance?.destroyed
    ) {
      swiperThumbnailInstance.slideTo(selectedIndex + 1);
    }
  }, [selectedIndex, swiperThumbnailInstance]);

  return (
    <div className="pt-6 md:pt-7 pb-2">
      <div className="flex flex-col mx-auto max-w-[1200px] justify-center items-center">
        <div className="col-span-5 w-full xl:col-span-6 overflow-hidden mb-6 md:mb-8 lg:mb-0">
          <div className="lg:mx-0 mx-auto">
            {!isEmpty(gallery) ? (
              <ThumbnailCarousel
                setSwiperThumbnailInstance={setSwiperThumbnailInstance}
                gallery={gallery}
                galleryClassName="w-full"
              />
            ) : (
              <div className="w-auto max-w-[1200px] flex items-center justify-center">
                <ImageComponent
                  src={`${process.env.S3_ENDPOINT}/${thumbnail?.image}`}
                  width={1200}
                  height={600}
                  objectFit="contain"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 flex w-full flex-col md:flex-row col-span-5 xl:col-span-4 xl:ps-2 m-1 md:m-0">
          <div className="flex-1 mt-8">
            <div className="pb-3 lg:pb-5">
              <div className="md:mb-2.5 block">
                <h2 className="text-xl font-semibold text-black md:text-2xl transition-colors duration-300 mb-2">
                  {name ?? ''}
                </h2>
              </div>
              <div className="w-full">
                <div className="split-line-thin"></div>
              </div>
              <VariationPrice
                {...{
                  selectedVariationOption,
                  isVariableType,
                  salePrice,
                  comparePrice
                }}
              />
            </div>
            <div className="w-full">
              <div className="split-line-thin"></div>
            </div>
            {/* VARIATIONS */}
            <div className="my-3">
              {!isEmpty(variationOptions) && (
                <div>
                  {variations?.map((variation) => {
                    return (
                      <ProductAttributes
                        key={variation?.attribute?.id}
                        {...{
                          variation,
                          variations,
                          variationOptions,
                          selectedVariations,
                          setSelectedVariations
                        }}
                      />
                    );
                  })}
                  <div className="w-full">
                    <div className="split-line-thin"></div>
                  </div>
                </div>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8 text-sm sm:text-15px text-skin-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7">
              <div className="font-bold text-2xl">Description</div>
              {ReactHtmlParser(description ?? '')}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="md:w-full md:max-w-[350px]  md:ml-5 md:mx-0">
            <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5 mt-5">
              <div className="flex items-center">
                <Button
                  onClick={addToCart}
                  disabled={productQuantity === 0}
                  className={cn(
                    '!bg-black text-white uppercase font-semibold text-lg mr-2 flex-1',
                    { '!bg-gray-700': productQuantity === 0 }
                  )}
                >
                  {productQuantity === 0 ? 'Sold out' : 'Add to cart'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default memo(ProductDetails);
