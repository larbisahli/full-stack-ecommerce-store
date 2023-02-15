import ImageComponent from '@components/ImageComponent';
import Link from '@components/ui/link';
import { HeroBannerType } from '@ts-types/generated';
import cn from 'classnames';
import type { FC } from 'react';
import { memo } from 'react';

interface BannerProps {
  banner?: HeroBannerType;
  className?: string;
  variant?: 'default' | 'slider' | 'medium';
}

const HeroBannerCard: FC<BannerProps> = ({
  banner,
  className = 'py-20 xy:pt-24',
  variant = 'default'
}) => {
  // const { width } = useWindowSize();
  const { title, description, thumbnail, btnLabel, destinationUrl, styles } =
    banner;

  return (
    <div
      className={cn(
        'w-full bg-no-repeat bg-cover bg-center flex items-center z-0 min-h-[320px] md:min-h-[360px] lg:min-h-[500px] xl:min-h-[650px]',
        className
      )}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-5"></div>
      <div
        className="absolute h-full w-full overflow-hidden"
        style={{ zIndex: -1 }}
      >
        <ImageComponent
          src={`${process.env.S3_ENDPOINT}/${thumbnail}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div
        className={cn(
          'mx-auto z-10 h-full flex flex-col text-center px-6 xl:max-w-[750px] 2xl:max-w-[850px]',
          {
            'max-w-[480px] md:max-w-[550px]': variant === 'default' || 'slider',
            'max-w-[480px] md:max-w-[650px]': variant === 'medium'
          }
        )}
      >
        <div className="text-center">
          <h2
            className={cn(
              'text-3xl md:text-4xl font-manrope font-extrabold leading-snug md:leading-tight xl:leading-[1.3em] mb-3 md:mb-4 xl:mb-3 -mt-2 xl:-mt-3 2xl:-mt-4',
              {
                'text-skin-secondary xl:text-5xl 2xl:text-[55px]':
                  variant === 'default',
                'text-skin-secondary xl:text-[40px] 2xl:text-5xl 2xl:mb-4 2xl:pb-0.5':
                  variant === 'medium',
                'text-skin-inverted xl:text-5xl 2xl:text-[55px]':
                  variant === 'slider'
              }
            )}
            style={{
              color: styles?.textColor
            }}
          >
            {title}
          </h2>
          <p
            className={cn(
              'text-base md:text-[17px] font-semibold xl:text-lg leading-7 md:leading-8 xl:leading-[1.92em] xl:px-16',
              {
                'text-skin-base text-opacity-80 2xl:px-32':
                  variant === 'default',
                'text-skin-inverted 2xl:px-32': variant === 'slider',
                '2xl:px-24': variant === 'medium'
              }
            )}
            style={{
              color: styles?.textColor
            }}
          >
            {description}
          </p>
          {btnLabel && (
            <Link
              href={destinationUrl ?? '/'}
              className="h-[45px] mt-7 md:mt-8 text-sm inline-flex items-center justify-center transition duration-300 rounded px-6 py-2 font-semibold bg-skin-inverted text-skin-base hover:text-skin-inverted hover:bg-skin-primary"
              style={{
                color: styles?.btnTextColor,
                background: styles?.btnBgc
              }}
              target="_blank"
            >
              {btnLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(HeroBannerCard);
