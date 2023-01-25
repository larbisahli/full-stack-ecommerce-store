import React, { memo } from 'react';
import { Controller } from 'react-hook-form';

import EditorComponent from './editor';

interface EditorInputProps {
  control: any;
  className?: string;
  name: string;
  [key: string]: unknown;
}

const Editor = ({ className, control, name, ...rest }: EditorInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      {...rest}
      render={({ field }) => (
        <EditorComponent {...field} className={className} />
      )}
    />
  );
};

export default memo(Editor);
