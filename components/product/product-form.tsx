import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import FileInput from '@components/ui/file-input';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Loader from '@components/ui/loader/loader';
import Radio from '@components/ui/radio';
import SelectInput from '@components/ui/select-input';
import TextArea from '@components/ui/text-area';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger, useWarnIfUnsavedChanges } from '@hooks/index';
import { notify } from '@lib/index';
import { NoteNotify } from '@lib/notify';
import type { Product } from '@ts-types/generated';
import { ProductStatus, ProductType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { memo, useReducer, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ProductCategoryInput from './product-category-input';
import ProductInfoForm from './product-info-form';
import { productValidationSchema } from './product-validation-schema';
import ProductVariableForm from './product-variable-form';
import { creationVariable, updateVariable } from './variablesSubmission';
import { variationsReducer } from './variations-reducer';

const Editor = dynamic(() => import('@components/ui/editor'), {
  loading: () => <Loader height="150px" text="Editor..." />,
  ssr: false
});

type FormValues = Product;

const defaultValues = {
  name: '',
  sku: '',
  salePrice: 0,
  comparePrice: 0,
  buyingPrice: 0,
  quantity: 0,
  shortDescription: '',
  description: '',
  type: { id: ProductType.Simple, name: 'Simple' },
  status: ProductStatus.Draft,
  disableOutOfStock: true,
  note: '',
  thumbnail: [],
  gallery: [],
  categories: []
};

type IProps = {
  initialValues?: Product | null;
};

const productTypes = [
  { name: 'Simple Product', id: ProductType.Simple },
  { name: 'Variable Product', id: ProductType.Variable }
];

function CreateOrUpdateProductForm({ initialValues }: IProps) {
  const { t } = useTranslation();

  const router = useRouter();

  const [variationState, dispatchVariationState] = useReducer(
    variationsReducer,
    {
      variations: [],
      variationOptions: []
    }
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shortDescription, setShortDescription] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);
  const [lockedSubmission, setLockedSubmission] = useState(false);

  const methods = useForm<FormValues>({
    resolver: yupResolver(productValidationSchema),
    shouldUnregister: true,
    //@ts-ignore
    defaultValues: initialValues
      ? cloneDeep({
          ...initialValues,
          status: initialValues?.published
            ? ProductStatus.Publish
            : ProductStatus.Draft,
          type:
            initialValues.type.id === ProductType.Simple
              ? productTypes[0]
              : productTypes[1]
        })
      : defaultValues
  });

  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    reset,
    formState: { errors }
  } = methods;

  useErrorLogger(error);

  const onSubmit = async (_values: FormValues) => {
    const isVariable = _values.type.id === ProductType.Variable;
    const values = {
      ..._values,
      variations: isVariable ? variationState.variations : [],
      variationOptions: isVariable ? variationState.variationOptions : []
    };

    if (lockedSubmission) return;

    setLockedSubmission(true);
    setLoading(true);
    if (isEmpty(initialValues)) {
      const variables = creationVariable(values);
      console.log('Create:>', { _values, variables });
      fetch('/api/admin/product/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variables)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.product?.id) {
            notify(t('common:successfully-created'), 'success');
            NoteNotify('Your changes will be live in 10 minutes.');
            router.push(ROUTES.PRODUCTS);
            reset();
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      const variables = updateVariable(values, initialValues);
      console.log('Update:>', { _values, variables });
      fetch('/api/admin/product/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variables)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.product?.id) {
            notify(t('common:successfully-updated'), 'success');
            NoteNotify('Your changes will be live in 10 minutes.');
            router.push(ROUTES.PRODUCTS);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
    setLockedSubmission(false);
    setUnsavedChanges(false);
  };

  useWarnIfUnsavedChanges(unsavedChanges, () => {
    return confirm(t('common:UNSAVED_CHANGES'));
  });

  const currentProductType = watch('type');

  const type = currentProductType?.id ?? getValues('type');

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
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Thumbnail */}
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t('form:featured-image-title')}
              details={t('form:featured-image-help-text')}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <FileInput name="thumbnail" control={control} multiple={false} />
            </Card>
          </div>

          {/* Gallery */}
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t('form:gallery-title')}
              details={t('form:gallery-help-text')}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <FileInput name="gallery" control={control} />
            </Card>
          </div>

          {/* Tags, Category and Suppliers*/}
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t('form:type-and-category')}
              details={t('form:type-and-category-help-text')}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <ProductCategoryInput control={control} />
              {/* @ts-ignore */}
              <ValidationError message={t(errors.categories?.message)} />
            </Card>
          </div>

          {/* Description */}
          <div className="flex flex-wrap my-5 sm:my-8 pb-8 border-b border-dashed border-border-base">
            <Description
              title={t('form:item-description')}
              details={`${
                initialValues
                  ? t('form:item-description-edit')
                  : t('form:item-description-add')
              } ${t('form:product-description-help-text')}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label={`${t('form:input-label-name')}*`}
                {...register('name')}
                error={t(errors.name?.message!)}
                placeholder="Title..."
                variant="outline"
                className="mb-5"
              />

              <Label>{t('form:input-label-product-details')}*</Label>
              <Editor
                control={control}
                name="description"
                className="mb-5"
                defaultValue=""
              />
              <ValidationError message={t(errors.description?.message)} />
              <TextArea
                label={`${t('form:item-seo-description')}*`}
                // @ts-ignore
                {...register('shortDescription')}
                onBlur={() =>
                  setShortDescription(getValues('shortDescription').length)
                }
                error={t(errors.shortDescription?.message!)}
                variant="outline"
              />
              <div style={{ fontSize: '.75rem' }} className="mb-5">
                {shortDescription <= 160 ? (
                  <span className="text-green ">
                    {`(${shortDescription}/160 characters max)`}
                  </span>
                ) : (
                  <span className="text-red-600">
                    {`(${shortDescription}/160 characters max)`}
                  </span>
                )}
              </div>
              <TextArea
                label={t('form:item-hidden-note')}
                {...register('note')}
                placeholder="Hidden note"
                error={t(errors.note?.message!)}
                variant="outline"
                className="mb-5"
              />
              <div>
                <Label>{t('form:input-label-status')}</Label>
                <Radio
                  {...register('status')}
                  label={t('form:input-label-publish')}
                  id={ProductStatus.Publish}
                  value={ProductStatus.Publish}
                  className="mb-2"
                />
                <Radio
                  {...register('status')}
                  id={ProductStatus.Draft}
                  label={t('form:input-label-draft')}
                  value={ProductStatus.Draft}
                />
              </div>
              <div className="my-5">
                <Checkbox
                  {...register('disableOutOfStock')}
                  label={t('form:input-label-disable-out-of-stock')}
                />
              </div>
            </Card>
          </div>

          {/* Product Type */}

          <div className="flex flex-wrap my-5 sm:my-8 pb-8 border-b border-dashed border-border-base">
            <Description
              title={t('form:form-title-product-type')}
              details={`${
                initialValues
                  ? t('form:item-description-edit')
                  : t('form:item-description-add')
              } ${t('form:product-type-help-text')}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Label>{t('form:input-label-attribute-name')}</Label>
              <SelectInput
                name={`type`}
                control={control}
                hideSelectedOptions={false}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.id}
                options={productTypes}
              />
            </Card>
          </div>
          {/* Variation Type & Simple Type */}

          {!!type &&
            (type === ProductType.Simple ? (
              <ProductInfoForm initialValues={initialValues} />
            ) : (
              <ProductVariableForm
                initialValues={initialValues}
                variationState={variationState}
                dispatchVariationState={dispatchVariationState}
              />
            ))}

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
      </FormProvider>
    </>
  );
}

export default memo(CreateOrUpdateProductForm);
