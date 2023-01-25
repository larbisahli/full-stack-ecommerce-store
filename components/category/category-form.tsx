import Card from '@components/common/card';
import * as categoriesIcon from '@components/icons/category';
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
import { Nullable } from '@ts-types/custom.types';
import { Category } from '@ts-types/generated';
import { fetcher } from '@utils/utils';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import useSwr from 'swr'

import { categoryIcons } from './category-icons';
import { categoryValidationSchema } from './category-validation-schema';

export const updatedIcons = categoryIcons.map((item: any) => {
  const TagName = categoriesIcon[item.value];
  item.label = (
    <div className="flex space-s-5 items-center">
      <span className="flex w-5 h-5 items-center justify-center">
        {TagName && <TagName className="max-h-full max-w-full" />}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});


function SelectCategories({ control }: { control: Control<FormValues> }) {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { categoryId } = query;
  
  const { data, error, isLoading } = useSwr<Category[]>(categoryId ? `/api/category/categories/select/${categoryId}` : null, fetcher)

  const categories = [] // data?.categoriesSelectForAdmin;

  // useErrorLogger(error);

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
        // isLoading={loading}
      />
    </div>
  );
}

type FormValues = Category;

const defaultValues = {
  category_name: '',
  category_description: null,
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

  // const [createCategory, { loading: creating, reset: resetCreateMutation }] =
  //   useMutation(CREATE_CATEGORY, {
  //     context: {
  //       headers: {
  //         'x-csrf-token': csrfToken
  //       }
  //     },
  //     onCompleted: (data: { createCategory: Category }) => {
  //       if (!isEmpty(data)) {
  //         notify(t('common:successfully-created'), 'success');
  //         reset();
  //         router.push(ROUTES.CATEGORIES);
  //       }
  //     }
  //   });
  // const [updateCategory, { loading: updating, reset: resetUpdateMutation }] =
  //   useMutation(UPDATE_CATEGORY, {
  //     context: {
  //       headers: {
  //         'x-csrf-token': csrfToken
  //       }
  //     },
  //     onCompleted: (data: { updateCategory: Category }) => {
  //       if (!isEmpty(data)) {
  //         notify(t('common:successfully-updated'), 'success');
  //         router.push(ROUTES.CATEGORIES);
  //       }
  //     }
  //   });

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    if (isEmpty(values.thumbnail)) {
      notify('form:category-image-required', 'warning');
      return;
    }

    const variables = {
      name: values.name,
      description: values.description,
      thumbnail: {
        image: values.thumbnail?.image,
        placeholder: values.thumbnail?.placeholder
      },
      parentId: isEmpty(values?.parent) ? null : values?.parent?.id,
      icon: (values.icon as unknown as { value: string })?.value ?? null
    };

    setUnsavedChanges(false);
    if (isEmpty(initialValues)) {
      // createCategory({ variables }).catch((err) => {
      //   setError(err);
      //   resetCreateMutation();
      // });
    } else {
      // updateCategory({
      //   variables: { id: initialValues?.id, ...variables }
      // }).catch((err) => {
      //   setError(err);
      //   resetUpdateMutation();
      // });
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

          <div className="mb-5">
            <Label>{t('form:input-label-select-icon')}</Label>
            <SelectInput
              name="icon"
              control={control}
              options={updatedIcons}
              isClearable={true}
            />
            {t(errors.icon?.message!) && (
              <p className="my-2 text-xs text-start text-red-500">
                {t(errors.icon?.message!)}
              </p>
            )}
          </div>
          {!initialValues?.hasChildren && (
            <SelectCategories control={control} />
          )}
        </Card>
      </div>
      <div className="mb-4 text-end">
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

        <Button 
        // loading={creating || updating}
        //  disabled={creating || updating}
         >
          <div className="mr-1">
            <SaveIcon width="1.3rem" height="1.3rem" />
          </div>
          <div>{t('form:button-label-save')}</div>
        </Button>
      </div>
    </form>
  );
}
