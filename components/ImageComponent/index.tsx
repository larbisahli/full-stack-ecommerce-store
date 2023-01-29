import Image, { ImageProps } from 'next/image';
import React, { memo } from 'react';

const ImageComponent = (props: ImageProps) => {
  const Base64Placeholder =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+utrPQAJNQNlcqdyCgAAAABJRU5ErkJggg==';

  return (
    <Image
      blurDataURL={Base64Placeholder}
      placeholder="blur"
      alt={props.alt}
      {...props}
    />
  );
};

export default memo(ImageComponent);
