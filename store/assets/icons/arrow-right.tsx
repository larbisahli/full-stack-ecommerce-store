const ArrowRight = ({
  color = 'currentColor',
  width = '16px',
  height = '13px'
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 15.333 12.825"
    >
      <g data-name="arrow-forward (1)" transform="translate(-93 -110.588)">
        <path
          data-name="Path 16639"
          d="M268,112l4.517,5L268,122"
          transform="translate(-165.184 0)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <line
          data-name="Line 6"
          x1="12.308"
          transform="translate(94 117)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};

export default ArrowRight;
