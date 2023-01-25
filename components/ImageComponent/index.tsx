import { useGetDataUrl } from '@hooks/useGetDataUrl';
import { mediaURL } from '@utils/utils';
import Image, { ImageProps } from 'next/image';
import React, { memo } from 'react';

interface Props extends ImageProps {
  customPlaceholder: string;
  src: string;
}

const ImageComponent = ({ src, customPlaceholder, ...props }: Props) => {
  const Base64Placeholder = useGetDataUrl(customPlaceholder);

  return (
    <Image
      blurDataURL={Base64Placeholder}
      placeholder="blur"
      alt={props.alt}
      src={`${mediaURL}/${src}`}
      {...props}
    />
  );
};

export default memo(ImageComponent);
