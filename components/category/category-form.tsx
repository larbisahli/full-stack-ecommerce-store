import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import FileInput from '@components/ui/file-input';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import TextArea from '@components/ui/text-area';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger, useWarnIfUnsavedChanges } from '@hooks/index';
import { notify } from '@lib/index';
import { NoteNotify } from '@lib/notify';
import { Nullable } from '@ts-types/custom.types';
import { Category } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { fetcher } from '@utils/utils';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import useSwr from 'swr';

import { categoryIcons } from './category-icons';
import { categoryValidationSchema } from './category-validation-schema';

function SelectCategories({ control }: { control: Control<FormValues> }) {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { categoryId } = query;

  const random = React.useRef(Date.now());
  const key = [
    categoryId
      ? `/api/admin/category/categories/select/${categoryId}?time=`
      : '/api/admin/category/categories/select?time',
    random.current
  ];
  const { data, error, isLoading } = useSwr<{ categories: Category[] }>(
    key,
    fetcher
  );

  const { categories = [] } = data ?? {};

  useErrorLogger(error);

  return (
    <div>
      <Label>{t('form:input-label-parent-category')}</Label>
      <SelectInput
        name="parent"
        control={control}
        getOptionLabel={(option: Category) => option.name}
        getOptionValue={(option: Category) => option.id}
        options={categories}
        isClearable={true}
        isLoading={isLoading}
      />
    </div>
  );
}

type FormValues = Category;

const defaultValues = {
  name: '',
  description: null,
  parent: null,
  thumbnail: null,
  icon: null
};

type IProps = {
  initialValues?: Nullable<Category>;
};

export default function CreateOrUpdateCategoriesForm({
  initialValues
}: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    defaultValues: initialValues
      ? {
          ...initialValues,
          icon: initialValues?.icon
            ? categoryIcons.find(
                (singleIcon) => singleIcon.value === initialValues?.icon!
              )
            : null
        }
      : (defaultValues as unknown),
    resolver: yupResolver(categoryValidationSchema)
  });

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    const variables = {
      id: initialValues?.id,
      name: values.name,
      description: values.description,
      thumbnail: values.thumbnail,
      parentId: isEmpty(values?.parent) ? null : values?.parent?.id
    };

    setUnsavedChanges(false);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(variables)
    };
    setLoading(true);
    if (isEmpty(initialValues)) {
      fetch('/api/admin/category/create', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data?.category?.id) {
            notify(t('common:successfully-created'), 'success');
            NoteNotify('Your changes will be live in 10 minutes.');
            router.push(ROUTES.CATEGORIES);
            reset();
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      fetch('/api/admin/category/update', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data?.category?.id) {
            notify(t('common:successfully-updated'), 'success');
            NoteNotify('Your changes will be live in 10 minutes.');
            router.push(ROUTES.CATEGORIES);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  useWarnIfUnsavedChanges(unsavedChanges, () => {
    return confirm(t('common:UNSAVED_CHANGES'));
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:category-image-helper-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="thumbnail" control={control} multiple={false} />
        </Card>
      </div>

      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:category-description-helper-text')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            // @ts-ignore
            {...register('name')}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />

          <TextArea
            label={t('form:input-label-details')}
            {...register('description')}
            variant="outline"
            className="mb-5"
          />
          {!initialValues?.hasChildren && (
            <SelectCategories control={control} />
          )}
        </Card>
      </div>
      <div className="mb-4 flex justify-end items-center">
        {initialValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t('form:button-label-back')}
          </Button>
        )}

        <Button loading={loading} disabled={loading}>
          <div className="mr-1">
            <SaveIcon width="1.3rem" height="1.3rem" />
          </div>
          <div>{t('form:button-label-save')}</div>
        </Button>
      </div>
    </form>
  );
}
