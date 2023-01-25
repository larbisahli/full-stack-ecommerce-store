// import Select from '@components/ui/select/select';
import Loader from '@components/ui/loader/loader';
import dynamic from 'next/dynamic';
import { Controller } from 'react-hook-form';

const Select = dynamic(() => import('@components/ui/select/select'), {
  loading: () => <Loader height="100px" showText={false} />,
  ssr: false
});

interface SelectInputProps {
  control: any;
  rules?: any;
  name: string;
  options: object[];
  [key: string]: unknown;
}

const SelectInput = ({
  control,
  options,
  name,
  rules,
  getOptionLabel,
  getOptionValue,
  isMulti,
  isClearable,
  isLoading,
  closeMenuOnSelect = true,
  hideSelectedOptions = false,
  // isSearchable=true,
  // isDisabled=false,
  // isOptionDisabled=false,
  ...rest
}: SelectInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      {...rest}
      render={({ field }) => (
        <Select
          {...field}
          // isOptionDisabled={isOptionDisabled}
          // isDisabled={isDisabled}
          // isSearchable={isSearchable}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isMulti={isMulti}
          isClearable={isClearable}
          isLoading={isLoading}
          closeMenuOnSelect={closeMenuOnSelect}
          hideSelectedOptions={hideSelectedOptions}
          options={options}
        />
      )}
    />
  );
};

export default SelectInput;
