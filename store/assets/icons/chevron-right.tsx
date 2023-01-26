const ChevronRight = ({
  color = 'currentColor',
  width = '8.5px',
  height = '14px'
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 8.4 14"
    >
      <path
        d="M7.757,6.329l1.4-1.4,7,7-7,7-1.4-1.4,5.6-5.6Z"
        transform="translate(-7.757 -4.929)"
        fill={color}
      />
    </svg>
  );
};

export default ChevronRight;
