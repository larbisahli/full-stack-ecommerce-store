import React from 'react';

export const Add = ({
  color = 'currentColor',
  width = '12px',
  height = '12px',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      aria-hidden="true"
      viewBox="0 0 12 12"
      {...props}
    >
      <path
        d="M6 1.5a.5.5 0 00-1 0V5H1.5a.5.5 0 000 1H5v3.5a.5.5 0 001 0V6h3.5a.5.5 0 000-1H6V1.5z"
        fill={color}
      />
    </svg>
  );
};
