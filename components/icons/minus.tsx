import React from 'react';

export const Minus = ({
  color = 'currentColor',
  width = '12px',
  height = '12px',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M20 12H4"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        fill={color}
      />
    </svg>
  );
};
