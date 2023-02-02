/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
        `cursor-pointer rounded-[16px] border px-4 min-w-[66px] h-[32px] 
         shadow-lg mb-2 md:mb-3 mr-2 flex justify-center items-center 
         font-medium text-sm md:text-15px text-skin-base transition 
         duration-200 ease-in-out hover:text-gray-900 hover:border-1 
         hover:border-gray-900 border-gray-300`,
        {
          'border-gray-900 text-gray-900 border-2':
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
              style={{ background: color }}
              className="h-8 w-8 rounded-full flex items-center justify-center border-2"
            ></div>
          )
        : value?.value}
    </li>
  );
};

export default memo(AttributeValueLabel);
