import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

type ScrollbarProps = {
  className?: string;
  children: React.ReactNode;
  options?: any;
};

export const Scrollbar: React.FC<ScrollbarProps> = ({
  children,
  className,
  options,
  ...props
}) => {
  return (
    <OverlayScrollbarsComponent
      options={{
        className: `${className} os-theme-thin`,
        scrollbars: {
          autoHide: 'never',
          touchSupport: false
        },
        ...options
      }}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};
