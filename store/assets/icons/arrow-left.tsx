const ArrowLeft = ({
  color = 'currentColor',
  width = '19px',
  height = '12px',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18.738 12"
      {...props}
    >
      <path
        data-name="Path 17147"
        d="M1252.468,501.849l5.7-5.922,1.5,1.567-3.395,3.143.091.214h14.849v2.108H1256.2l3.654,3.43-1.558,1.538Z"
        transform="translate(-1252.468 -495.927)"
        fill={color}
      />
    </svg>
  );
};

export default ArrowLeft;
