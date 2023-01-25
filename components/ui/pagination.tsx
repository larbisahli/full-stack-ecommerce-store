import 'rc-pagination/assets/index.css';

import { ArrowNext } from '@components/icons/arrow-next';
import { ArrowPrev } from '@components/icons/arrow-prev';
import RCPagination, { PaginationProps } from 'rc-pagination';
import React from 'react';

const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <RCPagination
      className="px-1"
      nextIcon={<ArrowNext />}
      prevIcon={<ArrowPrev />}
      {...props}
    />
  );
};

export default Pagination;
