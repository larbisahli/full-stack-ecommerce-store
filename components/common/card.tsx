import cn from 'classnames';
import React from 'react';

type Props = {
  className?: string;
  [key: string]: unknown;
};

const Card: React.FC<Props> = ({ className, ...props }) => {
  return <div className={cn('p-5 md:p-8 card', className)} {...props} />;
};

export default Card;
