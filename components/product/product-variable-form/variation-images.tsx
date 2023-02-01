/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import ImageComponent from '@components/ImageComponent';
import Checkbox from '@components/ui/checkbox';
import Label from '@components/ui/label';
import { useId } from '@hooks/index';
import { ImageType, VariationActions } from '@ts-types/generated';
import cn from 'classnames';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';
import React from 'react';

import { VariationAction } from '../variations-reducer';

interface VariationImagesProps {
  dispatchVariationState?: React.Dispatch<VariationAction>;
  selectedImage: string | null;
  options: string[];
  gallery: ImageType[];
}

const VariationImages = ({
  gallery,
  selectedImage,
  dispatchVariationState,
  options
}: VariationImagesProps) => {
  const { t } = useTranslation();

  const HandleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    image: string
  ) => {
    const target = e.target;
    const name = target.name;

    dispatchVariationState({
      type: VariationActions.CHANGE_VARIATION_OPTION,
      payload: {
        value: target['checked'] ? image : null,
        field: name,
        options
      }
    });
  };

  if (isEmpty(gallery)) return null;

  return (
    <div className="mb-5 mt-5">
      <Label>{t('form:input-label-select-image')}</Label>
      <div className="flex items-center">
        {gallery?.map(({ image }, idx) => {
          return (
            <GalleryShowcase
              HandleInputChange={HandleInputChange}
              selectedImage={selectedImage}
              image={image}
              key={idx}
            />
          );
        })}
      </div>
    </div>
  );
};

const GalleryShowcase = ({ HandleInputChange, image, selectedImage }) => {
  const isCurrentImg = image === selectedImage;

  const id = useId();

  return (
    <div className="relative mt-2 me-2 w-16 h-16">
      <label
        htmlFor={id}
        className={cn(
          'flex transition-all overflow-hidden border-2 w-16 h-16 border-border-200 rounded relative cursor-pointer',
          {
            '!border-2': isCurrentImg,
            shadow: isCurrentImg
          }
        )}
        style={{
          borderColor: isCurrentImg ? '#46d934' : null,
          transform: isCurrentImg ? 'translateY(-8px)' : null
        }}
      >
        <ImageComponent
          src={
            image
              ? `${process.env.S3_ENDPOINT}/${image}`
              : '/placeholders/no-image.svg'
          }
          layout="fill"
          objectFit="cover"
        />
      </label>
      <Checkbox
        name="image"
        id={id}
        className="transition-all absolute"
        inputClassName="checkbox-rounded"
        onChange={(e) => HandleInputChange(e, image)}
        checked={isCurrentImg}
        style={{
          transform: isCurrentImg ? 'translateY(-8px)' : null,
          top: '-6px',
          left: '-6px'
        }}
      />
    </div>
  );
};

export default memo(VariationImages);
