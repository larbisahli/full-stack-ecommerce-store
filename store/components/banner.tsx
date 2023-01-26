import React from 'react';
import { BannerBase, BannerContent } from './utils/theme';

type BannerProps = {
  background: string;
  children: React.ReactNode;
};

const Banner: React.FC<BannerProps> = ({ background, children }) => {
  return (
    <div
      className={BannerBase}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={BannerContent}>{children}</div>
    </div>
  );
};

export default Banner;
