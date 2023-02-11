/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { CheckMark } from '@components/icons/checkmark';
import type { AttributeValue } from '@ts-types/generated';
import cn from 'classnames';
import { memo } from 'react';

interface Props {
  close?: () => void;
  className?: string;
  selectedAttributeValueId: string;
  // eslint-disable-next-line no-unused-vars
  handleSelectedAttributeValue: (key: AttributeValue) => void;
  value: AttributeValue;
}

const AttributeValueLabel = ({
  close,
  className,
  selectedAttributeValueId,
  handleSelectedAttributeValue,
  value
}: Props) => {
  const color = value?.color;
  const id = value?.id;

  return (
    <li
      className={cn(
        `cursor-pointer rounded border px-4 min-w-[66px] h-[32px] 
         shadow-lg mb-2 md:mb-3 mr-2 flex justify-center items-center 
         font-medium text-sm md:text-15px text-skin-base transition 
         duration-200 ease-in-out hover:text-gray-900 hover:border-1 
         hover:border-gray-900 border-gray-300`,
        {
          'bg-black text-white border-gray-900 font-semibold hover:text-gray-50':
            selectedAttributeValueId === id,
          '!rounded-full !p-0 !min-w-0': color,
          '!h-9 !w-9': color,
          'shadow-lg': color
        },
        className
      )}
      style={{
        background: color
      }}
      onClick={() => {
        handleSelectedAttributeValue(value);
        if (close instanceof Function) {
          close();
        }
      }}
    >
      {color
        ? selectedAttributeValueId === id && (
            <div
              style={{ background: `${color} !important` }}
              className="h-8 w-8 rounded-full flex items-center justify-center border-2"
            >
              <CheckMark />
            </div>
          )
        : value?.value}
    </li>
  );
};

export default memo(AttributeValueLabel);
