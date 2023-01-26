import React, { useEffect, useState } from 'react';

import {
  TextareaBase,
  TextBoxCommonBase,
  TextBoxDisable,
  TextBoxEnable
} from './utils/theme';

export interface Props {
  value?: string;
  initialValue?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export const defaultProps = {
  disabled: false,
  readOnly: false,
  className: '',
  placeholder: '',
  initialValue: ''
};

type NativeAttrs = Omit<React.TextareaHTMLAttributes<any>, keyof Props>;

export type TextareaPropsType = Props & NativeAttrs;

const Textarea: React.FC<React.PropsWithChildren<TextareaPropsType>> = ({
  className,
  value,
  initialValue,
  disabled,
  readOnly,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [initValue, setInitValue] = useState<string>(initialValue);

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled || readOnly) return;
    setInitValue(event.target.value);
    onChange && onChange(event);
  };

  const focusHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    onFocus && onFocus(e);
  };
  const blurHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    onBlur && onBlur(e);
  };

  useEffect(() => {
    if (value === undefined) return;
    setInitValue(value);
  }, [value]);

  const classNames =
    TextBoxCommonBase +
    ' ' +
    TextareaBase +
    ' ' +
    (disabled === true ? TextBoxDisable : TextBoxEnable) +
    ' ' +
    className;

  return (
    <textarea
      placeholder={placeholder}
      className={classNames}
      value={initValue}
      disabled={disabled}
      readOnly={readOnly}
      onChange={changeHandler}
      onFocus={focusHandler}
      onBlur={blurHandler}
      autoComplete="off"
      {...props}
    />
  );
};

Textarea.defaultProps = defaultProps;

export default Textarea;
