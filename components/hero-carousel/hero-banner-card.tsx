/* eslint-disable jsx-a11y/anchor-is-valid */
import ImageComponent from '@components/ImageComponent';
import { ImageType } from '@ts-types/generated';
import cn from 'classnames';

interface ShowCaseProps {
  thumbnail: ImageType;
  btnLabel?: string;
  title?: string;
  description?: string;
  styles?: any;
}

const HeroBannerCard = ({
  thumbnail,
  btnLabel,
  title,
  description,
  styles
}: ShowCaseProps) => {
  return (
    <div
      className={cn(
        'relative w-full  bg-no-repeat bg-cover bg-center flex items-center h-[300px]'
      )}
      style={{ zIndex: 0 }}
    >
      <div
        className="absolute h-full w-full overflow-hidden"
        style={{ zIndex: -1, borderRadius: '3px' }}
      >
        <ImageComponent
          src={`${process.env.S3_ENDPOINT}/${thumbnail?.image}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div
        className={cn(
          'mx-auto h-full w-full flex-col flex items-center justify-center text-center px-6 2xl:max-w-[850px] max-w-[480px] md:max-w-[550px]'
        )}
      >
        <div className="text-center">
          <h2
            className={cn(
              'text-3xl 2xl:text-4xl font-manrope font-extrabold leading-snug md:leading-tight xl:leading-[1.3em] mb-3 md:mb-4 xl:mb-3 -mt-2 xl:-mt-3 2xl:-mt-4'
            )}
            style={{ color: styles?.textColor }}
          >
            {title}
          </h2>
          <p
            className={cn(
              '2xl:px-32 md:text-[17px] font-semibold leading-7 md:leading-8 xl:leading-[1.92em] xl:px-16 text-sm 2xl:text-base'
            )}
            style={{ color: styles?.textColor }}
          >
            {description}
          </p>
          {btnLabel && (
            <a
              href={'#'}
              className="h-[45px] mt-7 md:mt-8 text-sm inline-flex items-center justify-center transition duration-300 rounded px-6 py-2 font-semibold"
              style={{
                background: styles?.btnBgc,
                color: styles?.btnTextColor
              }}
            >
              {btnLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroBannerCard;
