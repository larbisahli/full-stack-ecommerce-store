import Card from '@components/common/card';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import { useSettings } from '@contexts/settings.context';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

type IProps = {
  initialValues: any;
};

function ProductInfoForm({ initialValues }: IProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  const { t } = useTranslation();

  const { currency: { symbol = '$' } = {} } = useSettings();

  return (
    <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
      <Description
        title={t('form:form-title-simple-product-info')}
        details={`${
          initialValues
            ? t('form:item-description-edit')
            : t('form:item-description-add')
        } ${t('form:form-description-simple-product-info')}`}
        className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">
        <Input
          label={`${t('form:input-label-sale-price')} (${symbol})`}
          {...register('salePrice')}
          type="number"
          min={0}
          error={t(errors.salePrice?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-compare-price')} (${symbol})`}
          {...register('comparePrice')}
          type="number"
          min={0}
          error={t(errors.comparePrice?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-buying-price')} (${symbol})`}
          {...register('buyingPrice')}
          type="number"
          min={0}
          error={t(errors.buyingPrice?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-total-quantity')}*`}
          type="number"
          min={0}
          {...register('quantity')}
          error={t(errors.quantity?.message!)}
          variant="outline"
          className="mb-5"
        />

        <Input
          label={t('form:input-label-sku')}
          {...register('sku')}
          placeholder="LEV-JN-BL-WM"
          error={t(errors.sku?.message!)}
          variant="outline"
          className="mb-5"
        />
      </Card>
    </div>
  );
}

export default memo(ProductInfoForm);
