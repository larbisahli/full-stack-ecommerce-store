// Add all of your components design and variations here

// -------
// Button
// -------
export const ButtonBase =
  'flex items-center justify-center flex-shrink-0 font-normal w-auto uppercase rounded outline-none transition duration-250 ease-in-out focus:outline-none';
export const ButtonVariant = {
  // primary: 'text-white bg-primary hover:bg-primary-hover',
  primary: 'text-white bg-gray-900 hover:bg-gray-900',
  secondary: 'text-white bg-gray-900 hover:bg-gray-900',
  elevation: 'text-white bg-gray-900 hover:bg-gray-900 shadow-upside'
};
export const ButtonDisable =
  'text-gray-500 bg-gray-300 cursor-not-allowed hover:bg-gray-300';
export const ButtonSize = {
  big: 'h-12 px-30px',
  normal: 'h-11 px-30px',
  small: 'h-9 text-13px px-20px'
};

// ------------
// Icon Button
// ------------
export const IconBtnBase =
  'flex items-center justify-center outline-none transition-colors duration-250 ease-in-out';

// -----------------
// Animated Counter
// -----------------
export const AnimatedCounterBaseWrapper =
  'relative h-35px flex-shrink-0 rounded overflow-hidden';

export const AnimatedCounterBase =
  'group flex items-center justify-between h-35px rounded absolute top-0 right-0 bg-gray-900';

export const AnimatedCounterValue =
  'font-semibold text-13px text-white flex items-center justify-center h-full w-40px transition-colors duration-250 ease-in-out cursor-default';

// -----------------
// Input & Textarea
// -----------------
export const TextBoxCommonBase =
  'w-full h-12 px-4 placeholder-gray-500 border border-transparent rounded outline-none transition duration-200';

export const TextBoxDisable =
  'text-gray-500 bg-gray-300 cursor-not-allowed hover:bg-gray-300 hover:border-transparent focus:border-transparent focus:placeholder-gray-500';

export const TextBoxEnable =
  'text-gray-900 bg-gray-f7 hover:border-gray-400 focus:border-black focus:placeholder-gray-900';

export const InputBase = 'h-12 px-4';

export const TextareaBase = 'h-120px p-4 resize-none';

// --------
// Feature
// --------
export const FeatureBase = 'feature-block flex w-full items-start flex-row';
export const FeatureCounter =
  'flex items-center justify-center w-11  h-11 mr-2 rounded-full mr-20px bg-gray-300 flex-shrink-0 text-24px font-semibold';

export const FeatureContent = 'flex flex-col items-start';

export const FeatureTitle =
  'w-full text-18px font-semibold text-gray-900 mt-0 mb-2';

export const FeatureDetails = 'w-full leading-6 text-14px';

// ----------
// SearchBox
// ----------
export const SearchBase =
  'flex items-center justify-center w-full lg:max-w-screen-md rounded relative overflow-hidden';

export const SearchIconWrapper =
  'absolute top-0 left-0 flex items-center justify-center h-full w-50px';

export const SearchInput =
  'w-full h-12 pl-12 px-4 text-gray-900 placeholder-gray-700 bg-white border-2 border-black rounded outline-none transition duration-200 focus:border-black focus:placeholder-gray-900';

// ---------------
// Search Outline
// ---------------
export const SearchOutlineBase =
  'flex items-center justify-center w-full lg:max-w-screen-md rounded relative overflow-hidden';

export const SearchOutlineIconWrapper =
  'absolute top-0 left-0 flex items-center justify-center h-full w-50px';

export const SearchOutlineInput =
  'w-full h-12 pl-12 px-4 text-gray-900 placeholder-gray-500 bg-gray-f7 border-2 border-transparent rounded outline-none transition duration-200 hover:border-gray-400 focus:border-black focus:placeholder-gray-900';

// --------------
// Section Title
// --------------
export const SectionTitleBase = 'flex flex-col items-center';

export const SectionTitleHeading =
  'flex justify-center text-21px font-semibold text-center mb-2 text-gray-900 xxl:text-24px xxl:mb-10px';

export const SectionTitleSubTitle =
  'flex justify-center text-left xxl:text-center';

// -----------------------
// Section Title with Bar
// -----------------------
export const SectionTitleBarBase = 'flex flex-col items-start relative pl-8';

export const SectionTitleBar =
  'flex w-5px h-full bg-primary absolute top-0 left-0';

export const SectionTitleBarHeading =
  'flex justify-start text-21px font-semibold text-left mb-2 text-gray-900 xxl:text-24px xxl:font-semibold xxl:mb-3';

export const SectionTitleBarSubTitle = 'flex justify-start text-left';

// Banner
export const BannerBase =
  'w-full flex flex-col items-start px-30px py-45px bg-cover bg-center bg-no-repeat bg-gray-100 rounded overflow-hidden xxl:px-95px xxl:py-120px';

export const BannerContent = 'flex flex-col items-start lg:max-w-half';

// --------------------
// Instagram Item Card
// --------------------
export const InstagramItemBase =
  'instagram-card block rounded-lg overflow-hidden shadow-header hover:shadow-product-item transition-all duration-150';

export const InstagramItemImageWrapper =
  'w-full h-235px relative overflow-hidden';

export const InstagramItemImage =
  'absolute top-0 left-0 object-cover w-full h-full';

export const InstagramItemIcon = 'absolute top-10px right-10px';

export const InstagramItemAuthorWrapper = 'flex items-center p-15px';

export const InstagramItemAuthorImage = 'rounded-full w-35px h-35px';

export const InstagramItemAuthorInfoWrapper = 'ml-10px overflow-hidden';

export const InstagramItemAuthorFullName =
  'bg-white text-13px xxxl:text-14px text-gray-900 truncate font-semibold';

export const InstagramItemAuthorName = 'bg-white text-gray-500 text-11px';

// ------------
// Testimonial
// ------------
export const TestimonialButtonGroupBase =
  'flex items-center absolute top-half w-full';

export const TestimonialArrowButtonBase =
  'w-30px h-30px flex items-center justify-center rounded-full text-gray-00 bg-white shadow-navigation absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none';

export const TestimonialPrevButtonRadius = 'left-0 ml-10px lg:ml-35px';

export const TestimonialNextButtonRadius = 'right-0 mr-10px lg:mr-35px';

export const TestimonialBase =
  'w-full bg-white flex flex-col rounded border border-gray-300 p-40px lg:p-50px pt-30px';

export const QuoteBase = 'text-gray-200 flex justify-center mb-30px';

export const TestimonialReview =
  'text-16px text-gray-700 font-normal text-center mb-30px leading-7';

export const TestimonialReviewerBase = 'flex items-center justify-center';

export const TestimonialCarouselItemImage = 'w-full h-full object-cover';

export const TestimonialItemImageBase =
  'overflow-hidden w-40px h-40px mr-15px bg-gray-100 flex rounded-full overflow-hidden shadow-floatingUp';

export const ReviewerName = 'text-16px text-gray-900 font-semibold text-center';
