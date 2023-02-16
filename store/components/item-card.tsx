/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ImageComponent from '@components/ImageComponent';
import { useSettings } from '@contexts/settings.context';
import { usePercentDecrease } from '@hooks/use_percent-decrease';
import { usePrice } from '@hooks/use-price';
import { siteSettings } from '@settings/site.settings';
import { Product } from '@ts-types/generated';
import cn from 'classnames';
import Link from 'next/link';
import React, { useMemo } from 'react';

interface ItemCardProps {
  item: Product;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { thumbnail: image, name, salePrice, comparePrice } = item ?? {};

  const percentDecrease = usePercentDecrease({ comparePrice, salePrice });

  const {
    currency: { code = 'usd' }
  } = useSettings();

  const price = usePrice({
    amount: salePrice,
    locale: 'en',
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
    amount: comparePrice,
    locale: 'en',
    currencyCode: code
  });

  const productDiscount = useMemo(
    () => discount?.replace(/(\.0+|0+)$/, ''),
    [discount]
  );

  console.log(comparePrice);

  return (
    <Link href={`/${item?.slug}`}>
      <a
        role={'button'}
        className="cardHover mx-auto flex flex-col max-w-[305px] group overflow-hidden rounded-md cursor-pointer transition-all duration-300 relative h-full"
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
            {!!comparePrice && comparePrice !== 0 && (
              <div className="rounded-tl bg-red-600 text-lg font-semibold text-white px-4 py-1 absolute top-0 left-0">
                {percentDecrease}
              </div>
            )}
          </div>
        </div>
        {/* Product info */}
        <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
          <h2
            title={name}
            className="h-[2.71rem] text-skin-base !text-[14px] sm:text-sm lg:text-[15px] leading-5 sm:leading-6 mb-1.5 cut-line-2"
          >
            {name}
          </h2>
          <div className="flex items-center">
            <div className="leading-none">
              <span
                className={cn(
                  'inline-block font-bold text-[16px] lg:text-[19px] text-skin-base text-black',
                  {
                    'text-red-700': !!comparePrice && comparePrice !== 0
                  }
                )}
              >
                {productPrice}
              </span>
            </div>
            {!!comparePrice && comparePrice !== 0 && (
              <del className="text-[15px] lg:text-[16px] ml-2 text-gray-700 font-semibold">
                {productDiscount}
              </del>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ItemCard;
