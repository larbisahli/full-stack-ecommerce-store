import Card from '@components/common/card';
import * as categoriesIcon from '@components/icons/category';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { CREATE_TAG, UPDATE_TAG } from '@graphql/tag';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { notify } from '@lib/notify';
import { Nullable } from '@ts-types/custom.types';
import { Tag } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { tagIcons } from './tag-icons';
import { tagValidationSchema } from './tag-validation-schema';

export const updatedIcons = tagIcons.map((item: any) => {
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

type FormValues = {
  name: string;
  icon: any;
};

const defaultValues = {
  name: '',
  icon: ''
};

type IProps = {
  initialValues?: Nullable<Tag>;
};

export default function CreateOrUpdateTagForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
          icon: initialValues?.icon
            ? tagIcons.find(
                (singleIcon) => singleIcon.value === initialValues?.icon!
              )
            : ''
        }
      : defaultValues,

    resolver: yupResolver(tagValidationSchema)
  });

  const { staffInfo } = useGetStaff();
  const csrfToken = staffInfo?.csrfToken;

  // const [createTag, { loading: creating }] = useMutation(CREATE_TAG, {
  //   context: {
  //     headers: {
  //       'x-csrf-token': csrfToken
  //     }
  //   },
  //   onCompleted: (data: { createTag: Tag }) => {
  //     if (!isEmpty(data)) {
  //       notify(t('common:successfully-created'), 'success');
  //       reset();
  //       router.push(ROUTES.TAGS);
  //     }
  //   }
  // });

  // const [updateTag, { loading: updating }] = useMutation(UPDATE_TAG, {
  //   context: {
  //     headers: {
  //       'x-csrf-token': csrfToken
  //     }
  //   },
  //   onCompleted: (data: { updateTag: Tag }) => {
  //     if (!isEmpty(data)) {
  //       notify(t('common:successfully-updated'), 'success');
  //       router.push(ROUTES.TAGS);
  //     }
  //   }
  // });

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    const input = {
      name: values.name,
      icon: values.icon?.value ?? null
    };

    if (isEmpty(initialValues)) {
      // createTag({ variables: input }).catch((err) => {
      //   setError(err);
      // });
    } else {
      // updateTag({ variables: { id: initialValues.id, ...input } }).catch(
      //   (err) => {
      //     setError(err);
      //   }
      // );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:tag-description-helper-text')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            {...register('name')}
            error={t(errors.name?.message!)}
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
          </div>
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

        {/* <Button loading={creating || updating} disabled={creating || updating}>
          <div className="mr-1">
            <SaveIcon width="1.3rem" height="1.3rem" />
          </div>
          <div>{t('form:button-label-save')}</div>
        </Button> */}
      </div>
    </form>
  );
}
