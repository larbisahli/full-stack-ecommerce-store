import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { Category } from '@ts-types/generated';
import { fetcher } from '@utils/utils';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';
import { Control } from 'react-hook-form';
import useSwr from 'swr';

interface Props {
  control: Control<any>;
}

const ProductCategoryInput = ({ control }: Props) => {
  const { t } = useTranslation('common');

  const random = React.useRef(Date.now());
  const key = [
    '/api/admin/category/categories/select/all?time=',
    random.current
  ];
  const { data, error, isLoading } = useSwr<{ categories: Category[] }>(
    key,
    fetcher
  );

  const { categories = [] } = data ?? {};

  useErrorLogger(error);

  return (
    <div className="mb-5">
      <Label>{t('form:input-label-categories')}*</Label>
      <SelectInput
        name="categories"
        isMulti
        control={control}
        getOptionLabel={(option: Category) => option.name}
        getOptionValue={(option: Category) => option.id}
        options={categories}
        isLoading={isLoading}
      />
    </div>
  );
};

export default memo(ProductCategoryInput);
