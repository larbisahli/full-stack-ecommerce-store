// import Image from 'next/image';
import ImageComponent from '@components/ImageComponent/index';
import cn from 'classnames';
import React from 'react';

type AvatarProps = {
  className?: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  className,
  alt = 'Avatar',
  ...rest
}) => {
  return (
    <div
      className={cn(
        'relative cursor-pointer w-10 h-10 overflow-hidden rounded-full',
        className
      )}
      {...rest}
    >
      <ImageComponent
        alt={alt}
        src={src}
        layout="fill"
        objectFit="cover"
        priority={true}
      />
    </div>
  );
};

export default Avatar;
