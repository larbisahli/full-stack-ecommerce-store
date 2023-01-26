/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import InputPhoneNumber from '@components/ui/input-phone-number';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import TextArea from '@components/ui/text-area';
import { COUNTRIES } from '@graphql/shipping-zone';
import { CREATE_SUPPLIER, UPDATE_SUPPLIER } from '@graphql/supplier';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { notify } from '@lib/index';
import type { Nullable } from '@ts-types/custom.types';
import type { CountriesType, Suppliers } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

type FormValues = Suppliers;

type TCountries = {
  countries: CountriesType[];
};

type IProps = {
  initialValues?: Nullable<Suppliers>;
};

const defaultValues = {
  name: '',
  company: null,
  phoneNumber: null,
  addressLine1: '',
  addressLine2: null,
  country: null,
  city: null,
  note: null
};

export default function CreateOrUpdateSupplierForm({ initialValues }: IProps) {
  const router = useRouter();

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // const {
  //   data,
  //   loading: loadingCountries,
  //   error: queryError
  // } = useQuery<TCountries>(COUNTRIES, {
  //   fetchPolicy: 'cache-and-network'
  // });

  const countries = []; // data?.countries;

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: initialValues ? { ...initialValues } : defaultValues
  });

  const { staffInfo } = useGetStaff();
  const csrfToken = staffInfo?.csrfToken;

  // const [createSupplier, { loading: creating }] = useMutation(CREATE_SUPPLIER, {
  //   context: {
  //     headers: {
  //       'x-csrf-token': csrfToken
  //     }
  //   },
  //   onCompleted: (data: { createSupplier: Suppliers }) => {
  //     if (!isEmpty(data)) {
  //       notify(t('common:successfully-created'), 'success');
  //       reset();
  //       router.push(ROUTES.SUPPLIERS);
  //     }
  //   }
  // });

  // const [updateSupplier, { loading: updating }] = useMutation(UPDATE_SUPPLIER, {
  //   context: {
  //     headers: {
  //       'x-csrf-token': csrfToken
  //     }
  //   },
  //   onCompleted: (data: { updateSupplier: Suppliers }) => {
  //     if (!isEmpty(data)) {
  //       notify(t('common:successfully-updated'), 'success');
  //       router.push(ROUTES.SUPPLIERS);
  //     }
  //   }
  // });

  useErrorLogger(error);
  // useErrorLogger(queryError);

  const country = watch('country');

  const onSubmit = (values: FormValues) => {
    const variables = {
      ...values,
      country: { id: values?.country?.id }
    };

    if (isEmpty(initialValues)) {
      // createSupplier({ variables }).catch((err) => {
      //   setError(err);
      // });
    } else {
      // updateSupplier({
      //   variables: { ...variables, id: initialValues.id }
      // }).catch((err) => {
      //   setError(err);
      // });
    }
  };

  return (
    <>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title={t('common:supplier')}
            details={`${
              initialValues
                ? t('form:item-description-update')
                : t('form:item-description-add')
            } ${t('form:form-description-supplier-name')}`}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div className="grid grid-cols-2 gap-5">
              <Input
                label={`${t('form:input-label-supplier-name')}*`}
                {...register('name', { required: 'Name is required' })}
                error={t(errors.name?.message!)}
                variant="outline"
                className="mb-5"
              />
              <Input
                label={t('form:input-label-company')}
                {...register('company')}
                error={t(errors.company?.message!)}
                variant="outline"
                className="mb-5"
              />
              <Input
                label={`${t('form:input-label-address-1')}*`}
                {...register('addressLine1', {
                  required: 'address 1 is required'
                })}
                error={t(errors.addressLine1?.message!)}
                variant="outline"
                className="mb-5"
              />
              <Input
                label={t('form:input-label-address-2')}
                {...register('addressLine2')}
                error={t(errors.addressLine2?.message!)}
                variant="outline"
                className="mb-5"
              />

              <div>
                <Label>{t('form:input-label-country')}</Label>
                <SelectInput
                  name="country"
                  control={control}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.id}
                  options={countries}
                  isLoading={loadingCountries}
                />
              </div>
              <Input
                label={t('form:input-label-city')}
                {...register('city')}
                error={t(errors.addressLine2?.message!)}
                variant="outline"
                className="mb-5"
              />
              <div>
                <InputPhoneNumber
                  label={t('form:input-label-phone-number')}
                  {...register('phoneNumber')}
                  pattern={'^[0-9\\.\\-\\/]+$'}
                  placeholder="123-4567-8901"
                  type="tel"
                  variant="outline"
                  className="mb-4"
                  error={t(errors?.phoneNumber?.message!)}
                >
                  {country?.phoneCode && (
                    <div
                      className="h-full border rounded flex justify-center items-center 
                p-2 mr-1 text-gray-500 font-medium"
                    >
                      <span>+{country?.phoneCode}</span>
                    </div>
                  )}
                </InputPhoneNumber>
              </div>
            </div>
            <TextArea
              label={t('form:item-short-note')}
              {...register('note')}
              error={t(errors.note?.message!)}
              variant="outline"
              className="mt-5"
            />
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

          {/* <Button
            loading={creating || updating}
            disabled={creating || updating}
          >
            <div className="mr-1">
              <SaveIcon width="1.3rem" height="1.3rem" />
            </div>
            <div>{t('form:button-label-save')}</div>
          </Button> */}
        </div>
      </form>
    </>
  );
}
