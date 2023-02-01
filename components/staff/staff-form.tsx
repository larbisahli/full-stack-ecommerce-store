import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import FileInput from '@components/ui/file-input';
import Input from '@components/ui/input';
import PasswordInput from '@components/ui/password-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger, useWarnIfUnsavedChanges } from '@hooks/index';
import { notify } from '@lib/index';
import { StaffType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { staffValidationSchema } from './staff-validation-schema';

type FormValues = StaffType;

const defaultValues = {};

type IProps = {
  initialValues?: StaffType | null;
};

const StaffCreateUpdateForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
          password: 'test',
          confirmPassword: 'test'
        }
      : defaultValues,
    resolver: yupResolver(staffValidationSchema)
  });

  useErrorLogger(error);

  async function onSubmit(values: FormValues) {
    const variables = {
      id: initialValues?.id,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      profile: values?.profile,
      password: values.password,
      email: values.email,
      isAdmin: values.isAdmin
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(variables)
    };

    setUnsavedChanges(false);
    setLoading(true);
    if (isEmpty(initialValues)) {
      fetch('/api/admin/staff/create', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data?.staff?.id) {
            notify(t('common:successfully-created'), 'success');
            router.push(ROUTES.STAFFS);
            reset();
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      fetch('/api/admin/staff/update', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data?.staff?.id) {
            notify(t('common:successfully-updated'), 'success');
            router.push(ROUTES.STAFFS);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }

  useWarnIfUnsavedChanges(unsavedChanges, () => {
    return confirm(t('common:UNSAVED_CHANGES'));
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:category-image-helper-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="profile" control={control} multiple={false} />
        </Card>
      </div>

      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:form-title-information')}
          details={t('form:customer-form-info-help-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-first-name')}
            {...register('firstName')}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.firstName?.message!)}
          />
          <Input
            label={t('form:input-label-last-name')}
            {...register('lastName')}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.lastName?.message!)}
          />
          <Input
            label={t('form:label-phone-number')}
            {...register('phoneNumber')}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.phoneNumber?.message!)}
          />
          <Input
            label={t('form:input-label-email')}
            {...register('email')}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
          />
          {isEmpty(initialValues) && (
            <div>
              <PasswordInput
                label={t('form:input-label-password')}
                {...register('password')}
                error={t(errors?.password?.message!)}
                variant="outline"
                className="mb-4"
              />
              <PasswordInput
                label={t('form:input-label-confirm-password')}
                {...register('confirmPassword')}
                error={t(errors?.confirmPassword?.message!)}
                variant="outline"
                className="mb-4"
              />
            </div>
          )}
          <Checkbox
            label={t('form:input-label-administrator')}
            {...register('isAdmin')}
            className="mt-8"
          />
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button loading={loading} disabled={loading}>
          <div className="mr-1">
            <SaveIcon width="1.3rem" height="1.3rem" />
          </div>
          <div>{t('form:button-label-save')}</div>
        </Button>
      </div>
    </form>
  );
};

export default StaffCreateUpdateForm;
