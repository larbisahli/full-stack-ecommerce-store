import React, { MouseEvent } from 'react';

import { IconBtnBase } from './utils/theme';

type Props = {
  className?: string;
  children: React.ReactNode | undefined;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const defaultProps = {
  className: '',
  disabled: false
};

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>;

export type IconButtonProps = Props & NativeAttrs;

const IconButton: React.FC<IconButtonProps> = ({
  className,
  children,
  disabled,
  onClick
}) => {
  const classNames = IconBtnBase + ' ' + className;

  const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick && onClick(event);
  };

  return (
    <button
      onClick={onClickHandler}
      className={classNames}
      disabled={disabled}
      aria-label="button"
    >
      {children}
    </button>
  );
};

IconButton.defaultProps = defaultProps;

export default IconButton;
