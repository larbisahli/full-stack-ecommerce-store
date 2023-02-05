/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ImageComponent from '@components/ImageComponent';
import { useSettings } from '@contexts/settings.context';
import { usePercentDecrease } from '@hooks/use_percent-decrease';
import { usePrice } from '@hooks/use-price';
import { siteSettings } from '@settings/site.settings';
import { Product, ProductType } from '@ts-types/generated';
import Link from 'next/link';
import React, { useMemo } from 'react';

interface ItemCardProps {
  item: Product;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { thumbnail: image, name, salePrice, comparePrice } = item ?? {};

  const percentDecrease = usePercentDecrease({ comparePrice, salePrice });

  const {
    currency: { currencyCode = 'usd' }
  } = useSettings();

  const price = usePrice({
    amount: salePrice,
    locale: 'en',
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
    amount: comparePrice,
    locale: 'en',
    currencyCode
  });

  const productDiscount = useMemo(
    () => discount?.replace(/(\.0+|0+)$/, ''),
    [discount]
  );

  return (
    <Link href={`product/${item?.slug}`}>
      <a
        role={'button'}
        className="mx-auto flex shadow flex-col max-w-[305px] group overflow-hidden rounded-md cursor-pointer transition-all duration-300 hover:shadow-lg relative h-full"
      >
        {/* Thumbnail */}
        <div className="relative flex items-center justify-center">
          <div className="flex max-w-[305px] overflow-hidden transition duration-200 ease-in-out transform group-hover:scale-105 relative m-[18px]">
            <ImageComponent
              src={
                `${process.env.S3_ENDPOINT}/${image}` ??
                siteSettings.product.image
              }
              objectFit="cover"
              alt={' Alt ' + name}
              width={290}
              height={290}
              className="rounded m-0 p-0"
            />
          </div>
        </div>
        {/* Product info */}
        <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
          <h2
            title={name}
            className="cut-line-2 text-skin-base !text-[14px] sm:text-sm lg:text-[15px] leading-5 sm:leading-6 mb-1.5"
          >
            {name}
          </h2>
          <div className="mb-1 lg:mb-1.5">
            <div className="leading-none">
              <span className="inline-block font-bold text-[16px] lg:text-[19px] text-skin-base">
                {productPrice}
              </span>
            </div>
          </div>
          {comparePrice && (
            <div className="flex items-center">
              <del className="text-[15px] text-opacity-80 text-gray-600">
                {productDiscount}
              </del>
              <div className="bg-gray-400 h-[10px] w-[1px] mx-1"></div>
              <span className="text-[13px] text-red-600">
                {percentDecrease}
              </span>
            </div>
          )}
        </div>
      </a>
    </Link>
  );
};

export default ItemCard;
