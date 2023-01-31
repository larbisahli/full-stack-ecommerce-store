import ImageComponent from '@components/ImageComponent';
import { useSettings } from '@contexts/settings.context';
import { usePercentDecrease } from '@hooks/use_percent-decrease';
import { siteSettings } from '@settings/site.settings';
import { Product } from '@ts-types/generated';
import Link from 'next/link';
import React from 'react';

import { CURRENCY } from '../helpers/constants';
import CounterAlt from './animated-counter';

interface ItemCardProps {
  item: Product;
  value: number;
  onClick?: (e: any) => void;
  onDecrement?: (e: any) => void;
  onIncrement?: (e: any) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { currency } = useSettings();

  const { slug, thumbnail, name, salePrice, comparePrice } = item;
  const percentDecrease = usePercentDecrease({ comparePrice, salePrice });
  return (
    <Link href={`product/${slug}`}>
      <a className="mx-auto flex shadow flex-col max-w-[304px] group overflow-hidden rounded-md cursor-pointer transition-all duration-300 hover:shadow-lg relative h-full">
        {/* Thumbnail */}
        <div className="relative flex items-center justify-center">
          <div className="flex max-w-[304px] overflow-hidden transition duration-200 ease-in-out transform group-hover:scale-105 relative m-[18px]">
            <ImageComponent
              src={
                `${process.env.S3_ENDPOINT}/${thumbnail}` ??
                siteSettings.product.image
              }
              objectFit="cover"
              alt={' Alt ' + name}
              width={250}
              height={250}
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
              <span className="inline-block font-semibold text-[16px] lg:text-[19px] text-skin-base">
                {currency}
              </span>
              <span className="inline-block font-bold text-[16px] lg:text-[19px] text-skin-base">
                {salePrice}
              </span>
            </div>
          </div>
          {comparePrice && (
            <div className="flex items-center">
              <del className="text-[15px] text-opacity-80 text-gray-600">
                {currency}
                {comparePrice}
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
