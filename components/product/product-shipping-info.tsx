import Card from '@components/common/card';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';
import { Control, useFormContext } from 'react-hook-form';

type IProps = {
  control: Control<any>;
  initialValues: any;
};

const weightUnits = [{ unit: 'kg' }, { unit: 'g' }];

const volumeUnits = [{ unit: 'l' }, { unit: 'ml' }];

const dimensionUnits = [{ unit: 'l' }, { unit: 'ml' }];

function ProductShippingInfoForm({ control, initialValues }: IProps) {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className="flex flex-wrap my-5 sm:my-8">
      <Description
        title={t('form:form-title-product-shipping-info')}
        details={`${
          initialValues
            ? t('form:item-description-edit')
            : t('form:item-description-add')
        } ${t('form:form-description-simple-product-info')}`}
        className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">
        <input {...register(`productShippingInfo.id`)} type="hidden" />
        {/* Width */}
        <Label>{t('form:input-label-weight')}</Label>
        <div className="flex items-center mb-5">
          <Input
            {...register('productShippingInfo.weight')}
            type="number"
            variant="outline"
            className="mr-2"
          />
          <div className="w-36">
            <SelectInput
              name="productShippingInfo.weightUnit"
              control={control}
              getOptionLabel={(option: any) => option.unit}
              getOptionValue={(option: any) => option.unit}
              options={weightUnits}
              className="w-full"
            />
          </div>
        </div>
        <ValidationError
          message={t(errors.productShippingInfo?.weight?.message!)}
        />
        {/* Volume */}
        <Label>{t('form:input-label-volume')}</Label>
        <div className="flex items-center mb-5">
          <Input
            {...register('productShippingInfo.volume')}
            type="number"
            variant="outline"
            className="mr-2"
          />
          <div className="w-36">
            <SelectInput
              name={'productShippingInfo.volumeUnit'}
              control={control}
              className="w-full"
              getOptionLabel={(option: any) => option.unit}
              getOptionValue={(option: any) => option.unit}
              options={volumeUnits}
            />
          </div>
        </div>
        <ValidationError
          message={t(errors.productShippingInfo?.volume?.message!)}
        />
        {/* Dimensions */}
        <Label className="mb-3">{t('form:input-label-dimensions')}</Label>
        <div className="flex items-center mb-5 flex-wrap">
          <div>
            <Label
              style={{
                color: '#929191',
                fontSize: '0.8rem',
                marginTop: '0.75rem'
              }}
            >
              {t('form:input-label-dimensions-width')}
            </Label>
            <Input
              {...register('productShippingInfo.dimensionWidth')}
              type="number"
              variant="outline"
              className="w-24 mr-2"
            />
          </div>
          <div>
            <Label
              style={{
                color: '#929191',
                fontSize: '0.8rem',
                marginTop: '0.75rem'
              }}
            >
              {t('form:input-label-dimensions-height')}
            </Label>
            <Input
              {...register('productShippingInfo.dimensionHeight')}
              type="number"
              variant="outline"
              className="w-24 mr-2"
            />
          </div>
          <div>
            <Label
              style={{
                color: '#929191',
                fontSize: '0.8rem',
                marginTop: '0.75rem'
              }}
            >
              {t('form:input-label-dimensions-depth')}
            </Label>
            <Input
              {...register('productShippingInfo.dimensionDepth')}
              type="number"
              variant="outline"
              className="w-24 mr-2"
            />
          </div>
          <div className="w-36">
            <Label
              style={{
                color: '#929191',
                fontSize: '0.8rem',
                marginTop: '0.75rem'
              }}
            >
              {t('form:input-label-dimensions-units')}
            </Label>
            <SelectInput
              name="productShippingInfo.dimensionUnit"
              control={control}
              className="w-full"
              getOptionLabel={(option: any) => option.unit}
              getOptionValue={(option: any) => option.unit}
              options={dimensionUnits}
            />
          </div>
          <ValidationError
            message={
              t(errors.productShippingInfo?.dimensionDepth?.message!) ||
              t(errors.productShippingInfo?.dimensionHeight?.message!) ||
              t(errors.productShippingInfo?.dimensionWidth?.message!)
            }
          />
        </div>
      </Card>
    </div>
  );
}

export default memo(ProductShippingInfoForm);
