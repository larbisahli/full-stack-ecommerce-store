import ChevronLeft from '@store/assets/icons/chevron-left';
import ChevronRight from '@store/assets/icons/chevron-right';
import QuoteIcon from '@store/assets/icons/quote';
import {
  QuoteBase,
  ReviewerName,
  TestimonialArrowButtonBase,
  TestimonialBase,
  TestimonialButtonGroupBase,
  TestimonialCarouselItemImage,
  TestimonialItemImageBase,
  TestimonialNextButtonRadius,
  TestimonialPrevButtonRadius,
  TestimonialReview,
  TestimonialReviewerBase
} from '@store/components/utils/theme';
import React from 'react';
import MultiCarousel from 'react-multi-carousel';

type CustomButtonProp = {
  onClick?: (e: any) => void;
  children: React.ReactNode;
};

type ButtonGroupProps = {
  next?: Function;
  previous?: Function;
};

interface CarouselItemProps {
  image?: string;
  review: string;
  name: string;
}

type CarouselProps = {
  data: CarouselItemProps[];
  autoPlay?: boolean;
  infinite?: boolean;
  itemClass?: string;
  className?: string;
  containerClass?: string;
};

const PrevButton: React.FC<CustomButtonProp> = ({ onClick, children }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      aria-label="prev-button"
      className={TestimonialArrowButtonBase + ' ' + TestimonialPrevButtonRadius}
    >
      {children}
    </button>
  );
};
const NextButton: React.FC<CustomButtonProp> = ({ onClick, children }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      aria-label="next-button"
      className={TestimonialArrowButtonBase + ' ' + TestimonialNextButtonRadius}
    >
      {children}
    </button>
  );
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({ next, previous }) => {
  return (
    <div className={TestimonialButtonGroupBase}>
      <PrevButton onClick={() => previous()}>
        <ChevronLeft height="12px" />
      </PrevButton>
      <NextButton onClick={() => next()}>
        <ChevronRight height="12px" />
      </NextButton>
    </div>
  );
};

const responsive = {
  desktop: {
    breakpoint: { max: 3600, min: 981 },
    items: 2
  },
  tablet: {
    breakpoint: { max: 980, min: 0 },
    items: 1
  }
};

const Carousel: React.FC<CarouselProps> = ({
  data,
  autoPlay,
  infinite,
  itemClass,
  className,
  containerClass,
  ...props
}) => {
  return (
    <MultiCarousel
      arrows={false}
      responsive={responsive}
      ssr={true}
      showDots={false}
      slidesToSlide={1}
      infinite={infinite}
      containerClass={containerClass}
      itemClass={itemClass}
      autoPlay={autoPlay}
      autoPlaySpeed={3000}
      renderButtonGroupOutside={true}
      additionalTransfrom={0}
      customButtonGroup={<ButtonGroup />}
      className={className}
      {...props}
      // use dir ltr when rtl true
    >
      {data.map((item, index) => (
        <div className={TestimonialBase} key={index}>
          <div className={QuoteBase}>
            <QuoteIcon style={{ width: 100, height: 'auto' }} />
          </div>

          <h3 className={TestimonialReview}>{item.review}</h3>

          <div className={TestimonialReviewerBase}>
            <div className={TestimonialItemImageBase}>
              <img src={item.image} className={TestimonialCarouselItemImage} />
            </div>
            <span className={ReviewerName}>{item.name}</span>
          </div>
        </div>
      ))}
    </MultiCarousel>
  );
};

const defaultProps = {
  autoPlay: false,
  infinite: true,
  className: ''
};

Carousel.defaultProps = defaultProps;

export default Carousel;
